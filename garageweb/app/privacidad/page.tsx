import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
    title: "Política de Privacidad | El Garage",
    description: "Información sobre cómo recopilamos, usamos y protegemos sus datos personales.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-[100dvh] bg-zinc-950 pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-16">
                    <SectionHeading
                        title="POLÍTICA DE PRIVACIDAD"
                        subtitle="Transparencia y Seguridad"
                    />
                </div>

                <div className="space-y-12 text-zinc-400 leading-relaxed font-light">
                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">1. Introducción</h2>
                        <p>
                            Bienvenido a El Garage. Respetamos su privacidad y estamos comprometidos a proteger sus datos personales.
                            Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro
                            sitio web y le informará sobre sus derechos de privacidad y cómo la ley lo protege.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">2. Información que Recopilamos</h2>
                        <p className="mb-4">
                            Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted,
                            que hemos agrupado de la siguiente manera:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-zinc-600">
                            <li><strong className="text-zinc-300">Datos de Identidad:</strong> incluye nombre, apellido, nombre de usuario o identificador similar.</li>
                            <li><strong className="text-zinc-300">Datos de Contacto:</strong> incluye dirección de facturación, dirección de entrega, dirección de correo electrónico y números de teléfono.</li>
                            <li><strong className="text-zinc-300">Datos Técnicos:</strong> incluye dirección IP, datos de inicio de sesión, tipo y versión del navegador, configuración de zona horaria y ubicación.</li>
                            <li><strong className="text-zinc-300">Datos de Uso:</strong> incluye información sobre cómo utiliza nuestro sitio web, productos y servicios.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">3. Uso de su Información</h2>
                        <p>
                            Solo utilizaremos sus datos personales cuando la ley nos lo permita. Más comúnmente, utilizaremos
                            sus datos personales en las siguientes circunstancias:
                        </p>
                        <ul className="mt-4 list-disc pl-5 space-y-2 marker:text-zinc-600">
                            <li>Cuando necesitemos ejecutar el contrato que estamos a punto de celebrar o hemos celebrado con usted.</li>
                            <li>Cuando sea necesario para nuestros intereses legítimos (o los de un tercero) y sus intereses y derechos fundamentales no prevalezcan sobre esos intereses.</li>
                            <li>Cuando necesitemos cumplir con una obligación legal o reglamentaria.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">4. Cookies y Tecnologías de Rastreo</h2>
                        <p>
                            Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro servicio y mantener cierta información.
                            Las cookies son archivos con una pequeña cantidad de datos que pueden incluir un identificador único anónimo.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">5. Seguridad de los Datos</h2>
                        <p>
                            Hemos implementado medidas de seguridad adecuadas para evitar que sus datos personales se pierdan accidentalmente,
                            se utilicen o se acceda a ellos de forma no autorizada, se alteren o se divulguen. Además, limitamos el acceso
                            a sus datos personales a aquellos empleados, agentes, contratistas y otros terceros que tengan una necesidad comercial de conocerlos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">6. Sus Derechos Legales</h2>
                        <p>
                            Bajo ciertas circunstancias, tiene derechos bajo las leyes de protección de datos en relación con sus datos personales,
                            incluyendo el derecho a solicitar acceso, corrección, borrado, restricción, transferencia, o a retirar el consentimiento.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">7. Contacto</h2>
                        <p>
                            Si tiene alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, por favor contáctenos
                            a través de nuestro formulario de contacto o enviando un correo a <a href="mailto:elgarageautomoviles@gmail.com" className="text-white hover:underline">elgarageautomoviles@gmail.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
