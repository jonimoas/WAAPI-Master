class Compressor{
    
    constructor(context){
        this.compressor = context.createDynamicsCompressor();
    }
    
    setThreshold(n,context){
        this.compressor.threshold.setValueAtTime(n, context.currentTime);
        threshold = n;
    }
    
    setKnee(n,context){
        this.compressor.knee.setValueAtTime(n, context.currentTime);
    }
    
    setRatio(n,context){
        this.compressor.ratio.setValueAtTime(n, context.currentTime);
    }
    
    setAttack(n,context){
        this.compressor.attack.setValueAtTime(n, context.currentTime);
    }
    
    setRelease(n,context){
        this.compressor.release.setValueAtTime(n, context.currentTime);
    }
    
    bypass(context){
        this.compressor.threshold.setValueAtTime(0, context.currentTime);
    }
    
    restore(context){
        this.compressor.threshold.setValueAtTime(threshold, context.currentTime);
    }
    
    connect(input,output){
        input.connect(this.compressor);
        this.compressor.connect(output);
    }
}




