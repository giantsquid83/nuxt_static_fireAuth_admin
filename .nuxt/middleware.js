const middleware = {}

middleware['adminRoute'] = require('..\\middleware\\adminRoute.js')
middleware['adminRoute'] = middleware['adminRoute'].default || middleware['adminRoute']

export default middleware
