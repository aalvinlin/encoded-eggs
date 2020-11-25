let text = [];

const updateText = () => {

    let sourceText = document.getElementById("textarea-input").value.trim();

    let pages = sourceText.split("\n\n");
    text = pages.map(page => page.split("\n"));

}