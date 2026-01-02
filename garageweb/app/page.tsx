export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
      {/* 1. Prueba de Tipografía Display (Manrope) */}
      <h1 className="text-5xl font-bold font-display tracking-tight text-center">
        VERIFICACIÓN DE SISTEMA
      </h1>

      {/* 2. Prueba de Tipografía Body (Inter) y Colores */}
      <p className="text-xl text-secondary font-sans max-w-lg text-center">
        Si estás viendo este texto en gris claro y el fondo es negro profundo,
        significa que <span className="text-primary font-bold">Tailwind</span> y las variables CSS funcionan.
      </p>

      {/* 3. Prueba de Componentes y Bordes */}
      <div className="p-6 border border-border rounded-lg bg-surface max-w-sm w-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold">OK</span>
          </div>
          <div>
            <h3 className="text-lg font-bold font-display">Estado: Activo</h3>
            <p className="text-sm text-secondary">Ready to deploy</p>
          </div>
        </div>
        <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded hover:opacity-90 transition-opacity">
          Prueba de Botón
        </button>
      </div>
    </div>
  );
}