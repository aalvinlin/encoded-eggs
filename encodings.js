const alphabet = "abcdefghijklmnopqrstuvwxyz";

const rot13_mapping = {};

// create rot13 mapping
for (let i = 0; i < alphabet.length; i += 1)
    { rot13_mapping[alphabet[i]] = alphabet[(i + 13) % 26]; }

const rot13_transform = input => {
    
    let textElement = document.createElement("p");
    
    let result = "";

    for (let i = 0; i < input.length; i += 1)
        {
            let character = input[i];

            // lowercase letter
            if (rot13_mapping[character])
                { result += rot13_mapping[character]; }

            // uppercase letter
            else if (rot13_mapping[character.toLowerCase()])
                { result += rot13_mapping[character.toLowerCase()].toUpperCase(); }

            // space or punctuation
            else
                { result += character; }
        }

    textElement.textContent = result;

    return textElement;
}

const braille_dot_locations = {
    "a": new Set([1]),
    "b": new Set([1, 2]),
    "c": new Set([1, 4]),
    "d": new Set([1, 4, 5]),
    "e": new Set([1, 5]),
    "f": new Set([1, 2, 4]),
    "g": new Set([1, 2, 4, 5]),
    "h": new Set([1, 2, 5]),
    "i": new Set([2, 4]),
    "j": new Set([2, 4, 5]),
    
    "k": new Set([1, 3]),
    "l": new Set([1, 2, 3]),
    "m": new Set([1, 3, 4]),
    "n": new Set([1, 3, 4, 5]),
    "o": new Set([1, 3, 5]),
    "p": new Set([1, 2, 3, 4]),
    "q": new Set([1, 2, 3, 4, 5]),
    "r": new Set([1, 2, 3, 5]),
    "s": new Set([2, 3, 4]),
    "t": new Set([2, 3, 4, 5]),
    
    "u": new Set([1, 3, 6]),
    "v": new Set([1, 2, 3, 6]),
    "w": new Set([2, 4, 5, 6]),
    "x": new Set([1, 3, 4, 6]),
    "y": new Set([1, 3, 4, 5, 6]),
    "z": new Set([1, 3, 5, 6]),
    
    ".": new Set([2, 5, 6]),
    "?": new Set([2, 3, 6]),
    "!": new Set([2, 3, 5]),
    ",": new Set([2]),
    "-": new Set([3, 6]),
}

const braille_transform = input => {

        let textElement = document.createElement("div");
        textElement.classList.add("braille-encoding");
    
        let words = input.split(" ");
    
        for (let wordID = 0; wordID < words.length; wordID += 1)
            {
                let wordBox = document.createElement("div");
                wordBox.classList.add("braille-word-container");
    
                let currentWord = words[wordID];
    
                for (let i = 0; i < currentWord.length; i += 1)
                    {
                        let brailleCell = document.createElement("div");
                        brailleCell.classList.add("braille-cell");
    
                        let character = currentWord[i];
    
                        // for now, convert all uppercase letters to lowercase
                        if (braille_dot_locations[character.toLowerCase()])
                            {
                                character = character.toLowerCase();
                            }
    
                        // lowercase letter
                        if (braille_dot_locations[character])
                            {
                                let dots = [];
    
                                for (let i = 0; i < 6; i += 1)
                                    {
                                        dots[i] = document.createElement("div");
                                        dots[i].classList.add("braille-dot");
    
                                        if (braille_dot_locations[character].has(i + 1))
                                            { dots[i].classList.add("braille-dot-filled"); }
                                        else
                                            { dots[i].classList.add("braille-dot-blank"); }
                                    }
    
                                brailleCell.appendChild(dots[1 - 1]);
                                brailleCell.appendChild(dots[4 - 1]);
                                brailleCell.appendChild(dots[2 - 1]);
                                brailleCell.appendChild(dots[5 - 1]);
                                brailleCell.appendChild(dots[3 - 1]);
                                brailleCell.appendChild(dots[6 - 1]);
                            }
    
                        // misc. character
                        else
                            { brailleCell.textContent = character; }
    
                        wordBox.appendChild(brailleCell);
                    }
                
                textElement.appendChild(wordBox);
            }
    
        return textElement;
    }
       

