/** CONSTRUCTOR **/
var Callback = function(context, func){
    this.context = context;
    this.func = func;
    this.is_ready = false;
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
Callback.prototype.exec = function (args) {
    this.func(args);
};


/**
 * Listens for a ready signal from the called function
 * @public
 * @function isReady
 * @return {boolean} is_ready
 */
Callback.prototype.wait = function (callback) {
    if(this.callback==undefined){
        this.callback = callback;
    }
    
    if(this.is_ready==true){
        clearTimeout(this.interval_id);
        this.callback();
    }else{
        this.interval_id = setTimeout(this.wait.bind(this), 100);
    }
    
};


/**
 * Returns is_ready
 * @public
 * @function isReady
 * @return {boolean} is_ready
 */
Callback.prototype.isReady = function () {
    return this.is_ready;
};


/**
 * Sets is_ready to true
 * @public
 * @function ready
 */
Callback.prototype.ready = function () {
    this.is_ready = true;
};
