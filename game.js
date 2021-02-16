// import{testEnemyGrid} from "./config.js"
// console.log(testEnemyGrid);

// console.log(message)
//Get HTML ELEMENTS

const myTbody = document.getElementById("myTbody");
const theirTbody = document.getElementById("theirTbody");

// let attackX = document.getElementById("attackX");
// let attackY = document.getElementById("attackY");
let attackBtn = document.getElementById("attackBtn");
let receiveBtn = document.getElementById("receiveBtn");

// let xValue = attackX.value;
// let yValue = attackY.value;

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
  [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
  [0, 0, 4, 4, 4, 4, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
];

// const stringGrid = localStorage.getItem("myGrid");
// let realGrid;

// if (stringGrid) {
//     realGrid = JSON.parse(stringGrid)
// } else console.warn("no grid to zork zith ; check your code")

// console.log(realGrid)

// Afficher ma grid
let cells
function DisplayGrid(grid, tbody) {
  tbody.innerHTML = "";
  console.log("coucou");

  for (let i = 0; i < grid.length; i++) {
    let raw = document.createElement("tr");

    raw.innerHTML += `<th >${i}</th>`;
    for (let j = 0; j < grid[i].length; j++) {
      raw.innerHTML += `<td class="cell class-${grid[i][j]}" data-coordinates=${[i,j]}>${grid[i][j]}</td>`;
    }
    tbody.appendChild(raw);
  }
  console.log(tbody);
  cells = document.querySelectorAll(".cell")
  console.log(cells);
  cells.forEach(cell=> cell.onclick = (e) =>{
      const coords = e.target.dataset.coordinates.split(",");
      HandleAttack(coords[0],coords[1])})// add eventlistener on every cell
}



DisplayGrid(testMyGrid, myTbody);

// Afficher la grid vierge de l'enemy
DisplayGrid(testEmptyArr, theirTbody);

// voir les hits sur la grid de l'enemy

//INFLIGER UNE ATTAQUE

// attackBtn.addEventListener("click", HandleAttack);
// console.log(x, y);

function HandleAttack(y, x) {
    

  console.log(x, y);

  if (testEnemyGrid[y][x] !== 0) {
    testEmptyArr[y][x] = "X";
    let b = testEnemyGrid[y][x];
    testEnemyGrid[y][x] = -b;
    console.log(b);
    window.alert(
      `YOU attacked on x=${x} y=${y} and you hit them`
    );
    console.log(testEnemyGrid);
    if (lookingForANumber(testEnemyGrid, b) === false) {
      window.alert(`You just sunk a ship`);
    }
  } else {
    testEmptyArr[y][x] = "M";
    window.alert(
      `YOU attacked on x=${x} y=${y} and you missed!`
    );
  }
  DisplayGrid(testEmptyArr, theirTbody);
  isGameFinished(testEnemyGrid);
  document.querySelectorAll('.top-instructions').forEach(div => div.classList.toggle('hidden'))
  setTimeout(() => {
    HandleReceiveAttack()
  }, 1500);
}

function lookingForANumber(matrix, n) {
// console.log(n);
//     const res = matrix.reduce((acc,array) => array.some((element)=> element==n) || acc,false);
// console.log("RES ",res);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] ==  n) {
          console.log(true)
        return true;
      }
    }
  }
  return false;
}

//RECEVOIR UNE ATTAQUE

receiveBtn.addEventListener("click", HandleReceiveAttack);
let randomCoordonates = [];

function HandleReceiveAttack() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

  if (testMyGrid[y][x] !== 0) {
    let a = testMyGrid[y][x];
    testMyGrid[y][x] = -a;
    console.log(testMyGrid[y][x]);

    window.alert(`THEY attacked YOU on x=${x} y=${y} and they hit you`);
  } else {
    window.alert(`THEY attacked YOU on x=${x} y=${y} and they missed`);
  }
  document.querySelectorAll('.top-instructions').forEach(div => div.classList.toggle('hidden'))
  DisplayGrid(testMyGrid, myTbody);

  isGameFinished(testMyGrid);
  // handleattack()
}

//Function pour déterminer si le jeu est terminé

function isGameFinished(grid) {
  let sum = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      sum += grid[i][j];
    }
  }
  if (sum === -63) {
    window.alert(`End of the game`);
  }
}
