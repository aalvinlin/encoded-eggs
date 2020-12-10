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
    
    "u": new Set([1, 4, 6]),
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
    "a": [5, 6],
    "b": [4, 6],
    "c": [3, 6],
    "d": [2, 6],
    "e": [1, 6],
    "f": [0, 6],
    "g": [7, 6],
    
    "h": [4, 5],
    "i": [3, 5],
    "j": [0, 2],
    "k": [2, 5],
    "l": [1, 5],
    "m": [0, 5],
    "n": [7, 5],
    
    "o": [3, 4],
    "p": [2, 4],
    "q": [1, 4],
    "r": [0, 4],
    "s": [7, 4],
    
    "t": [2, 3],
    "u": [1, 3],
    "v": [7, 2],

    "w": [0, 1],
    "x": [7, 1],
    "y": [0, 3],
    "z": [7, 0]
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
                    semaphoreFlag.classList.add("semaphore-flag");

                    let character = currentWord[i];
                }
        }

    return null;
}
