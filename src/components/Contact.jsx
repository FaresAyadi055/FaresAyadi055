import { Link } from 'react-aria-components';
import { Mail, Github } from 'lucide-react';
import { trackEvent } from '../lib/api.js';

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6l.4-.5c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4 15.1 3.6 13.6 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.2-8.4 8.2Z" />
    </svg>
  );
}

function DiscordIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.3 5.3A18 18 0 0 0 15.9 4c-.2.4-.4.9-.6 1.3a16.6 16.6 0 0 0-4.6 0c-.2-.4-.4-.9-.6-1.3-1.5.3-3 .8-4.4 1.4C2.9 9 2.2 12.6 2.5 16.2a18.3 18.3 0 0 0 5.5 2.8c.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.8-.9l.4-.3c3.4 1.6 7.2 1.6 10.6 0l.4.3c-.6.4-1.2.7-1.8.9.3.7.7 1.3 1.1 1.9a18.2 18.2 0 0 0 5.5-2.8c.4-4.2-.7-7.7-2.2-10.9ZM9.7 14c-1 0-1.9-.9-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1S10.8 14 9.7 14Zm5.6 0c-1 0-1.9-.9-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1Z" />
    </svg>
  );
}

const CHANNELS = [
  {
    id: 'email',
    label: 'Email',
    value: 'faresayadi@gmail.com',
    href: 'mailto:faresayadi@gmail.com',
    Icon: Mail,
    note: 'Best for project briefs',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+216 28270640',
    href: 'https://wa.me/21628270640',
    Icon: WhatsAppIcon,
    note: 'Best for quick questions',
  },
  {
    id: 'discord',
    label: 'Discord',
    value: 'drip_kermit',
    href: 'https://discord.com/',
    Icon: DiscordIcon,
    note: 'Best for ongoing projects',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/FaresAyadi055',
    href: 'https://github.com/FaresAyadi055',
    Icon: Github,
    note: 'Code samples & open source',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="border-b border-ink-line/70 bg-ink-panel/20">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <header className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-bright">Sign-off</p>
          <h2 className="mt-3 font-mono text-3xl font-semibold text-paper md:text-4xl">Get in touch</h2>
          <p className="mt-4 text-paper-dim">
            Pick whichever channel you already use. I reply within one business day.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map(({ id, label, value, href, Icon, note }) => (
            <Link
              key={id}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              onPress={() => trackEvent({ type: 'contact_click', channel: id })}
              className="group flex cursor-pointer flex-col justify-between rounded-sm border border-ink-line/70 bg-ink-deep p-6 outline-none transition-colors hover:border-blue-bright data-[focus-visible]:border-blue-bright"
            >
              <Icon className="h-6 w-6 text-blue-bright" />
              <div className="mt-6">
                <p className="font-mono text-sm font-semibold text-paper">{label}</p>
                <p className="mt-1 truncate font-mono text-xs text-paper-dim">{value}</p>
                <p className="mt-3 text-xs text-paper-dim/70">{note}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
