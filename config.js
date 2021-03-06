// let myFleet = [];
let theEnemyFleet = [];
// const myTbody = document.getElementById("myTbody");

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
    if (
      Math.abs(this.xStartCoordinates - this.xStopCoordinates) > 0 ||
      this.axis === "horizontal"
    ) {
      for (let i = this.xStartCoordinates; i <= this.xStopCoordinates; i++) {
        let ArrPositionOfAnElement = [];
        ArrPositionOfAnElement.push(this.yStartCoordinates, i);
        ArrOfPosition.push(ArrPositionOfAnElement);
      }
    } else if (
      Math.abs(this.xStartCoordinates - this.xStopCoordinates) === 0 ||
      this.axis === "vertical"
    ) {
      for (let i = this.yStartCoordinates; i <= this.yStopCoordinates; i++) {
        ArrPositionOfAnElement.push(i, this.xStartCoordinates);
        ArrOfPosition.push(ArrPositionOfAnElement);
      }
    }
    // console.log(ArrOfPosition);
    return ArrOfPosition;
  }
}

//Creating my fleet

let btnBoatsCharger = document.getElementById("boatsCharger");

let xStartAircraft = document.getElementById("xStartAircraft");
let yStartAircraft = document.getElementById("yStartAircraft");
let xStopAircraft = document.getElementById("xStopAircraft");
let yStopAircraft = document.getElementById("yStopAircraft");

let xStartCruiser = document.getElementById("xStartCruiser");
let yStartCruiser = document.getElementById("yStartCruiser");
let xStopCruiser = document.getElementById("xStopCruiser");
let yStopCruiser = document.getElementById("yStopCruiser");

let xStartSubmarine1 = document.getElementById("xStartSubmarine1");
let yStartSubmarine1 = document.getElementById("yStartSubmarine1");
let xStopSubmarine1 = document.getElementById("xStopSubmarine1");
let yStopSubmarine1 = document.getElementById("yStopSubmarine1");

let xStartSubmarine2 = document.getElementById("xStartSubmarine2");
let yStartSubmarine2 = document.getElementById("yStartSubmarine2");
let xStopSubmarine2 = document.getElementById("xStopSubmarine2");
let yStopSubmarine2 = document.getElementById("yStopSubmarine2");

let xStartDestroyer = document.getElementById("xStartDestroyer");
let yStartDestroyer = document.getElementById("yStartDestroyer");
let xStopDestroyer = document.getElementById("xStopDestroyer");
let yStopDestroyer = document.getElementById("yStopDestroyer");

// let myTempArr = [];

function generateEmptygrid() {
  let myTempArr = [];
  for (let i = 0; i < 10; i++) {
    let innerArray = [];
    for (let j = 0; j < 10; j++) {
      innerArray.push(0);
    }
    myTempArr.push(innerArray);
  }
  return myTempArr
}

if (btnBoatsCharger) {
  btnBoatsCharger.addEventListener("click", () => {
    generateShips();
    generateEmptygrid();
    DisplayGrid(fillMyGrid(generateShips(), generateEmptygrid()), myTbody);
  });
}

function generateShips() {
  let aircraft = new ship(
    5,
    xStartAircraft.value,
    yStartAircraft.value,
    xStopAircraft.value,
    yStopAircraft.value
  );
  let cruiser = new ship(
    4,
    xStartCruiser.value,
    yStartCruiser.value,
    xStopCruiser.value,
    yStopCruiser.value
  );
  let submarine1 = new ship(
    3,
    xStartSubmarine1.value,
    yStartSubmarine1.value,
    xStopSubmarine1.value,
    yStopSubmarine1.value
  );
  let submarine2 = new ship(
    3,
    xStartSubmarine2.value,
    yStartSubmarine2.value,
    xStopSubmarine2.value,
    yStopSubmarine2.value
  );
  let destroyer = new ship(
    2,
    xStartDestroyer.value,
    yStartDestroyer.value,
    xStopDestroyer.value,
    yStopDestroyer.value
  );
  return [aircraft, cruiser, submarine1, submarine2, destroyer];
}

let ships = generateShips();
let emptyGrid = generateEmptygrid();
const myGrid = fillMyGrid(ships, emptyGrid);
// localStorage.setItem('myGrid', JSON.stringify(myGrid));
// console.log(myGrid);

