class InvalidCredentialsError extends Error {
    constructor() {
      super("Invalid credentials");
      this.status = 401
    }
  }
  
  module.exports = InvalidCredentialsError;