//Get HTML ELEMENTS

const myTbody = document.getElementById("myTbody");
const theirTbody = document.getElementById("theirTbody");

let attackX = document.getElementById("attackX");
let attackY = document.getElementById("attackY");
let attackBtn = document.getElementById("attackBtn");
let receiveBtn = document.getElementById("receiveBtn");

let xValue= attackX.value
let yValue= attackY.value


// Import functions

const testEmptyArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  

  const testMyGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
    [0, 3, 3, 3, 0, 0, 0, 4, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
    [0, 0, 5, 5, 5, 5, 5, 4, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 3, 3, 3, 0],
  ];
  
const testEnemyGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 5, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
//   const testEnemyGrid = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
//     [0, 0, 4, 4, 4, 4, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
//     [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
//   ];
// const stringGrid = localStorage.getItem("myGrid");
// let realGrid;

// if (stringGrid) {
//     realGrid = JSON.parse(stringGrid)
// } else console.warn("no grid to zork zith ; check your code")

// console.log(realGrid)

// Afficher ma grid

// import{DisplayGrid} from "./config.js" ====> doesn't work
function DisplayGrid(grid, tbody) {
  tbody.innerHTML = "";
  console.log("coucou");
  for (let i = 0; i < grid.length; i++) {
    let raw = document.createElement("tr");
    raw.innerHTML += `<th>y/${i}</th>`;
    for (let j = 0; j < grid[i].length; j++) {
      raw.innerHTML += `<td>${grid[i][j]}</td>`;
    }
    tbody.appendChild(raw);
  }
  console.log(tbody);
}

DisplayGrid(testMyGrid, myTbody);

// Afficher la grid vierge de l'enemy
DisplayGrid(testEmptyArr, theirTbody);

// voir les hits sur la grid de l'enemy

//INFLIGER UNE ATTAQUE

attackBtn.addEventListener("click", HandleAttack);
console.log(attackX.value, attackY.value)

function HandleAttack() {
    console.log(attackX.value, attackY.value)

  if (testEnemyGrid[attackY.value][attackX.value] !== 0) {
    testEmptyArr[attackY.value][attackX.value] = 'X';
    let b=testEnemyGrid[attackY.value][attackX.value]
    testEnemyGrid[attackY.value][attackX.value] = -b;
    window.alert(`You attacked on x=${attackX.value} y=${attackY.value} and you hit them`);
  } else {
    testEmptyArr[attackY.value][attackX.value] = 'M';
    window.alert(`You attacked on x=${attackX.value} y=${attackY.value} and you missed!`);
  }
  DisplayGrid(testEmptyArr, theirTbody);
  isGameFinished(testEnemyGrid);
}

//RECEVOIR UNE ATTAQUE

receiveBtn.addEventListener("click", HandleReceiveAttack);
let randomCoordonates = []

function HandleReceiveAttack() {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);

  if (testMyGrid[y][x] !== 0) {
    let a = testMyGrid[y][x];
    testMyGrid[y][x] = -a;
    console.log(testMyGrid[y][x]);

    window.alert(`They attacked on x=${x} y=${y} and they hit you`);
  } else {
    window.alert(`They attacked on x=${x} y=${y} and they missed`);
  }
  console.log(testMyGrid);
  DisplayGrid(testMyGrid, myTbody);

  isGameFinished(testMyGrid);
}

//Function pour déterminer si le jeu est terminé

function isGameFinished(grid) {
  let sum = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      sum += grid[i][j];
    }
  }
  if ((sum === -63)) {
    window.alert(`End of the game`);
  }
}
