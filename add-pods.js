/**
 * PLEASE READ
 * Do not add pods unless it is strictly necessary. If there is an equivalent expo package available, use that instead.
 * This plugin should only be used as a last resort.
 * 
 * PS: Could this plugin be available in mad-expo-core?
 */


const { withDangerousMod, withPlugins } = require("@expo/config-plugins");
const {
  mergeContents,
} = require("@expo/config-plugins/build/utils/generateCode");
const fs = require("fs");
const path = require("path");

//Add pods below
let podSrc = "";
addPod("RCTSystemSetting", "../node_modules/react-native-system-setting");
addPod("ExampleName", "PATH");

/**
 * addPod('NAME_ARG', 'PATH_ARG') adds line to podSrc: "pod 'NAME_ARG', :path => 'PATH_ARG'"
 * @param {string} name
 * @param {string} path
 * @returns void
 */
function addPod(name, path) {
  podSrc += `pod '${name}', :path => '${path}'`;
  podSrc += "\n";
}

async function readFileAsync(path) {
  return fs.promises.readFile(path, "utf8");
}

async function saveFileAsync(path, content) {
  return fs.promises.writeFile(path, content, "utf8");
}

const withAddPodsToPodfile = (c) => {
  return withDangerousMod(c, [
    "ios",
    async (config) => {
      const file = path.join(config.modRequest.platformProjectRoot, "Podfile");
      const contents = await readFileAsync(file);
      await saveFileAsync(file, addPodsToPodfile(contents));
      return config;
    },
  ]);
};

function addPodsToPodfile(src) {
  return mergeContents({
    tag: `expo-pods`,
    src,
    newSrc: podSrc,
    anchor: /post_install/,
    offset: -1,
    comment: "#",
  }).contents;
}

module.exports = (config) => withPlugins(config, [withAddPodsToPodfile]);
