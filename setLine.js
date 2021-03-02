const clearCurrentLine = () => {

    let currentLine = document.getElementById("current-line");

    while (currentLine.hasChildNodes())
        { currentLine.removeChild(currentLine.childNodes[0]); }
}

const setCurrentLine = (currentPageNumber, currentLineNumber, encoding) => {

    if (text.length === 0)
        {
            let errorMessage = document.createElement("p");
            errorMessage.classList.add("error");
            errorMessage.textContent = "No text specified."

            currentEncodedLine = errorMessage;
        }    
    else
        {
            currentEncodedLine = createEncodedText(encoding, text[currentPageNumber][currentLineNumber]);
        }
    
    document.getElementById("current-line").appendChild(currentEncodedLine);
}