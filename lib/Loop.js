// Loop
// Used to rappresent a loop functionality as object
// It conatins a queue of function that loops with a specific delay
// Function can be added and remooved from the loop
// The loop can be restarted or completely stopped


/** CONSTRUCTOR **/
var Loop = function (delay) {
    this.intervalId = {};
    this.queue = [];
    this.delay = delay ;
};


/** EXPORT **/
module.exports = Loop;


/**
 * Adds a function to the loop queue
 * @public
 * @function add
 * @param    {function} fn function to be executed in the loop
 * @param    {String} name of the function
 */
Loop.prototype.add = function (fn, name) {
   
    var found = this.queue.some(function (el) {
        return el.name === name;
    });
    
    if (!found) this.queue.push({fn: fn, name: name}); 
};


/**
 * Removes a function from the loop queue
 * @public
 * @function remove
 * @param    {String} name of the function
 */
Loop.prototype.remove = function (name) {
    var i,
        len = this.queue.length;
    
    
    for (i = 0; i < len; i++) {
        if (this.queue[i].name === name) this.queue.splice(i);
    }
};


/**
 * Reset the loop queue
 * @public
 * @function reset
 */
Loop.prototype.reset = function () {
    this.queue = [];
};
    
    
/**
 * Starts the loop
 * @public
 * @function run
 */
Loop.prototype.run = function () {
    var i;
    
    for (i in this.queue) {
        this.queue[i].fn();
        //console.log(this.queue[i].name, ">>>");
    }
    
    this.intervalId = setTimeout(this.run.bind(this), this.delay);
};


/**
 * Restarts the loop with a delay specified
 * in the global config json
 * @public
 * @function restart
 */
Loop.prototype.restart = function () {
    clearTimeout(this.intervalId);
    this.intervalId = setTimeout(this.run.bind(this), global.config.app.restart_loop_delay);
};


/**
 * Stops the loop
 * @public
 * @function stop
 */
Loop.prototype.stop = function () {
    clearTimeout(this.intervalId);
};

/**
 * Sets the delay value
 * @public
 * @function setDelay
 */
Loop.prototype.setDelay = function (delay) {
    this.delay = delay;
};
