const { IgApiClient } = require('instagram-private-api');
const express = require('express');
const app = express();

const ig = new IgApiClient();

app.get('*', async (req, res) => {
  try {
    // Giriş Ayarları
    ig.state.generateDevice('Emooooooooxx');
    await ig.simulate.preLoginFlow();
    await ig.account.login('Emooooooooxx', 'yhwiqoqowowk');

    // 1. Hedef kullanıcıyı (emirattaa) bul
    const targetUser = await ig.user.searchExact('emirattaa');
    
    // 2. Mesaj gönderilecek bir kanal (thread) oluştur/bul
    const thread = ig.entity.directThread([targetUser.pk.toString()]);
    
    // 3. Mesajı gönder
    await thread.broadcastText('Merhaba emirattaa! Bu mesaj Vercel üzerinden otomatik gönderildi.');

    res.status(200).send(`Mesaj @emirattaa kullanıcısına başarıyla iletildi!`);
  } catch (err) {
    console.error(err);
    // Hata Instagram'ın botu engellemesi veya kullanıcı bulunamaması olabilir
    res.status(500).send("Hata: " + err.message);
  }
});

module.exports = app;
