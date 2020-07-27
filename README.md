# Survey Wizard

![Aperçu du projet - capture d’écran](./readme-assets/screenshot.png)

## Présentation du Projet

Projet créé par [**Kevin Labtani**](https://github.com/kevin-labtani) dans le cadre de mon stage chez [Hike-Up](https://hike-up.be/) de début avril à fin juillet 2020.

Le but du projet est de développer la partie front-end utilisateur d'une application d'enquêtes en ligne équivalent à Typeform mais répondant aux besoins spécifiques de Hike-Up. L'outil de création d'enquêtes et le back-end sont gérés de manière séparée à cette application.

nb: J'ai obtenu l'autorisation de partager le code à des fins non commerciales.

## Fonctionalités de l'Application


## Installation de l'Application

`npm install` pour installer les dépendance
`npm start` pour lancer l'application en mode développement

Cette application étant créée par `create-react-app`, veuillez vous référer à leur [documentation](https://create-react-app.dev/docs/getting-started/) pour plus de détails.

## Exigences d'implémentation relatif à l'API back-end

Cette application est dépendante d'une API REST fournissant les routes suivantes:

- Route GET pour récupérer les questions au niveau de la fonction `getQuestions` du fichier [`QuestionState.js`](./src/context/questions/QuestionsState.js). Une implémentation de chaque question type est fournie dans l'`initialState` de ce même fichier.
- Route GET pour récupérer les options de configuration au niveau de la fonction `getConfig` du fichier [`ConfigState.js`](./src/context/config/ConfigState.js) Une implémentation type est fournie dans l'`initialState` de ce même fichier.
- Route POST pour envoyer les réponses au niveau de la fonction `sendAnswer` du fichier [`Form.js`](./src/components/Form.js). La réponse est construite par la fonction `constructAnswer`; alternativement, vous pouvez décommenter le `console.log(data);` dans la fonction `sendAnswer` et soumettre un questionnaire rempli (soumission par la question type recap), ce qui vous permettra d'avoir dans la console l'objet envoyé en réponse à l'API.
- Route POST pour gérer une soumission partielle du questionnaire au niveau de la fonction `window.onbeforeunload` du fichier [`Form.js`](./src/components/Form.js). Lorsqu'un utilisateur quitte prématurément le questionnaire, l'application envoye par la méthode `sendBeacon` de l'API Web `Navigator` une requête vers la route `https://url/to/api/${responseUuid}/false/${lastLocation}/${assessmentId}` pour informer le back-end du fait qu'un utilisateur a quitté le questionnaire sans le soumettre avec l'id de la dernière réponse atteinte par l'utilisateur (lastLocation), l'id du questionnaire (assessmentId) et l'uuiid assigné à cet utilisateur (responseUuid).
- Route POST (Content-Type: multipart/form-data) pour envoyer des fichiers (eg. images ou pdf) au niveau de la fonction `uploadHandler` du fichier [`FileUpload.js`](./src/components/questionType/FileUpload.js) pour la question type FileUpload.

## Structure du Projet

Le projet contient ??

## Contributeur

- [**Kevin Labtani**](https://github.com/kevin-labtani)

## Technologies

- React par `create-react-app`, avec les packages `react-router-dom` pour le routing et `framer-motion` pour les animations.
- Axios pour les requêtes http.
- Bootstrap + Sass.
- Font Awesome pour les icônes.

code formaté par `prettier` et linté par `eslint`.

## Progression

Projet terminé le 17 juillet 2020 suite à la fin de mon stage.

## Remerciements

- Christophe Masse, Sébastien Archambeau & Dominique Pellegrino [Hike-Up](https://hike-up.be/) pour l'opportunité de prester mon stage chez eux.
