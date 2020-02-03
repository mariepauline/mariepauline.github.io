var talks;

function successFunc(data){
    if(data){
        talks = data;
    }
}
function getTalks() {
    var url = "https://sheetsu.com/apis/v1.0su/5029170cc0c5";
    $.ajax({ url: url, success: successFunc, async: false });
}

getTalks();

$(document).ready(function(){
    var currentTalkId;
    const gnistDate = "2020-04-22T";

    const speakerTitle = document.getElementById("speaker-title");
    const speakerTime =document.getElementById("speaker-time");
    const speakerDescription =document.getElementById("speaker-desc");
    const speakerSpeakers = document.getElementById("speaker-speakers");

    const countdownEl = document.getElementById("countdown-clock");
    var currentCountDownDate;
    var countdownInterval;


    function init(){
        currentTalkId = 1;
        updateCountdownDate();
        setCountdownInterval();
        showTalk(currentTalkId);
    }

    function updateNextTalk(){
        updateCountdownDate();
        showTalk(currentTalkId);
        setCountdownInterval();
        console.log('current id', currentTalkId);
    }

    function updateCountdownDate(countdownDate){
        currentCountDownDate = new Date(gnistDate+getTalk(currentTalkId).start+":00").getTime();
    }

    function showTalk(id){
        var talk = getTalk(id);
        speakerTitle.innerHTML = talk.title;
        speakerTime.innerHTML = talk.start;
        speakerDescription.innerHTML = talk.description;
        speakerSpeakers.innerHTML = talk.speaker;
    }

    function getTalk(id){
        return talks.find(elem => elem.id == id);
    }
    function getTalkIndex(id){
        return talks.findIndex(elem => elem.id == id);
    }


    function setCountdownInterval(){
        clearInterval(countdownInterval);
        countdownInterval = setInterval(function(){
            const now = new Date().getTime();
            const distance = currentCountDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownEl.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

            if(distance < 0){
                clearInterval(countdownInterval);
                currentTalkId++;
                updateNextTalk();
            }
        }, 1000);
    }

    function formatTime(val){
        const h = '' + (val / 36000 | 0) + (val / 3600 % 10 | 0);
        const i = '' + (val % 3600 / 600 | 0) + (val % 3600 / 60 % 10 | 0);
        return h + ':' + i;
    }


    init();

});
