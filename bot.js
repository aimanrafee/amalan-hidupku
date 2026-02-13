const { Telegraf } = require('telegraf');

/**
 * KONFIGURASI BOT
 * Token: Diambil dari BotFather (8089656333:AAHQQMR35OVg8xcru3A3M-1CTXjLPn_mKXE)
 * App URL: Link GitHub Pages anda (Gantikan 'aimanrafee' jika perlu)
 */
const bot = new Telegraf('8089656333:AAHQQMR35OVg8xcru3A3M-1CTXjLPn_mKXE');
const appUrl = 'https://aimanrafee.github.io/amalan-hidupku/';

// 1. Perintah /start - Pintu masuk utama bot
bot.start((ctx) => {
    const name = ctx.from.first_name;
    const message = `Assalamualaikum ${name}! ✨\n\n` +
                    `Selamat datang ke Bot *Amalan Hidupku*.\n\n` +
                    `Gunakan butang di bawah untuk membuka aplikasi zikir dan doa anda secara terus.`;

    ctx.replyWithMarkdown(message, {
        reply_markup: {
            inline_keyboard: [
                [ { text: "🚀 Buka Aplikasi (PWA)", url: appUrl } ],
                [ { text: "📖 Senarai Doa & Zikir", callback_data: 'info_amalan' } ]
            ]
        }
    });
});

// 2. Respon bila butang "Senarai Doa" diklik
bot.action('info_amalan', (ctx) => {
    const info = `📚 *Kandungan Aplikasi:*\n\n` +
                 `• Tasbih Digital (Counter)\n` +
                 `• Doa Ibu Bapa\n` +
                 `• Doa Kebaikan Dunia Akhirat\n` +
                 `• Surah Al-Ikhlas\n\n` +
                 `Semua amalan ini boleh diakses secara *offline* selepas anda install aplikasi ke skrin utama telefon.`;
    
    ctx.answerCbQuery(); // Menghilangkan loading pada butang
    ctx.replyWithMarkdown(info);
});

// 3. Perintah /help
bot.help((ctx) => {
    ctx.reply('Taip /start untuk mendapatkan pautan ke aplikasi Amalan Hidupku.');
});

// 4. Logik untuk menjalankan bot secara manual
bot.launch()
    .then(() => {
        console.log("------------------------------------------");
        console.log("✅ Bot @amalan_hidupku_bot sedang AKTIF!");
        console.log("🚀 Kawalan Manual: WSL Terminal");
        console.log("------------------------------------------");
    })
    .catch((err) => {
        console.error("❌ Gagal menjalankan bot:", err);
    });

// Penutupan bot yang selamat (Graceful Shutdown)
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
