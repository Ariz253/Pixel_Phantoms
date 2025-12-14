document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("events-container");

  fetch("data/events.json")
    .then(response => response.json())
    .then(events => {

         const upcomingEvents = events
          .filter(e => new Date(e.date) > new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date));

if (upcomingEvents.length > 0) {
  startCountdown(upcomingEvents[0]);
}

      container.innerHTML = "";

      if (!events.length) {
        container.innerHTML = "<p>No events available.</p>";
        return;
      }

      events.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
          <div class="event-header">
            <h3>${event.title}</h3>
            
          </div>

          <div class="event-meta">
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Status:</strong> ${event.status}</p>
          </div>

          <p class="event-desc">${event.description}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error loading events:", error);
      container.innerHTML = "<p>Failed to load events.</p>";
    });
    // STEP 4: NEXT UPCOMING EVENT COUNTDOWN

const countdownSection = document.getElementById("countdown-section");
const nextEventName = document.getElementById("next-event-name");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function startCountdown(event) {
  countdownSection.classList.remove("countdown-hidden");
  nextEventName.textContent = event.title;

  const eventTime = new Date(event.countdownDate).getTime();


  const timer = setInterval(() => {
    const now = Date.now();
    const diff = eventTime - now;

    if (diff <= 0) {
      clearInterval(timer);
      countdownSection.style.display = "none";
      return;
    }

    daysEl.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
    hoursEl.textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutesEl.textContent = Math.floor((diff / (1000 * 60)) % 60);
    secondsEl.textContent = Math.floor((diff / 1000) % 60);
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("events.json")
    .then(res => res.json())
    .then(events => {
      if (events.length > 0) {
        startCountdown(events[0]);
      }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const countdownSection = document.getElementById("countdown-section");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const nextEventName = document.getElementById("next-event-name");

  // FORCE SHOW COUNTDOWN
  countdownSection.classList.remove("countdown-hidden");
  nextEventName.textContent = "Test Event Countdown";

  // HARD-CODED FUTURE DATE (CHANGE IF NEEDED)
  const eventTime = new Date("2025-12-31T23:59:59").getTime();

  setInterval(() => {
    const now = Date.now();
    const diff = eventTime - now;

    if (diff <= 0) return;

    daysEl.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
    hoursEl.textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutesEl.textContent = Math.floor((diff / (1000 * 60)) % 60);
    secondsEl.textContent = Math.floor((diff / 1000) % 60);
  }, 1000);
});



});
