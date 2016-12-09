// Callback
// Creates an abstraction of a callback function


/** CONSTRUCTOR **/
var Callback = function (context, func) {
    this.context = context;
    this.func = func;
    this.isReady = false;
    return this;
};


/** EXPORT **/
module.exports = Callback;


/**
 * Executes passed function
 * @public
 * @function exec
 * @param {array} args
 */
Callback.prototype.exec = function (self, data) {
    this.func(self, data);
};


/**
 * Listens for a ready signal from the called function
 * @public
 * @function isReady
 * @return {boolean} isReady
 */
Callback.prototype.wait = function (callback) {
    if (this.callback === undefined) this.callback = callback;
    
    if (this.isReady === true) {
        clearTimeout(this.intervalId);
        this.callback();
    } else {
        this.intervalId = setTimeout(this.wait.bind(this), 100);
    }
    
};


/**
 * Returns isReady
 * @public
 * @function isReady
 * @return {boolean} isReady
 */
Callback.prototype.IsReady = function () {
    return this.isReady;
};


/**
 * Sets isReady to true
 * @public
 * @function ready
 */
Callback.prototype.ready = function () {
    this.isReady = true;
};
