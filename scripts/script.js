let character = document.querySelector(".character");
let map = document.querySelector(".map");
let characterElement = document.getElementById("character");
const audioDance = new Audio("assets/audio/audioMusic.mp3");

audioDance.volume = 0.07;
let audioDelay = 7000;

let x = 90;
let y = 34;
let held_directions = [];
let speed = 1;

const placeCharacter = () => {
  let pixelSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--pixel-size")
  );

  const held_direction = held_directions[0];
  if (held_direction) {
    if (held_direction === directions.right) {
      x += speed;
    }
    if (held_direction === directions.left) {
      x -= speed;
    }
    if (held_direction === directions.down) {
      y += speed;
    }
    if (held_direction === directions.up) {
      y -= speed;
    }
    character.setAttribute("facing", held_direction);
  }
  character.setAttribute("walking", held_direction ? "true" : "false");

  let leftLimit = -8;
  let rightLimit = 16 * 11 + 8;
  let topLimit = -8 + 32;
  let bottomLimit = 16 * 7;
  if (x < leftLimit) {
    x = leftLimit;
  }
  if (x > rightLimit) {
    x = rightLimit;
  }
  if (y < topLimit) {
    y = topLimit;
  }
  if (y > bottomLimit) {
    y = bottomLimit;
  }

  let camera_left = pixelSize * 66;
  let camera_top = pixelSize * 42;

  map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${
    -y * pixelSize + camera_top
  }px, 0 )`;
  character.style.transform = `translate3d( ${x * pixelSize}px, ${
    y * pixelSize
  }px, 0 )`;
};

const step = () => {
  placeCharacter();
  window.requestAnimationFrame(() => {
    step();
  });
};
step();

const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};

const keys = {
  38: directions.up,
  37: directions.left,
  39: directions.right,
  40: directions.down,
};

document.addEventListener("keydown", (e) => {
  let dir = keys[e.which];
  if (dir && held_directions.indexOf(dir) === -1) {
    held_directions.unshift(dir);
  }
});

document.addEventListener("keyup", (e) => {
  let dir = keys[e.which];
  let index = held_directions.indexOf(dir);
  if (index > -1) {
    held_directions.splice(index, 1);
  }
});

let isPressed = false;
const removePressedAll = () => {
  document.querySelectorAll(".dpad-button").forEach((d) => {
    d.classList.remove("pressed");
  });
};

document.body.addEventListener("mousedown", () => {
  isPressed = true;
});

document.body.addEventListener("mouseup", () => {
  isPressed = false;
  held_directions = [];
  removePressedAll();
});

const handleDpadPress = (direction, click) => {
  if (click) {
    isPressed = true;
  }
  held_directions = isPressed ? [direction] : [];

  if (isPressed) {
    removePressedAll();
    characterElement.classList.add("character_spritesheet");
    characterElement.classList.remove("character_dance");
    audioDance.pause();
    audioDance.currentTime = 0;
    document.querySelector(".dpad-" + direction).classList.add("pressed");
  }
};

document
  .querySelector(".dpad-left")
  .addEventListener("touchstart", (e) =>
    handleDpadPress(directions.left, true)
  );

document
  .querySelector(".dpad-up")
  .addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document
  .querySelector(".dpad-right")
  .addEventListener("touchstart", (e) =>
    handleDpadPress(directions.right, true)
  );

document
  .querySelector(".dpad-down")
  .addEventListener("touchstart", (e) =>
    handleDpadPress(directions.down, true)
  );

document
  .querySelector(".dpad-left")
  .addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document
  .querySelector(".dpad-up")
  .addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document
  .querySelector(".dpad-right")
  .addEventListener("mousedown", (e) =>
    handleDpadPress(directions.right, true)
  );

document
  .querySelector(".dpad-down")
  .addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document
  .querySelector(".dpad-left")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.left));

document
  .querySelector(".dpad-up")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.up));

document
  .querySelector(".dpad-right")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.right));

document
  .querySelector(".dpad-down")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.down));

function dance() {
  characterElement.classList.remove("character_spritesheet");
  characterElement.classList.add("character_dance");

  audioDance.play();

  setTimeout(function () {
    characterElement.classList.add("character_spritesheet");
    characterElement.classList.remove("character_dance");
  }, 7000);
}
