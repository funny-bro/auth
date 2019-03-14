# parsing arg from command
for ARGUMENT in "$@"
do
    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)   
    case "$KEY" in
            USERNAME)              USERNAME=${VALUE} ;;
            PASSWORD)    PASSWORD=${VALUE} ;;     
            *)   
    esac    
done


echo 'Remore ./output'
if [ -d "output" ]; then rm -Rf output; fi

echo '[INFO] Login as ' $USERNAME
echo '[INFO] password ' $PASSWORD

echo '[INFO] get cookie: login page'
npx codeceptjs run --steps --config codecept.conf.nightmare.js

echo '[INFO] '
node command/extractCookie.js --out=output/$USERNAME-cookie.txt

echo '[INFO] get enuid, ensid: /Home page'
cookieValue=$(cat "output/$USERNAME-cookie.txt")
echo cookieValue=\'$cookieValue\'

# phantomjs ./command/phantomjs.js $cookieValue
npx codeceptjs run --steps --config codecept.conf.nightmare.js functional/successPage_test.js -- cookie=$cookieValue

echo '[INFO] final '
node command/extractEnsidEnuid.js --ensid=output/$USERNAME-ensid.txt --enuid=output/$USERNAME-enuid.txt
ENSID=$(cat "output/$USERNAME-ensid.txt")
ENUID=$(cat "output/$USERNAME-enuid.txt")
echo cookieValue=\'$cookieValue\'
echo ENSID=\'$ENSID\'
echo ENUID=\'$ENUID\'

node ./script/updateToDB.js --cookieValue=$cookieValue --ENUID=$ENUID --ENSID=$ENSID --USERNAME=$USERNAME