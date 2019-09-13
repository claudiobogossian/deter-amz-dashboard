var Token={
  tokenKey:"login_token",
  expiredKey: "expired_token",
  
  hasToken() {
    var token=this.getValueByKey(this.tokenKey);
    return (token && token!="");
  },
  
  removeToken() {
    this.setKey(this.tokenKey,null);
  },

  getToken() {
    return this.getValueByKey(this.tokenKey);
  },

  setToken(value) {
    this.setKey(this.tokenKey,value);
  },

  isExpiredToken() {
    return this.getValueByKey(this.expiredKey)==="true";
  },

  setExpiredToken(state) {
    this.setKey(this.expiredKey,state);
  },

  parseJwt(token) {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))

      return JSON.parse(jsonPayload)
  },

  /**
   * Set a new value for the specified key.
   * To remove one key, set the value with null or undefined
   * 
   * @param {string} key The name of key
   * @param {any} value The value of key
   */
  setKey(key,value) {
    if (typeof(Storage) !== "undefined") {
      if(value===undefined || value===null) {
        localStorage.removeItem(key);
      }else{
        localStorage.setItem(key, value);
      }
    }else {
        console.log("Sorry! No Web Storage support..");
    }
  },

  getValueByKey(key) {
    var value=null;
    if (typeof(Storage) !== "undefined") {
      value=localStorage.getItem(key);
    }else{
        console.log("Sorry! No Web Storage support..");
    }
    return value;
  }
}
