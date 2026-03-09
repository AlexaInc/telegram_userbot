const { loadLearnedKnowledge } = require('./db.js');

async function performBackup() {
    // Dynamic import for Octokit (since it is an ESM module)
    const { Octokit } = await import('octokit');
    const token = process.env.GITHUB_TOKEN;
    const owner = 'AlexaInc';
    const repo = 'nlpjsbrain';
    const path = 'knowledge.json';

    if (!token) {
        console.error('[Backup] No GITHUB_TOKEN found in environment.');
        return { success: false, message: 'Missing GITHUB_TOKEN' };
    }

    const octokit = new Octokit({ auth: token });

    try {
        console.log('[Backup] Fetching knowledge from database...');
        const knowledge = await loadLearnedKnowledge();
        const content = JSON.stringify(knowledge, null, 2);
        const encodedContent = Buffer.from(content).toString('base64');

        let sha;
        try {
            // Check if file exists to get SHA (required for updates)
            const { data } = await octokit.rest.repos.getContent({
                owner,
                repo,
                path,
            });
            sha = data.sha;
        } catch (e) {
            // File doesn't exist yet, that's fine
        }

        console.log('[Backup] Pushing to GitHub...');
        await octokit.rest.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message: `Backup Knowledge base - ${new Date().toISOString()}`,
            content: encodedContent,
            sha,
        });

        console.log('[Backup] Successfully pushed to GitHub.');
        return { success: true, message: 'Backup successful' };
    } catch (error) {
        console.error('[Backup] Error performing backup:', error.message);
        return { success: false, message: error.message };
    }
}

async function restoreFromBackup() {
    const token = process.env.GITHUB_TOKEN;
    const owner = 'AlexaInc';
    const repo = 'nlpjsbrain';
    const path = 'knowledge.json';

    if (!token) {
        console.warn('[Restore] No GITHUB_TOKEN found. Skipping GitHub restore.');
        return null;
    }

    const { Octokit } = await import('octokit');
    const octokit = new Octokit({ auth: token });

    try {
        console.log('[Restore] Fetching knowledge.json from GitHub...');
        const { data } = await octokit.rest.repos.getContent({
            owner,
            repo,
            path,
        });

        const content = Buffer.from(data.content, 'base64').toString();
        const knowledge = JSON.parse(content);
        console.log(`[Restore] Successfully fetched ${knowledge.length} items from GitHub.`);
        return knowledge;
    } catch (error) {
        if (error.status === 404) {
            console.log('[Restore] No knowledge.json found on GitHub. Starting fresh.');
        } else {
            console.error('[Restore] Error fetching backup:', error.message);
        }
        return null;
    }
}

module.exports = { performBackup, restoreFromBackup };
