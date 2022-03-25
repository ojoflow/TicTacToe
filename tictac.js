const game = document.getElementsByClassName('gameboard')[0];
const play = document.querySelector('.play');
play.addEventListener('click', ()=> {
    const name1 = document.getElementsByClassName('player1-name')[0].value;
    const name2 = document.getElementsByClassName('player2-name')[0].value;
    gameFlow.initialize(name1,name2);
    game.style.display = 'grid';
    play.style.display = 'none';
})
game.addEventListener('click',(e)=>{
        gameFlow.turn(e.target.id);
    })

let gameBoard = (() => {
    const gameArray = [9];
    const updateState = (symbol,index)=> {
        if(!gameArray[index]){
            gameArray.splice(index,0,symbol);
 
        }
    }
 
    return {
        updateState,
        gameArray
        
    };
    
})();
const gameFlow = (() => {

    let player1;
    let player2;
    const initialize = (name1,name2) => {
        player1 = PlayerFactory(name1,'X');
        player2 = PlayerFactory(name2,'O');
    }
  

    let playerturn = true;
    const turn = (index) => {
        
        if(playerturn){
            gameBoard.updateState(player1.symbol(),index);
            displayBoard(player1.symbol(),index);
            checkWinState(player1.symbol());
            playerturn = false;
        }
        else {
            gameBoard.updateState(player2,index)
            displayBoard(player2.symbol(),index);
            checkWinState(player2.symbol());
            playerturn = true;
        }
        
       
    }
    function displayBoard(symbol,index) {
        const cell = document.getElementsByClassName('cell');
        console.log(cell);
        cell[index].innerHTML = symbol;
    
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
    return {
           player1,
           player2,
           turn,
           initialize,
           checkWinState

    };
})();



const PlayerFactory = (playername,playersymbol) => {
    
    const name = () => playername;
    const symbol = () => playersymbol;
    
    return {
        name,
        symbol
    
    };
}
