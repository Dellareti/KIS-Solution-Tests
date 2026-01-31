function translateWord(word) {
    if (!word) return "";

    // Separa pontuação do início e do fim usando Regex
    const match = word.match(/^([^\w\s]*)(.*?)([^\w\s]*)$/);
    
    if (!match) return word;

    const startPunct = match[1];
    const core = match[2];
    const endPunct = match[3];

    if (!core) return word;

    if (!/[a-zA-Z]/.test(core)) {
        return word;
    }

    const isUpper = core === core.toUpperCase();
    const isStrictTitle = /^[A-Z][a-z]*$/.test(core);

    const coreLower = core.toLowerCase();
    const vowels = "aeiouy";
    let translated = "";

    const hasConsonants = [...coreLower].some(c => !vowels.includes(c));

    if (!hasConsonants) {
        translated = core + "yay";
    } else {
        let vowelIndex = -1;
        for (let i = 0; i < coreLower.length; i++) {
            if (vowels.includes(coreLower[i])) {
                vowelIndex = i;
                break;
            }
        }
        
        if (vowelIndex !== -1) {
            const prefix = core.slice(0, vowelIndex);
            const stem = core.slice(vowelIndex);
            translated = stem + prefix + "ay";
        } else {
            translated = core + "ay";
        }
    }

    if (isUpper) {
        translated = translated.toUpperCase();
    } else if (isStrictTitle) {
        translated = translated.charAt(0).toUpperCase() + translated.slice(1).toLowerCase();
    }

    return startPunct + translated + endPunct;
}

function pigLatin(sentence) {
    if (!sentence) {
        return "";
    }
    
    return sentence.split(" ").map(translateWord).join(" ");
}


console.log((pigLatin("Stop")))
console.log((pigLatin("No littering")))
console.log((pigLatin("No shirts, no shoes, no service")))
console.log((pigLatin("No persons under 14 admitted")))
console.log((pigLatin("Hey buddy, get away from my car!")))