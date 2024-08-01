const {
  readFilePromise: readFile,
  accessPromise: access
} = require('./fs-promises');

const getUsers = async (usersFilePath) => {
  try {
    await access(usersFilePath);
    const usersAsJson = await readFile(usersFilePath, 'utf-8');
    const users = JSON.parse(usersAsJson);

    return users;
  } catch (err) {
    console.error(`[-] users-crud > getUsers ${err.message}`);
  }
};

const readAllUsersData = async (usersFilePath) => {
  try {
    const users = await getUsers(usersFilePath);

    console.table(users);
  } catch (err) {
    console.error(`[-] users-crud > readAllUsersData ${err.message}`);
  }
};

const readUserDataByUid = async (usersFilePath, uid) => {
  try {
    const users = await getUsers(usersFilePath);

    const user = users.find((user) => user.uid === uid);
    if (!user) return console.info(`[i] user (uid: ${uid}) not found.`);

    console.table(user);
  } catch (err) {
    console.error(`[-] users-crud > getUserDataByUid ${err.message}`);
  }
};

module.exports = { readAllUsersData, readUserDataByUid };
