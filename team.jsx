// =============================================================
//  TOP APP GAMES — Team section
//  Data sourced from https://www.topapp.games/team
// =============================================================

function Team() {
  const intro = {
    eyebrow: "Our Team",
    head: "Built by 71 professionals\nacross 4 countries.",
    body:
      "Our core team is headquartered in Cyprus, while others are spread across five time zones. The studio unites veterans from Dragons World, Breaking Bad, Narcos, Broyalty, and Hustle Castle — each bringing a unique skillset to the table.",
    facts: [
      { lbl: "Founded", val: "August 2022" },
      { lbl: "HQ", val: "Cyprus" },
      { lbl: "Team", val: "71 people" },
      { lbl: "Time zones", val: "5" },
    ],
  };

  const members = [
    {
      name: "Vladimir Markov",
      role: "Co-Founder",
      photo:
        "https://images.squarespace-cdn.com/content/v1/66309fa7cc1aab09347c79da/a3c360ba-b73a-4b3c-bdfd-c1bf273f3ba9/markov.jpg?format=500w",
      bio:
        "21 years in game development (Nikita, Nival, My.Games). Led the team behind Hustle Castle — one of My.Games' most successful titles.",
    },
    {
      name: "Vladimir Nikolskiy",
      role: "Co-Founder",
      photo:
        "https://images.squarespace-cdn.com/content/v1/66309fa7cc1aab09347c79da/e5f91dd7-c025-4e3f-b154-3c429ed1d673/Nikolsky.jpg?format=500w",
      bio:
        "Two decades transforming an indie studio into My Games — a $500M-turnover European gaming company that shipped 100+ titles.",
    },
    {
      name: "Anatoliy Yatsin",
      role: "Executive Director",
      photo:
        "https://images.squarespace-cdn.com/content/v1/66309fa7cc1aab09347c79da/4d78945b-af4a-4b67-a75e-f30960f5a40c/yatsin.jpg?format=500w",
      bio:
        "15+ years in games, from game designer to executive director. Experienced across both global corporations and small studios.",
      linkedin: "https://www.linkedin.com/in/t0lin/",
    },
    {
      name: "Kirill Altunin",
      role: "Tech Director",
      photo:
        "https://images.squarespace-cdn.com/content/v1/66309fa7cc1aab09347c79da/a32dcdbe-00d5-44a9-8e86-c213ada5941f/altunin.jpg?format=500w",
      bio:
        "19 years of application development. 8 published games. Deep passion for game tech and engineering culture.",
      linkedin: "https://www.linkedin.com/in/kirill-altunin/",
    },
    {
      name: "Denis Kuklyushkin",
      role: "Art Director",
      photo:
        "https://images.squarespace-cdn.com/content/v1/66309fa7cc1aab09347c79da/089bb4ae-5141-4c0d-9f7a-6cbf90fb9c5f/denis-kuklyushkin_2.jpg?format=500w",
      bio:
        "10+ years in gamedev. Worked on Pirates: Treasure Hunt, Narcos: Cartel Wars, Breaking Bad, Broyalty, Ludus and more.",
      linkedin: "https://www.linkedin.com/in/denis-kuklyushkin-52456a4",
    },
    {
      name: "Margarita Nikolaeva",
      role: "Marketing Director",
      photo:
        "https://images.squarespace-cdn.com/content/v1/66309fa7cc1aab09347c79da/2d6f594f-b4ee-45ac-b4af-8a8008ac539f/Screenshot+2024-05-16+at+13.48.32.jpg?format=500w",
      bio:
        "8+ years in gamedev. Former Lead UAM at My.Games on Rush Royale, Hustle Castle, Grand Hotel Mania, Tacticool and more.",
      linkedin: "https://www.linkedin.com/in/margarita-nikolaeva-29395686",
    },
    {
      name: "Evgeni Shishkin",
      role: "Producer",
      photo:
        "https://images.squarespace-cdn.com/content/v1/66309fa7cc1aab09347c79da/89d31e1c-e2d1-43c3-95a2-693ee787e8d4/shihkin.jpg?format=500w",
      bio:
        "10+ years in mid-core projects. Five years leading game-design teams — workflow, planning, and key-metric improvement.",
      linkedin: "https://www.linkedin.com/in/evgeniy-shishkin-01ba19127/",
    },
    {
      name: "George Notyag",
      role: "Lead 3D Department",
      photo:
        "https://images.squarespace-cdn.com/content/v1/66309fa7cc1aab09347c79da/54687788-c997-41fa-a7db-a9ec4642514d/notag.png?format=500w",
      bio:
        "15 years in game development, 14 years leading 3D teams. Mobile specialist — Dragons World, Hustle Castle, Breaking Bad and more.",
      linkedin: "https://www.linkedin.com/in/george-notyag-52555149/",
    },
    {
      name: "Ekaterina Boiarnikova",
      role: "Lead UI Artist",
      photo:
        "https://images.squarespace-cdn.com/content/v1/66309fa7cc1aab09347c79da/e2e0c929-4f15-4614-af82-74b4b723f093/Screenshot+2024-05-16+at+19.38.01.jpg?format=500w",
      bio:
        "Lead artist on 6 projects including Megapolis, Narcos: Cartel Wars, Breaking Bad, Broyalty, and Ludus. UI artistry since 2012.",
      linkedin: "https://www.linkedin.com/in/ekaterina-boiarnikova-55246a151/",
    },
  ];

  return (
    <section className="section team" id="team">
      <Embers count={12} />

      <div className="team__head">
        <div className="reveal">
          <div className="eyebrow">{intro.eyebrow}</div>
          <h2 className="display team__h">
            {intro.head.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {i === 1 ? (
                  <span style={{
                    background: "linear-gradient(180deg, #ffd2ec, #ff7fc6)",
                    WebkitBackgroundClip: "text", backgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>{line}</span>
                ) : line}
                <br />
              </React.Fragment>
            ))}
          </h2>
          <p className="body-md team__body">{intro.body}</p>
        </div>

        <div className="team__facts reveal">
          {intro.facts.map((f) => (
            <div className="team-fact" key={f.lbl}>
              <div className="team-fact__val">{f.val}</div>
              <div className="team-fact__lbl">{f.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="team__grid">
        {members.map((m, i) => (
          <div className="team-card reveal" key={m.name} style={{ transitionDelay: (i % 3) * 80 + "ms" }}>
            <div className="team-card__photo">
              <img src={m.photo} alt={m.name} loading="lazy" />
              <div className="team-card__overlay">
                <p className="team-card__bio">{m.bio}</p>
                {m.linkedin && (
                  <a
                    className="team-card__li"
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn →
                  </a>
                )}
              </div>
            </div>
            <div className="team-card__name">{m.name}</div>
            <div className="team-card__role">{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Team });
