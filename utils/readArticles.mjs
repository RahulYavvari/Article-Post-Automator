import fs from 'node:fs';

export const readArticles = (file) => {
    try {
        // Check if file exists
        if (!fs.existsSync(file)) {
            // Create the file if it doesn't exist
            fs.writeFileSync(file, '[]', 'utf8'); // Creating an empty JSON array if you expect JSON data
            console.log(`[LOG] File '${file}' created successfully.`);
        }

        const data = fs.readFileSync(file, 'utf8');
        const articles = JSON.parse(data);
        console.log('[LOG] Read articles successfully.');
        return [true, articles];
    } catch (err) {
        console.error('[ERROR] Error reading or creating data!', err);
        return [false, null];
    }
};
