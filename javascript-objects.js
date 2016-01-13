/*  javascript objects are complext types with properties
    properties are key value pairs assigned to an object
*/
var myObject = {myProperty: "myValue", anotherProperty: "anotherValue"};

/* javascript objects can contain functions, they are the value of the property key value pair */
var myObjectWithFunctions = {
  myProperty: 1,
  myFunction: function() {
      console.log('value of myObjectWithFunctions.myProperty: ' + this.myProperty);
      console.log('value of myObject.myProperty: ' + myObject.myProperty);
  }
};

myObjectWithFunctions.myFunction();

/*  the revealing module pattern wraps an object in a closure, creating locally scoped (i.e. private) variables
    and functions that are only explicitly revealed via the return object literal.
    the revealing module pattern has many advantages, including keeping the global scope clean, componentization and cleanliness
*/
var myRevealingObject = ( function() {
  this.myProperty = 2;
  
  function myFunction() {
      console.log('value of myRevealingObject.myProperty: ' + myProperty);
      console.log('value of myObject.anotherProperty: ' + myObject.anotherValue);
  }
  
  return {
    theFunc: myFunction  
  };    
} )();

myRevealingObject.theFunc();