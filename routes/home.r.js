const express = require('express');
const multer = require('multer');
const router = express.Router();
const mianC = require('../controllers/home.c.js');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', mianC.getHome)
router.post('/', mianC.portMusic)
router.post('/create', mianC.createMusic)
router.delete('/', mianC.deleteMusic)
router.post('/recordfile', upload.single('audio'), mianC.recordAudio)
module.exports = router;