'use strict';

/**
 * Created by baohg on 23/08/2016.
 */
var person = {
  firstName: 'Hoang',
  lastName: 'Pham',
  showName: function () {
    console.log(this);
    console.log(this.firstName + ' ' + this.lastName);
  }
};

//Ở đây this sẽ là object person
//person.showName(); //Hoang Pham.

setTimeout(person.showName, 20)

//setTimeout(function () {
//  person.showName()
//}, 20)
//
//setTimeout(person.showName.bind(person), 20)

function abc(cb){
  var tmp = "Demo"
  cb()
}

//abc(person.showName)