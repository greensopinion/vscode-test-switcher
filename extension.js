const vscode = require("vscode");
const switcherCommand = require("./switcher-command");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "greensopinion.switchToFromTest",
    switcherCommand.switchEditor
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
