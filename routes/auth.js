const express = require('express');
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');
const { check } = require('express-validator');

router.post('/signup',[
    check("name", 'Name should be at least 3 char').isLength({ min: 3 }),
    check("email", "email required").isEmail(),
    check("password", "password should be more than 5 char").isLength({min: 5})
], signup);

router.post('/signin',[
    check("email", "email required").isEmail(),
    check("password", "password required").isLength({min: 1})
], signin);


router.get('/signout', signout);
router.get('/test', isSignedIn, (req, res) => {
    res.send("i am here");
});

module.exports = router;