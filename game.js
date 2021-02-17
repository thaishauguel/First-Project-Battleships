// import{testEnemyGrid} from "./config.js"
// console.log(testEnemyGrid);

// console.log(message)
//Get HTML ELEMENTS

const myTbody = document.getElementById("myTbody");
const theirTbody = document.getElementById("theirTbody");
const popup = document.getElementById("popup");
console.log(popup);

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


//toutes les coordonnées sur lesquelles il peut me toucher
const remainingCoordonates= []
function generateEveryCoordonatesOfAGrid(arr){
    for (let i=0; i< 10; i++){
        for (let j=0; j<10; j++){
            arr.push([i,j])
        }
    }
    return arr
}
generateEveryCoordonatesOfAGrid(remainingCoordonates)

// const stringGrid = localStorage.getItem("myGrid");
// let realGrid;

// if (stringGrid) {
//     realGrid = JSON.parse(stringGrid)
// } else console.warn("no grid to zork zith ; check your code")

// console.log(realGrid)

// Afficher les grids

let cells

function DisplayGrid(grid, tbody, mine) {
  tbody.innerHTML = "";

  for (let i = 0; i < grid.length; i++) {
    let raw = document.createElement("tr");
    raw.innerHTML += `<th >${i}</th>`;

    for (let j = 0; j < grid[i].length; j++) {
      raw.innerHTML += `<td class="cell class-${grid[i][j]} ${mine}" data-coordinates=${[i, j]}>${grid[i][j]}</td>`;
    }

    tbody.appendChild(raw);
  }

  cells = document.querySelectorAll(".cell");

  cells.forEach(
    (cell) =>
      (cell.onclick = (e) => {
        const coords = e.target.dataset.coordinates.split(",");
        HandleAttack(coords[0], coords[1]);
      })
  ); // add eventlistener on every cell
}

DisplayGrid(testMyGrid, myTbody, 'mine');

DisplayGrid(testEmptyArr, theirTbody, 'their');


//Fonctions d'attaque

function HandleAttack(y, x) {
  console.log(x, y);

  if (testEnemyGrid[y][x] !== 0) {
    testEmptyArr[y][x] = "X";
    let b = testEnemyGrid[y][x];
    testEnemyGrid[y][x] = -b;

    popup.textContent = `YOU attacked on x=${x} y=${y} and you hit them`;
    popup.classList.toggle("hidden");
    setTimeout(() => {
        popup.classList.toggle("hidden");
    }, 2000);

    if (lookingForANumber(testEnemyGrid, b) === false) {
    popup.textContent = `You just sunk a ship`;
    popup.classList.toggle("hidden");
    setTimeout(() => {
     popup.classList.toggle("hidden");
    }, 2000);
    }

  } else {
    testEmptyArr[y][x] = "M";
    popup.textContent = `YOU attacked on x=${x} y=${y} and you missed!`;
    popup.classList.toggle("hidden");
    setTimeout(() => {
        popup.classList.toggle("hidden");
    }, 2000);
  }

  DisplayGrid(testEmptyArr, theirTbody, 'their');
  isGameFinished(testEnemyGrid);

  document.querySelectorAll(".top-instructions").forEach((div) => div.classList.toggle("hidden"));

  setTimeout(() => {HandleReceiveAttack();}, 4000);
}

function lookingForANumber(matrix, n) {
  // console.log(n);
  //     const res = matrix.reduce((acc,array) => array.some((element)=> element==n) || acc,false);
  // console.log("RES ",res);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == n) {
        console.log(true);
        return true;
      }
    }
  }
  return false;
}

//RECEVOIR UNE ATTAQUE

let missedCoordonates = [];
let hitCoordonates=[]

function HandleReceiveAttack() {

    let tempCoords = remainingCoordonates.splice(Math.floor(Math.random() * remainingCoordonates.length), 1)
 let x = tempCoords[0][0];
  let y = tempCoords[0][1];



  if (testMyGrid[y][x] !== 0) {
    let a = testMyGrid[y][x];
    testMyGrid[y][x] = -a;
    hitCoordonates.push([x,y]) 
    console.log(hitCoordonates);

    popup.textContent = `They attacked you on x=${x} y=${y} and they hit you`;
    popup.classList.toggle("hidden");
    setTimeout(() => {
        popup.classList.toggle("hidden");
    }, 2000);

  } else {
    missedCoordonates.push([x,y]) 

    popup.textContent = `They attacked you on x=${x} y=${y} and they missed!`;
    popup.classList.toggle("hidden");
    setTimeout(() => {
        popup.classList.toggle("hidden");
    }, 2000);
  }

  document.querySelectorAll(".top-instructions").forEach((div) => div.classList.toggle("hidden"));
  DisplayGrid(testMyGrid, myTbody, 'mine');

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
  if (sum === -63) {
    popup.textContent = `The game is over !`;
    popup.classList.toggle("hidden");
  }
}
