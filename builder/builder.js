/**
 * How to implement Builder
 *
 * 1. Declare base builder base class/interface who will define
 *  the general steps for build products, each builder must
 *  implement functionality for these steps.
 *
 * Base builder:
 *  - CarProductionLine
 *
 * Build steps:
 *  - setAirBags
 *  - setColor
 *  - setEdition
 *  - resetProductionLine
 *
 * 2. Implement concrete builders subclasses that offer different
 *  versions of the build steps. These builders could create
 *  concrete products or base ones. Depends on what we need.
 *
 *  SedanProductionLine: build() -> {Mastodon|Rhino}Car | Car
 *  RhinoProductionLine: build() -> {Mastodon|Rhino}Car | Car
 *
 * 3. Implement Product classes, these ones could not inherit/implement
 *  from base class/interface.
 *
 *  For the problem we will make the builder returns the
 *  product base class.
 *
 *  Base product:
 *    - BaseCar
 *
 *  Concrete products:
 *    - MastodonSedanCar
 *    - RhinoSedanCar
 *
 * 4. Implement director class, this one will know the build
 *  process for each product, so we can create specific
 *  configurations for the products.
 *
 *  Product representations
 *      constructCvtEdition
 *      constructSignatureEdition
 *
 * Notes:
 *  The code of this file has some modifications with the version showed
 *  during the course.
 *
 *  Change 1: In resetProductionLine function, the cars to be created
 *  must be sedan cars (mastodon sedan, rhino sedan), since the production
 *  line don't create sedans, but receive and personalize sedan cars to
 *  match different versions (CVT, Signature).
 *
 *  Change 2: Rename model to modelToCustomizeInLine as the param to be passed
 *  in production line object creation.
 *
 *  Change 3: Renamed Car class to BaseCar.
 *
 *  Change 4: Renamed class MastodonCar to MastodonSedanCar.
 *
 *  Change 5: Renamed class RhinoCar to RhinoSedanCar.
 *
 *  Change 6: Delete function setModel and remove function call at build
 *  method in SedanProductionLine class. Make the model assignment directly
 *  in Mastodon and Rhino car classes constructors.
 *
 *  Change 7: Add more comments to code.
 *
 *  Change 8: Renamed file to builder.main.js
 */

// STEP 1
class CarProductionLine {

    setAirBags(howMany) {
      throw new Error('Method not implemented!');
    }
  
    setColor(color) {
      throw new Error('Method not implemented!');
    }
  
    setEdition(edition) {
      throw new Error('Method not implemented!');
    }
  
    resetProductionLine() {
      throw new Error('Method not implemented!');
    }
  }
  
  // STEP 2
  class SedanProductionLine extends CarProductionLine {

    constructor({ modelToCustomizeInLine }) {
      super();
      this.setModelToBuild(modelToCustomizeInLine);
      this.resetProductionLine();
    }
  

    setAirBags(howMany) {
      this.sedanCar.airBags = howMany;
      return this;
    }
  

    setColor(color) {
      this.sedanCar.color = color;
      return this;
    }
  

    setEdition(edition) {
      this.sedanCar.edition = edition;
      return this;
    }
  

    setModelToBuild(model) {
      this.modelToCustomizeInLine = model;
    }
  
    resetProductionLine() {
      this.sedanCar =
        this.modelToCustomizeInLine === 'mastodon'
          ? new MastodonSedanCar()
          : new RhinoSedanCar();
    }
  
    build() {
      const sedanCar = this.sedanCar;
      this.resetProductionLine();
      return sedanCar;
    }
  }
  
  // STEP 3
  class BaseCar {
    constructor() {
      this._edition = '';
      this._model = '';
      this._airBags = 2;
      this._color = 'black';
    }
  

    set airBags(howMany) {
      this._airBags = howMany;
    }
  

    set color(color) {
      this._color = color;
    }
  

    set edition(edition) {
      this._edition = edition;
    }
  

    set model(model) {
      this._model = model;
    }
  }
  
  class MastodonSedanCar extends BaseCar {
    constructor() {
      super();
      this.model = 'sedan';
    }
  }
  
  class RhinoSedanCar extends BaseCar {
    constructor() {
      super();
      this.model = 'sedan';
    }
  }
  
  // STEP 4
  class Director {

    setProductionLine(productionLine) {
      this.productionLine = productionLine;
    }
  

    constructCvtEdition() {
      this.productionLine
        .setAirBags(4)
        .setColor('blue')
        .setEdition('cvt');
    }
  

    constructSignatureEdition() {
      this.productionLine
        .setAirBags(8)
        .setColor('red')
        .setEdition('signature');
    }
  }
  
  /**
   * Main function
   */
  function appBuilder(director) {
    console.log('--- [JS] Calling appBuilder ---\n');
  
    if (!director) {
      console.log('--- No director provided ---');
      return;
    }
  
    const mastodonSedanProductionLine = new SedanProductionLine({
      modelToCustomizeInLine: 'mastodon',
    });
  
    director.setProductionLine(mastodonSedanProductionLine);
  
    director.constructCvtEdition();
    const mastodnSedanCvt = mastodonSedanProductionLine.build();
    console.log('--- Mastodon Sedan CVT ---\n');
    console.log(mastodnSedanCvt);
  
    director.constructSignatureEdition();
    const mastodonSedanSignature = mastodonSedanProductionLine.build();
    console.log('\n--- Mastodon Sedan Signature ---\n');
    console.log(mastodonSedanSignature);
  }
  
  appBuilder(new Director());