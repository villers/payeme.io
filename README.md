# payeme.io

The application allows you to share your salary and compare it to other jobs / companies

Feel free to contribute :)

## how to dev locally

```
npm run dev
npm run start:emulator
cd functions && npm run build:watch
```

You must copy `.env.exemple` to `.env.local` and fill it

```
# firebase credentials (https://firebase.google.com/)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# firebase app check debug for local (https://firebase.google.com/docs/app-check/web/debug-provider
VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN_FROM_CI=

# Recaptcha v3 public token (https://www.google.com/recaptcha/about/)
VITE_RECAPTCHA_PUBLIC=
```
