import '../Stylesheets/Plaque.css';

export default function Plaque({ children, success = false }) {
  const cls = ['plaque', success && 'plaque--success'].filter(Boolean).join(' ');
  return (
    <div className="plaque-wrap">
      <div className={cls}>{children}</div>
    </div>
  );
}
