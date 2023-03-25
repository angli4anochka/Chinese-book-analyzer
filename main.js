const words = {
    "to say": "说",
    "no": "不",
    "very": "很",
    "please": "请",
    "people": "人",
    "to go": "去",
    "old": "老",
    "older brother": "哥哥",
    "husband": "丈夫",
    " still": "还",
    "to want": "想",

}

const wordPairs = Object.entries(words);

// Shuffle the word pairs so they appear in random order
const shuffledPairs = shuffle(wordPairs);

// Display each word and its translation as draggable and droppable elements
for (let i = 0; i < shuffledPairs.length; i++) {
    const [word, translation] = shuffledPairs[i];

    // Create a draggable word element
    const wordElement = document.createElement("div");
    wordElement.textContent = word;
    wordElement.draggable = true;
    wordElement.classList.add("draggable");
    document.body.appendChild(wordElement);

     const wordContainer = document.querySelector('.word_container')
     wordContainer.append(wordElement)


    // Create a droppable translation element
    const translationElement = document.createElement("div");
    translationElement.textContent = translation;
    translationElement.classList.add("droppable");
    document.body.appendChild(translationElement);

    // Add event listeners to the word element to handle drag and drop
    wordElement.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text/plain", word);
        event.dataTransfer.dropEffect = "move";
    });

    const translated_words = document.querySelector('.translation_container')
    translated_words.append(translationElement)

    wordElement.addEventListener("dragend", function(event) {
        if (!event.dataTransfer.dropEffect) {
            event.target.classList.add("incorrect");
            setTimeout(function() {
                event.target.classList.remove("incorrect");
            }, 1000);
        }
    });

    // Add event listeners to the translation element to handle drop
    translationElement.addEventListener("dragover", function(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    });

    translationElement.addEventListener("drop", function(event) {
        event.preventDefault();
        const droppedWord = event.dataTransfer.getData("text/plain");
        if (droppedWord === word) {
            event.target.classList.add("correct");
            event.target.textContent = translation + " ✓";
            wordElement.remove();
            setTimeout(function() {
                event.target.remove();
            }, 1000);
        } else {
            event.target.classList.add("incorrect");
            setTimeout(function() {
                event.target.classList.remove("incorrect");
            }, 1000);
        }
    });
}

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
