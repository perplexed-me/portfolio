'use client';
import InteractiveTerminal from '@/app/components/InteractiveTerminal';

export default function ContactTerminal({ profile }) {
  const emailCmd = profile?.email ? {
    email: {
      description: 'Show my email address',
      output: () => ({
        type: 'links',
        links: [{ label: '📧 Email', value: profile.email, href: `mailto:${profile.email}`, color: 'green' }]
      })
    }
  } : {};

  const socialCmds = (profile?.socialLinks || []).reduce((acc, link) => {
    const cmdName = link.platform.toLowerCase();
    acc[cmdName] = {
      description: `Visit my ${link.platform}`,
      output: () => ({
        type: 'action',
        action: 'open',
        url: link.url,
        message: `Opening ${link.platform}...`,
        color: 'cyan'
      })
    };
    return acc;
  }, {});

  const customCommands = {
    ...emailCmd,
    ...socialCmds,
  };

  // Add dynamic help
  customCommands.help = {
    description: 'Show available commands',
    output: () => ({
      type: 'table',
      rows: [
        ...Object.keys(customCommands).filter(k => k !== 'help').map(k => ({
          cmd: k,
          desc: customCommands[k].description
        })),
        { cmd: 'clear', desc: 'Clear terminal' }
      ]
    })
  };

  const introLines = [
    { type: 'system', text: `Contact Terminal`, color: 'cyan' },
    { type: 'system', text: 'Type "help" to see available contact commands', color: 'yellow' },
    { type: 'system', text: '' },
  ];

  return (
    <InteractiveTerminal 
      profile={profile} 
      customCommands={customCommands} 
      customIntroLines={introLines} 
      autoCommand="help" 
    />
  );
}
