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
        
        if(board.dropToken(row, column, getActivePlayer().token)) switchPlayer();
        console.log(board.checkWinner(getActivePlayer().token));
        printNewRound();
    }

    printNewRound();
    return{
        playRound,
        getActivePlayer
    };
}

const game = GameController();