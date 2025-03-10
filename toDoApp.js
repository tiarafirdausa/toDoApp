const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });

// Array to store the todos
let todos = [];

// Function to show the menu
function showMenu() {
  console.log("\n=== To-Do List ===");
  console.log("1. Add Todo");
  console.log("2. Show Todos");
  console.log("3. Delete Todo");
  console.log("4. Mark Todo");
  console.log("5. Exit");
  rl.question("Choose an option: ", function (option) {
    switch (option) {
      case "1":
        addTodo();
        break;
      case "2":
        showTodos();
        break;
      case "3":
        deleteTodo();
        break;
      case "4":
        markTodo();
        break;
      case "5":
        console.log("Thanks for using the app");
        rl.close();
        break;
      default:
        console.log("Invalid option");
        showMenu();
    }
  });
}

// Function to add a new todo
function addTodo() {
  rl.question("Enter a new todo: ", function (todo) {
    if (todo.trim() === "") {
      console.log("Todo cannot be empty");
    } else {
      todos.push({ text: todo, done: false });
      console.log("Todo added successfully");
    }
    showMenu();
  });
}

// Function to show all todos
function showTodos() {
  console.log("\n== Todos: ==");
  if (todos.length === 0) {
    console.log("No todos to show");
  } else {
    todos.forEach((todo, index) => {
      const status = todo.done ? "[x]" : "[ ]";
      console.log(`${index + 1}. ${status} ${todo.text}`);
    });
  }
  showMenu();
}

// Function to delete a todo
function deleteTodo() {
  rl.question("Enter the number of the todo to delete: ", function (index) {
    index = parseInt(index) - 1;
    if (index >= 0 && index < todos.length) {
      todos.splice(index, 1);
      console.log("Todo deleted successfully");
    } else {
      console.log("Invalid todo number");
    }
    showMenu();
  });
}

// Function to mark/unmark a todo as done
function markTodo() {
  rl.question("Enter the number of the todo to mark/unmark: ", function (index) {
    index = parseInt(index) - 1;
    if (index >= 0 && index < todos.length) {
      todos[index].done = !todos[index].done;
      console.log("Todo marked/unmarked successfully");
    } else {
      console.log("Invalid todo number");
    }
    showMenu();
  });
}

// Start the app by showing the menu
showMenu();
