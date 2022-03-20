module.exports = function () {
  const { faker } = require("@faker-js/faker");
  const _ = require("lodash");

  const users = (usersNumber) => {
    let contacts = [];
    for (let i = 1; i <= usersNumber; i++) {
      contacts.push({
        id: i,
        userId: Math.round(
          faker.datatype.number({
            min: 0,
            max: 9,
          })
        ),
        name: faker.name.findName(),
        avatar: faker.internet.avatar(),
      });
    }
    return contacts;
  };

  return {
    contacts: users(100),
    users: [
      { email: "test@gmail.com", password: "11111", id: 1 },
      { email: "test2@gmail.com", password: "22222", id: 2 },
      { email: "test3@gmail.com", password: "33333", id: 3 },
      { email: "test4@gmail.com", password: "44444", id: 4 },
      { email: "test5@gmail.com", password: "55555", id: 5 },
      { email: "test6@gmail.com", password: "66666", id: 6 },
      { email: "test7@gmail.com", password: "77777", id: 7 },
      { email: "test8@gmail.com", password: "88888", id: 8 },
      { email: "test9@gmail.com", password: "99999", id: 9 },
    ],
  };
};
