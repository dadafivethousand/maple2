import { useEffect, useRef, useState } from 'react';
import '../Stylesheets/StatsBar.css';

const STATS = [
  { target: 250, suffix: '+', label: 'Students Trained' },
  { target: 100, suffix: '+', label: '5-Star Google Reviews' },
  { target: 3,   suffix: '',  label: 'Ontario Champions' },
];

function useCountUp(target, duration, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function StatItem({ stat, active, index }) {
  const num = useCountUp(stat.target, 1400, active);
  return (
    <div className="stats-item" style={{ '--i': index }}>
      <span className="stats-num">{num}{stat.suffix}</span>
      <span className="stats-label">{stat.label}</span>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`stats-bar${active ? ' stats-bar--active' : ''}`} ref={ref} aria-label="Academy stats">
      {STATS.map((s, i) => (
        <StatItem key={i} stat={s} active={active} index={i} />
      ))}
    </div>
  );
}
