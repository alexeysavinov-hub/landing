// =============================================================
//  TOP APP GAMES — App composition + motion orchestration
// =============================================================

const { useEffect: useEffectApp, useRef: useRefApp } = React;

function App() {
  const navRef = useRefApp(null);

  // Reveal-on-scroll (robust: no IntersectionObserver dependency)
  useEffectApp(() => {
    const targets = Array.from(document.querySelectorAll(".reveal, .stagger"));
    if (!targets.length) return;

    const revealInView = () => {
      const trigger = window.innerHeight * 0.92;
      let remaining = false;
      targets.forEach((el) => {
        if (el.classList.contains("is-in")) return;
        const top = el.getBoundingClientRect().top;
        if (top < trigger) el.classList.add("is-in");
        else remaining = true;
      });
      return remaining;
    };

    // initial pass after layout settles
    const raf = requestAnimationFrame(() => requestAnimationFrame(revealInView));
    const onScroll = () => revealInView();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // ultimate safety net: never leave anything hidden
    const fallback = setTimeout(() => {
      targets.forEach((el) => el.classList.add("is-in"));
    }, 2600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Nav settles on scroll
  useEffectApp(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      navRef.current.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax: hero key art group drifts with mouse + scroll
  useEffectApp(() => {
    const group = document.querySelector(".hero__keyart");
    if (!group) return;

    let mx = 0, my = 0, sy = 0, active = false;
    let raf = null;

    const apply = () => {
      raf = null;
      group.style.transform =
        `translate3d(${mx * 16}px, ${my * 14 - sy * 0.08}px, 0)`;
    };
    const schedule = () => { if (active && !raf) raf = requestAnimationFrame(apply); };

    const onMove = (e) => {
      const w = window.innerWidth, h = window.innerHeight;
      mx = (e.clientX / w - 0.5) * 2;
      my = (e.clientY / h - 0.5) * 2;
      schedule();
    };
    const onScroll = () => { sy = window.scrollY; schedule(); };

    // start after the entrance animation has settled
    const t = setTimeout(() => {
      active = true;
      group.classList.add("parallax");
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }, 1700);

    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="app-shell">
      <Nav navRef={navRef} />
      <div className="inner-frame">
        <Hero />
        <FeaturedGame />
        <About />
        <Stats />
        <News />
        <Footer />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
