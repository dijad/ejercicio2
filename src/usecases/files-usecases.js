const fs = require('fs');
const fsEx = require('fs-extra');
const readline = require('readline');

async function handleFiles(files, word = null) {
  const fileResponses = [];
  const keyFiles = Object.keys(files);

  if (keyFiles.length > 0) {
    for (let keyFile of keyFiles) {
      let file = {
        file_name: files[keyFile].name,
        path_file: files[keyFile].tempFilePath
      };
      let response;
      if (word) {
        response = await findWord(file, word);
      } else {
        response = await countWords(file);
      }
      fileResponses.push(response);
    }

    return fileResponses;
  }
}

/****************COUNTING*********************************************/

async function countWords(file) {
  let counter = 0;
  const lines = await handleFileOpening(file.path_file);

  for (const line of lines) {
    const words = line.split(' ');
    counter += words.length;
  }
  return {file: file.file_name, counter};
}


/****************FINDING*********************************************/

async function findWord(file, word) {
  let counter = 0;
  const lines = await handleFileOpening(file.path_file);

  for (const line of lines) {
    const wordCount = line.split(word).length - 1;
    counter += wordCount;
  }

  return { file: file.file_name, counter, word };
}
/*****************************************************/
async function handleFileOpening(pathFile) {
  const lines = [];
  const readInterface = readline.createInterface({
    input: fs.createReadStream(pathFile),
    output: process.stdout,
    console: false
  });

  for await (const line of readInterface) {
    lines.push(line);
  }

  await fsEx.unlink(pathFile);

  return lines;
}

module.exports = {
  handleFiles
};
