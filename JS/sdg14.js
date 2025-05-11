document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("revealed");

  const navbar = document.getElementById("navbar");
  const mobileMenu = document.getElementById("mobile-menu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      if (!mobileMenu.classList.contains("is-open")) {
        navbar.classList.remove("scrolled");
      }
    }
  });

  const mobileMenuButton = document.getElementById("mobile-menu-toggle-button");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("is-open");
      if (mobileMenu.classList.contains("is-open")) {
        navbar.classList.add("scrolled");
        navbar.querySelector("nav").classList.add("open");
      } else {
        if (window.scrollY <= 50) {
          navbar.classList.remove("scrolled");
          navbar.querySelector("nav").classList.remove("open");
        }
      }
    });
  }

  const mobileNavLinks = mobileMenu.querySelectorAll("a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("is-open")) {
        mobileMenu.classList.remove("is-open");
        if (window.scrollY <= 50) {
          navbar.classList.remove("scrolled");
          navbar.querySelector("nav").classList.remove("open");
        }
      }
    });
  });

  const tabLinks = document.querySelectorAll(".info-tab-link");
  const tabContents = document.querySelectorAll(".info-tab-content");

  tabLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const tabId = link.getAttribute("data-tab");

      tabLinks.forEach((item) => item.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      link.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  if (!document.querySelector(".info-tab-link.active") && tabLinks.length > 0) {
    tabLinks[0].classList.add("active");
    const firstTabId = tabLinks[0].getAttribute("data-tab");
    if (firstTabId) {
      const firstTabContent = document.getElementById(firstTabId);
      if (firstTabContent) {
        firstTabContent.classList.add("active");
      }
    }
  }

  function getSimulatedOceanData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          oceanAcidity: (Math.random() * (8.2 - 7.9) + 7.9).toFixed(2),
          tempAnomaly: (Math.random() * (1.5 - 0.5) + 0.5).toFixed(2),
          microplasticConcentration: (
            Math.random() * (200000 - 50000) +
            50000
          ).toLocaleString(),
          fisheriesBiomass: (Math.random() * (0.9 - 0.6) + 0.6).toFixed(2),
          lastUpdated: new Date().toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        };
        resolve(data);
      }, 1500);
    });
  }

  async function updateThreatMonitoringData() {
    const currentOceanAcidity = document.getElementById(
      "current-ocean-acidity"
    );
    const currentTempAnomaly = document.getElementById("current-temp-anomaly");
    const currentMicroplasticConcentration = document.getElementById(
      "current-microplastic-concentration"
    );
    const currentFisheriesBiomass = document.getElementById(
      "current-fisheries-biomass"
    );
    const lastUpdatedTime = document.getElementById("last-updated-time");

    if (
      currentOceanAcidity &&
      currentTempAnomaly &&
      currentMicroplasticConcentration &&
      currentFisheriesBiomass &&
      lastUpdatedTime
    ) {
      currentOceanAcidity.textContent = "Loading...";
      currentTempAnomaly.textContent = "Loading...";
      currentMicroplasticConcentration.textContent = "Loading...";
      currentFisheriesBiomass.textContent = "Loading...";
      lastUpdatedTime.textContent = "Loading...";

      try {
        const data = await getSimulatedOceanData();

        currentOceanAcidity.textContent = data.oceanAcidity;
        currentTempAnomaly.textContent = data.tempAnomaly;
        currentMicroplasticConcentration.textContent =
          data.microplasticConcentration;
        currentFisheriesBiomass.textContent = data.fisheriesBiomass;
        lastUpdatedTime.textContent = data.lastUpdated;
      } catch (error) {
        console.error("Error fetching threat monitoring data:", error);
        currentOceanAcidity.textContent = "N/A";
        currentTempAnomaly.textContent = "N/A";
        currentMicroplasticConcentration.textContent = "N/A";
        currentFisheriesBiomass.textContent = "N/A";
        lastUpdatedTime.textContent = "Error";
      }
    }
  }

  updateThreatMonitoringData();
  setInterval(updateThreatMonitoringData, 10001);
});
