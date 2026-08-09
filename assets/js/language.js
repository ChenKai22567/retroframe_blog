(function () {
  var languageLinks = document.querySelectorAll("[data-language]");

  languageLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      try {
        window.localStorage.setItem("retroframe-language", link.dataset.language);
      } catch (error) {
        // The language link still works when browser storage is unavailable.
      }
    });
  });
})();
