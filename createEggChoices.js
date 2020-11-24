const eggChooser = document.getElementById("egg-chooser");

for (let encoding in encodings)
    {
        let eggChoice = document.createElement("div");
        eggChoice.classList.add("egg-choice");
        eggChoice.setAttribute("onClick", `setEncodingChoice('${encoding}')`);

        let egg = document.createElement("div");
        egg.classList.add("egg");
        egg.classList.add("small-text");
        
        if (encodings[encoding])
            { egg.appendChild(encodings[encoding]("egg")); }
        else
            { egg.textContent = "egg"; }

        let encodingText = document.createElement("h3");
        encodingText.textContent = encoding;

        eggChoice.appendChild(egg);
        eggChoice.appendChild(encodingText);

        eggChooser.appendChild(eggChoice);
    }

/**
// Example:

    <div class="egg-choice" onClick="setEncodingChoice('ROT 13')">
        <div class="egg">
            egg
        </div>
        <h3>ROT 13</h3>
    </div>

**/