import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loader}>
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <span className={styles.dot} style={{ background: '#e87070' }} />
          <span className={styles.dot} style={{ background: '#e8c86e' }} />
          <span className={styles.dot} style={{ background: '#7ec89b' }} />
        </div>
        <div className={styles.terminalBody}>
          <div className={styles.skeletonLine} style={{ width: '60%' }} />
          <div className={styles.skeletonLine} style={{ width: '80%', animationDelay: '0.1s' }} />
          <div className={styles.skeletonLine} style={{ width: '45%', animationDelay: '0.2s' }} />
          <div className={styles.skeletonLine} style={{ width: '70%', animationDelay: '0.3s' }} />
        </div>
      </div>
    </div>
  );
}
