function getPossibleMoves(position) {
  const possibleMoves = [];

  possibleMoves.push([position[0] - 2, position[1] - 1]);
  possibleMoves.push([position[0] - 2, position[1] + 1]);
  possibleMoves.push([position[0] - 1, position[1] - 2]);
  possibleMoves.push([position[0] - 1, position[1] + 2]);
  possibleMoves.push([position[0] + 1, position[1] - 2]);
  possibleMoves.push([position[0] + 1, position[1] + 2]);
  possibleMoves.push([position[0] + 2, position[1] - 1]);
  possibleMoves.push([position[0] + 2, position[1] + 1]);

  for (let i = 7; i >= 0; i -= 1) {
    if (
      possibleMoves[i][0] < 0 ||
      possibleMoves[i][0] > 7 ||
      possibleMoves[i][1] < 0 ||
      possibleMoves[i][1] > 7
    ) {
      possibleMoves.splice(i, 1);
    }
  }

  return possibleMoves;
}

const positionList = [];

for (let i = 0; i < 8; i += 1) {
  positionList[i] = [];

  for (let j = 0; j < 8; j += 1) {
    positionList[i].push([]);
    const possibleMoves = getPossibleMoves([i, j]);

    possibleMoves.forEach((move) => {
      positionList[i][j].push(move);
    });
  }
}

function knightMoves(start, end) {
  let path;
  const q = [];
  q.push([start]);

  while (!path) {
    const currentArray = q.shift();
    const current = currentArray[currentArray.length - 1];
    const currentPositionList = positionList[current[0]][current[1]];

    for (let i = 0; i < currentPositionList.length; i += 1) {
      if (
        currentPositionList[i][0] === end[0] &&
        currentPositionList[i][1] === end[1]
      ) {
        currentArray.push(end);
        path = currentArray;
        break;
      } else {
        q.push([...currentArray, currentPositionList[i]]);
      }
    }
  }

  let returnString = `You made it in ${path.length - 1} `;
  const moveOrMoves = path.length - 1 === 1 ? 'move' : 'moves';
  returnString = `${returnString}${moveOrMoves}!  Here's your path:`;

  path.forEach((move) => {
    returnString = `${returnString}\n[${move}]`;
  });

  return returnString;
}

console.log(knightMoves([0, 0], [4, 4]));
