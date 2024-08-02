const {
  addUser,
  readAllUsersData,
  editUserDataByUid,
  deleteUserDataByUid,
  deleteAllUsersData
} = require('./users-crud');
const { join } = require('path');

// IIFE - main
(async () => {
  const usersPath = join(__dirname, 'user-data.json');

  await addUser(usersPath, {
    uid: 2,
    firstname: 'erfan',
    lastname: 'mohammadi',
    city: 'karaj',
    postalCode: '2345672345',
    phoneNumber: '03111234234',
    position: 'ui designer'
  });

  // await editUserDataByUid(usersPath, 2, {
  //   uid: 3,
  //   firstname: 'behnam'
  // });
  // await deleteUserDataByUid(usersPath, 3);
  // await deleteAllUsersData(usersPath);
  // await readAllUsersData(usersPath);

  await readAllUsersData('./user-data.json');
})().catch(console.error);
