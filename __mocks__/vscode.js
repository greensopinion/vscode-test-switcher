module.exports = {
  commands: {
    registerCommand: jest.fn(() => {
      return { mock: "mock-disposable" };
    })
  }
};
