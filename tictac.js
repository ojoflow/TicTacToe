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
        if(!e.target.innerHTML){
            gameFlow.turn(e.target.id);
        }
    })

const gameBoard = (() => {
    const gameArray = [9];
    const getGameArray = () => gameArray;
    const updateState = (symbol,index)=> {
        if(!gameArray[index]){
            gameArray.splice(index,0,symbol);
 
        }
    }
 
    return {
        updateState,
        getGameArray
        
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
            checkWinState(gameBoard.getGameArray(),player1.symbol());
            playerturn = false;
        }
        else {
            gameBoard.updateState(player2,index)
            displayBoard(player2.symbol(),index);
            checkWinState(gameBoard.getGameArray(),player2.symbol());
            playerturn = true;
        }
        
       
    }
    function displayBoard(symbol,index) {
        const cell = document.getElementsByClassName('cell');
        cell[index].innerHTML = symbol;
       
    
    };
    winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    function checkWinState(gameArray,symbol) {

        let condition = '';
        let player;
        if(symbol === 'X') {
            player = player1;
        }
        else {
            player = player2;
        }
        winConditions.find( (combination) => { //find the first combination
        /*use the indices in a combination to check if the gameArray has three symbol winning condition*/ 
                        condition = combination.every(index => gameArray[index] === symbol) || false;
                                        // return condition
                                     })
                                    
        if(condition === true){
           endGame(player)
        }else if(draw()){
            endGame()
        }else{
            return
        }
   
    }
    function draw(){
        return gameBoard.getGameArray().every(index => index === 'X' || index === 'O') 
    }
    function endGame() {
        
    }
    
    return {
           player1,
           player2,
           turn,
           initialize

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
