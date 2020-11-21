const changeLine = event => {

    if (encodingChoice)
        {
            allowedToUpdate = false;

            if (event.code === "ArrowUp")
                {
                    // go to previous line on current page
                    if (currentLineNumber > 0)
                        {
                            currentLineNumber -= 1;
                            allowedToUpdate = true;
                        }

                    // go to previous page (if not on first page)
                    else if (currentPageNumber > 0)
                        {
                            currentPageNumber -= 1;
                            currentLineNumber = text[currentPageNumber].length - 1;
                            allowedToUpdate = true;
                        }
                }

            else if (event.code === "ArrowDown")
                {
                    // go to next line on current page
                    if (currentLineNumber < text[currentPageNumber].length - 1)
                        {
                            currentLineNumber += 1;
                            allowedToUpdate = true;
                        }

                    // go to next page (if not on last page)
                    else if (currentPageNumber < text.length - 1)
                        {
                            currentPageNumber += 1;
                            currentLineNumber = 0;
                            allowedToUpdate = true;
                        }
                }
            
            if (allowedToUpdate)
                {
                    clearCurrentLine();
                    setCurrentLine(currentPageNumber, currentLineNumber, encodings[encodingChoice]);
                }
        }
}

document.getElementById("body").addEventListener("keydown", changeLine);

