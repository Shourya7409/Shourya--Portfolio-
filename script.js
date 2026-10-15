
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section[id]");
const topButton = document.getElementById("topButton");

// Highlight the section currently being viewed.
function updateActiveLink() {
  let currentSection = "home";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 150) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + currentSection
    );
  });
}

window.addEventListener("scroll", () => {
  updateActiveLink();

  if (topButton) {
    topButton.style.display =
      window.scrollY > 300 ? "block" : "none";
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Scroll back to the top.
if (topButton) {
  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Show a message if the profile photo cannot be loaded.
const profilePhoto = document.querySelector(".profile-photo");

if (profilePhoto) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.alt = "Photo unavailable - add profile.jpg";
    profilePhoto.style.background = "#1b0a39";
  });
}

updateActiveLink();
