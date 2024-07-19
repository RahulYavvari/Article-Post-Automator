# Article Automator Documentation

## Overview

**Article Automator** is a bot designed to automatically post articles, news, or updates from the TechnoKrax website on social media platforms. The bot checks for new articles at regular intervals and posts them on Twitter if any new articles are found. This project is built using Node.js and leverages several libraries for web scraping, scheduling, and interacting with the Twitter API.

## Technologies Used

- **Node.js**: JavaScript runtime used to build the bot.
- **Puppeteer**: A Node library used to control a headless browser for web scraping.
- **node-cron**: A task scheduler for running the bot at specified intervals.
- **node-fetch**: A lightweight module that brings `window.fetch` to Node.js.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file.
- **twitter-api-v2**: A Twitter API client for Node.js.
- **@twitter-api-v2/plugin-rate-limit**: A plugin to manage rate limits for the Twitter API client.

## Prerequisites

Ensure you have Node.js and npm (Node Package Manager) installed on your system.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/RahulYavvari/Article-Post-Automator
   cd Article-Post-Automator
   ```

1. **Install Dependencies**

   ```bash
   npm install
   ```

1. **Configure Environment Variables**

   Create a `.env` file (refer to `.env.example` in the source directory) in the root directory and add your environment variables:

```env
    TWITTER_API_KEY=api_key
    TWITTER_API_SECRET=api_secret_key
    TWITTER_ACCESS_TOKEN=access_token
    TWITTER_ACCESS_SECRET=access_token_secret

    CRON_STRING_FREQ_1MIN="* * * * *"
    CRON_STRING_FREQ_1HR="0 * * * *"
    CRON_STRING_FREQ_12HR="0 */12 * * *"
```

1. **Run the Bot**

   ```bash
   npm start
   ```

## How It Works

- On the first run, the bot will fetch articles from the TechnoKrax website and create an `articles.json` file.
- The bot will use `node-cron` to schedule regular checks for new articles.
- If new articles are found, the bot will post them on Twitter using the `twitter-api-v2` library.
- The bot will not post any articles if there are no new articles since the last fetch.
- To reset the bot, delete the `articles.json` file and restart the bot.

## Main Files

- **index.mjs**: The main file that contains the bot logic.
- **articles.json**: A JSON file that stores the latest fetched articles.

## Challenges Faced

- When web scraping the website, I encountered an issue because the website did not use `<a>` tags in the HTML, making it difficult to retrieve the link to the article. I then discovered that by using the share icon within the post container, the link to the article is copied to the clipboard. I was able to read the content in the clipboard using Puppeteer. This solution resolved the problem.
- The link/URL copied from the above said way does not follow `RFC 3986` specification, and while posting the content, the link is sliced. So I have written a function to handle the specific case that converts the URL to the desired format.\
Example: \
Link Copied: `www.example.com/abc def ghi` \
Link RFC 3986 Spec: `www.example.com/abc%20def%20ghi` \
Source: [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986)
