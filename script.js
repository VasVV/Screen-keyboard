const Keyboard = {
  elems: {
    main: null,
    keysContainer: null,
    keys: [],
  },
  eventHandlers: {
    oninput: null,
    onclose: null,
    isClosed: false,
  },
  properties: {
    capslock: false,
    value: [],
  },
  init() {
    this.elems.main = document.createElement("div");
    this.elems.keysContainer = document.createElement("div");
    this.elems.main.classList.add("keyboard");
    this.elems.keysContainer.classList.add("keyboard-keys");
    this.elems.keysContainer.appendChild(this.createKeys());

    this.elems.keys = this.elems.keysContainer.querySelectorAll(
      ".keyboard-key"
    );
    this.elems.main.appendChild(this.elems.keysContainer);

    console.log(this.elems.keysContainer);

    document.body.appendChild(this.elems.main);
  },
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
      //console.log(keyEl);
      let isBreak;
      if (e == "backspace") {
        isBreak = true;
      }
      if (e == "p") {
        isBreak = true;
      }
      if (e == "enter") {
        isBreak = true;
      }
      if (e == "m") {
        isBreak = true;
      }
      keyEl.setAttribute("type", "button");
      keyEl.classList.add("keyboard-key");

      if (e == "backspace") {
        keyEl.classList.add("keyboard-key--wide");
        keyEl.innerHTML = createIcon("backspace");
        keyEl.addEventListener("click", () => {
          this.properties.value.pop();
          document.getElementById(
            "text"
          ).textContent = this.properties.value.join("");
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
          this.properties.capslock
            ? keyEl.classList.add("keyboard-key--active")
            : keyEl.classList.remove("keyboard-key--active");
        });
      } else if (e == "enter") {
        keyEl.classList.add("keyboard-key--wide");
        keyEl.innerHTML = createIcon("keyboard_return");
        keyEl.addEventListener("click", () => {
          this.properties.value.push("\n");
          document.getElementById(
            "text"
          ).textContent = this.properties.value.join("");
          this.trigger("input");
        });
      } else if (e == "space") {
        keyEl.classList.add("keyboard-key--extra-wide");
        keyEl.innerHTML = createIcon("keyboard");
        keyEl.addEventListener("click", () => {
          this.properties.value.push(" ");
          this.trigger("input");
          document.getElementById(
            "text"
          ).textContent = this.properties.value.join("");
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
            this.properties.value.push(e);
            document.getElementById(
              "text"
            ).textContent = this.properties.value.join("");
          } else {
            console.log(this.properties.value);
            this.properties.capslock
              ? this.properties.value.push(e.toUpperCase())
              : this.properties.value.push(e.toLowerCase());
            document.getElementById(
              "text"
            ).textContent = this.properties.value.join("");
            this.trigger(e);
          }
        });
      }
      //console.log(keyEl);
      fragment.appendChild(keyEl);
      if (isBreak) {
        let br = document.createElement("br");
        fragment.appendChild(br);
      }
    });

    return fragment;
  },
  trigger(handler) {
    console.log(handler);
    if (typeof this.eventHandlers[handler] == "function") {
      this.eventHandlers[handler](this.properties.value);
    }
  },

  capslock() {
    this.properties.capslock = !this.properties.capslock;
    //console.log(this.properties.capslock);
    for (let key of this.elems.keys) {
      if (key.childElementCount == 0) {
        key.textContent = this.properties.capslock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
    console.log(this.properties.value);
  },
  openclose(initval, open, close) {
    let init = initval.split("");
    this.properties.value = this.properties.value.concat(init) || "";
  },
  close() {
    this.elems.main.classList.add("keyboard--hidden");
    this.eventHandlers.isClosed = true;
  },
};

window.addEventListener("DOMContentLoaded", () => {
  Keyboard.init();
});

document.getElementById("text").addEventListener("click", () => {
  console.log(Keyboard.eventHandlers.isClosed);
  if (Keyboard.eventHandlers.isClosed) {
    console.log(Keyboard.eventHandlers.isClosed);
    Keyboard.init();
    Keyboard.eventHandlers.isClosed = false;
  } else {
    console.log("not closed");
  }
});
