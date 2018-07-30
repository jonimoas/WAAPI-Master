class EQ {

    constructor(context, input, output) {
        this.filters = [];
        this.peaks = [];
        this.notches = [];
        this.notchesfilters(context);
        this.connectAll(input, output);
    }

    //more notches and filters
    notchesfilters(context) {
        var i = 0;
        while (i <= 7) { // lowpass ,highpass ,bandpass ,lowshelf ,highshelf ,peaking ,notch ,allpass
            var filter = context.createBiquadFilter();
            filter.type = this.filterTypes(i);
            this.filters[i] = new Filter(filter);
            i++;
        }
        i = 0;
        while (i <= 4) { //more peaks and notches
            var peak = context.createBiquadFilter();
            peak.type = this.filterTypes(5);
            this.peaks[i] = new Filter(peak);
            var notch = context.createBiquadFilter();
            notch.type = this.filterTypes(6);
            this.notches[i] = new Filter(notch);
            i++;
        }
    }

    connectAll(input, output) {
        input.connect(this.filters[0].filter);
        var i = 1;
        while (i <= 7) {
            this.filters[i - 1].filter.connect(this.filters[i].filter);
            i++;
        }
        i = 1;
        this.filters[7].filter.connect(this.notches[0].filter);
        while (i <= 4) {
            this.notches[i - 1].filter.connect(this.notches[i].filter);
            i++;
        }
        i = 1;
        this.notches[4].filter.connect(this.peaks[0].filter);
        while (i <= 4) {
            this.peaks[i - 1].filter.connect(this.peaks[i].filter);
            i++;
        }
        this.peaks[4].filter.connect(output);
    }

    //f = frequency, q = Q, g = Gain, n = count
    setLowpass(f, q) {
        this.filters[0].setFrequency(f);
        this.filters[0].setQ(q);
    }

    setHighpass(f, q) {
        this.filters[1].setFrequency(f);
        this.filters[1].setQ(q);
    }

    setBandpass(f, q) {
        this.filters[2].setFrequency(f);
        this.filters[2].setQ(q);
    }

    setLowshelf(f, q, g) {
        this.filters[3].setFrequency(f);
        this.filters[3].setQ(q);
        this.filters[3].setGain(g);
    }

    setHighshelf(f, q, g) {
        this.filters[4].setFrequency(f);
        this.filters[4].setQ(q);
        this.filters[4].setGain(g);
    }

    setAllpass(f, q) {
        this.filters[7].setFrequency(f);
        this.filters[7].setQ(q);
    }

    setNotch(f, q, g) {
        this.filters[6].setFrequency(f);
        this.filters[6].setQ(q);
        this.filters[6].setGain(g);
    }

    setPeak(f, q, g) {
        this.filters[5].setFrequency(f);
        this.filters[5].setQ(q);
        this.filters[5].setGain(g);
    }

    setNotches(f, q, g, n) {
        this.notches[n].setFrequency(f);
        this.notches[n].setQ(q);
        this.notches[n].setGain(g);
    }

    setPeaks(f, q, g, n) {
        this.peaks[n].setFrequency(f);
        this.peaks[n].setQ(q);
        this.peaks[n].setGain(g);
    }

    bypassLowpass() {
        this.filters[0].bypassFrequency(22000);
    }

    bypassHighpass() {
        this.filters[1].bypassFrequency(0);
    }

    bypassBandpass() {
        this.filters[2].bypassFrequency(22000);
    }

    bypassLowshelf() {
        this.filters[3].bypassGain(0);
    }

    bypassHighshelf() {
        this.filters[4].bypassGain(0);
    }

    bypassAllpass() {
        this.filters[7].bypassFrequency(0);
    }

    bypassNotch() {
        this.filters[6].bypassGain(0);
    }

    bypassPeak() {
        this.filters[5].bypassGain(0);
    }

    bypassNotches(n) {
        this.notches[n].bypassGain(0);
    }

    bypassPeaks(n) {
        this.peaks[n].bypassGain(0);
    }

    restoreLowpass() {
        this.filters[0].restoreFrequency();
    }

    restoreHighpass() {
        this.filters[1].restoreFrequency();
    }

    restoreBandpass() {
        this.filters[2].restoreFrequency();
    }

    restoreLowshelf() {
        this.filters[3].restoreGain();
    }

    restoreHighshelf() {
        this.filters[4].restoreGain();
    }

    restoreAllpass() {
        this.filters[7].restoreFrequency();
    }

    restoreNotch() {
        this.filters[6].restoreGain();
    }

    restorePeak() {
        this.filters[5].restoreGain();
    }

    restoreNotches(n) {
        this.notches[n].restoreGain();
    }

    restorePeaks(n) {
        this.peaks[n].restoreGain();
    }

    // lowpass ,highpass ,bandpass ,lowshelf ,highshelf ,peaking ,notch ,allpass
    filterTypes(n) {
        switch (n) {
            case 0:
                return 'lowpass';
                break;
            case 1:
                return 'highpass';
                break;
            case 2:
                return 'bandpass';
                break;
            case 3:
                return 'lowshelf';
                break;
            case 4:
                return 'highshelf';
                break;
            case 5:
                return 'peaking';
                break;
            case 6:
                return 'notch';
                break;
            case 7:
                return 'allpass';
                break;
        }
    }
    
}