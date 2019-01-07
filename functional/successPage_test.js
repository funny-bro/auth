Feature('screenshoot: Coupon Create');

Scenario(`screenshoot`, async function (I) {
  I.monitor()
  I.amOnPage(`https://${process.env.DATA_PAGE_ENTRY}/Home`)
  I.see('查詢結果')
  I.saveScreenshot(`success-2nd.png`)
  I.saveHtml()
});
