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
        <div className="hero__keyart reveal reveal--scale" style={{ width: "332px", height: "637px" }}>
          <div className="hero__keyart-rays" />
          <div className="hero__keyart-glow" />
          <video
            className="hero__keyart-img hero__keyart-video"
            src={window.__resources && window.__resources.keyartVideo || "assets/hero-keyart.mp4"}
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
            <a href="https://apps.apple.com/us/app/ludus-strategy-pvp-card-battle/id6446642912" target="_blank" rel="noopener noreferrer" className="store-badge">
              <span className="store-badge__glyph"></span>
              <div>
                <div className="store-badge__sub">Download on the</div>
                <div className="store-badge__main">App Store</div>
              </div>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.studion.mergearena&hl=en" target="_blank" rel="noopener noreferrer" className="store-badge">
              <span className="store-badge__glyph">▶</span>
              <div>
                <div className="store-badge__sub">Get it on</div>
                <div className="store-badge__main">Google Play</div>
              </div>
            </a>
            <a href="https://site.ludus-game.com/" target="_blank" rel="noopener noreferrer" className="store-badge store-badge--web">
              <span className="store-badge__glyph">🌐</span>
              <div>
                <div className="store-badge__sub">Visit the</div>
                <div className="store-badge__main">Game Website</div>
              </div>
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