/**
 * Tabcorp
 */
+(function (name, definition) {
    var hasDefine = typeof define === 'function',
        hasExports = typeof module !== 'undefined' && module.exports;
    if (hasDefine) {
        define('tabcorp', definition);
    } else if (hasExports) {
        module.exports = definition();
    } else {
        this[name] = definition();
    }
})('tabcorp', function () {

    /**
     *
     * @param data
     * @returns {Tabcorp}
     * @constructor
     */
    var Tabcorp = function (data) {
        if (!(this instanceof Tabcorp)) {
            return new Tabcorp();
        }
        if (!data || !(data instanceof Array)) throw new Error('invalidate params');
        this._winList = _generateRandomResult().split(',');
        this._arrData = data;
        this._arrObj = {
            winArr: [],
            placeArr: [],
            exactaArr: []
        };
        _generateArr(this);
    };

    /**
     * private method to generate the result of race
     * rand top three race
     * @returns {string} [2,3,1] e.g.
     * @private
     */
    var _generateRandomResult = function () {
        return Array.apply(0, Array(3)).map(function () {
            return (function (charset) {
                return charset.charAt(Math.floor(Math.random() * charset.length))
            }('123456789'));
        }).join(',');
    };

    /**
     * private method to generate each product resources
     * @param _this
     * @private
     */
    var _generateArr = function (_this) {
        for (var i = 0, len = _this._arrData.length; i < len; i++) {
            var tpArr = _this._arrData[i].split(':');
            var tpProduct = tpArr[1];
            var tpArrEle2 = tpArr[2];
            //'E' produce two horses is split an array,others remain unchanged
            var tpSelection = isNaN(tpArrEle2) ? tpArrEle2.split(',') : tpArrEle2;
            var tpStake = tpArr[3];
            //element in each produce array is an obj like this format
            var obj = {'product': tpProduct, 'selection': tpSelection, 'stake': tpStake};
            if (tpProduct === 'W') {
                _this._arrObj.winArr.push(obj);
            } else if (tpProduct === 'P') {
                _this._arrObj.placeArr.push(obj);
            } else {
                _this._arrObj.exactaArr.push(obj);
            }
        }
    };

    /**
     * generate the result of 'Win' product
     * Examples:
     * ```js
     * var tc = new Tabcorp(inputData);
     * tc.generateWin()
     * ```
     * @returns {string} format string dividends
     */
    Tabcorp.prototype.generateWin = function () {
        var winNo1 = this._winList[0];
        var _winArr = this._arrObj.winArr;
        //W
        var winStake = 0,       // all punters stake
            winStakeEnd = 0;    //all stake between last winner punters

        for (var i = 0, len = _winArr.length; i < len; i++) {
            winStake += _winArr[i].stake * 1; //convert to digital
            if (_winArr[i].selection == winNo1) {
                winStakeEnd += _winArr[i].stake * 1;
            }
        }
        var remainStake = winStake - winStake * 0.15;
        //
        //if no punters win, In this situation, I let the results
        // winYields = remainStake/_winArr.length
        //Of course, it can be changed into other definitions
        var winYields = winStakeEnd ? (remainStake / winStakeEnd).toFixed(2) : (remainStake / _winArr.length).toFixed(2);

        var callback = Array.prototype.slice.apply(arguments)[0];
        var rtnData = 'Win:' + winNo1 + ':$' + winYields;
        if(callback){
            return callback(rtnData);
        }
        return rtnData;
    };

    /**
     * generate the result of 'Place' product
     * ```js
     * use like generateWin
     * ```
     * @returns {*[]} array that has each format string dividends
     */
    Tabcorp.prototype.generatePlace = function () {
        var _placeArr = this._arrObj.placeArr;
        var placeStake = 0,         //all punters stake
            placeFirstStake = 0,    //the total stake who choose no1
            placeSecondStake = 0,   //the total stake who choose no2
            placeThirdStake = 0;    //the total stake who choose no3
        for (var i = 0, len = _placeArr.length; i < len; i++) {
            var tpEle = _placeArr[i];
            placeStake += tpEle.stake * 1;
            if (tpEle.selection == this._winList[0]) {
                placeFirstStake += tpEle.stake * 1;
            }
            if (tpEle.selection == this._winList[1]) {
                placeSecondStake += tpEle.stake * 1;
            }
            if (tpEle.selection == this._winList[2]) {
                placeThirdStake += tpEle.stake * 1;
            }
        }
        var remainStake = ((placeStake - placeStake * 0.12) / 3).toFixed(2);
        //if no punters win set the each yields = remainStake/_placeArr.length
        var noWinnerDividends = (remainStake / _placeArr.length).toFixed(2);
        var pYields1 = placeFirstStake ? (remainStake / placeFirstStake).toFixed(2) : noWinnerDividends;
        var pYields2 = placeSecondStake ? (remainStake / placeSecondStake).toFixed(2) : noWinnerDividends;
        var pYields3 = placeThirdStake ? (remainStake / placeThirdStake).toFixed(2) : noWinnerDividends;

        var callback = Array.prototype.slice.apply(arguments)[0];
        var rtnData = [
            'Place:' + this._winList[0] + ':$' + pYields1,
            'Place:' + this._winList[1] + ':$' + pYields2,
            'Place:' + this._winList[2] + ':$' + pYields3
        ];
        if(callback){
            return callback(rtnData);
        }
        return rtnData;
    };

    /**
     * generate the result of 'Exact' product
     * ```js
     * use like generateWin
     * ```
     * @returns {string} format string dividends
     */
    Tabcorp.prototype.generateExacta = function () {
        var _exactaArr = this._arrObj.exactaArr;
        var exactaStake = 0,    //all punters stake
            exactaStakeEnd = 0; //stake that chose the correct first and second horse in correct order
        for (var i = 0, len = _exactaArr.length; i < len; i++) {
            var tpEle = _exactaArr[i];
            exactaStake += tpEle.stake * 1;
            tpEle.selection[0] == this._winList[0] &&
            tpEle.selection[1] == this._winList[1] &&
            (exactaStakeEnd += tpEle.stake * 1);
        }
        //if no punters win set the  yields = remainStake/_exactaArr.length
        var eYield = exactaStakeEnd ? ((exactaStake - exactaStake * 0.18) / exactaStakeEnd).toFixed(2) :
            (exactaStake / _exactaArr.length).toFixed(2);

        var callback = Array.prototype.slice.apply(arguments)[0];
        var rtnData = 'Exacta:' + this._winList.slice(0, 2).join(',') + ':$' + eYield;
        if(callback){
            return callback(rtnData);
        }
        return rtnData;
    };

    Tabcorp.Tabcorp = Tabcorp;
    return Tabcorp;
});