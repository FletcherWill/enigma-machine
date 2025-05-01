const stage = new Stage()
document.getElementById('svg-container').style.height = '1100%'

const letterToInt = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3
}

const intToLetter = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D'
}

// Keyboard buttons
const firstInstance = instances[0]
let keyLetter = firstInstance.signature('Key').join(firstInstance.field('letter')).tuples()[0].toString();
let newKeyLetter = 'A';

// Button information: coordinates and label
const buttonInfo = [
    { label: 'A', x: 50, y: 30 },
    { label: 'B', x: 100, y: 30 },
    { label: 'C', x: 150, y: 30 },
    { label: 'D', x: 200, y: 30 }
];

// Create the buttons dynamically
let buttons = buttonInfo.map(info => {
    let button = new Circle({
        radius: 20,
        color: 'white',
        borderColor: 'black',
        center: { x: info.x, y: info.y },
        label: info.label,
        labelColor: 'black'
    });

    // Change button color based on keyLetter
    if (keyLetter == `${info.label}0`) {
        button = new Circle({
            radius: 20,
            color: 'black',
            borderColor: 'black',
            center: { x: info.x, y: info.y },
            label: info.label,
            labelColor: 'white'
        });
    }

    return button;
});


const buttonPointInfo = [
    { x: 50, y: 60 },
    { x: 100, y: 60 },
    { x: 150, y: 60 },
    { x: 200, y: 60 }
]

let buttonPoints = buttonPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});


let plugboardUpPointInfo = [
    { x: 50, y: 80 },
    { x: 100, y: 80 },
    { x: 150, y: 80 },
    { x: 200, y: 80 }
]
let plugboardUpPoints = plugboardUpPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

buttonToPlugboardLineInfo = [
    { button: buttonPoints[0], plugboard: plugboardUpPoints[0] },
    { button: buttonPoints[1], plugboard: plugboardUpPoints[1] },
    { button: buttonPoints[2], plugboard: plugboardUpPoints[2] },
    { button: buttonPoints[3], plugboard: plugboardUpPoints[3] }
]
let buttonToPlugboardLines = buttonToPlugboardLineInfo.map(info => {
    return new Edge({
        obj1: info.button,
        obj2: info.plugboard,
        color: 'black',
        width: 1
    });
});

let plugboardInfo = [
    { label: 'A', x: 30, y: 90 },
    { label: 'B', x: 80, y: 90 },
    { label: 'C', x: 130, y: 90 },
    { label: 'D', x: 180, y: 90 }
]
let plugboard = plugboardInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});


const plugboardSwap = firstInstance.signature('Plugboard').join(firstInstance.field('swap')).tuples();

plugboardSwap.forEach(swap => {
    let [key, value] = swap.toString().split(', ');

    buttonToPlugboardLines[letterToInt[key[0]]].obj2 = plugboardUpPoints[letterToInt[value[0]]];

    if (key == keyLetter) {
        let idx = letterToInt[value[0]];
        plugboard[idx] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: plugboardInfo[idx].x, y: plugboardInfo[idx].y },
            color: 'black',
            borderColor: 'black',
            label: value[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        newKeyLetter = value;
    }
});

keyLetter = `${newKeyLetter}`;

plugboardDownPointInfo = [
    { x: 50, y: 140 },
    { x: 100, y: 140 },
    { x: 150, y: 140 },
    { x: 200, y: 140 }
]

plugboardDownPoints = plugboardDownPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

rotor1UpPointInfo = [
    { x: 50, y: 160 },
    { x: 100, y: 160 },
    { x: 150, y: 160 },
    { x: 200, y: 160 }
]
rotor1UpPoints = rotor1UpPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let plugboardToRotor1LineInfo = [
    { plugboard: plugboardDownPoints[0], rotor1: rotor1UpPoints[0] },
    { plugboard: plugboardDownPoints[1], rotor1: rotor1UpPoints[1] },
    { plugboard: plugboardDownPoints[2], rotor1: rotor1UpPoints[2] },
    { plugboard: plugboardDownPoints[3], rotor1: rotor1UpPoints[3] }
]
let plugboardToRotor1Lines = plugboardToRotor1LineInfo.map(info => {
    return new Edge({
        obj1: info.plugboard,
        obj2: info.rotor1,
        color: 'black',
        width: 1
    });
});

let rotor1Notch = firstInstance.signature('Rotor1').join(firstInstance.field('notch')).tuples()[0].toString();
keyLetter = `${intToLetter[(letterToInt[keyLetter[0]] + letterToInt[rotor1Notch[0]]) % 4]}0`


rotor1Info = [
    { label: intToLetter[(letterToInt[rotor1Notch[0]] + 0) % 4], x: 30, y: 170 },
    { label: intToLetter[(letterToInt[rotor1Notch[0]] + 1) % 4], x: 80, y: 170 },
    { label: intToLetter[(letterToInt[rotor1Notch[0]] + 2) % 4], x: 130, y: 170 },
    { label: intToLetter[(letterToInt[rotor1Notch[0]] + 3) % 4], x: 180, y: 170 }
]
let rotor1 = rotor1Info.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

