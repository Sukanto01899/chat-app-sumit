// External import
const express = require('express');

// Internal import
const {getInbox} = require('../controller/inboxController');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')

const router = express.Router();

// Get inbox page
router.get('/',decorateHtmlResponse('Inbox'), getInbox)

module.exports = router