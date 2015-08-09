var readline = require('readline');
var config = require('./config');
var Tabcorp = require('./lib/tabcorp');
var tbEvent = require('./lib/event')();

var tc = new Tabcorp(config.testData); //you can annotate it,and set when new object
tc._winList = [2, 3, 1];               //Convenient test
var arr = [];

// add listen event
tbEvent.listen('win', function (data) {
    console.log(data);
});
tbEvent.listen('place', function (data) {
    console.log(data);
});
tbEvent.listen('exacta', function (data) {
    console.log(data);
});
tbEvent.one('result', function (result) {
    console.log(result);
});

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
    tbEvent.trigger('result','Result:' + tc._winList.join(':'));
    tbEvent.trigger('win',tc.generateWin());
    tbEvent.trigger('place',tc.generatePlace().join('\n'));
    tbEvent.trigger('exacta',tc.generateExacta());
}, config.timeout);