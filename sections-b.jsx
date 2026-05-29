// =============================================================
//  TOP APP GAMES — Stats, Careers, News, Footer
// =============================================================

const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;

// Animated counter
function Counter({ target, suffix = "", duration = 1800, decimals = 0 }) {
  const [val, setVal] = useStateB(0);
  const elRef = useRefB(null);
  const startedRef = useRefB(false);

  useEffectB(() => {
    if (!elRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setVal(target * eased);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(elRef.current);
    return () => io.disconnect();
  }, [target, duration]);

  const display = val.toFixed(decimals);
  return (
    <span ref={elRef}>
      {display}
      <span className="metric__suffix">{suffix}</span>
    </span>);

}

function Stats() {
  const metrics = [
  { big: 10, dec: 0, suffix: "M+", lbl: "Downloads worldwide", sub: "Players across 80+ countries since 2022.", glow: "rgba(220,100,220,0.32)" },
  { big: 4.7, dec: 1, suffix: "★", lbl: "Avg. app store rating", sub: "Across iOS & Google Play — top-tier in genre.", glow: "rgba(255,180,90,0.28)" },
  { big: 42, dec: 0, suffix: "%", lbl: "D30 retention", sub: "Live-ops engagement well above category median.", glow: "rgba(100,180,255,0.26)" },
  { big: 10, dec: 0, suffix: " M€", lbl: "Series A funding", sub: "Backed by leading European gaming investors.", glow: "rgba(120,80,255,0.28)" }];


  return (
    <section className="section stats">
      <Embers count={16} />
      <div className="stats__head">
        <div className="eyebrow" style={{ marginBottom: 12 }}>By the numbers</div>
        <h2 className="display">A Studio Built to <span style={{
            background: "linear-gradient(180deg, #ffffff, #F5A623)",
            WebkitBackgroundClip: "text", backgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>Scale</span></h2>
        <p className="body-md">Real engagement, real revenue, real community — the foundation of every game we ship.</p>
      </div>

      <div className="stats__grid stagger">
        {metrics.map((m, i) =>
        <div className="metric" key={i} style={{ "--metric-glow": m.glow }}>
            <div className="metric__big">
              <Counter target={m.big} suffix={m.suffix} decimals={m.dec} />
            </div>
            <div className="metric__lbl">{m.lbl}</div>
            <div className="metric__sub">{m.sub}</div>
          </div>
        )}
      </div>
    </section>);

}

// ---------------- Careers ----------------
function Careers() {
  const jobs = [
  { role: "Senior Game Designer", dep: "Game Design", loc: "Remote · EU", type: "Full-time" },
  { role: "Live Ops Producer", dep: "Live Ops", loc: "Remote", type: "Full-time" },
  { role: "Unity Engineer (Mid+)", dep: "Engineering", loc: "Remote · EU", type: "Full-time" },
  { role: "User Acquisition Lead", dep: "Growth", loc: "Remote", type: "Full-time" },
  { role: "Mid 2D Artist", dep: "Art", loc: "Remote", type: "Contract" },
  { role: "Community Manager", dep: "Community", loc: "Remote", type: "Full-time" }];


  const benefits = [
  { h: "Remote-first", p: "Work where you create best. Async-first culture, real flexibility.", grad: "linear-gradient(135deg, var(--magenta), var(--violet))", glyph: "◐" },
  { h: "Global impact", p: "Ship to millions. Your decisions land in players' hands in days, not months.", grad: "linear-gradient(135deg, var(--cyan), var(--violet))", glyph: "✦" },
  { h: "Creative freedom", p: "Small senior teams. Ownership from day one. Bet on bold ideas.", grad: "linear-gradient(135deg, var(--amber), var(--magenta))", glyph: "✺" },
  { h: "Strong team", p: "Veterans from top studios. We invest in your growth, not just your output.", grad: "linear-gradient(135deg, var(--pink-glow), var(--violet))", glyph: "♛" }];


  return (
    <section className="section careers" id="careers">
      <Embers count={14} />
      <div className="careers__head reveal">
        <div>
          <div className="eyebrow">Careers</div>
          <h2 className="display" style={{ marginTop: 14 }}>
            Build the next<br />
            <span style={{
              background: "linear-gradient(180deg, #ffffff, #F5A623)",
              WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>hit game</span> with us.
          </h2>
        </div>
        <p>
          We're hiring across game design, engineering, art and growth. If you've ever wanted to
          build worlds players live in — and ship them to millions — this is the place.
        </p>
      </div>

      <div className="jobs stagger">
        {jobs.map((j, i) =>
        <div className="job" key={i}>
            <div className="job__dep">{j.dep}</div>
            <div className="job__role">{j.role}</div>
            <div className="job__loc">{j.loc}</div>
            <div className="job__type">{j.type}</div>
            <div className="job__arrow">→</div>
          </div>
        )}
      </div>

      <div className="benefits stagger">
        {benefits.map((b, i) =>
        <div className="benefit" key={i}>
            <div className="benefit__icon" style={{ background: b.grad }}>{b.glyph}</div>
            <div className="benefit__h">{b.h}</div>
            <div className="benefit__p">{b.p}</div>
          </div>
        )}
      </div>
    </section>);

}

// ---------------- News ----------------
function News() {
  const items = [
  {
    tag: "PocketGamer",
    date: "Apr 30, 2026",
    h: "Ludus hits 10 million downloads, with new Divisions seasonal event underway",
    p: "Flagship live-ops PvP title from TOP APP GAMES crosses a major milestone alongside the launch of Divisions — a brand-new competitive ladder driving deeper ranked play.",
    url: "https://www.pocketgamer.com/ludus-merge-battle-arena/10m-downloads/",
    img: "https://play-lh.googleusercontent.com/DbnSgl-ou7WzVsDQkOY7Yi1_3OScfEUh39DL50fSIrMb2ywuB_FyN23nPTfPKL302q1lxHIldP9e0qp-RRJvcg=w1000",
    lg: true,
    id: "news-1"
  },
  {
    tag: "GamesBeat",
    date: "Apr 30, 2026",
    h: "Ludus reaches 10 million downloads and introduces new competitive play feature",
    p: "GamesBeat covers the milestone and the new Divisions system that's pushing strategy mobile gameplay into a more competitive era.",
    url: "https://gamesbeat.com/ludus-10-million-downloads-competitive-play-feature/",
    img: "https://play-lh.googleusercontent.com/Bvowm6ETQvxaj3w0GmN_HxbNjiy9KA7pgI4swUzifqVWAbS4lmZzs5g0X7cVYZYB7qmSJGY2-TqB6oZ-d9-Gi_4=w1280",
    id: "news-2"
  },
  {
    tag: "Cyprus Mail",
    date: "Apr 30, 2026",
    h: "Cyprus-based game studio celebrates key milestone",
    p: "Local press spotlights TOP APP GAMES as a fast-growing European studio shipping competitive mobile experiences to players worldwide.",
    url: "https://cyprus-mail.com/2026/04/30/cyprus-based-game-studio-celebrates-key-milestone",
    img: "https://play-lh.googleusercontent.com/rFW8cXM2qZbrCxEQhuchjUeQB9HwNzQHYovbfl6DUtZ2Sb9kLyycSB036CBlOtUUuivA3NDKiBE2GEOuG_fgvyY=w1280",
    id: "news-3"
  }];


  return (
    <section className="section news" id="news">
      <div className="news__head reveal">
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Newsroom</div>
          <h2 className="display">Latest from the Studio</h2>
        </div>
        <a href="#" className="btn btn--ghost btn--sm">All News →</a>
      </div>

      <div className="news__grid stagger">
        {items.map((n, i) =>
        <a
          href={n.url}
          target="_blank"
          rel="noopener noreferrer"
          className={"news-card " + (n.lg ? "news-card--lg" : "")}
          key={i}>
          
            <div className="news-card__img">
              <img src={n.img} alt={n.h} loading="lazy" />
            </div>
            <div className="news-card__body">
              <div className="news-card__meta">
                <span>{n.tag}</span>
                <span>{n.date}</span>
              </div>
              <div className="news-card__h">{n.h}</div>
              <div className="news-card__p">{n.p}</div>
              <div className="news-card__cta">Read story →</div>
            </div>
          </a>
        )}
      </div>
    </section>);

}

// ---------------- Footer ----------------
function Footer() {
  const onSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const name = encodeURIComponent(f.name.value || "");
    const email = encodeURIComponent(f.email.value || "");
    const message = encodeURIComponent(f.message.value || "");
    const subject = encodeURIComponent(`Website enquiry from ${f.name.value || "visitor"}`);
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = `mailto:hello@topapp.games?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer__contact reveal">
        <div className="footer__contact-copy">
          <div className="eyebrow">Get in touch</div>
          <h2 className="display footer__contact-h">Let's talk.</h2>
          <p className="footer__contact-p">
            Partnerships, press, or just to say hi — drop us a line and we'll get back to you.
          </p>
        </div>
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="contact-form__row">
            <input className="contact-form__input" type="text" name="name" placeholder="Your name" required />
            <input className="contact-form__input" type="email" name="email" placeholder="Email address" required />
          </div>
          <textarea className="contact-form__input" name="message" placeholder="Your message" rows="3" required></textarea>
          <button type="submit" className="btn btn--primary contact-form__send">Send message →</button>
        </form>
      </div>

      <div className="footer__grid">
        <div>
          <div className="footer__brand-row">
            <div className="nav__brand-mark nav__brand-mark--lg">
              <img src={window.__resources && window.__resources.logo || "assets/logo.png"} alt="TOP APP GAMES" style={{ width: "65px", height: "65px" }} />
            </div>
            <div className="footer__tag">TOP APP GAMES</div>
          </div>
          <div className="footer__socials">
            <a className="footer__soc footer__soc--li" href="https://www.linkedin.com/company/top-app-games/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
              <span>in</span> LinkedIn
            </a>
          </div>
        </div>

        <div className="footer__col">
          <div className="footer__col-h">Studio</div>
          <ul>
            <li><a href="#studio">About</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <div className="footer__col-h">Games</div>
          <ul>
            <li><a href="https://site.ludus-game.com/" target="_blank" rel="noopener noreferrer">LUDUS・Strategy Battle PvP</a></li>
            <li><a href="#games">Gallery &amp; Trailer</a></li>
            <li><a href="https://apps.apple.com/us/app/ludus-strategy-pvp-card-battle/id6446642912" target="_blank" rel="noopener noreferrer">App Store</a></li>
            <li><a href="https://play.google.com/store/apps/details?id=com.studion.mergearena&hl=en" target="_blank" rel="noopener noreferrer">Google Play</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <div className="footer__col-h">Contact</div>
          <ul>
            <li><a href="mailto:hello@topapp.games">hello@topapp.games</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__legal">
        <div>© 2026 TOP APP GAMES LTD · All rights reserved</div>
        <div style={{ display: "flex", gap: 28 }}>
          <a href="https://mergegame.app/en/privacy.html" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Stats, Careers, News, Footer, Counter });