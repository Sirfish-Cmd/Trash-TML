document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkmode");
  const htmlElement = document.documentElement;

  // Check for saved preference in localStorage
  if (localStorage.getItem("darkMode") === "true") {
    htmlElement.classList.add("dark");
    darkModeToggle.checked = true;
  }

  // Toggle dark mode when checkbox is clicked
  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      htmlElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  });
});
