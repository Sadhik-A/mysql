const express = require('express');
const usercontrol = require('../controllers/user.js');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    usercontrol.register(req, res);
  }
);


router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    usercontrol.jwtlogin(req, res);
  }
);



new rouute added 
module.exports = router;
