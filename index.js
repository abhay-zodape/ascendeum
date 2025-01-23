const difficultyInput = document?.getElementById("difficultyInput");
const pauseButton = document?.getElementById("pause");
const startButton = document?.getElementById("start");
const reset = document?.getElementById("reset");
const boxContainer = document?.getElementById("boxContainer");
const reactionsContainer = document?.getElementById("reactionsContainer");

let difficultyInputValue = "";
let timer = 0;
let reactions = [];

let totalReactTime = 0;
let isReset = false;
let isPaused = false;

pauseButton.addEventListener("click", () => {
  isPaused = true;
  totalReactTime = 0;
  timer = 0;
});

reset.addEventListener("click", () => {
  difficultyInputValue = "";
  timer = 0;
  reactions = [];
  totalReactTime = 0;
  isReset = true;
  difficultyInput.value = "";
});

difficultyInput.addEventListener("change", (event) => {
  difficultyInputValue = event?.currentTarget?.value;
});

startButton.addEventListener("click", (event) => {
  isReset = false;
  isPaused = false;
  if (difficultyInputValue) {
    timer = difficultyInputValue;

    const box = document.createElement("div");
    box.className = "box";

    box.style.position = "absolute";
    const top = Math.ceil(Math.random() * 400);
    const left = Math.ceil(Math.random() * 400);

    box.style.top = `${top > 380 ? top - 20 : top}px`;
    box.style.left = `${left > 380 ? left - 20 : left}px`;

    boxContainer.appendChild(box);

    box.addEventListener("click", () => {
      timer = difficultyInputValue;
      const top = Math.ceil(Math.random() * 400);
      const left = Math.ceil(Math.random() * 400);

      box.style.top = `${top > 380 ? top - 20 : top}px`;
      box.style.left = `${left > 380 ? left - 20 : left}px`;
      reactionsContainer.innerHTML = "";
      reactions.push(totalReactTime);

      reactions.forEach((time, index) => {
        const timeElement = document.createElement("div");
        timeElement.innerHTML = `<span>click${
          index + 1
        }</span>  ||  <span>${time}s</span>`;

        reactionsContainer.appendChild(timeElement);
      });
      totalReactTime = 0;

      console.log({ reactions });

      if (isReset) {
        reactionsContainer.innerHTML = "";
      }
    });

    const id = setInterval(() => {
      if (difficultyInputValue && !isPaused) {
        timer = Number(timer) - 1;
        totalReactTime += 1;
        console.log({ timer });

        if (timer === 0) {
          timer = difficultyInputValue;

          const top = Math.ceil(Math.random() * 400);
          const left = Math.ceil(Math.random() * 400);

          box.style.top = `${top > 380 ? top - 20 : top}px`;
          box.style.left = `${left > 380 ? left - 20 : left}px`;
        }
      }
      if (isReset) {
        clearInterval(id);
        boxContainer.removeChild(box);
        reactionsContainer.innerHTML = "";
        isReset = false;
      }
      if (isPaused && box) {
        boxContainer.removeChild(box);
        clearInterval(id);
        isPaused = false;
        totalReactTime = 0;
      }
    }, 1000);
  }
});
