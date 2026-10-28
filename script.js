
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const profilePhoto = document.getElementById("profilePhoto");
  const currentYear = document.getElementById("currentYear");
  const navLinks = document.querySelectorAll(".navbar nav a");
  const sections = document.querySelectorAll("main section[id]");

  // Update the copyright year automatically.
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Light and dark theme toggle.
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector("i");

    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-theme");

      if (themeIcon) {
        themeIcon.className = isLight
          ? "fa-solid fa-sun"
          : "fa-solid fa-moon";
      }

      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
    });
  }

  // Profile photo fallback.
  if (profilePhoto) {
    profilePhoto.addEventListener("error", () => {
      profilePhoto.alt =
        "Profile photo unavailable. Check the image filename.";
      profilePhoto.style.objectFit = "contain";
      profilePhoto.style.padding = "20px";
      profilePhoto.style.background = "var(--surface)";

      profilePhoto.src =
        "data:image/svg+xml," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg"
               width="300" height="340">
            <rect width="100%" height="100%" fill="#142139"/>
            <text x="50%" y="50%"
              dominant-baseline="middle"
              text-anchor="middle"
              font-family="Arial"
              font-size="76"
              font-weight="bold"
              fill="#65a4ff">SJ</text>
          </svg>
        `);
    });
  }

  // Highlight the navigation link for the visible section.
  function updateActiveLink() {
    let currentSection = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;

      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive =
        link.getAttribute("href") === `#${currentSection}`;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, {
    passive: true
  });

  updateActiveLink();

  // ==========================================
  // CERTIFICATE PREVIEW / POPUP FUNCTIONALITY
  // ==========================================

  const certificateModal =
    document.getElementById("certificateModal");

  const modalImage =
    document.getElementById("modalImage");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalClose =
    document.getElementById("modalClose");

  // Open the certificate popup.
  function openCertificate(imagePath, title) {
    if (!certificateModal || !modalImage) {
      console.error(
        "Certificate modal not found. Check your certificate HTML."
      );
      return;
    }

    modalImage.src = imagePath;
    modalImage.alt = title || "Certificate preview";

    if (modalTitle) {
      modalTitle.textContent = title || "Certificate Preview";
    }

    certificateModal.hidden = false;
    document.body.style.overflow = "hidden";

    if (modalClose) {
      modalClose.focus();
    }
  }

  // Close the certificate popup.
  function closeCertificate() {
    if (!certificateModal) return;

    certificateModal.hidden = true;
    document.body.style.overflow = "";
  }

  // Attach click events to certificate images and buttons.
  const certificateTriggers = document.querySelectorAll(
    ".certificate-image, .view-certificate"
  );

  certificateTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const card = trigger.closest(".certificate-card");

      const imagePath =
        trigger.dataset.image ||
        card?.querySelector(".certificate-image")?.dataset.image ||
        card?.querySelector(".certificate-image")?.getAttribute("src");

      const title =
        trigger.dataset.title ||
        card?.querySelector(".certificate-info h3")?.textContent ||
        "Certificate Preview";

      if (imagePath) {
        openCertificate(imagePath, title);
      } else {
        console.error("Certificate image path is missing.");
      }
    });
  });

  // Close using the close button.
  if (modalClose) {
    modalClose.addEventListener("click", closeCertificate);
  }

  // Close when clicking outside the popup content.
  if (certificateModal) {
    certificateModal.addEventListener("click", (event) => {
      if (event.target === certificateModal) {
        closeCertificate();
      }
    });
  }

  // Close using the Escape key.
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      certificateModal &&
      !certificateModal.hidden
    ) {
      closeCertificate();
    }
  });
});


// Certificate Preview System

document.addEventListener("DOMContentLoaded", () => {

    const certificateModal = document.getElementById("certificateModal");
    const certificateModalImage = document.getElementById("certificateModalImage");

    // Open certificate preview
    document.querySelectorAll(
        '.certificate-card [data-image]'
    ).forEach(button => {

        button.addEventListener("click", () => {

            const imagePath = button.dataset.image;
            const imageTitle = button.dataset.title;

            if (certificateModal && certificateModalImage) {

                certificateModalImage.src = imagePath;
                certificateModalImage.alt = imageTitle || "Certificate Preview";

                certificateModal.style.display = "flex";

            }

        });

    });

    // Close certificate modal
    const closeButton = document.querySelector(".close-certificate");

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            certificateModal.style.display = "none";
        });
    }

    // Close modal by clicking outside image
    if (certificateModal) {
        certificateModal.addEventListener("click", (event) => {
            if (event.target === certificateModal) {
                certificateModal.style.display = "none";
            }
        });
    }

});
