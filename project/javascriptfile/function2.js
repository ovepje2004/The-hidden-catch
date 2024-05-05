var myCanvas = document.querySelector('#box2');
var numbersToGo = 5;
var numbersToGoInput = document.getElementById('numbersToGo');
numbersToGoInput.innerHTML = numbersToGo;
const GAME_TIME = 30;
let time = GAME_TIME;
let timer = GAME_TIME;
let isPlaying = false;
let timeInterval;
let a = false;
let b = false;
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init() {
    for (var i = 0; i < 5; i++) {
        window['isDone' + i] = false;
    }
    start();
    run();
    countDown();
    myCanvas.addEventListener('click', function (event) {

        var rect = myCanvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        var positionArray = [
            "11,462",
            "204,422",
            "205,73",
            "275,253",
            "264,103",
            ",",
        ]

        console.log(positionArray);


        for (var i = 0; i < 6; i++) {
            if (
                window['isDone' + i] == false
                &&
                x > positionArray[i].split(',')[0] * 0.80
                &&
                x < positionArray[i].split(',')[0] * 1.20
                &&
                y > positionArray[i].split(',')[1] * 0.80
                &&
                y < positionArray[i].split(',')[1] * 1.20) {

                console.log(positionArray[i].split(',')[0]);
                console.log(positionArray[i].split(',')[1]);

                var c = document.getElementById("box2");
                var ctx = c.getContext("2d");
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.arc(positionArray[i].split(',')[0], positionArray[i].split(',')[1], 20, 0, 2 * Math.PI);
                ctx.strokeStyle = 'red';
                ctx.stroke();

                window['isDone' + i] = true;

                numbersToGo = numbersToGo - 1;
                numbersToGoInput.innerHTML = numbersToGo;

                showFinished(numbersToGo);
            }
        }

        console.log("x: " + x + " y: " + y);

    }, false);

    function run() {
        isPlaying = true;
        time = GAME_TIME;
        timeInterval = setInterval(countDown, 1000);
    }


    function countDown() {
        time > 0 ? time-- : isPlaying = false;
        if (!isPlaying) {
            clearInterval(timeInterval)
        }
        timeDisplay.innerText = time;
        no(time);
    }

    function showFinished($num) {
        if ($num == 0) {
            var finishMessage = document.getElementById('finishMessage');
            finishMessage.innerHTML = "2단계성공"
            add();
            //alert("성공했습니다");
            time = "0"
        }
    }

    function no(a) {
        if (a === 0) {
            var NofinishMessage = document.getElementById('NofinishMessage');
            NofinishMessage.innerHTML = "2단계실패"
            location.href = "../htmlfile/gameover_02.html"
        }
    }

    function add() {
        location.href = "../htmlfile/stageclear_02.html"
    }


    function start() {
        if( timer == 30){
            timer = timer-1;
            var digit = document.getElementById("digit");

            var elem = document.getElementById("myBar");
            var width = 300;
            var id = setInterval(frame,1000);
            function frame() {
                if (width <= 0){
                    clearInterval(id);
                    timer = 30;
                    digit.innerHTML = width + "초";

                    no(time);
                }else{
                    //digit.innerHTML = width + "초";

                    width = width -10;
                    elem.style.width = width + "px";
                }
            }
        }
    }
}