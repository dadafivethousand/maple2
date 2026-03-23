import '../Stylesheets/Plaque.css';

export default function Plaque({ children, success = false, minHeight, innerRef }) {
  const cls = ['plaque', success && 'plaque--success'].filter(Boolean).join(' ');
  const style = minHeight ? { minHeight } : undefined;
  return (
    <div className="plaque-wrap">
      <div className={cls} style={style} ref={innerRef}>{children}</div>
    </div>
  );
}
