const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Welcome To Chatogram Mern Group',});
});


router.get('/chat', (req, res, next) => {
  res.render('chat', { title: 'Welcome MERN Group' });
});

module.exports = router;
