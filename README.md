# Dog Poster Generator
Built by Alex Bennett

## Description

The Dog Poster Generator allows you to:
- Choose breed/sub-breed combinations of dogs (some breeds have no sub-breeds available, in which case only a breed is selected).
- See the total number of images available for that combination.
- See a randomized assortment of the images available for that combination.
- Add additional combinations of breeds/sub-breeds, each of which displays an image count and an option to see images associated with it.
- A `Generate All` button which shows a randomized assortment of ALL images for ALL combinations present.
- Clicking on any image will open a new tab with the full-sized version of that image.

This app uses the following technologies and patterns:
- React (functional components)
- Global state via Redux
- React Hooks (useState, useEffect)
- React.Suspense (used in ModalContainer.js)
- A higher-order component (withButtonFunctionality.js)
- Material UI (with a custom theme found in App.js)
- Extensive testing by way of Jest & React Testing Library
- Responsive design across mobile & desktop

## Instructions to run

### Don't forget to run `npm install` prior to running any other scripts!

### `npm start`

Runs the app in development mode.
It should automatically open a browser window, but if not, navigate to [http://localhost:3000](http://localhost:3000) in a browser of your choice (although it works best on Chrome).

### `npm test`

Runs the Jest tests for the entire application.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

