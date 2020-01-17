$(document).ready(function(){

    const openButton = $('button#open-previous-talks');
    const previousTalksDiv = $('div#previous-talks');
    openButton.on('click', function () {
        previousTalksDiv.toggle();
        openButton.toggle();
    });
});