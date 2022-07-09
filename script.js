//creates the inital deck data for the player to choose from
var heroDeck = [{
    name: "hero1", 
    image: "hero1.png"
  },
  {
    name: "hero1", 
    image: "hero1.png"
  },
  {
    name: "hero2", 
    image: "hero2.jpg"
  },
  {
    name: "hero2", 
    image: "hero2.jpg"
  },
  {
    name: "hero3",
    image: "hero3.jpg"
  },
  {
    name: "hero3",
    image: "hero3.jpg"
  },
  {
    name: "hero4",
    image: "hero4.jpeg"
  },
  {
    name: "hero4",
    image: "hero4.jpeg"
  },
  {
    name: "hero5",
    image: "hero5.png"
  },
  {
    name: "hero5",
    image: "hero5.png"
  },
  {
    name: "hero6",
    image: "hero6.png"
  },
  {
    name: "hero6",
    image: "hero6.png"
  },
  {
    name: "hero7",
    image: "hero7.jpg"
  },
  {
    name: "hero7",
    image: "hero7.jpg"
  },
  {
    name: "hero8",
    image: "hero8.jpg"
  },
  {
    name: "hero8",
    image: "hero8.jpg"
  }];
let wizardDeck = [{
  name: "wizard1", 
  image: "wizard1.jpg"
},
{
  name: "wizard1", 
  image: "wizard1.jpg"
},
{
  name: "wizard2", 
  image: "wizard2.png"
},
{
  name: "wizard2", 
  image: "wizard2.png"
},
{
  name: "wizard3",
  image: "wizard3.png"
},
{
  name: "wizard3",
  image: "wizard3.png"
},
{
  name: "wizard4",
  image: "wizard4.jpg"
},
{
  name: "wizard4",
  image: "wizard4.jpg"
},
{
  name: "wizard5",
  image: "wizard5.jpg"
},
{
  name: "wizard5",
  image: "wizard5.jpg"
},
{
  name: "wizard6",
  image: "wizard6.png"
},
{
  name: "wizard6",
  image: "wizard6.png"
},
{
  name: "wizard7",
  image: "wizard7.jpg"
},
{
  name: "wizard7",
  image: "wizard7.jpg"
},
{
  name: "wizard8",
  image: "wizard8.jpeg"
},
{
  name: "wizard8",
  image: "wizard8.jpeg"
}];

//sets up the initial elements and data
let deckData = [];
let deck = [];

var cardList = document.getElementsByClassName("card");
var stopper = document.querySelector("body");
var table = document.querySelector(".table");
var buttons = document.querySelector("#buttons");
var button1 = document.querySelector("#button1");
var button2 = document.querySelector("#button2");
var play = document.querySelector("#play");

var cardPick1;
var cardPick2;
var turn;
var matches;

//sets up the super hero themed card memory match game when button is clicked
button1.addEventListener("click", function(){
  buttons.style.visibility = "hidden";
  play.style.visibility = "hidden";
  table.style.display = "grid";
  table.style.background = "lightblue";
  stopper.style.background = `linear-gradient(45deg, blue, skyblue) no-repeat center center fixed`;
  setUpGame(heroDeck);
});
//sets up the zizarding world themed card memory match game when button is clicked
button2.addEventListener("click", function(){
  buttons.style.visibility = "hidden";
  play.style.visibility = "hidden";
  table.style.display = "grid";
  table.style.background = "yellow";
  stopper.style.background = `linear-gradient(135deg, orange, brown) no-repeat center center fixed`;
  setUpGame(wizardDeck);
});
function shuffleDeck(length, arr1, arr2){

    var i = 1;
    while(i <= length){
      //randomly selects a card data, removes it from the deck copy
      //and pushes the workout in the real deck
        var num = Math.floor(Math.random() * arr1.length);
        arr2.push(arr1[num]);
        arr1.splice(num, 1);
        i++;
    }
}


