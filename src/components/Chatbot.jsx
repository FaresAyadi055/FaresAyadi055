import { useEffect, useRef, useState } from 'react';
import { Button, TextField, Input, Label } from 'react-aria-components';
import { MessageSquare, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import benderIcon from '../asset/bender.png';
import { sendChatMessage, trackEvent, fetchChatHistory } from '../lib/api.js';

const GREETING_TEXT = "Hi, I'm Bender Bending Rodríguez the automated representative of Fares Ayadi, Ask me about services, the tech stack, timelines, or pricing — I'll do my best, and hand you off to a human for anything specific.";

const WORD_DELAY = 80;

function TypewriterText({ text }) {
  const [visibleWords, setVisibleWords] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    if (visibleWords >= words.length) return;
    const timer = setTimeout(() => setVisibleWords((w) => w + 1), WORD_DELAY);
    return () => clearTimeout(timer);
  }, [visibleWords, words.length]);

  return (
    <span>
      {words.slice(0, visibleWords).join(' ')}
      {visibleWords < words.length && <span className="cursor-blink">▌</span>}
    </span>
  );
}

function StreamedText({ text }) {
  return (
    <span>
      {text}
      <span className="cursor-blink">▌</span>
    </span>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const waitingForResponse = useRef(false);

  useEffect(() => {
    let id = localStorage.getItem('chat_session_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('chat_session_id', id);
    }
    setSessionId(id);

    fetchChatHistory(id)
      .then(history => {
        if (history.length > 0) {
          setMessages([GREETING, ...history]);
        }
        setShowGreeting(true);
      })
      .catch(() => {
        setShowGreeting(true);
      });
  }, []);

  useEffect(() => {
    if (hasAutoOpened) return;
    const timer = setTimeout(() => {
      setOpen(true);
      setHasAutoOpened(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      trackEvent({ type: 'chatbot_open' });
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streamingText, sending]);

  const GREETING = {
    role: 'assistant',
    content: GREETING_TEXT,
  };

  const displayMessages = messages.length > 0 ? messages : (showGreeting ? [GREETING] : []);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending || !sessionId) return;

    const greetingMsg = { role: 'assistant', content: GREETING_TEXT };
    const baseMessages = displayMessages.length === 0 ? [greetingMsg] : displayMessages;

    const now = Date.now();
    const nextMessages = [...baseMessages, { role: 'user', content: text, timestamp: now }];
    setMessages(nextMessages);
    setShowGreeting(true);
    setInput('');
    setError(null);
    setSending(true);
    setIsStreaming(true);
    setStreamingText('');
    waitingForResponse.current = true;

    try {
      await sendChatMessage(sessionId, nextMessages, {
        onChunk(chunk) {
          waitingForResponse.current = false;
          setStreamingText(prev => prev + chunk);
        },
        onDone(fullReply) {
          waitingForResponse.current = false;
          setMessages(prev => [...prev, { role: 'assistant', content: fullReply, timestamp: Date.now() }]);
          setStreamingText('');
          setIsStreaming(false);
          setSending(false);
        },
      });
    } catch (err) {
      waitingForResponse.current = false;
      setError('The assistant is unreachable right now — try email or WhatsApp instead.');
      setStreamingText('');
      setIsStreaming(false);
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
            <div className="flex items-center gap-3">
              <img
                src={benderIcon}
                alt="Bender"
                className="-mt-2 h-9 w-9 scale-125 rounded-full border border-blue-line bg-ink-deep object-contain p-0.5"
              />
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-blue-bright">Bender</p>
                <p className="font-mono text-[11px] text-paper-dim">Status: online</p>
              </div>
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
            {displayMessages.map((m, i) => {
              const isGreeting = i === 0 && m.role === 'assistant' && m.content === GREETING_TEXT;
              const showTypewriter = isGreeting && messages.length === 0 && showGreeting;

              return (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-sm px-3 py-2 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'ml-auto bg-blue-line/30 text-paper'
                      : 'border border-ink-line bg-ink-panel/40 text-paper-dim'
                  }`}
                >
                  {m.role === 'user'
                    ? m.content
                    : (
                      <div className="markdown">
                        {showTypewriter
                          ? <TypewriterText text={m.content} />
                          : <ReactMarkdown>{m.content}</ReactMarkdown>
                        }
                      </div>
                    )}
                  {m.timestamp && (
                    <p className="mt-1 font-mono text-[10px] opacity-60">
                      {new Date(m.timestamp).toLocaleTimeString()}
                    </p>
                  )}
                </div>
              );
            })}
            {isStreaming && streamingText && (
              <div className="max-w-[85%] rounded-sm border border-ink-line bg-ink-panel/40 px-3 py-2 text-sm leading-relaxed text-paper-dim">
                <div className="markdown">
                  <StreamedText text={streamingText} />
                </div>
              </div>
            )}
            {(sending && (waitingForResponse.current || (!streamingText && isStreaming))) && (
              <div className="max-w-[85%] rounded-sm border border-ink-line bg-ink-panel/40 px-4 py-3 text-sm text-paper-dim">
                <div className="typing-dots" aria-label="Bender is typing">
                  <span />
                  <span />
                  <span />
                </div>
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
        className="neon-glow flex items-center gap-2 rounded-full border border-blue-line bg-ink-panel px-4 py-3 font-mono text-xs uppercase tracking-widest text-paper shadow-lg outline-none transition-all hover:scale-105 hover:border-blue-bright data-[focus-visible]:border-blue-bright"
      >
        <MessageSquare className="h-4 w-4 text-blue-bright" />
        {open ? 'Close' : 'TALK TO MY AI'}
      </Button>
    </div>
  );
}
