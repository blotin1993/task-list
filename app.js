//Define UI vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//Load all event listeners
loadEventListeners()

//Load all event listeners
function loadEventListeners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //add task event
    form.addEventListener('submit', addTask)
    //remove task event
    taskList.addEventListener('click', removeTask)
    //Clear task event
    clearBtn.addEventListener('click', clearTasks)
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks)
}

//Get Tasks from LS
function getTasks() {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')) //around 5MB capacity(?)
    }

    tasks.forEach(function(task) {
        //create li element
        const li = document.createElement('li')
        //add class
        li.className = 'collection-item'
        //create text node and append to li
        li.appendChild(document.createTextNode(task))
        //Create new link element
        const link = document.createElement('a')
        //Add class
        link.className = 'delete-item secondary-content'
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //Append the link to li
        li.appendChild(link)
        //Append li to ul
        taskList.appendChild(li)    
    })
}

//Add task
function addTask(e) {

    if(taskInput.value === '') {
        alert('Add a task')
    } else {
        //create li element
        const li = document.createElement('li')
        //add class
        li.className = 'collection-item'
        //create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value))
        //li.innerText = taskInput.value // Hace lo mismo q arriba.
        // li.innerHTML = taskInput.value // hace lo mismo q arriba x2. consultar? 

        /* rta: ->Of course. createTextNode will escape any strings and show them as they are, 
        while innerHTML could render html-like strings into a DOM. If you don't want that 
        (unless you are sure the text contains no unescaped tags, e.g. when assigning a literal directly), 
        you can use textContent (or innerText for IE).
        Yet I'd recommend createTextNode, because all browsers support it equally without any quirks.
        innerHTML puede renderear HTMl tags.
        textContent? innerText?

        Differences from innerText
        Don't get confused by the differences between Node.textContent and HTMLElement.innerText. Although the names seem similar, there are important differences:

        textContent gets the content of all elements, including <script> and <style> elements. In contrast, innerText only shows “human-readable” elements.
        textContent returns every element in the node. In contrast, innerText is aware of styling and won’t return the text of “hidden” elements.
        Moreover, since innerText takes CSS styles into account, reading the value of innerText triggers a reflow to ensure up-to-date computed styles.
         (Reflows can be computationally expensive, and thus should be avoided when possible.)
        Unlike textContent, altering innerText in Internet Explorer (version 11 and below) removes child nodes from the element and permanently destroys all descendant text nodes. 
        It is impossible to insert the nodes again into any other element or into the same element after doing so.
        
        Differences from innerHTML
        Element.innerHTML returns HTML, as its name indicates. Sometimes people use innerHTML to retrieve or write text inside an element, 
        but textContent has better performance because its value is not parsed as HTML.
        Moreover, using textContent can prevent XSS attacks.
        */

        //Create new link element
        const link = document.createElement('a')
        //Add class
        link.className = 'delete-item secondary-content'
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //Append the link to li
        li.appendChild(link)
        //Append li to ul
        taskList.appendChild(li)
        //Store in Ls
        storeTaskInLocalStorage(taskInput.value)
        //Clear input
        taskInput.value = ''
    }

    e.preventDefault()
}

//Store task
function storeTaskInLocalStorage(task) {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')) //around 5MB capacity(?)
    }
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains
        ('delete-item')) {
        if(confirm('Are you Sure?')) {
             e.target.parentElement.parentElement.remove()


             //Remove From LS
             removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
    
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks
    if(localStorage.getItem('tasks') === null) {
            tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')) //around 5MB capacity(?)
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Clear tasks
function clearTasks() { 
    // taskList.innerHTML = '' one way to do it
    //Faster
    // https://jsperf.com/innerhtml-vs-removechild (deprecated)
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    //clear from LS
    clearTasksFromLocalStorage()
}

//Clear tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear()
}


//Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase()
    //we do it with query selector because it returns a node list. 
    //if we wanted to use a getElementByClass it would return a HTML collection which we can't use as an array
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent
            if (item.toLowerCase().indexOf(text) != -1) { 
                task.style.display = 'block'
                /*Elements in HTML are mostly "inline" or "block" elements: 
                An inline element has floating content on its left and right side.
                 A block element fills the entire line, and nothing can be displayed 
                 on its left or right side.*/
            } else {
                task.style.display = 'none'
            }
    })    
    
 }