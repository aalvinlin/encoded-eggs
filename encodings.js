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
            wordBox.classList.add("word-container");

            let currentWord = words[wordID];

            for (let i = 0; i < currentWord.length; i += 1)
                {
                    let characterBox = document.createElement("div");
                    characterBox.classList.add("character-container");

                    let character = currentWord[i];

                    // lowercase letter
                    if (number_mapping[character])
                        { characterBox.textContent = number_mapping[character]; }

                    // uppercase letter
                    else if (number_mapping[character.toLowerCase()])
                        { characterBox.textContent = number_mapping[character.toLowerCase()]; }

                    // punctuation
                    else
                        { characterBox.textContent = character; }

                    wordBox.appendChild(characterBox);
                }
            
            textElement.appendChild(wordBox);
        }

    return textElement;
}