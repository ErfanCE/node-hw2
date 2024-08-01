const { readFile, access, constants } = require('node:fs');

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

module.exports = { readFilePromise, accessPromise };
