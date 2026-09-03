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

function RedditIcon(props) {
  return (
    <svg viewBox="0 0 192 192" fill="none" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m33.067 111.226 5.826 1.435a6 6 0 0 0-3.978-7.143l-1.848 5.708Zm17.548-25.068-4.728 3.694a6 6 0 0 0 8.341 1.096l-3.613-4.79Zm90.77 0-3.613 4.79a6 6 0 0 0 8.341-1.096l-4.728-3.694Zm17.548 25.068-1.848-5.708a6 6 0 0 0-3.978 7.143l5.826-1.435ZM96 174.001c18.846 0 36.138-5.722 48.855-15.259C157.573 149.203 166 135.568 166 120.001h-12c0 10.943-5.9 21.307-16.345 29.141-10.447 7.835-25.155 12.859-41.655 12.859v12Zm-70-54c0 15.567 8.427 29.202 21.145 38.741 12.717 9.537 30.01 15.259 48.855 15.259v-12c-16.5 0-31.208-5.024-41.655-12.859C43.9 141.308 38 130.944 38 120.001H26Zm1.241-10.21A42.616 42.616 0 0 0 26 120.001h12c0-2.505.306-4.956.893-7.34l-11.652-2.87ZM16 96.001c0 9.793 6.394 18.076 15.219 20.933l3.696-11.416A10.007 10.007 0 0 1 28 96.001H16Zm22-22c-12.15 0-22 9.85-22 22h12c0-5.523 4.477-10 10-10v-12Zm17.343 8.463C51.326 77.324 45.049 74 38 74v12c3.2 0 6.047 1.496 7.887 3.851l9.456-7.388ZM96 66c-18.916 0-36.268 5.764-48.998 15.367l7.226 9.58C64.682 83.063 79.438 78 96 78V66Zm48.998 15.367C132.268 71.765 114.916 66 96 66v12c16.563 0 31.318 5.062 41.772 12.947l7.226-9.58Zm1.115 8.484a9.972 9.972 0 0 1 7.887-3.85v-12c-7.05 0-13.326 3.322-17.343 8.463l9.456 7.388Zm7.887-3.85c5.523 0 10 4.477 10 10h12c0-12.15-9.85-22-22-22v12Zm10 10c0 4.438-2.895 8.215-6.915 9.517l3.696 11.416c8.825-2.857 15.219-11.14 15.219-20.933h-12Zm2 24a42.63 42.63 0 0 0-1.241-10.21l-11.652 2.87c.587 2.384.893 4.835.893 7.34h12Z" />
      <circle cx="68" cy="110.001" r="12" fill="currentColor" />
      <circle cx="124" cy="110.001" r="12" fill="currentColor" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="12" d="M120 138.001s-8 6-24 6-24-6-24-6" />
      <circle cx="146" cy="36.001" r="12" stroke="currentColor" strokeWidth="12" />
      <path fill="currentColor" fillRule="evenodd" d="M107.177 22.118a6 6 0 0 0-7.028 4.553l-10 44a6 6 0 1 0 11.702 2.66l8.704-38.3 24.074 4.815A11.985 11.985 0 0 1 134 36c0-3.036 1.127-5.808 2.986-7.922l-29.809-5.961Z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const CHANNELS = [
  {
    id: 'email',
    label: 'Email',
    value: 'faresayadi055@gmail.com',
    href: 'mailto:faresayadi055@gmail.com',
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
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/fares-ayadi',
    href: 'https://www.linkedin.com/in/fares-ayadi-13267127b',
    Icon: LinkedInIcon,
    note: 'Professional profile & network',
  },
  {
    id: 'reddit',
    label: 'Reddit',
    value: 'u/mr_ugly_raven',
    href: 'https://www.reddit.com/user/mr_ugly_raven',
    Icon: RedditIcon,
    note: 'Community & discussions',
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
