import fs from 'fs/promises';
import path from 'path';
import { fetchReposWithLanguages } from '../api/github.js';

async function main() {
    // Load files
    const SRC = path.join(process.cwd(), 'src/assets/data/projects.json');
    const OUT = path.join(process.cwd(), 'src/assets/data/projects.generated.json');

    // Load raw data to get repo names
    const rawText = await fs.readFile(SRC, 'utf8');
    const rawProjects = JSON.parse(rawText);

    console.log('Fetching projects and languages from GitHub API');
    const fullRepoNames = rawProjects.map((p) => `cweihan01/${p.repoName}`);
    const out = await fetchReposWithLanguages(fullRepoNames);

    // Write API data to file
    await fs.writeFile(OUT, JSON.stringify(out, null, 2), 'utf8');
    console.log(`Wrote ${out.length} GitHub projects data to ${OUT}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
