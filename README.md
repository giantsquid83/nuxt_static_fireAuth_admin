# This is a basic static generated NUXT APP
# with vuetify as gui framework
# and Firebase for db and authorization
# FireAuth with deployed FireFunctions handles assigning and checking 
# for user's custom claims such as Admin and Moderator
# wich gives different access rights to control the App from frontend.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate

# install firebase-tools globaly
$ npm install -g firebase-tools

# initialize firebase functions in work dir
# functions must be accessible at functions/index.js
$ firebase init functions

# at 1st run will need to run
$ firebase login

# after all FireFunctions are written
# deploy them to firebase
$ firebase deploy --only functions

```
# FireStore rules
the data is presented as simple counters that accessed by 3 types of users
# user
# moderator
# admin

```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read;
    }
		//	allow users change user's counter
    match /AllNumbers/{enterFixedIdHere} {
    	allow write: if request.auth.uid != null;
    }
    // allow admin & moderator change all counters
    match /AllNumbers/{numId} {
    	allow write: if request.auth.token.admin == true || request.auth.token.moderator == true;
    }
    // allow admin write messages
    match /message/{id} {
    	allow write: if request.auth.token.admin == true;
    }
  }
}

```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
