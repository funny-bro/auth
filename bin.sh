# 

echo 'Remore ./output'
if [ -d "output" ]; then rm -Rf output; fi

echo $LOGIN_USERNAME

echo '[INFO] get cookie: login page'
npx codeceptjs run --steps --config codecept.conf.nightmare.js

echo '[INFO] '
node command/extractCookie.js --out=output/$LOGIN_USERNAME-cookie.txt

echo '[INFO] get enuid, ensid: /Home page'
cookieValue=$(cat "output/$LOGIN_USERNAME-cookie.txt")
echo cookieValue=\'$cookieValue\'

# phantomjs ./command/phantomjs.js $cookieValue
npx codeceptjs run --steps --config codecept.conf.nightmare.js functional/successPage_test.js -- cookie=$cookieValue

echo '[INFO] final '
node command/extractEnsidEnuid.js --ensid=output/$LOGIN_USERNAME-ensid.txt --enuid=output/$LOGIN_USERNAME-enuid.txt
ENSID=$(cat "output/$LOGIN_USERNAME-ensid.txt")
ENUID=$(cat "output/$LOGIN_USERNAME-enuid.txt")
echo cookieValue=\'$cookieValue\'
echo ENSID=\'$ENSID\'
echo ENUID=\'$ENUID\'

node ./script/updateToDB.js --cookieValue=$cookieValue --ENUID=$ENUID --ENSID=$ENSID --LOGIN_USERNAME=$LOGIN_USERNAME