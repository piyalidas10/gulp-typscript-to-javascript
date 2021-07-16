/*
TypeScript Interface
adds a strong type check for any function, variable, or class implementing the interface.
*/
interface User {
    name: string;
    id: number;
    show();
}

// TypeScript Class
class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    show() {
        return "User Name is " + this.name;
    }
}

const user: User = new UserAccount("Murphy", 1); // use User interface
document.getElementById('user').innerText = user.show();


enum Directions {
    North,
    South,
    East,
    West
}

document.getElementById('directions').innerText = Directions[0];

// TypeScript Array with string type
let months: Array<string>;
months = ["Jan", "Feb"];
// months = [10, 12]; will give error becuase Array type will not match with value
