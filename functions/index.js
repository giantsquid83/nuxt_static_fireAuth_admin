const functions = require('firebase-functions')

const admin = require('firebase-admin')
admin.initializeApp()

exports.addCustomRole = functions.https.onCall((data, context) => {
  // hide if-block to create 1st admin
  if (context.auth.token.admin !== true) {
    return { error: 'only admins can change roles, u sick basterd' }
  }

  // get user and add custom claim (make admin)
  // return a promise:
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        [data.role]: true,
      })
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been assigned a new role.`,
      }
    })
    .catch((err) => {
      return err
    })
})
