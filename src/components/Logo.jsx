export default function Logo({ className = "" }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      AFFORDABLE<span className="text-primary">.</span>TIRES
    </span>
  );
}