
## Install
```
 $ npm i
 $ source env.sh
 ```

## Start a selenium 

```
$ docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome:3.14.0-beryllium

```

## Init project
 - keys.json
 - env.sh

 ## Run
 ```
$ npm start
 ```

## Connect to EC2

```
 $ ssh -i "something.pem" ubuntu@something.compute.amazonaws.com
 ```

 #### Init EC2

 nvm

 ```
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
$ export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm [ -s "$NVM_DIR/bash_completion" ] && \."$NVM_DIR/bash_completion"
$ nvm install v8.10.1
 ```


 Yarn

 ```
  $ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  $ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  $ sudo apt-get update && sudo apt-get install yarn
  $ sudo apt-get update && sudo apt-get install --no-install-recommends yarn
```

Docker
```
$ apt-cache policy docker-ce
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
$ sudo apt-get update
$ sudo apt-get install -y docker-ce
$ sudo usermod -aG docker ${USER}
```

Nightmare
```
$ Xvfb -ac -screen scrn 1280x2000x24 :9.0 &
$ export DISPLAY=:9.0
```
