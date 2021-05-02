//create player factory
const player = (ai, shp) => {
    let isAi = ai;
    let shape = shp;
    return {isAi, shape};
};

//Stores info on the board layout
const gameBoard = (() => {
    let slots = [1,2,3,4,5,6,7,8,9];

    return {slots};
})();

//Controls the visual display of the board
const displayController = (() => {
    function render() {

    }

    return {function: render()};
})();

//Controls the game by changing turns after player takes an action
const gameFlow = (() => {
    let player1Turn;
    let player2Turn;


})();

const player1 = player(false, 'o');
const player2 = player(true, 'x');
