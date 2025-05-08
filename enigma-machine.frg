#lang forge

option run_sterling "enigma-machine.js"
-- option solver Glucose

---------- Sigs ----------

abstract sig Permutation {
    map: set Int->Int
}

abstract sig Rotor extends Permutation {
    -- Starting index of rotor
    start: one Int,
    shift: set Int->Int
}
 
one sig Plugboard extends Permutation {}
one sig Rotor1 extends Rotor {}
one sig Rotor2 extends Rotor {}
one sig Rotor3 extends Rotor {}
one sig Reflector extends Permutation {}

one sig Encryption extends Permutation {}

---------- Valid Enigma Machine ----------

fun numInt: one Int {
    #{x: Int | {}}
}

pred isPermutation[p : Permutation] {
    -- All letters map somewhere
    all x: Int | {
        some y: Int | {
            (x->y) in p.map
        }
    }

    -- No two letters map to the same place
    all x, y, z: Int | {
        (((y->x) in p.map) and ((z->x) in p.map)) => (y=z)
    }
}

pred isPlugboard {
    isPermutation[Plugboard]

    -- Plugboard should be symmetric
    all x, y: Int | {
        (x->y) in Plugboard.map
            => (y->x) in Plugboard.map
    }
}

pred isRotor[r: Rotor] {
    isPermutation[r]

    -- Letters in rotors cannot map to themselves
    all x: Int | {
        (x->x) not in r.map
    }

    all x: Int | {
        (x->remainder[add[x, r.start], numInt]) in r.shift
    }
}

pred isReflector {
    isPermutation[Reflector]

    -- Reflector should be symmetric
    all x, y: Int | {
        (x->y) in Reflector.map
            => (y->x) in Reflector.map
    }
    all x: Int | {
        (x->x) not in Reflector.map
    }
}

pred validEnigma {
    isPlugboard
    isRotor[Rotor1]
    isRotor[Rotor2]
    isRotor[Rotor3]
    isReflector
}

---------- Valid Encryption ----------

pred isEncryption {
    isPermutation[Encryption]
    Encryption.map = (Plugboard.map)
                    .(Rotor1.shift).(Rotor1.map).~(Rotor1.shift)
                    .(Rotor2.shift).(Rotor2.map).~(Rotor2.shift)
                    .(Rotor3.shift).(Rotor3.map).~(Rotor3.shift)
                    .(Reflector.map)
                    .(Rotor3.shift).~(Rotor3.map).~(Rotor3.shift)
                    .(Rotor2.shift).~(Rotor2.map).~(Rotor2.shift)
                    .(Rotor1.shift).~(Rotor1.map).~(Rotor1.shift)
                    .~(Plugboard.map)
}

---------- Tests ----------

-- No letter is encoded as itself
pred noFixedLetters {
    all x: Int | {
        (x->x) not in Encryption.map
    }
}
assert {validEnigma and isEncryption} is sufficient for noFixedLetters for 2 Int

-- The entire Enigma machine should be symmetric so messages can be decoded just as they were encoded
pred isSymmetric {
    all x, y: Int | {
        (x->y) in Encryption.map
            => (y->x) in Encryption.map
    }
}
assert {validEnigma and isEncryption} is sufficient for isSymmetric for 2 Int

run {validEnigma and isEncryption} for 2 Int