let rotor1MidPoint1Info = [
    { x: 50, y: 220 },
    { x: 100, y: 220 },
    { x: 150, y: 220 },
    { x: 200, y: 220 }
]
let rotor1MidPoint1 = rotor1MidPoint1Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor1MidPoint2Info = [
    { x: 50, y: 240 },
    { x: 100, y: 240 },
    { x: 150, y: 240 },
    { x: 200, y: 240 }
]

let rotor1MidPoint2 = rotor1MidPoint2Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor1MidLineInfo = [
    { obj1: rotor1MidPoint1[0], obj2: rotor1MidPoint2[0] },
    { obj1: rotor1MidPoint1[1], obj2: rotor1MidPoint2[1] },
    { obj1: rotor1MidPoint1[2], obj2: rotor1MidPoint2[2] },
    { obj1: rotor1MidPoint1[3], obj2: rotor1MidPoint2[3] }
]
let rotor1MidLines = rotor1MidLineInfo.map(info => {
    return new Edge({
        obj1: info.obj1,
        obj2: info.obj2,
        color: 'black',
        width: 1
    });
});

let rotor1OutInfo = [
    {label: intToLetter[(letterToInt[rotor1Notch[0]] + 0) % 4], x: 30, y: 250},
    {label: intToLetter[(letterToInt[rotor1Notch[0]] + 1) % 4], x: 80, y: 250},
    {label: intToLetter[(letterToInt[rotor1Notch[0]] + 2) % 4], x: 130, y: 250},
    {label: intToLetter[(letterToInt[rotor1Notch[0]] + 3) % 4], x: 180, y: 250}
]
let rotor1Out = rotor1OutInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});


const rotor1Wiring = firstInstance.signature('Rotor1').join(firstInstance.field('internal_wiring')).tuples();

rotor1Wiring.forEach(wiring => {
    let [key, value] = wiring.toString().split(', ');

    let idxFrom = (letterToInt[key[0]] + 4 - letterToInt[rotor1Notch[0]]) % 4;
    let idxTo = (letterToInt[value[0]] + 4 - letterToInt[rotor1Notch[0]]) % 4;
    rotor1MidLines[idxFrom].obj2 = rotor1MidPoint2[idxTo];

    if (key == keyLetter) {
        rotor1[idxFrom] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor1Info[idxFrom].x, y: rotor1Info[idxFrom].y },
            color: 'black',
            borderColor: 'black',
            label: key[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        rotor1Out[idxTo] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor1OutInfo[idxTo].x, y: rotor1OutInfo[idxTo].y },
            color: 'black',
            borderColor: 'black',
            label: value[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        newKeyLetter = value;
    }
});

keyLetter = `${newKeyLetter}0`;

let rotor1DownPointInfo = [
    { x: 50, y: 300 },
    { x: 100, y: 300 },
    { x: 150, y: 300 },
    { x: 200, y: 300 }
]
let rotor1DownPoints = rotor1DownPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor2UpPointInfo = [
    { x: 50, y: 320 },
    { x: 100, y: 320 },
    { x: 150, y: 320 },
    { x: 200, y: 320 }
]
let rotor2UpPoints = rotor2UpPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor1ToRotor2LineInfo = [
    { rotor1: rotor1DownPoints[0], rotor2: rotor2UpPoints[0] },
    { rotor1: rotor1DownPoints[1], rotor2: rotor2UpPoints[1] },
    { rotor1: rotor1DownPoints[2], rotor2: rotor2UpPoints[2] },
    { rotor1: rotor1DownPoints[3], rotor2: rotor2UpPoints[3] }
]
let rotor1ToRotor2Lines = rotor1ToRotor2LineInfo.map(info => {
    return new Edge({
        obj1: info.rotor1,
        obj2: info.rotor2,
        color: 'black',
        width: 1
    });
});

let rotor2Notch = firstInstance.signature('Rotor2').join(firstInstance.field('notch')).tuples()[0].toString();
keyLetter = `${intToLetter[(letterToInt[keyLetter[0]] + letterToInt[rotor2Notch[0]] - letterToInt[rotor1Notch[0]]) % 4]}0`

let rotor2Info = [
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 0) % 4], x: 30, y: 330 },
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 1) % 4], x: 80, y: 330 },
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 2) % 4], x: 130, y: 330 },
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 3) % 4], x: 180, y: 330 }
]
let rotor2 = rotor2Info.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

let rotor2MidPoint1Info = [
    { x: 50, y: 380 },
    { x: 100, y: 380 },
    { x: 150, y: 380 },
    { x: 200, y: 380 }
]
let rotor2MidPoint1 = rotor2MidPoint1Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor2MidPoint2Info = [
    { x: 50, y: 400 },
    { x: 100, y: 400 },
    { x: 150, y: 400 },
    { x: 200, y: 400 }
]
let rotor2MidPoint2 = rotor2MidPoint2Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor2MidLineInfo = [
    { obj1: rotor2MidPoint1[0], obj2: rotor2MidPoint2[0] },
    { obj1: rotor2MidPoint1[1], obj2: rotor2MidPoint2[1] },
    { obj1: rotor2MidPoint1[2], obj2: rotor2MidPoint2[2] },
    { obj1: rotor2MidPoint1[3], obj2: rotor2MidPoint2[3] }
]
let rotor2MidLines = rotor2MidLineInfo.map(info => {
    return new Edge({
        obj1: info.obj1,
        obj2: info.obj2,
        color: 'black',
        width: 1
    });
});

