type ButtonProps = {
  name: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined,
  className?: string
};
export default function Button({name, onClick, type = 'button', className}: ButtonProps) {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {name}
    </button>
  );
}
