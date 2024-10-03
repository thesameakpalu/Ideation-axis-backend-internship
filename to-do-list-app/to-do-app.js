const readline = require('readline');

const rdl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = []; 

const addTask = (description) => {
    console.log("Adding task...");
    setTimeout(() => {
        tasks.push(description);
        console.log(`Task added: "${description}"`);
        Home(); 
    }, 2000); 
};

const viewTasks = () => {
    console.log("Retrieving tasks...");
    setTimeout(() => {
        if (tasks.length === 0) {
            console.log("No tasks to show.");
        } else {
            console.log("Your tasks:");
            tasks.forEach((task, index) => {
                console.log(`${index + 1}. ${task}`);
            });
        }
        Home(); 
    }, 1000); 
};

const Home = () => {
    rdl.question("\nChoose an option:\n1. Add a task\n2. View tasks\n3. Exit\n", (option) => {
        switch (option.trim()) {
            case '1':
                rdl.question("Enter task description: ", (taskDesc) => {
                    addTask(taskDesc);
                });
                break;
            case '2':
                viewTasks();
                break;
            case '3':
                console.log("Goodbye!");
                rdl.close(); 
                break;
            default:
                console.log("Invalid option. Please try again.");
                Home(); 
        }
    });
};

console.log("Welcome to My Todo List Application, What do you want to do today");
Home(); 

