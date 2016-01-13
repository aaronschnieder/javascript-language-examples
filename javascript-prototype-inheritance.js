// todo: explain javascript prototypical inheritance lookup chain for methods and properties

// define a base object, similar to a base class
function BaseObject() {
  
  // define a property
  this._stuff = Math.random();
  
  // define a method
  this.logStuff = function(){
      console.log('childObject.logStuff ' + this._stuff);
  }
  
  // define a method that should be private to this object
  this.doPrivateStuff = function() {
        console.log('my password is 12345');
  }
  
}

// create a bunch of children of type BaseOject
var children = [];
for(var i = 0; i < 10; i++) {
    var childObject = new BaseObject();
    childObject.logStuff();
    children.push(childObject);
}
/*
    look at the children[childObject] instances in the debugger
    notice that both the _stuff property, logStuff and doPrivateStuff methods for these instances are local to the object instance
    notice that each instance of childObject has its own logStuff method that takes up 36 bytes of memory
    notice that each instance of childObject has its own doPrivateStuff method that takes up 36 bytes of memory
    notice that each instance of childObject takes up 108 bytes of memory
    notice the object's prototype takes up 28 bytes of memory
    notice that all 10 instances of BaseObject take up a whopping 1080 bytes of memory
*/

// now change the getStuff method implementation on BaseObject
BaseObject.logStuff = function(){
  console.log('childObject.logStuff ' + (this._stuff * 100));  
};

// call the log stuff function again on all of the objects after the implementation has changed
for(var i = 0; i < children.length; i++){
    children[i].logStuff();
}
/*
    the implementation is not changed because all instances of BaseObject created a local copy of all methods, including logStuff
    updating the logStuff method on the BaseObject definition doesn't affect all of the instantiated instances
*/

// now try to call the supposed to be private method of BaseObject from the first child instance
children[0].doPrivateStuff();
/*
    this works and doPrivateStuff is called successfully because it was a local method on the object and not really hidden
*/

// define an inherited object
function InheritedObject() {
    
    // add a new property
    this._myStuff = 'abcd';
    
    // inherit from BaseObject
    this.prototype = BaseObject;
    
    // add a new method called logStuff2
    this.logStuff2 = function() {
        console.log('InheritedObject.logStuff2 ' + this._stuff + this._myStuff);
    }
}

// create a new instance using the InheritedObject class
var o2 = new InheritedObject();

// call the BaseObject.logStuff and the new logStuff2 method
try{ o2.logStuff(); } catch(err) { console.log(err) }
/*
    o2.logStuff doesn't work because when InheritedObject inherited from BaseObject, nothing was actually inherited when the object
    prototype was set because the BaseObject methods were not added to the BaseObject prototype
*/

// call the InheritedObject.logStuff2 method
o2.logStuff2();
/*
    InheritedObject.logStuff2 executes just fine because it's implementation lives on InheritedObject
*/

// print out the property value for InheritedObject._myStuff
console.log('o2.myStuff ' + o2._myStuff);
/*
    the property value prints out fine because the property is (probably unintentionally) accessible directly
*/

// function definition with local method definition in an iife
var BetterBaseObject = ( function() {
    
    // ctor
    function BetterBaseObject() {};
    
    // private properties
    var _stuff = Math.random();
    
    // private methods
    function logStuff() {
        console.log('childObject.logStuff ' + _stuff);
    }
    
    function doPrivateStuff() {
        console.log('my password is 12345');
    }
    
    // public methods
    BetterBaseObject.prototype = {
        logStuff: logStuff
    };
     
    return BetterBaseObject;
}
)();

// create 10 instances of BetterBaseObject and call the logStuff method on each instance
var betterChildren = [];
for(var i =0; i < 10; i++) {
    var betterChild = new BetterBaseObject();
    betterChild.logStuff();
    betterChildren.push(betterChild);
}
/*
    look at the betterChildren[betterChild] instances in the debugger
    notice that neither the _stuff property or the logStuff method for these instances are local to the object instance
    notice that only the logStuff method is found on the prototype, the _stuff property is hidden
    notice that each instance of betterChild does not have its own logStuff method and takes up no memory!
    notice that each instance of betterChild takes up only 12 bytes of memory!
    notice the object's prototype takes up 16 bytes of memory
    notice that all 10 instances of BaseObject take up only 120 bytes of memory, 960 bytes less than objects from BaseObject!
*/

// try to call the doPrivateStuff method on the first instance of betterChild
try{ betterChildren[0].doPrivateStuff() } catch(err) { console.log(err); }
/*
    this call to doPrivateStuff fails because that method is hidden from children as intended thanks to closures and the revealing module pattern
*/