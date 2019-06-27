function childLoop(numAuto) {
    if(numAuto === undefined)
        numAuto = document.getElementById("numAuto").value
    while (possibleTransitions.length != 0 && numAuto!=0) {
        let nextTransition = possibleTransitions[Math.floor((Math.random() * possibleTransitions.length))];
        numAuto--
        //let nextState = getNextState(nextTransition);
        let nextState = nextTransition.state;
        printTransition(nextTransition)
        getTransitions(nextState)
        populateTransitionSelector(possibleTransitions);
        printState(nextState)
    }
}