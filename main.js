const server = "http://10.230.127.70";


function addTaskModal() {
    $("#new-task-modal").modal("show");
}
function cancelAddTask() {
    $("#new-task-modal .modal-body input").val("");
    $("#new-task-modal").modal("hide");
}

/**
 * Creates jQuery task cards.
 * @param {String} title The title of the task
 * @param {String} desc The description of the task
 * @param {Number} progress Progress of the task between 0 and 1
 * @param {String} id The task's unique ID
 * @returns jQuery node: task card
 */
function createTaskBubble(title, desc, progress, id) {
    // Create jQuery nodes
    const $card = $("<div></div>");
    const $title = $("<h3></h3>");
    const $desc = $("<div></div>");
    const $progresLabel = $("<div></div>");
    const $progressBar = $("<input />");

    // Add properties to elements
    $card.addClass("card task-card");
    $title.addClass("task-title").text(title);
    $desc.addClass("task-description").text(desc);
    $progresLabel.addClass("task-progress");
    $progressBar.attr("type", "range")
        .addClass("task-progress")
        .prop({
            min: 0,
            max: 100,
            step: 5
        })
        .val(progress * 100);
    
    // Append elements to $card
    $card.append($title, $desc, $progresLabel, $progressBar);

    return $card;
}

/**
 * Creates a new task in the server database
 * @param {String} title The task title
 * @param {String} desc The task description
 * @param {Number} time Amount of time to complete task (in hours)
 */
function createNewTask(title, desc, time) {
    $.ajax({
        type: "POST",
        url: server + "/newtask",
        data: JSON.stringify({
            title, desc, time
        }),
        success: res => {
            console.log(res);
        }
    });
}

/**
 * Fetches tasks from server and displays them in UI.
 */
function getTasks() {
    $.ajax({
        type: "GET",
        url: server + "/gettask",
        dataType: "json",
        success: res => {
            console.log(res)
        }
    });
}