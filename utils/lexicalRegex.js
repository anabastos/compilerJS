export default {
    '\t': 'tab', //      Tabulador
    '[ |\s]': 'b', //         Espaço
    '\n': 'LF', //         LineFeed
    '[0-9]': 'd', //     Digito
    '[a-zA-Z_]': 'l', // A-Z e Underscore
    '[a-zA-Z][a-zA-Z0-9]*': 'IDENT',
    '"[a-zA-Z][a-zA-Z0-9]*"': 'ALPHA',
    '[-+]?[0-9]': 'NUMBER',
    '[-+]?[0-9]*\.?[0-9]': 'FLOAT'
}