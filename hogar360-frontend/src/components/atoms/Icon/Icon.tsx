interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon = ({ name, size = 24, className = '' }: IconProps) => {
  return (
    <img
      src={`/src/assets/images/${name}.svg`}
      alt={name}
      width={size}
      height={size}
      className={className}
    />
  );
};