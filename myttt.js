// My implementation of tictactoe

//****************************************************************
// First the variables and functions needed to implement the logic
//****************************************************************


var board = ['-','-','-','-','-','-','-','-','-']; // '-' is for blank
var turn = 'x';   // start with x's turn
var victory = [false,''];
var xwins = 0;
var owins = 0;
var draws = 0;

var clearBoard = function(){
    board = ['-','-','-','-','-','-','-','-','-'];
    console.log("board = " + board);
    victory = [false,''];
    for (var i = 0; i <= 8; i++){
        squares[i].setAttribute("class","blank");
        squares[i].innerHTML = "-";
    }
    endPara = document.getElementById("endPara");
    if (endPara) {
        endPara.parentNode.removeChild(endPara);
        reset.style.fontSize = "1em";
        reset.style.backgroundColor = "white"; 
    }
    for (var i = 0; i <=8; i++){
        squares[i].style.color = "";
    }
    var turnMarker = document.getElementById("turnMarker");
    turnMarker.style.color = "black";
}

var changeTurn = function(){
    var turnMarker = document.getElementById("turnMarker");
    if (turn === 'x'){
        turn = 'o';
        turnMarker.innerHTML = "o's turn";
    }
    else{
        turn = 'x';
        turnMarker.innerHTML = "x's turn";
    }
    console.log("turn = " + turn);
}

var move = function(spot){
    //make sure move is valid
    var possibleMoves = ['0','1','2','3','4','5','6','7','8'];
    if (possibleMoves.indexOf(spot) === -1){
        console.log("not a valid move");
        return;
    }
    //check if spot is already played
    if (board[spot] != '-'){
        console.log("spot already taken");
        return;
    }
    if (turn === 'x'){
        board[spot] = 'x';
    }
    else{
        board[spot] = 'o';
    }
}

var victoryReset = function(){
    var endPara = document.createElement("p");
    endPara.setAttribute("id","endPara");
    reset.appendChild(endPara);
    console.log("game over");
    if (victory[1] === 'x'){
        console.log("x wins");
        var endText = document.createTextNode("click to restart");
        endPara.style.fontSize = "1.3em";
        reset.style.backgroundColor = "green";
        var turnMarker = document.getElementById("turnMarker");
        turnMarker.innerHTML = "x wins";
        turnMarker.style.color = "orange";
        xwins++;
        var xwinNumber = document.getElementById("xwins").innerHTML = xwins;
    }
    if (victory[1] === 'o'){
        console.log("o wins");
        var endText = document.createTextNode("click to restart");
        endPara.style.fontSize = "1.3em";
        reset.style.backgroundColor = "green";
        var turnMarker = document.getElementById("turnMarker");
        turnMarker.innerHTML = "o wins";
        turnMarker.style.color = "orange";
        owins++;
        var owinNumber = document.getElementById("owins").innerHTML = owins;   
    }
    if (victory[1] === 'draw'){
        console.log("draw");
        var endText = document.createTextNode("click to restart");
        endPara.style.fontSize = "1.3em";
        reset.style.backgroundColor = "red";
        var turnMarker = document.getElementById("turnMarker");
        turnMarker.innerHTML = "draw";
        turnMarker.style.color = "red";
        draws++;
        var drawNumber = document.getElementById("draws").innerHTML = draws;
    }
    endPara.appendChild(endText);
}

var checkVictory = function(){
    var vicSpots = [0,1,2];
    //all victory conditions in form [place1, place2, place3, winner]
    var vicConds = {1:[0,1,2,'x'],2:[3,4,5,'x'],3:[6,7,8,'x'],4:[0,3,6,'x'],5:[1,4,7,'x'],6:[2,5,8,'x'],7:[0,4,8,'x'],8:[2,4,6,'x'],9:[0,1,2,'o'],10:[3,4,5,'o'],11:[6,7,8,'o'],12:[0,3,6,'o'],13:[1,4,7,'o'],14:[2,5,8,'o'],15:[0,4,8,'o'],16:[2,4,6,'o']}
    var specVic;
    //checking current board for all victory conditions
    for (var i = 1; i <= 16; i++){
        specVic = vicConds[i];
        if (board[specVic[0]] === specVic[3] && board[specVic[1]] === specVic[3] && board[specVic[2]] === specVic[3]){
            victory = [true, specVic[3]];
            squares[specVic[0]].style.color = "orange";
            squares[specVic[1]].style.color = "orange";
            squares[specVic[2]].style.color = "orange";
            victoryReset();
            return true;
        }
    }
    //checking for a draw game (where no spaces are still blank)
    var draw = true;
    for (var i = 0; i <=8; i++){
        if (board[i] === '-'){
            draw = false;
        }
    }
    if (draw === true){
        victory = [true,'draw'];
        victoryReset();
        return true;
    }
    return false;
}

//****************************************************************
// Second the event listners to manipulate the HTML and CSS
//****************************************************************

//get event listeners for each square and reset
var squares = [];
for (var i = 0; i <=8; i++){
    squares[i] = document.getElementById(i);
}
var reset = document.getElementById("reset");

for (var i = 0; i <=8; i++){
    squares[i].onclick = function(evt){
        var box = evt.target.id;
        //if square not already clicked, and game not finished, change it
        if (squares[box].getAttribute("class") === "blank" && victory[0] === false){
            squares[box].setAttribute("class",turn);
            squares[box].innerHTML = "  " + turn + "  ";
            console.log("box = " + box);
            move(box);
            var victoryBool = checkVictory();
            if (victoryBool != true){
                console.log("board = " + board);
                changeTurn();
            }
        }
    }
}

reset.onclick = function(){
    clearBoard();
    changeTurn();
}
