# Enigma Machine

### Introduction

The enigma machine was used by Germany in WW2 to encrypt and decrypt messages. The allies, led by Alan Turing, were able to "crack" the enigma machine and read the German's messages, an achievement which is credited with greatly shortening and maybe even chaninging the outcome of the war. In this project we model the Enigma machine with Forge and use it to show important properties. Namely, we show that the encryption is symmetric and has no fixed points. The former allows for simple decryption and the latter is a cryptographic weakness that the allies were able to use to break the enigma machine.

### Enigma Machine Background

The enigma machine is a substitution cipher where after every letter the substitutoin is changed. This is implemented using a series of permutations of the letters called rotors, a reflector, and a plugboard. There are three rotating rotors in an enigma machine. To encrypt/decrypt a message, the users must agree on a starting position for the three rotors. After each letter, one or more of rotors rotates causing the substition to change. The reflector is a special fixed permutation where if a letter x maps to a letter y, then y maps to x. This is important because it allows for decryption. Lastly, the plugboard allows for some subset of the letters to be swapped. When a key is pressed, the letter goes through

1. the plugboard,
2. the three rotors in order,
3. the reflector,
4. the three rotors in reverse order,
5. and finally the plugboard

and the the enigma machine returns the resulting letter. Note that there are many variants of the enigma machine but this is the one we chose to model.

### Model and Visualization

We model the encryption of a single letter. In place of the actual alphabet we use Int. Our model will work for any number of Int bits but the running time will quickly become an issue. The basic structure in our model is the permutation which is an abstract struct. We additionally define structs for each of the three rotors, the plugboard, and the reflector. Each of these is a permutation with some extra properties. The rotors have no fixed points, the plug board is symmetric, and the reflector is both of these. Lastly, we have a struct for the encryption. The encryption is also a permutation that maps each letter to what it encrypts to. We require the encryption to respect the structue of the enigma machine. There is only one possible encryption for a given enigma machine so the encryption is completely defined by the enigma machine. We also include a visualization of the enigma machine. It shows how a letter moves through the sequence of permutations and what letter it comes out as on the other side.