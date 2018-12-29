'use strict';
// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({
    loginPassword: function(email, password) {
      within('#signinForm', () => {
        this.fillField('input[name="email"]', email);
        this.fillField('input[name="password"]', password);
        this.click('button');
      });
    },
    loginCookie: function() {
      const cookieName = process.env.COOKIE_NAME
      const cookieValue = process.env.COOKIE_VALUE
      const domain = process.env.LOGIN_ENTRY
      const cookieObj = {
        name: cookieName,
        value: cookieValue,
        domain,
        path: '/Home',
        httpOnly: true
      }
      this.setCookie(cookieObj)
    }
  });
};
