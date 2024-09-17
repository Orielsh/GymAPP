class EmailAlreadyExistError extends Error {
    constructor(email) {
      super(`Email ${email} already exist`);
      this.status = 409
    }
  }
  
  module.exports = EmailAlreadyExistError;