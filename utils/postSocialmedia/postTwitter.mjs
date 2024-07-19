import postTweetWithImage from '../../socialmediaAPI/twitter.mjs';

export const postTwitter = async (latestArticles) => {
    try {
        for(let i = 0; i < latestArticles.length; i++) {
            let article = latestArticles[i];
            postTweetWithImage(article.title, article.imgSrc, article.link);
        }
    } catch(err) {
        console.log('[LOG] Some error occured while posting tweets. @postTwitter()');
    }
};