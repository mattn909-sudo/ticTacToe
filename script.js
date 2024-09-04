function Gameboard(){
    const rows = 3;
    const columns = 3;
    let board = [];

    const cellDict = {
        1: [0,0],
        2: [0,1],
        3: [0,2],
        4: [1,0],
        5: [1,1],
        6: [1,2],
        7: [2,0],
        8: [2,1],
        9: [2,2]
    }

    const tokenDict = {
        1: 'X',
        2: 'O'
    }

    const createBoard = () => {
        board = []; 
        for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
            }
        } 
    }
    
    const getBoard = () => board;

    const dropToken = (cell, player) => {
        if(board[cellDict[cell][0]][cellDict[cell][1]].getCellValue() !==0){
            return 0;
        } 
        else{
            board[cellDict[cell][0]][cellDict[cell][1]].addToken(player);
            return 1;
        }
        
    };
    const checkWinner = (player) => {
        if(board[0][0].getCellValue() === player && board[0][1].getCellValue() === player && board[0][2].getCellValue() === player){
            return true;
        }
        else if(board[1][0].getCellValue() === player && board[1][1].getCellValue() === player && board[1][2].getCellValue() === player){
            return true;
        }
        else if(board[2][0].getCellValue() === player && board[2][1].getCellValue() === player && board[2][2].getCellValue() === player){
            return true;
        }
        else if(board[0][1].getCellValue() === player && board[1][1].getCellValue() === player && board[2][1].getCellValue() === player){
            return true;
        }
        else if(board[0][0].getCellValue() === player && board[1][0].getCellValue() === player && board[2][0].getCellValue() === player){
            return true;
        } 
        else if(board[0][2].getCellValue() === player && board[1][2].getCellValue() === player && board[2][2].getCellValue() === player){
            return true;
        }
        else if(board[0][0].getCellValue() === player && board[1][1].getCellValue() === player && board[2][2].getCellValue() === player){
            return true;
        } 
        else if(board[0][2].getCellValue() === player && board[1][1].getCellValue() === player && board[2][0].getCellValue() === player){
            return true;
        }
        else{
            return false;
        }
    }

    const checkTie= ()=> {
        let openCell = false;
        for(let row of board){
            for(let cell of row){
                if(cell.getCellValue() === 0){
                    openCell = true;
                }
            }
        }
        if(!openCell){
            return true;
        }
        else{
            return false;
        }
    }
    const printBoard = ()=> {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getCellValue()));
        for(let i = 1; i< 10; i++){
            const cell = document.getElementById(i);
            if((board[cellDict[i][0]][cellDict[i][1]].getCellValue() !==0)){
                const cell = document.getElementById(i);
                cell.textContent = tokenDict[board[cellDict[i][0]][cellDict[i][1]].getCellValue()];
                cell.style.color = cell.textContent === 'X' ? '#EF476F' : '#118AB2';
            }
            else{
                cell.textContent = '';
            }

        }
    }

    return{
        getBoard,
        dropToken,
        printBoard,
        checkWinner,
        checkTie,
        createBoard
    }

}

function Cell(){
    let cellValue = 0;
    const getCellValue = ()=> cellValue;

    const addToken = (player) => {
        cellValue = player;
    };

    return{
        addToken,
        getCellValue
    };
}

function GameController(playerOneName = 'X', playerTwoName = 'O'){
    const status = document.querySelector('.status');
    const board = Gameboard();

    players = [{
        name: playerOneName,
        token: 1
    },
    {   
        name: playerTwoName,
        token: 2

    }];

    let activePlayer = players[0];

    const setActivePlayer = (player) => activePlayer = player;

    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const printNewRound = () => {
        board.printBoard();
    };

    const playRound = (cell) => {
        const roundPlayer = getActivePlayer();
        if(board.dropToken(cell, roundPlayer.token) === 1){
            switchPlayer();
            status.textContent = roundPlayer.token === 1 ? 'Player O turn' : 'Player X turn';
        }
        if(board.checkWinner(roundPlayer.token)){
            status.textContent = roundPlayer.token === 1 ? 'Player X wins! Press the button to start a New Game': 'Player O wins! Press the button to start a New Game';
            printNewRound();
            winner = true;
        }
        else if(board.checkTie()){
            status.textContent = 'Game ended in a tie! Press the button to start a New Game';
            tie = true;
            printNewRound();
        }
        else{       
            printNewRound();
        }
    }

    const init = () => {
        board.createBoard();
        winner = false;
        tie = false;
        setActivePlayer(players[0]);
        printNewRound();
        status.textContent = 'Player X turn';
    }

    const myDiv = document.querySelector('.gameboard');

    myDiv.addEventListener('click', function(e) {
        if(!winner && !tie){
            playRound(e.target.id);
        }
            
        //board.updateBoard(e.target.id);
    });

    const newGame = document.querySelector('.new');
    newGame.addEventListener('click', function() {
        init();
    });
    
    init();

    return{
        playRound,
        getActivePlayer
    };
}

const game = GameController();
