synkit 1.0.0

Utility module which facilitates the synchronization of Node.js loops and function flows.  


USAGE

       var Iterator    = require("synkit").Iterator;
       var Flow        = require("synkit").Flow;

       var iterator = new Iterator(this);
    
       iterator.each( items, function (self, item){
            console.log(item);
            self.ready();
        }, function () {
            console.log("end");
        });


       var flow = new Flow(this);
            
        flow.sync(
            function (self) {
                console.log("first");
            }, function () {
                console.log("second");
            }, function (self) { 
                console.log("end");
            }
        );
