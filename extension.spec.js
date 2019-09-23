const extension = require("./extension");
const switcher = require("./switcher-command");

jest.mock("vscode");
const vscode = require("vscode");

describe("extension", () => {
  it("provide lifecycle hooks", () => {
    expect(extension.activate).toBeInstanceOf(Function);
    expect(extension.deactivate).toBeInstanceOf(Function);
  });

  it("registers a command on activate", () => {
    let context = {
      subscriptions: []
    };
    extension.activate(context);
    expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
      "greensopinion.switchToFromTest",
      switcher.switchEditor
    );
    expect(context.subscriptions).toEqual([
      {
        mock: "mock-disposable"
      }
    ]);
  });
});
