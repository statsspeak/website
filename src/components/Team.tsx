import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Director {
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
}

const LeadershipTeam = ({ directors }: { directors: Director[] }) => {
  return (
    <section className="py-32 lg:py-40 border-t border-line bg-paper">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 mb-20">
          <div className="lg:col-span-4">
            <div className="text-micro text-ink-500 mb-6">Leadership</div>
            <h2 className="text-h2 text-ink">The people accountable for the work.</h2>
          </div>
          <p className="text-body-lg text-ink-500 max-w-xl lg:col-span-6 lg:col-start-7">
            A senior team spanning public health, engineering, product delivery,
            analytics, and data strategy.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {directors.map((director) => (
            <article key={director.name} className="border-t border-line pt-8">
              <figure>
                <ImageWithFallback
                  src={director.image}
                  alt={director.name}
                  className="aspect-[4/3] w-full rounded-lg object-cover"
                  style={{ filter: "saturate(0.72) contrast(1.04)" }}
                />
                <figcaption className="mt-4 border-t border-line pt-3 text-caption text-ink-500">
                  {director.name}, {director.role}
                </figcaption>
              </figure>

              <div className="mt-8">
                <h3 className="text-h3 text-ink">{director.name}</h3>
                <p className="text-body text-ink-500 mt-1">{director.role}</p>
                <p className="text-body text-ink-500 mt-5">{director.bio}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {director.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="rounded-sm border border-line px-2 py-1 text-mono text-ink-500"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
