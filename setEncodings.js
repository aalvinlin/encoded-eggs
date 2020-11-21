const encodings = {
    "ROT 13": rot13_transform,
    "Semaphore": null,
    "Braille": braille_transform,
    "Number": number_transform
}

let encodingChoice = null;

let currentPageNumber = null;
let currentLineNumber = null;
let currentEncodedLine = null;

const setEncodingChoice = choice => {
    encodingChoice = choice;

    document.getElementById("egg-chooser").classList.toggle("hidden")
    document.getElementById("subheading-instruction").classList.toggle("hidden")
    document.getElementById("subheading-back").classList.toggle("hidden")
    document.getElementById("encoded-text").classList.toggle("hidden")

    if (encodings[choice])
        {
            // update subheading
            document.getElementById("subheading-chosen").textContent = choice;

            // set first line of text
            setCurrentLine(0, 0, encodings[choice]);
        }
}

const goBackToMenu = () => {
    encodingChoice = null;

    document.getElementById("subheading-instruction").classList.toggle("hidden")
    document.getElementById("subheading-back").classList.toggle("hidden")
    document.getElementById("encoded-text").classList.toggle("hidden");
    document.getElementById("egg-chooser").classList.toggle("hidden");

    clearCurrentLine();
}