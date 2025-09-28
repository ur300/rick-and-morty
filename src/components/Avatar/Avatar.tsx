type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
};

export function Avatar({
  src,
  alt,
  className = "w-12 h-12 rounded-full object-cover",
}: AvatarProps) {
  return <img src={src} alt={alt} className={className} />;
}
