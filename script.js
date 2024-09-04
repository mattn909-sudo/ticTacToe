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
            console.log(player + ' played a turn but cell is occupied');
            return 0;
        } 
        else{
            board[cellDict[cell][0]][cellDict[cell][1]].addToken(player);
            console.log(player + ' played a turn');
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
        console.log(boardWithCellValues);
    }

    return{
        getBoard,
        dropToken,
        printBoard,
        checkWinner,
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
    status.textContent = 'Player X turn';
    const board = Gameboard();
    board.createBoard();
    let winner = false;
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
        status.textContent = roundPlayer.token === 1 ? 'Player X turn' : 'Player O turn';
        if(board.dropToken(cell, roundPlayer.token) === 1){} switchPlayer();
        if(board.checkWinner(roundPlayer.token)){
            status.textContent = roundPlayer.token === 1 ? 'Player X wins!' + 'Press the button to start a New Game': 'Player O wins!' + 'Press the button to start a New Game';
            printNewRound();
            winner = true;
        }
        else{       
            printNewRound();
        }
    }

    const myDiv = document.querySelector('.gameboard');

    myDiv.addEventListener('click', function(e) {
        if(!winner){
            playRound(e.target.id);
        }
            
        //board.updateBoard(e.target.id);
    });

    const newGame = document.querySelector('.new');
    newGame.addEventListener('click', function() {
        console.log('test');
        board.createBoard();
        winner = false;
        setActivePlayer(players[0]);
        printNewRound();
        status.textContent = 'Player X turn';
    });
    printNewRound();
    return{
        playRound,
        getActivePlayer
    };
}

const game = GameController();
