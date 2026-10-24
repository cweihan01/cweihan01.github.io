import fs from 'fs/promises';
import path from 'path';
import { fetchReposWithLanguages } from '../api/github.ts';
import type { ProjectData } from '../types/project.ts';

async function main(): Promise<void> {
    const SRC = path.join(process.cwd(), 'src/assets/data/projects.json');
    const OUT = path.join(process.cwd(), 'src/assets/data/projects.generated.json');

    const rawText = await fs.readFile(SRC, 'utf8');
    const rawProjects = JSON.parse(rawText) as ProjectData[];

    console.log('Fetching projects and languages from GitHub API');
    const fullRepoNames = rawProjects
        .filter((p) => p.repoName)
        .map((p) => `cweihan01/${p.repoName}`);
    const out = await fetchReposWithLanguages(fullRepoNames);

    await fs.writeFile(OUT, JSON.stringify(out, null, 2), 'utf8');
    console.log(`Wrote ${out.length} GitHub projects data to ${OUT}`);
}

main().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
});
