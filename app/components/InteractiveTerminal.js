'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './InteractiveTerminal.module.css';

const COMMANDS = {
  help: {
    description: 'Show available commands',
    output: (profile) => ({
      type: 'table',
      rows: [
        { cmd: 'about', desc: 'Who am I?' },
        { cmd: 'location', desc: 'Where I\'m based' },
        { cmd: 'contact', desc: 'Email & social links' },
        { cmd: 'resume', desc: 'Download my resume' },
        { cmd: 'skills', desc: 'View my skills' },
        { cmd: 'projects', desc: 'View my projects' },
        { cmd: 'experience', desc: 'View my experience' },
        { cmd: 'education', desc: 'View my education' },
        { cmd: 'theme [dark|light]', desc: 'Switch theme' },
        { cmd: 'clear', desc: 'Clear terminal' },
      ]
    })
  },
  about: {
    description: 'About me',
    output: (profile) => ({
      type: 'lines',
      lines: [
        { text: profile.name || 'Developer', color: 'green', bold: true },
        { text: profile.title || 'Full Stack Developer', color: 'cyan' },
        // { text: '' },
        // ...(profile.bio?.split('\n').map(line => ({ text: line, color: 'white' })) || []),
      ]
    })
  },
  location: {
    description: 'My location',
    output: (profile) => ({
      type: 'lines',
      lines: [
        { text: `📍 ${profile.location || 'Earth'}`, color: 'green' },
      ]
    })
  },
  contact: {
    description: 'Contact info',
    output: (profile) => ({
      type: 'links',
      links: [
        { label: '📧 Email', value: profile.email || '', href: `mailto:${profile.email}`, color: 'green' },
        ...(profile.socialLinks?.map(s => ({
          label: `🔗 ${s.platform}`,
          value: s.url,
          href: s.url,
          external: true,
          color: 'cyan'
        })) || [])
      ]
    })
  },
  resume: {
    description: 'Download resume',
    output: (profile) => ({
      type: 'action',
      action: 'open',
      url: profile.resumeUrl || '/uploads/resume.pdf',
      message: 'Opening resume...',
      color: 'green'
    })
  },
  skills: {
    description: 'Navigate to skills',
    output: () => ({
      type: 'navigate',
      path: '/skills',
      message: 'Navigating to skills...',
      color: 'cyan'
    })
  },
  projects: {
    description: 'Navigate to projects',
    output: () => ({
      type: 'navigate',
      path: '/projects',
      message: 'Navigating to projects...',
      color: 'cyan'
    })
  },
  experience: {
    description: 'Navigate to experience',
    output: () => ({
      type: 'navigate',
      path: '/experience',
      message: 'Navigating to experience...',
      color: 'cyan'
    })
  },
  education: {
    description: 'Navigate to education',
    output: () => ({
      type: 'navigate',
      path: '/education',
      message: 'Navigating to education...',
      color: 'cyan'
    })
  },
};

