let backgroundMusic;
let clickSound;
let imageSound;

window.onload = function () {                                                                       // Kun sivu on ladattu

    // Lista kaikista upgrade nappeista
    const buttons = [
        'btn1', 'btn2', 'btn3', 'btn4', 'btn5',
        'btn6', 'btn7', 'btn8', 'btn9', 'btn10',
        'btn11', 'btn12', 'btn13', 'btn14', 'btn15',
        'btn16', 'btn17', 'btn18', 'btn19', 'btn20'
    ];

    // Alussa näppäimet pois käytöstä
    buttons.forEach(buttonId => {
        document.getElementById(buttonId).disabled = true;
    });

    // Klikkaustapahtumat
    document.getElementById("click").addEventListener("click", getPoints);
    buttons.forEach(buttonId => {                                                                   // Käydään läpi jokainen nappi                                 
        document.getElementById(buttonId).addEventListener("click", () => loadStuff(buttonId));     // Lisätään kuuntelija jokaiselle napille
    }
    );

    loadGame();                                                                                     // Ladataan peli

    // Mute-nappi musiikin mykistämiseen
    const muteButton = document.createElement('button');
    muteButton.id = 'muteButton';
    muteButton.textContent = 'Mute';
    muteButton.innerHTML = '<i class="fas fa-bell"></i>';
    document.body.insertBefore(muteButton, document.querySelector('main'));
    muteButton.style.position = 'absolute';
    muteButton.style.top = '25px';
    muteButton.style.right = '100px';
    muteButton.style.backgroundColor = 'orange';
    muteButton.style.color = 'black';
    muteButton.style.border = 'none';
    muteButton.style.padding = '10px';
    muteButton.style.borderRadius = '5px';
    muteButton.style.margin = '10px';
    muteButton.style.cursor = 'pointer';
    muteButton.style.height = '40px';
    muteButton.style.width = '40px';
    
    // Reset-nappi pelin nollaamiseen
    const resetButton = document.createElement('button');
    resetButton.id = 'reset';
    resetButton.textContent = 'Reset game';
    document.body.insertBefore(resetButton, document.querySelector('main'));
    resetButton.style.position = 'absolute';
    resetButton.style.top = '10px';
    resetButton.style.right = '10px';
    resetButton.style.backgroundColor = 'orange';
    resetButton.style.color = 'black';
    resetButton.style.border = 'none';
    resetButton.style.padding = '10px';
    resetButton.style.borderRadius = '5px';
    resetButton.style.margin = '10px';
    resetButton.style.cursor = 'pointer';
    document.getElementById("reset").addEventListener("click", resetGame);
}

let score = 0;                                                                                      // Pistemäärä
const scoreDisplay = document.createElement('p');                                                   // Pistemäärän näyttö
scoreDisplay.textContent = 'Points: ' + score;                                                      // Asetetaan alkuarvo pistemäärälle
document.body.insertBefore(scoreDisplay, document.querySelector('main'));                           // Lisätään pistemäärän näyttö html-dokumenttiin ennen main-elementtiä 
scoreDisplay.style.color = "yellow";                                                                // Tyylitellään pistemäärän näyttöä
scoreDisplay.style.fontSize = "30px";
scoreDisplay.style.margin = "0";

// Upgrade napit ja niiden tiedot
const upgrades = {
    'btn1': { src: 'assets/images/plant1.png', id: 'loadedImage1', points: 100 },
    'btn6': { src: 'assets/images/plant2.png', id: 'loadedImage2', points: 500 },
    'btn11': { src: 'assets/images/plant3.png', id: 'loadedImage3', points: 1000 },
    'btn16': { src: 'assets/images/plant4.png', id: 'loadedImage4', points: 1500 },
    'btn2': { src: 'assets/images/plant5.png', id: 'loadedImage5', points: 2000 },
    'btn7': { src: 'assets/images/plant6.png', id: 'loadedImage6', points: 3000 },
    'btn12': { src: 'assets/images/plant7.png', id: 'loadedImage7', points: 4000 },
    'btn17': { src: 'assets/images/plant8.png', id: 'loadedImage8', points: 6000 },
    'btn3': { src: 'assets/images/plant9.png', id: 'loadedImage9', points: 8000 },
    'btn8': { src: 'assets/images/plant10.png', id: 'loadedImage10', points: 10000 },
    'btn13': { src: 'assets/images/plant11.png', id: 'loadedImage11', points: 14000 },
    'btn18': { src: 'assets/images/plant12.png', id: 'loadedImage12', points: 17000 },
    'btn4': { src: 'assets/images/plant13.png', id: 'loadedImage13', points: 20000 },
    'btn9': { src: 'assets/images/plant14.png', id: 'loadedImage14', points: 25000 },
    'btn14': { src: 'assets/images/plant15.png', id: 'loadedImage15', points: 30000 },
    'btn19': { src: 'assets/images/plant16.png', id: 'loadedImage16', points: 35000 },
    'btn5': { src: 'assets/images/plant17.png', id: 'loadedImage17', points: 40000 },
    'btn10': { src: 'assets/images/plant18.png', id: 'loadedImage18', points: 45000 },
    'btn15': { src: 'assets/images/bird.png', id: 'loadedImage19', points: 50000 },
    'btn20': { src: 'assets/images/question.png', id: 'loadedImage20', points: 51000 }
};

