const frontCard = document.getElementsByClassName("front");
const backCard = document.getElementsByClassName("back");
const scoreBoard = document.querySelector(".score");
const failBoard = document.querySelector(".fail");
const btnContainer = document.querySelector(".button-container");
const startBtn = document.querySelector(".game-button");

class GameManger{
    constructor(){
        this.final = 0;
        this.currentScore = 0;
        this.finalFail = 0;
        this.fail = 0;
        this.cardManger = new CardManger(); 
    }

    init(){
        // 점수 초기화
        this.final = 4;
        this.currentScore = 0;
        this.finalFail = 3;
        this.fail = 0;
        scoreBoard.innerHTML = `${this.final}/${this.currentScore}`;
        failBoard.innerHTML = `${this.finalFail}/${this.fail}`
    }

    gameStart(){
        const manger = this.cardManger;

        manger.init();

        new Promise((resolve, reject)=>{
            // front카드 보여주기
            manger.showFrontCard();
            setTimeout(()=>{
                // front카드 숨기기
                manger.hideFrontCard();
                resolve("success!")
            }, 2000);
        }).then(()=>{
            // n초후 클릭이벤트 더하기
            this.addClickEvent();
        })
    }


    addClickEvent(){
        const manger = this.cardManger;

        Array.from(backCard).forEach(element => {
            element.addEventListener("click", (event)=>{
                element.classList.add("hidden");
                const response = manger.clickBackCard(element);
                if(response && response.success){
                    console.log("성공")
                    this.currentScore += 1;
                    scoreBoard.innerHTML = `${this.final}/${this.currentScore}`;
                    if(this.final == this.currentScore){
                        alert("성공하였습니다!")
                        window.location.reload();
                    }
                }else if(response){
                    this.fail += 1;
                    console.log("실패",this.finalFail, this.fail)
                    failBoard.innerHTML = `${this.finalFail}/${this.fail}`;
                    if(this.finalFail == this.fail){
                        alert("실패하였습니다..")
                        window.location.reload();
                    }
                }
                if(response){
                    setTimeout(() => {
                        manger.removeAllCards();
                        this.gameStart();
                    }, 1200);
                }
            })
        })
    }
}



const gameManger = new GameManger();


startBtn.addEventListener("click", (event)=>{
    console.log(btnContainer)
    btnContainer.id = "btn-hidden";
    gameManger.init();
    alert(`${gameManger.final}번 성공해야하고\n${gameManger.finalFail}번 기회가 있습니다`)
    gameManger.gameStart();
})
