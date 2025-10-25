var btn = document.getElementById("menu-btn");
var menu = document.getElementById("mobile-menu");
var linkForm = document.getElementById("form");
var linkInput = document.getElementById("input");
var errorMsg = document.getElementById("err-msg");

btn.addEventListener("click", navToggle);
function navToggle() {
  btn.classList.toggle("open");
  // menu.classList.toggle("block");
  // menu.classList.toggle("hidden");
  menu.classList.toggle("opacity-0");
  menu.classList.toggle("scale-95");
  menu.classList.toggle("pointer-events-none");
  menu.classList.toggle("opacity-100");
  menu.classList.toggle("scale-100");
}

linkForm.addEventListener("submit", $linkForm);
function isValidURL(url) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol (optional)
      "((([a-zA-Z0-9\\-])+\\.)+[a-zA-Z]{2,})" + // domain name
      "(\\:[0-9]{1,5})?" + // port (optional)
      "(\\/.*)?$", // path (optional)
    "i"
  );
  return pattern.test(url);
}
function $linkForm(e) {
  e.preventDefault();

  const inputVal = linkInput.value.trim();

  if (inputVal === "") {
    // Empty input
    errorMsg.innerHTML = "URL is required";
    // errorMsg.classList.add("text-red-500");
    // errorMsg.classList.remove("text-white");
    linkInput.classList.add("border-red-500");
    console.log(input);

    // Clear error after 1 second
    setTimeout(() => {
      errorMsg.innerHTML = "";
      linkInput.classList.add("border-red-500");
    }, 1000);
  } else if (!isValidURL(inputVal)) {
    // Invalid URL
    errorMsg.innerHTML = "Enter a valid URL";
    // errorMsg.classList.add("text-red-500");
    // errorMsg.classList.remove("text-white");
    linkInput.classList.add("border-red-500");
    console.log(input);

    // Clear error after 1 second
    setTimeout(() => {
      errorMsg.innerHTML = "";
      linkInput.classList.add("border-red-500");
    }, 1000);
  } else {
    // Valid URL
    errorMsg.innerHTML = "URL Shortened";
    errorMsg.classList.remove("text-red-500");
    errorMsg.classList.add("text-white");
    linkInput.classList.remove("border-red-500");
    console.log(input);
    // Clear error after 1 second
    setTimeout(() => {
      errorMsg.innerHTML = "";
    }, 1000);
  }
}
