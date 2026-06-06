import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
console.log(`
                      _oo0oo_
                     o8888888o
                     88" . "88
                     (| -_- |)
                     0\\  =  /0
                   ___/\`---'\___
                 .' \\\\|     |// '.
                / \\\\|||  :  |||// \\
               / _||||| -:- |||||- \\
              |   | \\\\\\  -  /// |   |
              | \\_|  ''\\---/''  |_/ |
              \\  .-\\__  '-'  ___/-. /
            ___'. .'  /--.--\\  \`. .'___
         ."" '<  \`.____\\_<|>_/___.\` >' "".
        | | :  \`- \\\`.;\`\\ _ /\`;.\`/ - \` : | |
        \\  \\ \`_.   \\_ __\\ /__ _/   .-\` /  /
    =====\`-.____\`.____ \\_____/___.-\`___.-'=====
                      \`=---='

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           Phật phù hộ, không bao giờ BUG
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`);
