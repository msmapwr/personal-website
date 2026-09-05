import type { ImgHTMLAttributes } from "react";

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const dimensions: Record<string, [number, number]> = {
  "images/the-second-oasis/mainmenu.png": [1904, 947],
  "images/the-second-oasis/ingame.png": [1904, 945],
  "images/personal-website/personal-website.png": [1101, 501],
  "images/create-stratosphere/main.png": [1366, 768],
  "images/create-stratosphere/flight.png": [1366, 768],
};

/** 优先 AVIF，其次 WebP，最终回退到传入的 PNG/JPEG 资源。 */
export function ResponsiveImage({ src, ...props }: ResponsiveImageProps) {
  const base = src.replace(/\.(png|jpe?g|webp)$/i, "");
  const webpSet = `${base}-640.webp 640w, ${base}-1024.webp 1024w`;
  const avifSet = `${base}-640.avif 640w, ${base}-1024.avif 1024w`;
  const [width, height] = dimensions[src] ?? [];

  return (
    <picture>
      <source srcSet={avifSet} sizes={props.sizes} type="image/avif" />
      <source srcSet={webpSet} sizes={props.sizes} type="image/webp" />
      <img src={src} width={width} height={height} {...props} />
    </picture>
  );
}
