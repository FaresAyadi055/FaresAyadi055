import { useEffect, useRef, useState } from 'react';
import { Button, TextField, Input, Label } from 'react-aria-components';
import { MessageSquare, X, Send } from 'lucide-react';
import { sendChatMessage, trackEvent } from '../lib/api.js';

const GREETING = {
  role: 'assistant',
  content:
    "Hi, I'm the automated spokesperson for this studio. Ask me about services, the tech stack, timelines, or pricing — I'll do my best, and hand you off to a human for anything specific.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      trackEvent({ type: 'chatbot_open' });
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setSending(true);

    try {
      const { reply } = await sendChatMessage(nextMessages);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError('The assistant is unreachable right now — try email or WhatsApp instead.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="AI spokesperson chat"
          className="flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-sm border border-ink-line bg-ink-deep shadow-2xl shadow-black/40"
        >
          <div className="flex items-center justify-between border-b border-ink-line bg-ink-panel/60 px-4 py-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-blue-bright">AI Spokesperson</p>
              <p className="font-mono text-[11px] text-paper-dim">Status: online</p>
            </div>
            <Button
              onPress={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-7 w-7 place-items-center rounded-sm text-paper-dim outline-none transition-colors hover:text-paper data-[focus-visible]:text-paper"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-sm px-3 py-2 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'ml-auto bg-blue-line/30 text-paper'
                    : 'border border-ink-line bg-ink-panel/40 text-paper-dim'
                }`}
              >
                {m.content}
              </div>
            ))}
            {sending && (
              <div className="max-w-[85%] rounded-sm border border-ink-line bg-ink-panel/40 px-3 py-2 text-sm text-paper-dim">
                Typing…
              </div>
            )}
            {error && <p className="font-mono text-xs text-copper">{error}</p>}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-ink-line p-3">
            <TextField value={input} onChange={setInput} className="flex-1" aria-label="Message">
              <Label className="sr-only">Message</Label>
              <Input
                ref={inputRef}
                placeholder="Ask about services, pricing, timelines…"
                className="w-full rounded-sm border border-ink-line bg-ink-panel/40 px-3 py-2 text-sm text-paper outline-none placeholder:text-paper-dim/60 data-[focus-visible]:border-blue-bright"
              />
            </TextField>
            <Button
              type="submit"
              isDisabled={sending || !input.trim()}
              aria-label="Send message"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-copper text-ink-deep outline-none transition-opacity disabled:opacity-40 data-[focus-visible]:ring-2 data-[focus-visible]:ring-blue-bright"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      <Button
        onPress={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Open chat with the AI spokesperson'}
        className="flex items-center gap-2 rounded-full border border-blue-line bg-ink-panel px-4 py-3 font-mono text-xs uppercase tracking-widest text-paper shadow-lg outline-none transition-colors hover:border-blue-bright data-[focus-visible]:border-blue-bright"
      >
        <MessageSquare className="h-4 w-4 text-blue-bright" />
        {open ? 'Close' : 'Ask the AI'}
      </Button>
    </div>
  );
}
