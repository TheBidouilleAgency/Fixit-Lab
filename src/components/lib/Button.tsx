export default function Button({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      className={`relative overflow-hidden rounded-md border border-white px-6 py-3 text-white transition duration-300 before:absolute before:bottom-0 before:left-0 before:z-0 before:h-0 before:w-full before:bg-white before:transition-all before:duration-300 hover:text-black hover:before:h-full ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
