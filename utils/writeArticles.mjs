import fs from 'node:fs';

export const writeArticles = (articles, file) => {
    try {
        fs.writeFileSync(file, JSON.stringify(articles));
        console.log('[LOG] writeFile success.')
        return true;
    } catch(err) {
        console.log('[LOG] Error writing data!', err);
        return false;
    }
};  