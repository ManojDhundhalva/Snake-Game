const pianoMusic = new Audio("pianoMusic.mp3");
pianoMusic.play();
pianoMusic.addEventListener('ended', () => {
    this.currentTime = 0;
    this.play();
}, false);