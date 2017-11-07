import { red } from 'colors';

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

const lexError = (char, type, position) => {
  return errorPrinter('Léxico', position, `Simbolo ${char} sem fechamendo.`);
};

const errorPrinter = (type, position, error) => {
  const msg = `Erro ${type} em ${position} - ${error}`;
  console.log(red(msg));
  return { error: true, msg };
};

export default { errorPrinter, lexRegex, lexError };
