#lang forge/temporal

option run_sterling "enigma.js"

---------- Sigs ----------

abstract sig Permutation {
    map: set Int->Int
}

abstract sig Rotor extends Permutation {
    -- Starting index of rotor
    start: one Int 
}
 
one sig Plugboard extends Permutation{}
one sig Rotor1 extends Rotor{}
one sig Rotor2 extends Rotor{}
one sig Rotor3 extends Rotor{}
one sig Reflector extends Permutation{}

-- TODO abstract this so that it updates as rotors turn
one sig Encryption extends Permutation{}

-- TODO add plugboard or other variants if we want

---------- Valid Enigma Machine ----------

pred isPermutation[p : Permutation] {
    -- All letters map somewhere
    all x: Int | {
        some y: Int | {
            (x->y) in p.map
        }
    }

    -- No two letters map to the same place
    all x,y,z: Int | {
        (((y->x) in p.map) and ((z->x) in p.map)) => (y=z)
    }
}

pred isPlugboard {
    isPermutation[Plugboard]
    all x,y: Int | {
        ((x->y) in Plugboard.map) => ((y->x) in Plugboard.map)
    }
}

pred isRotor[p : Permutation] {
    isPermutation[p]
    all x: Int | {
        (x->x) not in p.map
    }
}

pred isReflector {
    isRotor[Reflector]
    all x,y: Int | {
        ((x->y) in Reflector.map) => ((y->x) in Reflector.map)
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

-- TODO: Update to take into account starting position of each rotor and to update after each letter
pred isEncryption {
    isPermutation[Encryption]
    Encryption.map = (Rotor1.map).(Rotor2.map).(Rotor3.map).(Reflector.map).~(Rotor3.map).~(Rotor2.map).~(Rotor1.map)
}

---------- Tests ----------

-- An important property of the enigma machine that was used to help crack it is that no letter is
-- ever encoded as itself
pred noFixedLetters {
    all x: Int | {
        not ((x->x) in Encryption.map)
    }
}
assert {validEnigma and isEncryption} is sufficient for noFixedLetters for 2 Int

-- An important property of the enigma machine that allows for decoding is that if x maps to y in round r
-- then y maps to x in round r
pred isSymmetric {
    all x,y: Int | {
        ((x->y) in Encryption.map) => ((y->x) in Encryption.map)
    }
}
assert {validEnigma and isEncryption} is sufficient for isSymmetric for 2 Int




run {validEnigma and isEncryption} for 2 Int