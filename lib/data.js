import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'portfolio.json');

export function getData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { profile: {}, skills: [], projects: [], experience: [], messages: [] };
  }
}

export async function saveData(data) {
  const jsonString = JSON.stringify(data, null, 2);

  if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
    const repo = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;
    const url = `https://api.github.com/repos/${repo}/contents/data/portfolio.json`;

    try {
      const getRes = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      const fileData = await getRes.json();
      
      const content = Buffer.from(jsonString).toString('base64');
      const putRes = await fetch(url, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'chore: Update portfolio via CMS', content, sha: fileData.sha })
      });
      
      if (putRes.ok) return;
    } catch (e) {
      console.error('GitHub Sync Error:', e);
    }
  }

  try {
    fs.writeFileSync(DATA_FILE, jsonString, 'utf-8');
  } catch (e) {
    console.warn("Local writes restricted (Vercel edge environment). Make sure GITHUB_TOKEN is set.");
  }
}

export function getSection(section) {
  const data = getData();
  return data[section] ?? null;
}

export async function updateSection(section, value) {
  const data = getData();
  data[section] = value;
  await saveData(data);
  return data[section];
}
