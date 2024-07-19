import puppeteer from "puppeteer";

export const fetchArticles = async () => {
    try {
        const browser = await puppeteer.launch(
            {
                headless: true
            }
        );
        const context = browser.defaultBrowserContext();
        await context.overridePermissions('https://technokrax.com/', ['clipboard-sanitized-write', 'clipboard-read']);

        const page = await browser.newPage();

        await page.goto('https://technokrax.com/learn');

        await page.waitForSelector('.flex.flex-wrap.gap-8.p-5');
        const articlesHandle = await page.$$('.flex.flex-wrap.gap-8.p-5');

        let articles = [];

        for (let i = 0; i < articlesHandle.length; i++) {

            const share = await articlesHandle[i].$$('.flex.items-center.gap-1');

            await share[3].click();

            let link = await page.evaluate(() => navigator.clipboard.readText());
            link = replaceSpacesWithPercent20(link);

            const articleItem = (await articlesHandle[i].evaluate((article, link) => {
                let title = article.querySelector('h2').innerHTML;
                let subtext = article.querySelector('p').innerHTML;
                let imgSrc = article.querySelector('img').src;

                if (!title == '') {
                    return { title, subtext, link, imgSrc };
                }
            }, link));

            if (articleItem == undefined) {
                continue;
            } else {
                articles.push(articleItem);
            }
        }
        context.clearPermissionOverrides();
        await browser.close();

        return [true, articles];
    } catch (err) {
        console.log('[LOG] Error Fetching articles!', err);
        return [false, null];
    }
};

function replaceSpacesWithPercent20(str) {
    return str.split(' ').join('%20');
}