let rotor2OutInfo = [
    {label: intToLetter[(letterToInt[rotor2Notch[0]] + 0) % 4], x: 30, y: 410},
    {label: intToLetter[(letterToInt[rotor2Notch[0]] + 1) % 4], x: 80, y: 410},
    {label: intToLetter[(letterToInt[rotor2Notch[0]] + 2) % 4], x: 130, y: 410},
    {label: intToLetter[(letterToInt[rotor2Notch[0]] + 3) % 4], x: 180, y: 410}
]
let rotor2Out = rotor2OutInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

const rotor2Wiring = firstInstance.signature('Rotor2').join(firstInstance.field('internal_wiring')).tuples();

rotor2Wiring.forEach(wiring => {
    let [key, value] = wiring.toString().split(', ');

    let idxFrom = (letterToInt[key[0]] + 4 - letterToInt[rotor2Notch[0]]) % 4;
    let idxTo = (letterToInt[value[0]] + 4 - letterToInt[rotor2Notch[0]]) % 4;
    rotor2MidLines[idxFrom].obj2 = rotor2MidPoint2[idxTo];

    if (key == keyLetter) {
        rotor2[idxFrom] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor2Info[idxFrom].x, y: rotor2Info[idxFrom].y },
            color: 'black',
            borderColor: 'black',
            label: key[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        rotor2Out[idxTo] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor2OutInfo[idxTo].x, y: rotor2OutInfo[idxTo].y },
            color: 'black',
            borderColor: 'black',
            label: value[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        newKeyLetter = value;
    }
});

keyLetter = `${newKeyLetter}0`;

let rotor2DownPointInfo = [
    { x: 50, y: 460 },
    { x: 100, y: 460 },
    { x: 150, y: 460 },
    { x: 200, y: 460 }
]
let rotor2DownPoints = rotor2DownPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor3UpPointInfo = [
    { x: 50, y: 480 },
    { x: 100, y: 480 },
    { x: 150, y: 480 },
    { x: 200, y: 480 }
]
let rotor3UpPoints = rotor3UpPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor2ToRotor3LineInfo = [
    { rotor2: rotor2DownPoints[0], rotor3: rotor3UpPoints[0] },
    { rotor2: rotor2DownPoints[1], rotor3: rotor3UpPoints[1] },
    { rotor2: rotor2DownPoints[2], rotor3: rotor3UpPoints[2] },
    { rotor2: rotor2DownPoints[3], rotor3: rotor3UpPoints[3] }
]
let rotor2ToRotor3Lines = rotor2ToRotor3LineInfo.map(info => {
    return new Edge({
        obj1: info.rotor2,
        obj2: info.rotor3,
        color: 'black',
        width: 1
    });
});

let rotor3Notch = firstInstance.signature('Rotor3').join(firstInstance.field('notch')).tuples()[0].toString();
keyLetter = `${intToLetter[(letterToInt[keyLetter[0]] + letterToInt[rotor3Notch[0]] - letterToInt[rotor2Notch[0]]) % 4]}0`

let rotor3Info = [
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 0) % 4], x: 30, y: 490 },
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 1) % 4], x: 80, y: 490 },
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 2) % 4], x: 130, y: 490 },
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 3) % 4], x: 180, y: 490 }
]
let rotor3 = rotor3Info.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

let rotor3MidPoint1Info = [
    { x: 50, y: 540 },
    { x: 100, y: 540 },
    { x: 150, y: 540 },
    { x: 200, y: 540 }
]   
let rotor3MidPoint1 = rotor3MidPoint1Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor3MidPoint2Info = [
    { x: 50, y: 560 },
    { x: 100, y: 560 },
    { x: 150, y: 560 },
    { x: 200, y: 560 }
]
let rotor3MidPoint2 = rotor3MidPoint2Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor3MidLineInfo = [
    { obj1: rotor3MidPoint1[0], obj2: rotor3MidPoint2[0] },
    { obj1: rotor3MidPoint1[1], obj2: rotor3MidPoint2[1] },
    { obj1: rotor3MidPoint1[2], obj2: rotor3MidPoint2[2] },
    { obj1: rotor3MidPoint1[3], obj2: rotor3MidPoint2[3] }
]
let rotor3MidLines = rotor3MidLineInfo.map(info => {
    return new Edge({
        obj1: info.obj1,
        obj2: info.obj2,
        color: 'black',
        width: 1
    });
});

let rotor3OutInfo = [
    {label: intToLetter[(letterToInt[rotor3Notch[0]] + 0) % 4], x: 30, y: 570},
    {label: intToLetter[(letterToInt[rotor3Notch[0]] + 1) % 4], x: 80, y: 570},
    {label: intToLetter[(letterToInt[rotor3Notch[0]] + 2) % 4], x: 130, y: 570},
    {label: intToLetter[(letterToInt[rotor3Notch[0]] + 3) % 4], x: 180, y: 570}
]
let rotor3Out = rotor3OutInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