function setUpGame(deckType){
    //sets up the deck and game management
    matches = 0;
    deckData = deckType;
    deck = [];
    shuffleDeck(deckData.length, deckData, deck);
    turn = 1;
    var i;
    //sets up the card's functionality, data, and asthetics
    for(var i = 0; i < cardList.length; i++){
        deck[i].number = i;
        deck[i].flippable = true;
        cardList[i].nums = i;
        cardList[i].style.background = "black";
        cardList[i].cardData = deck[i];

        if(cardList[i].onclick === null){
          cardList[i].addEventListener("click",function(){
            if(this.cardData.flippable){
              var card = this;
              if(turn === 2){
                cardPick2 = this.cardData;
                cardPick2.flippable = false;
                stopper.style.pointerEvents = "none";//makes sure no other cards are picked temporarily
                this.classList.add("flip-front");//adds animation
                setTimeout(function(){
                  //sets clicked background
                  card.style.background = `url("${cardPick2.image}") center`;
                  card.style.backgroundSize = "cover";
                  card.style.backgroundRepeat = "no-repeat";
                }, 500);
                setTimeout(function(){
                  card.classList.remove("flip-front");//removes animation
                }, 1000);
                setTimeout(function(){
                  checkMatch(cardPick1, cardPick2);
                }, 1100)           
                turn--;
              }
              else{      
                cardPick1 = this.cardData;
                cardPick1.flippable = false;
                this.classList.add("flip-front");//adds animation
                setTimeout(function(){
                  //sets clicked background
                  card.style.background = `url("${cardPick1.image}") center`;
                  card.style.backgroundSize = "cover";
                  card.style.backgroundRepeat = "no-repeat";
                }, 500);
                setTimeout(function(){
                  card.classList.remove("flip-front");//removes animation
                }, 1000);
                turn++;
              }
            } 
          });
        }
    }
}
function checkMatch(card1, card2){

  if(card1.image === card2.image){
    table.style.border = "limegreen solid 3px";//correct match
    stopper.style.pointerEvents = "";//makes the flippable cards clickable again
    
    setTimeout(function(){
      table.style.border = "black solid 3px";//resets border
    }, 500);
    matches++;//adds to the matches counter
  }
  else{
    table.style.border = "red solid 3px";//incorrect match
    setTimeout(function(){
      table.style.border = "black solid 3px";//resets border
      card1.flippable = true;
      card2.flippable = true;
      stopper.style.pointerEvents = "";//makes the flippable cards clickable again
      //animtates the card flips
      cardList[card1.number].classList.add("flip-front");
      cardList[card2.number].classList.add("flip-front");
      setTimeout(function(){
        //sets background for respective cards
        cardList[card1.number].style.background = "black";
        cardList[card2.number].style.background = "black";

      }, 500);
      setTimeout(function(){
        //removes animation
        cardList[card1.number].classList.remove("flip-front");
        cardList[card2.number].classList.remove("flip-front");
      }, 1000);
      
      
    }, 1500);
    
  }
  //when all the cards have been flipped over and matched, it resets everything and lets the player
  //select a themed game again
  if(matches === 8){
    play.style.visibility = "visible";
    buttons.style.visibility = "visible";

    //resets deck data
    heroDeck = [{
      name: "hero1", 
      image: "hero1.png"
    },
    {
      name: "hero1", 
      image: "hero1.png"
    },
    {
      name: "hero2", 
      image: "hero2.jpg"
    },
    {
      name: "hero2", 
      image: "hero2.jpg"
    },
    {
      name: "hero3",
      image: "hero3.jpg"
    },
    {
      name: "hero3",
      image: "hero3.jpg"
    },
    {
      name: "hero4",
      image: "hero4.jpeg"
    },
    {
      name: "hero4",
      image: "hero4.jpeg"
    },
    {
      name: "hero5",
      image: "hero5.png"
    },
    {
      name: "hero5",
      image: "hero5.png"
    },
    {
      name: "hero6",
      image: "hero6.png"
    },
    {
      name: "hero6",
      image: "hero6.png"
    },
    {
      name: "hero7",
      image: "hero7.jpg"
    },
    {
      name: "hero7",
      image: "hero7.jpg"
    },
    {
      name: "hero8",
      image: "hero8.jpg"
    },
    {
      name: "hero8",
      image: "hero8.jpg"
    }];
  wizardDeck = [{
    name: "wizard1", 
    image: "wizard1.jpg"
  },
  {
    name: "wizard1", 
    image: "wizard1.jpg"
  },
  {
    name: "wizard2", 
    image: "wizard2.png"
  },
  {
    name: "wizard2", 
    image: "wizard2.png"
  },
  {
    name: "wizard3",
    image: "wizard3.png"
  },
  {
    name: "wizard3",
    image: "wizard3.png"
  },
  {
    name: "wizard4",
    image: "wizard4.jpg"
  },
  {
    name: "wizard4",
    image: "wizard4.jpg"
  },
  {
    name: "wizard5",
    image: "wizard5.jpg"
  },
  {
    name: "wizard5",
    image: "wizard5.jpg"
  },
  {
    name: "wizard6",
    image: "wizard6.png"
  },
  {
    name: "wizard6",
    image: "wizard6.png"
  },
  {
    name: "wizard7",
    image: "wizard7.jpg"
  },
  {
    name: "wizard7",
    image: "wizard7.jpg"
  },
  {
    name: "wizard8",
    image: "wizard8.jpeg"
  },
  {
    name: "wizard8",
    image: "wizard8.jpeg"
  }];
  }
}
function init(){
  table.style.display = "none";
}
init();
