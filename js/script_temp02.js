//유저가 값을 입력한다
//+버튼을 클릭하면 할일이 추가된다
//Delete  버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 생긴다
// 진행중 끝남 탭을 누르면 언더바가 이동한다
//끝남 탭은 끝난 아잍템만 진행중 탭은 진행중인 아이템만, 
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById('task_input');
let addBtn = document.getElementById('addBtn');
let tabLine = document.getElementById('under_line');
let tabBtn = document.querySelectorAll('.task_tab');
let taskList = [];
let filterList = [];
let mode = 'all';

// tabBtn.forEach(function(menu){
//     menu.addEventListener('click',function(e){
//         tabCalc(e)
//     })
// });

tabBtn.forEach((menu)=>{menu.addEventListener('click', (e)=>tabCalc(e))});



function tabCalc(e){
    tabLine.style.left = e.currentTarget.offsetLeft + 'px';
    tabLine.style.width = e.currentTarget.offsetWidth + 'px';
    tabLine.style.top = e.currentTarget.offsetTop + e.currentTarget.Height -4 + 'px';
}

tabBtn.forEach(function(menu){
    menu.addEventListener('click', function(e){
        filter(e)
    })
});

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        addTask()
    }
});

function addTask(){
    let taskCont = taskInput.value;
    if(taskCont == ''){
        return alert('할 일을 입력해주세요.')
    };

    let task = {
        taskCont:taskInput.value,
        id:randomID(),
        isComplete: false,
    }

    taskList.push(task);
    taskInput.value = '';

    render();
};

function render(){
    let result = '';
    let list = [];

    if(mode === 'all'){
        list = taskList;
    }else if(mode === 'ongoing' || mode === 'done'){
        list = filterList;
    }
    
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete === true){
            result += `<div class="task flex_space">
                        <div class="task_content done_task">${list[i].taskCont}</div>
                        <div class="task_btns">
                            <button onclick="toggleComplete('${list[i].id}')">Check</button>
                            <button onclick="deleteTask('${list[i].id}')">Delete</button>
                        </div>
                    </div>`
        }else if(list[i].isComplete === false){
            result += `<div class="task flex_space">
                            <div class="task_content">${list[i].taskCont}</div>
                            <div class="task_btns">
                                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                                <button onclick="deleteTask('${list[i].id}')">Delete</button>
                            </div>
                        </div>`
        }
    }

    document.getElementById('task_box').innerHTML = result;
};

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id === id){
            taskList.splice(i,1)
            break
        }
    }
    filter();
};

function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id === id){
            taskList[i].isComplete = !taskList[i].isComplete
            break
        }
    }
    filter();
};

function filter(e){
    if(e){
        mode = e.target.id;
    };

    filterList = [];

    if(mode === 'ongoing'){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
    }else if(mode === 'done'){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
    }

    render();    
};

function randomID(){
    return '_' + Math.random().toString(36).substr(2,9);
};