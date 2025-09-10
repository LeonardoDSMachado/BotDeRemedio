const venom = require('venom-bot');

venom
  .create({
    session: 'session',          // pasta da sessão
    multidevice: true,           // habilita multi-dispositivo
    useChrome: false,            // não usa o Chrome completo do Railway
    headless: true,              // roda sem abrir a interface
    disableSpins: true,          // desativa animações para economizar recursos
    browserArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',        // roda tudo em um único processo
      '--disable-gpu'
    ]
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  console.log('Bot iniciado!');

  // Agenda mensagem todo dia às 12:00
  cron.schedule('0 12 * * *', () => {
    console.log('Enviando lembrete para ela...');
    client.sendText(numeroNamorada, 'Oi amor ❤️ já tomou o remédio hoje?');

    let respondeu = false;

    // Timeout de 15 minutos
    const timeout = setTimeout(() => {
      if (!respondeu) {
        client.sendText(meuNumero, '⚠️ Ela ainda não respondeu o lembrete do remédio.');
      }
    }, 15 * 60 * 1000); // 15 minutos

    const listener = (message) => {
      if (message.from === numeroNamorada) {
        const resposta = message.body.toLowerCase();

        if (respostasPositivas.some(p => resposta.includes(p))) {
          respondeu = true;
          clearTimeout(timeout);
          client.sendText(numeroNamorada, 'Ótimo! Fico tranquilo 😍');
          client.sendText(meuNumero, '✅ Ela respondeu que já tomou o remédio.');
        }
        else if (respostasNegativas.some(p => resposta.includes(p))) {
          respondeu = true;
          clearTimeout(timeout);
          client.sendText(numeroNamorada, 'Não esquece, é importante! ❤️');
          client.sendText(meuNumero, '⚠️ Ela respondeu que ainda não tomou o remédio.');
        }

        client.removeListener('onMessage', listener);
      }
    };

    client.onMessage(listener);
  });
}
