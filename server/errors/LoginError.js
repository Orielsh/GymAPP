class LoginError extends Error {
    constructor() {
      super("User not logged in");
      this.status = 401
    }
  }
  
module.exports = LoginError;