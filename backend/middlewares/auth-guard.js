const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secretLongEnough');
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
  } catch(err) {
    res.json({
      message: 'Auth failed',
      error: err
    })
  }
}