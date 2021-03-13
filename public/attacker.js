const baseUrl = "http://localhost:3000";
const logList = document.querySelector("#log-list");
let tag = false;
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
function pageScroll() {
  window.scrollBy(0, 1);
  scrolldelay = setTimeout(pageScroll, 10);
}
const getKeyLogs = async () => {
  try {
    let { data } = await axios({
      method: "GET",
      url: `${baseUrl}/keylogs`,
      data: {},
    });
    console.log(data);
    deleteElements(logList, "li");
    data.forEach((log) => {
      const listItem = createListItem("log", createLogElement("log-span", log));
      logList.appendChild(listItem);
      //   if (!tag) {
      //     pageScroll();
      //   }
    });
  } catch ({ message }) {
    console.log(message);
  }
};

setInterval(getKeyLogs, 2000);

// window.addEventListener("doubleclick", () => {
//   tag = !tag;
// });
