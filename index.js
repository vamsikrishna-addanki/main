const express = require("express");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const fs = require("fs").promises;
const path = require("path");
const port = 8081;

const app = express();

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.labels",
  "https://mail.google.com/",
];

const labelName = "AutoReplied";

app.get("/", async (req, res) => {
  // Authenticate using local credentials
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "credentials.json"),
    scopes: SCOPES,
  });

  const gmail = google.gmail({ version: "v1", auth });

  // Function to retrieve unreplied messages
  async function getUnrepliedMessages(auth) {
    const gmail = google.gmail({ version: "v1", auth });
    const response = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["INBOX"],
      q: "is:unread",
    });
    return response.data.messages || [];
  }

  // Function to create the "AutoReplied" label if it doesn't exist
  async function createLabel(auth) {
    const gmail = google.gmail({ version: "v1", auth });
    try {
      const response = await gmail.users.labels.create({
        userId: "me",
        requestBody: {
          name: labelName,
          labelListVisibility: "labelShow",
          messageListVisibility: "show",
        },
      });
      return response.data.id;
    } catch (error) {
      if (error.code === 409) {
        const response = await gmail.users.labels.list({
          userId: "me",
        });
        const label = response.data.labels.find(
          (label) => label.name === labelName
        );
        return label.id;
      } else {
        throw error;
      }
    }
  }

  // Main function to handle the auto-reply logic
  async function main() {
    const labelId = await createLabel(auth);

    // Function to send auto-reply
    async function sendAutoReply(email) {
      const replyMessage = {
        userId: "me",
        requestBody: {
          raw: Buffer.from(
            `To: ${
              email.payload.headers.find(
                (header) => header.name === "From"
              ).value || ""
            }\r\n` +
              `Subject: Re: ${
                email.payload.headers.find(
                  (header) => header.name === "Subject"
                )?.value || ""
              }\r\n` +
              `Content-Type: text/plain; charset="UTF-8"\r\n` +
              `Content-Transfer-Encoding: 7bit\r\n\r\n` +
              `Engaged in some other work, will see and respond soon.\r\n`
          ).toString("base64"),
        },
      };

      // Send the auto-reply message
      await gmail.users.messages.send(replyMessage);

      // Modify labels of the original message
      await gmail.users.messages.modify({
        userId: "me",
        id: email.id,
        requestBody: {
          addLabelIds: [labelId],
          removeLabelIds: ["INBOX"],
        },
      });
    }

    // Set interval to check for unreplied messages at random intervals between 45 to 120 seconds
    setInterval(async () => {
      const messages = await getUnrepliedMessages(auth);
      if (messages && messages.length > 0) {
        for (const message of messages) {
          const messageData = await gmail.users.messages.get({
            userId: "me",
            id: message.id,
          });

          const email = messageData.data;
          const hasReplied = email.payload.headers.some(
            (header) => header.name === "In-Reply-To"
          );

          if (!hasReplied) {
            await sendAutoReply(email);
          }
        }
      }
    }, Math.floor(Math.random() * (120 - 45 + 1) + 45) * 1000);
  }

  // Call the main function to start the auto-reply process
  main();

  res.json({ "Auth": auth });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

