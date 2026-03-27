'use client';
import styles from './Skills.module.css';

export default function SkillsClient({ skills }) {
  // Group by category
  const categories = {};
  skills.forEach(skill => {
    const cat = skill.category || 'other';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(skill);
  });

  const categoryLabels = {
    language: 'Languages',
    framework: 'Frameworks',
    runtime: 'Runtime',
    database: 'Databases',
    devops: 'DevOps',
    frontend: 'Frontend',
    other: 'Other',
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.sectionTitle}>
          <span className={styles.prompt}>&gt;</span> Skills
        </h1>

        {Object.entries(categories).map(([cat, catSkills]) => (
          <div key={cat} className={styles.categoryBlock}>
            <h2 className={styles.categoryTitle}>{categoryLabels[cat] || cat}</h2>
            <div className={styles.skillsTerminal}>
              <div className={styles.terminalHeader}>
                <span className={styles.dot} style={{ background: '#e87070' }} />
                <span className={styles.dot} style={{ background: '#e8c86e' }} />
                <span className={styles.dot} style={{ background: '#7ec89b' }} />
                <span className={styles.headerLabel}>{categoryLabels[cat] || cat}</span>
              </div>
              <div className={styles.terminalBody}>
                {catSkills.map((skill, i) => (
                  <div key={skill.id} className={styles.skillLine}>
                    <span className={styles.terminalPrompt}>&gt; skills.</span>
                    <span className={styles.skillName}>{skill.name}</span>
                    <div className={styles.skillBar}>
                      <div
                        className={styles.skillFill}
                        style={{ width: `${skill.level}%`, animationDelay: `${i * 0.1}s` }}
                      />
                    </div>
                    <span className={styles.skillLevel}>{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
