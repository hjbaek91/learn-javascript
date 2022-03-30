'use strict';

// --JAVASCRIPT OVERVIEW--
// 1. High-level
// 2. Garbage-collected
// 3. Interpreted or just-in-time compiled
// 4. Multi-paradigm
// 5. Prototype-based object-oriented
// 6. First-class functions
// 7. Dynamic
// 8. Single-threaded
// 9. Non-blocking event loop

// ------------------------

// --JAVASCRIPT ENGINE--
// - Program that 'executes' JavaScript code (ex. v8 engine, nodeJS).

// ------------------------

// --COMPILATION VS. INTERPRETATION--

// Compilation: Entire code is converted into machine code at once, and written to a binary(portable) file that can be executed by a computer (faster method).

// Interpretation: Interpreter runs through the source code and executes it line by line (however, this method is slow).

// Just-in-time (JIT) compinlation: Entire code is converted into machine code at once, then executed immediately (best method).
// - 'parsing' (reading)
// - 'compilation' (compile to machine code)
// - 'execution' (run code immediately)
// - 'optimization' (update code)

// ------------------------

// --JAVASCRIPT RUNTIME--
// - Container including all the things that we need to use JavaScript (ex. browser)
// - Properties
//   a) JS Engine
//   b) Web APIs
//   c) Callback queue

// ------------------------

// --EXECUTION CONTEXT--

// Q. What is an execution context?
// A. Environment in which a piece of JavaScript is executed. Stores all the necessary information for some code to be executed.

// Q. What's inside the execution context?
// A. a) Variable Environment
//       - let, const, and var declarations
//       - Functions
//       - arguments object
//    b) Scope chain
//    c) 'this' keyword

// ------------------------

// --CALL STACK--
// - JavaScript code gets executed in a certain order:
// - Global code -> code inside functions -> returned process

// ------------------------

// --SCOPE--

// Scoping: How our program's variables are 'organized' and 'accessed'.
// - "Where do variables live?" or
// - "Where can we access a certain variable, and where not?"

// Lexical scoping: Scoping is controlled by 'placement' of functions and blocks in the code.

// Scope: Space or environment in which a certain variable is 'declared'(variable environment in case of functions).
// - There is 'global' scope,
//            'function' scope, and
//            'block' scope.

// Scope of a variable: Region of our code where a certain variable can be 'accessed'.

// ------------------------

// --THE 3 TYPES OF SCOPE--

// 1. Global Scope
//    - Outside of 'any' function or block
//    - Variables declared in global scope are accessible 'everywhere'

// 2. Function Scope
//    - Variables are accessible only 'inside function, NOT' outside
//    - Also called local scope

// 3. Block Scope (ES6)
//    - Variables are accessible only 'inside block' (block scoped)
//    - HOWEVER, this only applies to 'let' and 'const' variables!
//    - Functions are 'also block scoped' (only in strict mode)

// ------------------------

// --THE SCOPE CHAIN--
// - Scope has access to variables from all 'outer scopes'
// - 'let' and 'const' are block-scoped, while 'var' is function-scoped
