import { TwitterApi } from 'twitter-api-v2';
import { TwitterApiRateLimitPlugin } from '@twitter-api-v2/plugin-rate-limit'
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const rateLimitPlugin = new TwitterApiRateLimitPlugin();  

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
}, { plugins: [rateLimitPlugin] });

const rwClient = client.readWrite;

async function postTweetWithImage(title, imageUrl, continueReadingLink) {
  try {
    let currentRateLimitForMe = await rateLimitPlugin.v1.getRateLimit('users/me');

    if(rateLimitPlugin.hasHitRateLimit(currentRateLimitForMe)) {
      throw `Rate Limit Error: Limit Exceded for today.`;
    }
    
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    
    const mediaId = await rwClient.v1.uploadMedia(buffer, { type: 'jpg' });
    
    const tweetText = `${title}\n\nContinue reading: ${continueReadingLink}`;
    
    if(tweetText.length > 280) {
      throw "Tweet length exceeded 280 characters!";
    }
    
    const { data: createdTweet } = await rwClient.v2.tweet({
      text: tweetText,
      media: { media_ids: [mediaId] },
    });
    console.log('[LOG] Tweet posted successfully. [TWEET ID]:', createdTweet.id);
  } catch (error) {
    console.error('[LOG] Error posting tweet:', error);
  }
}

export default postTweetWithImage;