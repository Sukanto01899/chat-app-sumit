// External import
const express = require('express')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')

// Internal import
const {getLogin} = require('../controller/loginController')

const router = express.Router();

// Get login page
router.get('/',decorateHtmlResponse('Login'), getLogin)

module.exports = router