var should = require('should');
var Event = require('../lib/event');
var rewire = require('rewire');


var testEvt = Event();
var testData = 'test data';
var callback = function (data) {

};


describe('event.test.js', function () {
    describe('only one event for listen', function () {
        before(function () {
            testEvt.listen('listen', callback);
        });
        it('method listen should add arr.length', function () {
            Event.obj.should.have.property('listen');
            Event.obj['listen'].length.should.eql(1);
        });
        it('should be reduce length when remove', function () {
            testEvt.remove('listen');
            Event.obj['listen'].length.should.eql(0);
        });
        it('should be exe callback when trigger', function () {
            testEvt.listen('listen', function (data) {
                data.should.equal(testData);
            });
            testEvt.trigger('listen',testData);
        });
    });

    describe('multiply event for method listen', function () {
        before(function () {
            testEvt.listen('multiply', callback);
            testEvt.listen('multiply', callback);
            testEvt.listen('multiply', callback);
        });
        it('multiply listen should add arr.length for each time', function () {
            Event.obj.should.have.property('multiply');
            Event.obj['multiply'].length.should.eql(3);
        });
    });

    describe('one event', function () {
        before(function () {
            testEvt.one('one', callback);
            testEvt.one('one', callback);
            testEvt.one('one', callback);
        });
        it('multiply using method use only attach last event', function () {
            Event.obj.should.have.property('one');
            Event.obj['one'].length.should.eql(1);
        });
    });
});