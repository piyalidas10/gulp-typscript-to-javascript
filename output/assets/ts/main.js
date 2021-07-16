// TypeScript Class
var UserAccount = /** @class */ (function () {
    function UserAccount(name, id) {
        this.name = name;
        this.id = id;
    }
    UserAccount.prototype.show = function () {
        return "User Name is " + this.name;
    };
    return UserAccount;
}());
var user = new UserAccount("Murphy", 1); // use User interface
document.getElementById('user').innerText = user.show();
var Directions;
(function (Directions) {
    Directions[Directions["North"] = 0] = "North";
    Directions[Directions["South"] = 1] = "South";
    Directions[Directions["East"] = 2] = "East";
    Directions[Directions["West"] = 3] = "West";
})(Directions || (Directions = {}));
document.getElementById('directions').innerText = Directions[0];
// TypeScript Array with string type
var months;
months = ["Jan", "Feb"];
// months = [10, 12]; will give error becuase Array type will not match with value
