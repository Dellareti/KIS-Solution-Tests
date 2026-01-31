import string

def translate_word(word):
    if not word:
        return ""

    start_punct = ""
    end_punct = ""
    core = word

    while core and core[0] in string.punctuation:
        start_punct += core[0]
        core = core[1:]
    
    # Remove pontuação do fim
    while core and core[-1] in string.punctuation:
        end_punct = core[-1] + end_punct
        core = core[:-1]

    if not core:
        return word

    if not any(c.isalpha() for c in core):
        return start_punct + core + end_punct

    is_upper = core.isupper()
    is_title = core.istitle() # Verifica se é apenas a primeira maiúscula (Ex: Stop)
    
    core_lower = core.lower()
    vowels = "aeiouy"
    translated = ""

    has_consonants = any(c not in vowels for c in core_lower)

    if not has_consonants:
        translated = core + "yay"
    else:
        vowel_index = -1
        for i, letter in enumerate(core_lower):
            if letter in vowels:
                vowel_index = i
                break
        
        if vowel_index != -1:
            prefix = core[:vowel_index]
            stem = core[vowel_index:]
            translated = stem + prefix + "ay"
        else:
            translated = core + "ay"

    if is_upper:
        translated = translated.upper()
    elif is_title:
        translated = translated.capitalize()

    return start_punct + translated + end_punct

def pig_latin(sentence):
    if not sentence:
        return ""
        
    words = sentence.split(" ")
    translated_words = [translate_word(word) for word in words]
    return " ".join(translated_words)

print(pig_latin("Stop"))
print(pig_latin("No littering"))
print(pig_latin("No shirts, no shoes, no service"))
print(pig_latin("No persons under 14 admitted"))
print(pig_latin("Hey buddy, get away from my car!"))