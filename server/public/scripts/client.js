console.log('hi');

$(document).ready(function(){
    console.log('JQ');
    //establish click listeners 
    setupClickListeners();
    //load existing tasks on page load 
    getTasks();
});

//click listeners 
function setupClickListeners(){
    $('#addBtn').on('click', function(){
        console.log('in addButton on click');

        //get user input and put it into an object 
        let taskToSend = {
            task: $('#task').val(),
            description: $('#description').val(),
            completed: $('#completed').val(),
            // dateCompleted: $('#dateCompleted').val(),
        };

        //call saveTask with new object 
        saveTasks(taskToSend);
        //clear input value 
        $('input').val('');
    });
    $('#viewTasks').on('click', '.completeBtn', updateTask);
}

//gets task data 
function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response){
        console.log(response);
        render(response);
    }).catch(function(err){
        console.log('ERROR in GET', err);
    });
} 

//add new task data 
function saveTasks(newTask){
    console.log('in saveTasks', newTask);

    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask,
    }).then(function(response){
        console.log('Response from server', response);
        getTasks();
    }).catch(function(err){
        console.log('ERROR in POST');
    });
}

//update task 
function updateTask(){
    console.log('GET IT RIGHT THE FIRST TIME ');

    //variable to pull out data from task object 
    let task = $(this).closest("tr").data("task");
    let id = task.id;

    console.log(task, id);

    $.ajax({
        url: `/tasks/${id}`,
        method: 'PUT', 
        data: {
            completedStatus: task.completed
        }
    }).then(function(response){
        console.log('UPDATED TASK');
        getTasks();
    }).catch(function (err){
        console.log('ERROR in PUT', err);
    });
}

//render to the DOM 
function render(tasks){
    $('#viewTasks').empty();
    
    for (let task of tasks){

        let button = " ";

        if (task.completed === false){
            button = (`<button class="completeBtn">Complete</button>`);
        }else if (task.completed === true){
            //change color to pink 
        }

        let row = $(`
        <tr>
            <td>${task.task}</td>
            <td>${task.description}</td>
             <td>${task.completed}</td>
            <td>${button}</td>
        </tr>
        `) 
        // <td>${task.dateCompleted}</td>
        
        row.data('task', task);
        $('#viewTasks').append(row);
    }
}
