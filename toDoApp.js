const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });

function createTodoManager() {
  let todos = [];
  return {
    // Function to add a new todo
    addTodo: (todo) => {
      if (todo.trim() === "") {
        console.log("Todo cannot be empty");
      } else {
        todos.push({ text: todo, done: false });
        console.log("Todo added successfully");
      }
    },
    // Function to show all todos
    showTodos: () => {
      console.log("\n== Todos: ==");
      if (todos.length === 0) {
        console.log("No todos to show");
      } else {
        todos.forEach((todo, index) => {
          console.log(`${index + 1}. [${todo.done ? "x" : " "}] ${todo.text}`);
        });
      }
    },
    // Function to delete a todo
    deleteTodo: (index) => {
      index = parseInt(index) - 1;
      if (index >= 0 && index < todos.length) {
        todos.splice(index, 1);
        console.log("Todo deleted successfully");
      } else {
        console.log("Invalid todo number");
      }
    },
    // Function to mark/unmark a todo as done
    markTodo: (index) => {
      index = parseInt(index) - 1;
      if (index >= 0 && index < todos.length) {
        todos[index].done = !todos[index].done;
        console.log("Todo marked/unmarked successfully");
      } else {
        console.log("Invalid todo number");
      }
    },
  };
}

const todoManager = createTodoManager();

function handleUserInput(question, callback) {
  rl.question(question, callback);
}

// Function to show the menu
function showMenu() {
  console.log("\n=== To-Do List ===");
  console.log("1. Add Todo");
  console.log("2. Show Todos");
  console.log("3. Delete Todo");
  console.log("4. Mark Todo");
  console.log("5. Exit");

  handleUserInput("Choose an option: ", (option) => {
    switch (option) {
      case "1":
        handleUserInput("Enter a new todo: ", (todo) => {
          todoManager.addTodo(todo);
          showMenu();
        });
        break;
      case "2":
        todoManager.showTodos();
        showMenu();
        break;
      case "3":
        handleUserInput("Enter the todo number to delete: ", (index) => {
          todoManager.deleteTodo(index);
          showMenu();
        });
        break;
      case "4":
        handleUserInput("Enter the number of the todo to mark/unmark: ", (index) => {
          todoManager.markTodo(index);
          showMenu();
        });
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

// Start the app by showing the menu
showMenu();
