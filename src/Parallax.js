import Testimonials from './Components/Testimonials';
import './Stylesheets/Parallax.css';

export default function Parallax() {
  return (
    <div className="parallax-container">
      <div className="parallax-content">
        <Testimonials />
      </div>
    </div>
  );
}
