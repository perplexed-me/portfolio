'use client';
import { useState, useEffect, useCallback } from 'react';
import styles from './AdminClient.module.css';

export default function AdminClient({ initialAuth = false, initialData = null }) {
  const [isAuth, setIsAuth] = useState(initialAuth);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(initialAuth && !initialData);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/portfolio');
      const json = await res.json();
      setData(json);
    } catch {
      showNotification('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    if (isAuth && !data) fetchData();
  }, [isAuth, data, fetchData]);

  const handleLogout = async () => {
    setIsAuth(false);
    setData(null);
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.reload();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        window.location.reload();
      } else {
        setAuthError('Invalid password');
      }
    } catch {
      setAuthError('Login failed');
    }
  };

  const saveSection = async (section, value) => {
    setSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, value })
      });
      if (res.ok) {
        showNotification(`${section} updated successfully!`);
        fetchData();
      } else {
        showNotification('Failed to save', 'error');
      }
    } catch {
      showNotification('Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Message deleted');
        fetchData();
      }
    } catch {
      showNotification('Failed to delete', 'error');
    }
  };

  if (!isAuth) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1 className={styles.loginTitle}>
              <span className={styles.prompt}>&gt;</span> Admin Login
            </h1>
            <p className={styles.loginSubtitle}>Enter your password to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="adminPassword">Password</label>
              <input
                id="adminPassword"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {authError && <p className={styles.error}>{authError}</p>}
            <button type="submit" className={styles.loginBtn}>
              Login <span>→</span>
            </button>
          </form>
          <p className={styles.loginHint}>-_- </p>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button suppressHydrationWarning onClick={toggleTheme} aria-label="Toggle theme" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '8px', color: 'var(--text-secondary)' }}>
              {mounted ? (theme === 'light' ? '🌙' : '☀️') : '🌙'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    // { id: 'messages', label: 'Messages', icon: '💬', badge: data?.messages?.filter(m => !m.read).length },
  ];

  return (
    <div className={styles.admin}>
      {/* Notification */}
      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>
            <span className={styles.prompt}>&gt;</span> CMS
          </h2>
        </div>
        <nav className={styles.sidebarNav}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.sidebarLink} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              {tab.label}
              {tab.badge > 0 && <span className={styles.badge}>{tab.badge}</span>}
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <a href="/" className={styles.viewSiteBtn}>← View Site</a>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
            <button suppressHydrationWarning onClick={toggleTheme} aria-label="Toggle theme" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '6px' }}>
              {mounted ? (theme === 'light' ? '🌙' : '☀️') : '🌙'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <h1 className={styles.mainTitle}>{tabs.find(t => t.id === activeTab)?.label}</h1>
        </header>
        <div className={styles.mainContent}>
          {activeTab === 'profile' && (
            <ProfileEditor data={data.profile} onSave={(val) => saveSection('profile', val)} saving={saving} />
          )}
          {activeTab === 'projects' && (
            <ProjectsEditor data={data.projects} onSave={(val) => saveSection('projects', val)} saving={saving} />
          )}
          {activeTab === 'skills' && (
            <SkillsEditor data={data.skills} onSave={(val) => saveSection('skills', val)} saving={saving} />
          )}
          {activeTab === 'experience' && (
            <ExperienceEditor data={data.experience} onSave={(val) => saveSection('experience', val)} saving={saving} />
          )}
          {activeTab === 'messages' && (
            <MessagesViewer messages={data.messages || []} onDelete={deleteMessage} />
          )}
        </div>
      </main>
    </div>
  );
}

