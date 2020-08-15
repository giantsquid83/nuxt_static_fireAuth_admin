# This is a basic static generated NUXT APP with user\moderator\admin rights
# with vuetify as gui framework
# and Firebase for db and authorization
FireAuth with deployed FireFunctions handles assigning and checking for user's custom claims such as Admin and Moderator
wich gives different access rights to control the App from frontend.

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
# Please enter own firebase config to nuxt.config.js
in this example nuxt.config.js gets firebase config stored in firebaseConfig.js

# FireStore structure:
```bash
AllNumbers : {
  docId: {
    userNumber: 0
  },
  docId2: {
    modNumber: 0
  }
},
message: {
  docId: {
    text: 'string'
  }
}
```

# FireStore rules
The DB data is presented as 2 simple counters and admin message that accessed by 3 types of users.
- user
- moderator
- admin
User has acces to "user's counter", Moderator to both counters, Admin - both counters and message + can assign roles.
When admin assignes roles FireStore function checks for custom user claims with FireAuth (serverside), therefore no simple user can call this function from frontend.

```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read;
    }
		//	allow users change user's counter
    match /AllNumbers/enterFixedIdOfUserCounterHere {
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
