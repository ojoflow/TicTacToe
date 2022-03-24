const cell = document.getElementsByClassName('cell');
const confirm1 = document.querySelector('.confirm1');
const confirm2 = document.querySelector('.confirm2');
let click1, click2 = false;
confirm1.addEventListener('click', function handleClick(){
    click1 = true;
    
});
confirm2.addEventListener('click', function handleClick(){
    click2 = true;
   
})
cell.addEventListener('click',()=>{
        gameFlow.turn(cell.id);
    })
let gameBoard = (() => {
    const gameArray = [9];
    const updateState = (player,index)=> {
        if(!gameArray[index]){
            gameArray.splice(index,0,player.symbol);
 
        }
    }
 
    return {
        updateState,
        gameArray
        
    };
    
})();
let gameFlow = (() => {
 
    let player1;
    let player2;
    if(click1 & click2){
        const name1 = document.getElementsByClassName('player1-name')[0].value;
        const name2 = document.getElementsByClassName('player2-name')[0].value;
        player1 = PlayerFactory(name1,'X');
        player2 = PlayerFactory(name2,'O');
    }
  

    let playerturn = true;
    const turn = (index) => {
        
        if(playerturn){
            gameBoard.updateState(player1,index);
            displayBoard(player1.symbol,index);
            checkWinState(player1.symbol);
            playerturn = false;
        }
        else {
            gameBoard.updateState(player2,index)
            displayBoard(player2.symbol,index);
            checkWinState(player2.symbol);
            playerturn = true;
        }
        
       
    }
    function displayBoard(symbol,index) {
        cell[index].innerText = symbol;
    
    };
    const checkWinState = (gameArray) => {
               
    // const checkWinState = (player.symbol) => {
    //    //if three of the player symbols are in the conditions described in the array above, the player wins
    //    //if there are no more empty spots on the array then the game ends in a tie
    //     if(player.symbol)
    // }
    }
    winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    return player1,
           player2,
           turn,
           checkWinState
})();



const PlayerFactory = (name,symbol) => {
    
    let player = {
        name,
        symbol
        
    }
    return {
        player
    
    };
}
