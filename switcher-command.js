const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const pathMapper = require("./file-path-mapper");
const configurationService = require("./configuration-service");

const createErrorMessage = detail => {
  return `Can't switch to/from test: ${detail}`;
};
const showError = detail => {
  vscode.window.showInformationMessage(createErrorMessage(detail));
};

function openEditor(path) {
  vscode.workspace.openTextDocument(path).then(vscode.window.showTextDocument);
}

function newFileContents(options) {
  let configuration = configurationService.retrieve();
  if (options.isTest) {
    let extension = path.extname(options.absolutePath);
    let basename = path.basename(options.absolutePath, extension);
    if (basename.endsWith(configuration.testSuffix)) {
      basename = basename.substring(
        0,
        basename.length - configuration.testSuffix.length
      );
    }
    return `
describe("${basename}", () => {
    it("should have a test", ()=> {
        expect(true).toBe(false);
    });
});`;
  }
  return "";
}

function createFileAndOpenEditor(options) {
  let folderName = path.dirname(options.absolutePath);
  mkdirp.sync(folderName);
  let contents = newFileContents(options);
  fs.writeFileSync(options.absolutePath, contents);
  openEditor(options.absolutePath);
}

function promptCreateFile(options) {
  let promptOptions = {
    placeHolder: `Create ${options.relativePath}?`
  };
  vscode.window
    .showQuickPick(["Yes", "No"], promptOptions)
    .then(function(answer) {
      if (answer === "Yes") {
        createFileAndOpenEditor(options);
      }
    });
}

function switchEditor() {
  var activeTextEditor = vscode.window.activeTextEditor;
  if (!activeTextEditor) {
    showError("no active editor!");
    return;
  }
  let filePath = activeTextEditor.document.fileName;
  let folder = vscode.workspace.workspaceFolders
    .map(wf => wf.uri.path)
    .find(path => filePath.startsWith(`${path}/`));
  if (!folder) {
    showError("Can't find relative workspace folder!");
    return;
  }
  let alternate = pathMapper.mapToAlternate(folder, filePath);
  let fileExists = fs.existsSync(alternate.absolutePath);
  if (fileExists) {
    openEditor(alternate.absolutePath);
  } else {
    promptCreateFile(alternate);
  }
}

module.exports = {
  switchEditor
};
