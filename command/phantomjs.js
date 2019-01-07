
// Start a PhantomJS "page" and point it to the desired URL.
const page = require('webpage').create();
const fs = require('fs')
const system = require('system')

var trafficWaitList = []
var trafficObject = {}
var steps=[];
var testindex = 0;
var loadInProgress = false;

phantom.addCookie({
    'name': 'JSESSIONID',
    'value': system.args[1],  /* required property */
    'domain': `${DATA_PAGE_ENTRY}`,
    'path': '/',
    'httponly': true,
    'secure': true,
});

page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36';

page.onResourceRequested = function(request, networkRequest) {
    console.log(request.method, '  : ', request.url)

    const headers = request.headers

    const reqObj = {
        method: request.method,
        url: request.url,
        postData: request.postData,
        headers: {}
    }

    for(var i =0 ;i<headers.length; i++){
        const name = headers[i].name
        const value = headers[i].value
        console.log('      ', name, '  :  ', value)
        
        reqObj.headers[name] = value
    }

    trafficObject[request.id] = reqObj
    trafficWaitList.push(request.id)
  };


page.onResourceReceived = function(response) {
    // console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
    trafficObject[response.id][response.stage] = response

    if(response.stage === 'end') {
        trafficWaitList.splice( trafficWaitList.indexOf(response.id), 1 );
    }

    if(trafficWaitList.length <= 0) {
        phantom.exit();
    }
  };


/**********DEFINE STEPS THAT FANTOM SHOULD DO***********************/
steps = [
    function(){
        console.log('Step 1 - Open Amazon home page');
        page.open(`https://${DATA_PAGE_ENTRY}/Home`, function(status){});
    },
	function(){
        console.log('Step 2 - Click on the Sign in button');
		page.evaluate(function(){
          document.querySelector('select[name="country"]').value='F';
        });
    },
    function(){
		page.evaluate(function(){
            document.querySelector('select[name="township"]').value='F14';
		});
    },
    function(){
		page.evaluate(function(){
            document.querySelector('input[name="sectioncode"]').value='0165';
		});
    },
    function(){
		page.evaluate(function(){
            document.querySelector('#RBUILD').checked=true;
		});
    },
    function(){
		page.evaluate(function(){
            document.querySelector('#projectB').value='0B';
		});
    },
    function(){
		page.evaluate(function(){
            document.querySelector('#number').value=321;
		});
    },
    function(){
		page.evaluate(function(){
            document.querySelector('a.font01').click()
		});
    },
    function(){
		console.log("Step 4 - Wait Amazon to login user. After user is successfully logged in, user is redirected to home page. Content of the home page is saved to AmazonLoggedIn.html. You can find this file where phantomjs.exe file is. You can open this file using Chrome to ensure that you are logged in.");
		 var result = page.evaluate(function() {
			return document.querySelectorAll("html")[0].outerHTML;
        });
        page.render('./output/phantomjs-success.png');
        fs.write('./output/phantomjs-success.html', result, 'w');
        fs.write('./output/phantomjs-traffic.json', JSON.stringify(trafficObject), 'w');
    },
];
/**********END STEPS THAT FANTOM SHOULD DO***********************/

//Execute steps one by one
interval = setInterval(executeRequestsStepByStep,50);

function executeRequestsStepByStep(){
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        //console.log("step " + (testindex + 1));
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function" && trafficWaitList.length <= 0) {
        console.log("test complete!");
        phantom.exit();
    }
}


/**
 * These listeners are very important in order to phantom work properly. Using these listeners, we control loadInProgress marker which controls, weather a page is fully loaded.
 * Without this, we will get content of the page, even a page is not fully loaded.
 */
page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('Loading started');
};
page.onLoadFinished = function () {
    loadInProgress = false;
    console.log('Loading finished');
    page.render('./output/phantomjs-export.png');
    fs.write('./output/mapPage.html', page.content, 'w');
};
page.onConsoleMessage = function(msg) {
    console.log(msg);
};