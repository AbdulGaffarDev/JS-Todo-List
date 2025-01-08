//Get value of new task and store it to local storage
addingTask=()=>{
  let newTask=document.querySelector("#inputValue").value;
  let tasks=[];
  if(JSON.parse(localStorage.getItem("tasks"))===null){
       tasks=[];
  }else{
       tasks=JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(newTask);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
document.querySelector("#inputTask").addEventListener('submit',addingTask);

loadingData=()=>{
  if(JSON.parse(localStorage.getItem("tasks"))===null || JSON.parse(localStorage.getItem("tasks")).length===0){
    document.querySelector('ul').innerHTML='<div id="noData"> Nothing to do right now. </div>';
  }
  else{ 
    //Printing Tasks
    let storedTasks=JSON.parse(localStorage.getItem("tasks"));
    storedTasks.forEach(element => {
      //Create elements to print data
      let listItem=document.createElement('li');
      let span=document.createElement('span');
      let a=document.createElement('a');
      document.querySelector('ul').appendChild(listItem);
      listItem.appendChild(span);
      listItem.appendChild(a);
      listItem.className='task'
      a.className="icon-cross";
      span.innerText=element;
    });
  }
}
//Load data on page reload
document.querySelector('body').addEventListener('load', loadingData());

//Clear Tasks
document.querySelector('#clearTasks').addEventListener('click', ()=> localStorage.removeItem('tasks'));

//Remove task
removeTask=(e)=>{
  if(e.target.classList.contains('icon-cross')){
    let storedTasks=JSON.parse(localStorage.getItem("tasks"));
    storedTasks.forEach((element, i) => {
      if(element===e.target.parentElement.querySelector('span').innerText){
         storedTasks.splice(i,1);
         localStorage.setItem("tasks",JSON.stringify(storedTasks));
         window.location.reload();
         return;
      }
    });
  }
   
}
document.body.addEventListener('click', removeTask)