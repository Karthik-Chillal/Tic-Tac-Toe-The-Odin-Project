function Player(name, symbol){
  return {name, symbol};
}
const gameArr=[
  ['O', '.', '.'],
  ['.', 'X', '.'],
  ['.', '.', 'O']
];
function check(gameArr, turn){
  for(let i=0; i<3; i++){
    let ocnt=0;
    let xcnt=0;
    for(let j=0; j<3; j++){
      if(gameArr[i][j]=='O'){
        ocnt++;
      }
      if(gameArr[i][j]=='X'){
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
      if(gameArr[j][i]=='O'){
        ocnt++;
      }
      if(gameArr[j][i]=='X'){
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
  if(gameArr[0][0] == gameArr[1][1] && gameArr[1][1] == gameArr[2][2]){
    if(gameArr[0][0] == 'O'){
      return 'O';
    }
    else if(gameArr[0][0] == 'X'){
      return 'X';
    }
  }
  if(gameArr[0][2] == gameArr[1][1] && gameArr[1][1] == gameArr[2][0]){
    if(gameArr[0][2] == 'O'){
      return 'O';
    }
    else if(gameArr[0][2] == 'X'){
      return 'X';
    }
  }
  if(turn == 9){
    return '-';

  }
  return null;
}


console.log(check(gameArr, 5));