"use strict";
let canv = document.getElementById("canvas"),
  ctx = canv.getContext("2d"),
  isMouseDown = false,
  coords = [];

canv.width = window.innerWidth;
canv.height = window.innerHeight;

canv.addEventListener("mousedown", function () {
  isMouseDown = true;
});

canv.addEventListener("mouseup", function () {
  isMouseDown = false;
  ctx.beginPath();
  coords.push("mouseup");
});

ctx.lineWidth = 5 * 2;
canv.addEventListener("mousemove", function (e) {
  if (isMouseDown) {
    coords.push([e.clientX, e.clientY]);

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
});

function save() {
  localStorage.setItem("coords", JSON.stringify(coords));
}

function clear() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canv.width, canv.height);

  ctx.beginPath();
  ctx.fillStyle = "black";
}

function replay() {
  const timer = setInterval(function () {
    if (!coords.length) {
      clearInterval(timer);
      ctx.beginPath();
      return;
    }
    const crd = coords.shift(),
      e = {
        clientX: crd["0"],
        clientY: crd["1"],
      };

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }, 30);
}

document.addEventListener("keydown", function (e) {
  // console.log(e.keyCode);
  if (e.keyCode === 67) {
    // save C
    save();
    console.log("Saved");
  }
  if (e.keyCode == 86) {
    // replay V
    coords = JSON.parse(localStorage.getItem("coords"));

    clear();
    replay();

    console.log("Replayed");
  }
  if (e.keyCode == 90) {
    // clear Z
    clear();
    console.log("Cleared");
  }
});
