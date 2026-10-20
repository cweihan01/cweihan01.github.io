import axios from 'axios';
import type {
    GithubCommit,
    GithubLanguages,
    GithubRepo,
    GithubRepoWithLanguages,
} from '../types/github.ts';

function errorMessage(err: unknown): string {
    return err instanceof Error ? err.message : String(err);
}

/**
 * Fetch repo metadata + languages.
 * @param fullName e.g. "<username>/<reponame>"
 */
export async function fetchRepoWithLanguages(
    fullName: string,
): Promise<GithubRepoWithLanguages | null> {
    try {
        const { data: repo } = await axios.get<GithubRepo>(
            `https://api.github.com/repos/${fullName}`,
        );

        let languages: GithubLanguages = {};
        if (repo.languages_url) {
            try {
                const { data: langs } = await axios.get<GithubLanguages>(repo.languages_url);
                languages = langs;
            } catch (err) {
                console.warn(`Failed to fetch languages for ${fullName}: ${errorMessage(err)}`);
            }
        }

        return { ...repo, languages };
    } catch (err) {
        console.warn(`Failed to fetch ${fullName}: ${errorMessage(err)}`);
        return null;
    }
}

/**
 * Fetch multiple repos + languages in parallel.
 */
export function fetchReposWithLanguages(
    fullNames: string[],
): Promise<(GithubRepoWithLanguages | null)[]> {
    return Promise.all(fullNames.map(fetchRepoWithLanguages));
}

/**
 * Fetch the latest commits from a GitHub repo.
 * @param fullName e.g. "username/reponame"
 * @param limit max commits to return
 */
export async function fetchLatestCommits(
    fullName: string,
    limit = 10,
): Promise<GithubCommit[]> {
    try {
        const { data } = await axios.get<GithubCommit[]>(
            `https://api.github.com/repos/${fullName}/commits`,
        );
        return data.slice(0, limit);
    } catch (err) {
        console.warn(`fetchLatestCommits error: ${errorMessage(err)}`);
        return [];
    }
}
