let myFleet = []
let theEnemyFleet = []

class ship{
    constructor(nb, x, xf, y, yf, sens){
        this.nbSpaces= nb;
        this.xStartCoordinates=x
        this.xStopCoordinates=xf
        this.yStartCoordinates=y
        this.yStopCoordinates=yf
        this.sens=sens
    }
}

//Creating my fleet

let xStartAircraft = document.getElementById('xStartAircraft')
let yStartAircraft = document.getElementById('yStartAircraft')
let xStopAircraft = document.getElementById('xStopAircraft')
let yStopAircraft = document.getElementById('yStopAircraft')

let xStartCruiser = document.getElementById('xStartCruiser')
let yStartCruiser = document.getElementById('yStartCruiser')
let xStopCruiser = document.getElementById('xStopCruiser')
let yStopCruiser = document.getElementById('yStopCruiser')

let xStartSubmarine1 = document.getElementById('xStartSubmarine1')
let yStartSubmarine1 = document.getElementById('yStartSubmarine1')
let xStopSubmarine1 = document.getElementById('xStopSubmarine1')
let yStopSubmarine1 = document.getElementById('yStopSubmarine1')

let xStartSubmarine2 = document.getElementById('xStartSubmarine2')
let yStartSubmarine2 = document.getElementById('yStartSubmarine2')
let xStopSubmarine2 = document.getElementById('xStopSubmarine2')
let yStopSubmarine2 = document.getElementById('yStopSubmarine2')

let xStartDestroyer = document.getElementById('xStartDestroyer')
let yStartDestroyer = document.getElementById('yStartDestroyer')
let xStopDestroyer = document.getElementById('xStopDestroyer')
let yStopDestroyer = document.getElementById('yStopDestroyer')

let aircraft = new ship (5,xStartAircraft, yStartAircraft, xStopAircraft, yStopAircraft)
let cruiser = new ship (4,xStartCruiser, yStartCruiser, xStopCruiser, yStopCruiser)
let submarine1= new ship(3, xStartSubmarine1,yStartSubmarine1, xStopSubmarine1, yStopSubmarine1 )
let submarine2= new ship(3, xStartSubmarine2,yStartSubmarine2, xStopSubmarine2, yStopSubmarine2 )
let destroyer= new ship(2, xStartDestroyer,yStartDestroyer, xStopDestroyer, yStopDestroyer )

myFleet= [aircraft, cruiser, submarine1, submarine2, destroyer]

let myFleetOnTheGrid = myFleet.map((boat)=>{
    let tempArr=[]
    for (let i=0; i<10; i++){
        let innerArray=[]
        console.log(tempArr)
        for (let j=0; j<10; j++ ){
        innerArray.push(0)}
        tempArr.push(innerArray)
        console.log(tempArr)
    }
    if (Math.abs(boat.xStartCoordinates - boat.xStopCoordinates)>0){
        for (let i=boat.xStartCoordinates; i<=boat.xStopCoordinates; i++){
            tempArr[boat.yStartCoordinates][i]=1

        }
    } else{
        for (let i=boat.yStartCoordinates; i<=boat.yStopCoordinates; i++){
            tempArr[i][boat.xStartCoordinates]=1
        }
    }
    return tempArr
    })

//Creating my enemy's fleet

let sens=['vertical', 'horizontal']
let aircraftEnemySens = sens[Math.floor(Math.random() * sens.length)]
let cruiserEnemySens = sens[Math.floor(Math.random() * sens.length)]
let submarine1EnemySens = sens[Math.floor(Math.random() * sens.length)]
let submarine2EnemySens = sens[Math.floor(Math.random() * sens.length)]
let destroyer2EnemySens = sens[Math.floor(Math.random() * sens.length)]

let xStartAircraftEnemy = 0;
let yStartAircraftEnemy = 0;
let xStopAircraftEnemy = 0;
let yStopAircraftEnemy = 0;

let xStartCruiserEnemy = 0;
let yStartCruiserEnemy = 0;
let xStopCruiserEnemy =0;
let yStopCruiserEnemy =0;

let xStartSubmarine1Enemy = 0;
let yStartSubmarine1Enemy = 0;
let xStopSubmarine1Enemy = 0;
let yStopSubmarine1Enemy = 0;

let xStartSubmarine2Enemy = 0;
let yStartSubmarine2Enemy = 0;
let xStopSubmarine2Enemy = 0;
let yStopSubmarine2Enemy = 0;

let xStartDestroyerEnemy = 0;
let yStartDestroyerEnemy = 0;
let xStopDestroyerEnemy = 0;
let yStopDestroyerEnemy = 0;

let aircraftEnemy = new ship (5,xStartAircraftEnemy, yStartAircraftEnemy, xStopAircraftEnemy, yStopAircraftEnemy)
let cruiserEnemy = new ship (4,xStartCruiserEnemyEnemy, yStartCruiserEnemyEnemy, xStopCruiserEnemyEnemy, yStopCruiserEnemyEnemy)
let submarine1Enemy= new ship(3, xStartSubmarine1Enemy,yStartSubmarine1Enemy, xStopSubmarine1Enemy, yStopSubmarine1Enemy )
let submarine2Enemy= new ship(3, xStartSubmarine2Enemy,yStartSubmarine2Enemy, xStopSubmarine2Enemy, yStopSubmarine2Enemy )
let destroyerEnemy= new ship(2, xStartDestroyerEnemy,yStartDestroyerEnemy, xStopDestroyerEnemy, yStopDestroyerEnemy )

myEnemyFleet= [aircraftEnemy, cruiserEnemyaircraftEnemy, submarine1EnemyaircraftEnemy, submarine2EnemyaircraftEnemy, destroyerEnemyaircraftEnemy]

let myEnemyFleetOnTheGrid = myEnemyFleet.map((boat)=>{
    let tempArr=[]
    for (let i=0; i<10; i++){
        let innerArray=[]
        console.log(tempArr)
        for (let j=0; j<10; j++ ){
        innerArray.push('0')}
        tempArr.push(innerArray)
        console.log(tempArr)
    }
    
    if (boat.sens = "horizontal"){
            boat.xStartCoordinates= Math.floor(Math.random() * (10-boat.nbSpaces))
            boat.xStopCoordinates= boat.xStartCoordinates+ boat.nbSpaces - 1
            boat.yStartCoordinates= Math.floor(Math.random() * 10)
            boat.yStopCoordinates= boat.yStartCoordinates

            for (let i=boat.xStartCoordinates; i<=boat.xStopCoordinates; i++){
                //         tempArr[boat.yStartCoordinates][i]=1
            
                //     }

            }
    }
    if (boat.sens = "vertical"){
        boat.xStartCoordinates= Math.floor(Math.random() * 10)
        boat.xStopCoordinates= boat.xStartCoordinates
        boat.yStartCoordinates= Math.floor(Math.random() * (10-boat.nbSpaces))
        boat.yStopCoordinates= boat.xStartCoordinates+ boat.nbSpaces - 1
    
        for (let i=boat.yStartCoordinates; i<=boat.yStopCoordinates; i++){
                    tempArr[i][boat.xStartCoordinates]=1}
    }

    return tempArr
    })


