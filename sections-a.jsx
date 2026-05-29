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

// ---------------- Navigation ----------------
function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="nav__brand">
        <div className="nav__brand-mark">
          <img src={window.__resources && window.__resources.logo || "assets/logo.jpg"} alt="TOP APP GAMES" />
        </div>
      </a>
      <ul className="nav__links">
        <li><a href="#games">Games</a></li>
        <li><a href="#studio">Studio</a></li>
        <li><a href="#team">Team</a></li>
        <li><a href="#careers">Careers</a></li>
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
      <Embers count={50} />
      <div className="hero__silhouette">
        <div className="cliff cliff--l" />
        <div className="cliff cliff--r" />
      </div>

      <div className="hero__grid">
        <div className="hero__copy">
          <div className="hero__eyebrow eyebrow">European Mobile Game Studio · Est. 2022</div>
          <h1 className="display hero__title">
            We Build Games<br />
            Players <span className="accent">Live In</span>
          </h1>
          <p className="hero__sub">
            TOP APP GAMES crafts competitive mobile experiences for millions of players worldwide —
            live-service worlds with deep strategy, vibrant community, and the magic of casual play.
          </p>
          <div className="hero__cta">
            <a href="#play" className="btn btn--primary">▶ Play Now</a>
            <a href="#careers" className="btn btn--ghost">Join the Team →</a>
          </div>
        </div>

        <div className="hero__keyart">
          <div className="hero__keyart-rays" />
          <div className="hero__keyart-glow" />
          <img className="hero__keyart-img" src={keyart} alt="TOP APP GAMES — heroes key art" />
          <div className="hero__keyart-stage" />
          <div className="hero__keyart-tint" />
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
    { src: "https://play-lh.googleusercontent.com/CJ5Ozv8Qlv1SIDOmKp3onPwfvZdZOUdadbezjtTZNWCHSM-g-PkByQZt-eLNkKcbuwkcBiIC1D-Ors4tuRWCZA=w1280", cap: "10 / Rewards" },
  ];

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
          <h2 className="display">
            Ludus:<br />
            <span className="accent">Merge Arena</span>
          </h2>
          <p className="body-md">
            A live-ops PvP strategy game where merge mechanics meet real-time arena combat.
            Build the ultimate squad, master deep tactics, and climb the global ladder — solo or with your clan.
          </p>

          <div className="store-row">
            <a href="#" className="store-badge">
              <span style={{ fontSize: 22 }}></span>
              <div>
                <div className="store-badge__sub">Download on the</div>
                <div className="store-badge__main">App Store</div>
              </div>
            </a>
            <a href="#" className="store-badge">
              <span style={{ fontSize: 22 }}>▶</span>
              <div>
                <div className="store-badge__sub">Get it on</div>
                <div className="store-badge__main">Google Play</div>
              </div>
            </a>
          </div>

          <div className="stat-row">
            <div className="stat-tile">
              <div className="stat-tile__num">5M+</div>
              <div className="stat-tile__lbl">Downloads</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile__num">PvP</div>
              <div className="stat-tile__lbl">Real-time arena</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile__num">120+</div>
              <div className="stat-tile__lbl">Live events / yr</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile__num">4.7★</div>
              <div className="stat-tile__lbl">Player rating</div>
            </div>
          </div>
        </div>

        <div className="phone-stage reveal">
          <div className="phone-card">
            <div className="phone-card__notch" />
            <div className="phone-card__screen">
              <image-slot
                id="ludus-phone"
                style={{ width: "100%", height: "100%", display: "block" }}
                shape="rect"
                placeholder="Drop in-game screenshot">
              </image-slot>
            </div>
          </div>

          <div className="float-card float-card--tl">
            <div className="float-card__icon">★</div>
            <div>
              <div className="float-card__num">+128</div>
              <div className="float-card__lbl">Trophy gained</div>
            </div>
          </div>
          <div className="float-card float-card--tr">
            <div className="float-card__icon" style={{ background: "linear-gradient(135deg, var(--cyan), var(--violet))" }}>⚔</div>
            <div>
              <div className="float-card__num">7-Win Streak</div>
              <div className="float-card__lbl">Arena ranked</div>
            </div>
          </div>
          <div className="float-card float-card--bl">
            <div className="float-card__icon" style={{ background: "linear-gradient(135deg, var(--amber), var(--magenta))" }}>♛</div>
            <div>
              <div className="float-card__num">Clan: TopApp</div>
              <div className="float-card__lbl">Rank #14 global</div>
            </div>
          </div>
          <div className="float-card float-card--br">
            <div className="float-card__icon">⚡</div>
            <div>
              <div className="float-card__num">Live Event</div>
              <div className="float-card__lbl">2d 14h left</div>
            </div>
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
  const items = [
  { y: "2022", h: "Studio Founded", p: "TOP APP GAMES is born in Europe with a mission to redefine competitive mobile gaming." },
  { y: "2023", h: "First Title Ships", p: "We launch our debut casual-strategy hybrid, picking up early traction across EMEA." },
  { y: "2024", h: "Ludus: Merge Arena", p: "Our flagship live-ops PvP title crosses 1M installs in its first quarter." },
  { y: "2025", h: "Series A & Global Scale", p: "Strategic funding to grow live-ops, UA and game design — players in 80+ countries." },
  { y: "2026", h: "Next-Gen Lineup", p: "Two new mobile titles in active development. The roadmap is just getting started." }];


  return (
    <section className="section about" id="studio">
      <Embers count={14} />
      <div className="about__grid">
        <div className="about__copy reveal">
          <div className="eyebrow">Our Studio</div>
          <h2 className="display">
            Crafting<br />
            Mobile<br />
            <span style={{
              background: "linear-gradient(180deg, #ffd2ec, #ff7fc6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>Worlds</span>
          </h2>
          <p className="body-md">
            We're an independent European studio that ships games as living worlds — not products.
            Our expertise in live-ops, monetization, UA and end-to-end game design lets us build
            mobile experiences that grow with their players, season after season.
          </p>
          <div className="about__quote">
            "We don't make games for the launch day — we make games for the thousandth day."
          </div>
        </div>

        <ul className="timeline reveal">
          {items.map((it) =>
          <li className="timeline__item" key={it.y}>
              <div className="timeline__year">{it.y}</div>
              <div>
                <div className="timeline__h">{it.h}</div>
                <div className="timeline__p">{it.p}</div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

Object.assign(window, { Nav, Hero, FeaturedGame, About, Embers });