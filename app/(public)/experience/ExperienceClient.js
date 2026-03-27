'use client';
import { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

export default function ExperienceClient({ experience }) {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll(`.${styles.animateOnScroll}`).forEach(el => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.sectionTitle}>
          <span className={styles.prompt}>&gt;</span> Experience
        </h1>

        <div className={styles.timeline}>
          {experience.map((exp, i) => (
            <div
              key={exp.id}
              className={`${styles.timelineItem} ${styles.animateOnScroll}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <h2 className={styles.timelineRole}>{exp.role}</h2>
                  <span className={styles.timelinePeriod}>{exp.period}</span>
                </div>
                <p className={styles.timelineCompany}>{exp.company}</p>
                <p className={styles.timelineDesc}>{exp.description}</p>
                <div className={styles.timelineTech}>
                  {exp.tech?.map(t => (
                    <span key={t} className={styles.techTag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
