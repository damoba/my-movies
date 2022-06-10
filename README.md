# My Movies
A website for movie information and collection.

# Demo the App
- Follow this link to try out the app: https://davmoba4-my-movies.vercel.app/

# How to Run Locally
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
