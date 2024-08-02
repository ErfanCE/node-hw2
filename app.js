const {
  addUser,
  readAllUsersData,
  readUserDataByUid
} = require('./users-crud');

const main = async () => {
  try {
    const usersPath = './user-data.json';

    await addUser(usersPath, {
      uid: 2,
      firstname: 'erfan',
      lastname: 'mohammadi',
      city: 'karaj',
      postalCode: '2345672345',
      phoneNumber: '03111234234',
      position: 'ui designer'
    });

    await readAllUsersData(usersPath);
  } catch (err) {
    console.error(`[-] main ${err.message}`);
  }
};

main();
