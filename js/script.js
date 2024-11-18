//유저가 값을 입력한다
//+버튼을 클릭하면 할일이 추가된다
//delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 생긴다
//진행중 끝남 탭을 누르면 언더바가 이동한다
// 끝남 탭은 끝난 아이템만, 진행중 탭은 진행중 아이템만
//전체 탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task_input");
let addBtn = document.getElementById("addBtn");
let taskList = [];

addBtn.addEventListener("click", addTask)

function addTask(){
    // let taskContent = taskInput.value;
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    render()
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2,9);
}

function render(){
    let result = '';

    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            result += `<div class="task flex_space">
                        <div class="task_content done_task">${taskList[i].taskContent}</div>
                        <div class="task_btns">
                            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                            <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                        </div>
                    </div>`;
        }else{
            result += `<div class="task flex_space">
                            <div class="task_content">${taskList[i].taskContent}</div>
                            <div class="task_btns">
                                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                                <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
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
    render();
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
}