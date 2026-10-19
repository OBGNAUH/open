'use client';

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  online?: boolean;
  onClick?: () => void;
}

export default function Avatar({ src, alt, size = 40, online, onClick }: AvatarProps) {
  return (
    <div className="relative flex-shrink-0" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <img
        src={src}
        alt={alt}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
      {online !== undefined && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2"
          style={{
            width: size * 0.3,
            height: size * 0.3,
            borderColor: 'var(--bg-primary)',
            background: online ? 'var(--success)' : 'var(--text-muted)',
          }}
        />
      )}
    </div>
  );
}
