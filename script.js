function Player(name, marker){
  return {name, marker};
}





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
    board =['.', '.', '.', '.', '.', '.', '.', '.', '.', ];
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





function check(){
  let arr=gameBoard.getBoard();









  for(let i=0; i<3; i++){
    let ocnt=0;
    let xcnt=0;
    for(let j=0; j<3; j++){
      if(gameArr[i*3 + j]=='O'){
        ocnt++;
      }
      if(gameArr[i*3+j]=='X'){
        xcnt++;
      }
      if(xcnt==3){
        return 'X';
      }
      else if(ocnt==3){
        return 'O';
      }
    }
  }
  for(let i=0; i<3; i++){
    let ocnt=0;
    let xcnt=0;
    for(let j=0; j<3; j++){
      if(gameArr[j*3+i]=='O'){
        ocnt++;
      }
      if(gameArr[j*3+i]=='X'){
        xcnt++;
      }
      if(xcnt==3){
        return 'X';
      }
      else if(ocnt==3){
        return 'O';
      }
    }
  }
  if(gameArr[0] == gameArr[4] && gameArr[4] == gameArr[8]){
    if(gameArr[0] == 'O'){
      return 'O';
    }
    else if(gameArr[0] == 'X'){
      return 'X';
    }
  }
  if(gameArr[2] == gameArr[4] && gameArr[4] == gameArr[6]){
    if(gameArr[2] == 'O'){
      return 'O';
    }
    else if(gameArr[2] == 'X'){
      return 'X';
    }
  }
  if(gameBoard.isFull() == true){
    return '-';

  }
  return null;
}


// console.log(check(gameArr, 5));