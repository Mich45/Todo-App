const todoForm = document.querySelector(".todo-form");
const getUlList = document.querySelector(".todo-list");
const myStorage = window.localStorage;
const hElement = document.querySelector('.todo-holder');
const dateElement = document.querySelector('.date-holder');
const todoValue = document.querySelector(".form").value;
// Capitalize String function
const capitalize = (str) => {
  let firstChar = str.charAt(0).toUpperCase();
  let remStr = str.slice(1);
  let capitalizedString = firstChar.concat(remStr);
  return capitalizedString
}

class newTodo{
  constructor(getStorage, ulList, capitalize){
    this.getStorage = getStorage;
    this.ulList  = ulList;
    this.capitalize = capitalize;
  }
  updateDOM(){
    let formInput = document.querySelector("#form-input").value;
    let storage = this.getStorage;
    let capitalizeString = this.capitalize;
    function createTodo(formValue){
      let todoObj = {};
      todoObj.content = formValue;
      todoObj.completed = false;
      // Save to local storage
      storage.setItem(todoObj.content, capitalizeString(todoObj.content));
      // Create Todo Element
      const createlistItem = document.createElement("li");
      createlistItem.textContent = capitalizeString(todoObj.content);
      createlistItem.setAttribute("class", "todo-item");
      const spanElement = document.createElement("span");
      //const icon = 
      createlistItem.appendChild(spanElement);
      getUlList.appendChild(createlistItem);
      //createlistItem.textContent
    }
    createTodo(formInput);
  };

  clearFormValue(){
    return todoValue === '';
  }

  // Get todos from storage
  retrieveStorage(){
    let storage = this.getStorage;
      if(storage.length !== 0){
        for(let storedTodo of Object.entries(storage)){
          const createlistItem = document.createElement("li");
          createlistItem.textContent = storedTodo[1];
          createlistItem.setAttribute("class", "todo-item");
          getUlList.appendChild(createlistItem);
          hElement.style.display = 'none'
        }
      }else{
        hElement.style.display = 'block';
      }
  }

 // Check if todos is not empty
  checkTodos(){
    let storage = this.getStorage
    if(storage.length !== 0){
      hElement.style.display = 'none';
    }else{
      hElement.style.display = 'block'; 
    }
  }

  // Modal Alert
  showModal() {
    let storage = this.getStorage;
    let todolist = this.ulList;
    const mainSection = document.querySelector("section")
    mainSection.setAttribute("id", "modal-activated");
    const modalBox = document.getElementById("modal-box");
    modalBox.style.display = "block";

    const deleteButton = document.getElementById("button-1");
    const cancelButton = document.getElementById("button-2");
    
    deleteButton.addEventListener('click', function clearLocalStorage(){
      modalBox.style.display = "none";
      mainSection.removeAttribute('id');
      storage.clear();
      if(storage.length === 0){
        hElement.style.display = 'block';
        let listItem = document.getElementsByClassName('todo-item');
        for(let item of Object.entries(listItem)){
          getUlList.removeChild(item[1])
        }
      }
    });
    cancelButton.addEventListener('click', function (){
      modalBox.style.opacity = 0;
      //modalBox.style.display = "none";
      mainSection.removeAttribute('id');
    })
  }
};
dateElement.innerText = new Date().toLocaleDateString('en-GB', {
  day : 'numeric',
  month : 'short',
  weekday : 'short'
  });
const Todo = new newTodo(myStorage, getUlList, capitalize);
todoForm.addEventListener("submit", (e) =>{
  e.preventDefault();
  Todo.updateDOM();
  Todo.checkTodos();
  Todo.clearFormValue();
});
const clearBtn = document.querySelector('.clear-localstorage');
clearBtn.addEventListener('click', () =>{
  Todo.showModal()
});
document.addEventListener('load', Todo.retrieveStorage());