// Pisteiden jakaminen
function getPoints() {
    if (score < 100) {
        score += 1;
    } else if (score < 500) {
        score += 2;
    } else if (score < 1000) {
        score += 5;
    } else if (score < 5000) {
        score += 8;
    } else if (score < 15000) {
        score += 10;
    } else if (score < 40000) {
        score += 25;
    } else if (score < 55000) {
        score += 50;
    }

    const greenhouse = document.getElementById("greenhouse");
    greenhouse.style.position = "relative";
    greenhouse.style.overflow = "hidden";

    // Animaatiot
    if (score >= 4000 && !document.getElementById("newGif")) {
        const newGif = document.createElement("img");
        newGif.src = 'assets/animation/butterfly2.gif';
        newGif.alt = "Butterfly";
        newGif.id = "newGif";
        newGif.style.position = 'absolute';
        newGif.style.top = '50%';
        newGif.style.left = '1%';
        newGif.style.transform = 'translate(-50%, -50%)';

        const greenhouse = document.getElementById("greenhouse");
        greenhouse.appendChild(newGif);

        // Animaatio: perhonen lentää poikki ruudun
        gsap.to(newGif, {
            duration: 70,
            left: '100%',
            ease: "power2.out",
            y: -500,
            onComplete: () => {
                greenhouse.removeChild(newGif);
            }
        });
    }

    if (score >= 8000 && !document.getElementById("newGif2")) {
        const newGif2 = document.createElement("img");
        newGif2.src = 'assets/animation/butterflys.gif';
        newGif2.alt = "Butterfly";
        newGif2.id = "newGif2";
        newGif2.style.position = 'absolute';
        newGif2.style.top = '50%';
        newGif2.style.right = '10%';
        newGif2.style.transform = 'translate(-50%, -50%)';

        const greenhouse = document.getElementById("greenhouse");
        greenhouse.appendChild(newGif2);

        // Animaatio: perhoset lentävät ruudun yli hiljalleen
        gsap.to(newGif2, {
            duration: 50,
            right: '100%',
            ease: "power3.in",
            y: -250,
            onComplete: () => {
                greenhouse.removeChild(newGif2);
            }
        });
    }

    scoreDisplay.textContent = 'Points: ' + score;                              
    updateButtons();
}

function updateButtons() {                                                                  // Funktio, joka päivittää napit käytettäviksi
    for (let buttonId in upgrades) {                                                        // Käydään läpi jokainen nappi upgrades-objektissa
        if (score >= upgrades[buttonId].points) {                                           // Jos pistemäärä on suurempi tai yhtä suuri kuin napin aktivointii vaadittava pistemäärä
            document.getElementById(buttonId).disabled = false;                             // Napin tila muutetaan aktiiviseksi
            document.getElementById(buttonId).style.color = "transparent";                  //muutetaan tekstin väri näkymättömäksi kun nappi on aktiivinen
        }
    }
}

function saveGame() {
    localStorage.setItem('score', score);                                                   // Tallennetaan pistemäärä selaimen muistiin
    console.log("Game saved");                                                              // Tulostetaan konsoliin viesti tallennuksesta
}

