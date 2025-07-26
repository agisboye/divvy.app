import "./style.css"

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute("href")!)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
}

// Initialize interactive features when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScrolling()
  console.log("Divvy interactive features initialized")
})
