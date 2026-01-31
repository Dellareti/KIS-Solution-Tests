def pig_latin(word):
    vowels = "aeiouyAEIOUY"
    
    if not word:
        return ""


    for i, letter in enumerate(word):
        if letter in vowels:
            return word[i:] + word[:i] + "ay"

    return word + "ay"
       

print(pig_latin("stop"))
print(pig_latin("no"))
print(pig_latin("people"))
print(pig_latin("bubble"))
print(pig_latin("under"))
print(pig_latin("admitted"))
print(pig_latin("away"))
