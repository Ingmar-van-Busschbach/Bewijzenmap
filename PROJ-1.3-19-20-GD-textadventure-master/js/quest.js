const imageLocation = document.getElementById('imageLocation');
const myInput = document.getElementById('myInput');
const myOptions = document.getElementById('possibilities');
const inv = document.getElementById('inv');
const ErrorMSG = document.getElementById("error");

let inventory = [];


class room {
    constructor(options, imagePath, items, requiredItem) {
        this.options = options;
        this.image = imagePath;
        this.items = items;
        this.requiredItem = requiredItem;
    }
}


// 3d array
let grid = [
    [
        ["1", "2", "3"],
        ["4", "5", "6"], // Floor 0
        ["7", "8", "9"]
    ],
    [
        ["10", "11", "12"],
        ["13", "14", "15"],  // FLoor 1
        ["16", "17", "18"]
    ],
];

let rooms = [];

rooms[1] = new room(["backward", "right"], "media/room1.png", [], "");
rooms[2] = new room(["left", "right", "backward"], "media/room2.png", ["Old Key"], "");
rooms[3] = new room(["left", "backward"], "media/room3.png", [], "Old Key");
rooms[4] = new room(["forward", "backward", "right"], "media/room4.png", [], "");
rooms[5] = new room(["left", "backward", "right", "forward"], "media/room5.png", [], "");
rooms[6] = new room(["left", "backward", "forward"], "media/room6.png", [], "");
rooms[7] = new room(["forward", "right"], "media/room7.png", ["New Key"], "");
rooms[8] = new room(["left", "right", "forward"], "media/room8.png", [], "");
rooms[9] = new room(["left", "forward", "up"], "media/room9.png", [], "");
rooms[10] = new room(["backward", "right"], "media/room10.png", [], "");
rooms[11] = new room(["left", "right", "backward"], "media/room11.png", [], "");
rooms[12] = new room(["left", "backward"], "media/room12.png", [], "");
rooms[13] = new room(["forward", "backward", "right"], "media/room13.png", [], "");
rooms[14] = new room(["left", "backward", "right", "forward"], "media/room14.png", [], "New Key");
rooms[15] = new room(["left", "backward", "forward"], "media/room15.png", [], "");
rooms[16] = new room(["right", "forward"], "media/room16.png", [], "");
rooms[17] = new room(["left", "right", "forward"], "media/room17.png", [], "");
rooms[18] = new room(["left", "forward", "down"], "media/room18.png", [], "");

let currentX = 0;
let currentY = 0;
let currentZ = 0;

function getPlayerRoom() {
    return grid[currentX][currentY][currentZ];
}

function forwarddate() {
    //forwarddate the image
    imageLocation.src = rooms[getPlayerRoom()].image;

    // forwarddate options text
    let optionsMSG = "";
    for (let i = 0; i < rooms[getPlayerRoom()].options.length; i++) {
        optionsMSG += "<li>" + rooms[getPlayerRoom()].options[i] + "</li>"
    }

    if (rooms[getPlayerRoom()].items.length != 0) {
        optionsMSG += "pickup ";
    }
    myOptions.innerHTML = optionsMSG;

    // forwarddate inventory
    let items = "";
    for (let i = 0; i < inventory.length; i++) {
        items += "<li>" + inventory[i] + "</li>";
        if (i + 1 < inventory.length) {
           items += " - "
        }
    }

    inv.innerHTML = items;
}
myInput.addEventListener('keydown', getInput, false);
function getInput(e) {
    if (e.key == "Enter") {
        let inputArray = myInput.value.split(" ");

        let isOption = false;
        for (let i = 0; i < rooms[getPlayerRoom()].options.length; i++) {
            if (rooms[getPlayerRoom()].options[i] == inputArray[0]) {
                isOption = true;
            }
        }

        if (rooms[getPlayerRoom()].items.length != 0) {
            if (inputArray[0] === "pickup") {
                isOption = true;
            }
        }

        if (isOption) {
            console.log("true")
            switch (inputArray[0]) {
                case "backward":
                    currentY += 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentY -= 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "right":
                    currentZ += 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            console.log("You are missing some items")
                            currentZ -= 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "left":
                    currentZ -= 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentZ += 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "forward":
                    currentY -= 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentY += 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "down":
                    currentX -= 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentX += 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "up":
                    currentX += 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentX -= 1;
                            invalidItems();

                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "pickup":
                    let item = Math.floor(Math.random() * rooms[getPlayerRoom()].items.length);
                    console.log(rooms[getPlayerRoom()].items[item]);
                    console.log(item);

                    // doe het item van de room in jou inventory.
                    inventory.push(rooms[getPlayerRoom()].items[item]);

                    // idk waarom maar zo remove je iets uit de items array van een room... "splice werkte niet"
                    rooms[getPlayerRoom()].items = rooms[getPlayerRoom()].items.filter(el => el !== rooms[getPlayerRoom()].items[item]);
                    break;
            }
        } else {
            ErrorMSG.innerHTML = "Invalid movement";

            setTimeout(function () {
                if (ErrorMSG.innerHTML == "Invalid movement") {
                    ErrorMSG.innerHTML = "";
                }
            }, 1500);
        }

        forwarddate();
        myInput.value = "";
    }
}

forwarddate();

function invalidItems() {
    ErrorMSG.innerHTML = "You are missing items to enter this room";

    setTimeout(function () {
        if (ErrorMSG.innerHTML == "You are missing items to enter this room") {
            ErrorMSG.innerHTML = "";
        }
    }, 3000);
}