let rotor3Wiring = firstInstance.signature('Rotor3').join(firstInstance.field('internal_wiring')).tuples();
rotor3Wiring.forEach(wiring => {
    let [key, value] = wiring.toString().split(', ');

    let idxFrom = (letterToInt[key[0]] + 4 - letterToInt[rotor3Notch[0]]) % 4;
    let idxTo = (letterToInt[value[0]] + 4 - letterToInt[rotor3Notch[0]]) % 4;
    rotor3MidLines[idxFrom].obj2 = rotor3MidPoint2[idxTo];

    if (key == keyLetter) {
        rotor3[idxFrom] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor3Info[idxFrom].x, y: rotor3Info[idxFrom].y },
            color: 'black',
            borderColor: 'black',
            label: key[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        rotor3Out[idxTo] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor3OutInfo[idxTo].x, y: rotor3OutInfo[idxTo].y },
            color: 'black',
            borderColor: 'black',
            label: value[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        newKeyLetter = value;
    }
});

keyLetter = `${newKeyLetter}`;

rotor3DownPointInfo = [
    { x: 50, y: 620 },
    { x: 100, y: 620 },
    { x: 150, y: 620 },
    { x: 200, y: 620 }
]
let rotor3DownPoints = rotor3DownPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let reflectorUpPointInfo = [
    { x: 50, y: 640 },
    { x: 100, y: 640 },
    { x: 150, y: 640 },
    { x: 200, y: 640 }
]
let reflectorUpPoints = reflectorUpPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor3ToReflectorLineInfo = [
    { rotor3: rotor3DownPoints[0], reflector: reflectorUpPoints[0] },
    { rotor3: rotor3DownPoints[1], reflector: reflectorUpPoints[1] },
    { rotor3: rotor3DownPoints[2], reflector: reflectorUpPoints[2] },
    { rotor3: rotor3DownPoints[3], reflector: reflectorUpPoints[3] }
]
let rotor3ToReflectorLines = rotor3ToReflectorLineInfo.map(info => {
    return new Edge({
        obj1: info.rotor3,
        obj2: info.reflector,
        color: 'black',
        width: 1
    });
});

keyLetter = `${intToLetter[(letterToInt[keyLetter[0]] + 4 - letterToInt[rotor3Notch[0]]) % 4]}0`

let reflectorInfo = [
    { label: 'A', x: 30, y: 650},
    { label: 'B', x: 80, y: 650},
    { label: 'C', x: 130, y: 650},
    { label: 'D', x: 180, y: 650}
]
let reflector = reflectorInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

let reflectorDownPointInfo = [
    { x: 50, y: 700 },
    { x: 100, y: 700 },
    { x: 150, y: 700 },
    { x: 200, y: 700 }
]
let reflectorDownPoints = reflectorDownPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let reflectorBotPointInfo = [
    { x: 290, y: 700 },
    { x: 340, y: 700 },
    { x: 390, y: 700 },
    { x: 440, y: 700 }
]
let reflectorBotPoints = reflectorBotPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let reflectorRightInfo = [
    { label: 'A', x: 270, y: 650 },
    { label: 'B', x: 320, y: 650 },
    { label: 'C', x: 370, y: 650 },
    { label: 'D', x: 420, y: 650 }
]
let reflectorRight = reflectorRightInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

let reflectorWiring = firstInstance.signature('Reflector').join(firstInstance.field('reflector_wiring')).tuples();
reflectorWiring.forEach(wiring => {
    let [key, value] = wiring.toString().split(', ');

    let idxFrom = letterToInt[key[0]];
    let idxTo = letterToInt[value[0]];
    if (key == keyLetter) {
        reflector[idxFrom] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: reflectorInfo[idxFrom].x, y: reflectorInfo[idxFrom].y },
            color: 'black',
            borderColor: 'black',
            label: key[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        reflectorRight[idxTo] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: reflectorRightInfo[idxTo].x, y: reflectorRightInfo[idxTo].y },
            color: 'black',
            borderColor: 'black',
            label: value[0],
            labelColor: 'white',
            labelLocation: 'center'
        });

        let connectLeftPoint = new Circle({
            radius: 0,
            center: { x: reflectorDownPointInfo[idxFrom].x + 20, y: reflectorDownPointInfo[idxFrom].y + 20},
            color: 'black'
        });
        let connectRightPoint = new Circle({
            radius: 0,
            center: { x: reflectorBotPointInfo[idxTo].x - 20, y: reflectorBotPointInfo[idxTo].y + 20},
            color: 'black'
        });
        let toLeftLine = new Edge({
            obj1: reflectorDownPoints[idxFrom],
            obj2: connectLeftPoint,
            color: 'black',
            width: 1
        });
        let toRightLine = new Edge({
            obj1: connectRightPoint,
            obj2: reflectorBotPoints[idxTo],
            color: 'black',
            width: 1
        });
        let leftToRightLine = new Edge({
            obj1: connectLeftPoint,
            obj2: connectRightPoint,
            color: 'black',
            width: 1
        });
        stage.add(connectLeftPoint);
        stage.add(connectRightPoint);
        stage.add(toLeftLine);
        stage.add(toRightLine);
        stage.add(leftToRightLine);
        newKeyLetter = value;
    }
});
keyLetter = `${newKeyLetter}`;

let reflectorTopPointInfo = [
    { x: 290, y: 640 },
    { x: 340, y: 640 },
    { x: 390, y: 640 },
    { x: 440, y: 640 }
]
let reflectorTopPoints = reflectorTopPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

