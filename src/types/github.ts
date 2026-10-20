/** GitHub API shapes from the official OpenAPI types, plus our languages merge. */

import type { components } from '@octokit/openapi-types';

/** `GET /repos/{owner}/{repo}` response. */
export type GithubRepo = components['schemas']['full-repository'];

/** `GET /repos/{owner}/{repo}/languages` response. */
export type GithubLanguages = components['schemas']['language'];

/** Repo metadata with languages attached (what our fetch helpers return / cache). */
export type GithubRepoWithLanguages = GithubRepo & {
    languages: GithubLanguages;
};

/** `GET /repos/{owner}/{repo}/commits` list item. */
export type GithubCommit = components['schemas']['commit'];
