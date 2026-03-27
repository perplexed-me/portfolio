'use client';
import InteractiveTerminal from '@/app/components/InteractiveTerminal';
import styles from './Home.module.css';

export default function HomeClient({ profile }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroName}>
            <span className={styles.prompt}>&gt;</span> {profile?.name || 'Developer'}
          </h1>
          <p className={styles.heroTitle}>{profile?.title || 'Full Stack Developer'}</p>
          <p className={styles.heroBio}>{profile?.tagline || ''}</p>
          {profile?.bio?.split('\n').map((line, i) => (
            <p key={i} className={styles.heroBioLine}>{line}</p>
          ))}
          {/* <div className={styles.heroCTA}>
            <a href="/projects" className={styles.ctaPrimary}>View Projects</a>
            <a href="/contact" className={styles.ctaSecondary}>Get In Touch</a>
          </div> */}
        </div>

        <InteractiveTerminal profile={profile || {}} />
      </div>
    </section>
  );
}