/* ===== PROFILE EDITOR ===== */
function ProfileEditor({ data, onSave, saving }) {
  const [form, setForm] = useState(data || {});

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const updateSocialLink = (index, field, value) => {
    const links = [...(form.socialLinks || [])];
    links[index] = { ...links[index], [field]: value };
    setForm(prev => ({ ...prev, socialLinks: links }));
  };

  const addSocialLink = () => {
    setForm(prev => ({
      ...prev,
      socialLinks: [{ platform: '', url: '', icon: '' }, ...(prev.socialLinks || [])]
    }));
  };

  const removeSocialLink = (index) => {
    setForm(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIndex) return;
    const links = [...(form.socialLinks || [])];
    const [removed] = links.splice(draggedIdx, 1);
    links.splice(dropIndex, 0, removed);
    setForm(prev => ({ ...prev, socialLinks: links }));
    setDraggedIdx(null);
  };

  const handleOrderChange = (e, index) => {
    let val = parseInt(e.target.value);
    const links = [...(form.socialLinks || [])];
    if (isNaN(val) || val < 1) val = 1;
    if (val > links.length) val = links.length;
    if (val - 1 === index) return;
    const [removed] = links.splice(index, 1);
    links.splice(val - 1, 0, removed);
    setForm(prev => ({ ...prev, socialLinks: links }));
  };

  return (
    <div className={styles.editor}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input value={form.name || ''} onChange={e => update('name', e.target.value)} placeholder="Your name" />
        </div>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input value={form.title || ''} onChange={e => update('title', e.target.value)} placeholder="e.g. Full Stack Developer" />
        </div>
        <div className={styles.formGroup}>
          <label>Tagline</label>
          <input value={form.tagline || ''} onChange={e => update('tagline', e.target.value)} placeholder="One line about you" />
        </div>
        <div className={styles.formGroup}>
          <label>Location</label>
          <input value={form.location || ''} onChange={e => update('location', e.target.value)} placeholder="City, Country" />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input value={form.email || ''} onChange={e => update('email', e.target.value)} placeholder="hello@example.com" />
        </div>
        <div className={styles.formGroup}>
          <label>Resume URL</label>
          <input value={form.resumeUrl || ''} onChange={e => update('resumeUrl', e.target.value)} placeholder="/uploads/resume.pdf" />
        </div>
      </div>
      <div className={styles.formGroup} style={{ marginTop: '16px' }}>
        <label>Bio</label>
        <textarea
          value={form.bio || ''}
          onChange={e => update('bio', e.target.value)}
          rows={4}
          placeholder="Tell your story..."
        />
      </div>

      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h3>Social Links</h3>
          <button onClick={addSocialLink} className={styles.addBtn}>+ Add Link</button>
        </div>
        {(form.socialLinks || []).map((link, i) => (
          <div 
            key={i} 
            className={styles.itemRow}
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, i)}
            style={{ opacity: draggedIdx === i ? 0.5 : 1, cursor: 'grab' }}
          >
            <div className={styles.dragHandle}>⋮⋮</div>
            <input value={link.platform || ''} onChange={e => updateSocialLink(i, 'platform', e.target.value)} placeholder="Platform" />
            <input value={link.url || ''} onChange={e => updateSocialLink(i, 'url', e.target.value)} placeholder="URL" />
            <div className={styles.actionGroup}>
              <div className={styles.orderControl}>
                <input type="number" value={i + 1} min="1" max={form.socialLinks?.length || 1} onChange={(e) => handleOrderChange(e, i)} className={styles.orderInput} />
                <span className={styles.orderTotal}>/ {form.socialLinks?.length || 1}</span>
              </div>
              <button title="Delete" onClick={() => removeSocialLink(i)} className={styles.deleteBtn}>✕</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.saveArea}>
        <button onClick={() => onSave(form)} className={styles.saveBtn} disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}

/* ===== PROJECTS EDITOR ===== */
function ProjectsEditor({ data, onSave, saving }) {
  const [projects, setProjects] = useState(data || []);

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const addProject = () => {
    setProjects(prev => [{
      id: Date.now().toString(),
      title: '',
      description: '',
      tech: [],
      liveUrl: '',
      githubUrl: '',
      image: '',
      featured: false
    }, ...prev]);
  };

  const removeProject = (index) => {
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIndex) return;
    const updated = [...projects];
    const [removed] = updated.splice(draggedIdx, 1);
    updated.splice(dropIndex, 0, removed);
    setProjects(updated);
    setDraggedIdx(null);
  };

  const handleOrderChange = (e, index) => {
    let val = parseInt(e.target.value);
    const updated = [...projects];
    if (isNaN(val) || val < 1) val = 1;
    if (val > updated.length) val = updated.length;
    if (val - 1 === index) return;
    const [removed] = updated.splice(index, 1);
    updated.splice(val - 1, 0, removed);
    setProjects(updated);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorActions}>
        <button onClick={addProject} className={styles.addBtn}>+ Add Project</button>
      </div>
      {projects.map((project, i) => (
        <div 
          key={project.id} 
          className={styles.editorCard}
          draggable
          onDragStart={(e) => handleDragStart(e, i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, i)}
          style={{ opacity: draggedIdx === i ? 0.5 : 1 }}
        >
          <div className={styles.editorCardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className={styles.dragHandle} style={{ cursor: 'grab' }}>⋮⋮</div>
              <h3>{project.title || 'New Project'}</h3>
            </div>
            <div className={styles.editorCardActions}>
              <label className={styles.featuredToggle}>
                <input
                  type="checkbox"
                  checked={project.featured || false}
                  onChange={e => updateProject(i, 'featured', e.target.checked)}
                />
                <span>Featured</span>
              </label>
              <div className={styles.actionGroup}>
                <div className={styles.orderControl}>
                  <input type="number" value={i + 1} min="1" max={projects.length} onChange={(e) => handleOrderChange(e, i)} className={styles.orderInput} />
                  <span className={styles.orderTotal}>/ {projects.length}</span>
                </div>
                <button title="Delete" onClick={() => removeProject(i)} className={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Title</label>
              <input value={project.title} onChange={e => updateProject(i, 'title', e.target.value)} placeholder="Project title" />
            </div>
            <div className={styles.formGroup}>
              <label>Tech Stack (comma-separated)</label>
              <input
                value={(project.tech || []).join(', ')}
                onChange={e => updateProject(i, 'tech', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Live URL</label>
              <input value={project.liveUrl || ''} onChange={e => updateProject(i, 'liveUrl', e.target.value)} placeholder="https://..." />
            </div>
            <div className={styles.formGroup}>
              <label>GitHub URL</label>
              <input value={project.githubUrl || ''} onChange={e => updateProject(i, 'githubUrl', e.target.value)} placeholder="https://github.com/..." />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea value={project.description} onChange={e => updateProject(i, 'description', e.target.value)} rows={3} placeholder="Project description..." />
          </div>
        </div>
      ))}
      <div className={styles.saveArea}>
        <button onClick={() => onSave(projects)} className={styles.saveBtn} disabled={saving}>
          {saving ? 'Saving...' : 'Save Projects'}
        </button>
      </div>
    </div>
  );
}

/* ===== SKILLS EDITOR ===== */
function SkillsEditor({ data, onSave, saving }) {
  const [skills, setSkills] = useState(data || []);

  const updateSkill = (index, field, value) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills(prev => [{
      id: Date.now().toString(),
      name: '',
      category: 'language',
      level: 50
    }, ...prev]);
  };

  const removeSkill = (index) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIndex) return;
    const updated = [...skills];
    const [removed] = updated.splice(draggedIdx, 1);
    updated.splice(dropIndex, 0, removed);
    setSkills(updated);
    setDraggedIdx(null);
  };

  const handleOrderChange = (e, index) => {
    let val = parseInt(e.target.value);
    const updated = [...skills];
    if (isNaN(val) || val < 1) val = 1;
    if (val > updated.length) val = updated.length;
    if (val - 1 === index) return;
    const [removed] = updated.splice(index, 1);
    updated.splice(val - 1, 0, removed);
    setSkills(updated);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorActions}>
        <button onClick={addSkill} className={styles.addBtn}>+ Add Skill</button>
      </div>
      <div className={styles.skillsList}>
        {skills.map((skill, i) => (
          <div 
            key={skill.id} 
            className={styles.skillItem}
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, i)}
            style={{ opacity: draggedIdx === i ? 0.5 : 1 }}
          >
            <div className={styles.dragHandle} style={{ cursor: 'grab' }}>⋮⋮</div>
            <input
              value={skill.name}
              onChange={e => updateSkill(i, 'name', e.target.value)}
              placeholder="Skill name"
              className={styles.skillInput}
            />
            <select
              value={skill.category}
              onChange={e => updateSkill(i, 'category', e.target.value)}
              className={styles.skillSelect}
            >
              <option value="language">Language</option>
              <option value="framework">Framework</option>
              <option value="runtime">Runtime</option>
              <option value="database">Database</option>
              <option value="devops">DevOps</option>
              <option value="frontend">Frontend</option>
              <option value="other">Other</option>
            </select>
            <div className={styles.skillSlider}>
              <input
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={e => updateSkill(i, 'level', parseInt(e.target.value))}
              />
              <span>{skill.level}%</span>
            </div>
            <div className={styles.actionGroup}>
              <div className={styles.orderControl}>
                <input type="number" value={i + 1} min="1" max={skills.length} onChange={(e) => handleOrderChange(e, i)} className={styles.orderInput} />
                <span className={styles.orderTotal}>/ {skills.length}</span>
              </div>
              <button title="Delete" onClick={() => removeSkill(i)} className={styles.deleteBtn}>✕</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.saveArea}>
        <button onClick={() => onSave(skills)} className={styles.saveBtn} disabled={saving}>
          {saving ? 'Saving...' : 'Save Skills'}
        </button>
      </div>
    </div>
  );
}

