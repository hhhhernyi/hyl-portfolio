'use client';

import { useState, useRef } from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 8,
  border: '1px solid var(--clr-border)',
  background: 'var(--clr-card)',
  color: 'var(--clr-text)',
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

export default function Contact() {
  const [form, setForm]     = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name:    form.name,
          email:   form.email,
          subject: `Portfolio contact from ${form.name}`,
          message: form.message,
          botcheck: false,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: '100px 24px 120px',
        background: 'color-mix(in srgb, var(--clr-bg) 95%, var(--clr-accent) 5%)',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>

        {/* Header */}
        <ScrollReveal>
          <p style={{
            fontFamily: 'var(--font-geist-mono)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--clr-accent)', marginBottom: 12,
          }}>
            // get_in_touch
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
            color: 'var(--clr-text)', letterSpacing: '-0.03em', marginBottom: 16,
          }}>
            Let&apos;s build something.
          </h2>
          <p style={{
            fontSize: 16, color: 'var(--clr-mid)', lineHeight: 1.7,
            maxWidth: 420, margin: '0 auto 48px',
          }}>
            Fill in the form and I&apos;ll get back to you.
          </p>
        </ScrollReveal>

        {/* Form / Success state */}
        <ScrollReveal delay={0.1}>
          {status === 'success' ? (
            <div style={{
              padding: '40px 32px',
              borderRadius: 16,
              background: 'var(--clr-card)',
              border: '1px solid rgba(16,185,129,0.3)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            }}>
              {/* Tick */}
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(16,185,129,0.15)',
                border: '1.5px solid rgba(16,185,129,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}>
                ✓
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--clr-text)', margin: 0 }}>
                Message sent!
              </p>
              <p style={{ fontSize: 14, color: 'var(--clr-mid)', margin: 0 }}>
                I&apos;ll be in touch shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{
                  marginTop: 8, padding: '8px 20px', borderRadius: 8,
                  border: '1px solid var(--clr-border)',
                  background: 'transparent', color: 'var(--clr-muted)',
                  fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-geist-mono)',
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex', flexDirection: 'column', gap: 16,
                textAlign: 'left',
              }}
            >
              {/* Name */}
              <div>
                <label style={{
                  display: 'block', fontSize: 12, fontWeight: 600,
                  color: 'var(--clr-muted)', fontFamily: 'var(--font-geist-mono)',
                  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6,
                }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--clr-accent)')}
                  onBlur={(e) =>  (e.target.style.borderColor = 'var(--clr-border)')}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block', fontSize: 12, fontWeight: 600,
                  color: 'var(--clr-muted)', fontFamily: 'var(--font-geist-mono)',
                  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6,
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--clr-accent)')}
                  onBlur={(e) =>  (e.target.style.borderColor = 'var(--clr-border)')}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{
                  display: 'block', fontSize: 12, fontWeight: 600,
                  color: 'var(--clr-muted)', fontFamily: 'var(--font-geist-mono)',
                  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6,
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--clr-accent)')}
                  onBlur={(e) =>  (e.target.style.borderColor = 'var(--clr-border)')}
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <p style={{
                  fontSize: 13, color: '#ef4444', margin: 0,
                  fontFamily: 'var(--font-geist-mono)',
                }}>
                  ⚠ {errMsg}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  padding: '13px 24px',
                  borderRadius: 8,
                  border: 'none',
                  background: status === 'loading'
                    ? 'color-mix(in srgb, var(--clr-accent) 60%, transparent)'
                    : 'var(--clr-accent)',
                  color: '#050a14',
                  fontSize: 14, fontWeight: 700,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.opacity = '0.88'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                {status === 'loading' ? (
                  <>
                    <span style={{
                      width: 14, height: 14, borderRadius: '50%',
                      border: '2px solid rgba(5,10,20,0.3)',
                      borderTopColor: '#050a14',
                      animation: 'spin 0.7s linear infinite',
                      display: 'inline-block',
                    }} />
                    Sending…
                  </>
                ) : (
                  'Send Message →'
                )}
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
