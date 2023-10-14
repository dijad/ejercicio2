const { handleFiles } = require('../src/usecases/files-usecases');

test('should return an empty array if no files are provided', async () => {
  const files = {};
  const result = await handleFiles(files);
  expect(result).toEqual([]);
});

test('should return an array of file responses when files are provided', async () => {
  const files = {
    file1: { name: 'ejemplo.txt', tempFilePath: './ejemplo.txt' },
    file2: { name: 'ejemplo1.txt', tempFilePath: './ejemplo1.txt' },
  };
  const result = await handleFiles(files);
  expect(result).toHaveLength(2);
  expect(result[0]).toHaveProperty('file_name', 'ejemplo.txt');
  expect(result[1]).toHaveProperty('file_name', 'ejemplo1.txt');
});

test('should return an array of file responses with word occurrences when a word is provided', async () => {
  const files = {
    file1: { name: 'ejemplo.txt', tempFilePath: './ejemplo.txt' },
    file2: { name: 'ejemplo1.txt', tempFilePath: './ejemplo1.txt' },
  };
  const word = 'HOLA';
  const result = await handleFiles(files, word);
  expect(result).toHaveLength(2);
  expect(result[0]).toHaveProperty('file_name', 'ejemplo.txt');
  expect(result[0]).toHaveProperty('word_occurrences');
  expect(result[1]).toHaveProperty('file_name', 'ejemplo1.txt');
  expect(result[1]).toHaveProperty('word_occurrences');
});
