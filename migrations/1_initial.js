var StringComparer = artifacts.require("StringComparer");
var Farmer = artifacts.require("Farmer");
var Horse = artifacts.require("Horse");
var Wolf = artifacts.require("Wolf");
var Cow = artifacts.require("Cow");

var Dog = artifacts.require("Dog");


module.exports = async (deployer) => {
    await deployer.deploy(StringComparer);
    await deployer.link(StringComparer, [Cow, Horse, Wolf, Dog]);
    await deployer.deploy(Cow, "Milka");
    await deployer.deploy(Horse, "Blyskavka");
    await deployer.deploy(Dog, "Bro");
    await deployer.deploy(Wolf);
    await deployer.deploy(Farmer);


    farmer = await Farmer.deployed();
    wolf = await Wolf.deployed();
    horse = await Horse.deployed();
    cow = await Cow.deployed();

    console.log("!!!!!!Cow say:", await farmer.call(cow.address));
    console.log("!!!!!!Horse say say:", await farmer.call(horse.address));

    console.log("------------------");
    console.log(horse);
    console.log("+++++++++++++");
    console.log(await horse.getName());

   // console.log("!!!!!!Cow say:", await farmer.feed(wolf.address, "plant"));

    try {
        let feedResult = await farmer.feed(wolf.address, "meat");
        console.log(feedResult);
    } catch (e) {
        console.log(e.message);
    }

    try {
        let feedResult = await farmer.feed(wolf.address, "plant");
        console.log(feedResult);
    } catch (e) {
        console.log(e.message);
    }
   





}

