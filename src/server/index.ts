import {render} from 'ink';
import App from '@/ui/App.js';
import {createElement} from 'react';


// const ENTER_ALT_SCREEN = '\x1b[?1049h\x1b[H';
// const LEAVE_ALT_SCREEN = '\x1b[?1049l';

// process.stdout.write(ENTER_ALT_SCREEN);

// const restoreScreen = () => {
//   process.stdout.write(LEAVE_ALT_SCREEN);
// };

render(createElement(App) , {
    exitOnCtrlC: true
});

// instance.waitUntilExit().finally(restoreScreen);



// process.on('exit', restoreScreen);
// process.on('SIGINT', () => {
//   instance.unmount();
// });
// process.on('SIGTERM', () => {
//   instance.unmount();
// });