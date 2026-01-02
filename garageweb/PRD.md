# 📄 PRD: Plataforma Web Concesionaria Premium

**Versión:** 1.0
**Estado:** En Desarrollo
**Tech Lead:** [Tu Nombre]

## 1. Resumen Ejecutivo
Desarrollar una plataforma web de alto impacto visual ("Premium Look & Feel") para una concesionaria de vehículos de alta gama. El objetivo principal es la **exhibición de inventario** con estética de lujo (estilo *The Elite Cars*) y la **conversión agresiva** hacia canales de venta física (WhatsApp/Llamada, estilo *Alba Cars*). La web será autogestionable por el cliente.

## 2. Objetivos del Negocio
1.  **Elevación de Marca:** Transmitir confianza, exclusividad y estatus a través del diseño (Monocromo + Minimalismo).
2.  **Conversión Directa:** Reducir la fricción entre "ver el auto" y "contactar al vendedor".
3.  **Autonomía:** Permitir al dueño subir/bajar autos y cambiar precios sin intervención de un desarrollador.

## 3. User Personas (Usuarios)

**A. El Cliente ("El Comprador")**
* **Perfil:** Busca estatus, tiene poco tiempo, valora la estética. Navega mayormente desde iPhone/Móvil.
* **Necesidad:** Quiere ver fotos en alta resolución, precio claro y un botón para preguntar "Ya". No quiere llenar formularios largos.

**B. El Administrador ("El Dueño")**
* **Perfil:** No es técnico. Usa el celular o una laptop básica.
* **Necesidad:** Panel simple para subir fotos, poner "Marca, Modelo, Precio" y publicar.

## 4. Requerimientos Funcionales (Features)

### 4.1. Página de Inicio (Landing Page)
* **Hero Section:** Video de fondo en bucle (Autoplay, Muted) o Slider de imágenes cinemáticas con título impactante y CTA "Ver Inventario".
* **Buscador Rápido:** Barra de filtros simplificada (Marca, Año, Precio) visible en el primer scroll.
* **Grid de Marcas:** Logos de marcas premium (Audi, BMW, Porsche) en monocromo que llevan al catálogo filtrado.
* **Destacados:** Carrusel de "Recién Llegados".

### 4.2. Catálogo (Inventario)
* **Grid Bento:** Diseño de tarjetas moderna.
* **Tarjetas de Producto:**
    * Foto principal de alta calidad (aspect ratio 4:3).
    * Título (Año + Marca + Modelo).
    * Precio (Destacado).
    * Datos clave (Km, Transmisión, Año) en iconos pequeños.
    * Etiqueta de estado: "Disponible", "Reservado", "Vendido".
    * **Efecto:** Zoom suave en la imagen al hacer hover.

### 4.3. Página de Detalle de Vehículo (PDP)
* **Galería:** Slider táctil de fotos HD con miniaturas.
* **Info Técnica:** Lista limpia de especificaciones.
* **Sticky CTA (Móvil):** Botón de "Consultar por WhatsApp" que persigue al usuario mientras baja por la pantalla.
* **Mensaje Predefinido:** Al hacer clic en WhatsApp, envía: *"Hola, estoy interesado en el [Marca Modelo] que vi en la web..."*.

### 4.4. Panel de Administración (CMS)
* Dashboard simple para crear/editar/eliminar vehículos.
* Subida de múltiples imágenes (Drag & drop).
* Campo para link de video (YouTube/Vimeo).

## 5. Requerimientos No Funcionales (Calidad)
* **Performance:** Score >95 en Lighthouse (Core Web Vitals). Uso de `next/image` para carga diferida.
* **SEO:** Metad