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