// Now the way up
rotor3BotPointInfo = [
    { x: 290, y: 620 },
    { x: 340, y: 620 },
    { x: 390, y: 620 },
    { x: 440, y: 620 }
]
let rotor3BotPoints = rotor3BotPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let reflectorToRotor3LineInfo = [
    { reflector: reflectorTopPoints[0], rotor3: rotor3BotPoints[0] },
    { reflector: reflectorTopPoints[1], rotor3: rotor3BotPoints[1] },
    { reflector: reflectorTopPoints[2], rotor3: rotor3BotPoints[2] },
    { reflector: reflectorTopPoints[3], rotor3: rotor3BotPoints[3] }
]
let reflectorToRotor3Lines = reflectorToRotor3LineInfo.map(info => {
    return new Edge({
        obj1: info.reflector,
        obj2: info.rotor3,
        color: 'black',
        width: 1
    });
});

keyLetter = `${intToLetter[(letterToInt[keyLetter[0]] + letterToInt[rotor3Notch[0]]) % 4]}0`

let rotor3RightInfo = [
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 0) % 4], x: 270, y: 570 },
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 1) % 4], x: 320, y: 570 },
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 2) % 4], x: 370, y: 570 },
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 3) % 4], x: 420, y: 570 }
]
let rotor3Right = rotor3RightInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

let rotor3MidRightPoint1Info = [
    { x: 290, y: 560 },
    { x: 340, y: 560 },
    { x: 390, y: 560 },
    { x: 440, y: 560 }
]
let rotor3MidRightPoint1 = rotor3MidRightPoint1Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor3MidRightPoint2Info = [
    { x: 290, y: 540 },
    { x: 340, y: 540 },
    { x: 390, y: 540 },
    { x: 440, y: 540 }
]
let rotor3MidRightPoint2 = rotor3MidRightPoint2Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor3MidRightLineInfo = [
    { obj1: rotor3MidRightPoint1[0], obj2: rotor3MidRightPoint2[0] },
    { obj1: rotor3MidRightPoint1[1], obj2: rotor3MidRightPoint2[1] },
    { obj1: rotor3MidRightPoint1[2], obj2: rotor3MidRightPoint2[2] },
    { obj1: rotor3MidRightPoint1[3], obj2: rotor3MidRightPoint2[3] }
]
let rotor3MidRightLines = rotor3MidRightLineInfo.map(info => {
    return new Edge({
        obj1: info.obj1,
        obj2: info.obj2,
        color: 'black',
        width: 1
    });
});

let rotor3OutRightInfo = [
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 0) % 4], x: 270, y: 490},
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 1) % 4], x: 320, y: 490},
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 2) % 4], x: 370, y: 490},
    { label: intToLetter[(letterToInt[rotor3Notch[0]] + 3) % 4], x: 420, y: 490}
]
let rotor3OutRight = rotor3OutRightInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

rotor3Wiring.forEach(wiring => {
    let [key, value] = wiring.toString().split(', ');
    
    let idxFrom = (letterToInt[key[0]] + 4 - letterToInt[rotor3Notch[0]]) % 4;
    let idxTo = (letterToInt[value[0]] + 4 - letterToInt[rotor3Notch[0]]) % 4;
    rotor3MidRightLines[idxFrom].obj2 = rotor3MidRightPoint2[idxTo];
    
    if (key == keyLetter) {
        rotor3Right[idxFrom] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor3RightInfo[idxFrom].x, y: rotor3RightInfo[idxFrom].y },
            color: 'black',
            borderColor: 'black',
            label: key[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        rotor3OutRight[idxTo] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor3OutRightInfo[idxTo].x, y: rotor3OutRightInfo[idxTo].y },
            color: 'black',
            borderColor: 'black',
            label: value[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        newKeyLetter = value;
    }
});
keyLetter = `${newKeyLetter}`;

let rotor3TopPointInfo = [
    { x: 290, y: 480 },
    { x: 340, y: 480 },
    { x: 390, y: 480 },
    { x: 440, y: 480 }
]
let rotor3TopPoints = rotor3TopPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor2BotPointInfo = [
    { x: 290, y: 460 },
    { x: 340, y: 460 },
    { x: 390, y: 460 },
    { x: 440, y: 460 }
]
let rotor2BotPoints = rotor2BotPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor3ToRotor2LineInfo = [
    { rotor3: rotor3TopPoints[0], rotor2: rotor2BotPoints[0] },
    { rotor3: rotor3TopPoints[1], rotor2: rotor2BotPoints[1] },
    { rotor3: rotor3TopPoints[2], rotor2: rotor2BotPoints[2] },
    { rotor3: rotor3TopPoints[3], rotor2: rotor2BotPoints[3] }
]
let rotor3ToRotor2Lines = rotor3ToRotor2LineInfo.map(info => {
    return new Edge({
        obj1: info.rotor3,
        obj2: info.rotor2,
        color: 'black',
        width: 1
    });
});

keyLetter = `${intToLetter[(letterToInt[keyLetter[0]] + letterToInt[rotor2Notch[0]] - letterToInt[rotor3Notch[0]]) % 4]}0`

let rotor2RightInfo = [
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 0) % 4], x: 270, y: 410 },
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 1) % 4], x: 320, y: 410 },
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 2) % 4], x: 370, y: 410 },
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 3) % 4], x: 420, y: 410 }
]
let rotor2Right = rotor2RightInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

