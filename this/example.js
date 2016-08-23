'use strict'
/**
 * Created by baohg on 23/08/2016.
 */
var firstName = 'Peter';
var lastName = 'Ally';

function showFullName() {
  //// "this" inside this function will have the value of the window object​
  //// because the showFullName () function is defined in the global scope, just like the firstName and lastName​
  console.log(this.firstName + " " + this.lastName);
};

var person = {
  firstName: "Penelope",
  lastName: "Barrymore",
  showFullName: function () {
    // "this" on the line below refers to the person object, because the showFullName function will be invoked by person object.​
    console.log(this.firstName + " " + this.lastName);
  }
}

//showFullName(); // Peter Ally​

// window is the object that all global variables and functions are defined on, hence:​
window.showFullName(); // Peter Ally​

// "this" inside the showFullName () method that is defined inside the person object still refers to the person object, hence:​
person.showFullName(); // Penelope Barrymore