const { readFile, writeFile, access, constants } = require('node:fs/promises');
// const path = require('node:path');

const extractDataFromText = (text) => {
  return text
    .split('\n')
    .filter((item) => !!item)
    .map((item) => item.split(' - '));
};

const formatter = (users) => {
  return users
    .map((user) => {
      const { name, phoneNumbers = null } = user;

      if (phoneNumbers === null) {
        return `${name} hasn't any phone number.`;
      }
      if (phoneNumbers.length === 1) {
        return `${name}'s phone number is ${phoneNumbers[0]}`;
      }
      return `${name}'s phone numbers are ${phoneNumbers.join(', ')}`;
    })
    .join('\n');
};

async function main() {
  const users = [];

  await access('./names.txt', constants.F_OK);
  await access('./numbers.txt', constants.F_OK);

  let names = await readFile('./names.txt', 'utf-8');
  let numbers = await readFile('./numbers.txt', 'utf-8');

  names = extractDataFromText(names);
  numbers = extractDataFromText(numbers);

  for (const [id, name] of names) {
    users.push({ id, name });
  }

  for (const [id, number] of numbers) {
    const user = users.find((user) => user.id === id);

    if (!!user.phoneNumbers) user.phoneNumbers = [...user.phoneNumbers, number];
    else user.phoneNumbers = [number];
  }

  await writeFile('./users-data.txt', formatter(users));
}
// main().catch(console.error);
