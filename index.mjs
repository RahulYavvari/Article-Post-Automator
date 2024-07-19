import cron from 'node-cron';
import dotenv from 'dotenv';
import { fetchArticles } from "./utils/fetchArticles.mjs";
import { readArticles } from './utils/readArticles.mjs';
import { writeArticles } from './utils/writeArticles.mjs';
import { articlesDifference } from './utils/articlesDifference.mjs';
import { postTwitter } from './utils/postSocialmedia/postTwitter.mjs';

dotenv.config();

const main = async () => {
  console.log('[LOG] Job Started at ' + new Date().toTimeString());
  let status;
  let prevArticles, latestArticles;

  [status, prevArticles] = readArticles('articles.json');

  if (!status) {
    console.log('[LOG] Job failed to complete.');
    return;
  }

  const currArticles = await fetchArticles();

  latestArticles = articlesDifference(currArticles, prevArticles);

  if(latestArticles.length != 0) {
    postTwitter(latestArticles);
    status = writeArticles(currArticles, 'articles.json');
  } else {
    console.log('[LOG] No new articles found!');
    status = true;
  }

  if(!status) {
    console.log('[LOG] Job failed to complete.\n');
    return;
  }

  console.log('[LOG] Job finished successfully.\n');
}

cron.schedule(process.env.CRON_STRING_FREQ_1HR, main);

main();