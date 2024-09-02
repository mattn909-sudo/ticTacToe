function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];
    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }
    const getBoard = () => board;

    const dropToken = (row, column, player) => {
        if(board[row][column].getCellValue() !==0){
            console.log(player + ' played a turn');
            return 0;
        } 
        else{
            board[row][column].addToken(player);
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
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getCellValue()))
        console.log(boardWithCellValues);
    }

    return{
        getBoard,
        dropToken,
        printBoard,
        checkWinner
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

    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const printNewRound = () => {
        board.printBoard();
    };

    const playRound = (row,column) => {
        const roundPlayer = getActivePlayer();
        if(board.dropToken(row, column, roundPlayer.token)){} switchPlayer();
        if(board.checkWinner(roundPlayer.token)){
            console.log('winner' + roundPlayer.token)
        }
        else{
            printNewRound();
        }
    }

    printNewRound();
    return{
        playRound,
        getActivePlayer
    };
}

const game = GameController();