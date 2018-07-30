function createMain() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var mainCtx = new AudioContext(); //main audio context
    var eqVol = mainCtx.createGain();	//main volume
    var compVol = mainCtx.createGain();
    var oscillator = mainCtx.createOscillator();
    oscillator.start();
    var E = new EQ(mainCtx,oscillator,eqVol);
    var C = new Compressor(mainCtx);
    C.connect(eqVol,compVol);
    compVol.connect(mainCtx.destination);
}


