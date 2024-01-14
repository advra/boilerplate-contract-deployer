const fs = require("fs");
const util = require("util");

class UtilLogger {
  constructor() {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "_");
    this.logFileName = `deploy-${timestamp}.log`;
    this.logStream = fs.createWriteStream(this.logFileName, { flags: 'a' });
    this.writeAsync = util.promisify(this.logStream.write).bind(this.logStream);
  }

  async log(message, ...optionalParams) {
    const formattedMessage = new Date().toISOString() + ' - LOG - ' + util.format(message, ...optionalParams) + '\n';
    await this.writeAsync(formattedMessage);
    console.log(message, ...optionalParams);
  }

  async error(message, ...optionalParams) {
    const formattedMessage = new Date().toISOString() + ' - ERROR - ' + util.format(message, ...optionalParams) + '\n';
    await this.writeAsync(formattedMessage);
    console.error(message, ...optionalParams);
  }

  close() {
    this.logStream.end();
  }
}

module.exports = UtilLogger;
