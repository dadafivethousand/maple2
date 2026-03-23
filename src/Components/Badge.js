import '../Stylesheets/Badge.css';

export default function Badge({ children }) {
  return (
    <div className="badge">
      <span className="badge__text">{children}</span>
    </div>
  );
}
