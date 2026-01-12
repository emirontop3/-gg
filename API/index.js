const { IgApiClient } = require('instagram-private-api');
const express = require('express');
const app = express();

const ig = new IgApiClient();
ig.state.generateDevice('Emooooooooxx');

async function loginAndAction() {
  try {
    // Senin verdiğin bilgilerle giriş
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login('Emooooooooxx', 'yhwiqoqowowk');
    console.log('Giriş başarılı!');
    
    // Buraya botun yapmasını istediğin işlemi ekleyebilirsin
    // Örn: Kendi akışındaki son fotoğrafı beğenme vb.
    
    return "Bot tetiklendi ve işlem yapıldı!";
  } catch (err) {
    return "Hata oluştu: " + err.message;
  }
}

app.get('*', async (req, res) => {
  const result = await loginAndAction();
  res.send(result);
});

module.exports = app;
