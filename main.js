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
    const $progressContainer = $("<div></div>");
    const $progressLabelContainer = $("<div></div>");
    const $progressLabel = $("<div></div>");
    const $progressBar = $("<input />");

    // Add properties to elements
    $card.addClass("card task-card").attr("id", `task-id-${id}`);
    $title.addClass("task-title").text(title);
    $desc.addClass("task-description").text(desc);

    // Progress bar and label
    $progressContainer.addClass("task-progress");
    $progressLabelContainer.addClass("progress");
    $progressLabel
        .addClass("progress-bar progress-bar-striped bg-dark")
        .attr("role", "progressbar")
        .css("width", `${progress * 100}%`)
        .text(`${progress * 100}% completed`);
    $progressBar
        .attr("type", "range")
        .addClass("task-progress")
        .prop({
            min: 0,
            max: 100,
            step: 5
        })
        .data("id", id)
        .val(progress * 100);
    $progressBar.on("change", function() {
        updateProgress(id, $(this).val() / 100);
    });

    // Append progress elements to container
    $progressContainer.append($progressLabelContainer.append($progressLabel));
    
    // Append elements to $card
    $card.append($title, $desc, $progressContainer, $progressBar);

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
            alert("Success!");

            cancelAddTask();

            getTasks();
        }
    });
}
$("#confirm-add-task-btn").on("click", () => {
    let title = $("#new-task-title").val();
    let desc = $("#new-task-description").val();
    let time = $("#new-task-time").val();

    createNewTask(title, desc, time);
});

/**
 * Fetches tasks from server and displays them in UI.
 */
function getTasks() {
    $("#task-list").html("");

    $.ajax({
        type: "GET",
        url: server + "/gettask",
        success: res => {
            for (i in res) {
                const task = res[i];
                if (task == null) continue;
                createTaskBubble(task.title, task.desc, task.progress, i).appendTo("#task-list");
            }
        }
    });
}
getTasks();

/**
 * Sends a request to the server to delete a task.
 * @param {String} id ID of the task to delete
 */
function deleteTask(id) {
    $.ajax({
        type: "POST",
        url: server + "/deltask",
        contentType: "application/json",
        data: JSON.stringify({
            id
        }),
        success: res => {
            console.log(res);
        }
    });
}

/**
 * Sends a request to the server to update progress of a task.
 * @param {String} id Task ID
 * @param {Number} progress Progress value from 0 to 1
 */
function updateProgress(id, progress) {
    $.ajax({
        type: "POST",
        url: server + "/progresstask",
        contentType: "application/json",
        data: JSON.stringify({
            id, 
            progress
        }),
        success: res => {
        }
    });
    $(`#task-id-${id} .progress-bar`).text(`${progress * 100}% completed`);
    $(`#task-id-${id} .progress-bar`).css("width", `${progress * 100}%`);
}
