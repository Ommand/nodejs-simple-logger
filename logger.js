let fs = require("fs"),
    dateFormat = require('dateformat'),
    Log = {};

let debug = false,
    writeToFile = true,
    filename = "log.txt",
    writeToConsole = true;

let logStream;

Log.setup = (options = {}) =>
{
    debug = options.debug || false;
    // noinspection JSUnresolvedVariable
    writeToFile = options.writeToFile || true;
    // noinspection JSUnresolvedVariable
    writeToConsole = options.writeToConsole || true;

    if (options.filename)
    {
        filename = options.filename;
        if (logStream)
        {
            logStream.close();
            logStream = null;
        }
    }
};

Log.clearLogFile = () =>
{
    fs.writeFile(filename, '', (err) =>
    {
        if (err) Log.log("An error occurred when writing to log file: " + err);
    });
};

Log.error = (message) =>
{
    _log("ERROR", message);
};

Log.debug = (message) =>
{
    if (debug)
        _log("DEBUG", message);
};

Log.log = (message) =>
{
    _log("LOG", message);
};

function _log(label, message)
{
    let time = `${dateFormat("isoTime")}`.replace("+\\d{4}", "");
    let data = `[${dateFormat("isoDate")}|${time}][${label}] ${message}`;

    if (writeToFile)
    {
        if (!logStream) logStream = fs.createWriteStream(filename, {flags: 'a'});
        logStream.write(data + "\n");
    }
    if (writeToConsole)
        console.log(data);
}

module.exports = Log;
