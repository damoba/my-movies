# My Movies
A website for movie information and collection.


## Visual Demo
(no sound)

https://user-images.githubusercontent.com/71296308/216526022-f2f0bc2b-abd8-4bc9-8778-7217254b94c9.mp4


## Overview
Visit: [https://davmoba4.com/project/my-movies/](https://davidmorenobautista.netlify.app/project/my-movies/)


## How to Run Locally
- Install Node.js
- Install yarn by running this on a terminal:
```
npm install --global yarn
```
- Navigate to the application's topmost folder on the terminal and run the following command to install the dependencies:
```
yarn install
```
- Set up a Firebase Realtime Database after creating a project on Firebase.
- Set up an account on TMDB and request an API key in the settings.
- Create a .env.local file inside the application's topmost folder and store the following variables inside:  
NEXT_PUBLIC_FIREBASE_API_KEY = < insert yours here >  
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = < insert yours here >  
NEXT_PUBLIC_FIREBASE_PROJECT_ID = < insert yours here >  
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = < insert yours here >  
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = < insert yours here >  
NEXT_PUBLIC_FIREBASE_DATABASE_URL = < insert yours here >  
NEXT_PUBLIC_FIREBASE_APP_ID = < insert yours here >  
TMDB_API_KEY = < insert yours here >  
- Navigate to the application's topmost folder on the terminal and run the following command to start the application:
```
yarn dev
```

## Acknowledgments
- Parts of theme borrowed from [netflix-ish](https://github.com/santdas36/netflix-ish).
