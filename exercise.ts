 
/* Basic types */
const temperature: number = 21
const welcomeMessage: string = "Hello and welcome!"
const isLoggedIn: boolean = false

/* Arrays and tuples */
const colors: string[] = ["blue", "red", "black"]
const userInfo: [string, number] = ["Strix", 22]

/* Enum, Any, Void, Null, and Undefined */
enum Season {Spring, Summer, Autumn, Winter}
function logValue(val: any) {
    console.log(val)
}
function noReturn(): void {
    console.log("No return")
}

/* Functions */
function _greet(name: string): string {
    return "Hi " + name + '! :D'
}
function multiply(a: number, b: number) {
    return a * b
}

/* Optional and Default Parameters */
function createEmail(to: string, subject: string = "No Subject") {}
function add(x: number, y: number, z?: number): number {
    if (typeof z !== 'undefined')
        return x + y + z
    return x + y;
}

/* Rest Parameters */
function concatenateStrings(...numbers: number[]) {
    console.log(numbers.join(''))
}
function maxNumber(...numbers: number[]) {
    return numbers.sort((a, b) => b - a)[0]
}

/* Defining Interfaces */
interface Vehicle {
    make: string,
    model: string,
    year?: number
}
function createVehicle(vehicle: Vehicle) {
    return vehicle
}


/* Optional Properties */
interface Person {
    firstName: string;
    lastName: string;
    age?: number;
}
interface NewPerson extends Person {
    email?: string
}
function updatePerson(person: Person, updates: Partial<NewPerson>): NewPerson {
    const newPerson = {...person, ...updates}
    return newPerson 
}

/* Readonly Properties */
interface Circle {
    readonly centerX: number,
    readonly centerY: number,
    readonly radius: number
}
function moveCircle(circle: Circle) {
    // works
    circle.centerX
    //doesn't work
    // circle.centerX = 2
}

/* Classes and Inheritance */
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name
    }
    move(distance: number) {
        console.log("Animal", this.name, "moved", distance)
    }
}
class Dog extends Animal {
    move(distance: number) {
        console.log("Dog", this.name, "moved", distance)
    }
}
const dog = new Dog("Max")
// dog.move(20) // prints: Dog Max moved 20

/* Public, Private, and Protected Modifiers */
class PersonC {
    private name: string;
    constructor(name: string) { this.name = name; }
}
const person = new PersonC("Strix")
// person.name // doesn't compile because name is private

/* Generic Functions */
function identity<T>(arg: T): T {
    return arg;
}
identity<number>(2) // returns 2
identity<string>("Hi") // returns "Hi"
function identityExtended<T>(arg: T): string {
    return typeof(arg);
}
identity<number>(2) // returns "string"

/* Generic Interfaces */
interface GenericIdentityFn<T> {
    (arg: T): T;
}
const returnArgNumber: GenericIdentityFn<number> = (arg: number): number => arg
const returnArgString: GenericIdentityFn<string> = (arg: string): string => arg
interface GenericArray<T> {
    arr: Array<T>
}

/* Numeric Enums */
enum myResponse { No, Yes }

/* String Enums */
enum Message {
    Success = "SUCCESS",
    Failure = "FAILURE"
}
const f = (response: myResponse) => response ? Message.Success : Message.Failure
// f(myResponse.No) // returns FAILURE

/* Union Types */
function padLeft(value: string, padding: string | number) {
    // function body
}
padLeft("str", 21)
padLeft("str", "21")
// padLeft("str", true) // won't compile

/* Intersection Types */
interface BusinessPartner {
    name: string;
    credit: number;
}
interface Contact {
    email: string;
    phone: string;
}
type Customer = BusinessPartner & Contact;
function fn(customer: BusinessPartner & Contact) {
    customer
}
const customer: Customer = {
    name: 'Strix',
    credit: -2069,
    email: 'strix@sqli.com',
    phone: '06240241294'
}
fn(customer)

/* Exporting and Importing Modules */
import { capitalize } from "./stringUtils"
capitalize("salam") // returns Salam

/* Default Exports */
import greet, { farewell } from './greeter';
greet('Strix')
farewell('Strix')

/* Namespaces */
// Calculator.BasicCalculator.add(2, 3) // returns 5
// console.log(Calculator.BasicCalculator.add(2, 3))
// TODO: NAMESPACES

/* Class Decorators */
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
function logged<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        constructor(...args: any) {
            super(...args);
            console.log("new instance created");
        }
    };
}
@sealed @logged
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
// new Greeter("...") // prints: "new instance created"

/* Method Decorators */
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}
function format(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    descriptor.value = function(message: string) {
        return original.call(this, message).toUpperCase()
    }
}
class Greeter2 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @format
    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}
new Greeter2('welcome!').greet() // returns "HELLO, WELCOME!"

/* Method Decorators */
interface Todo {
    title: string;
    description: string;
}
function updateTodo(todo: Todo, todoUpdates: Partial<Todo>) {
    todo = {...todo, ...todoUpdates}
}
interface User {
    name: string,
    age: number
}
const user: Readonly<User> = {
    name: 'Strix',
    age: 21
}
// user.name = 'simo' // won't compile
