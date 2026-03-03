const ACTIVITIES = [
  "Gravação",
  "Produção",
  "Mixagem",
  "Masterização",
  "Branding",
  "Ensaio",
  "Videoclipe",
  "Workshop",
  "Lançamento",
  "Gestão de Carreira",
];

function MarqueeTrack() {
  return (
    <div className="flex shrink-0 items-center gap-8">
      {ACTIVITIES.map((activity) => (
        <span key={activity} className="flex items-center gap-8">
          <span className="whitespace-nowrap text-2xl font-bold uppercase tracking-widest md:text-3xl">
            {activity}
          </span>
          <span className="text-turquoise">&#9679;</span>
        </span>
      ))}
    </div>
  );
}

export default function ActivityMarquee() {
  return (
    <section className="overflow-hidden border-y border-navy/10 bg-cream py-6">
      <div className="animate-marquee flex gap-8 text-navy/80 hover:[animation-play-state:paused]">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </section>
  );
}
