import type { ImgHTMLAttributes } from "react";

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

/** 优先 AVIF，其次 WebP，最终回退到传入的 PNG/JPEG 资源。 */
export function ResponsiveImage({ src, ...props }: ResponsiveImageProps) {
  const webp = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const avif = src.replace(/\.(png|jpe?g|webp)$/i, ".avif");

  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img src={src} {...props} />
    </picture>
  );
}
