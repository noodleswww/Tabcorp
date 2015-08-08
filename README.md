# Tabcorp
Through the given 'ctor' params data, the Tabcorp set of calculation rules, to return the results of each produce.
These data can be collected via the 'stdin', or you can custom the test data,
and quickly see the results via the 'stdout'.

```
1. `$ npm install` ��װ Tabcorp ��������
2. `cp config.js` �������Ҫ�޸������ļ�
3. `$ npm test` ȷ��������Զ�����
4. `$ node betting.js/npm start`
```

## ����

�ܲ���

```bash
$ npm test
$ mocha test
```

�ܸ����ʲ���

```bash
$ mocha --require blanket -R html-cov > coverage.html
�������ļ��趨���˵�ǰĿ¼��coverage.html
```

debugger

```bash
$ npm install -g node-inspector
$ node --debug betting.js / node --debug-brk betting.js
$ node-inspcetor
```

travis
```
using [travis-ci](https://travis-ci.org) require to configure via github
```

## Quick Examples

```javascript
var tc = new Tabcorp(arrData);
var rtnData = tc.generateWin();
tc.generateWin(function (data) {
    //
});
var rtnData = tc.generateExacta();
tc.generateExacta(function (data) {
    //
});
var rtnData = tc.generatePlace();
tc.generatePlace(function (data) {
    //
});
```
.

## api
the exception in api do not capture, so if use inappropriate data ,it may cause unexpected output exception.

## ����


## License

MIT