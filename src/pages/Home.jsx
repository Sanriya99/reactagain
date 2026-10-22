import { Link } from 'react-router-dom';
const HERO_IMAGE = '/images/home.png';

export default function Home() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${HERO_IMAGE})`,
      }}
    >
      <div className="hero-text">
        <h1 className="hero-title">Hi</h1>
        <p className="intro-line">I'm Sandra Mariya</p>
        <p className="intro-line">a Python Developer</p>
        <p className="intro-line">Developer who turns messy problems into practical, reliable solutions. From building Python projects and AI agents to exploring new technologies, I’m driven by curiosity, clean code,
              a constant focus on clarity, simplicity, and finding better ways to solve problems.</p>

        <div className="button-row">
          <Link to="/about" className="btn btn-green">About Me</Link>
          <Link to="/contact" className="btn btn-green-outline">Contact Me</Link>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true" />
    </section>
  );
}
