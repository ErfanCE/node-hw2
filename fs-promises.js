const { readFile, writeFile, access, constants } = require('node:fs');

const accessPromise = (path) => {
  return new Promise((resolve, reject) => {
    access(path, constants.F_OK, (err) => {
      if (!!err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const readFilePromise = (path, encoding) => {
  return new Promise((resolve, reject) => {
    readFile(path, encoding, (err, data) => {
      if (!!err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFilePromise = (path, data) => {
  return new Promise((resolve, reject) => {
    writeFile(path, data, (err) => {
      if (!!err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = { readFilePromise, writeFilePromise, accessPromise };
