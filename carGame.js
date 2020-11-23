const startButton = document.querySelector(".startButton");
const refreshButton = document.querySelector(".refreshButton");
const modalContainer = document.querySelector(".modal-container");
const resultText = document.querySelector(".result");

let randomPoints = [20, 40, 60 ,80 ,100];
let petrolPumpPoints = [];
let startPoint = 0;
let endPoint = 100;
let petrolRemaining = 30;
let randomMovePoint = 0;
let lastRandomMovePoint = 0;
let move = 0;

//gives the random numbers in range.
const getRandomPoint = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const startCarGame = () => {
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
}

// creates the sentence after every move
const createMoveText = (resultsDiv, text) => {
    let moveText = document.createElement("p");
    resultsDiv.appendChild(moveText);
    moveText.textContent = text;
}

//fills the petrol if reached at petrol point.
const fillPetrol = () => {
    if(petrolRemaining <= 10){
        petrolPumpPoints.map(petrolPumpPoint => {
            if(lastRandomMovePoint <= petrolPumpPoint && petrolPumpPoint <= randomMovePoint){
                petrolRemaining = petrolRemaining + 20;
            }
        })
    }
}

const moveCar = () => {
    let min = randomMovePoint;
    let max = (randomMovePoint + 6) || 6;
    randomMovePoint = getRandomPoint(min, max);
    move++;
    petrolRemaining = petrolRemaining - (randomMovePoint - lastRandomMovePoint);
    fillPetrol();
    lastRandomMovePoint = randomMovePoint;
}

const carGame = (event) => {
    startCarGame();
    let resultsDiv = document.createElement("div");
    document.body.appendChild(resultsDiv);
    resultsDiv.classList.add("results")

    while(randomMovePoint < 100){
        moveCar();
        if(randomMovePoint >= 100){
            let destinationText = `Move ${move} - Car at ${randomMovePoint}, petrol remaining ${petrolRemaining}. destination reached.`
            createMoveText(resultsDiv, destinationText)
            return;
        }
        if(petrolRemaining <= 0 && !petrolPumpPoints.includes(randomMovePoint)){
            randomMovePoint = randomMovePoint + petrolRemaining;
            petrolRemaining = 0;
            let gameOverText = `Move ${move} - Car at ${randomMovePoint}, petrol remaining ${petrolRemaining}, Game Over.`;
            createMoveText(resultsDiv, gameOverText);
            return;
        }
        let movingText = `Move ${move} - Car at ${randomMovePoint}, petrol remaining ${petrolRemaining}`;
        createMoveText(resultsDiv, movingText);
    }
}


const refreshPage = () => {
    location.reload()
}


startButton.addEventListener("click", carGame);
refreshButton.addEventListener("click", refreshPage);