function loadGame() {
    const savedScore = localStorage.getItem('score');                                       // Haetaan pistemäärä selaimen muistista
    if (savedScore) {                                                                       // Jos pistemäärä on tallennettu
        score = parseInt(savedScore);                                                       // Muutetaan pistemäärä numeroksi
        scoreDisplay.textContent = 'Points: ' + score;                                      // Päivitetään pistemäärän näyttö
        updateButtons();                                                                    // Päivitetään napit käytettäviksi
    }
}

// Funktio pelin nollaamiseen
function resetGame() {  
    localStorage.removeItem('score');                                                       // Poistaa pistemäärän selaimen muistista

    score = 0;                                                                              // Nollaa pistemäärän
    scoreDisplay.textContent = 'Points: ' + score;
 
    const greenhouse = document.getElementById("greenhouse");                               // Poistaa kaikki kuvat ja napit
    const buttons = [
        'btn1', 'btn2', 'btn3', 'btn4', 'btn5',
        'btn6', 'btn7', 'btn8', 'btn9', 'btn10',
        'btn11', 'btn12', 'btn13', 'btn14', 'btn15',
        'btn16', 'btn17', 'btn18', 'btn19', 'btn20'
    ];

    buttons.forEach(buttonId => {                                                           // Käydään läpi jokainen nappi
        const imageId = upgrades[buttonId].id;                                              // Haetaan nappiin liittyvä kuva
        const image = document.getElementById(imageId);                                     
        if (image) {                                                                        // Jos kuva on olemassa
            greenhouse.removeChild(image);                                                  // Poistetaan kuva
        }
        document.getElementById(buttonId).disabled = true;                                  // Poistetaan nappi käytöstä
        document.getElementById(buttonId).style.color = "white";                            //muutetaan tekstin väri näkyväksi kun nappi on poissa käytöstä
    }); 

    // Poistaa mahdolliset kysymys- ja vastaus-elementit
    const existingQuestion = document.getElementById('questionText');
    const existingInput = document.getElementById('answer');
    const existingSubmit = document.getElementById('submit');
    const existingCongratsImg = document.getElementById('newCongratsImg');
    const existingCongratsText = document.querySelectorAll('p');

    if (backgroundMusic) {                                                                
        backgroundMusic.pause();                                                      
        backgroundMusic.currentTime = 0;                                           
        backgroundMusic = null; 
    }

    if (existingQuestion) existingQuestion.remove();        
    if (existingInput) existingInput.remove();
    if (existingSubmit) existingSubmit.remove();
    if (existingCongratsImg) existingCongratsImg.remove();
    existingCongratsText.forEach(text => {
        if (!text.closest('header') && text !== scoreDisplay) {
            text.remove();
        }
    });

    // Poistaa kaikki jäljellä olevat animaatiot
    const allGifs = document.querySelectorAll('img[id^="newGif"]');
    allGifs.forEach(gif => {
        greenhouse.removeChild(gif);
    });

    console.log("Game reset");
}

