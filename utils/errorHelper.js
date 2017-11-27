import { red, green } from 'colors';

const lexRegex = (char, type, position) => {
  const accepted = type !== null;
  // accepted
  //     ? console.log(`Cadeia aceita ${char}`)
  //     : console.log(`Cadeia rejeitada ${char}`)
  const inexistentError = !accepted
    ? errorPrinter(
        'Léxico',
        position,
        `Simbolo ${char} inexistente no alfabeto.`
      )
    : null;
  const diretivaError =
    char[0] === '#' || char[0] === '@' && type !== 'WORD'
      ? errorPrinter(
          'Léxico',
          position,
          `Diretiva de compilação ${char} inexistente..`
        )
      : null;
  const alphanumericError =
    type === 'IDENT' && char.includes('"')
      ? errorPrinter(
          'Léxico',
          position,
          `Constante alfanumerica "${char}" sem encerramento..`
        )
      : null;

  const errors = inexistentError || diretivaError || alphanumericError;
  return errors;
};

const successPrinter = (type) => {
  const msg = `Sem erros ${type}, seguindo para próxima fase da compilação!`
  console.log(green(msg))
}

const errorPrinter = (type, position, error) => {
  const msg = `Erro ${type} em ${position} - ${error}`;
  console.log(red(msg));
  return { error: true, msg };
};

const lexError = (char, type, position) => {
  return errorPrinter('Léxico', position, `Simbolo ${char} sem fechamendo.`);
};

const syntaxError = (char, type, position) => {
  return errorPrinter('Sintático', position, type);
};

export default {
  errorPrinter,
  successPrinter,
  lexRegex,
  lexError,
  syntaxError,
};
