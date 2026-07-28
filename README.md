# Portafolio — Cristian Camilo Bran Arriaga

Sitio web personal de una sola página que muestra mi trayectoria profesional, formación académica y certificaciones, construido como HTML/CSS/JS estático — sin frameworks ni dependencias de build.

🔗 **Sitio en vivo:** _agrega aquí tu URL de Vercel, por ejemplo `https://portafolio-cristian-bran.vercel.app`_

## Sobre este proyecto

De Ingeniero en Telecomunicaciones a Analista de Inteligencia de Negocios: este portafolio recorre esa transición a través de:

- **Trayectoria profesional** — línea de tiempo con las funciones detalladas de cada rol.
- **Formación académica** — desde Técnico en Sistemas hasta la especialización en Big Data e BI.
- **Certificaciones 2025–2026** — cursos de IA generativa, ciencia de datos, cloud (AWS) y legalidad digital.
- **Habilidades técnicas** — organizadas por capas: redes, datos & BI, cloud/IA, y cumplimiento.

## Stack

- HTML5, CSS3 (variables nativas, sin frameworks)
- JavaScript vanilla — incluye un fondo de puntos interactivo en `<canvas>` que reacciona al cursor
- Tipografías: [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) e [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) vía Google Fonts
- Despliegue: [Vercel](https://vercel.com) (sitio estático, sin build step)

## Estructura del repositorio

```
├── index.html       # Sitio completo (HTML + CSS + JS en un solo archivo)
├── favicon.svg       # Ícono del sitio
├── og-image.png       # Imagen de vista previa para redes sociales (Open Graph)
├── robots.txt       # Reglas para buscadores
├── sitemap.xml       # Mapa del sitio para SEO
├── vercel.json       # Configuración de despliegue (headers, caché)
└── README.md         # Este archivo
```

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
