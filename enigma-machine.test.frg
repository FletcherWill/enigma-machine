#lang forge

open "enigma-machine.frg"
option run_sterling off
option solver Glucose

test suite for isPermutation {
    test expect {
        isPermutation_selfMapping: {
            some p: Permutation | {
                isPermutation[p]
            
                some x: Int | {
                    (x->x) in p.map
                }
            }
        } is sat

        isPermutation_unmappedLetter: {
            some p: Permutation | {
                isPermutation[p]

                some x: Int | {
                    no y: Int | {
                        (x->y) in p.map
                    }
                }
            }
        } is unsat
    }
}

test suite for isPlugboard {
    test expect {
        isPlugboard_symmetricMapping: {
            isPlugboard

            -- 100% test coverage!!!!
            all x, y: Int | {
                (x->y) in Plugboard.map
                    => (y->x) in Plugboard.map
            }
        } is sat

        isPlugboard_asymmetricMapping: {
            isPlugboard

            some x, y: Int | {
                (x->y) in Plugboard.map
                (y->x) not in Plugboard.map
            }
        } is unsat
    }
}

test suite for isRotor {
    test expect {
        isRotor_selfMapping: {
            some r: Rotor | {
                isRotor[r]
            
                some x: Int | {
                    (x->x) in r.map
                }
            }
        } is unsat
    }

    // example isRotor_validShift is { isRotor[Rotor1] } for {
    //     Permutation = `Rotor + `Rotor1 + `Rotor2 + `Rotor3 + `Plugboard + `Reflector + `Encryption
    //     Rotor = `Rotor1 + `Rotor2 + `Rotor3
    //     Plugboard = `Plugboard
    //     Reflector = `Reflector
    //     Encryption = `Encryption

    //     #Int = 4
    //     Rotor1 = `Rotor1
    //     Rotor2 = `Rotor2
    //     Rotor3 = `Rotor3

    //     `Rotor1.start = 1
    //     `Rotor1.shift = -2->-1 + -1->0 + 0->1 + 1->2
    // }
}

test suite for isReflector {
    test expect {
        isReflector_symmetricMapping: {
            isReflector

            all x, y: Int | {
                (x->y) in Reflector.map
                    => (y->x) in Reflector.map
            }
        } is sat

        isReflector_asymmetricMapping: {
            isReflector

            some x, y: Int | {
                (x->y) in Reflector.map
                (y->x) not in Reflector.map
            }
        } is unsat
    }
}

test suite for isEncryption {
    test expect {
        isEncryption_startsWithPlugboard: {
            isEncryption

            Plugboard.map.Int = Encryption.map.Int
        } is sat
    }
}

test suite for validEnigma {
    test expect {
        validEnigma_letterMapsToSelf: {
            validEnigma
            isEncryption

            some x: Int | {
                (x->x) in Encryption.map
            }
        } is unsat

        validEnigma_symmetricMapping: {
            validEnigma
            isEncryption

            all x, y: Int | {
                (x->y) in Encryption.map
                    => (y->x) in Encryption.map
            }
        } is sat

        validEnigma_allLettersMapped: {
            validEnigma
            isEncryption

            Encryption.map.Int = Int
        } is sat
    }
}