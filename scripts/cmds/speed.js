const fast = require('fast-speedtest-api');

module.exports = {
  config: {
    name: "speedtest",
    aliases: ["speed"],
    version: "1.0",
    author: "Samir",
    countDown: 30,
    role: 2,
    shortDescription: "Check system speed",
    longDescription: "Check system speed",
    category: "owner",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const speedTest = new fast({
        token: "YXNkZmFzZGxmbnNk
YWZoYXNkZmhrYWxm",
        verbose: false,
        timeout: 10000,
        https: true,
        urlCount: 5,
        bufferSize: 8,
        unit: fast.UNITS.Mbps
      });

      console.log('Starting speed test...'); // Added for debugging purposes

      const result = await speedTest.getSpeed();
      console.log('Speed test completed:', result); // Added for debugging purposes

      const message = "Successfully tested Bot's Processing Speed." +
        "\➠ Result" +
        "\⟿ Speed: " + result + " MBPS";

      console.log('Sending message:', message); // Added for debugging purposes

      return api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.error('Error occurred:', error); // Added for debugging purposes
      return api.sendMessage("Error occurred during the speed test.", event.threadID, event.messageID);
    }
  }
};
