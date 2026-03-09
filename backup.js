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

module.exports = { performBackup };
