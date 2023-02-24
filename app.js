const firebaseConfig = {
    apiKey: "AIzaSyABOBiusUp3kVbOXMyd4XQUdMReqQQJMhA",
    authDomain: "tictactoevs.firebaseapp.com",
    projectId: "tictactoevs",
    storageBucket: "tictactoevs.appspot.com",
    messagingSenderId: "284580622820",
    appId: "1:284580622820:web:3ee2d5f96102095b72d7f1"
  };



firebase.initializeApp(firebaseConfig);
// Lager en referanse til databasen
let db = firebase.firestore();

let currentGameArray= [
    0,0,0,
    0,0,0,
    0,0,0
]

let currentGameID;
let currentPlayer = 1
let kids = document.querySelector("#playArea").children
initialisation()
function initialisation(){
    
    for (let i = 0; i < kids.length; i++) {
        kids[i].addEventListener("click",clicked)
        
    }
}


let docId = ""
checkDocs()

let shouldAdd = true
function submit(){
    
    
    
    db.collection("games").get().then((snapshot) => {
        // Henter ut dokumentene
        let dokumenter = snapshot.docs;
        console.log(dokumenter)
        for (let i = 0; i < dokumenter.length; i++) {
            if (dokumenter[i].data().gameId == document.getElementById("gameId").value){
                alert("Connected to game with ID " + document.getElementById("gameId").value)
                checkDocs()
                currentPlayer=2
                
                shouldAdd=false
            }
            if (i==dokumenter.length-1){
                if (shouldAdd){
                    alert("Hosted a game with ID "+ document.getElementById("gameId").value)
                    db.collection("games").add({
                        gameId: document.getElementById("gameId").value,
                        gameArray: currentGameArray
                    })}
                    checkDocs()
                    setInterval(update,500)
                    
            }
        }
    
    })
    
       
        
    
    /* if (shouldAdd){
    db.collection("games").add({
        gameId: document.getElementById("gameId").value,
        gameArray: currentGameArray
    })} */
    
}


function checkDocs(){

    db.collection("games").get().then((snapshot) => {
        // Henter ut dokumentene
        let dokumenter = snapshot.docs;
        
        for (let i = 0; i < dokumenter.length; i++) {
            if (dokumenter[i].data().gameId == document.getElementById("gameId").value){
                docId=dokumenter[i].id
            }
            
        }
    
    
    })
    update()
    
}


function clicked(){
    console.log(this.classList[0])
    
    currentGameArray[(this.classList[0]-1)]=currentPlayer
    db.collection("games").doc(docId).update({gameArray: currentGameArray});
    update()
}


function update(){
    console.log("ran")
    db.collection("games").get().then((snapshot) => {
        // Henter ut dokumentene
        let dokumenter = snapshot.docs;
        
        for (let i = 0; i < dokumenter.length; i++) {
            
            if (dokumenter[i].data().gameId == document.getElementById("gameId").value)
            {
                for (let n = 0; n < kids.length; n++) {
                    if (dokumenter[i].data().gameArray[n]==2){
                        kids[n].innerHTML = "x"
                    }
                    if (dokumenter[i].data().gameArray[n]==1){
                        kids[n].innerHTML = "o"
                    }
                    
                    currentGameArray = dokumenter[i].data().gameArray
                    
                }
                
            }
        }
    })
    console.log(currentGameArray)
    
    
}