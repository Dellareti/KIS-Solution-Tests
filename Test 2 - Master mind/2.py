import random

def generate_pattern(length):
    """Gera um padrão aleatório de números únicos."""
    return random.sample("123456", length)

def check_guess(pattern, guess):
    """
    Compara o palpite com o padrão.
    Retorna uma tupla: (numeros_corretos, posicoes_corretas)
    """
    correct_position = 0
    for i in range(len(pattern)):
        if guess[i] == pattern[i]:
            correct_position += 1
    
    # Como o padrão não tem repetições, usamos conjuntos para achar números corretos
    correct_numbers = len(set(guess).intersection(set(pattern)))
    
    return correct_numbers, correct_position

def main():
    # 1. Configuração do Jogo: Tamanho do Padrão
    while True:
        try:
            length_input = input("Enter pattern length (1-6): ")
            pattern_length = int(length_input)
            if 1 <= pattern_length <= 6:
                break
            print("Invalid length. Please enter a number between 1 and 6.")
        except ValueError:
            print("Invalid length. Please enter a number between 1 and 6.")

    # 2. Configuração do Jogo: Número de Tentativas
    while True:
        try:
            guesses_input = input("Enter number of guesses: ")
            max_guesses = int(guesses_input)
            if max_guesses > 0:
                break
            print("Invalid number. Please enter a number greater than 0.")
        except ValueError:
            print("Invalid number. Please enter a number greater than 0.")

    # Gera o padrão (números únicos de 1 a 6)
    pattern = generate_pattern(pattern_length)
    
    current_attempt = 0

    # Loop Principal do Jogo
    while current_attempt < max_guesses:
        guess_str = input("Type your guess: \n")

        # Validações de entrada
        if len(guess_str) != pattern_length:
            print(f"Input needs to be {pattern_length} of size.")
            continue
        
        if not all(c in "123456" for c in guess_str):
            print("Try something like a number between 1 and 6.")
            continue

        current_attempt += 1
        guess = list(guess_str)

        # Chama a função pura para processar a lógica
        correct_numbers, correct_position = check_guess(pattern, guess)

        # Formatação da saída (pluralização correta)
        msg_num = "number" if correct_numbers == 1 else "numbers"
        msg_pos = "number" if correct_position == 1 else "numbers"
        
        print(f"{correct_numbers} {msg_num} correct, {correct_position} {msg_pos} in correct position")

        # Verifica vitória
        if correct_position == pattern_length:
            print(f"You broke the code in {current_attempt} guesses!")
            return

    # Fim de jogo (Derrota)
    print(f"You were unable to break the code in {max_guesses} guesses. Code pattern is: {''.join(pattern)}.")

if __name__ == "__main__":
    main()