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
 * @returns jQuery node: task card
 */
function createTaskBubble(title, desc, progress) {
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