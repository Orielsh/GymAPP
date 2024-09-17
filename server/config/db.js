require('dotenv').config();

const mode = process.env.NODE_ENV;  // 'prod' or 'dev'

let uri;

if (mode === 'prod') {
  uri = process.env.MONGODB_URI_PROD
  console.log('Environment set to PRODUCTION mode')
} else {
  uri = process.env.MONGODB_URI_DEV
  console.log('Environment set to DEVELOPMENT mode')
}

module.exports = uri;