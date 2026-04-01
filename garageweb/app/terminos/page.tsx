import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
    title: "Términos y Condiciones | El Garage",
    description: "Términos de uso para los servicios y sitio web de Garage.",
};

export default function TermsPage() {
    return (
        <main className="min-h-[100dvh] bg-zinc-950 pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-16">
                    <SectionHeading
                        title="TÉRMINOS Y CONDICIONES"
                        subtitle="Acuerdo de Uso"
                    />
                </div>

                <div className="space-y-12 text-zinc-400 leading-relaxed font-light">
                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">1. Aceptación de los Términos</h2>
                        <p>
                            Al acceder y utilizar este sitio web, usted acepta estar sujeto a los siguientes términos y condiciones de uso,
                            todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de cualquier ley local aplicable.
                            Si no está de acuerdo con alguno de estos términos, tiene prohibido utilizar o acceder a este sitio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">2. Licencia de Uso</h2>
                        <p className="mb-4">
                            Se otorga permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web
                            de El Garage solo para visualización transitoria personal y no comercial. Esta es la concesión de una licencia,
                            no una transferencia de título, y bajo esta licencia usted no puede:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-zinc-600">
                            <li>Modificar o copiar los materiales;</li>
                            <li>Utilizar los materiales para cualquier propósito comercial, o para cualquier exhibición pública (comercial o no comercial);</li>
                            <li>Intentar descompilar o realizar ingeniería inversa de cualquier software contenido en el sitio web de El Garage;</li>
                            <li>Eliminar cualquier derecho de autor u otras notaciones de propiedad de los materiales; o</li>
                            <li>Transferir los materiales a otra persona o "espejar" los materiales en cualquier otro servidor.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">3. Descargo de Responsabilidad</h2>
                        <p>
                            Los materiales en el sitio web de El Garage se proporcionan "tal cual". El Garage no ofrece garantías, expresas o implícitas,
                            y por la presente renuncia y niega todas las demás garantías, incluyendo, sin limitación, garantías implícitas o condiciones
                            de comerciabilidad, idoneidad para un propósito particular, o no infracción de propiedad intelectual u otra violación de derechos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">4. Limitaciones</h2>
                        <p>
                            En ningún caso El Garage o sus proveedores serán responsables de ningún daño (incluyendo, sin limitación, daños por pérdida de datos
                            o beneficios, o debido a la interrupción del negocio) que surjan del uso o la imposibilidad de usar los materiales en el sitio web
                            de El Garage, incluso si El Garage o un representante autorizado de El Garage ha sido notificado oralmente o por escrito de la posibilidad de tal daño.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">5. Exactitud de los Materiales</h2>
                        <p>
                            Los materiales que aparecen en el sitio web de El Garage podrían incluir errores técnicos, tipográficos o fotográficos.
                            El Garage no garantiza que ninguno de los materiales en su sitio web sea preciso, completo o actual. El Garage puede realizar
                            cambios en los materiales contenidos en su sitio web en cualquier momento sin previo aviso.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">6. Enlaces</h2>
                        <p>
                            El Garage no ha revisado todos los sitios vinculados a su sitio web y no es responsable de los contenidos de dicho sitio vinculado.
                            La inclusión de cualquier enlace no implica el respaldo por parte de El Garage del sitio. El uso de cualquier sitio web vinculado es bajo el propio riesgo del usuario.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">7. Modificaciones</h2>
                        <p>
                            El Garage puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso.
                            Al utilizar este sitio web, usted acepta estar sujeto a la versión actual de estos términos de servicio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-zinc-200 font-semibold mb-6">8. Ley Aplicable</h2>
                        <p>
                            Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de Argentina y usted se somete irrevocablemente
                            a la jurisdicción exclusiva de los tribunales en ese Estado o ubicación.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
