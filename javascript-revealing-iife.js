// Employee object definition wrapped in an IIFE using the revealing module pattern
var Employee = (function() {
    
    // private properties
    var _id = Math.random();
    
    // public properties
    var FirstName = '';
    var LastName = '';
    
    // ctor
    function Employee() {
        FirstName = 'Aaron';
        LastName = 'Schnieder';
    };
    
    // private functions
    function getId() {
        return _id;
    }
    
    function getName() {
        return FirstName + ' ' + LastName;
    }
    
    function getPassword() {
        return '12345';
    }
    
    // publically exposed properties and methods via the object's prototype
    Employee.prototype = {
        FirstName: FirstName,
        getId: getId,
        getName: getName
    };
 
    // returns the object from the IIFE
    return Employee;
    
})();
/*
    wrapping a function in ( )(); creates an Immediately Invoked Function Expression (IIFE)
    an IIFE, uses closures to scope all properties and methods to the function and prevent
    hoisting to the global scope, thereby making a mess of the scope
    
    the revealing module pattern exposes only what is explicitly exposed by the object's prototype
    
    using a combination of IIFE and the revealing pattern provides many big benefits, including
    - the global scope is kept clean because all properties and methods are locally scoped to the IIFE
    - IIFE hides all properties and methods by default, making the revealing module pattern straight forward
    - the IIFE makes revealing methods more straight forward using the object's prototype, supporting proper prototypical inheritance 
*/

// creates a new javascript object of type Employee using protypical inheritance
var e = new Employee();

// _id doesn't exist on the instance of Employee because it wasn't exposed to inheriting objects
console.log('Employee._id ' + e._id);

// getId and getName work just fine thanks to prototypical inheritance because both were exposed as methods on the object's prototype
console.log('Employee.getId() ' + e.getId());
console.log('Employee.getName() ' + e.getName());

// getPassword throws an exception because it was not exposed from the IIFE on the object's prototype
try{ console.log('Employee.getPassword() ' + e.getPassword()); } catch(err) { console.log(err); }


console.log('Employee.FirstName ' + e.FirstName);