const number_mapping = {};

// create number mapping
for (let i = 0; i < alphabet.length; i += 1)
    { number_mapping[alphabet[i]] = i + 1; }

const number_transform = input => {

    let textElement = document.createElement("div");
    textElement.classList.add("number-encoding");

    let words = input.split(" ");

    for (let wordID = 0; wordID < words.length; wordID += 1)
        {
            let wordBox = document.createElement("div");
            wordBox.classList.add("number-word-container");

            let currentWord = words[wordID];

            for (let i = 0; i < currentWord.length; i += 1)
                {
                    let characterBox = document.createElement("div");
                    
                    let character = currentWord[i];

                    // lowercase letter
                    if (number_mapping[character])
                        {
                            characterBox.textContent = number_mapping[character];
                            characterBox.classList.add("number-character-container-underline");
                        }

                    // uppercase letter
                    else if (number_mapping[character.toLowerCase()])
                        {
                            characterBox.textContent = number_mapping[character.toLowerCase()];
                            characterBox.classList.add("number-character-container-underline");
                        }

                    // punctuation
                    else
                        {
                            characterBox.textContent = character;
                            characterBox.classList.add("number-character-container-underline-punctuation");
                        }

                    wordBox.appendChild(characterBox);
                }
            
            textElement.appendChild(wordBox);
        }

    return textElement;
}

// numbers represent integer multiples of pi/4
const semaphore_flag_locations = {
    "a": [6, 5],
    "b": [6, 4],
    "c": [6, 3],
    "d": [6, 2],
    "e": [6, 1],
    "f": [6, 0],
    "g": [6, 7],
    
    "h": [5, 4],
    "i": [5, 3],
    "j": [2, 0],
    "k": [5, 2],
    "l": [5, 1],
    "m": [5, 0],
    "n": [5, 7],
    
    "o": [4, 3],
    "p": [4, 2],
    "q": [4, 1],
    "r": [4, 0],
    "s": [4, 7],
    
    "t": [3, 2],
    "u": [3, 1],
    "v": [2, 7],

    "w": [1, 0],
    "x": [1, 7],
    "y": [3, 0],
    "z": [0, 7]
}

const semaphore_transform = input => {

    let textElement = document.createElement("div");
    textElement.classList.add("semaphore-encoding");

    let words = input.split(" ");
    
    for (let wordID = 0; wordID < words.length; wordID += 1)
        {
            let wordBox = document.createElement("div");
            wordBox.classList.add("semaphore-word-container");

            let currentWord = words[wordID];

            for (let i = 0; i < currentWord.length; i += 1)
                {
                    let semaphoreFlag = document.createElement("div");
                    semaphoreFlag.classList.add("semaphore-letter-container");

                    let character = currentWord[i].toLowerCase();

                    if (semaphore_flag_locations[character])
                        {
                            const [angleStationary, angleMoving] = semaphore_flag_locations[character];

                            let flagImage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

                            flagImage.setAttribute("viewBox", "0 0 100 100");
                            flagImage.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                            flagImage.classList.add("semaphore-flag");

                            // stationary flag remains the same within each group of letters of the alphabet
                            flagStationary = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                            flagStationary.setAttributeNS(null, "x1", "50");
                            flagStationary.setAttributeNS(null, "y1", "50");
                            flagStationary.setAttributeNS(null, "x2", 50 + 35 * Math.cos(angleStationary * Math.PI / 4));
                            flagStationary.setAttributeNS(null, "y2", 50 - 35 * Math.sin(angleStationary * Math.PI / 4));
                            flagStationary.classList.add("flag-stationary");

                            flagMoving = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                            flagMoving.setAttributeNS(null, "x1", "50");
                            flagMoving.setAttributeNS(null, "y1", "50");
                            flagMoving.setAttributeNS(null, "x2", 50 + 35 * Math.cos(angleMoving * Math.PI / 4));
                            flagMoving.setAttributeNS(null, "y2", 50 - 35 * Math.sin(angleMoving * Math.PI / 4));
                            flagMoving.classList.add("flag-moving");

                            flagCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                            flagCircle.setAttributeNS(null, "cx", "50");
                            flagCircle.setAttributeNS(null, "cy", "50");
                            flagCircle.setAttributeNS(null, "r", "45");
                            flagCircle.classList.add("flag-circle");

                            flagImage.appendChild(flagStationary);
                            flagImage.appendChild(flagMoving);
                            flagImage.appendChild(flagCircle);

                            semaphoreFlag.appendChild(flagImage);
                        }

                    wordBox.appendChild(semaphoreFlag);
                }

            textElement.appendChild(wordBox);
        }

    return textElement;
}

