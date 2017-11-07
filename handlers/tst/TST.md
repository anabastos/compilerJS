## Funções:
- grava_TST_binario
- le_tst_binario
- imprime_tst

## Programa principal
### Parametros:
- Nome do arquivo com os simbolos
- Nome do arquivo para teste de consulta
- Nome do arquivo que contém a TST
- Nome do arquivo de mensagem(SAÍDA) - imprime log e tst

## Cenário de testes
- Repetir 10 linhas aleatoriamente no arquivo de entrada
- P/ cada linha do arquivo chama a função
  - Consulta insere com opção I e Debug ativado
  - Grava em binário
  - Reinicializa o TST
- Le um binario
- Tenta com as opções de consulta com os dados contidos no arquivo do 2 parametro
- Imprime TST


## Tokens Especiais
2n -> (IDENT, -1)
2n + 1 -> (NUMBER, -1)
2n + 2 -> (FLOAT, -1)
2n + 3 -> (ALFA, -1)
2n + 4 -> (EOF, -1)

## TODO 
[x] Se debug == 's imprime: Simbolo, Hashing, Posição, Ação
[x] grava_TST_binario: grava tst no formato binário com uma unica operação(fwrite), serializa
a estrutura do disco
[x] le_tst_binario: inversa da primeira, fread
[x] imprime_tst: para fim de depuração
[x] Hashmap
[x] Função consulta insere: simbolo, ação(consulta ou inserção), debug("break", retrieve or insert, debug)
[x] Função de inserção, retorna sempre a posição
[x] Função de consulta, sempre retorna posição ou -1
[x] Teste
