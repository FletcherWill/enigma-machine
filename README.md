# Enigma Machine

### Introduction

The enigma machine was used by Germany in WW2 to encrypt and decrypt messages. The allies, led by Alan Turing, were able to "crack" the enigma machine and read the German's messages, an achievement which is credited with greatly shortening and maybe even chaninging the outcome of the war. In this project we model the Enigma machine with Forge and use it to show important properties. Namely, we show that the encryption is symmetric and has no fixed points. The former allows for simple decryption and the latter is a cryptographic weakness that the allies were able to use to break the enigma machine.

### Enigma Machine Background

The enigma machine is a substitution cipher where after every letter the substitution is changed. This is implemented using a series of swapping mechanisms: a _plugboard_, three _rotors_, and a _reflector_. 
All of these components represent some kinds of permutations, with an addition of shifting in each rotor.
A more detailed spec for each component can be found below:

1. The plugboard is a symmetric permutation, where if $x$ is mapped to $y$ then $y$ is mapped to $x$. 
2. A rotor's permutation ensures that no letter maps into itself.
3. The reflector has a permutation which combines both properties from the plugboard and the rotor.

Given a configuration of the three components, a letter would be encrypted through the following sequence:

1. The input is fed into the plugboard,
2. The three rotors in order left-middle-right,
3. The reflector, which "reflect",
4. The three rotors, now in order right-middle-left,
5. The plugboard again before output.

### Model and Visualization

We model the encryption of a single letter. In place of the actual alphabet we use Int. Our model will work for any number of Int bits but the running time will quickly become an issue. The basic structure in our model is the permutation which is an abstract struct. We additionally define structs for each of the three rotors, the plugboard, and the reflector. Each of these is a permutation with some extra properties. The rotors have no fixed points, the plug board is symmetric, and the reflector is both of these. Lastly, we have a struct for the encryption. The encryption is also a permutation that maps each letter to what it encrypts to. We require the encryption to respect the structure of the enigma machine. There is only one possible encryption for a given enigma machine so the encryption is completely defined by the enigma machine. We also include a visualization of the enigma machine. It shows how a letter moves through the sequence of permutations and what letter it comes out as on the other side.

### Proving Properties

We use our model to test two important properties of the enigma machine:

* _**Symmetry**_. In other words, the cipher is _self-reciprocal_: If a letter x encrypted to a letter y, then letter y encrypts to x. This property allows the enigma machine to decrypt messages as well as encrypt them. To prove this, we simply use an assert statement in Forge.

* _**No fixed points**_. A number of sources point out that including the reflector introduces a new weakness to the cipher: No letter can be encrypted into itself. However, in our modeling, we successfully point out that there is even a case in which the whole cipher is an _identical map_. 

### Modeling Decisions

Our biggest limiting factor when designing our model was runtime. Our model only runs fast for the assertions if we limit our Int to 2 bits.

 Originally we wanted to model encrypting an entire word. This would have entailed having the rotors rotate after each letter and the encryption being a map from integers to maps instead of being a single map. Although this would have been nice to have, it wasn't necessary to prove either of the properties we are interested in and it seemed to greatly increase the runtime. Once the original state of the enigma machine is set, everything else is deterministic so it should be possible to make this work if one really wanted to. However, this felt more in the spirit of a programming language than forge so we opted against trying to make it work.

Originally we also wanted to model the ability to set a starting point for each rotor. We ended up not doing this because it made our model much messier and because this would have been redundant since we are testing over all valid permutations already. We considered fixing the possible rotors to the small number of rotors that were actually used to speed up the runtime and in this case it would have made sense to include the starting point. However, we decided that it was more interesting to use general rotors because this shows that our properties are fundamental to the enigma machine and not just a byproduct of the specific rotors chosen.