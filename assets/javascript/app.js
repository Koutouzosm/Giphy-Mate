// making array of strings for topic
var topic = [
    "Philadelphia Eagles",
    "New England Patriots",
    "Dallas Cowboys",
    "Washington Redskins",
];

// Create buttons on HTML for topics
function buttonMaker(topicArray) {
    console.log(topicArray);

    // make a for (loop) to go through topic array
    for (var i = 0; i < topicArray.length; i++){
        console.log(topicArray[i]);
    // make the button
    var buttons = $("<button>");
    // Adding topic to the button
    buttons.text(topicArray[i]);
    // Appending the button
    $(".buttons").append(buttons);
    }
}

buttonMaker(topic);
