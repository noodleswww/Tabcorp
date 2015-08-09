/**
 * event
 * @returns {{listen: (Function|*), one: (Function|*), remove: (Function|*), trigger: (Function|*)}}
 * @constructor
 */
var Event = function () {
    var listen, obj, one, remove, trigger, __this;
    obj = {};
    __this = this;
    Event.obj = require && require('../config').debug ? obj : {} || {}; //only for test

    /**
     * add listen
     * ```js
     * obj.listen('xx',function(data){
     *      //data
     * });
     * ```
     * @param key the name of listen event
     * @param eventfn  event callback
     * @returns {Number} event callback
     */
    listen = function (key, eventfn) {
        var stack, _ref;
        stack = ( _ref = obj[key] ) != null ? _ref : obj[key] = [];
        return stack.push(eventfn);
    };
    /**
     * multiple listens,only the last time to perform a callback
     * @param key
     * @param eventfn
     * @returns {Number}
     */
    one = function (key, eventfn) {
        remove(key);
        return listen(key, eventfn);
    };
    remove = function (key) {
        var _ref;
        return ( _ref = obj[key] ) != null ? _ref.length = 0 : void 0;
    };
    /**
     * exec callback
     * ```js
     * obj.trigger('xx',{});
     * ```
     * @returns {boolean}
     */
    trigger = function () {
        var fn, stack, _i, _len, _ref, key;
        key = Array.prototype.shift.call(arguments);
        stack = ( _ref = obj[key] ) != null ? _ref : obj[key] = [];
        for (_i = 0, _len = stack.length; _i < _len; _i++) {
            fn = stack[_i];
            if (fn.apply(__this, arguments) === false) {
                return false;
            }
        }
    };
    return {
        listen: listen,
        one: one,
        remove: remove,
        trigger: trigger
    }
};
module.exports = Event;

