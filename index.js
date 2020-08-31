const core = require('@actions/core');
const github = require('@actions/github');


try {
  var startingParseSymbol = core.getInput("starting-parse-symbol")
  var eventPayload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The starting parsing symbol declared======> ${startingParseSymbol}!`);

  console.log(`the event payload is =====>>>>>. ${eventPayload}`);

} catch (error) {
  core.setFailed(error.message);
}