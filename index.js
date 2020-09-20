//Get elements from DOM
let todoForm = document.querySelector(".todo-form");
let getUlList = document.querySelector(".todo-list");

let todos = [
//   {
//     id: 1,
//     content: "Hello world, I was added dynamically!",
//     completed: true,
//   },
];

// Add new todo into DOM

const updateDOM = () =>{
 // Function to Create new todo
 let formInput = document.querySelector("#form-input").value;
 const createTodo = (formValue) => {
    let todoObj = {};
    todoObj.content = formValue;
    todoObj.completed = false;
    todos.push(todoObj);
    
   // Save to Local Storage
    const myStorage = window.localStorage;
    let todoItem =  myStorage.setItem(todoObj.content, todoObj.content);

    // Function to get all stored todos
   function getAllStoredItems(){
   var storageValues = Object.entries(myStorage);
     for([key, value] of storageValues){
       // Add STORED todo into DOM
    setTimeout(function(){
      const createlistItem = document.createElement("li");
      createlistItem.textContent = value;
      createlistItem.setAttribute("class", "todo-item");
      getUlList.appendChild(createlistItem);
      } ,500);
     } 
   };
   getAllStoredItems();

    // Function to clear Local Storage
    function clearLocalStorage(){
    var btn = document.querySelector('.clear-localstorage');
      btn.addEventListener('click', () =>{
        myStorage.clear();
      });
    };  
     clearLocalStorage();


    
  
  };
  
  createTodo(formInput);
};



 todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    updateDOM();
  });
  
