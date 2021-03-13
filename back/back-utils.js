//GET ALL URLS - DEFAULT BIN :)
const fs = require("fs");
const assert = require("assert");
const base_url = "https://localhost:3000";

const readFileInSystem = (location) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./back/${location}.json`, (err, allUsers) => {
      if (err) {
        console.log(err.message);
      }

      allUsers = allUsers.toString("utf8");
      resolve([allUsers]);
    });
  });
};

const addUser = (location, userObject) => {
  readFileInSystem(location).then((allUsers) => {
    allUsers.push(userObject);
    fs.writeFile(`./back/${location}.json`, `${allUsers}`, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  });
};

const tempArr = [];
const logKey = async (location, key) => {
  console.log(tempArr);
  allLogs = [];
  allLogs.push(key);
  allLogs.forEach((obj) => {
    tempArr.push(obj);
  });
  fs.writeFile(`./back/${location}.json`, `${tempArr}`, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
  // });
};

module.exports = {
  readFileInSystem,
  addUser,
  logKey,
  tempArr,
};
