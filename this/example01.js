'use strict';

/**
 * Created by baohg on 23/08/2016.
 */
var person = {
  firstName: "Penelope",
  lastName: "Barrymore",

  fullName: function () {
    //​//Notice we use "this" just as we used "he" in the example sentence earlier?:​
    console.log(this.firstName + " " + this.lastName);
    //​//We could have also written this:​​
    console.log(person.firstName + " " + person.lastName);
  }
}

console.log(person.firstName);
console.log(person.lastName);
person.fullName()