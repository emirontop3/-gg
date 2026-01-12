const Instagram = require('instagram-web-api');
const express = require('express');
const app = express();

const username = 'Emooooooooxx';
const password = 'yhwiqoqowowk';

app.get('*', async (req, res) => {
  const client = new Instagram({ username, password });
  
  try {
    // Giriş yap
    await client.login();
    
    // Hedef kullanıcıyı bul (emirattaa)
    const target = await client.getUserByUsername({ username: 'emirattaa' });
    
    // Mesaj gönder
    await client.addDirectMessage({ 
      userId: target.id, 
      text: 'Kobra devrede! Bu mesaj otomatiktir.' 
    });

    res.send('Mesaj başarıyla gönderildi, Kobra!');
  } catch (err) {
    res.status(500).send('Hata: ' + err.message);
  }
});

module.exports = app;
