const service = require("./configuration-service");

describe("configuration-service", () => {
  it("should provide a configuration", () => {
    expect(service.retrieve()).toEqual({
      srcPathPrefix: "src",
      testPathPrefix: "tests/unit",
      testSuffix: ".spec"
    });
  });
});
