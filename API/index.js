const { IgApiClient } = require('instagram-private-api');
const express = require('express');
const app = express();

const ig = new IgApiClient();

app.get('*', async (req, res) => {
  try {
    // Cihaz ve Giriş Bilgileri
    ig.state.generateDevice('Emooooooooxx');
    await ig.simulate.preLoginFlow();
    await ig.account.login('Emooooooooxx', 'yhwiqoqowowk');

    // Okunmamış mesaj kutusunu (Inbox) al
    const directInbox = ig.feed.directInbox();
    const threads = await directInbox.items();

    let cevapSayisi = 0;

    for (const thread of threads) {
      // Eğer okunmamış mesaj varsa
      if (thread.read_state === 1 || thread.items[0].user_id !== ig.state.cookieUserId) {
        
        // Sadece son mesajı biz atmadıysak "Merhaba" de
        await ig.entity.directThread(thread.thread_id).broadcastText('Merhaba!');
        cevapSayisi++;
      }
    }

    res.status(200).send(`İşlem başarılı! Toplam ${cevapSayisi} kişiye Merhaba dendi.`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Bot çalışırken bir hata oluştu: " + err.message);
  }
});

module.exports = app;
