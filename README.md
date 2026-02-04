# Propuesta de San Valentín Interactiva ❤️

Una experiencia web interactiva diseñada para una propuesta romántica de San Valentín. Cuenta con un rompecabezas de corazón, una pregunta con un botón "No" evasivo y una pantalla de éxito animada.

## Características 🌟

- **Puzzle del Corazón**: 5 piezas exactas que deben ser colocadas para revelar la propuesta. Animaciones suaves con CSS transitions.
- **Botón "No" Fugitivo**: El botón "No" detecta la cercanía del cursor (radio de 120px) y se teletransporta a una posición aleatoria, cambiando sus frases para intentar persuadir al usuario.
- **Pantalla de Éxito**: Al presionar "Sí", se muestra un mensaje especial y un "Monito" que rebota por toda la pantalla (estilo protector de pantalla DVD).
- **Efectos Visuales**: Corazones flotantes de fondo y lluvia de confeti de emojis al aceptar.
- **Diseño Responsivo**: Totalmente funcional en dispositivos móviles y de escritorio.

## Estructura del Proyecto 📁

- `index.html`: Estructura principal y piezas del rompecabezas (SVG).
- `styles.css`: Estilos románticos, animaciones y diseño responsivo.
- `script.js`: Lógica del rompecabezas, evasión del botón y animación del monito.
- `assets/`:
  - `image.png`: Se muestra al completar el corazón.
  - `monito.png`: La imagen animada que aparece al aceptar.

## Cómo correrlo localmente 🚀

1. Descarga o clona este repositorio.
2. Abre el archivo `index.html` directamente en tu navegador (doble clic).
3. **Recomendado**: Usa la extensión **Live Server** de VS Code para una mejor experiencia de desarrollo.

## Cómo desplegarlo 🌐

### GitHub Pages (Gratis y Rápido)

1. Crea un nuevo repositorio en GitHub.
2. Sube todos los archivos (`index.html`, `styles.css`, `script.js`, `README.md` y la carpeta `assets/`).
3. Ve a **Settings** (Configuración) de tu repositorio.
4. En el menú lateral, selecciona **Pages**.
5. En la sección **Build and deployment**, asegúrate de que esté seleccionado "Deploy from a branch".
6. Elige la rama `main` (o `master`) y la carpeta `/ (root)`. Haz clic en **Save**.
7. ¡Listo! En unos minutos tu web estará disponible en `https://tu-usuario.github.io/nombre-del-repo/`.

## Requisitos Técnicos 🛠️

- No requiere frameworks ni librerías externas.
- JavaScript Vanilla (ES6+).
- CSS Moderno (Flexbox, Grid, Clamp, Transitions).
- 100% Front-end.