const morse_code_sequences = {
    "a": [0, 1],
    "b": [1, 0, 0, 0],
    "c": [1, 0, 1, 0],
    "d": [1, 0, 0],
    "e": [0],
    "f": [0, 0, 1, 0],
    "g": [1, 1, 0],
    "h": [0, 0, 0, 0],
    "i": [0, 0],
    "j": [0, 1, 1, 1],
    "k": [1, 0, 1],
    "l": [0, 1, 0, 0],
    "m": [1, 1],
    
    "n": [1, 0],
    "o": [1, 1, 1],
    "p": [0, 1, 1, 0],
    "q": [1, 1, 0, 1],
    "r": [0, 1, 0],
    "s": [0, 0, 0],
    "t": [1],
    "u": [0, 0, 1],
    "v": [0, 0, 0, 1],
    "w": [0, 1, 1],
    "x": [1, 0, 0, 1],
    "y": [1, 0, 1, 1],
    "z": [1, 1, 0, 0]
}

const morse_visual = input => {
    
    let textElement = document.createElement("div");
    textElement.classList.add("morse-visual-encoding");

    let words = input.split(" ");
    
    for (let wordID = 0; wordID < words.length; wordID += 1)
        {
            let wordBox = document.createElement("div");
            wordBox.classList.add("morse-visual-word-container");

            let currentWord = words[wordID];

            for (let i = 0; i < currentWord.length; i += 1)
                {
                    let morseLetter = document.createElement("div");
                    morseLetter.classList.add("morse-visual-letter-container");

                    let character = currentWord[i].toLowerCase();

                    if (morse_code_sequences[character])
                        {
                            let morseSequence = "";

                            for (let codeType of morse_code_sequences[character])
                                {
                                    // dash if 1; dot if 0
                                    if (codeType)
                                        { morseSequence += "-"; } // —
                                    else
                                        { morseSequence += "."; } // ⬤
                                }

                            morseLetter.textContent = morseSequence;
                        }
                    
                    wordBox.appendChild(morseLetter);
                }
            
            textElement.appendChild(wordBox);
        }
    
    return textElement;
}

const pigpen_borders = {
    "a": [0, "top-left"],
    "b": [0, "top"],
    "c": [0, "top-right"],
    "d": [0, "left"],
    "e": [0, "center"],
    "f": [0, "right"],
    "g": [0, "bottom-left"],
    "h": [0, "bottom"],
    "i": [0, "bottom-right"],
    
    "j": [1, "top-left"],
    "k": [1, "top"],
    "l": [1, "top-right"],
    "m": [1, "left"],
    "n": [1, "center"],
    "o": [1, "right"],
    "p": [1, "bottom-left"],
    "q": [1, "bottom"],
    "r": [1, "bottom-right"],

    "s": [0, "top-x"],
    "t": [0, "left-x"],
    "u": [0, "right-x"],
    "v": [0, "bottom-x"],

    "w": [1, "top-x"],
    "x": [1, "left-x"],
    "y": [1, "right-x"],
    "z": [1, "bottom-x"],
}

const pigpen_transform = input => {
    
    return null;
}