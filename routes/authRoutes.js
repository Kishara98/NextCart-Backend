const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  const body = req.body;
    const { userName, password, address, firstName, lastName, email } = body;
    if (!userName) throw new Error('UserName is required');
    if (!password) throw new Error('password is required');
    if (!address) throw new Error('Address is required');
    if (!firstName) throw new Error('First Name is required');
    if (!lastName) throw new Error('Last Name is required');
    if (!email) throw new Error('Email is required');

    try {
      console.log(body);
      res.status(200).json({ 
        message: 'Registration success', 
        account: body 
    });
    } catch (error) {
      res.status(500).json({ 
        message: 'Registration unsuccessful'
    });
    }
  
});

router.post('/login', (req, res) => {
    const { userName, email, password } = req.body;

    if(!(userName || email)) throw new Error('UserName or Email is required');
    try {
        console.log(userName, email);
        res.status(200).json({ 
          message: 'Login success', 
          account: userName, email
        });
    } catch(error) {
        res.status(500).json({ 
            message: 'Login unsuccessful'
        });
    }

})

router.post('/logout', (req, res) => {
  try {
    res.status(200).json({message: 'Logout successful'});
  } catch (error) {
    res.status(500).json({message: 'Logout unsuccess'})
  }
})
module.exports = router; 
