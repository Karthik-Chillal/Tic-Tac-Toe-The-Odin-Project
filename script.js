function Player(name, marker){
  return {name, marker};
}



//-------------------------------------------------
// This stores the status of the board
//-------------------------------------------------
let gameBoard =  (function (){
  let board =['.', '.', '.', '.', '.', '.', '.', '.', '.', ];




  const mark = (marker, index)=>{
    if(board[index]==='.'){
      board[index]= marker;
      return true;
    }
    else{
      return false;
    }
  };




  const getBoard = ()=>{
    return board;
  }



  const reset = ()=>{
    board.fill('.');
  };



  const isFull = ()=>{
    return board.every(cell=>cell!== '.');
  }




  return {
    getBoard,
    reset,
    isFull,
    mark
  };

})();




//----------------------------------------------------------------------------------------------
//This is for the control of the game, and consists of all the required functions.
//----------------------------------------------------------------------------------------------

const gameController = (() =>{



  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let activePlayer = player1;
  let isGameOver = false;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };
  const getActivePlayer = () => activePlayer;



  let gameArr=gameBoard.getBoard();
  let winningC=[-1, -1, -1];

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (gameArr[a]!='.' && gameArr[a] === gameArr[b] && gameArr[a] === gameArr[c]) {
        winningC=winConditions[i];
        return activePlayer.name;
      }
    }
    return null;
  };



  const winCoords = ()=>{
    return winningC;
  }

  const gameDone = ()=>{
    return isGameOver;
  }
  const checkTie = () => {
    return (gameBoard.isFull() && gameController.gameDone());
  };



  const playRound = (index)=>{
    console.log(`current Player: ${activePlayer.name}`);
    if(isGameOver){
      console.log('Game is over, Reset.');
      return false;
    }
    console.log(`Attempting to place ${activePlayer.marker} at index: ${index}`);
    const moveSuccess = gameBoard.mark(activePlayer.marker, index);
    if(moveSuccess){
      console.log(`Move Successful`);
      const winner = checkWinner();
      if(winner != null){
        isGameOver=true;
        console.log(`Winner is : ${winner}`);
        console.log(gameBoard.getBoard());
        return true;
      }
      if(gameBoard.isFull()==true){
        isGameOver=true;
        console.log("It's a tie.");
        console.log(gameBoard.getBoard());
        return true;
      }

      switchPlayerTurn();
      console.log(`Next Player: ${activePlayer.name}`);
      console.log(gameBoard.getBoard());
    }
    else{
      console.log(`Invalid Move!`);

    }
    return moveSuccess;
  }

  const controlReset = ()=>{
    isGameOver=false;
    activePlayer=player1;
  }

  return{
    playRound,
    checkWinner,
    getActivePlayer,
    gameDone,
    controlReset,
    checkTie,
    winCoords
  };






})();

// gameController.playRound(4);
// gameController.playRound(8);
// gameController.playRound(0);
// gameController.playRound(2);
// gameController.playRound(6);
// gameController.playRound(4);
// gameController.playRound(3);
// // gameController.playRound(5);



// -------------------------------------------------
// DISPLAY CONTROLLER MODULE (NEW)
// -------------------------------------------------
const display = (() => {

  const cells = document.querySelectorAll(".cell");

  const changeStatus = (cell, player)=>{
    cell.textContent=player.marker;
    if(p1.dataset.marker == player.marker){
      p1.style.color = "rgb(150,150,150)";
      p2.style.color = "white";
    }
    else{
      p2.style.color = "rgb(150,150,150)";
      p1.style.color = "white";
    }
  }





  //Declaring players for displaying curr Player & winner/Loser
  const p1 = document.querySelector(".p1");
  const p2 = document.querySelector(".p2");
  p1.dataset.marker="X";
  p2.dataset.marker="O";





  const displayReset = ()=>{
    cells.forEach( (cell)=>{
      cell.textContent="";
      cell.style.color="white";
    });
    p1.style.color="white";
    p2.style.color = "rgb(150,150,150)";
  };
  const winDisplay = ()=>{
    cells.forEach((cell)=>{
      cell.style.color='rgb(150,150,150)';
    });
    let i=0;
    let winC=gameController.winCoords();
    cells.forEach((cell)=>{
      let cellid=cell.dataset.no;
      if(Number(cellid) === winC[i] && i<3){
        cell.style.color = "white";
        i++;
      }
    });
    if(gameController.checkTie()){
      p1.style.color="rgb(150,150,150)";
      p2.style.color="rgb(150,150,150)";
    }
    else{
      if(p1.dataset.marker === gameController.getActivePlayer().marker){
        p1.style.color="white";
        p2.style.color="rgb(150,150,150)"
      }
      else{
        p2.style.color="white";
        p1.style.color="rgb(150,150,150)"
      }
    }

  }





  cells.forEach((cell)=>{
    cell.addEventListener("click", (e)=>{
      let index = e.target.dataset.no;
      if(!gameController.gameDone()){
        const currPlayer = gameController.getActivePlayer();
        if(gameController.playRound(index)){
          changeStatus(e.target, currPlayer);
        }



        // To display final win conditions.
        if(gameController.gameDone()){
          winDisplay();
        }
        // gameController.playRound(Number(index));
      }


      else{
        // winDisplay(gameController.getActivePlayer());
        gameBoard.reset();
        gameController.controlReset();
        displayReset();
        console.log(gameBoard.getBoard());
      }
    });
  });





})();

