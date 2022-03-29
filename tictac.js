const play = document.querySelector('.play');
const restart = document.querySelector('.restart');
const game = document.querySelector('.gameboard');
const endGameScreen = document.querySelector('.endgamescreen');
play.addEventListener('click', ()=> {
    let name1 = document.querySelector('.player1-name').value;
    let name2 = document.querySelector('.player2-name').value;

    gameFlow.initialize(name1,name2);
    game.style.display = 'grid';
    play.style.display = 'none';
})
restart.addEventListener('click', ()=> {
  
    endGameScreen.style.display = 'none';
   
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.style['pointer-events'] = 'auto');
    cells.forEach(cell => cell.innerHTML ='');

    game.style.display = 'none';
    play.style.display = 'block';
    document.getElementsByClassName('player1-name')[0].value = '';
    document.getElementsByClassName('player2-name')[0].value = '';
    gameBoard.resetState();
   
})
game.addEventListener('click',(e)=>{

        if(!e.target.innerHTML){
            gameFlow.turn(e.target.id);
        }
    })
   
const gameBoard = (() => {
    let gameArray = ['','','','','','','','',''];
    const getGameArray = () => gameArray;
    const updateState = (symbol,index)=> {
        if(!gameArray[index]){
           
            gameArray[index] = symbol;
        
        }
    }
    const resetState = () => {
        gameArray = ['','','','','','','','',''];
    }
 
    return {
        updateState,
        resetState,
        getGameArray
        
    };
    
})();
const gameFlow = (() => {

    let player1;
    let player2;
    let playerturn = true;
    const initialize = (name1,name2) => {
        player1 = PlayerFactory(name1,'X');
        player2 = PlayerFactory(name2,'O');
        
       
    }
  

    const turn = (index) => {
        
            if(playerturn){
                
                gameBoard.updateState(player1.symbol(),index);
                displayBoard(player1.symbol(),index);
                playerturn = false;
                checkWinState(gameBoard.getGameArray(),player1.symbol());
            
        }
            else {
                gameBoard.updateState(player2.symbol(),index)
                displayBoard(player2.symbol(),index);
                playerturn = true;
                checkWinState(gameBoard.getGameArray(),player2.symbol());
        }
    
        // console.log(playerturn)
       
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
        let condition;
        let player;
        if(symbol === 'X') {
            player = player1;
        }
        else {
            player = player2;
        }
        
        winConditions.find( (combination) => { //find a winning combination
            
        /*use the indices in a combination to check if the gameArray has three symbol winning condition*/ 
                        condition = combination.every(index => gameArray[index] === symbol) || false;
                        return condition                                       
                                     })
                                     
                                    
        if(condition === true){
            
            endGame(symbol)
            return playerturn = true
          
        }else if(draw()){
            endGame(symbol)
            return playerturn = true
        }else{
            return
        }
   
    }
    
    function draw(){
        return gameBoard.getGameArray().every(index => index === 'X' || index === 'O') 
    }
    function endGame(symbol) {
        const endGameScreen = document.querySelector('.endgamescreen');
       
        console.log(playerturn)
        const endGameScreenText = document.querySelector('.endgamescreen h2')
        const cells = document.querySelectorAll('.cell');
        if(!draw() && symbol === 'X'){
            
            endGameScreenText.innerText = `${player1.name()} wins!`
            endGameScreen.style.display = 'block';
            cells.forEach(cell => cell.style['pointer-events'] ='none');
        }
        else if(!draw() && symbol === 'O'){

            endGameScreenText.innerText = `${player2.name()} wins!`
            endGameScreen.style.display = 'block';
            cells.forEach(cell => cell.style['pointer-events'] ='none');
            
        }
        else {
            endGameScreenText.innerText = `Tie!`
            endGameScreen.style.display = 'block';
            cells.forEach(cell => cell.style['pointer-events'] ='none');
        }
    }
    
    return {
           player1,
           player2,
           turn,
           initialize,
           endGame

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
