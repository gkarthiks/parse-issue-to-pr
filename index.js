const core = require('@actions/core');
const github = require('@actions/github');


try {
  var startingParseSymbol = core.getInput("starting-parse-symbol");
  var eventPayload = JSON.stringify(github.context.payload, undefined, 2);
  var issueContext = github.context.payload.issue.body;

  console.log(`The starting parsing symbol declared======> ${startingParseSymbol}!`);
  
  console.log(`the issue context is  =====>>>>>. ${issueContext}`);

} catch (error) {
  core.setFailed(error.message);
}