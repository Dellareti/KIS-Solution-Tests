function pigLatin(word) {
    const vowels = "aeiouyAEIOUY";
    
    if (!word) {
        return "";
    }

    for (let i = 0; i < word.length; i++) {
        if (vowels.includes(word[i])) {
            return word.slice(i) + word.slice(0, i) + "ay";
        }
    }

    return word + "ay";
}
