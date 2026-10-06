 
 
 
 
const { app } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');

const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'daylight-devtest-'));
app.setPath('appData', testRoot);
app.setPath('userData', path.join(testRoot, 'profile'));
fs.mkdirSync(app.getPath('userData'), { recursive: true });
require(path.join(__dirname, '..', 'src', 'main.js'));
