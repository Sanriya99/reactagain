import { useState } from 'react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = { name: '', email: '', message: '' };


const BACKGROUND_IMAGE = '/images/about.jpg';

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(form.email.trim())) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setStatus({ type: 'sending', text: 'Sending...' });

    let response;
    try {
      response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      setStatus({ type: 'error', text: 'Could not reach the server. Is "npm run server" running?' });
      return;
    }

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus({
        type: 'error',
        text: data.error || `Server error (${response.status}). Make sure "npm run server" is running.`,
      });
      return;
    }

    setForm(EMPTY_FORM);
    setStatus({ type: 'success', text: 'Thanks! Your message has been saved.' });
  }

  return (
    <section
      className="page-bg"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE})`,
      }}
    >
      <div className="page">
        <h1 className="page-title">Reach Out to Me</h1>
        <h3 className="contact-lead">Have an idea? Let’s bring it to life. I’m always open to connecting, exploring new possibilities, and building something meaningful together. Let’s create something incredible!</h3>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Message
            <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
          </label>

          <button type="submit" className="btn btn-primary" disabled={status.type === 'sending'}>
            Send Message
          </button>

          {status.text && <p className={`status ${status.type}`}>{status.text}</p>}
        </form>
      </div>
    </section>
  );
}
