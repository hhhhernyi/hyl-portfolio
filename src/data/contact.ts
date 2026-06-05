// ──────────────────────────────────────────────────────────────
// TODO: Fill in your details before deploying.
// Search for "TODO" to find all placeholder values.
// ──────────────────────────────────────────────────────────────

export const CONTACT = {
  name:      'Hern Yi Lee',
  title:     'Software Engineer',
  location:  'Singapore',
  linkedin:  'https://www.linkedin.com/in/hern-yi-lee/',
  github:    'https://github.com/hhhhernyi',   // TODO: replace
  email:     'mailto:hyileenet@gmail.com',             // TODO: replace
  whatsapp:  'https://wa.me/6598275085',        // TODO: replace (e.g. wa.me/6591234567)
  resume:    '/resume.pdf',
} as const;

export type ContactKey = keyof typeof CONTACT;
