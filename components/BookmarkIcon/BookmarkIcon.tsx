type BookmarkIconProps = {
  filled: boolean;
  size?: number;
  className?: string;
};

export default function BookmarkIcon({ filled, size = 24, className }: BookmarkIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 3h12v18l-6-4-6 4Z" />
    </svg>
  );
}
