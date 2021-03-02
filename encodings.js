const alphabet = "abcdefghijklmnopqrstuvwxyz";
const validLetters = new Set(alphabet.split(""));

const braillePunctuation = {
    ":": "colon",
    ",": "comma",
    "!": "exclamation",
    ".": "period",
    "?": "question",
    ";": "semicolon"
}

// create a general function to hold encoded text, including divs for words.
// encodings will be created for individual letters
const createEncodedText = (encoding, input) => {
    
    let textElement = document.createElement("div");
    textElement.classList.add(encoding + "-encoding");

    let words = input.split(" ");

    for (let wordID = 0; wordID < words.length; wordID += 1)
        {
            let wordBox = document.createElement("div");
            wordBox.classList.add("wordBox");
            
            let currentWord = words[wordID];

            for (let i = 0; i < currentWord.length; i += 1)
                {
                    let currentLetter = currentWord[i];
                    let encodedLetter;

                    if (encoding === "rot13")
                        {
                            encodedLetter = document.createElement("span");
                            encodedLetter.textContent = encodeLetterRot13(currentLetter);
                        }
                    else if (encoding === "number")
                        {
                            encodedLetter = document.createElement("span");
                            encodedLetter.textContent = encodeLetterNumber(currentLetter);
                        }
                    else
                        {
                            encodedLetter = document.createElement("img");

                            currentLetter = currentLetter.toLowerCase();

                            if (validLetters.has(currentLetter))
                                {
                                    encodedLetter.setAttribute("src", `images/${encoding}_${currentLetter}.svg`)
                                }
                            else if (encoding === "braille" && braillePunctuation[currentLetter])
                                {
                                    encodedLetter.setAttribute("src", `images/${encoding}_${braillePunctuation[currentLetter]}.svg`)
                                }
                            else
                                {
                                    unknownLetter = document.createElement("span");
                                    unknownLetter.textContent = currentLetter;
                                }
                        }

                    wordBox.appendChild(encodedLetter);
                }

            textElement.appendChild(wordBox);
        }

    return textElement;

}

const rot13_mapping = {};

// create rot13 mapping
for (let i = 0; i < alphabet.length; i += 1)
    { rot13_mapping[alphabet[i]] = alphabet[(i + 13) % 26]; }

const encodeLetterRot13 = character => {

    // lowercase letter
    if (rot13_mapping[character])
        { return rot13_mapping[character]; }

    // uppercase letter
    else if (rot13_mapping[character.toLowerCase()])
        { return rot13_mapping[character.toLowerCase()].toUpperCase(); }

    // space or punctuation
    else
        { return character; }
}

const number_mapping = {};

// create number mapping
for (let i = 0; i < alphabet.length; i += 1)
    { number_mapping[alphabet[i]] = i + 1; }

const encodeLetterNumber = character => {

    // lowercase letter
    if (number_mapping[character.toLowerCase()])
        { return number_mapping[character.toLowerCase()]; }

    // space or punctuation
    else
        { return character; }
}

const encodeFormattedLetterNumber = input => {

    let characterBox = document.createElement("div");
                    
    let character = input;

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

    return characterBox;
}