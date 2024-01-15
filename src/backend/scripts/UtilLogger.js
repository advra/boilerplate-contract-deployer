const fs = require("fs");
const util = require("util");

class UtilLogger {
  constructor() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    const epochTime = now.getTime(); // Epoch time in milliseconds

    this.logFileName = `deploy-${month}-${day}-${year}-${epochTime}.log`;
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
