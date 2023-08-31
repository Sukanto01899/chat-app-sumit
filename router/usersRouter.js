// External import
const express = require('express');

// Internal import
const {getUsers} = require('../controller/usersController');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')

const router = express.Router();

// Get user page
router.get('/',decorateHtmlResponse('Users'), getUsers)

module.exports = router