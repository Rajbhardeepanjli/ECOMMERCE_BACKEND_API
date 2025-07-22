const express = require('express');
const router = express.Router();
const authenticate=require('../middleware/authMiddleware')
const {cartPostRoutes,cartPutRoutes,cartDeleteRoutes,cartGetRoutes}=require('../controllers/cartController')

router.post('/:id',authenticate,cartPostRoutes)
router.put("/:id",authenticate,cartPutRoutes)
router.delete("/:id",authenticate,cartDeleteRoutes)
router.get('/',authenticate,cartGetRoutes)
module.exports=router;
