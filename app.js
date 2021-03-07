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
    //add task event
    form.addEventListener('submit', addTask)
    //remove task event
    taskList.addEventListener('click', removeTask)
    //Clear task event
    clearBtn.addEventListener('click', clearTasks)
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks)
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
        //Clear input
        taskInput.value = ''
    }

    e.preventDefault()
}

//Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains
        ('delete-item')) {
        if(confirm('Are you Sure?')) {
             e.target.parentElement.parentElement.remove()
        }
    }
    
}

//Clear tasks
function clearTasks() { 
    // taskList.innerHTML = '' one way to do it
    //Faster
    // https://jsperf.com/innerhtml-vs-removechild (deprecated)
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
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
                task.getElementsByClassName.display = 'block'
                /*Elements in HTML are mostly "inline" or "block" elements: 
                An inline element has floating content on its left and right side.
                 A block element fills the entire line, and nothing can be displayed 
                 on its left or right side.*/
            } else {
                task.style.display = 'none'
            }
    })    
    
 }