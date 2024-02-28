class Car{
    constructor({edition,model,airBags,color}= {}){
        this._edition = edition ||'default';
        this._model =model || '';
        this._airBags = airBags || 0;
        this._color = color || 'default';
    }

    set airBags(howMany){
        this._airBags =howMany;
    }

    set color(color){
        this._color =color;
    }

    set model(model){
        this._model =model;
    }
    set edition(edition){
        this._edition =edition;
    }

    get airBags(){
        return this._airBags;
    }

    get color(){
        return this._color;
    }

    get model(){
       return this._model ;
    }
    get edition(){
     return  this._edition;
    }

    clone(){
    throw new Error('Method not implemented!');
    }
}

/****setp 2 */

class MastodonCar extends Car{
    constructor(carToClone){
        super({
            edition: carToClone?.edition,
            model: carToClone?.model, 
            airBags: carToClone?.airBags,
            color: carToClone?.color
        });
    }

    clone(){
        return new MastodonCar(this);
    }
}

class Director{
    setProductionLine(productionLine){
        this.productionLine =productionLine;
    }
    
    constructCvEdition(){
        this.productionLine.setAirBags(4);
        this.productionLine.setColor('blue');
        this.productionLine.setEdition('CVT');
    }

    constructSignatureEdition(){
        this.productionLine.setAirBags(9);
        this.productionLine.setColor('green');
        this.productionLine.setEdition('Signature');
    }
}

class CarProductionLine{
    setAirBags(howMany){
        throw new Error('Method not implemented!');
    }

    setColor(color){
        throw new Error('Method not implemented!');
    }
    setEdition(edition){
        throw new Error('Method not implemented!');
    }
    resetProductionLine(newCar){
        throw new Error('Method not implemented!');
    }
}

class SedanProductionLine extends CarProductionLine{
    constructor({factory}){
        super();
        this.carFactory = factory;
        this.resetProductionLine(this.carFactory.create());
    }

    resetProductionLine(car){
        this.sedanCar =car;
    }
    setAirBags(howMany){
        this.sedanCar.airBags =howMany;
        return this;
    }

    setColor(color){
        this.sedanCar.color =color;
        return this;

    }

    setEdition(edition){
        this.sedanCar.edition =edition;
        return this;
    }

    setModel(){
        this.sedanCar.model ='sedan';
        return this;
    }
    build(){
        this.setModel();
        const sedanCar = this.sedanCar;
        this.resetProductionLine(this.carFactory.create());
        return sedanCar;
    }
}
class Factory{
    create(){
        return new MastodonCar();
    }
}
class MastodonCarFactory extends Factory{
    create(){
        return new MastodonCarFactory();
    }
}

function appBuilder(director){
    // const mastodonSedanProductionLine = new SedanProductionLine({
    //     factory: new MastodonCarFactory(),
    // });

    // director.setProductionLine(mastodonSedanProductionLine);

    // director.constructCvtEdition();
    // const mastodonSedanCvt = mastodonSedanProductionLine.build();
    // console.log('--- Mastodon Sedan CVT ---\n');
    // console.log(mastodonSedanCvt);
  
    // const mastodonSedanCvtClone = mastodonSedanCvt.clone();
    // console.log('\n--- Mastodon Sedan CVT Clone ---\n');
    // console.log(mastodonSedanCvtClone);

    // director.constructSignatureEdition();
    // const mastodonSedanSignature =mastodonSedanProductionLine.build();
    // console.log(mastodonSedanSignature);

    
}

appBuilder(new Director());