let rotor2MidRightPoint1Info = [
    { x: 290, y: 400 },
    { x: 340, y: 400 },
    { x: 390, y: 400 },
    { x: 440, y: 400 }
]
let rotor2MidRightPoint1 = rotor2MidRightPoint1Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor2MidRightPoint2Info = [
    { x: 290, y: 380 },
    { x: 340, y: 380 },
    { x: 390, y: 380 },
    { x: 440, y: 380 }
]
let rotor2MidRightPoint2 = rotor2MidRightPoint2Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor2MidRightLineInfo = [
    { obj1: rotor2MidRightPoint1[0], obj2: rotor2MidRightPoint2[0] },
    { obj1: rotor2MidRightPoint1[1], obj2: rotor2MidRightPoint2[1] },
    { obj1: rotor2MidRightPoint1[2], obj2: rotor2MidRightPoint2[2] },
    { obj1: rotor2MidRightPoint1[3], obj2: rotor2MidRightPoint2[3] }
]
let rotor2MidRightLines = rotor2MidRightLineInfo.map(info => {
    return new Edge({
        obj1: info.obj1,
        obj2: info.obj2,
        color: 'black',
        width: 1
    });
});

let rotor2OutRightInfo = [
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 0) % 4], x: 270, y: 330 },
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 1) % 4], x: 320, y: 330 },
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 2) % 4], x: 370, y: 330 },
    { label: intToLetter[(letterToInt[rotor2Notch[0]] + 3) % 4], x: 420, y: 330 }
]
let rotor2OutRight = rotor2OutRightInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

rotor2Wiring.forEach(wiring => {
    let [key, value] = wiring.toString().split(', ');

    let idxFrom = (letterToInt[key[0]] + 4 - letterToInt[rotor2Notch[0]]) % 4;
    let idxTo = (letterToInt[value[0]] + 4 - letterToInt[rotor2Notch[0]]) % 4;
    rotor2MidRightLines[idxFrom].obj2 = rotor2MidRightPoint2[idxTo];

    if (key == keyLetter) {
        rotor2Right[idxFrom] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor2RightInfo[idxFrom].x, y: rotor2RightInfo[idxFrom].y },
            color: 'black',
            borderColor: 'black',
            label: key[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        rotor2OutRight[idxTo] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor2OutRightInfo[idxTo].x, y: rotor2OutRightInfo[idxTo].y },
            color: 'black',
            borderColor: 'black',
            label: value[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        newKeyLetter = value;
    }
});
keyLetter = `${newKeyLetter}`;

let rotor2TopPointInfo = [
    { x: 290, y: 320 },
    { x: 340, y: 320 },
    { x: 390, y: 320 },
    { x: 440, y: 320 }
]
let rotor2TopPoints = rotor2TopPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor1BotPointInfo = [
    { x: 290, y: 300 },
    { x: 340, y: 300 },
    { x: 390, y: 300 },
    { x: 440, y: 300 }
]
let rotor1BotPoints = rotor1BotPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor2ToRotor1LineInfo = [
    { rotor2: rotor2TopPoints[0], rotor1: rotor1BotPoints[0] },
    { rotor2: rotor2TopPoints[1], rotor1: rotor1BotPoints[1] },
    { rotor2: rotor2TopPoints[2], rotor1: rotor1BotPoints[2] },
    { rotor2: rotor2TopPoints[3], rotor1: rotor1BotPoints[3] }
]
let rotor2ToRotor1Lines = rotor2ToRotor1LineInfo.map(info => {
    return new Edge({
        obj1: info.rotor2,
        obj2: info.rotor1,
        color: 'black',
        width: 1
    });
});

keyLetter = `${intToLetter[(letterToInt[keyLetter[0]] + letterToInt[rotor1Notch[0]] - letterToInt[rotor2Notch[0]]) % 4]}0`

let rotor1RightInfo = [
    { label: intToLetter[(letterToInt[rotor1Notch[0]] + 0) % 4], x: 270, y: 250 },
    { label: intToLetter[(letterToInt[rotor1Notch[0]] + 1) % 4], x: 320, y: 250 },
    { label: intToLetter[(letterToInt[rotor1Notch[0]] + 2) % 4], x: 370, y: 250 },
    { label: intToLetter[(letterToInt[rotor1Notch[0]] + 3) % 4], x: 420, y: 250 }
]
let rotor1Right = rotor1RightInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

let rotor1MidRightPoint1Info = [
    { x: 290, y: 240 },
    { x: 340, y: 240 },
    { x: 390, y: 240 },
    { x: 440, y: 240 }
]
let rotor1MidRightPoint1 = rotor1MidRightPoint1Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor1MidRightPoint2Info = [
    { x: 290, y: 220 },
    { x: 340, y: 220 },
    { x: 390, y: 220 },
    { x: 440, y: 220 }
]
let rotor1MidRightPoint2 = rotor1MidRightPoint2Info.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor1MidRightLineInfo = [
    { obj1: rotor1MidRightPoint1[0], obj2: rotor1MidRightPoint2[0] },
    { obj1: rotor1MidRightPoint1[1], obj2: rotor1MidRightPoint2[1] },
    { obj1: rotor1MidRightPoint1[2], obj2: rotor1MidRightPoint2[2] },
    { obj1: rotor1MidRightPoint1[3], obj2: rotor1MidRightPoint2[3] }
]
let rotor1MidRightLines = rotor1MidRightLineInfo.map(info => {
    return new Edge({
        obj1: info.obj1,
        obj2: info.obj2,
        color: 'black',
        width: 1
    });
});

