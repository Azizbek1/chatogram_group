const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Welcome To Chatogram Mern Group',});
});

module.exports = router;
