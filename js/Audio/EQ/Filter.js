class Filter {
    
    constructor(f) {
        this.filter = f;
    }

    setFrequency(f) {
        filter.frequency = f;
    }
    
    setQ(q){
        filter.Q = q;
    }
    
    setGain(g){
        filter.gain = g;
    }
    
    filter(){
        return this.filter;
    }
    
    bypassFrequency(f){
        this.frequency = this.filter.frequency;
        this.filter.frequency = f;
        this.q = this.filter.Q;
        this.filter.Q = 8;
    }
    
    bypassGain(g){
        this.gain = this.filter.gain;
        this.filter.gain = g;
        this.q = this.filter.Q;
        this.filter.Q = 8;
    }
    
    restoreFrequency(){
        this.filter.frequency = this.frequency;
        this.filter.Q = this.q;
    }
    
    restoreGain(){
        this.filter.gain = this.gain;
        this.filter.Q = this.q;
    }
   
}