let rotor1OutRightInfo = [
    {label: intToLetter[(letterToInt[rotor1Notch[0]] + 0) % 4], x: 270, y: 170},
    {label: intToLetter[(letterToInt[rotor1Notch[0]] + 1) % 4], x: 320, y: 170},
    {label: intToLetter[(letterToInt[rotor1Notch[0]] + 2) % 4], x: 370, y: 170},
    {label: intToLetter[(letterToInt[rotor1Notch[0]] + 3) % 4], x: 420, y: 170}
]
let rotor1OutRight = rotor1OutRightInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

rotor1Wiring.forEach(wiring => {
    let [key, value] = wiring.toString().split(', ');

    let idxFrom = (letterToInt[key[0]] + 4 - letterToInt[rotor1Notch[0]]) % 4;
    let idxTo = (letterToInt[value[0]] + 4 - letterToInt[rotor1Notch[0]]) % 4;
    rotor1MidRightLines[idxFrom].obj2 = rotor1MidRightPoint2[idxTo];

    if (key == keyLetter) {
        rotor1Right[idxFrom] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor1RightInfo[idxFrom].x, y: rotor1RightInfo[idxFrom].y },
            color: 'black',
            borderColor: 'black',
            label: key[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        rotor1OutRight[idxTo] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: rotor1OutRightInfo[idxTo].x, y: rotor1OutRightInfo[idxTo].y },
            color: 'black',
            borderColor: 'black',
            label: value[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        newKeyLetter = value;
    }
});
keyLetter = `${newKeyLetter}`;

let rotor1TopPointInfo = [
    { x: 290, y: 160 },
    { x: 340, y: 160 },
    { x: 390, y: 160 },
    { x: 440, y: 160 }
]
let rotor1TopPoints = rotor1TopPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let plugboardBotPointInfo = [
    { x: 290, y: 140 },
    { x: 340, y: 140 },
    { x: 390, y: 140 },
    { x: 440, y: 140 }
]
let plugboardBotPoints = plugboardBotPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let rotor1ToPlugboardLineInfo = [
    { rotor1: rotor1TopPoints[0], plugboard: plugboardBotPoints[0] },
    { rotor1: rotor1TopPoints[1], plugboard: plugboardBotPoints[1] },
    { rotor1: rotor1TopPoints[2], plugboard: plugboardBotPoints[2] },
    { rotor1: rotor1TopPoints[3], plugboard: plugboardBotPoints[3] }
]
let rotor1ToPlugboardLines = rotor1ToPlugboardLineInfo.map(info => {
    return new Edge({
        obj1: info.rotor1,
        obj2: info.plugboard,
        color: 'black',
        width: 1
    });
});

keyLetter = `${intToLetter[(letterToInt[keyLetter[0]] + 4 - letterToInt[rotor1Notch[0]]) % 4]}0`

