//Global ------------------------------
let slotText = [];

let choiceMade;
if (choiceMade === undefined){
    choiceMade = false;
}

let player1Turn;
let player2Turn;

if (player1Turn === undefined){
    player1Turn = false;
}
if (player2Turn === undefined){
    player2Turn = false;
}

//create player factory
const player = (ai, shp) => {
    let isAi = ai;
    let shape = shp;
    return {isAi, shape};
};

const player1 = player(undefined,"x");
const player2 = player(undefined,"o");
//Global End --------------------------


//Controls the visual display of the board
const displayController = (() => {
    let gameReady = false;

    const slots = document.querySelectorAll(".slot");


    const settings = document.getElementById("settings");
    const game = document.getElementById("game");

    const startButton = document.getElementById("begin");

    const aiButton1 = document.querySelector(".ai1");
    const aiButton2 = document.querySelector(".ai2");

    const playerButton1 = document.querySelector(".player1");
    const playerButton2 = document.querySelector(".player2");
    
    const buttonArray = [aiButton1, playerButton1, aiButton2, playerButton2];

    //Add event listeners to slots
    slots.forEach(slot => {
        slot.addEventListener("click", () => {
            if(slot.textContent === "o" || slot.textContent === "x") {
                return;
            } else {
                if(player1Turn) {
                    slot.textContent = player1.shape;
                    player1Turn = false;
                    player2Turn = true;
                    setSlots();
                } else {
                    slot.textContent = player2.shape;
                    player1Turn = true;
                    player2Turn = false;
                    setSlots();
                }   
            }
        })
    })

    //Add an event listener for each button
    buttonArray.forEach(button => {
        button.addEventListener("click", () => {
            if(button.classList.contains("selected")){
                button.classList.remove("selected");
            } else {
                button.classList.add("selected");
            }
        });

    });
    
    //Check if game settings are valid and start game
    startButton.addEventListener("click", () => {
        if (aiButton1.classList.contains("selected") && playerButton1.classList.contains("selected")) {
            return;
        }
        if (aiButton2.classList.contains("selected") && playerButton2.classList.contains("selected")) {
            return;
        }

        settings.classList.add("hidden");
        game.classList.remove("hidden");

        if(aiButton1.classList.contains("selected")){
            player1.isAi = true;
        } else {
            player1.isAi = false;
        }

        if(aiButton2.classList.contains("selected")){
            player2.isAi = true;
        } else {
            player2.isAi = false;
        }
        

        gameReady = true;
    });


    //Initializes game when site loaded
    initialize();

    //Functions to for display
    function initialize() {
        game.classList.add("hidden");
    }

    //Gets an array of what value each square is
    function setSlots() {
        const toArray = Array.from(slots);
        for (let i = 0; i <= toArray.length-1; i++){
            slotText[i] = toArray[i].textContent;
        }
        console.table(slotText);
        return;
    }

    
    return {buttons: buttonArray,
            slots: slots,
            ready: gameReady
    };
})();

//Check for winning conditions
const winCondition = (() => {
    
    if (slotText[0] === "o", slotText[1] === "o", slotText[2] === "o") {

    }
    return{}
})();

//Controls the game by changing turns after player takes an action
const gameFlow = (() => {
    if (displayController.gameReady) {
        player1Turn = true;
        player2Turn = false;
    }

    function playTurn(){
        if(player1Turn && player1.isAi) {

        } else if (player2Turn && player2.isAi){
            
        } else if (player1Turn && !player1.isAi){

        } else if (player2Turn && !player2.isAi){

        }
    }
    
    return {play: playTurn()};
})();


