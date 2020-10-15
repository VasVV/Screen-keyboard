class Keyboard {
  constructor() {
    this.main = null;
    this.keysContainer = null;
    this.keys = [];
    this.oninput = null;
    this.onclose = null;
    this.isClosed = false;
    this.capslock = false;
    this.value = [];
  }
  init() {
    this.main = document.createElement("div");
    this.keysContainer = document.createElement("div");
    this.main.classList.add("keyboard");
    this.keysContainer.classList.add("keyboard-keys");
    this.keysContainer.appendChild(this.createKeys());

    this.keys = this.keysContainer.querySelectorAll(
      ".keyboard-key"
    );
    this.main.appendChild(this.keysContainer);

    document.body.appendChild(this.main);
  };
  createKeys() {
    let fragment = document.createDocumentFragment();

    let keyboard = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      0,
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "capslock",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      "space",
      "done",
    ];

    let createIcon = (name) => {
      return `<i class='material-icons'>${name}</>`;
    };

    keyboard.forEach((e) => {
      let keyEl = document.createElement("button");
      let isBreak;
      switch (e) {
        case 'backspace':
          isBreak = true;
          break;
        case 'p':
          isBreak = true;
          break;
        case 'enter':
          isBreak = true;
          break;
        case 'm':
          isBreak = true;
          break;
      }
      
      keyEl.setAttribute("type", "button");
      keyEl.classList.add("keyboard-key");

      if (e == "backspace") {
        keyEl.classList.add("keyboard-key--wide");
        keyEl.innerHTML = createIcon("backspace");
        keyEl.addEventListener("click", () => {
          this.value.pop();
          document.getElementById(
            "text"
          ).textContent = this.value.join("");
          this.trigger("input");
        });
      } else if (e == "capslock") {
        keyEl.classList.add(
          "keyboard-key--wide",
          "keyboard-key--activatable",
          "caps"
        );
        keyEl.innerHTML = "caps";
        keyEl.addEventListener("click", () => {
          this.capslock();
          this.capslock
            ? keyEl.classList.add("keyboard-key--active")
            : keyEl.classList.remove("keyboard-key--active");
        });
      } else if (e == "enter") {
        keyEl.classList.add("keyboard-key--wide");
        keyEl.innerHTML = createIcon("keyboard_return");
        keyEl.addEventListener("click", () => {
          this.value.push("\n");
          document.getElementById(
            "text"
          ).textContent = this.value.join("");
          this.trigger("input");
        });
      } else if (e == "space") {
        keyEl.classList.add("keyboard-key--extra-wide");
        keyEl.innerHTML = createIcon("keyboard");
        keyEl.addEventListener("click", () => {
          this.value.push(" ");
          this.trigger("input");
          document.getElementById(
            "text"
          ).textContent = this.value.join("");
        });
      } else if (e == "done") {
        keyEl.classList.add("keyboard-key--wide", "keyboard-key--dark");
        keyEl.id = "donebtn";

        keyEl.innerHTML = createIcon("check_circle");
        keyEl.addEventListener("click", () => {
          this.close();
          this.trigger("close");
        });
      } else {
        keyEl.classList.add("keyboard-key");
        keyEl.textContent = e;

        keyEl.addEventListener("click", () => {
          if (/[0-9]/.test(e)) {
            this.value.push(e);
            document.getElementById(
              "text"
            ).textContent = this.value.join("");
          } else {
            this.capslock
              ? this.value.push(e.toUpperCase())
              : this.value.push(e.toLowerCase());
            document.getElementById(
              "text"
            ).textContent = this.value.join("");
            this.trigger(e);
          }
        });
      }

      fragment.appendChild(keyEl);
      if (isBreak) {
        let br = document.createElement("br");
        fragment.appendChild(br);
      }
    });

    return fragment;
  };
  trigger(handler) {
    console.log(handler);
    if (typeof this[handler] == "function") {
      this[handler](this.value);
    }
  };

  capslock() {
    this.capslock = !this.capslock;
    for (let key of this.keys) {
      if (key.childElementCount == 0) {
        key.textContent = this.capslock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
    
  };
  openclose(initval, open, close) {
    let init = initval.split("");
    this.value = this.value.concat(init) || "";
  };
  close() {
    this.main.classList.add("keyboard--hidden");
    this.isClosed = true;
  };
};

let keyboard = new Keyboard();

window.addEventListener("DOMContentLoaded", () => {
  keyboard.init();
});

window.addEventListener("DOMContentLoaded", () => {
document.getElementById('text').addEventListener("click", () => {
  if (keyboard.eventHandlers.isClosed) {
    
    keyboard.init();
    keyboard.eventHandlers.isClosed = false;
  } else {
    console.log("not closed");
  }
});
});
