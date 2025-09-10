# BotDeRemedio

Bot de remédio 💊🤖

Este projeto consiste em um bot automatizado no WhatsApp que envia diariamente um lembrete para que sua namorada tome o remédio regrado dela,além disso ele também registra a resposta.

O bot também envia avisos para você dependendo da resposta:

✅ Resposta positiva (já tomou)

⚠️ Resposta negativa (ainda não tomou)

⏱ Sem resposta após 15 minutos

O objetivo do projeto foi automatizar lembretes importantes e criar uma aplicação prática com Node.js, Venom-bot e hospedagem em nuvem.

Funcionalidades:

Envia mensagem diária às 12h perguntando se já tomou o comprimido.

Aceita múltiplas formas de respostas positivas: sim, tomei, já, ja.

Aceita respostas negativas: não, ainda não.

Envia mensagens de aviso para você em todos os casos (positivo, negativo ou sem resposta).

Mantém a sessão persistente para não precisar escanear QR Code novamente.

Suporta multi-dispositivo do WhatsApp, permitindo uso normal no celular ou computador.

Tecnologias usadas

Node.js – runtime JavaScript para backend.

Venom-bot – biblioteca para automatizar WhatsApp Web.

Node-cron – para agendar envio de mensagens diariamente.

Railway – plataforma de hospedagem em nuvem, permitindo rodar o bot 24h.
