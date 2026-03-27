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

export function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function getSection(section) {
  const data = getData();
  return data[section] ?? null;
}

export function updateSection(section, value) {
  const data = getData();
  data[section] = value;
  saveData(data);
  return data[section];
}
