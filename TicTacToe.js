let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let winnerMsg = document.querySelector("#msg");
let playerContainer = document.querySelector(".player-container");
let playerMsg = document.querySelector("#player-msg");
let refreshBtn = document.querySelectorAll(".reset-btn");
let turnX = true;
let countOfTurns = 0;
let isWinner = false;

let winCases = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX){
            box.setAttribute("style", "color: #F4B9B2")
            box.innerText = "X";
            turnX = false;
            playerMsg.innerText = "Player O's turn";
        }
        else{
            box.setAttribute("style", "color: #4B3B40")
            box.innerText = "O";
            turnX = true;
            playerMsg.innerText = "Player X's turn";
        };
        box.disabled = true;
        countOfTurns++;
        isWinner = checkWinner();
        if(countOfTurns==9 && !isWinner){
            winnerMsg.innerText = "It's a DRAW!";
            msgContainer.setAttribute("style", "display: block");
        };
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    };
};
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    };
    msgContainer.setAttribute("style", "display: none");
    playerMsg.innerText = "Player X's turn";
    playerContainer.setAttribute("style", "display: block");
    turnX = true;
    countOfTurns = 0;
};

function checkWinner(){
    for(let winCase of winCases){
        let posiOneVal = boxes[winCase[0]].innerText;
        let posiTwoVal = boxes[winCase[1]].innerText;
        let posiThreeVal = boxes[winCase[2]].innerText;
        if(posiOneVal != "" && posiTwoVal != "" && posiThreeVal != ""){
            if(posiOneVal === posiTwoVal && posiTwoVal === posiThreeVal){
                winnerMsg.innerText = `The WINNER is Player ${posiOneVal}`;
                msgContainer.setAttribute("style", "display: block");
                playerContainer.setAttribute("style", "display: none");
                disableBoxes();
                return true;
            };
        };
    };
};

for(let btn of refreshBtn){
    btn.addEventListener("click", enableBoxes);
};
