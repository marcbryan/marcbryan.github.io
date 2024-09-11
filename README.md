# Portfolio Marc
[![en](https://img.shields.io/badge/lang-en-blue.svg)](https://github.com/marcbryan/marcbryan.github.io/blob/master/README.en.md)

¡Bienvenid@ al repositorio de mi portfolio! Aquí encontrarás todo el código.

Puedes ver el portfolio aquí: https://marcbryan.github.io/

## Puntos clave

- Un sitio para ver todos los proyectos que he realizado (¡Y que realizaré!)
- Más información sobre mí
- Multidioma (Español, Catalán e Inglés)
- Tema Claro/Oscuro
- Easter Eggs

## ¿Como probarlo en local?

Necesitas tener instalado Git y NPM. Después utiliza los siguientes comandos:

```sh
# Clonar el proyecto
git clone https://github.com/marcbryan/marcbryan.github.io.git

# Instalar todos los paquetes del proyecto
npm install

# Iniciar el servidor de desarrollo
npm run dev # o "npm run host" si quieres probarlo en otro dispositivo
```

## Estructura del proyecto

**/public/i18n** En esta carpeta están los archivos JSON de los textos en los 3 idiomas. El archivo de configuración está en **/src/i18n.js**.

**/src/assets** En esta carpeta están todas las imágenes que utilizo en el portfolio.

**/src/components** En esta carpeta están todos los componentes que utilizo en el portfolio.

**/src/constants** En esta carpeta está el archivo con todas las constantes que utilizo en el portfolio.

**/src/context** En esta carpeta está el ThemeContext (utilizando [Context API](https://react.dev/reference/react/createContext)) que se encarga del tema Claro/Oscuro del portfolio.

**/src/pages** En esta carpeta están las diferentes páginas del portfolio y sus CSS.

## Instrucciones

A continuación, daré unas instrucciones sobre las diferentes páginas. En mi opinión, navegando por la web verás que no hace falta leer esto, pero quiero dejarlo claro.

- Si haces **long-press** (dejar pulsado un tiempo) **en móvil** sobre los elementos que tengan [Tooltips](https://mui.com/material-ui/react-tooltip/), también los podrás ver.
En escritorio salen cuando haces hover (pasar el ratón por encima).

### Página *Home*

- Si pulsas sobre uno de los proyectos se abrirá su repositorio (o la web cuando los tenga en un servidor) en otra pestaña.

### Página *Sobre mí*

- En móvil si pulsas sobre la imagen de las notas se abre el [Lightbox](https://yet-another-react-lightbox.com/) para verlas más grandes.
- Si haces hover sobre el [Scroller](https://www.youtube.com/watch?v=iLmBy-HKIAw) se para la animación.
- Si haces hover sobre el botón ( i ) del *Bootcamp Programador .NET*, se muestra la insignia que conseguí cuando terminé el Bootcamp.
- Si haces **click y arrastras hacia un lado** puedes cambiar de slide de las aficiones. En móvil puedes deslizar con el dedo. (Gracias al componente [Swiper](https://swiperjs.com/)).

### Página *Portfolio*

- Si pulsas sobre la imagen del proyecto, podrás ver todas las imágenes del proyecto en el [Lightbox](https://yet-another-react-lightbox.com/). Funciona igual que las slides de Swiper. 
- Lo mismo que en la página anterior, si haces click y arrastras hacia un lado puedes cambiar de slide. En móvil lo mismo de antes.
- Si haces hover sobre el botón "Conoce más", se muestra más información sobre el proyecto.

### Página *Sobre esta página*

Nada que apuntar.

## Imágenes aficiones

Fuentes:

- https://imagenes.heraldo.es/files/image_990_556/uploads/imagenes/2023/02/14/balon-de-futbol-archivo.jpeg
- https://fotografias.lasexta.com/clipping/cmsimages02/2024/04/12/47374D0C-736F-4D7F-8E1B-41F99E60438F/salida-gran-premio-japon-formula-1_98.jpg?crop=1200,675,x0,y125&width=1900&height=1069&optimize=low&format=webply
- https://media.revistagq.com/photos/65b12cd1df908a3c3a4d7373/16:9/w_2560%2Cc_limit/fitness%2520portada.jpg
