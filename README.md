## Digital eccomerce

## How to use

download or clone this repository, once downloaded, open the console and go to the project folder, in the same console go to the server folder and write

```bash
$ npm install
# or
$ npm i
```

in the same server folder, create a file called .env and this file should contain:

```env
MONGODB_URI = mongodb_uri (if you wish to use mongodb locally not write this)
STRIPE_SECRET_KEY = your_private_stripe_key (required)
```

once having the modules installed and configured the environment variables write the following to run the server

remember, in console you must be in the server folder

```bash
$ npm run build
$ npm start

# or

$ npm run dev (development mode)
```

## CLIENT
in your console go to client folder and write

```bash
$ npm install
# or
$ npm i
```

again, in the same folder, create a .env file and this file should be contain:

```env
REACT_APP_STRIPE_PUBLIC_KEY = your_stripe_public_key (required)
```
once having the modules installed and configured the environment variables write the following to run the client

```bash
$ npm start
```

with all these steps the project should work correctly :3