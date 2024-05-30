const valueMultiplier = (req, res, next) => {
    if (req.body.value) {
      req.body.value *= 1.25;
    }
    next();
  };
  
  module.exports = valueMultiplier;
  