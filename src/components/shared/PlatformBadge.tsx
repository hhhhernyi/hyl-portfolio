import { type ProjectPlatform } from '@/data/projects';

interface PlatformBadgeProps {
  platform: ProjectPlatform;
}

const pill = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '2px 8px',
  borderRadius: 4,
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.06em',
  fontFamily: 'var(--font-geist-mono)',
  background: 'var(--clr-accent-subtle)',
  color: 'var(--clr-accent)',
  border: '1px solid color-mix(in srgb, var(--clr-accent) 20%, transparent)',
};

export default function PlatformBadge({ platform }: PlatformBadgeProps) {
  if (platform === 'web') {
    return <span style={pill}>🌐 Web</span>;
  }
  if (platform === 'mobile') {
    return <span style={pill}>📱 Mobile</span>;
  }
  return (
    <span style={{ display: 'inline-flex', gap: 4 }}>
      <span style={pill}>🌐 Web</span>
      <span style={pill}>📱 Mobile</span>
    </span>
  );
}
