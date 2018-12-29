Feature('screenshoot: Coupon Create');


const cookieName = process.env.COOKIE_NAME
const cookieValue = process.env.COOKIE_VALUE
const domain = process.env.LOGIN_ENTRY
const cookieObj = {
  name: cookieName,
  value: cookieValue,
  domain,
  path: '/',
  httpOnly: true
}

Scenario(`screenshoot`, async function (I) {
  I.amOnPage('/Default.aspx?view=0')
  I.wait(3)
  I.saveScreenshot('loginPage.png')
  const verifyCode = await I.verifyImage()

  I.saveScreenshot('-=-=-=-= 1.png')
  within({frame: "#IFRAME1"}, () => {
    I.seeElement('#AuthScreen');
    within('#AuthScreen', () => {
      I.fillField('input[name="aa-uid"]', process.env.LOGIN_USERNAME);
      I.fillField('input[name="aa-passwd"]',  process.env.LOGIN_PASSWORD);
      I.fillField('input[name="aa-captchaID"]', verifyCode);
      I.click('#submit_hn a')
      I.acceptPopup()
    });
  });
  I.saveScreenshot('-=-=-=-= 2.png')
  await I.sendGetRequest('/');


  // within('#AuthScreen', () => {
  //   this.fillField('input[name="aa-uid"]', '89856058');
  //   this.fillField('input[name="aa-passwd"]', 'zdh61422');
  //   this.fillField('input[name="aa-captchaID"]', verifyCode);
  //   I.click('.btn02 a')
  // });

  // I.executeScript(function () {
  //   document.querySelector('input[name="aa-uid"]').value = '89856058'
  //   document.querySelector('input[name="aa-passwd"]').value = 'zdh61422'
  //   document.querySelector('input[name="aa-captchaID"]').value = verifyCode
  // });

  // I.click('.btn02')
  // I.seeElement('.btn02 a')
  I.wait(100)
  I.click('#submit_hn a')
  // I.submitForm()

  I.executeScript(function() {
    console.log(document.querySelector('#submit_hn a'))
  });


  I.saveScreenshot('-=-=-=-= 2.png')

  // I.loginCookie()

  // I.setCookie(cookieObj)


  // I.click('.expandable.lastExpandable .build_folder')
  // I.click('#rec_list ul li:nth-child(3) span')
  I.selectOptionByOrder('select.country', 3)
  // I.wait(3)
  // I.selectOptionByOrder('select.township', 2)
  // I.saveScreenshot(`screenshoot_0.png`)
  // I.wait(3)
  // I.selectOptionByOrder('select.section', 2)
  // I.wait(3)

  I.fillField('input.sectioncode', '1');
  I.saveScreenshot(`screenshoot_1.png`)

  I.checkOption('#RBUILD');
  I.saveScreenshot(`screenshoot_2.png`)

  I.fillField('#number', '2');
  I.saveScreenshot(`screenshoot_3.png`)

  // I.pressKey('Enter');
  // I.saveScreenshot(`screenshoot_4.png`)
  I.click('.d_btn.font01')
  I.acceptPopup()

  I.saveScreenshot(`screenshoot_.png`)
  I.saveScreenshot(`done.png`)
});
