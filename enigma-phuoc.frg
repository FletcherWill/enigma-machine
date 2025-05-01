#lang forge/temporal

option max_tracelength 4
option min_tracelength 4

option run_sterling "machine.js"

// https://people.physik.hu-berlin.de/~palloks/js/enigma/enigma-u_v20_en.html

abstract sig Letter {
    corresponding_index: one Int
}
one sig A extends Letter {}
one sig B extends Letter {}
one sig C extends Letter {}
one sig D extends Letter {}

pred setup { // set up numbers corresponding to letters for easier rotation
    always {
        A.corresponding_index = 0
        B.corresponding_index = 1
        C.corresponding_index = 2
        D.corresponding_index = 3
    }
}

sig Plugboard {
    swap: pfunc Letter -> Letter
}

pred plugboard_wellformed {
    all l: Letter | {
        one l1: Letter | l1 = Plugboard.swap[l]
    }
    all l: Letter | {
        l = Plugboard.swap[Plugboard.swap[l]]
        l != Plugboard.swap[l]
    }
    no l1, l2: Letter | {
        l1 != l2
        Plugboard.swap[l1] = Plugboard.swap[l2]
    }
}

abstract sig Rotor {
    internal_wiring: pfunc Letter -> Letter,
    notch: one Letter,
    position: one Letter
}

pred rotor_wellformed[r: Rotor] {
    all l: Letter | {
        one l1: Letter | l1 = r.internal_wiring[l]
    }
    no l1, l2: Letter | {
        l1 != l2
        r.internal_wiring[l1] = r.internal_wiring[l2]
    }
}

one sig Rotor1 extends Rotor {}
one sig Rotor2 extends Rotor {}
one sig Rotor3 extends Rotor {}

one sig Reflector {
    reflector_wiring: pfunc Letter -> Letter
}

pred reflector_wellformed {
    all l: Letter | {
        one l1: Letter | l1 = Reflector.reflector_wiring[l]
    }
    all l: Letter | {
        l = Reflector.reflector_wiring[Reflector.reflector_wiring[l]]
        l != Reflector.reflector_wiring[l]
    }
    no l1, l2: Letter | {
        l1 != l2
        Reflector.reflector_wiring[l1] = Reflector.reflector_wiring[l2]
    }
}

one sig Key {
    var letter: one Letter
}

one sig InternalKey {
    var internal_letter: one Letter
}

pred through_plugboard {
    InternalKey.internal_letter.corresponding_index = Key.letter.corresponding_index
    Key.letter' = Plugboard.swap[Key.letter]
}

pred plugboard_through_rotor1 {
    InternalKey.internal_letter.corresponding_index = remainder[add[Key.letter.corresponding_index, Rotor1.position.corresponding_index], 4]  
    Key.letter' = Rotor1.internal_wiring[InternalKey.internal_letter]
}

pred rotor1_through_rotor2 {
    InternalKey.internal_letter.corresponding_index = remainder[subtract[add[Key.letter.corresponding_index, Rotor2.position.corresponding_index], Rotor1.position.corresponding_index], 4]
    Key.letter' = Rotor2.internal_wiring[InternalKey.internal_letter]
}

pred rotor2_through_rotor3 {
    InternalKey.internal_letter.corresponding_index = remainder[subtract[add[Key.letter.corresponding_index, Rotor3.position.corresponding_index], Rotor2.position.corresponding_index], 4]
    Key.letter' = Rotor3.internal_wiring[InternalKey.internal_letter]
}

pred rotor3_through_reflector {
    InternalKey.internal_letter.corresponding_index = remainder[subtract[Key.letter.corresponding_index, Rotor3.position.corresponding_index], 4]
    Key.letter' = Reflector.reflector_wiring[InternalKey.internal_letter]
}

pred reflector_through_rotor3 {
    InternalKey.internal_letter.corresponding_index = remainder[add[Key.letter.corresponding_index, Rotor3.position.corresponding_index], 4]
    Key.letter' = Rotor3.internal_wiring[InternalKey.internal_letter]
}

pred rotor3_through_rotor2 {
    InternalKey.internal_letter.corresponding_index = remainder[subtract[add[Key.letter.corresponding_index, Rotor2.position.corresponding_index], Rotor3.position.corresponding_index], 4]
    Key.letter' = Rotor2.internal_wiring[InternalKey.internal_letter]
}

pred rotor2_through_rotor1 {
    InternalKey.internal_letter.corresponding_index = remainder[subtract[add[Key.letter.corresponding_index, Rotor1.position.corresponding_index], Rotor2.position.corresponding_index], 4]
    Key.letter' = Rotor1.internal_wiring[InternalKey.internal_letter]
}

pred rotor1_through_plugboard {
    InternalKey.internal_letter.corresponding_index = remainder[subtract[Key.letter.corresponding_index, Rotor1.position.corresponding_index], 4]
    Key.letter' = Plugboard.swap[InternalKey.internal_letter]
}

run {
    setup
    plugboard_wellformed
    rotor_wellformed[Rotor1]
    rotor_wellformed[Rotor2]
    rotor_wellformed[Rotor3]
    reflector_wellformed
    through_plugboard
    next_state {
        plugboard_through_rotor1
        next_state {
            rotor1_through_rotor2
            next_state {
                rotor2_through_rotor3
                next_state {
                    rotor3_through_reflector
                    next_state {
                        reflector_through_rotor3
                        next_state {
                            rotor3_through_rotor2
                            next_state {
                                rotor2_through_rotor1
                                next_state {
                                    rotor1_through_plugboard
                                }
                            }
                        }
                    }
                }
            }
        }
    }
} for 1 Plugboard, 3 Rotor, 1 Reflector, 1 Key, 1 InternalKey, 4 Letter