export class Kakao {
    prot = 14.2
    fat = 53.5
    carb = 27.5
    ves = 100
    ccal = 648

    setGramm(ves) {
        this.ves = ves;
        this.fat = Math.round(this.fat * ves / 100, 2);
        this.carb = Math.round(this.carb * ves / 100, 2);
        this.prot = Math.round(this.prot * ves / 100, 2);
        this.ccal = Math.round(this.ccal * ves / 100, 2);
        return this
    }
}

export class Maslo extends Kakao {
    prot = 0
    fat = 99.9
    carb = 0
    ves = 100
    ccal = 899
}

export class Pudra extends Kakao {
    prot = 0
    fat = 0
    carb = 99.8
    ves = 100
    ccal = 399
}