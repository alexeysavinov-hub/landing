// =============================================================
//  TOP APP GAMES — Hero, Featured Game, About sections
// =============================================================

const { useState, useEffect, useRef } = React;

// ---------------- Floating embers background ----------------
function Embers({ count = 38 }) {
  const seeds = React.useMemo(
    () =>
    Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      dur: 8 + Math.random() * 10,
      delay: -Math.random() * 12,
      drift: (Math.random() - 0.5) * 120,
      hue: Math.random() > 0.5 ? "var(--amber)" : "var(--pink-glow)",
      opacity: 0.6 + Math.random() * 0.4
    })),
    [count]
  );
  return (
    <div className="embers">
      {seeds.map((s, i) =>
      <span
        key={i}
        className="ember"
        style={{
          left: s.left + "%",
          width: s.size,
          height: s.size,
          animationDuration: s.dur + "s",
          animationDelay: s.delay + "s",
          background: s.hue,
          boxShadow: `0 0 ${s.size * 3}px ${s.size / 2}px ${s.hue}`,
          opacity: s.opacity,
          "--drift": s.drift + "px"
        }} />

      )}
    </div>);

}

// ---------------- Ambient floating orbs ----------------
function Orbs({ items }) {
  const orbs = React.useMemo(
    () =>
    items || [
    { top: "10%", left: "8%", size: 300, color: "rgba(123,92,240,0.32)", dur: 17, dx: 60, dy: -50 },
    { top: "26%", left: "80%", size: 240, color: "rgba(245,166,35,0.16)", dur: 21, dx: -50, dy: 60 },
    { top: "64%", left: "14%", size: 280, color: "rgba(123,92,240,0.26)", dur: 24, dx: 50, dy: -40 },
    { top: "74%", left: "72%", size: 260, color: "rgba(58,191,177,0.16)", dur: 19, dx: -40, dy: -60 }],

    [items]
  );
  return (
    <div className="orbs">
      {orbs.map((o, i) =>
      <span
        key={i}
        className="orb"
        style={{
          top: o.top,
          left: o.left,
          width: o.size,
          height: o.size,
          background: `radial-gradient(circle at 50% 50%, ${o.color} 0%, transparent 70%)`,
          "--orb-dur": o.dur + "s",
          "--orb-dx": o.dx + "px",
          "--orb-dy": o.dy + "px",
          animationDelay: -(i * 2.5) + "s"
        }} />
      )}
    </div>);
}

// ---------------- Navigation ----------------
function Nav({ navRef }) {
  return (
    <nav className="nav" ref={navRef}>
      <a href="#top" className="nav__brand">
        <div className="nav__brand-mark">
          <img src={window.__resources && window.__resources.logo || "assets/logo.png"} alt="TOP APP GAMES" style={{ objectFit: "contain", width: "55px", height: "55px" }} />
        </div>
      </a>
      <ul className="nav__links">
        <li><a href="#games">Games</a></li>
        <li><a href="#studio">Studio</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="nav__cta">
        <a href="#play" className="btn btn--primary btn--sm">Play Now</a>
      </div>
    </nav>);

}

// ---------------- Hero ----------------
function Hero() {
  const keyart = window.__resources && window.__resources.keyart || "assets/hero-keyart.png";
  return (
    <section className="hero" id="top">
      <Orbs />
      <Embers count={50} />
      <div className="hero__silhouette">
        <div className="cliff cliff--l" />
        <div className="cliff cliff--r" />
      </div>

      <div className="hero__grid">
        <div className="hero__keyart hero__keyart--square reveal reveal--scale" style={{ width: "500px", height: "500px" }}>
          <div className="hero__keyart-rays" />
          <div className="hero__keyart-glow" />
          <video
            className="hero__keyart-img hero__keyart-video"
            src={window.__resources && window.__resources.keyartVideo || "assets/hero-keyart.webm"}
            autoPlay
            loop
            muted
            playsInline>
          </video>
          <div className="hero__keyart-stage" />
          <div className="hero__keyart-tint" />
          <span className="ksparkle ksparkle--1" />
          <span className="ksparkle ksparkle--2" />
          <span className="ksparkle ksparkle--3" />
          <span className="ksparkle ksparkle--4" />
          <span className="ksparkle ksparkle--5" />
        </div>

        <div className="hero__copy stagger">
          <div className="hero__eyebrow eyebrow">European Mobile Game Studio · Est. 2022</div>
          <h1 className="display hero__title">
            We Create<br />
            Games Players<br />
            <span className="accent">Love</span>
          </h1>
          <p className="hero__sub">
            At TOP APP GAMES, strategy, competition, and fresh experiences come together
            to keep communities playing, connecting, and coming back for more.
          </p>
        </div>
      </div>

      <div className="hero__scrollhint">Scroll</div>
    </section>);

}

