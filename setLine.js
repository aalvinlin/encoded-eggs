const clearCurrentLine = () => {

    let currentLine = document.getElementById("current-line");

    while (currentLine.hasChildNodes())
        { currentLine.removeChild(currentLine.childNodes[0]); }
}

const setCurrentLine = (currentPageNumber, currentLineNumber, encodingsCallback) => {

    currentEncodedLine = encodingsCallback(text[currentPageNumber][currentLineNumber]);
    
    document.getElementById("current-line").appendChild(currentEncodedLine);
}