function loadStuff(buttonId) {
    const imageData = upgrades[buttonId];   

    if (imageData && score >= imageData.points) {
        if (buttonId === 'btn20') {
            ['questionText', 'answer', 'submit'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.remove();
            });

            const text = document.createElement('p');   
            text.textContent = 'How many cats are hiding in the greenhouse?';   
            text.id = 'questionText';
            text.style.color = "yellow";
            document.body.insertBefore(text, document.querySelector('main'));

            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'answer';
            document.body.insertBefore(input, document.querySelector('main'));

            const button = document.createElement('button');
            button.textContent = 'Submit';
            button.id = 'submit';
            button.style.color = 'black';
            button.style.backgroundColor = 'orange';
            button.style.borderRadius = '10px';
            button.style.margin = '10px';
            button.style.cursor = 'pointer';
            button.style.width = '80px';
            button.style.height = '40px';
            document.body.insertBefore(button, document.querySelector('main'));

            button.addEventListener('click', () => {
                const answer = input.value.trim();
                if (answer === '18') {                                                              // Jos vastaus on oikein lisätään animaatio ja ääniefekti
                    new Audio("assets/sounds/fireworks-1-94483.mp3").play();                        
                    const congratsText = document.createElement('p');                               
                    congratsText.textContent = 'Congratulations! You found them all and you made greenhouse blooming!'; 
                    congratsText.style.color = "yellow";
                    document.body.insertBefore(congratsText, document.querySelector('main'));

                    const newCongratsImg = document.createElement("img");   
                    newCongratsImg.src = 'assets/animation/firework.gif';                           
                    newCongratsImg.alt = "Fireworks";   
                    newCongratsImg.id = 'newCongratsImg';
                    newCongratsImg.style.position = 'absolute';
                    document.getElementById("greenhouse").appendChild(newCongratsImg);

                    saveGame();
                } else {
                    text.textContent = 'Try again!';
                    text.style.color = "red";
                }
            });
        } else {
            const imageElement = document.getElementById(imageData.id); 
            if (!imageElement) {
                const newImage = document.createElement("img");
                newImage.src = imageData.src;
                newImage.id = imageData.id;
                document.getElementById("greenhouse").appendChild(newImage);                  
                new Audio("assets/sounds/swoosh.mp3").play();                                       // Lisätään ääniefekti kuvan lisäämiselle
                saveGame();
                console.log("Image added");

                if (buttonId === 'btn15') {                                                         // Lisätään lintujen laulua
                    new Audio("assets/sounds/birds-chirping-75156.mp3").play(); 
                } else if (buttonId === 'btn11' && !backgroundMusic) {                              // Lisätään taustamusiikki
                    backgroundMusic = new Audio("assets/sounds/backgroundMusic.mp3");               // Luodaan uusi audio-elementti
                    backgroundMusic.loop = true;                                                    // Asetetaan musiikki loopille
                    backgroundMusic.volume = 0.1;                                                   // Asetetaan äänenvoimakkuus
                    backgroundMusic.play();                                                         // Aloittaa musiikin toiston
                    console.log("Background music added");                                          // Tulostetaan konsoliin viesti musiikin lisäämisestä
                }

                // Mute-napin toiminnallisuus
                const muteButton = document.getElementById("muteButton");
                let isMuted = false;

                muteButton.addEventListener("click", () => {
                    if (backgroundMusic) { 
                        if (isMuted) {
                            backgroundMusic.volume = 0.1; 
                            muteButton.innerHTML = '<i class="fas fa-bell"></i>';             // Vaihdetaan kuvake "äänet käytössä"
                            console.log("Unmute button clicked");
                        } else {
                            backgroundMusic.volume = 0; 
                            muteButton.innerHTML = '<i class="fas fa-bell-slash"></i';        // Vaihdetaan kuvake äänettömään
                            console.log("Mute button clicked");
                        }
                        isMuted = !isMuted; 
                    }
                });
            }

            // Kannustusviestit
            const messages = {
                'btn1': 'Hey, you get your first plant!',
                'btn6': 'What, another one? You are on fire!',
                'btn12': 'Look at you go!',
                'btn18': 'Keep going! You are amazing!',
                'btn11': 'What is that beautiful sound?',
                'btn14': 'So many cats in the greenhouse!',
                'btn16': "See, you're racking up points more easily!",
                'btn7': 'Is that a green thumb I see?',
                'btn17': 'You’re like a plant magician!',
                'btn5': 'Are you sure you’re not a garden gnome?',
                'btn15': 'Oh, a bird just flew in! Is it here for the party?',
                'btn3': 'This is turning into a garden party!',
                'btn8': 'You’re planting the seeds of success!',
                'btn13': 'The cats say you’re a gardening superstar!',
                'btn19': 'You’re a plant whisperer!',
                'btn4': "Look at all those cats, are they plotting mischief?",
                'btn9': 'Your gardening skills are off the charts!',
                'btn10': 'Those cats are your biggest fans!'
            };

            // Kannustusviestien näyttäminen
            if (messages[buttonId]) {
                const message = document.createElement('p');
                message.textContent = messages[buttonId];
                message.style.position = 'absolute';
                message.style.top = '50%';
                message.style.left = '50%';
                message.style.transform = 'translate(-50%, -50%)';
                message.style.color = 'yellow';
                message.style.fontSize = '25px';
                message.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                message.style.padding = '10px';
                message.style.borderRadius = '5px';
                message.style.zIndex = '10';

                const greenhouse = document.getElementById('greenhouse');
                greenhouse.appendChild(message);
                console.log("Message added");

                gsap.fromTo(message, { opacity: 0, scale: 0.8 }, {
                    opacity: 1, scale: 1, duration: 1, ease: "bounce.out", onComplete: () => {
                        gsap.to(message, {
                            opacity: 0, duration: 2, delay: 3, onComplete: () => {
                                message.remove();
                            }
                        });
                    }
                });
            }
        }
    }
}