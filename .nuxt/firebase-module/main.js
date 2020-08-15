import * as firebase from 'firebase/app'

const config = {"apiKey":"AIzaSyCK2PcIZuv7CSTyumyroIoAFOUzyS2AuDM","authDomain":"nuxt-firebase-admin-dev.firebaseapp.com","databaseURL":"https:\u002F\u002Fnuxt-firebase-admin-dev.firebaseio.com","projectId":"nuxt-firebase-admin-dev","storageBucket":"nuxt-firebase-admin-dev.appspot.com","messagingSenderId":"724541760097","appId":"1:724541760097:web:a358ad598af889aea38020"}

export default async ({ res }, inject) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const session = firebase.apps[0]

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE AUTH ---------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  await import(/* webpackChunkName: 'firebase-auth' */'firebase/auth')

  const fireAuth = session.auth()
  const fireAuthObj = firebase.auth
  inject('fireAuth', fireAuth)
  inject('fireAuthObj', fireAuthObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------- FIREBASE FIRESTORE ------------------------------------ **/
  /** --------------------------------------------------------------------------------------------- **/

  await import(/* webpackChunkName: 'firebase-firestore' */'firebase/firestore')

  const fireStore = session.firestore()
  const fireStoreObj = firebase.firestore
  inject('fireStore', fireStore)
  inject('fireStoreObj', fireStoreObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------ FIREBASE FUNCTIONS ------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  await import(/* webpackChunkName: 'firebase-functions' */'firebase/functions')

  const fireFunc = session.functions()
  const fireFuncObj = firebase.functions

  inject('fireFunc', fireFunc)
  inject('fireFuncObj', fireFuncObj)
}
