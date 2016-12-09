// Iterator
// Utility that synchronize loop executions


/** DEPENDENCIES **/
var Callback = require("./Callback");


/** CONSTRUCTOR **/
var Iterator = function (context) {
    this.context = context;
    return this;
};


/** EXPORT **/
module.exports = Iterator;


/**
 * Recursive function over data's item
 * @public
 * @function next
 * @param {Number} i item position in array
 * @param {Number} iterator remaining items count
 * @param {array} data items array
 * @param {function} callback function called for every item 
 * @param {function} final callback function called in the end of the loop
 */
Iterator.prototype.next = function (i, iterator, data, callback, final) {

    callback.exec(callback, data[i]);  
    
    callback.wait((function () {

        iterator--;
        if (data[i+1]!=undefined) {
            this.next(i+1, iterator, data, new Callback(this.context, callback.func), final);
        } else {
            if (iterator === 0 ) final(this.context);
        }
    
    }).bind(this));

};


/**
 * Foreach loop abstraction
 * Calls recursive function that iterates over data
 * @public
 * @function foreach
 * @param {array} data items array
 * @param {function} callback function 
 * @param {function} final callback function
 */
Iterator.prototype.each = function (data, func, final) {
    var callback = new Callback(this.context, func);
    this.next(0, data.length, data, callback, final);
};
  
