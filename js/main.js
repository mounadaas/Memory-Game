let span = document.querySelector(".splash-screen span");
span.onclick = function(){
    let yourName = prompt("what is your name!");
    if(yourName === "" || yourName == null){
        document.querySelector(".name .ada").innerHTML = "Unknoun"
    }else{
        document.querySelector(".name .ada").innerHTML = yourName;
    }
    document.querySelector(".splash-screen").remove();
}
let duration = 1000;
let Container = document.querySelector(".content-game");
let Boxes = Array.from(Container.children);
let orderRange = Array.from(Array(Boxes.length).keys());

shuffle(orderRange);
console.log(orderRange);

Boxes.forEach((box, index) => {
    // Add CSS Order Property
    box.style.order = orderRange[index];
    // Add Click Event
    box.addEventListener('click', function () {
        flipBox(box);
    });
});






// function shuffle
function shuffle(array){
    let current = array.length,
    stash,
    rndom;
    while( current > 0){
        rndom = Math.floor(Math.random() * current);
        current--;
        stash= array[current];
        array[current] = array[rndom];
        array[rndom]= stash;
    }
    return array
}
// function flipback
function flipBox(selectedBox){
    selectedBox.classList.add("is-flipped");
    let allSelectbox = Boxes.filter(flippedBox => flippedBox.classList.contains("is-flipped"));
    console.log(allSelectbox);
    if(allSelectbox.length === 2){
        stopClicking();
        checkMatchedBoxes(allSelectbox[0], allSelectbox[1]);
    }
}
// function stop clicking
function stopClicking(){
    Container.classList.add("no-clickng");
    setTimeout(()=>{
        Container.classList.remove("no-clickng");
    },duration)
}

// check match block

function checkMatchedBoxes(firstBlock, secondBlock) {

    let triesElement = document.querySelector(".score .number");
    if (firstBlock.dataset.animal === secondBlock.dataset.animal) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        document.getElementById("success").play();
        } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
            document.getElementById("fail").play();
        }
    }