export default function InteractiveTerminal({ profile, autoCommand = 'about', customCommands = null, customIntroLines = null }) {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const typingDone = useRef(false);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  // Auto-type initial commands on load
  useEffect(() => {
    if (typingDone.current) return;
    typingDone.current = true;

    const introLines = customIntroLines || [
      { type: 'system', text: `Welcome to ${profile.name || 'Developer'}'s terminal`, color: 'cyan' },
      { type: 'system', text: 'Type "help" for available commands', color: 'yellow' },
      { type: 'system', text: '' },
    ];

    const autoCommands = [
      { cmd: autoCommand, delay: 600 },
    ];

    let timeout;
    const timeouts = [];

    // Show intro
    setHistory(introLines);

    // Auto-type commands sequentially
    let totalDelay = 0;
    autoCommands.forEach(({ cmd, delay }) => {
      totalDelay += delay;
      const t = setTimeout(() => {
        executeCommand(cmd, true);
      }, totalDelay);
      timeouts.push(t);
    });

    // Enable input after auto-typing
    totalDelay += 800;
    const enableInput = setTimeout(() => {
      setIsTyping(false);
      inputRef.current?.focus();
    }, totalDelay);
    timeouts.push(enableInput);

    return () => {
      timeouts.forEach(clearTimeout);
      typingDone.current = false;
    };
  }, [profile]);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  const executeCommand = useCallback((rawCmd, isAuto = false) => {
    const trimmed = rawCmd.trim().toLowerCase();
    const parts = trimmed.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    // Add the command prompt to history
    const promptEntry = {
      type: 'prompt',
      text: rawCmd.trim(),
    };

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd === 'theme') {
      const themeArg = args[0];
      if (themeArg === 'dark' || themeArg === 'light') {
        document.documentElement.setAttribute('data-theme', themeArg);
        localStorage.setItem('theme', themeArg);
        setHistory(prev => [...prev, promptEntry, {
          type: 'system',
          text: `Theme switched to ${themeArg}`,
          color: 'green'
        }]);
      } else {
        setHistory(prev => [...prev, promptEntry, {
          type: 'system',
          text: 'Usage: theme [dark|light]',
          color: 'yellow'
        }]);
      }
      return;
    }

    const activeCommands = customCommands || COMMANDS;
    const command = activeCommands[cmd];
    if (!command) {
      setHistory(prev => [...prev, promptEntry, {
        type: 'system',
        text: `Command not found: "${cmd}". Type "help" for available commands.`,
        color: 'red'
      }]);
      return;
    }

    const result = command.output(profile);

    // Add prompt + result to history
    setHistory(prev => [...prev, promptEntry, { type: 'result', data: result }]);

    // Handle navigation/action after a brief delay
    if (result.type === 'navigate') {
      setTimeout(() => router.push(result.path), 600);
    } else if (result.type === 'action' && result.action === 'open') {
      setTimeout(() => window.open(result.url, '_blank'), 400);
    }
  }, [profile, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    setCmdHistory(prev => [input.trim(), ...prev]);
    setHistoryIndex(-1);
    executeCommand(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const focusInput = () => {
    if (!isTyping) inputRef.current?.focus();
  };

  const renderResult = (data) => {
    switch (data.type) {
      case 'table':
        return (
          <div className={styles.table}>
            {data.rows.map((row, i) => (
              <div key={i} className={styles.tableRow}>
                <span className={`${styles.tableCmd} ${styles.yellow}`}>{row.cmd}</span>
                <span className={styles.tableSep}>—</span>
                <span className={styles.tableDesc}>{row.desc}</span>
              </div>
            ))}
          </div>
        );

      case 'lines':
        return (
          <div className={styles.outputLines}>
            {data.lines.map((line, i) => (
              <div key={i} className={`${styles.outputLine} ${styles[line.color] || ''} ${line.bold ? styles.bold : ''}`}>
                {line.text}
              </div>
            ))}
          </div>
        );

      case 'links':
        return (
          <div className={styles.outputLines}>
            {data.links.map((link, i) => (
              <div key={i} className={styles.linkLine}>
                <span className={styles.linkLabel}>{link.label}</span>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={`${styles.linkValue} ${styles[link.color] || ''}`}
                >
                  {link.value}
                </a>
              </div>
            ))}
          </div>
        );

      case 'navigate':
        return (
          <div className={`${styles.outputLine} ${styles[data.color] || ''}`}>
            {data.message}
          </div>
        );

      case 'action':
        return (
          <div className={`${styles.outputLine} ${styles[data.color] || ''}`}>
            {data.message}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.terminal} onClick={focusInput}>
      <div className={styles.terminalHeader}>
        <span className={styles.dot} style={{ background: '#e87070' }} />
        <span className={styles.dot} style={{ background: '#e8c86e' }} />
        <span className={styles.dot} style={{ background: '#7ec89b' }} />
        <span className={styles.headerTitle}>
          {profile.name?.toLowerCase().replace(/\s/g, '') || 'user'}@portfolio ~ %
        </span>
      </div>
      <div className={styles.terminalBody} ref={bodyRef}>
        {history.map((entry, i) => {
          if (entry.type === 'prompt') {
            return (
              <div key={i} className={styles.promptLine}>
                <span className={styles.promptSymbol}>❯</span>
                <span className={styles.promptText}>{entry.text}</span>
              </div>
            );
          }
          if (entry.type === 'system') {
            return (
              <div key={i} className={`${styles.systemLine} ${styles[entry.color] || ''}`}>
                {entry.text || '\u00A0'}
              </div>
            );
          }
          if (entry.type === 'result') {
            return <div key={i} className={styles.resultBlock}>{renderResult(entry.data)}</div>;
          }
          return null;
        })}

        {/* Input line */}
        {!isTyping && (
          <form onSubmit={handleSubmit} className={styles.inputLine}>
            <span className={styles.promptSymbol}>❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.inputField}
              placeholder="Type a command..."
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </form>
        )}

        {isTyping && (
          <div className={styles.typingIndicator}>
            <span className={styles.promptSymbol}>❯</span>
            <span className={styles.typingDots}>
              <span>.</span><span>.</span><span>.</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
