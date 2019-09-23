const configurationService = require("./configuration-service");
const fs = require("fs");
const path = require("path");

function createTestFileExtension(sourceFileExtension) {
  let testFileExtension = sourceFileExtension;
  if (testFileExtension !== ".ts" && testFileExtension !== ".js") {
    testFileExtension = ".js";
  }
  return testFileExtension;
}

function findSimilarFile(basePathWithoutExtension, alternateBasePath) {
  let dirname = path.dirname(basePathWithoutExtension);
  let baseName = path.basename(basePathWithoutExtension);
  if (fs.existsSync(dirname)) {
    let files = fs.readdirSync(dirname);
    for (let file of files) {
      let fileWithoutExtension = path.basename(file, path.extname(file));
      if (fileWithoutExtension === baseName) {
        return `${path.dirname(alternateBasePath)}/${file}`;
      }
    }
  }
  return null;
}

function mapToAlternate(workspacePath, path) {
  let relativePath = path.substring(workspacePath.length + 1);
  let alternate = relativePath;
  let configuration = configurationService.retrieve();
  let sourcePrefix = `${configuration.srcPathPrefix}/`;
  let testPrefix = `${configuration.testPathPrefix}/`;
  if (alternate.startsWith(sourcePrefix)) {
    alternate = `${testPrefix}${alternate.substring(sourcePrefix.length)}`;
  } else if (alternate.startsWith(testPrefix)) {
    alternate = `${sourcePrefix}${alternate.substring(testPrefix.length)}`;
  }
  let pathParts = /^(.+)(\.[^\.]+)$/.exec(alternate);
  let fileExtension = pathParts[2];
  alternate = pathParts[1];

  let isTest = alternate.endsWith(configuration.testSuffix);
  if (isTest) {
    let alternateBasePath = `${alternate.substring(
      0,
      alternate.length - configuration.testSuffix.length
    )}`;
    let similarFile = findSimilarFile(
      `${workspacePath}/${alternateBasePath}`,
      alternateBasePath
    );
    if (similarFile) {
      alternate = similarFile;
    } else {
      alternate = `${alternateBasePath}${fileExtension}`;
    }
  } else {
    alternate = `${alternate}${
      configuration.testSuffix
    }${createTestFileExtension(fileExtension)}`;
  }
  return {
    absolutePath: `${workspacePath}/${alternate}`,
    relativePath: alternate,
    isTest: !isTest
  };
}

module.exports = {
  mapToAlternate
};
