const mapper = require("./file-path-mapper");

describe("file-path-mapper", () => {
  describe("mapToAlternate", () => {
    it("should map files without test/src prefix", () => {
      expect(
        mapper.mapToAlternate(
          "/some/path/to/workspace",
          "/some/path/to/workspace/a-file.js"
        )
      ).toEqual({
        absolutePath: "/some/path/to/workspace/a-file.spec.js",
        isTest: true,
        relativePath: "a-file.spec.js"
      });
    });

    it("should map test files without test/src prefix", () => {
      expect(
        mapper.mapToAlternate(
          "/some/path/to/workspace",
          "/some/path/to/workspace/a-file.spec.js"
        )
      ).toEqual({
        absolutePath: "/some/path/to/workspace/a-file.js",
        isTest: false,
        relativePath: "a-file.js"
      });
    });

    it("should map files with test/src prefix", () => {
      expect(
        mapper.mapToAlternate(
          "/some/path/to/workspace",
          "/some/path/to/workspace/src/a-file.js"
        )
      ).toEqual({
        absolutePath: "/some/path/to/workspace/tests/unit/a-file.spec.js",
        isTest: true,
        relativePath: "tests/unit/a-file.spec.js"
      });
    });

    it("should map test files with test/src prefix", () => {
      expect(
        mapper.mapToAlternate(
          "/some/path/to/workspace",
          "/some/path/to/workspace/tests/unit/a-file.spec.js"
        )
      ).toEqual({
        absolutePath: "/some/path/to/workspace/src/a-file.js",
        isTest: false,
        relativePath: "src/a-file.js"
      });
    });
  });
});
