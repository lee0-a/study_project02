let taskInput = document.getElementById("task_input");
let addBtn = document.getElementById("addBtn");
let tabs = document.querySelectorAll('.task_tab');
let underLine = document.getElementById('under_line');
let taskList = [];
let mode = 'all';
let filterList = [];

// tabs.forEach(function(menu){
//     menu.addEventListener('click', function(e){
//         tabCalc(e);
//     })
// });

tabs.forEach((menu)=>menu.addEventListener('click',(e)=>tabCalc(e)))

function tabCalc (e){
    underLine.style.left = e.currentTarget.offsetLeft + 'px';
    underLine.style.width = e.currentTarget.offsetWidth + 'px';
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight  - 4 + 'px';
}

for(let i=0;i<tabs.length;i++){
    tabs[i].addEventListener('click', function(event){
        filter(event);
    });
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener('keypress', function(event){
    if(event.keyCode == 13){
        addTask();
    }
});

function addTask(){
    if(taskInput.value === ''){
        return alert('할 일을 입력해주세요.');
    };
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    taskInput.value = '';
    render()
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2,9);
}

function render(){
    let result = '';
    list = [];
    if(mode === 'all'){
        list = taskList;
    }else if(mode === 'ongoing' || mode === 'done'){
        list = filterList;
    }
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            result += `<div class="task flex_space">
                        <div class="task_content done_task">${list[i].taskContent}</div>
                        <div class="task_btns">
                            <button onclick="toggleComplete('${list[i].id}')">Check</button>
                            <button onclick="deleteTask('${list[i].id}')">Delete</button>
                        </div>
                    </div>`;
        }else{
            result += `<div class="task flex_space">
                            <div class="task_content">${list[i].taskContent}</div>
                            <div class="task_btns">
                                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                                <button onclick="deleteTask('${list[i].id}')">Delete</button>
                            </div>
                        </div>`;
        }
    }

    document.getElementById('task_box').innerHTML = result;
}

function toggleComplete(id){
      
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    filter();
}

function filter(event){
    if(event){
        mode = event.target.id;
    }
    filterList = [];
    if(mode === 'ongoing'){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
    }else if(mode === 'done'){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}