// ---------------- Featured Game: Ludus ----------------
function FeaturedGame() {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);

  const shots = [
  { src: "https://play-lh.googleusercontent.com/Bvowm6ETQvxaj3w0GmN_HxbNjiy9KA7pgI4swUzifqVWAbS4lmZzs5g0X7cVYZYB7qmSJGY2-TqB6oZ-d9-Gi_4=w1280", cap: "01 / Battle arena" },
  { src: "https://play-lh.googleusercontent.com/oDc_rp9Ojc2lB3kK3gyrdGKwkp9RSfiDESHrSuxP50Fh3p9YwBObTa55CykT1G5AqbRoftlAVQ0qUEDlmVgsMs8=w1280", cap: "02 / Merge mechanics" },
  { src: "https://play-lh.googleusercontent.com/rFW8cXM2qZbrCxEQhuchjUeQB9HwNzQHYovbfl6DUtZ2Sb9kLyycSB036CBlOtUUuivA3NDKiBE2GEOuG_fgvyY=w1280", cap: "03 / PvP duel" },
  { src: "https://play-lh.googleusercontent.com/W4My4ciJfnmGl9j0uK8tE85m7qmCToHK2AnFTrO98TIus9kAom0NjCnh9Jmkokc99Mh13LjDDKaJJF2T0VmVXg=w1280", cap: "04 / Hero roster" },
  { src: "https://play-lh.googleusercontent.com/wZaJZVfb_-loeqVp9FrlmmZgOD-QTH3DGcXr6UV_4nrTT8iTRlHICo6X7pZ3utFGEqnFeciw8FSDfHwlf5X92Q=w1280", cap: "05 / Live event" },
  { src: "https://play-lh.googleusercontent.com/4F8D2Sh3--4SElskt__K4SiJ2cZYOjEcim4lemzr_4IcF6AoGX03GqEIHNcdf8N85HRfLXcc2ewO4bkmhIWrdw=w1280", cap: "06 / Clan wars" },
  { src: "https://play-lh.googleusercontent.com/IwMxwkWol_CRclTgj_kXNcIFvqjh7VbanoWnu7_yTu4fzDN8sVMFfF1TXkxqHocV4aez1SxglvFoGe47orKJmg=w1280", cap: "07 / Card deck" },
  { src: "https://play-lh.googleusercontent.com/N73cKCfwABHPZGXspx9UWTh9NXmRjDhki43ikpPn90uYyUpNrqXxRXnwVCQoVsPxfgUvQEp2bkyWo5bPbuFz8Q=w1280", cap: "08 / Tournaments" },
  { src: "https://play-lh.googleusercontent.com/y8V5EM1pQgsrCT1gebIAV2355Vk0L_A49BKX0LDlQdwK7Ifhgn2ooDhqtAz2FxIQfy-QLtbbnQdzUuwZeIfqAg=w1280", cap: "09 / Battle pass" },
  { src: "https://play-lh.googleusercontent.com/CJ5Ozv8Qlv1SIDOmKp3onPwfvZdZOUdadbezjtTZNWCHSM-g-PkByQZt-eLNkKcbuwkcBiIC1D-Ors4tuRWCZA=w1280", cap: "10 / Rewards" }];


  const nudge = (dir) => {
    const total = shots.length;
    setIdx((i) => Math.max(0, Math.min(total - 2, i + dir)));
  };

  return (
    <section className="section featured" id="games">
      <Embers count={20} />
      <div className="featured__grid">
        <div className="featured__copy reveal">
          <div className="eyebrow">Featured Title</div>
          <h2 className="display featured__title">
            LUDUS<span className="featured__sep">・</span><br />
            <span className="accent">Strategy Battle PvP Game</span>
          </h2>
          <p className="body-md">
            A constantly evolving PvP strategy game where merge mechanics shape every battle.
            Build your squad, outsmart rivals in real-time arenas, and rise through the global
            rankings solo or with your clan.
          </p>

          <div className="store-row">
            <a href="https://apps.apple.com/us/app/ludus-strategy-pvp-card-battle/id6446642912" target="_blank" rel="noopener noreferrer" className="store-badge" aria-label="Download on the App Store">
              <span className="store-badge__glyph" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M17.05 12.54c-.02-2.07 1.69-3.06 1.77-3.11-.96-1.41-2.46-1.6-3-1.62-1.28-.13-2.5.75-3.15.75-.65 0-1.65-.73-2.72-.71-1.4.02-2.69.81-3.41 2.06-1.45 2.52-.37 6.25 1.04 8.3.69 1 1.51 2.13 2.58 2.09 1.04-.04 1.43-.67 2.69-.67 1.25 0 1.61.67 2.71.65 1.12-.02 1.83-1.02 2.51-2.03.79-1.16 1.12-2.29 1.13-2.35-.02-.01-2.17-.83-2.19-3.3zM15.0 5.88c.57-.69.96-1.65.85-2.6-.82.03-1.82.55-2.41 1.23-.53.61-1 1.59-.87 2.52.91.07 1.85-.46 2.43-1.15z"/>
                </svg>
              </span>
              <span className="store-badge__text">
                <span className="store-badge__sub">Download on the</span>
                <span className="store-badge__main">App Store</span>
              </span>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.studion.mergearena&hl=en" target="_blank" rel="noopener noreferrer" className="store-badge" aria-label="Get it on Google Play">
              <span className="store-badge__glyph" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M3.6 2.4c-.3.2-.5.6-.5 1.1v17c0 .5.2.9.5 1.1l.1.1L13 12.6v-.2L3.7 2.3l-.1.1z" fill="#34A853"/>
                  <path d="M16.3 15.7L13 12.6v-.2l3.3-3.1.1.1 3.9 2.2c1.1.6 1.1 1.6 0 2.3l-3.9 2.2-.1-.1z" fill="#FBBC04"/>
                  <path d="M16.4 15.6L13 12.5 3.6 21.6c.4.4 1 .4 1.7.1l11.1-6.1" fill="#EA4335"/>
                  <path d="M16.4 9.4L5.3 3.3c-.7-.4-1.3-.3-1.7.1l9.4 9.1 3.4-3.1z" fill="#4285F4"/>
                </svg>
              </span>
              <span className="store-badge__text">
                <span className="store-badge__sub">Get it on</span>
                <span className="store-badge__main">Google Play</span>
              </span>
            </a>
            <a href="https://site.ludus-game.com/" target="_blank" rel="noopener noreferrer" className="store-badge store-badge--web" aria-label="Visit the game website">
              <span className="store-badge__glyph" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
                </svg>
              </span>
              <span className="store-badge__text">
                <span className="store-badge__sub">Visit the</span>
                <span className="store-badge__main">Game Website</span>
              </span>
            </a>
          </div>

          <div className="stat-row">
            <div className="stat-tile">
              <div className="stat-tile__num">10M+</div>
              <div className="stat-tile__lbl">Downloads</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile__num">200K+</div>
              <div className="stat-tile__lbl">Active player community</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile__num">4.5★</div>
              <div className="stat-tile__lbl">Player rating</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile__num">Live</div>
              <div className="stat-tile__lbl">Seasonal events &amp; clan wars</div>
            </div>
          </div>
        </div>

        <div className="trailer-stage reveal">
          <div className="trailer-card">
            <video
              className="trailer-video"
              src="https://play-games.googleusercontent.com/vp/mp4/1280x720/Lny-7jxVEig.mp4"
              poster="https://play-lh.googleusercontent.com/DbnSgl-ou7WzVsDQkOY7Yi1_3OScfEUh39DL50fSIrMb2ywuB_FyN23nPTfPKL302q1lxHIldP9e0qp-RRJvcg=w1280"
              controls
              playsInline
              preload="metadata">
            </video>
            <div className="trailer-badge">▶ Official Trailer</div>
          </div>
        </div>
      </div>

      {/* Screenshot carousel */}
      <div className="carousel">
        <div className="carousel__head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Gallery</div>
            <div className="carousel__title">Inside the Arena</div>
          </div>
          <div className="carousel__nav">
            <button className="carousel__btn" onClick={() => nudge(-1)} aria-label="Previous">‹</button>
            <button className="carousel__btn" onClick={() => nudge(1)} aria-label="Next">›</button>
          </div>
        </div>
        <div className="carousel__track-wrap">
          <div
            className="carousel__track"
            ref={trackRef}
            style={{ transform: `translateX(calc(${-idx} * (var(--shot-w) + 22px)))` }}>
            
            {shots.map((s, i) =>
            <div className="shot" key={i}>
                <img className="shot__img" src={s.src} alt={s.cap} loading="lazy" />
                <div className="shot__cap">{s.cap}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ---------------- About / Studio ----------------
function About() {
  const facts = [
  { val: "2022", lbl: "Founded" },
  { val: "Cyprus", lbl: "Headquarters" },
  { val: "10M+", lbl: "Players reached" },
  { val: "80+", lbl: "Countries" }];


  return (
    <section className="section about about--single" id="studio">
      <Embers count={14} />
      <div className="about__single reveal">
        <div className="eyebrow">Our Studio</div>
        <h2 className="display about__single-h">
          We craft mobile games as living worlds —{" "}
          <span className="accent">not products.</span>
        </h2>
        <p className="about__single-p">
          TOP APP GAMES is an independent European studio building competitive, live-service
          mobile experiences. From game design and live-ops to user acquisition and community,
          we own every part of the craft — shipping games that grow with their players,
          season after season.
        </p>
        <div className="about__facts">
          {facts.map((f) =>
          <div className="about-fact" key={f.lbl}>
              <div className="about-fact__val">{f.val}</div>
              <div className="about-fact__lbl">{f.lbl}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

Object.assign(window, { Nav, Hero, FeaturedGame, About, Embers, Orbs });