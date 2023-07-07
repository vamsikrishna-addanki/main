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
