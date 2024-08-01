let boxes=document.querySelectorAll(".box");
let reseBtn =document.querySelector(".reset-btn");
let newBtn=document.querySelector(".new-btn");
let newContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true;
let counter=0;
let matchWin=false;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame=()=>{
    turnO=true;
    enableBtn();
    counter=0;
    newContainer.classList.add("hide");
}

/*boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked!");
        counter = counter+1;
        if(turnO){
            box.innerText="O";
            box.style.color = "green"; 
            turnO=false;
        }else{
            box.innerText="X";
            box.style.color = "red"; 
            turnO=true;
        }
        box.disabled=true;// for unchanged
        
        checkwinner();
    });
});*/

boxes.forEach((box) => {
    box.addEventListener("click", () => {
      counter += 1
      box.innerText = 'O'
      box.style.color = 'green'
      box.disabled = true
      checkwinner()
      if(matchWin != true){
      computerTurn()
      }
      
    });
  });


const disableBtn=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBtn=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulation! Winner is ${winner}`;
    newContainer.classList.remove("hide");
    disableBtn();
}

const checkwinner =() =>{
    for ( let pattern of winPatterns){
        //console.log(pattern[0],pattern[1],pattern[2]);
        //console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);

        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if (pos1val !="" && pos2val !="" &&pos3val !="" ){
            if(pos1val === pos2val && pos2val===pos3val){
                console.log('Winner!',pos1val);

                showWinner(pos1val);
                matchWin=true;
                return;
            }
        }
    }
    if (counter == 9) {
        msg.innerText = "It's a Draw!";
        newContainer.classList.remove("hide");
        disableBtn();
      }

};

const computerTurn = ()=>{
    const availableBoxes = Array.from(boxes).filter((box)=>box.innerText ==='')
    if(availableBoxes.length > 0){
      const randomBox = availableBoxes[(Math.floor(Math.random()*availableBoxes.length))]
      randomBox.innerText = 'X'
      randomBox.style.color = 'red'
      randomBox.disabled = true
      counter++
    }
  }
newBtn.addEventListener("click",resetGame);
reseBtn.addEventListener("click",resetGame);
