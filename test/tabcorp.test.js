var Tabcorp = require('../lib/tabcorp');
var config = require('../config');
var should = require('should');
var testData = config.testData;

var tc = new Tabcorp(testData);


describe('test/tabcorp.test.js', function () {
    describe('related to constructor ', function () {
        it('tc._winList should be an Array and has 3 ele', function () {
            tc._winList.length.should.eql(3);
        });
        it('tc._arrData should be equal the constructor params testData', function () {
            tc._arrData.should.eql(testData);
        });
        it('tc._arrObj should has 3 key and each value has 12 elements', function () {
            Object.keys(tc._arrObj).length.should.eql(3);
            tc._arrObj.winArr.length.should.eql(12);
            tc._arrObj.placeArr.length.should.eql(12);
            tc._arrObj.exactaArr.length.should.eql(12);
        });
    });

    describe('main api in tabcorp has no callback',function () {
        beforeEach(function () {
            tc._winList = [2,3,1];
        });
        it('tc.generateWin() should be return "Win:2:$2.61"', function () {
            tc.generateWin().should.equal('Win:2:$2.61');
        });
        it('tc.generatePlace() should be have 3 elements and  ' +
            'be return ["Win:2:$2.61","Place:3:$1.27","Place:1:$2.13"]', function () {
            var arr = tc.generatePlace();
            arr.length.should.eql(3);
            arr[0].should.equal('Place:2:$1.06');
            arr[1].should.equal('Place:3:$1.27');
            arr[2].should.equal('Place:1:$2.13');
        });
        it('tc.generateExacta() should be return string "Exacta:2,3:$2.43"', function () {
            tc.generateExacta().should.equal('Exacta:2,3:$2.43');
        });
    });

    describe('main api in tabcorp has callback',function () {
        beforeEach(function () {
            tc._winList = [2,3,1];
        });
        it('tc.generateWin(callback) should be return "Win:2:$2.61"', function () {
            tc.generateWin(function (data) {
                data.should.equal('Win:2:$2.61');
            });
        });
        it('tc.generatePlace(callback) should be have 3 elements and  ' +
            'be return ["Win:2:$2.61","Place:3:$1.27","Place:1:$2.13"]', function () {
            tc.generatePlace(function (arr) {
                arr.length.should.eql(3);
                arr[0].should.equal('Place:2:$1.06');
                arr[1].should.equal('Place:3:$1.27');
                arr[2].should.equal('Place:1:$2.13');
            });

        });
        it('tc.generateExacta(callback) should be return string "Exacta:2,3:$2.43"', function () {
            tc.generateExacta(function (data) {
                data.should.equal('Exacta:2,3:$2.43');
            });
        });
    });
});