var readline = require('readline');
var config = require('./config');
var Tabcorp = require('./lib/tabcorp');

var tc = new Tabcorp(config.testData); //you can annotate it,and set when new object
tc._winList = [2, 3, 1];               //Convenient test
var arr = [];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
rl.prompt();
rl.on('line', function (line) {
    arr.push(line);
    rl.prompt();
});
setTimeout(function () {
    rl.pause();
    /**
     *  if you do not use test data,you can new obj here like this
     *  ```js
     *  var tc2 = new Tabcorp(arr);
     *  ```js
     *  And the output result depending on your input data to produce different results
     */
    console.log('Result:' + tc._winList.join(':'));
    console.log(tc.generateWin());
    console.log(tc.generatePlace().join('\n'));
    console.log(tc.generateExacta());
}, config.timeout);