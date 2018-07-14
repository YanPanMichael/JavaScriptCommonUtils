//多态

var makeSound = function(animal) {
    if(animal && typeof animal.sound === 'function') {
        animal.sound();
    }
}

var Duck = function() {}
Duck.prototype.sound = function() {
    console.log("gagaga");
}

var Chicken = function() {}
Chicken.prototype.sound = function() {
    console.log("ououou");
}

var Dog = function() {}
Dog.prototype.sound = function() {
    console.log("wangwangwang");
}

makeSound(new Duck());
makeSound(new Chicken());
makeSound(new Dog());