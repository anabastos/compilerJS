export default {
    '\t': 'tab', //      Tabulador
    '[ |\s]': 'b', //         Espaço
    '\n': 'LF', //         LineFeed
    '[0-9]': 'd', //     Digito
    '\\.': 'PONTO',
    '[%{|%}|//]': 'COMMENT',
    '\\*': 'ASTERISCO',
    '[a-zA-Z_]': 'l', // A-Z e Underscore
    '[-+]?[0-9]': 'NUMBER',  
    '[a-zA-Z][a-zA-Z0-9]*': 'IDENT',
    '[-+]?[0-9]*\\.[0-9]*': 'FLOAT',        
    '"[a-zA-Z][a-zA-Z0-9]*"': 'ALPHA',
}