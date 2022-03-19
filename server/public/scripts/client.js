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
            dateStarted: $('#dateStarted').val(),
            dateCompleted: $('#dateCompleted').val(),
        };

        //call saveTask with new object 
        saveTasks(taskToSend);
    })
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
        console.log('error in GET', err);
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

//render to the DOM 
function render(tasks){
    $('#viewTasks').empty();
    
    for (let task of tasks){

        let row = $(`
        <tr>
            <td>${task.task}</td>
            <td>${task.description}</td>
            <td>${task.dateStarted}</td>
            <td>${task.dateCompleted}</td>
        </tr>
        `)
        
        row.data('task', task);
        $('#viewTasks').append(row);
    }
}