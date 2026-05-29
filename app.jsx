// =============================================================
//  TOP APP GAMES — App composition + reveal-on-scroll
// =============================================================

const { useEffect: useEffectApp } = React;

function App() {
  // Reveal-on-scroll
  useEffectApp(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="app-shell">
      <Nav />
      <div className="inner-frame">
        <Hero />
        <FeaturedGame />
        <About />
        <Team />
        <Stats />
        <Careers />
        <News />
        <Footer />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
