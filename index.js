const venom = require('venom-bot');
const cron = require('node-cron');

// Números via variáveis de ambiente
const numeroNamorada = process.env.NUMERO_NAMORADA;
const meuNumero = process.env.MEU_NUMERO;      

// Palavras-chave positivas e negativas
const respostasPositivas = ['sim', 'tomei', 'já', 'ja'];
const respostasNegativas = ['não', 'ainda não'];

venom
  .create({
    session: 'session',          // nome da sessão
    folderNameToken: './session', // garante que a pasta da sessão seja criada corretamente
    multidevice: true,           // WhatsApp multi-dispositivo
    useChrome: true,             // força uso do Chromium
    headless: true,              // Chromium em modo headless
    disableSpins: true,
    logQR: true                  // mostra QR Code no console se precisar reconectar
  })
  .then((client) => start(client))
  .catch((err) => console.log('Erro ao iniciar bot:', err));

function start(client) {
  console.log('🤖 Bot iniciado!');

  // Agenda mensagem todo dia às 12:00
  cron.schedule('0 12 * * *', () => {
    console.log('Enviando lembrete para ela...');
    client.sendText(numeroNamorada, 'Oi amor ❤️ já tomou o anticoncepcional hoje?');

    let respondeu = false;

    // Timeout de 15 minutos
    const timeout = setTimeout(() => {
      if (!respondeu) {
        client.sendText(meuNumero, '⚠️ Ela ainda não respondeu o lembrete do anticoncepcional.');
      }
    }, 15 * 60 * 1000); // 15 minutos

    // Listener para mensagens dela
    const listener = (message) => {
      if (message.from === numeroNamorada) {
        const resposta = message.body.toLowerCase();

        // Verifica se contém alguma palavra positiva
        if (respostasPositivas.some(p => resposta.includes(p))) {
          respondeu = true;
          clearTimeout(timeout);
          client.sendText(numeroNamorada, 'Ótimo! Fico tranquilo 😍');
          client.sendText(meuNumero, '✅ Ela respondeu que já tomou o anticoncepcional.');
        }
        // Verifica se contém alguma palavra negativa
        else if (respostasNegativas.some(p => resposta.includes(p))) {
          respondeu = true;
          clearTimeout(timeout);
          client.sendText(numeroNamorada, 'Não esquece, é importante! ❤️');
          client.sendText(meuNumero, '⚠️ Ela respondeu que ainda não tomou o anticoncepcional.');
        }

        // Remove listener depois de processar
        client.removeListener('onMessage', listener);
      }
    };

    client.onMessage(listener);
  });
}
