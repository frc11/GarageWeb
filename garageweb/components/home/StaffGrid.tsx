import Image from "next/image";

const STAFF = [
    {
        id: 1,
        name: "Carlos Rivera",
        role: "Director General",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Elena Vance",
        role: "Head of Sales",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Marco Rossi",
        role: "Master Mechanic",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Sofia Chen",
        role: "Concierge Services",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    }
];

export function StaffGrid() {
    return (
        <section className="py-32 bg-black">
            <div className="container mx-auto px-6">

                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
                        NUESTROS EXPERTOS
                    </h2>
                    <div className="h-0.5 w-16 bg-white/20 mx-auto" />
                    <p className="text-neutral-400 max-w-xl mx-auto">
                        Un equipo multidisciplinario dedicado a brindar una experiencia de propiedad sin igual.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STAFF.map((member) => (
                        <div key={member.id} className="group cursor-pointer">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="text-center space-y-1">
                                <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-neutral-500 uppercase tracking-widest font-medium">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
