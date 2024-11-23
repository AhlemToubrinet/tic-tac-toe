const board = document.querySelector('.game-containder');
const boxes = document.querySelectorAll('.box');
const restart = document.getElementById('restart');
const text = document.querySelector('.text-container p');
const restartBtn = document.querySelector('.restart-btn');
const xTurn = 'x';
const oTurn = 'circle';
let currentPlayer ;
const winingCombinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

startGame();

restartBtn.addEventListener('click',()=>{
    startGame();
    restart.style.display= "none";
})
function startGame(){
    currentPlayer = 'x';
    boxes.forEach(box =>{
        box.classList.remove(xTurn);
        box.classList.remove(oTurn);
        box.removeEventListener('click',clicked);
        box.addEventListener('click', clicked);
    });
    setBoard();
}

function clicked(e){
    const box = e.target;
    const currentClass = currentPlayer;
    placeMark(currentClass,box);
    if(checkWin(currentClass)){
        console.log('winner');
        text.textContent = (currentClass==='x')?"X's Win!":"O's Win!";
        restart.style.display = "flex";  
    }else if(isDraw()){
        text.textContent = 'Draw!';
        restart.style.display = "flex";
    }else{
        swapTurn();
        setBoard();
    }
}
function swapTurn(currentClass){
    currentPlayer = (currentPlayer==xTurn)?oTurn:xTurn;
}
function setBoard(){
    board.classList.remove(xTurn);
    board.classList.remove(oTurn);
    board.classList.add(currentPlayer);
}
function placeMark(currentClass,box){
    box.classList.add(currentClass);
}
function checkWin(currentClass){
    return winingCombinations.some(combination =>{
        return combination.every(index => {
            return boxes[index].classList.contains(currentClass);
        });
    });
}
function isDraw(){
    return [...boxes].every(box =>{
        return box.classList.contains(xTurn) || 
        box.classList.contains(oTurn);
    })
}
