document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle")
  const themeIcon = themeToggle.querySelector("i")
  const htmlElement = document.documentElement

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light")

  // Set initial theme
  htmlElement.setAttribute("data-theme", currentTheme)
  updateThemeIcon(currentTheme)

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    htmlElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    updateThemeIcon(newTheme)

    // Add transition class for smooth theme change
    htmlElement.classList.add("theme-transition")
    setTimeout(() => {
      htmlElement.classList.remove("theme-transition")
    }, 300)
  })

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.className = "fas fa-sun"
    } else {
      themeIcon.className = "fas fa-moon"
    }
  }

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light"
      htmlElement.setAttribute("data-theme", newTheme)
      updateThemeIcon(newTheme)
    }
  })
})
