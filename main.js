// data start
let users = [
  {
    name: "User 1",
    password: "pass111",
    age: 30,
    isLogin: false,
    getMessage: [],
    sendMessage: [],
  },
  {
    name: "User 2",
    password: "pass222",
    age: 33,
    isLogin: false,
    getMessage: [],
    sendMessage: [],
  },
  {
    name: "User 3",
    password: "pass333",
    age: 21,
    isLogin: false,
    getMessage: [],
    sendMessage: [],
  },
  {
    name: "User 4",
    password: "pass444",
    age: 56,
    isLogin: false,
    getMessage: [],
    sendMessage: [],
  },
  {
    name: "User 5",
    password: "pass555",
    age: 42,
    isLogin: false,
    getMessage: [],
    sendMessage: [],
  },
  {
    name: "User 6",
    password: "pass666",
    age: 13,
    isLogin: false,
    getMessage: [],
    sendMessage: [],
  },
  {
    name: "User 7",
    password: "pass777",
    age: 29,
    isLogin: false,
    getMessage: [],
    sendMessage: [],
  },
  {
    name: "User 8",
    password: "pass888",
    age: 53,
    isLogin: false,
    getMessage: [],
    sendMessage: [],
  },
  {
    name: "User 9",
    password: "pass999",
    age: 18,
    isLogin: false,
    getMessage: [],
    sendMessage: [],
  },
  {
    name: "User 10",
    password: "pass000",
    age: 48,
    isLogin: false,
    getMessage: [],
    sendMessage: [],
  },
];

let inSystem = "";

let changeInSystemUser = function (userName = "") {
  inSystem = userName;
  let h3 = document.querySelector("h3");
  inSystem
    ? (h3.innerText = `User: ${inSystem} in system`)
    : (h3.innerText = "No users in system");
};

function checkUniqUsername(username) {
  return users.some((item) => item.name === username);
}

function createUser() {
  let username = prompt("Enter Username");
  if (checkUniqUsername(username)) {
    alert("Name taken");
    return;
  }
  let password = prompt("Enter password");
  let confirmPassword = prompt("Password confirm");
  if (password != confirmPassword) {
    alert("Password invalid");
    return;
  }
  let age = prompt("Enter your age");
  let userObj = {
    name: username,
    password: password,
    age: age,
    isLogin: false,
    getMessage: [],
    sendMessage: [],
  };
  users.push(userObj);
  alert("register successfully");
  console.log(users);
}

function getUserObj(username) {
  return users.find((item) => item.name == username);
}

function checkPassword(username, password) {
  let user = getUserObj(username);
  return user.password == password;
}

function loginUser() {
  let username = prompt("Enter your Name");
  if (!checkUniqUsername(username)) {
    alert("user is not defined");
    return;
  }
  let password = prompt("Enter password");
  if (!checkPassword(username, password)) {
    alert("Password invalid");
    return;
  }
  let user = getUserObj(username);
  user.isLogin = true;
  changeInSystemUser(username);
  alert("Login successfully");
  console.log(users);
}

function findUserIndex(username) {
  return users.findIndex((item) => item.name == username);
}

function deleteUser() {
  if (!inSystem) {
    alert("You not login");
    return;
  }
  let password = prompt("Password confirm");
  if (!checkPassword(inSystem, password)) {
    alert("Password invalid");
    return;
  }
  let userIndex = findUserIndex(inSystem);
  users.splice(userIndex, 1);
  alert("Account deleted");
  inSystem = "";
  changeInSystemUser(inSystem);
  console.log(users);
}

function updateUser() {
  if (!inSystem) {
    alert("You not login");
    return;
  }
  let user = getUserObj(inSystem);
  let choice = prompt(
    "Что вы хотите изменить - имя (name), пароль(password) или возраст (age)?"
  );
  if (choice.toLowerCase() == "name") {
    let newUsername = prompt("Enter new name");
    if (checkUniqUsername(newUsername)) {
      alert("Name taken");
      return;
    }
    user.name = newUsername;
    changeInSystemUser(newUsername);
    alert("Name updated");
    console.log(users);
    return;
  }
  if (choice.toLowerCase() == "password") {
    let oldPassword = prompt("Enter password");
    if (!checkPassword(inSystem, oldPassword)) {
      alert("Invalid password");
      return;
    }
    let newPassword = prompt("Enter new password");
    user.password = newPassword;
    alert("password uodated");
    console.log(users);
    return;
  }
  if (choice.toLowerCase() == "age") {
    let newAge = prompt("Enter new age");
    user.age = newAge;
    alert("Age updated");
    console.log(users);
    return;
  }
}

function sendMessage() {
  if (!inSystem) {
    alert("Only autorized users can send messege");
    return;
  }
  let usernameGetMessage = prompt("кому отправить сообщение (username)");
  let getUser = getUserObj(usernameGetMessage);
  let sendUser = getUserObj(inSystem);
  let messageContent = prompt("Enter message");
  let messageObj = {
    id: Date.now(),
    content: messageContent,
    from: `${sendUser.name} отправил сообщение`,
    to: `${getUser.name} получил сообщение`,
  };

  getUser.getMessage.push(messageObj);
  sendUser.sendMessage.push(messageObj);
  console.log(users);
  return;
}

function checkIdMs(id) {
  return (
    users.some((item) => item.sendMessage.some((item1) => item1.id === id)) ||
    users.some((item) => item.getMessage.some((item1) => item1.id === id))
  );
}

function checkUserIdMs(userName, id) {
  let user = getUserObj(userName);
  return (
    user.sendMessage.some((item) => item.id === id) ||
    user.getMessage.some((item) => item.id === id)
  );
}

function getMessageObj(userName, id) {
  let obj = getUserObj(userName);
  return (
    obj.sendMessage.find((item) => item.id === id) ||
    obj.getMessage.find((item) => item.id === id)
  );
}

function messageFindSent(obj1, obj2) {
  return obj1.sendMessage.some((item) => item === obj2);
}
function messageFindGet(obj1, obj2) {
  return obj1.getMessage.some((item) => item === obj2);
}

function deleteMessage() {
  if (!inSystem) {
    alert("You not login");
    return;
  }
  let idMessage = +prompt("Enter ID the message you want to delete");
  if (!checkIdMs(idMessage)) {
    alert("messageId is not definet");
    return;
  }
  if (!checkUserIdMs(inSystem, idMessage)) {
    alert("this is message don't have you");
    return;
  }
  let userObj = getUserObj(inSystem);
  let messageObj = getMessageObj(inSystem, idMessage);
  console.log(messageObj);
  if (messageFindSent(userObj, messageObj)) {
    userObj.sendMessage.splice(userObj.sendMessage.indexOf(messageObj), 1);
    alert("messege deleted!");
  } else if (messageFindGet(userObj, messageObj)) {
    userObj.getMessage.splice(userObj.getMessage.indexOf(messageObj), 1);
    alert("messege deleted!");
  }

  console.log(users);
}
