// Flow
// Utility that sync functions execution 


/** DEPENDENCIES **/
var Callback = require("./Callback");


/** CONSTRUCTOR **/
var Flow = function (context){
    this.context = context;
    this.final = {};
    return this;
};


/** EXPORT **/
module.exports = Flow;


/**
 * Foreach loop abstraction
 * Calls recursive function that iterates over data
 * @public
 * @function foreach
 * @param {array} data items array
 * @param {function} callback function 
 * @param {function} final callback function
 */
Flow.prototype.sync = function () {
    var length, final, callback;
    
    length = 0;
    if (arguments.length>1) {
        final = arguments[arguments.length-1];
        delete arguments[arguments.length-1];
        length = arguments.length-1;
    }
    
    // implement:: if there is no final if its only one function
    if (arguments.length === 1) {
        final = false;
        length = arguments.length;
    }
    
    callback = new Callback(this.context, arguments[0]);
    this.next(0, length, arguments, callback, final);
    
};


/**
 * Recursive function over passed functions
 * @public
 * @function next
 * @param {Number} i function position in array
 * @param {Number} iterator remaining function count
 * @param {array} args function array
 * @param {function} callback function called for every item 
 * @param {function} final callback function called in the end of the loop
 */
Flow.prototype.next = function (i, iterator, args, callback, final) {

    //out callback as self argument
    callback.exec(callback);  
    
    callback.wait((function () {
        iterator--;
       
        if (args[i+1]!=undefined) {
            this.next(i+1, iterator, args, new Callback(this.context, args[i+1]), final);
        } else {
            if (iterator === 0 ) final(callback); 
        }
    
    }).bind(this));
};

