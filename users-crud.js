const {
  readFilePromise: readFile,
  writeFilePromise: writeFile,
  accessPromise: access
} = require('./fs-promises');

const userProperties = [
  'uid',
  'firstname',
  'lastname',
  'city',
  'postalCode',
  'phoneNumber',
  'position'
];

const getUsers = async (usersFilePath) => {
  try {
    if (typeof usersFilePath !== 'string') {
      throw new Error(`invalid input type: "usersFilePath"`);
    }

    await access(usersFilePath);
    const usersAsJson = await readFile(usersFilePath, 'utf-8');
    const users = JSON.parse(usersAsJson);

    return users;
  } catch (err) {
    throw err;
  }
};

const readAllUsersData = async (usersFilePath) => {
  try {
    // validation
    if (typeof usersFilePath !== 'string') {
      return console.info('[i] invalid input type(usersFilePath)');
    }

    const users = await getUsers(usersFilePath);

    console.table(users);
  } catch (err) {
    console.error(`[-] users-crud > readAllUsersData ${err.message}`);
  }
};

const readUserDataByUid = async (usersFilePath, uid) => {
  try {
    // validation
    if (typeof usersFilePath !== 'string') {
      return console.info('[i] invalid input type(usersFilePath)');
    }

    if (typeof uid !== 'number') {
      return console.info('[i] invalid input type(uid)');
    }

    const users = await getUsers(usersFilePath);

    const user = users.find((user) => user.uid === uid);
    if (!user) return console.info(`[i] user (uid: ${uid}) not found.`);

    console.table(user);
  } catch (err) {
    console.error(`[-] users-crud > getUserDataByUid ${err.message}`);
  }
};

const addUser = async (usersFilePath, newUserData) => {
  try {
    // validation
    if (typeof usersFilePath !== 'string') {
      return console.info('[i] invalid input type(usersFilePath)');
    }
    if (
      typeof newUserData !== 'object' ||
      Array.isArray(newUserData) ||
      newUserData === null
    ) {
      return console.info('[i] invalid input type(newUserData)');
    }

    // sanitization
    if (userProperties.length !== Object.keys(newUserData).length) {
      return console.info('[i] invalid input - keys length');
    }

    for (const key in newUserData) {
      if (!newUserData[key] || !userProperties.includes(key)) {
        return console.info(`[i] invalid input (${key})`);
      }
    }

    const users = await getUsers(usersFilePath);

    const duplicatedUser = users.find((user) => user.uid === newUserData.uid);
    if (!!duplicatedUser) {
      return console.info('[i] duplicated user!');
    }

    // add user data
    users.push(newUserData);
    const usersAsJson = JSON.stringify(users);

    await access(usersFilePath);
    await writeFile(usersFilePath, usersAsJson);

    return console.info(`user [uid: ${newUserData.uid}] added successfully.`);
  } catch (err) {
    console.error(`[-] users-crud > addUser ${err.message}`);
  }
};

const editUserDataByUid = async (usersFilePath, uid, modifiedUser) => {
  try {
    // validation
    if (typeof usersFilePath !== 'string') {
      return console.info('[i] invalid input type(usersFilePath)');
    }
    if (typeof uid !== 'number') {
      return console.info('[i] invalid input type(uid)');
    }
    if (
      typeof modifiedUser !== 'object' ||
      Array.isArray(modifiedUser) ||
      modifiedUser === null
    ) {
      return console.info('[i] invalid input type(modifiedUser)');
    }

    // sanitization
    for (const key in modifiedUser) {
      if (!modifiedUser[key] || !userProperties.includes(key)) {
        return console.info(`inalid input (${key})`);
      }
    }

    let users = await getUsers(usersFilePath);

    const targetUser = users.find((user) => user.uid === uid);
    if (!targetUser) return console.info(`user (uid: ${uid}) not found!`);

    if (!!modifiedUser.uid && uid !== modifiedUser.uid) {
      const duplicatedUser = users.find(
        (user) => user.uid === modifiedUser.uid
      );
      if (!!duplicatedUser) return console.info('[i] duplicated user! :)');
    }

    // edit(patch) user data
    users = users.map((user) => {
      if (user.uid === uid) {
        return { ...user, ...modifiedUser };
      }
      return user;
    });
    const usersAsJson = JSON.stringify(users);

    await access(usersFilePath);
    await writeFile(usersFilePath, usersAsJson);

    return console.info(`user (uid: ${uid}) edited successfully`);
  } catch (err) {
    console.error(`[-] users-crud > addUser ${err.message}`);
  }
};

module.exports = {
  addUser,
  readAllUsersData,
  readUserDataByUid,
  editUserDataByUid
};