/* ===== EXPERIENCE EDITOR ===== */
function ExperienceEditor({ data, onSave, saving }) {
  const [experience, setExperience] = useState(data || []);

  const updateExp = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const addExp = () => {
    setExperience(prev => [{
      id: Date.now().toString(),
      company: '',
      role: '',
      period: '',
      description: '',
      tech: []
    }, ...prev]);
  };

  const removeExp = (index) => {
    setExperience(prev => prev.filter((_, i) => i !== index));
  };

  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIndex) return;
    const updated = [...experience];
    const [removed] = updated.splice(draggedIdx, 1);
    updated.splice(dropIndex, 0, removed);
    setExperience(updated);
    setDraggedIdx(null);
  };

  const handleOrderChange = (e, index) => {
    let val = parseInt(e.target.value);
    const updated = [...experience];
    if (isNaN(val) || val < 1) val = 1;
    if (val > updated.length) val = updated.length;
    if (val - 1 === index) return;
    const [removed] = updated.splice(index, 1);
    updated.splice(val - 1, 0, removed);
    setExperience(updated);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorActions}>
        <button onClick={addExp} className={styles.addBtn}>+ Add Experience</button>
      </div>
      {experience.map((exp, i) => (
        <div 
          key={exp.id} 
          className={styles.editorCard}
          draggable
          onDragStart={(e) => handleDragStart(e, i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, i)}
          style={{ opacity: draggedIdx === i ? 0.5 : 1 }}
        >
          <div className={styles.editorCardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className={styles.dragHandle} style={{ cursor: 'grab' }}>⋮⋮</div>
              <h3>{exp.role || 'New Position'}</h3>
            </div>
            <div className={styles.actionGroup}>
              <div className={styles.orderControl}>
                <input type="number" value={i + 1} min="1" max={experience.length} onChange={(e) => handleOrderChange(e, i)} className={styles.orderInput} />
                <span className={styles.orderTotal}>/ {experience.length}</span>
              </div>
              <button title="Delete" onClick={() => removeExp(i)} className={styles.deleteBtn}>Delete</button>
            </div>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Role</label>
              <input value={exp.role} onChange={e => updateExp(i, 'role', e.target.value)} placeholder="Job title" />
            </div>
            <div className={styles.formGroup}>
              <label>Company</label>
              <input value={exp.company} onChange={e => updateExp(i, 'company', e.target.value)} placeholder="Company name" />
            </div>
            <div className={styles.formGroup}>
              <label>Period</label>
              <input value={exp.period} onChange={e => updateExp(i, 'period', e.target.value)} placeholder="2023 - Present" />
            </div>
            <div className={styles.formGroup}>
              <label>Tech Stack (comma-separated)</label>
              <input
                value={(exp.tech || []).join(', ')}
                onChange={e => updateExp(i, 'tech', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                placeholder="React, Node.js"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea value={exp.description} onChange={e => updateExp(i, 'description', e.target.value)} rows={3} placeholder="Job description..." />
          </div>
        </div>
      ))}
      <div className={styles.saveArea}>
        <button onClick={() => onSave(experience)} className={styles.saveBtn} disabled={saving}>
          {saving ? 'Saving...' : 'Save Experience'}
        </button>
      </div>
    </div>
  );
}

/* ===== MESSAGES VIEWER ===== */
// function MessagesViewer({ messages, onDelete }) {
//   if (!messages.length) {
//     return (
//       <div className={styles.emptyState}>
//         <div className={styles.emptyIcon}>💬</div>
//         <p>No messages yet</p>
//         <span>Messages from the contact form will appear here</span>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.messagesList}>
//       {messages.map(msg => (
//         <div key={msg.id} className={`${styles.messageCard} ${!msg.read ? styles.unread : ''}`}>
//           <div className={styles.messageHeader}>
//             <div>
//               <h3 className={styles.messageName}>{msg.name}</h3>
//               <p className={styles.messageEmail}>{msg.email}</p>
//             </div>
//             <div className={styles.messageActions}>
//               <span className={styles.messageDate}>{new Date(msg.date).toLocaleDateString()}</span>
//               <button onClick={() => onDelete(msg.id)} className={styles.deleteBtn}>Delete</button>
//             </div>
//           </div>
//           <p className={styles.messageBody}>{msg.message}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
