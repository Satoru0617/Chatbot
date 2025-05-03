module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "1.0",
    author: "Samir B. Thakuri",
    role: 0,
    shortDescription: {
      en: "Set coins and experience points for a user"
    },
    longDescription: {
      en: "Set coins and experience points for a user as desired"
    },
    category: "economy",
    guide: {
      en: "{pn}set [money|exp] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = ["100084032864300"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("𝐚𝐡 𝐛𝐨𝐧 𝐦𝐚𝐢𝐧𝐭𝐞𝐧𝐚𝐧𝐭 𝐨𝐧 𝐯𝐞𝐮𝐭 𝐩𝐢𝐪𝐮𝐞𝐫 𝐥𝐚 𝐭𝐡𝐮𝐧𝐞 𝐝𝐞 𝐦𝐨𝐧 𝐦𝐚𝐢𝐭𝐫𝐞 🙂 𝐝é𝐬𝐨𝐥é 𝐬𝐞𝐮𝐥 ༺𝐃𝐉𝐀𝐌𝐀𝐋 𝐓𝐊 ༻ 𝐚 𝐥𝐞 𝐝𝐫𝐨𝐢𝐭 𝐝𝐞 𝐬'𝐢𝐦𝐩𝐨𝐬𝐞𝐫 𝐚 𝐜𝐞𝐭𝐭𝐞 𝐚𝐫𝐠𝐞𝐧𝐭.", event.threadID, event.messageID);
    return;
  }
    const query = args[0];
    const amount = parseInt(args[1]);

    if (!query || !amount) {
      return api.sendMessage("Invalid command arguments. Usage: set [query] [amount]", event.threadID);
    }

    const { messageID, senderID, threadID } = event;

    if (senderID === api.getCurrentUserID()) return;

    let targetUser;
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    } else {
      const mention = Object.keys(event.mentions);
      targetUser = mention[0] || senderID;
    }

    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage("User not found.", threadID);
    }

    const name = await usersData.getName(targetUser);

    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data
      });

      return api.sendMessage(`Set experience points to ${amount} for ${name}.`, threadID);
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data
      });

      return api.sendMessage(`Set coins to ${amount} for ${name}.`, threadID);
    } else {
      return api.sendMessage("Invalid query. Use 'exp' to set experience points or 'money' to set coins.", threadID);
    }
  }
};
