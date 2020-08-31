const core = require('@actions/core');
const github = require('@actions/github');


Date.prototype.ddmmyyyy = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
  
    return [(dd>9 ? '' : '0') + dd,
            (mm>9 ? '' : '0') + mm,
            this.getFullYear()
           ].join('-');
};

Date.prototype.mmddyyyy = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
  
    return [(mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd,
            this.getFullYear()
           ].join('-');
};

try {
    
    var startingParseSymbol = core.getInput("starting-parse-symbol");
    var issueContext = github.context.payload.issue.body;
    var issueName = github.context.payload.issue.title;
    var fileNameFormat = core.getInput("file-name-format");
    var pathToSave = core.getInput("path-to-save");
    var fileNameExtension = core.getInput("file-name-extension");
    var fileNameDate, completeFileName;

    console.log(`
    The symbol declared for parsing is ${startingParseSymbol}
    The file name format is specified as ${fileNameFormat}
    The file name extension is specified as ${fileNameExtension}
    The path to save the file is specified as ${pathToSave}
    `);

    console.log(`The tweet content is ${issueContext.substring(issueContext.indexOf(startingParseSymbol) + startingParseSymbol.length, issueContext.lastIndexOf(startingParseSymbol))}`);

    var scheduledTime = issueContext.substring(issueContext.indexOf("Time:")+5, issueContext.length).trim()
    if (scheduledTime === "") {
        console.log("Scheduled time is null, creating the file name with the specified format.")
        var date = new Date();
        if (fileNameFormat === "dd-mm-yyyy") {
            console.log(date.ddmmyyyy());
            fileNameDate = date.ddmmyyyy();
        } else if (fileNameFormat === "mm-dd-yyyy") {
            console.log(date.mmddyyyy());
            fileNameDate = date.mmddyyyy();
        }
        completeFileName = fileNameDate+issueName+"."+fileNameExtension

        console.log(`file name tio be saved is ${completeFileName}`)
    }
    
} catch (error) {
    core.setFailed(error.message);
}
