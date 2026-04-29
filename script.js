const currentYear = document.getElementById("current-year");
const revealElements = document.querySelectorAll(".reveal");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealElements.forEach((element) => observer.observe(element));

const isLocalPreview = ["localhost", "127.0.0.1", "::1"].includes(
  window.location.hostname
);

if ("serviceWorker" in navigator && !isLocalPreview) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((error) => {
      console.error("Falha ao registrar o service worker.", error);
    });
  });
}
