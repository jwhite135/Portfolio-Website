import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, Linkedin, Github } from 'lucide-react';
import emailjs from '@emailjs/browser';
import PageHeader from './PageHeader';
import { fadeUp, stagger } from '../lib/motion';

/**
 * EmailJS credentials.
 *
 * These are public by design — EmailJS is a browser-side service and every
 * value here ships in the bundle no matter where it is stored, so moving them
 * to environment variables would only obscure them, not protect them. The
 * controls that actually matter are configured in the EmailJS dashboard:
 * restrict the public key to this domain, and enable their abuse protection.
 * The honeypot and cooldown below are the client-side half of that.
 */
const EMAILJS_SERVICE_ID = 'service_yd9c699';
const EMAILJS_TEMPLATE_ID = 'template_vffrgvf';
const EMAILJS_PUBLIC_KEY = 'ALHC7UWtOIeyVm-hs';

/** Minimum gap between sends from one browser session. */
const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = 'contact:lastSent';

const LIMITS = { name: 100, email: 254, subject: 150, message: 4000 };

type Status = 'idle' | 'sending' | 'success' | 'error';

const emptyForm = { name: '', email: '', subject: '', message: '' };

const directLinks = [
  { href: 'mailto:jwhite010305@gmail.com', icon: Mail, label: 'jwhite010305@gmail.com' },
  { href: 'https://linkedin.com/in/josiahawhite', icon: Linkedin, label: 'linkedin.com/in/josiahawhite' },
  { href: 'https://github.com/jwhite135', icon: Github, label: 'github.com/jwhite135' },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  /** Bots fill hidden inputs; humans never see this one. */
  const [honeypot, setHoneypot] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Silently succeed for bots so they get no signal to retry.
    if (honeypot) {
      setStatus('success');
      setFormData(emptyForm);
      return;
    }

    const last = Number(sessionStorage.getItem(COOLDOWN_KEY) ?? 0);
    const wait = COOLDOWN_MS - (Date.now() - last);
    if (wait > 0) {
      setErrorMessage(`Please wait ${Math.ceil(wait / 1000)} seconds before sending another message.`);
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name.slice(0, LIMITS.name),
          from_email: formData.email.slice(0, LIMITS.email),
          reply_to: formData.email.slice(0, LIMITS.email),
          subject: formData.subject.slice(0, LIMITS.subject),
          message: formData.message.slice(0, LIMITS.message),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      sessionStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      setStatus('success');
      setFormData(emptyForm);
    } catch (error: unknown) {
      // Log the provider's detail for debugging, but show the visitor a plain
      // message — raw transport errors are noise to them and can leak
      // configuration detail.
      console.error('EmailJS send failed:', error);
      setErrorMessage('');
      setStatus('error');
    }
  };

  // Move focus to the result so keyboard and screen-reader users land on the
  // outcome instead of being left on a button whose label has not changed.
  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus();
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error' || status === 'success') setStatus('idle');
  };

  const field = (
    name: keyof typeof emptyForm,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement>
  ) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
        maxLength={LIMITS[name]}
        className="vscode-input w-full"
        {...props}
      />
    </div>
  );

  return (
    <motion.div
      variants={stagger(0.07)}
      initial="hidden"
      animate="show"
      className="p-6 sm:p-8 vscode-content"
    >
      <PageHeader
        className_="Contact"
        title="Contact"
        comment="Send a message, or reach me directly through any of the links below"
      />

      <div className="max-w-2xl">
        <motion.div variants={fadeUp} className="vscode-terminal p-5">
          <form onSubmit={handleSubmit} className="space-y-4" aria-busy={status === 'sending'}>
            <div className="grid sm:grid-cols-2 gap-4">
              {field('name', 'Name', { type: 'text', autoComplete: 'name', placeholder: 'Your name' })}
              {field('email', 'Email', {
                type: 'email',
                autoComplete: 'email',
                placeholder: 'you@example.com',
              })}
            </div>

            {field('subject', 'Subject', {
              type: 'text',
              autoComplete: 'off',
              placeholder: "What's this about?",
            })}

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                maxLength={LIMITS.message}
                className="vscode-input w-full resize-y"
                placeholder="Tell me what you have in mind…"
              />
              <p className="mt-1 text-xs text-fg-muted text-right tabular-nums">
                {formData.message.length} / {LIMITS.message}
              </p>
            </div>

            {/* Honeypot: hidden from people, irresistible to form bots. */}
            <div className="absolute w-px h-px -m-px overflow-hidden" aria-hidden="true">
              <label htmlFor="company-website">Leave this field empty</label>
              <input
                id="company-website"
                name="company-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="vscode-button w-full flex items-center justify-center gap-2
                         disabled:opacity-60"
            >
              {status === 'sending' ? (
                <>
                  <span
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                  />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Send message
                </>
              )}
            </button>

            {/* Single live region for both outcomes, so a screen reader
                announces the result once rather than reading a changed
                button label it may have already passed. */}
            <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite">
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 p-3 bg-green-900/20 border border-green-500/30
                             rounded text-green-300 text-sm"
                >
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  Message sent. I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/30
                             rounded text-red-300 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  {errorMessage ||
                    "That didn't send. Try again in a moment, or email me directly at jwhite010305@gmail.com."}
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>

        <motion.section variants={fadeUp} className="mt-8" aria-labelledby="contact-direct">
          <h2 id="contact-direct" className="text-sm font-semibold uppercase tracking-[0.12em] text-fg-muted mb-3">
            Or reach me directly
          </h2>
          <ul className="space-y-1">
            {directLinks.map(({ href, icon: Icon, label }) => {
              const external = href.startsWith('http');
              return (
                <li key={href}>
                  <a
                    href={href}
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="inline-flex items-center gap-2.5 px-3 py-2 -mx-3 rounded text-sm
                               hover:bg-surface transition-colors duration-150"
                  >
                    <Icon className="w-4 h-4 text-accent-text shrink-0" aria-hidden="true" />
                    {label}
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Contact;
