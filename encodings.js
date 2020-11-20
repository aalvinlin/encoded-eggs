const alphabet = "abcdefghijklmnopqrstuvwxyz";

const rot13_mapping = {};

// create rot13 mapping
for (let i = 0; i < alphabet.length; i += 1)
    { rot13_mapping[alphabet[i]] = alphabet[(i + 13) % 26]; }

const rot13_transform = input => {

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

    return result;
}

const number_mapping = {};

// create number mapping
for (let i = 0; i < alphabet.length; i += 1)
    { number_mapping[alphabet[i]] = i + 1; }

const number_transform = input => {

    let result = "";

    for (let i = 0; i < input.length; i += 1)
        {
            let character = input[i];

            // lowercase letter
            if (number_mapping[character])
                { result += number_mapping[character] + " "; }

            // uppercase letter
            else if (number_mapping[character.toLowerCase()])
                { result += number_mapping[character.toLowerCase()] + " "; }

            // space
            else if (character === " ")
                { result += " | "; }

            // punctuation
            else
                { result += character; }
        }

    return result;
}