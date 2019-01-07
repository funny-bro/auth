Feature('screenshoot: Coupon Create');

// const timeStamp = `${new Date().getTime()}`
const timeStamp = process.env.LOGIN_USERNAME

Scenario(`screenshoot`, async function (I) {
  I.monitor()
  I.amOnPage('/Default.aspx?view=0')
  I.disableIFrameAlert('#IFRAME1')
  I.wait(1)
  await I.saveScreenshot(`${timeStamp}-loginPage.png`)

  const verifyCode = await I.verifyImage(timeStamp)

  within({frame: ['#IFRAME1']}, () => {
    I.disableIFrameAlert('#IFRAME1')
    I.seeElement('#AuthScreen');
    I.fillField('input[name="aa-uid"]', process.env.LOGIN_USERNAME);
    I.fillField('input[name="aa-passwd"]',  process.env.LOGIN_PASSWORD);
    I.fillField('input[name="aa-captchaID"]', verifyCode);
    I.wait(1)
    I.click('#submit_hn a')
    I.wait(3)
    I.saveScreenshot(`${timeStamp}-submitted.png`)

    I.amOnPage('SSO/SSOcombineXml.aspx?url=QT')
    I.wait(2)
    I.saveScreenshot(`${timeStamp}-success.png`)
    I.saveLog(timeStamp)
  });
});
