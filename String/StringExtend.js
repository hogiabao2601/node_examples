/**
 * Created by baohg on 5/29/16.
 */
String.prototype.reverse = function() {
    var result = "";
    for (var i = this.length -1 ; i >= 0; i--){
        result += this.charAt(i);
    }
    return result;
};

String.prototype.camelcase = function() {
    var result = "";
    var prevChar = undefined;
    for (var i = 0; i < this.length; i++){
        var currentChar = this.charAt(i);
        if (i == 0 || prevChar == " ") {
            result += currentChar.toUpperCase();
        } else {
            result += currentChar;
        }
        prevChar = currentChar;
    }
    return result;
};

module.exports = String;