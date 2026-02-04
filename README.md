# Propuesta de San Valentín Interactiva

Este es un proyecto sencillo de San Valentín que incluye un rompecabezas de corazón y una propuesta interactiva.

## Características
- **Puzzle del Corazón**: El usuario debe armar el corazón haciendo clic en sus 5 piezas.
- **Propuesta Dinámica**: Una vez completado, aparece la pregunta con opciones "Sí" y "No".
- **Botón "No" Fugitivo**: El botón "No" se mueve aleatoriamente cuando el usuario intenta clicarlo, mostrando frases divertidas.
- **Celebración**: Al aceptar, se muestra un mensaje final con un efecto de confeti de emojis.

## Cómo personalizar
Para cambiar los textos o la imagen, abre el archivo `script.js` y modifica las variables en el bloque superior:

- `finalImageSrc`: Cambia la URL por la de tu foto (ej. `img/mi_foto.jpg`).
- `questionText`: Cambia la pregunta que aparece.
- `yesFinalText`: El mensaje que aparecerá cuando acepte.
- `noPhrases`: Lista de frases que dirá el botón "No" al moverse.

## Ejecución
Simplemente abre el archivo `index.html` en cualquier navegador moderno. No requiere servidor ni instalación de dependencias.
