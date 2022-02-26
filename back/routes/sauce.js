const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth')
router.post('/', auth, multer, sauceController.createSauce);
router.get('/:id', auth, sauceController.readSauce);
router.put('/:id', multer, sauceController.updateSauce);
router.delete('/:id', sauceController.deleteSauce);

//READ ALL SAUCES//
router.get('/', auth, sauceController.readAllSauces);

// Like or Dislike //
// router.post('/:id/like', sauceController.likeDislike);

module.exports = router;
module.exports = router;
