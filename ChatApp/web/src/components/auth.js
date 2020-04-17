class Auth {
    constructor() {
      this.authenticated = true;
    }
  
    login(cb) {
      this.authenticated = true;
      cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new Auth();