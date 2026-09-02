import { useEffect, useState } from "react";

export default function SafeImage({ src, alt, className = "", eager = false, ...rest }) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setFailed(!src);
  }, [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-secondary text-muted-foreground ${className}`}
      >
        <span className="text-xs font-semibold tracking-[0.18em] uppercase">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
