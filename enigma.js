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

const NUM_KEYS = 4;

const colors = [ 'black', 'red', 'green', 'blue' ]

for (let i = 0; i < instances.length; i++) {
    const instance = instances[i]

    let buttons = Array.from({ length: NUM_KEYS}, (_, index) => 
        new Circle({
            radius: 20,
            color: 'white',
            borderColor: colors[index],
            center: { x: 50 + index * 50, y: 30 + 800*i },
            label: intToLetter[index],
            labelColor: 'black'
        })
    );
    buttons.forEach(button => stage.add(button));

    let upFromButton = Array.from({ length: NUM_KEYS}, (_, index) => 
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 60 + 800*i },
            color: 'black'
        })
    );
    let downToPlugboard = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 80 + 800*i },
            color: 'black'
        })
    );
    let plugboardPermutation = instance.signature('Plugboard').join(instance.field('map')).tuples();
    let buttonToPlugboardLines = Array.from({length: NUM_KEYS}, (_, index) => 
        new Edge({
            obj1: upFromButton[index],
            obj2: downToPlugboard[index],
            color: 'black',
            width: 1
        })
    );

    let plugboardColors = ['black', 'black', 'black', 'black'];
    let plugboardKeys = [0, 1, 2, 3];
    plugboardPermutation.forEach(swap => {
        let [fro, to] = swap.toString().split(', ').map(Number).map(x => x + 2);
        plugboardColors[to] = colors[fro];
        buttonToPlugboardLines[fro].obj2 = downToPlugboard[to];
    });

    let plugboard = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 30 + index * 50, y: 90 + 800*i },
            color: 'white',
            borderColor: plugboardColors[index],
            label: intToLetter[index],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    buttonToPlugboardLines.forEach(line => stage.add(line));
    plugboard.forEach(plug => stage.add(plug));

    upFromPlugboard = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 140 + 800*i },
            color: 'black'
        })
    );
    downToRotor1 = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 160 + 800*i },
            color: 'black'
        })
    );
    plugboardToRotor1Lines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: upFromPlugboard[index],
            obj2: downToRotor1[index],
            color: 'black',
            width: 1
        })
    );
    let rotor1Start = Number(instance.signature('Rotor1').join(instance.field('start')).tuples()[0]) + 2;
    let rotor1Keys = plugboardKeys.map(key => (key + rotor1Start) % NUM_KEYS);
    let rotor1Colors = plugboardColors;
    let rotor1 = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 30 + index * 50, y: 170 + 800*i },
            color: 'white',
            borderColor: rotor1Colors[index],
            label: intToLetter[rotor1Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    plugboardToRotor1Lines.forEach(line => stage.add(line));
    rotor1.forEach(rotor => stage.add(rotor));

    upFromRotor1Mid = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 220 + 800*i },
            color: 'black'
        })
    );
    let downToRotor1Mid = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 240 + 800*i },
            color: 'black'
        })
    );
    let rotor1MidUpToDownLines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: upFromRotor1Mid[index],
            obj2: downToRotor1Mid[index],
            color: 'black',
            width: 1
        })
    );

    let rotor1Permutation = instance.signature('Rotor1').join(instance.field('map')).tuples();
    let rotor1OutDownColors = ['black', 'black', 'black', 'black'];    
    rotor1Permutation.forEach(swap => {
        let [fro, to] = swap.toString().split(', ').map(Number).map(x => (x + 2 - rotor1Start + NUM_KEYS) % NUM_KEYS);
        rotor1OutDownColors[to] = rotor1Colors[fro];
        rotor1MidUpToDownLines[fro].obj2 = downToRotor1Mid[to];
    });

    let rotor1OutDown = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 30 + index * 50, y: 250 + 800*i },
            color: 'white',
            borderColor: rotor1OutDownColors[index],
            label: intToLetter[rotor1Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );

    rotor1MidUpToDownLines.forEach(line => stage.add(line));
    rotor1OutDown.forEach(rotor => stage.add(rotor));

    let upFromRotor1 = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 300 + 800*i },
            color: 'black'
        })
    );
    let downToRotor2 = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 320 + 800*i },
            color: 'black'
        })
    );
    let rotor1ToRotor2Lines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: upFromRotor1[index],
            obj2: downToRotor2[index],
            color: 'black',
            width: 1
        })
    );
    rotor1ToRotor2Lines.forEach(line => stage.add(line));

    let rotor2Start = Number(instance.signature('Rotor2').join(instance.field('start')).tuples()[0]) + 2;
    let rotor2Keys = plugboardKeys.map(key => (key + rotor2Start) % NUM_KEYS);
    let rotor2Colors = rotor1OutDownColors;
    rotor2 = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 30 + index * 50, y: 330 + 800*i },
            color: 'white',
            borderColor: rotor2Colors[index],
            label: intToLetter[rotor2Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    rotor2.forEach(rotor => stage.add(rotor));

    let upFromRotor2Mid = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 380 + 800*i },
            color: 'black'
        })
    );
    let downToRotor2Mid = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 400 + 800*i },
            color: 'black'
        })
    );
    let rotor2MidUpToDownLines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: upFromRotor2Mid[index],
            obj2: downToRotor2Mid[index],
            color: 'black',
            width: 1
        })
    );
    let rotor2Permutation = instance.signature('Rotor2').join(instance.field('map')).tuples();
    let rotor2OutDownColors = ['black', 'black', 'black', 'black'];
    rotor2Permutation.forEach(swap => {
        let [fro, to] = swap.toString().split(', ').map(Number).map(x => (x + 2 - rotor2Start + NUM_KEYS) % NUM_KEYS);
        rotor2OutDownColors[to] = rotor2Colors[fro];
        rotor2MidUpToDownLines[fro].obj2 = downToRotor2Mid[to];
    });
    let rotor2OutDown = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 30 + index * 50, y: 410 + 800*i },
            color: 'white',
            borderColor: rotor2OutDownColors[index],
            label: intToLetter[rotor2Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    rotor2MidUpToDownLines.forEach(line => stage.add(line));
    rotor2OutDown.forEach(rotor => stage.add(rotor));

    let upFromRotor2 = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 460 + 800*i },
            color: 'black'
        })
    );
    let downToRotor3 = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 480 + 800*i },
            color: 'black'
        })
    );
    let rotor2ToRotor3Lines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: upFromRotor2[index],
            obj2: downToRotor3[index],
            color: 'black',
            width: 1
        })
    );
    rotor2ToRotor3Lines.forEach(line => stage.add(line));

    let rotor3Start = Number(instance.signature('Rotor3').join(instance.field('start')).tuples()[0]) + 2;
    let rotor3Keys = plugboardKeys.map(key => (key + rotor3Start) % NUM_KEYS);
    let rotor3Colors = rotor2OutDownColors;

    rotor3 = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 30 + index * 50, y: 490 + 800*i },
            color: 'white',
            borderColor: rotor3Colors[index],
            label: intToLetter[rotor3Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    rotor3.forEach(rotor => stage.add(rotor));

    let upFromRotor3Mid = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 540 + 800*i },
            color: 'black'
        })
    );
    let downToRotor3Mid = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 560 + 800*i },
            color: 'black'
        })
    );
    let rotor3MidUpToDownLines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: upFromRotor3Mid[index],
            obj2: downToRotor3Mid[index],
            color: 'black',
            width: 1
        })
    );

    let rotor3Permutation = instance.signature('Rotor3').join(instance.field('map')).tuples();
    let rotor3OutDownColors = ['black', 'black', 'black', 'black'];

    rotor3Permutation.forEach(swap => {
        let [fro, to] = swap.toString().split(', ').map(Number).map(x => (x + 2 - rotor3Start + NUM_KEYS) % NUM_KEYS);
        rotor3OutDownColors[to] = rotor3Colors[fro];
        rotor3MidUpToDownLines[fro].obj2 = downToRotor3Mid[to];
    });

    let rotor3OutDown = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 30 + index * 50, y: 570 + 800*i },
            color: 'white',
            borderColor: rotor3OutDownColors[index],
            label: intToLetter[rotor3Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    rotor3MidUpToDownLines.forEach(line => stage.add(line));
    rotor3OutDown.forEach(rotor => stage.add(rotor));

    let upFromRotor3 = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 610 + 800*i },
            color: 'black'
        })
    );
    let downTo = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 50 + index * 50, y: 650 + 50*index + 800*i },
            color: 'black'
        })
    );
    let rightTo = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 240, y: 650 + 50*index + 800*i },
            color: 'black'
        })
    );
    let rotor3ToDown = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: upFromRotor3[index],
            obj2: downTo[index],
            color: 'black',
            width: 1
        })
    );
    let downToRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: downTo[index],
            obj2: rightTo[index],
            color: 'black',
            width: 1
        })
    );
    rotor3ToDown.forEach(line => stage.add(line));
    downToRight.forEach(line => stage.add(line));

    let reflectorColors = rotor3OutDownColors;
    let reflectorLeft = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 240, y: 630 + 50*index + 800*i },
            color: 'white',
            borderColor: reflectorColors[index],
            label: intToLetter[index],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    reflectorLeft.forEach(reflector => stage.add(reflector));

    let leftFromReflector = Array.from({ length: NUM_KEYS}, (_, index) => 
        new Circle({
            radius: 0,
            center: { x: 290, y: 650 + 50*index + 800*i },
            color: 'black'
        })
    );
    let rightToReflector = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 310, y: 650 + 50*index + 800*i },
            color: 'black'
        })
    );
    let reflectorToRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: leftFromReflector[index],
            obj2: rightToReflector[index],
            color: 'black',
            width: 1
        })
    );

    let reflectorPermutation = instance.signature('Reflector').join(instance.field('map')).tuples();
    let reflectorRightColors = ['black', 'black', 'black', 'black'];
    reflectorPermutation.forEach(swap => {
        let [fro, to] = swap.toString().split(', ').map(Number).map(x => x + 2);
        reflectorRightColors[to] = reflectorColors[fro];
        reflectorToRight[fro].obj2 = rightToReflector[to];
    });
    let reflectorRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 320, y: 630 + 50*index + 800*i },
            color: 'white',
            borderColor: reflectorRightColors[index],
            label: intToLetter[index],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    reflectorToRight.forEach(line => stage.add(line));
    reflectorRight.forEach(reflector => stage.add(reflector));

    let leftFrom = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 360, y: 650 + 50*index + 800*i },
            color: 'black'
        })
    );
    let downFrom = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 650 + 50*index + 800*i },
            color: 'black'
        })
    );
    let upTo = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 610 + 800*i },
            color: 'black'
        })
    );
    let leftToDown = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: leftFrom[index],
            obj2: downFrom[index],
            color: 'black',
            width: 1
        })
    );
    let downToRotor3Right = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: downFrom[index],
            obj2: upTo[index],
            color: 'black',
            width: 1
        })
    );
    leftToDown.forEach(line => stage.add(line));
    downToRotor3Right.forEach(line => stage.add(line));

    let rotor3RightColors = reflectorRightColors;
    let rotor3Right = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 380 + 50*index, y: 570 + 800*i },
            color: 'white',
            borderColor: rotor3RightColors[index],
            label: intToLetter[rotor3Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    rotor3Right.forEach(rotor => stage.add(rotor));

    let downFromRotor3MidRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 560 + 800*i },
            color: 'black'
        })
    );
    let upToRotor3MidRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 540 + 800*i },
            color: 'black'
        })
    );
    let rotor3MidRightDownToUpLines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: downFromRotor3MidRight[index],
            obj2: upToRotor3MidRight[index],
            color: 'black',
            width: 1
        })
    );

    let rotor3RightOutUpColors = ['black', 'black', 'black', 'black'];
    rotor3Permutation.forEach(swap => {
        let [fro, to] = swap.toString().split(', ').map(Number).map(x => (x + 2 - rotor3Start + NUM_KEYS) % NUM_KEYS);
        rotor3RightOutUpColors[to] = rotor3RightColors[fro];
        rotor3MidRightDownToUpLines[fro].obj2 = upToRotor3MidRight[to];
    });

    let rotor3RightOutUp = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 380 + 50*index, y: 490 + 800*i },
            color: 'white',
            borderColor: rotor3RightOutUpColors[index],
            label: intToLetter[rotor3Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    rotor3MidRightDownToUpLines.forEach(line => stage.add(line));
    rotor3RightOutUp.forEach(rotor => stage.add(rotor));

    let downFromRotor3Right = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 480 + 800*i },
            color: 'black'
        })
    );
    let upToRotor2Right = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 460 + 800*i },
            color: 'black'
        })
    );
    let rotor3RightToRotor2RightLines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: downFromRotor3Right[index],
            obj2: upToRotor2Right[index],
            color: 'black',
            width: 1
        })
    );
    rotor3RightToRotor2RightLines.forEach(line => stage.add(line));

    let rotor2RightColors = rotor3RightOutUpColors;
    let rotor2Right = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 380 + 50*index, y: 410 + 800*i },
            color: 'white',
            borderColor: rotor2RightColors[index],
            label: intToLetter[rotor2Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    rotor2Right.forEach(rotor => stage.add(rotor));

    let downFromRotor2MidRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 400 + 800*i },
            color: 'black'
        })
    );
    let upToRotor2MidRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 380 + 800*i },
            color: 'black'
        })
    );
    let rotor2MidRightDownToUpLines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: downFromRotor2MidRight[index],
            obj2: upToRotor2MidRight[index],
            color: 'black',
            width: 1
        })
    );
    let rotor2RightOutUpColors = ['black', 'black', 'black', 'black'];

    rotor2Permutation.forEach(swap => {
        let [fro, to] = swap.toString().split(', ').map(Number).map(x => (x + 2 - rotor2Start + NUM_KEYS) % NUM_KEYS);
        rotor2RightOutUpColors[to] = rotor2RightColors[fro];
        rotor2MidRightDownToUpLines[fro].obj2 = upToRotor2MidRight[to];
    });
    let rotor2RightOutUp = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 380 + 50*index, y: 330 + 800*i },
            color: 'white',
            borderColor: rotor2RightOutUpColors[index],
            label: intToLetter[rotor2Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    rotor2MidRightDownToUpLines.forEach(line => stage.add(line));
    rotor2RightOutUp.forEach(rotor => stage.add(rotor));

    let downFromRotor2Right = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 320 + 800*i },
            color: 'black'
        })
    );
    let upToRotor1Right = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 300 + 800*i },
            color: 'black'
        })
    );
    let rotor2RightToRotor1RightLines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: downFromRotor2Right[index],
            obj2: upToRotor1Right[index],
            color: 'black',
            width: 1
        })
    );
    rotor2RightToRotor1RightLines.forEach(line => stage.add(line));

    let rotor1RightColors = rotor2RightOutUpColors;
    let rotor1Right = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 380 + 50*index, y: 250 + 800*i },
            color: 'white',
            borderColor: rotor1RightColors[index],
            label: intToLetter[rotor1Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    rotor1Right.forEach(rotor => stage.add(rotor));

    let downFromRotor1MidRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 240 + 800*i },
            color: 'black'
        })
    );
    let upToRotor1MidRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 220 + 800*i },
            color: 'black'
        })
    );
    let rotor1MidRightDownToUpLines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: downFromRotor1MidRight[index],
            obj2: upToRotor1MidRight[index],
            color: 'black',
            width: 1
        })
    );
    let rotor1RightOutUpColors = ['black', 'black', 'black', 'black'];

    rotor1Permutation.forEach(swap => {
        let [fro, to] = swap.toString().split(', ').map(Number).map(x => (x + 2 - rotor1Start + NUM_KEYS) % NUM_KEYS);
        rotor1RightOutUpColors[to] = rotor1RightColors[fro];
        rotor1MidRightDownToUpLines[fro].obj2 = upToRotor1MidRight[to];
    });
    let rotor1RightOutUp = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 380 + 50*index, y: 170 + 800*i },
            color: 'white',
            borderColor: rotor1RightOutUpColors[index],
            label: intToLetter[rotor1Keys[index]],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    rotor1MidRightDownToUpLines.forEach(line => stage.add(line));
    rotor1RightOutUp.forEach(rotor => stage.add(rotor));

    let downFromRotor1Right = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 160 + 800*i },
            color: 'black'
        })
    );
    let upToPlugboardRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 140 + 800*i },
            color: 'black'
        })
    );
    let rotor1RightToPlugboardRightLines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: downFromRotor1Right[index],
            obj2: upToPlugboardRight[index],
            color: 'black',
            width: 1
        })
    );
    rotor1RightToPlugboardRightLines.forEach(line => stage.add(line));

    let plugboardRightColors = rotor1RightOutUpColors;
    let plugboardRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Rectangle({
            width: 40,
            height: 40,
            coords: { x: 380 + 50*index, y: 90 + 800*i },
            color: 'white',
            borderColor: plugboardRightColors[index],
            label: intToLetter[index],
            labelColor: 'black',
            labelLocation: 'center'
        })
    );
    plugboardRight.forEach(plug => stage.add(plug));

    let downFromPlugboardRight = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 80 + 800*i },
            color: 'black'
        })
    );
    let upToOutput = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 0,
            center: { x: 400 + 50*index, y: 60 + 800*i },
            color: 'black'
        })
    );
    let plugboardRightToOutputLines = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Edge({
            obj1: downFromPlugboardRight[index],
            obj2: upToOutput[index],
            color: 'black',
            width: 1
        })
    );

    let outputColors = ['black', 'black', 'black', 'black'];
    plugboardPermutation.forEach(swap => {
        let [fro, to] = swap.toString().split(', ').map(Number).map(x => x + 2);
        outputColors[to] = plugboardRightColors[fro];
        plugboardRightToOutputLines[fro].obj2 = upToOutput[to];
    });

    let output = Array.from({ length: NUM_KEYS}, (_, index) =>
        new Circle({
            radius: 20,
            color: 'white',
            borderColor: outputColors[index],
            center: { x: 400 + 50*index, y: 30 + 800*i },
            label: intToLetter[index],
            labelColor: 'black'
        })
    );
    plugboardRightToOutputLines.forEach(line => stage.add(line));
    output.forEach(out => stage.add(out));

    let keyboardOutputText = new TextBox({
        text: 'Keyboard/Output',
        coords: { x: 700, y: 30 + 800*i },
        color: 'black',
        fontSize: 20,
    });
    stage.add(keyboardOutputText);
    let plugboardText = new TextBox({
        text: 'Plugboard',
        coords: { x: 700, y: 110 + 800*i },
        color: 'black',
        fontSize: 20,
    });
    stage.add(plugboardText);
    let rotor1Text = new TextBox({
        text: 'Rotor 1',
        coords: { x: 700, y: 230 + 800*i },
        color: 'black',
        fontSize: 20,
    });
    stage.add(rotor1Text);
    let rotor2Text = new TextBox({
        text: 'Rotor 2',
        coords: { x: 700, y: 390 + 800*i },
        color: 'black',
        fontSize: 20,
    });
    stage.add(rotor2Text);
    let rotor3Text = new TextBox({
        text: 'Rotor 3',
        coords: { x: 700, y: 550 + 800*i },
        color: 'black',
        fontSize: 20,
    });
    stage.add(rotor3Text);
    let reflectorText = new TextBox({
        text: 'Reflector',
        coords: { x: 700, y: 720 + 800*i },
        color: 'black',
        fontSize: 20,
    });
    stage.add(reflectorText);


    // let debugRectangle = new Rectangle({
    //     width: 40,
    //     height: 40,
    //     coords: { x: 300, y: 850 },
    //     color: 'white',
    //     borderColor: 'black',
    //     label: rotor1Start,
    //     labelColor: 'black',
    //     labelLocation: 'center'
    // });

    // stage.add(debugRectangle);
}

stage.render(svg, document)