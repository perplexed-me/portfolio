'use client';
import { useEffect, useRef } from 'react';
import styles from './Education.module.css';

export default function EducationClient({ education }) {
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
          <span className={styles.prompt}>&gt;</span> Education
        </h1>

        <div className={styles.timeline}>
          {education.map((edu, i) => (
            <div
              key={edu.id}
              className={`${styles.timelineItem} ${styles.animateOnScroll}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <h2 className={styles.timelineRole}>{edu.role}</h2>
                  <span className={styles.timelinePeriod}>{edu.period}</span>
                </div>
                <p className={styles.timelineCompany}>{edu.company}</p>
                <p className={styles.timelineDesc} style={{ whiteSpace: 'pre-wrap' }}>{edu.description}</p>
                <div className={styles.timelineTech}>
                  {edu.tech?.map(t => (
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
