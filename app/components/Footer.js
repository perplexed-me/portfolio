import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.footerText}>
          <span className={styles.prompt}>&gt;</span> Built with ❤️ by <a href="https://github.com/perplexed-me" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Mohammad Ali Bhuiyan</a>  . {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
