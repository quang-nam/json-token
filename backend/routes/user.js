const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');

const router = require('express').Router();
router.get('/', middlewareController.verifyToken, userController.getAllUsers);
// delete
router.delete("/:id", middlewareController.verifyTokenAndAdmin, userController.delete)
module.exports =router;