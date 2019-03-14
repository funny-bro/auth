var onExit = require('signal-exit')

exports.execPromise = function(cmd){
    return new Promise((resolve, reject)=>{
        // this would be way easier on a shell/bash script :P
        const child_process = require('child_process');

        console.log(`[INFO] Child process: ${cmd}`)

        const p = child_process.exec(cmd,function (error, stdout, stderr) {
            console.log('error: ' + error);
            console.log('stderr: ' + stderr);
            console.log('stdout: ' + stdout);
            return resolve()
        })

        // const parts = cmd.split(/\s+/g);
        // var p = child_process.spawn(parts[0], parts.slice(1), {stdio: 'inherit', env: process.env})

        // p.on('exit', function(code){
        //     if (code) {
        //         const err = new Error('command "'+ cmd +'" exited with wrong status code "'+ code +'"');
        //         err.code = code;
        //         err.cmd = cmd;
        //         console.log(' -=-=-=2')
        //         return resolve(err)
        //     }
        //     console.log(' -=-=-=3')
        //     return resolve()
        // });


        // onExit(function (code, signal) {
        //     console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
        //     console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
        //     console.log('kill spawn')
        //     console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
        //     console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
        //     p.kill('SIGINT');
        // })
    })
  };
  
  