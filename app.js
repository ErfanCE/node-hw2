const { readUserDataByUid } = require('./users-crud');

const main = async () => {
  await readUserDataByUid('./user-data.json', 223344);
};

main().catch((err) => console.log(err));
