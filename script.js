//Global ------------------------------
let slotText = [];

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

//------------------------------------------------------------------
//Controls the visual display of the board
const displayController = (() => {

    const slots = document.querySelectorAll(".slot");


    const settings = document.getElementById("settings");
    const game = document.getElementById("game");

    const startButton = document.getElementById("begin");

    const aiButton1 = document.querySelector(".ai1");
    const aiButton2 = document.querySelector(".ai2");

    const playerButton1 = document.querySelector(".player1");
    const playerButton2 = document.querySelector(".player2");

    const settingButton = document.querySelector(".change");
    const restartButton = document.querySelector(".restart");
    
    const buttonArray = [aiButton1, playerButton1, aiButton2, playerButton2];

    settingButton.addEventListener("click", goToSettings);
    restartButton.addEventListener("click", restartGame);

    //Add event listeners to slots
    slots.forEach(slot => {
        slot.addEventListener("click", () => {
            if(slot.textContent === "o" || slot.textContent === "x") {
                return;
            } else {
                if(player1Turn && !player1.isAi) {
                    slot.textContent = player1.shape;
                    slot.classList.add("fade");
                    setSlots();
                    player1Turn = false;
                    player2Turn = true;
                    winCondition.set();
                    
                    setTimeout(gameFlow.play, 1000);
                } else if(player2Turn && !player2.isAi) {
                    slot.textContent = player2.shape;
                    slot.classList.add("fade");
                    setSlots();
                    player2Turn = false;
                    player1Turn = true;
                    winCondition.set();
                    
                    setTimeout(gameFlow.play, 1000);
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
        if (aiButton1.classList.contains("selected") && aiButton2.classList.contains("selected")) {
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
        
        player1Turn = true;
        player2Turn = false;

        if (player1.isAi) {
            gameFlow.play();
        }
        
        return;
    });


    //Initializes game when site loaded
    initialize();

    //Functions to for display
    function initialize() {
        game.classList.add("hidden");
    }

    function restartGame() {
        slots.forEach(slot => {
            slot.textContent = undefined;
            slot.classList.remove("fade");
        });
        player1Turn = true;
        player2Turn = false;
    }   

    function goToSettings() {
        slots.forEach(slot => {
            slot.textContent = undefined;
            slot.classList.remove("fade");
        });
        settings.classList.remove("hidden");
        game.classList.add("hidden");
        player1Turn = undefined;
        player2Turn = undefined;
    }

    //Gets an array of what value each square is
    function setSlots() {
        const toArray = Array.from(slots);
        for (let i = 0; i <= toArray.length-1; i++){
            slotText[i] = toArray[i].textContent;
        }
        return;
    }

    return {buttons: buttonArray,
            slots: slots,
            set: setSlots,
            setting: goToSettings,
            restart: restartGame
    };
})();

//------------------------------------------------------------------
//Check for winning conditions
const winCondition = (() => {

    //get array of all possible combos to win
    function set(){
        let row1 = [slotText[0],slotText[1],slotText[2]];
        let row2 = [slotText[3],slotText[4],slotText[5]];
        let row3 = [slotText[6],slotText[7],slotText[8]];

        let col1 = [slotText[0],slotText[3],slotText[6]];
        let col2 = [slotText[1],slotText[4],slotText[7]];
        let col3 = [slotText[2],slotText[5],slotText[8]];

        let diag1 = [slotText[0],slotText[4],slotText[8]];
        let diag2 = [slotText[6],slotText[4],slotText[2]];

        let conditions = [row1, row2, row3, col1, col2, col3, diag1, diag2];
        checkForWin(conditions);
    };

    //function that checks if a winning combination exists after getting array from set()
    //if it doesn't detect a legal win, runs func for tie
    function checkForWin (x) {
        let i;
        if (i === undefined) {
            i = 0;
        }
        
        displayController.slots.forEach (el => {
            if (el.textContent === 'o' || el.textContent === 'x' ) {
                i++;
                console.log(i);
                
            }

        });

        if (i < 9) {
            x.forEach(e => {
                if (e[0] === 'o' && e[1] === 'o' && e[2] === 'o') {
                    i = undefined;
                    win ('o');
                } else if (e[0] === 'x' && e[1] === 'x' && e[2] === 'x') {
                    i = undefined;
                    win ('x');
                }
            });
        } else {
            i = undefined;
            win('tie');
        }

       
    };

    //function to be called if winner is reached
    function win(x) {
        if (x === 'tie') {
            player1Turn = undefined;
            player2Turn = undefined;
            return;
        } else if (x === "o") {
            player1Turn = undefined;
            player2Turn = undefined;
            return;
        } else {
            player1Turn = undefined;
            player2Turn = undefined;

            return;
        }
    };

    return {set:set};
})();

//------------------------------------------------------------------
//Module that runs ai functionality if it's an ai's turn to play
const gameFlow = (() => {

    //Function that runs when ai player's turn is up
    function playTurn(){
        if(player1Turn && player1.isAi) {
            let x = Math.floor(Math.random() * displayController.slots.length);
            if (!displayController.slots[x].textContent){
                displayController.slots[x].textContent = `${player1.shape}`;
                displayController.slots[x].classList.add("fade");
                player1Turn = false;
                player2Turn = true;
                displayController.set();
                winCondition.set();
                return;
            } else {
                playTurn();
                return;
            }

        } else if (player2Turn && player2.isAi){
            let x = Math.floor(Math.random() * displayController.slots.length);
            if (!displayController.slots[x].textContent){
                displayController.slots[x].textContent = `${player2.shape}`;
                displayController.slots[x].classList.add("fade");
                player2Turn = false;
                player1Turn = true;
                displayController.set();
                winCondition.set();
                return;
            } else {
                playTurn();
                return;
            }

        } else {
            return;
        } 
    }
    
    return {play: playTurn};
})();


