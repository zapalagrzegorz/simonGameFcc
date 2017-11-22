// @ts-check 

document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    /**
     *  inicjalizacja gry
     */
    (() => {
        
        // selectors
        
        let btnPower = document.querySelector('#btn-power');
        let btnStrict = document.querySelector('#btn-strict');
        let btnEarth = document.querySelector('#btn-earth');
        let btnFire = document.querySelector('#btn-fire');
        let btnWater = document.querySelector('#btn-water');
        let btnWind = document.querySelector('#btn-wind');
        // let btnSounds = [].push(btnEarth, btnFirebtnWater, btnWind)
        let computer = {
            // jak ponumerować dźwięki np. 0, 0, 0
            soundList : [],
            
            performSound : function () {
                // play sounds
                this.soundList.forEach( function (element) {
                    let elementNum = Number.parseInt(element);
                    switch (elementNum) {
                    case 0:
                        playSound.call(btnEarth);
                        // btnEarth.dispatchEvent('click');
                        break;
                    case 1:
                        playSound.call(btnEarth);
                        break;
                    case 2:
                        playSound.call(btnEarth);
                        break;
                    case 3:
                        playSound.call(btnEarth);
                        break;

                    }
                });
            }, 

            // return 0-3
            generateRandom : function () {
                return Math.floor(Math.random() * 4);
            }
            // 

        };
        // function 

        function playSound () {
            this.classList.add('active');
            let element = this;

            function removeActiveClass (element) {
                element.classList.remove('active');
            }
            // może dla user click źródło dźwięku wziąć z data-sound 
            // TODO sprawdzić arrow function
            setTimeout(removeActiveClass, 1000, element);
        }

        function init () {
            this.classList.add('active');
            btnEarth.addEventListener('click', playSound, false);
            btnFire.addEventListener('click', playSound, false);
            btnWater.addEventListener('click', playSound, false);
            btnWind.addEventListener('click', playSound, false);
            // turn off
            this.removeListener('click', init);
            this.addEventListener('click', turnOff);
        }

        /**
         * Simulate turning off. Disables all buttons.
         */
        function turnOff () {
            btnEarth.removeEventListener('click', playSound);
            this.classList.remove('active');
        }
        
        // events
        
        btnPower.addEventListener('click', init);
        // addeventListener podpina samą funkcję, bez obiektu, który posiada daną metodę, wskaźnik 'this' jest wówczas ustawiony na dany element, tu np. playerCircle. 
        // Metoda 'bind': pierwszym argument ustawia wskaźnik 'this' w wywołaniu metody, drugi parametr przekazuje argument dla metody setPlayer 
        // game.elements.playerCircle.addEventListener('click', game.setPlayer.bind(game, 0), false);
        // game.elements.playerCross.addEventListener('click', game.setPlayer.bind(game, 1), false);
        // game.elements.boardFields.forEach((value) => value.addEventListener('click', game.setBoardField.bind(game, 0, 'player'), false));
        // game.elements.finalBox__tryAgain.addEventListener('click', game.replay.bind(game), false);
        // game.elements.modalBox.style.display = 'initial';
        // game.elements.initTextBox.classList.toggle('visible');

    })();
});