import axios from 'axios';

/**
 * Fetch repo’s metadata + languages.
 * @param {string} fullName - e.g. "<username>/<reponame>"
 * @returns {Promise<object|null>} repo data with a 'languages' field
 */
export async function fetchRepoWithLanguages(fullName) {
    try {
        const { data: repo } = await axios.get(`https://api.github.com/repos/${fullName}`);

        let languages = {};
        if (repo.languages_url) {
            try {
                const { data: langs } = await axios.get(repo.languages_url);
                languages = langs;
            } catch (err) {
                console.warn(`Failed to fetch languages for ${fullName}: ${err.message}`);
            }
        }

        return { ...repo, languages };
    } catch (err) {
        console.warn(`Failed to fetch ${fullName}: ${err.message}`);
        return null;
    }
}

/**
 * Fetch multiple repos + languages in parallel.
 * @param {string[]} fullNames
 * @returns {Promise<(object|null)[]>}
 */
export function fetchReposWithLanguages(fullNames) {
    return Promise.all(fullNames.map(fetchRepoWithLanguages));
}

/**
 * Fetch the latest commits from a GitHub repo.
 *
 * @param {string} fullName   e.g. "username/reponame"
 * @param {number} [limit=10]     max commits to return
 * @returns {Promise<object[]>}   array of commit objects (or empty on error)
 */
export async function fetchLatestCommits(fullName, limit = 10) {
    try {
        const { data } = await axios.get(`https://api.github.com/repos/${fullName}/commits`);
        return data.slice(0, limit);
    } catch (err) {
        console.warn(`fetchLatestCommits error: ${err.message}`);
        return [];
    }
}
