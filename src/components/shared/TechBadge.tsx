interface TechBadgeProps {
  label: string;
}

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: 'var(--font-geist-mono)',
        color: 'var(--clr-accent)',
        background: 'var(--clr-accent-subtle)',
        border: '1px solid color-mix(in srgb, var(--clr-accent) 20%, transparent)',
        whiteSpace: 'nowrap' as const,
        transition: 'box-shadow 0.2s',
      }}
    >
      {label}
    </span>
  );
}
