async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

var game = false;
var played = false;
var sequence = [];
var user_sequence = [];
$("#botao-verde").on("click", function () {
    playButton("verde");
    if (game){
        user_sequence.push("verde");
    }
});

$("#botao-vermelho").on("click", function () {
    playButton("vermelho");
    if (game){
    user_sequence.push("vermelho");
    }
});

$("#botao-amarelo").on("click", function () {
    playButton("amarelo");
    if (game){
    user_sequence.push("amarelo");
    }
});

$("#botao-azul").on("click", function () {
    playButton("azul");
    if (game){
    user_sequence.push("azul");
    }
})

$(".can-click").on("click", startGame);



function playButton(color) {
    $("#botao-" + color).animate({opacity: 0.2}, 100).animate({opacity: 1}, 100);
    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
}

var colors = ["verde", "vermelho", "amarelo", "azul"];



function startGame() {
    game = true;
    $("h1").removeClass("can-click");
    $("h1").off("click");
    nextLevel();
    
}

var score = 0
async function nextLevel() {
    await sleep(1);
    if (game){
        score++;
        $("h1").text("score: " + score);
        var random_number = Math.floor(Math.random() * 4);
        var random_color = colors[random_number];
        sequence.push(random_color);
        
        for (var i = 0; i < sequence.length; i++) {
            await sleep(1);
            playButton(sequence[i]);
            
        }
        checkInput();
}
}

async function checkInput() {
    user_sequence = [];
    while (user_sequence.length != sequence.length){
        await sleep(0.01);
    };
    for (var i = 0; i < user_sequence.length; i++){
        if (user_sequence[i] != sequence[i]){
            await sleep(1);
            gameOver();
            break
        }
        
    }
    nextLevel(); 
}



async function gameOver() {
    game = false;
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("h1").text("You Lost!, Final score: "+ score);
    $("<h2>Click here to try again!<h2/>").insertAfter("h1");
    $("h2").on("click", function(){
        location.reload();
    });
    $("h1").removeClass("can-click");
    $("body").css("background-color", "red");
    await sleep(0.3);
    $("body").css("background-color", "#2A2F4F");

    
}