DisplayGrid(myGrid, myTbody);

function fillMyGrid(ships, emptyGrid) {
  const fullGrid = [...emptyGrid];
  ships.map((boat) => {
    if (Math.abs(boat.xStartCoordinates - boat.xStopCoordinates) > 0) {
      for (let i = boat.xStartCoordinates; i <= boat.xStopCoordinates; i++) {
        fullGrid[boat.yStartCoordinates][i] = 1;
      }
    } else {
      for (let i = boat.yStartCoordinates; i <= boat.yStopCoordinates; i++) {
        fullGrid[i][boat.xStartCoordinates] = 1;
      }
    }
  });
  return fullGrid;
}

//Creating my enemy's fleet
let enemyTempArray = generateEmptygrid();
let axis = ["vertical", "horizontal"];
let aircraftEnemySense = axis[Math.floor(Math.random() * axis.length)];
let cruiserEnemySense = axis[Math.floor(Math.random() * axis.length)];
let submarine1EnemySense = axis[Math.floor(Math.random() * axis.length)];
let submarine2EnemySense = axis[Math.floor(Math.random() * axis.length)];
let destroyerEnemySense = axis[Math.floor(Math.random() * axis.length)];
// console.log(aircraftEnemySens, cruiserEnemySens, submarine1EnemySens, submarine2EnemySens, destroyerEnemySens );

//random

let aircraftEnemy = new ship(5, 0, 0, 0, 0, "horizontal");
let cruiserEnemy = new ship(4, 0, 0, 0, 0, "horizontal");
let submarine1Enemy = new ship(3, 0, 0, 0, 0, "horizontal");
let submarine2Enemy = new ship(3, 0, 0, 0, 0, "horizontal");
let destroyerEnemy = new ship(2, 0, 0, 0, 0, "horizontal");
// console.log(aircraftEnemy)

theEnemyFleet = [
  aircraftEnemy,
  cruiserEnemy,
  submarine1Enemy,
  submarine2Enemy,
  destroyerEnemy,
]; //,
// console.log(theEnemyFleet);

let occupiedSpaces = [];

function getTheEnemyGrid() {
  theEnemyFleet.forEach((boat) => {
    if ((boat.axis = "horizontal")) {
      do {
        settingCoordinatesHorizontal(boat);
      } while (areCoordonatesvalid(boat) === false);
      for (let i = boat.xStartCoordinates; i <= boat.xStopCoordinates; i++) {
        [boat.yStartCoordinates][i] = boat.length;
        // console.log(enemyTempArray)
        occupiedSpaces.push([boat.yStartCoordinates, i]);
      }
    }
  });
  // console.log('voici toutes les places occupées', occupiedSpaces)

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

function areCoordonatesvalid(boat) {
  let positions = boat.ArrOfPosition();
  // console.log(positions)
  // console.log(occupiedSpaces)

  for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < occupiedSpaces.length; j++) {
      // console.log(positions[i][0], occupiedSpaces[j][0], positions[i][1], occupiedSpaces[j][1] );
      if (
        positions[i][0] === occupiedSpaces[j][0] &&
        positions[i][0] === occupiedSpaces[j][1]
      ) {
        // console.log('i', i, 'j', j)
        // console.log('déjà présente');
        // console.log('ce sont les positions', positions)

        return false;
      }
    }
    // console.log(positions)

    return true;
  }
}

// Display the grid

// function DisplayGrid(grid, tbody) {
//   tbody.innerHTML = "";
//   for (let i = 0; i < grid.length; i++) {
//     let raw = document.createElement("tr");
//     raw.innerHTML += `<th>y/${i}</th>`;
//     for (let j = 0; j < grid[i].length; j++) {
//       raw.innerHTML += `<td>${grid[i][j]}</td>`;
//     }
//     tbody.appendChild(raw);
//   }
//   console.log(tbody);
// }

//   const testEmptyArr = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

//   const testMyGrid = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
//   [0, 3, 3, 3, 0, 0, 0, 4, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
//   [0, 0, 5, 5, 5, 5, 5, 4, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 2, 2, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 3, 3, 3, 0],
// ];

//   const testEnemyGrid = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
//   [0, 0, 4, 4, 4, 4, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
//   [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
// ];

