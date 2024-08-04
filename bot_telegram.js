const axios = require("axios");
require("dotenv").config();

const TOKEN = process.env.TELE_API_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const CHATID = process.env.TELE_CHAT_ID;

class BotTelegram {
  static async sendMessage(message) {
    try {
      const result = await axios.post(
        TELEGRAM_API_URL,
        { chat_id: CHATID, text: message },
        { timeout: 10000 }
      );

      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = BotTelegram;
