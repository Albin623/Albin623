"use strict";

document.addEventListener("DOMContentLoaded", setup);

let tdListArr = [];
let articleTask = document.createElement("article");
let x = 0;

function setup()
{
    loadTodo();
    let form = document.querySelector('form'); 
    form.addEventListener('submit', submit);   
}

//adding a new task
function submit(e)
{
    e.preventDefault();

    let radio = document.getElementsByName('radio');
    let cat;
    for (let i in radio)
    {
        if (radio[i].checked)
        {
            cat = radio[i].value;
        }
    }

    let toDo = {
        name: document.getElementById('task1').value,
        description: document.getElementById('desc1').value,
        importance: document.getElementById('imp1').value,
        category: cat
    };
    
    tdListArr.push(toDo);

    appendNewToDo(toDo);

    localStorage.setItem("tdListArr", JSON.stringify(tdListArr));
}
//append the new todo object
function appendNewToDo(toDo)
{
    let articleTask = document.createElement("article");

    let input1 = document.createTextNode(toDo.name);
    let input2 = document.createTextNode(toDo.description);
    let input3 = document.createTextNode(toDo.importance);
    let input4 = document.createTextNode(toDo.category);
        
    let box = document.createElement('input');
    box.setAttribute("type", "checkbox");
// The reason why I'm creating multiple spans and storing each input & the box in different ones is
// so I can style the tasks
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    let span4 = document.createElement('span');
    let spanBox = document.createElement('span');

    span1.appendChild(document.createTextNode("Task: "));
    span1.appendChild(input1);
    span2.appendChild(document.createTextNode("Description: "));
    span2.appendChild(input2);
    span3.appendChild(document.createTextNode("Importance: "));
    span3.appendChild(input3);
    span4.appendChild(document.createTextNode("Category: "));
    span4.appendChild(input4);
    spanBox.appendChild(box);

    articleTask.appendChild(span1);
    articleTask.appendChild(span2);
    articleTask.appendChild(span3);
    articleTask.appendChild(span4);
    articleTask.appendChild(spanBox);

    box.id = x;
    x++;

    box.addEventListener("click", checkedAction); 
    document.getElementById("sectionAppend").appendChild(articleTask);                  
}
//removing from global array
function checkedAction(e)
{
    e.currentTarget.parentElement.parentElement.remove();
  
        let checkedOrNot = parseInt(e.currentTarget.id);
            tdListArr.splice(checkedOrNot,1);
            x--;
            let checkBoxes = document.querySelectorAll("input[type=checkbox]");
        for(let i=0; i < checkBoxes.length; i++){
            checkBoxes[i].id = i;
        }

    localStorage.setItem("tdListArr", JSON.stringify(tdListArr));
}

function loadTodo()
{
    if(localStorage.getItem("tdListArr"))
    {
        tdListArr = JSON.parse(localStorage.getItem("tdListArr"));
        for (let i = 0 ; i < tdListArr.length; i++)
        {
            appendNewToDo(tdListArr[i]);    
        }
    }
}   