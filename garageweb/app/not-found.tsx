import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[100dvh] bg-black flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-display font-bold text-white mb-4">404</h1>
            <h2 className="text-3xl text-gray-400 mb-8 font-light">Ruta equivocada</h2>
            <p className="text-gray-500 max-w-md mb-12">
                Parece que te has desviado del camino. La página que buscas no existe o ha sido movida.
            </p>
            <Link
                href="/"
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
                Volver al Garage
            </Link>
        </div>
    );
}
