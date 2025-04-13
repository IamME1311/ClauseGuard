document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const navToggle = document.getElementById("nav-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", (e) => {
      e.preventDefault()
      navLinks.classList.toggle("nav-open")
      navToggle.setAttribute("aria-expanded", navToggle.getAttribute("aria-expanded") === "true" ? "false" : "true")

      // Change icon based on state
      const icon = navToggle.querySelector("i")
      if (icon) {
        if (navLinks.classList.contains("nav-open")) {
          icon.className = "fas fa-times"
        } else {
          icon.className = "fas fa-bars"
        }
      }
    })
  }

  // Close mobile nav when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navLinks &&
      navLinks.classList.contains("nav-open") &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navLinks.classList.remove("nav-open")
      navToggle.setAttribute("aria-expanded", "false")

      // Reset icon
      const icon = navToggle.querySelector("i")
      if (icon) {
        icon.className = "fas fa-bars"
      }
    }
  })

  // Add active class to current page link
  const currentPath = window.location.pathname
  const navLinkElements = document.querySelectorAll(".nav-link")

  navLinkElements.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPath || (href !== "/" && currentPath.startsWith(href))) {
      link.classList.add("active")
    }
  })
})
