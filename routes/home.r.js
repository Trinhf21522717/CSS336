const express = require('express');
const router = express.Router();
const mianC = require('../controllers/home.c.js');

router.get('/', mianC.getHome)
router.post('/', mianC.portMusic)
router.delete('/', mianC.deleteMusic)

module.exports = router;