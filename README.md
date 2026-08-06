# Portafolio — Cristian Camilo Bran Arriaga

Sitio web personal de una sola página que muestra mi trayectoria profesional, formación académica, proyectos y certificaciones. Construido en HTML/CSS/JS puro — sin frameworks ni dependencias de build — pensado para desplegarse como sitio estático en segundos.

🔗 **Sitio en vivo:** [portafolio-cristian-bran.vercel.app](https://portafolio-cristian-bran.vercel.app)
📰 **Blog:** [cristianbranarriaga.blogspot.com](https://cristianbranarriaga.blogspot.com/) — actividades de gestión de redes de datos
🔗 **LinkedIn:** [cristian-camilo-bran-arriaga](https://www.linkedin.com/in/cristian-camilo-bran-arriaga-b1074730b)

## Sobre este proyecto

De Ingeniero en Telecomunicaciones a Analista de Inteligencia de Negocios: este portafolio recorre esa transición a través de nueve secciones:

| Sección | Contenido |
|---|---|
| **Hero** | Presentación + línea de tiempo de formación (Técnico → Tecnólogo → Ingeniero → Especialista) en un diagrama SVG animado |
| **Sobre mí** | Perfil + barras de nivel de habilidad (Avanzado/Intermedio/Básico) por categoría, animadas al hacer scroll |
| **Trayectoria** | Línea de tiempo con los 6 roles y funciones detalladas de cada uno |
| **Formación académica** | Las 4 etapas de estudio formal |
| **Proyectos académicos** | Carruseles de trabajos reales (PDF, Word, notebooks y simulaciones Packet Tracer) organizados por área: BI & Datos, Programación, Redes, Simulaciones y Cloud/Seguridad, más un banner al blog |
| **Certificaciones** | 8 cursos completados en 2025–2026 (IA generativa, ciencia de datos, cloud, legalidad digital) |
| **Habilidades técnicas** | Resumen del stack en 4 capas |
| **Propuesta de valor** | 8 razones concretas para contratarme |
| **Contacto** | Correo, teléfono, LinkedIn y ubicación |

## Funcionalidades destacadas

- **Fondo de puntos interactivo** (`<canvas>`): reacciona al cursor con líneas de conexión tipo red, se desactiva en dispositivos táctiles y se pausa cuando la pestaña no está visible (optimizado para rendimiento).
- **Tarjetas con tilt 3D**: leve inclinación al pasar el mouse, deshabilitada si el usuario prefiere movimiento reducido.
- **Barras de habilidad animadas**: se llenan al hacer scroll hasta ellas usando `IntersectionObserver`.
- **Carruseles de proyectos**: scroll horizontal con flechas, uno independiente por categoría.
- **Accesibilidad**: skip-link, `aria-hidden` en elementos decorativos, `:focus-visible`, `aria-expanded` en el menú móvil, `scroll-margin-top` para que el header sticky no tape las secciones.
- **SEO**: metadatos Open Graph y Twitter Card, datos estructurados JSON-LD (`Person`), `sitemap.xml` y `robots.txt`.

## Stack

- HTML5, CSS3 (variables nativas, sin frameworks)
- JavaScript vanilla
- Tipografías: [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) e [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) vía Google Fonts
- Despliegue: [Vercel](https://vercel.com) (sitio estático, sin build step)

## Estructura del repositorio

```
├── index.html                     # Sitio completo (HTML + CSS + JS en un solo archivo)
├── favicon.svg                    # Ícono del sitio
├── og-image.png                   # Imagen de vista previa para redes sociales (Open Graph)
├── robots.txt                     # Reglas para buscadores
├── sitemap.xml                    # Mapa del sitio para SEO
├── vercel.json                    # Configuración de despliegue (headers, caché)
├── README.md                      # Este archivo
└── Proyectos/                     # PDFs, Word y notebooks enlazados desde "Proyectos académicos"
    ├── BI/                        # Trabajo de grado y notebook de análisis (Metrosalud)
    ├── Programación/              # PSeint, Arduino, sistemas digitales, etc.
    └── Redes/                     # Laboratorios Cisco, simulaciones .pkt, seguridad, cloud
```

## Cómo agregar un nuevo proyecto a la carpeta `/Proyectos`

1. Sube el archivo a la subcarpeta correspondiente (`BI`, `Programación` o `Redes`) desde GitHub → **Add file → Upload files**.
2. Si el nombre tiene espacios o tildes, codifica la ruta antes de usarla como `href` (espacio → `%20`, `ó` → `%C3%B3`, etc.). En Python:
   ```python
   from urllib.parse import quote
   print(quote("Proyectos/Redes/Mi archivo con tildes.pdf", safe="/"))
   ```
3. En `index.html`, duplica una tarjeta `.project-card` dentro del `.carousel-track` de la categoría correspondiente y actualiza `cert-tag`, título, descripción y el `href` del enlace.
4. Los `.docx` y `.pkt` no se pueden previsualizar en el navegador — usa las etiquetas "📝 Descargar Word" / "🖧 Descargar .pkt" en vez de "📄 Ver PDF". Los `.ipynb` se enlazan vía [nbviewer.org](https://nbviewer.org) para que se rendericen correctamente.

## Cómo verlo en local

No requiere instalación. Basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático:

```bash
# Opción 1: Python
python3 -m http.server 8000

# Opción 2: Node (npx)
npx serve .
```

Luego visita `http://localhost:8000`.

## Despliegue

Este repositorio está conectado a Vercel — cada `push` a la rama `main` despliega automáticamente una nueva versión.

## Contacto

- 📧 ccbran1998@hotmail.com
- 📍 Medellín, Colombia
- 🔗 [LinkedIn](https://www.linkedin.com/in/cristian-camilo-bran-arriaga-b1074730b)
- 📰 [Blog de gestión de redes](https://cristianbranarriaga.blogspot.com/)
