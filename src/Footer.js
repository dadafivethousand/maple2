import './Stylesheets/Footer.css';
import logo from './Media/whitelogonobg.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';

const NAV_LINKS = [
  { label: 'Schedule',   href: '#Schedule'    },
  { label: 'Coaches',    href: '#Coaches'     },
  { label: 'Sign Up',    href: '#Memberships' },
  { label: 'FAQ',        href: '#FAQ'         },
  { label: 'Contact',    href: '#Contact'     },
  { label: 'Blog',       href: '/blog'        },
];

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-inner">

        {/* ── Brand ── */}
        <div className="footer-brand">
          <img src={logo} alt="Maple Jiu-Jitsu" className="footer-logo" />
          <p className="footer-tagline">
            Brazilian Jiu-Jitsu, Muay Thai &amp;<br />Wrestling — Maple, Ontario.
          </p>
          <div className="footer-social">
            <a href="https://www.instagram.com/maple_bjj" target="_blank" rel="noopener noreferrer"
               aria-label="Instagram" className="footer-social__link footer-social__link--ig">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.facebook.com/p/Maple-Jiu-Jitsu-61567823767391/" target="_blank" rel="noopener noreferrer"
               aria-label="Facebook" className="footer-social__link footer-social__link--fb">
              <FontAwesomeIcon icon={faSquareFacebook} />
            </a>
          </div>
        </div>

        {/* ── Nav ── */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <span className="footer-col-heading">Navigation</span>
          <ul>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <span className="footer-copy">
          © {new Date().getFullYear()} Maple Jiu-Jitsu Academy · All rights reserved
        </span>
        <span className="footer-credit">Vaughan, Ontario, Canada</span>
      </div>

    </footer>
  );
}
