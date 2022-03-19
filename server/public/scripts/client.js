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

} 

//saves task data 
function saveTasks(){

}