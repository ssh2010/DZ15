var StringComparer = artifacts.require("StringComparer");
var Farmer = artifacts.require("Farmer");
var Horse = artifacts.require("Horse");
var Wolf = artifacts.require("Wolf");
var Cow = artifacts.require("Cow");
var Dog = artifacts.require("Dog");

let horseName = "Blyskavka";
let horseSleep = "Z-z-z...";
let horseCall = "Igogo";


let dogName = "Bro";
let dogSleep = "Z-z-z...";
let dogCall = "Woof";
let dogEat = "R-R-R... Nya-Nyam";


contract("Horse", async (account) => {
    
    it("Horse has a correct name.", async () => {
        let horse = await Horse.deployed();

        let name = await horse.getName();
        assert.equal(name, horseName, "Horse hasn't a correct name");
    });

    it("Horse can sleep.", async () => {
        let horse = await Horse.deployed();
        let sleep = await horse.sleep();
        assert.equal(sleep, horseSleep, "Horse can't sleep.");
    });

    it("Horse can eat 'plant'.", async () => {
        let horse = await Horse.deployed();
        let horseCanEat = await horse.eat("plant");
        let horseEat = horseCanEat.indexOf("plant");

        assert.isTrue(horseEat > 0, "Horse can\'t eat 'plant'.");
    });
    it("Horse cannot eat 'meat', 'not-food', 'plastic'.", async () => {
            let horse = await Horse.deployed();
            let horseCanEat = await horse.eat("plant");

            let horseEatMeat = horseCanEat.indexOf("meat");
            assert.isTrue(horseEatMeat < 0, "Horse can eat \'meat\'.");

            let horseEatNotfood = horseCanEat.indexOf("not-food");
            assert.isTrue(horseEatNotfood < 0, "Horse can eat \'not-food\'.");

            let horseEatPlastic = horseCanEat.indexOf("plastic");
            assert.isTrue(horseEatPlastic < 0, "Horse can eat \'plastic\'.");
    });

    it("Farmer can call Horse, Horse responds correctly ('Igogo')", async () => {
        let horse = await Horse.deployed();
        let farmer = await Farmer.deployed();
        let farmerCallHorse = await farmer.call(horse.address);
        assert.equal(farmerCallHorse, horseCall, "Farmer can't call Horse");
    });

    it("Farmer can feed Horse with plant (if you have any other plant-based food - it is okay).", async () => {
        let horse = await Horse.deployed();
        let farmer = await Farmer.deployed();
        let farmerFeedHorse = await farmer.feed(horse.address, "plant");
        let farmerHorseEat = farmerFeedHorse.indexOf("plant");

        assert.isTrue(farmerHorseEat > 0, "Farmer can't feed Horse with plant");
    });

    it("Farmer cannot feed Horse with anything else('meat','plastic','fingers,etc).", async () => {
        let horse = await Horse.deployed();
        let farmer = await Farmer.deployed();
        let farmerFeedHorse = null;
        let message = "";
        try {
             farmerFeedHorse = await farmer.feed(horse.address, "xxxxx");
        } catch (e) {
            message = e.message;
        }
        assert.isTrue(message.indexOf("revert") > 0, "Farmer can feed Horse with anything else...");
    });
})

contract("Dog", async (account) => {

    it("Dog has a correct name.", async () => {
        let dog = await Dog.deployed();
        let name = "";
        try {
            name = await dog.getName();
        } catch (e) {
            message = e.message;
        }
        assert.notEqual(name, dogName, "Dog hasn't a correct name");
    });

    it("Dog can sleep.", async () => {
        let dog = await Dog.deployed();
        let sleep = "";

        try {
            sleep = await dog.sleep();
        } catch (e) {
            message = e.message;
        }
        assert.equal(sleep, dogSleep, "Dog ca't sleep.");
    });

    it("Dog can eat 'plant'.", async () => {
        let dog = await Dog.deployed();
        let dogCanEat = await dog.eat("plant");
        assert.equal(dogCanEat, dogEat, "Dog can\'t eat 'plant'.");
    });

    it("Dog can eat 'meat'.", async () => {
        let dog = await Dog.deployed();
        let dogCanEat = await dog.eat("meat");
        assert.equal(dogCanEat, dogEat, "Dog can\'t eat 'meat'.");
    });

    it("Dog cannot eat 'not-food', 'plastic', 'chocolate'.", async () => {
        let dog = await Dog.deployed();

        let dogCanEat = await dog.eat("not-food");
        let dogEatnFood = dogCanEat.indexOf("not-food");
        assert.isTrue(dogEatnFood < 0, "Dog can eat \'not-food\'.");

        let dogCanEatplastic = await dog.eat("plastic");
        let dogEatnFoodplastic = dogCanEatplastic.indexOf("plastic");
        assert.isTrue(dogEatnFoodplastic < 0, "Dog can eat \'plastic\'.");

        let dogCanEatchocolate = await dog.eat("chocolate");
        let dogEatnFoodchocolate = dogCanEatchocolate.indexOf("chocolate");
        assert.isTrue(dogEatnFoodchocolate < 0, "Dog can eat \'chocolate\'.");
    });



    it("Farmer can call Dog, Dog responds correctly. ('Woof')", async () => {
        let dog = await Dog.deployed();
        let farmer = await Farmer.deployed();

        let farmerCallDog = await farmer.call(dog.address);
        assert.equal(farmerCallDog, dogCall, "Farmer can't call Dpg");
    });

    it("Farmer can feed Dog with 'meat', 'plant'.", async () => {
        let dog = await Dog.deployed();
        let farmer = await Farmer.deployed();

        let farmerFeedDogMeat = await farmer.feed(dog.address, "meat");
        assert.equal(farmerFeedDogMeat, dogEat, "Farmer can't feed Dog with 'meat'.");

        let farmerFeedDogPlant = await farmer.feed(dog.address, "plant");
        assert.equal(farmerFeedDogPlant, dogEat, "Farmer can't feed Dog with plant");

    });

    it("Farmer cannot feed Dog with 'not-food', 'plastic' and anything else.", async () => {
        let dog = await Dog.deployed();
        let farmer = await Farmer.deployed();
        let farmerFeedDog = await farmer.feed(dog.address, "xxxxx");
        assert.isTrue(farmerFeedDog.indexOf("xxxxx") < 0, "Farmer can feed Dog with anything else...");
    });
})

