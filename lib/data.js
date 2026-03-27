import fs from 'fs';
import path from 'path';
import { kv } from '@vercel/kv';

const DATA_FILE = path.join(process.cwd(), 'data', 'portfolio.json');

export async function getData() {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const dbData = await kv.get('portfolio_data');
      if (dbData && Object.keys(dbData).length > 0) return dbData;
    } catch (e) {
      console.error('Vercel KV Read Error:', e);
    }
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { profile: {}, skills: [], projects: [], experience: [], education: [], messages: [] };
  }
}

export async function saveData(data) {
  const jsonString = JSON.stringify(data, null, 2);

  // 1. Vercel KV Database (Real-time updates)
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      await kv.set('portfolio_data', data);
      return;
    } catch (e) {
      console.error('Vercel KV Write Error:', e);
    }
  }

  // 2. GitHub API Commit (Static recreation fallback)
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

  // 3. Local Filesystem (Local development)
  try {
    fs.writeFileSync(DATA_FILE, jsonString, 'utf-8');
  } catch (e) {
    console.warn("Local writes restricted (Vercel edge environment). Configure Vercel KV or GITHUB_TOKEN.");
  }
}

export async function getSection(section) {
  const data = await getData();
  return data[section] ?? null;
}

export async function updateSection(section, value) {
  const data = await getData();
  data[section] = value;
  await saveData(data);
  return data[section];
}
