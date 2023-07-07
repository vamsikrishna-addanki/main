# Vacation Email Responder

This is a Node.js based application that allows you to automatically respond to emails sent to your Gmail mailbox while you're on vacation. The application utilizes the Gmail API to access your Gmail account, identify new emails, send replies to first-time email threads, and organize emails with labels.

## Features

1. **Checking for New Emails**: The application periodically checks for new emails in the specified Gmail account using the Gmail API.

2. **Sending Replies**: When a new email is detected, the application sends a reply if it is the first time a response is being sent in the email thread. The content of the reply can be customized as per your preference.

3. **Labeling Emails**: After sending a reply, the application adds a label to the email and moves it to the labeled category in Gmail. If the label does not exist, it will be created automatically.

4. **Randomized Interval**: The application repeats the sequence of checking for new emails, sending replies, and labeling in random intervals ranging from 45 to 120 seconds. This adds a level of unpredictability to the response timing.

## Prerequisites

Before running the application, make sure you have the following:

- Node.js installed on your machine
- A Gmail account
- API credentials for Google's Gmail API

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install the dependencies:

```bash
cd vacation-email-responder
npm install
```

3. Configure API credentials:

   - Visit the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.
   - Enable the Gmail API for your project.
   - Create API credentials (OAuth 2.0 client ID) for a Web application.
   - Download the credentials JSON file and save it securely.
   - Rename the downloaded file to `credentials.json`.
   - Move the `credentials.json` file to the root of the project directory.

4. Update configuration:

   - Open the `config.js` file in the project directory.
   - Replace `<YOUR_GMAIL_EMAIL>` with your Gmail email address.
   - Update other configuration options as needed.

## Usage

To start the vacation email responder, run the following command:
```bash
npm start
```

The application will start monitoring your Gmail account for new emails. It will automatically send replies to first-time email threads, add labels, and move the emails to the labeled category.

You can stop the application by pressing `Ctrl + C`.

## Customize Reply Content

To customize the content of the reply sent by the application, open the `app.js` file in the project directory. Look for the `replyContent` variable and modify it with your desired reply text.

```javascript
const replyContent = "Thank you for your email! I am currently on vacation and will respond to you as soon as I return.";
```
## Limitations

The application requires a stable internet connection to access the Gmail API.
It is recommended to run the application on a server or a machine that can be kept online during your vacation.
The Gmail API has certain usage limits. Make sure you review the Gmail API Usage Limits to ensure the application remains within the allowed limits.
Support
For any issues or questions, please open an issue in the [repository](<repository-url>/issues).

## License
This project is licensed under the MIT License.





