const {
  addUser,
  readAllUsersData,
  editUserDataByUid
} = require('./users-crud');

// IIFE - main
(async () => {
  const usersPath = './user-data.json';

  // await addUser(usersPath, {
  //   uid: 2,
  //   firstname: 'erfan',
  //   lastname: 'mohammadi',
  //   city: 'karaj',
  //   postalCode: '2345672345',
  //   phoneNumber: '03111234234',
  //   position: 'ui designer'
  // });

  // await editUserDataByUid(usersPath, 2, {
  //   uid: 3,
  //   firstname: 'behnam'
  // });

  await readAllUsersData(usersPath);
})().catch(console.error);
