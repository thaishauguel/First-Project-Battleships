class ship {
  constructor(nb, x, y, xf, yf, axis) {
    this.length = nb;
    this.xStartCoordinates = x;
    this.xStopCoordinates = xf;
    this.yStartCoordinates = y;
    this.yStopCoordinates = yf;
    this.axis = axis;
  }
  ArrOfPosition() {
    let ArrOfPosition = [];
    let ArrPositionOfAnElement = [];
    if (
      Math.abs(this.xStartCoordinates - this.xStopCoordinates) > 0 ||
      this.axis === "horizontal"
    ) {
      for (let i = this.xStartCoordinates; i <= this.xStopCoordinates; i++) {
        ArrPositionOfAnElement.push(this.yStartCoordinates, i);
        ArrOfPosition.push(ArrPositionOfAnElement);
      }
    } else if (
      Math.abs(this.xStartCoordinates - this.xStopCoordinates) === 0 ||
      this.axis === "vertical"
    ) {
        console.log('bonjour')
      for (let i = this.yStartCoordinates; i <= this.yStopCoordinates; i++) {
        ArrPositionOfAnElement.push(i, this.xStartCoordinates);
        ArrOfPosition.push(ArrPositionOfAnElement);
      }
    }
    // console.log(ArrOfPosition);
    return ArrOfPosition;
  }
}

function generateEmptygrid() {
  let myTempArr = [];
  for (let i = 0; i < 10; i++) {
    let innerArray = [];
    for (let j = 0; j < 10; j++) {
      innerArray.push(0);
    }
    myTempArr.push(innerArray);
  }
  return myTempArr;
}

let enemyTempArray = generateEmptygrid();

// let axis = ["vertical", "horizontal"];
// let aircraftEnemySense = axis[Math.floor(Math.random() * axis.length)];
// let cruiserEnemySense = axis[Math.floor(Math.random() * axis.length)];
// let submarine1EnemySense = axis[Math.floor(Math.random() * axis.length)];
// let submarine2EnemySense = axis[Math.floor(Math.random() * axis.length)];
// let destroyerEnemySense = axis[Math.floor(Math.random() * axis.length)];
// console.log(aircraftEnemySens, cruiserEnemySens, submarine1EnemySens, submarine2EnemySens, destroyerEnemySens );

//random

let aircraftEnemy = new ship(5, 0, 0, 0, 0, "vertical");
let cruiserEnemy = new ship(4, 0, 0, 0, 0, "horizontal");
let submarine1Enemy = new ship(3, 0, 0, 0, 0, "vertical");
let submarine2Enemy = new ship(3, 0, 0, 0, 0, "horizontal");
let destroyerEnemy = new ship(2, 0, 0, 0, 0, "horizontal");

let theEnemyFleet = [aircraftEnemy,     cruiserEnemy,
    submarine1Enemy,
    submarine2Enemy,
    destroyerEnemy];  
 

let occupiedSpaces = [];

function getTheEnemyGrid() {
  theEnemyFleet.forEach((boat) => {

    console.log(boat.axis);
    if (boat.axis === "horizontal") {
      console.log("coucou2");

      do {
        settingCoordinatesHorizontal(boat);
      } while (areCoordonatesvalid(boat) === false);
      for (let i = boat.xStartCoordinates; i <= boat.xStopCoordinates; i++) {
        enemyTempArray[boat.yStartCoordinates][i] = boat.length;
        occupiedSpaces.push([boat.yStartCoordinates, i]);
        console.log('horizontal', occupiedSpaces);
      }
    } else {
    //   console.log("coucou");
      do {
        settingCoordinatesVertical(boat);
      } while (areCoordonatesvalid(boat) === false);
      console.log(boat.xStartCoordinates, boat.yStartCoordinates, boat.yStopCoordinates);
      for (let i = boat.yStartCoordinates; i <= boat.yStopCoordinates; i++) {
        // console.log(enemyTempArray);
        console.log(i);
        enemyTempArray[i][boat.xStartCoordinates] = boat.length;
        occupiedSpaces.push([i, boat.xStartCoordinates]);
        console.log('vertical', occupiedSpaces);

      }
    }
  });

  console.log(enemyTempArray);
  return enemyTempArray;
}

let enemyGrid = getTheEnemyGrid();
// console.log(enemyGrid);

function settingCoordinatesHorizontal(boat) {
  // console.log(boat)
  boat.xStartCoordinates = Math.floor(Math.random() * (10 - boat.length));
  boat.xStopCoordinates = boat.xStartCoordinates + boat.length - 1;
  boat.yStartCoordinates = Math.floor(Math.random() * 10);
  boat.yStopCoordinates = boat.yStartCoordinates;
}

function settingCoordinatesVertical(boat) {
  boat.xStartCoordinates = Math.floor(Math.random() * 10);
  boat.xStopCoordinates = boat.xStartCoordinates;
  boat.yStartCoordinates = Math.floor(Math.random() * (10 - boat.length));
  boat.yStopCoordinates = boat.yStartCoordinates + boat.length - 1;
}

function areCoordonatesvalid(boat) {
  let positions = boat.ArrOfPosition();

  for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < occupiedSpaces.length; j++) {
      if (
        positions[i][0] === occupiedSpaces[j][0] &&
        positions[i][1] === occupiedSpaces[j][1]
      ) {
        return false;
      }
    }

    return true;
  }
}
