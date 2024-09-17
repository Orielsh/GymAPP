class AccessError extends Error {
  // user != udefined <--> isLoggedIn == true
  constructor(isLoggedIn, message) {
    super(message ? message : "Access denied");
    this.status = isLoggedIn ? 403 : 401
  }
}

module.exports = AccessError;