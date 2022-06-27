"use strict";

// 1. Default Parameters

console.log(
  "--------------------------Default Parameters--------------------------"
);

// - setting default values in case the initial is false

const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199) {
  // ES6 method
  // ES5 method (old way)
  // numPassengers = numPassengers || 1;
  // price = price || 1;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 5);
createBooking("LH123", undefined, 1000); // skipping a value

// --

// 2. How Passing Arguments Works: Value vs. Reference

console.log(
  "--------------------------How Passing Arguments Works: Value vs. Reference--------------------------"
);

// - primitive types gets copied while not affecting the original
// - reference types gets copied (from the heap) which can affect the original
// - javascript only passes by value NOT reference

const flight = "LH234";
const john = {
  name: "John Smith",
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;

  if (passenger.passport === 24739479284) {
    alert("Checked in");
  } else {
    alert("Wrong passport!");
  }
};

checkIn(flight, john);
console.log(flight);
console.log(john);

// EXAMPLE
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(john);
checkIn(flight, john);

// --

// 3. First-Class and Higher-Order Functions

console.log(
  "--------------------------First-Class and Higher-Order Functions--------------------------"
);

// first-class functions
// - javascript treats functions as 'first-class citizens'
// - this means that functions are 'simply values'
// - functions are just another 'type' of object (since objects are values, functionas are also values)

// higher-order functions
// - a function that 'receives' another function as an argument, that 'returns' a new function, or 'both'
// - this is only possible because of first-class functions
// - the function that gets passed is known as a 'callback function'

// --

// 4. Functions Accepting Callback Functions

console.log(
  "--------------------------Functions Accepting Callback Functions--------------------------"
);

// - callback makes it easy to split up code into their unique aspects
// - callback creates abstraction which means it hides all the complicated details

// EXAMPLE
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer("JavaScript is the best!", upperFirstWord);

// EXAMPLE(2)
// JS uses callbacks all the time
const high5 = function () {
  console.log("✋");
};
document.body.addEventListener("click", high5);

// EXAMPLE(3) (no need to know 'forEach' method for now)
["John", "Matt", "Adam"].forEach(high5);
