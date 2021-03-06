"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}???</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}???`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}???`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}???`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}???`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// 1. Converting and Checking Numbers

console.log(
  "-------------------------------Converting and Checking Numbers-------------------------------"
);

// - all numbers are internally represented as floating point numbers (decimals)
// - numbers are formatted in binary forms (0's and 1's)
// - sometimes javascript computes weird numerical results for different mathematical operations (but this is normal)

console.log(23 === 23.0);
console.log(0.1 + 0.2);

// converting strings to numbers
console.log(Number("23"));
console.log(+"23"); // cleaner method

// parsing
console.log(Number.parseInt("30px", 10)); // finding a number within a string
console.log(Number.parseInt("e23", 10)); // needs to start with a number

console.log(Number.parseFloat("2.5rem")); // reads decimal numbers

// checkinf for values that are NaN (use only when checking for NaN)
console.log(Number.isNaN(20)); // checking for numbers
console.log(Number.isNaN("20"));
console.log(Number.isNaN(+"20X"));
console.log(Number.isNaN(23 / 0));

// checking for numbers (recommended way)
console.log(Number.isFinite(20)); // better way
console.log(Number.isFinite("20"));
console.log(Number.isFinite("20X"));
console.log(Number.isFinite(23 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

// --

// 2. Math and Rounding

console.log(
  "-------------------------------Math and Rounding-------------------------------"
);

// square root, cubic root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

// maximum value
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, "23", 11, 2));
console.log(Math.max(5, 18, "23px", 11, 2));

// minimum value
console.log(Math.min(5, 18, 23, 11, 2));

// constants
console.log(Math.PI * Number.parseFloat("10px") ** 2); // area of a circle

// random
console.log(Math.trunc(Math.random() * 6));

// example #1 (number stays between min and max)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min; // 0...1 -> 0...(max - min) -> min...(max - min + min)
console.log(randomInt(10, 20));

// rounding integers
console.log(Math.trunc(23.3)); // get rids of decmial points and values

console.log(Math.round(23.3)); // rounds to the nearest integer
console.log(Math.round(23.9));

console.log(Math.ceil(23.3)); // rounds up integers
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3)); // rounds down integers
console.log(Math.floor(23.9));

// rounding decimals
console.log((2.7).toFixed(0)); // returns a string
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));

// --

// 3. The Remainder Operator

console.log(
  "-------------------------------The Remainder Operator-------------------------------"
);

// - returns the remainder of a division

console.log(5 % 2); // remainder
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

// odd / even
console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

// example #1
const isEven = (n) => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

// example #2
labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = "orangered";
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = "blue";
  });
});

// --

// 4. Numeric Separators

console.log(
  "-------------------------------Numeric Separators-------------------------------"
);

// - to make reading numbers easier

const diameter = 287_460_000_000; // 287,460,000,000
console.log(diameter);

// example #1
const priceCents = 345_99;
console.log(priceCents);

// example #2
const transferFee = 15_00;
const transferFee2 = 1_500;

// example #3 (restrictions)
const PI = 3.14_15; // cannot place underscores at the beginning, end, and between a decimal (also cannot have 2 underscores together)
console.log(PI);

// example #4 (cannot place underscore on strings)
console.log(Number("230_000"));
console.log(parseInt("230_000"));
