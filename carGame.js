const startButton = document.querySelector(".startButton");
const refreshButton = document.querySelector(".refreshButton");



let randomPoints = [20, 40, 60 ,80 ,100];
let petrolPumpPoints = [];
let startPoint = 0;
let endPoint = 100;
let petrolRemaining = 30;
let randomMovePoint = 0;
let lastRandomMovePoint = 0;
let move = 0;

const getRandomPoint = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}


const carGame = (event) => {
    let div = document.createElement("div");
    let startText = document.createTextNode("Game Started");
    div.appendChild(startText);
    document.body.appendChild(div);
    div.classList.add("results");

    for(let i = startPoint; i < randomPoints.length; i++){
        let min = randomPoints[i-1] || 0;
        let max = randomPoints[i];
        let petrolPumpPoint = getRandomPoint(min, max);
        petrolPumpPoints.push(petrolPumpPoint);
    }

    let petrolPumpPointsText = document.createElement("h3");
    petrolPumpPoints.sort((a, b) => a-b)
    petrolPumpPointsText.textContent = `Petrol pumps generated at ${petrolPumpPoints}`;
    div.appendChild(petrolPumpPointsText);
    
    let newDiv = document.createElement("div");
    document.body.appendChild(newDiv);
    newDiv.classList.add("results")

    for(let i = 0; i < endPoint; i++){
        moveCar();
        if(randomMovePoint >= 100){
            let moveText = document.createElement("p");
            newDiv.appendChild(moveText);
            moveText.textContent = `Move ${move} - Car at ${randomMovePoint}, petrol remaining ${petrolRemaining}. destination reached.`;
            return;
        }

        if(petrolRemaining <= 6 && (randomMovePoint - lastRandomMovePoint) <= 6){
            let moveText = document.createElement("p");
            newDiv.appendChild(moveText);
            moveText.textContent = `Move ${move} - Car at ${randomMovePoint}, petrol remaining ${petrolRemaining}`;
            
            if(petrolRemaining > 0){
                randomMovePoint = randomMovePoint + petrolRemaining;
                petrolRemaining = 0;
                move++;
                let moveText = document.createElement("p");
                newDiv.appendChild(moveText);
                moveText.textContent = `Move ${move} - Car at ${randomMovePoint}, petrol remaining ${petrolRemaining}, Game Over.`;
            }
            return
        }
        let moveText = document.createElement("p");
        newDiv.appendChild(moveText);
        moveText.textContent = `Move ${move} - Car at ${randomMovePoint}, petrol remaining ${petrolRemaining}`;
    }
}



const moveCar = () => {
    let min = randomMovePoint;
    let max = (randomMovePoint + 6) || 6;
    randomMovePoint = getRandomPoint(min, max);
    move++;
    petrolRemaining = petrolRemaining - (randomMovePoint - lastRandomMovePoint);

    if(petrolRemaining <= 10){
        petrolPumpPoints.map(petrolPumpPoint => {
            if(lastRandomMovePoint < petrolPumpPoint && petrolPumpPoint < randomMovePoint){
                petrolRemaining = petrolRemaining + 20;
            }
        })
    }
    lastRandomMovePoint = randomMovePoint;
}

const refreshPage = () => {
    location.reload()
}

startButton.addEventListener("click", carGame);
refreshButton.addEventListener("click", refreshPage);