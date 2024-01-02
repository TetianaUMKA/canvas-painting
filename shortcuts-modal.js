"use strict";

const shortcutsModal = document.querySelector(".shortcuts-modal-container");
const overlay = document.querySelector(".overlay");
const openShortcutsModalBtn = document.querySelector(".shortcuts-open-btn");
const closeShortcutsModalBtn = document.querySelector(
  "#close-shortcuts-modal-btn"
);

const openShortcutsModal = function () {
  shortcutsModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  console.log("click");
};
const closeShortcutsModal = function () {
  shortcutsModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

openShortcutsModalBtn.addEventListener("click", openShortcutsModal);
closeShortcutsModalBtn.addEventListener("click", closeShortcutsModal);
overlay.addEventListener("click", closeShortcutsModal);
