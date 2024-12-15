exports.error404 = (req, res, next) => {
    next({ msg: 'Not Found', status: 404 });
  };
  
  exports.error500 = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        msg: error.message,
      }
    });
  };