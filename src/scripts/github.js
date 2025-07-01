import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';

async function main() {
    // Load files
    const SRC = path.join(process.cwd(), 'src/assets/data/projects.json');
    const OUT = path.join(process.cwd(), 'src/assets/data/projects.generated.json');

    // Load raw data to get repo names
    const rawText = await fs.readFile(SRC, 'utf8');
    const rawProjects = JSON.parse(rawText);

    console.log('Fetching projects from GitHub API');
    const out = [];

    for (const { repoName } of rawProjects) {
        try {
            const res = await axios.get(`https://api.github.com/repos/cweihan01/${repoName}`);
            out.push(res.data);
        } catch (err) {
            console.warn(`Failed ${repoName}: ${err.message}`);
            out.push(null);
        }
    }

    await fs.writeFile(OUT, JSON.stringify(out, null, 2), 'utf8');
    console.log(`Wrote ${out.length} GitHub projects data to ${OUT}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
