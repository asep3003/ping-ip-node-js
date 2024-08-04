const ping = require("ping");
const cron = require("node-cron");
const cronstrue = require("cronstrue");
const BotTelegram = require("./bot_telegram");

const cronSchedule = process.env.CRON_SCHEDULE_1_HOURS;
const readCronSchedule = cronstrue.toString(cronSchedule);
const ipToPing = process.env.IP_TO_PING;

// Fungsi untuk ping IP
const pingIP = async (ip) => {
  const res = await ping.promise.probe(ip);
  return res.alive;
};

// Fungsi untuk mengecek koneksi dan mengirim notifikasi jika gagal
const checkConnectionAndNotify = async (ip) => {
  const isAlive = await pingIP(ip);
  if (!isAlive) {
    BotTelegram.sendMessage(
      `Unable to connect to ${ip}. Please check your connection or your VPN.`
    );
  } else {
    BotTelegram.sendMessage(`Connected to ${ip}.`);
  }
};

const run = () => {
  console.log(
    `==> Running ip checker to IP ${ipToPing} ${readCronSchedule}. 🚀🚀 <==`
  );
  cron.schedule(cronSchedule, async () => {
    checkConnectionAndNotify(ipToPing);
  });
};

run();
