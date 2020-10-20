function validate(req, res, next) {
  // Capturing the validation errors in this request
  const { errors } = validationResult(req);

  if (errors !== null) {
    console.log(errors);
    return req.flash(errors[0].msg);
  }

  next();
}

module.exports = validate;