let plugboardRightInfo = [
    { label: 'A', x: 270, y: 90 },
    { label: 'B', x: 320, y: 90 },
    { label: 'C', x: 370, y: 90 },
    { label: 'D', x: 420, y: 90 }
]
let plugboardRight = plugboardRightInfo.map(info => {
    return new Rectangle({
        width: 40,
        height: 40,
        coords: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});

let plugboardTopPointInfo = [
    { x: 290, y: 80 },
    { x: 340, y: 80 },
    { x: 390, y: 80 },
    { x: 440, y: 80 }
]
let plugboardTopPoints = plugboardTopPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let outputPointInfo = [
    { x: 290, y: 60 },
    { x: 340, y: 60 },
    { x: 390, y: 60 },
    { x: 440, y: 60 }
]
let outputPoints = outputPointInfo.map(info => {
    return new Circle({
        radius: 0,
        center: { x: info.x, y: info.y },
        color: 'black'
    });
});

let plugboardToOutputLineInfo = [
    { plugboard: plugboardTopPoints[0], output: outputPoints[0] },
    { plugboard: plugboardTopPoints[1], output: outputPoints[1] },
    { plugboard: plugboardTopPoints[2], output: outputPoints[2] },
    { plugboard: plugboardTopPoints[3], output: outputPoints[3] }
]
let plugboardToOutputLines = plugboardToOutputLineInfo.map(info => {
    return new Edge({
        obj1: info.plugboard,
        obj2: info.output,
        color: 'black',
        width: 1
    });
});

let outputInfo = [
    { label: 'A', x: 290, y: 30 },
    { label: 'B', x: 340, y: 30 },
    { label: 'C', x: 390, y: 30 },
    { label: 'D', x: 440, y: 30 }
]
let output = outputInfo.map(info => {
    return new Circle({
        radius: 20,
        center: { x: info.x, y: info.y },
        color: 'white',
        borderColor: 'black',
        label: info.label,
        labelColor: 'black',
        labelLocation: 'center'
    });
});


plugboardSwap.forEach(swap => {
    let [key, value] = swap.toString().split(', ');

    let idxFrom = letterToInt[key[0]];
    let idxTo = letterToInt[value[0]];
    plugboardToOutputLines[idxFrom].obj2 = outputPoints[idxTo];

    if (key == keyLetter) {
        plugboardRight[idxFrom] = new Rectangle({
            width: 40,
            height: 40,
            coords: { x: plugboardRightInfo[idxFrom].x, y: plugboardRightInfo[idxFrom].y },
            color: 'black',
            borderColor: 'black',
            label: key[0],
            labelColor: 'white',
            labelLocation: 'center'
        });
        output[idxTo] = new Circle({
            radius: 20,
            center: { x: outputInfo[idxTo].x, y: outputInfo[idxTo].y },
            color: 'black',
            borderColor: 'black',
            label: value[0],
            labelColor: 'white',
            labelLocation: 'center'
        });

        newKeyLetter = value;
    }
});
keyLetter = `${newKeyLetter}`;


let debugRectangle = new Rectangle({
    width: 40,
    height: 40,
    coords: { x: 300, y: 800 },
    color: 'white',
    borderColor: 'black',
    label: keyLetter,
    labelColor: 'black',
    labelLocation: 'center'
});

stage.add(debugRectangle);


buttons.forEach(button => stage.add(button));
buttonPoints.forEach(point => stage.add(point));
plugboardUpPoints.forEach(point => stage.add(point));
buttonToPlugboardLines.forEach(line => stage.add(line));
plugboard.forEach(rect => stage.add(rect));
plugboardDownPoints.forEach(point => stage.add(point));
rotor1UpPoints.forEach(point => stage.add(point));
plugboardToRotor1Lines.forEach(line => stage.add(line));
rotor1.forEach(rect => stage.add(rect));
rotor1MidPoint1.forEach(point => stage.add(point));
rotor1MidPoint2.forEach(point => stage.add(point));
rotor1MidLines.forEach(line => stage.add(line));
rotor1Out.forEach(rect => stage.add(rect));
rotor1DownPoints.forEach(point => stage.add(point));
rotor2UpPoints.forEach(point => stage.add(point));
rotor1ToRotor2Lines.forEach(line => stage.add(line));
rotor2.forEach(rect => stage.add(rect));
rotor2MidPoint1.forEach(point => stage.add(point));
rotor2MidPoint2.forEach(point => stage.add(point));
rotor2MidLines.forEach(line => stage.add(line));
rotor2Out.forEach(rect => stage.add(rect));
rotor2DownPoints.forEach(point => stage.add(point));
rotor3UpPoints.forEach(point => stage.add(point));
rotor2ToRotor3Lines.forEach(line => stage.add(line));
rotor3.forEach(rect => stage.add(rect));
rotor3MidPoint1.forEach(point => stage.add(point));
rotor3MidPoint2.forEach(point => stage.add(point));
rotor3MidLines.forEach(line => stage.add(line));
rotor3Out.forEach(rect => stage.add(rect));
rotor3DownPoints.forEach(point => stage.add(point));
reflectorUpPoints.forEach(point => stage.add(point));
rotor3ToReflectorLines.forEach(line => stage.add(line));
reflector.forEach(rect => stage.add(rect));
reflectorRight.forEach(rect => stage.add(rect));
rotor3BotPoints.forEach(point => stage.add(point));
reflectorToRotor3Lines.forEach(line => stage.add(line));
rotor3Right.forEach(rect => stage.add(rect));
rotor3MidRightPoint1.forEach(point => stage.add(point));
rotor3MidRightPoint2.forEach(point => stage.add(point));
rotor3MidRightLines.forEach(line => stage.add(line));
rotor3OutRight.forEach(rect => stage.add(rect));
rotor3TopPoints.forEach(point => stage.add(point));
rotor2BotPoints.forEach(point => stage.add(point));
rotor3ToRotor2Lines.forEach(line => stage.add(line));
rotor2Right.forEach(rect => stage.add(rect));
rotor2MidRightPoint1.forEach(point => stage.add(point));
rotor2MidRightPoint2.forEach(point => stage.add(point));
rotor2MidRightLines.forEach(line => stage.add(line));
rotor2OutRight.forEach(rect => stage.add(rect));
rotor2TopPoints.forEach(point => stage.add(point));
rotor1BotPoints.forEach(point => stage.add(point));
rotor2ToRotor1Lines.forEach(line => stage.add(line));
rotor1Right.forEach(rect => stage.add(rect));
rotor1MidRightPoint1.forEach(point => stage.add(point));
rotor1MidRightPoint2.forEach(point => stage.add(point));
rotor1MidRightLines.forEach(line => stage.add(line));
rotor1OutRight.forEach(rect => stage.add(rect));
rotor1TopPoints.forEach(point => stage.add(point));
rotor1ToPlugboardLines.forEach(line => stage.add(line));
plugboardBotPoints.forEach(point => stage.add(point));
plugboardToOutputLines.forEach(line => stage.add(line));
plugboardRight.forEach(rect => stage.add(rect));
outputPoints.forEach(point => stage.add(point));
plugboardTopPoints.forEach(point => stage.add(point));
output.forEach(circle => stage.add(circle));

stage.render(svg, document)