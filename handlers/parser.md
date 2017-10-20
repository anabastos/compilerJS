
## Analise Lexica
Recebe codigo puro e os separa em tokens a partir da função **tokenizer**
*Lexical Analysis* takes the raw code and splits it apart into these things

Tokens são um array de objetos que descrevem um pedaço de syntax. Podendo ser numeros, pontuação, operadores, etc

### Codigo => Analise Lexica => Tokens

## Analise Sintatica
Recebe token e reformata em represetações em arvore chamadas AST(Abstract Syntax Tree) que descreve a relação de uma parte de syntax com a outra com objetos nesteados.

### Tokens => Analise Sintatica => AST's


Adicionar simbolos Other
adicionar simbolos RESERVADO

Observação:
i) A função next_char() é responsável por entregar o próximo símbolo da cadeia de
entrada e fazer o mapeamento do símbolo para os simbólicos LETRA, DIGITO,
BARRA, ASTERISCO, PONTO e EOF repassando-os ao programa que trata o AEF
ii) Significado das constantes simbólicas:
LETRA: a..z, A..Z e (underscore)
DIGITO: 0 a 9.
ASTERISCO: *
PONTO: .
EOF: Quando acabar a cadeia de entrada, a função next_char(*) devolve o inteiro
representado por EOF.
iii) A função erro(), entre outras coisas, altera a variável ERRO para verdadeiro.
iv) A função aceita(), entre outras coisas, altera a variável ACEITA para verdadeiro.

Se um estado é final, verificar a condição de fim de cadeia;
ii) Se existe transição do tipo “other”, não colocar teste de erro;
iii) Se existe aresta cíclica, não há necessidade de atualizar o estado