'use client';
import styles from './Contact.module.css';

export default function ContactClient({ email, socialLinks }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.sectionTitle}>
          <span className={styles.prompt}>&gt;</span> Contact
        </h1>

        <div className={styles.contactLayout}>
          <div className={styles.contactText}>
            <h2 className={styles.heading}>Let&apos;s connect</h2>
            <p className={styles.description}>
              Have a project in mind or just want to say hello?
              Reach out through any of the channels below.
            </p>
          </div>

          <div className={styles.contactTerminal}>
            <div className={styles.terminalHeader}>
              <span className={styles.dot} style={{ background: '#e87070' }} />
              <span className={styles.dot} style={{ background: '#e8c86e' }} />
              <span className={styles.dot} style={{ background: '#7ec89b' }} />
              <span className={styles.headerLabel}>contact.sh</span>
            </div>
            <div className={styles.terminalBody}>
              {/* Email */}
              <div className={styles.contactLine}>
                <span className={styles.linePrompt}>&gt; email</span>
                <a href={`mailto:${email}`} className={`${styles.lineValue} ${styles.green}`}>
                  &quot;{email}&quot;
                </a>
              </div>

              {/* Social links */}
              {socialLinks.map(link => (
                <div key={link.platform} className={styles.contactLine}>
                  <span className={styles.linePrompt}>&gt; {link.platform.toLowerCase()}</span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.lineValue} ${styles.cyan}`}
                  >
                    &quot;{link.url}&quot;
                  </a>
                </div>
              ))}

              {/* Cursor */}
              <div className={styles.cursorLine}>
                <span className={styles.linePrompt}>&gt;</span>
                <span className={styles.cursor}>▌</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
