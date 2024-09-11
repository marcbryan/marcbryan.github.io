# Marc's Portfolio
[![es](https://img.shields.io/badge/lang-es-red.svg)](https://github.com/marcbryan/marcbryan.github.io/blob/master/README.md)

Welcome to my portfolio's repository. Here you will find all the code.

You can see the portfolio here: https://marcbryan.github.io/

## Key points

- A place to see all the projects I've done (and the ones that will I do!)
- More information about me
- Multi-language (Spanish, Catalan and English)
- Light/Dark theme
- Easter Eggs

## How to test it locally?

You will need to have installed Git and NPM. Then use the following commands:

```sh
# Clone the project
git clone https://github.com/marcbryan/marcbryan.github.io.git

# Install all the project packages
npm install

# Start the dev server
npm run dev # or "npm run host" if you want to try it on another device
```

## Project structure

**/public/i18n** In this folder are the JSON files of the texts in the 3 languages. The config file it's in **/src/i18n.js**.

**/src/assets** In this folder are all the images that I use on the portfolio.

**/src/components** In this folder are all the components that I use on the portfolio.

**/src/constants** In this folder you can find the file with all the constants that I use on the portfolio.

**/src/context** In this folder you can find the ThemeContext (using [Context API](https://react.dev/reference/react/createContext)) that takes care of the portfolio's light/dark theme.

**/src/pages** In this folder are all the different pages of the portfolio and their CSS.

## Instructions

I will now give some instructions about all the pages. In my opinion, using the website you will see that is not necessary to read this, but I want to make it clear.

- If make **long-press** (keep holding it for a while) **on mobile** on the elements that have [Tooltips](https://mui.com/material-ui/react-tooltip/), you will also see them. On desktop appear when you do hover (pass the mouse above).

### *Home* page

- If you press on one of the projects it will open its repository (or the website when I have them on a server) on another tab.

### *About me* page

- On mobile if you press on the grades image it will open the [Lightbox](https://yet-another-react-lightbox.com/) to see it bigger.
- If you do hover on the [Scroller](https://www.youtube.com/watch?v=iLmBy-HKIAw) the animation will stop.
- If you do hover on the ( i ) button of the *.NET Developer Bootcamp", it will show the badge that I earned when I finished the Bootcamp.
- If you **click and drag to the side** you can change the slide of the hobbies. On mobile you can slide with your finger. (Thanks to the [Swiper](https://swiperjs.com/) component).

### *Portfolio* page

- If you press on the project image, you can see all the project images on the [Lightbox](https://yet-another-react-lightbox.com/). It works like the Swiper slides.
- The same as the previous page, if you click and drag to the side you can change the slide. The same as before on mobile.
- If you do hover on the "Know more" button, it will show more information about the project.

### *About this page* page

Nothing to point to.

## Images hobbies

Sources:

- https://imagenes.heraldo.es/files/image_990_556/uploads/imagenes/2023/02/14/balon-de-futbol-archivo.jpeg
- https://fotografias.lasexta.com/clipping/cmsimages02/2024/04/12/47374D0C-736F-4D7F-8E1B-41F99E60438F/salida-gran-premio-japon-formula-1_98.jpg?crop=1200,675,x0,y125&width=1900&height=1069&optimize=low&format=webply
- https://media.revistagq.com/photos/65b12cd1df908a3c3a4d7373/16:9/w_2560%2Cc_limit/fitness%2520portada.jpg
