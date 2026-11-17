/*Schedule */

/* Schedule Data */

const scheduleStorageKey = "goodhours_commitments";

let scheduledOpportunities = JSON.parse(
    localStorage.getItem(scheduleStorageKey) || "[]"
);

/* Calendar Dates */

let currentWeek = new Date();

function getStartOfWeek(date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay());
    return start;
}

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function formatShortDate(date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return replacements[character];
    });
}

/* Display Weekly Calendar */

function displayCalendar() {
    const calendarGrid = document.getElementById("calendar-grid");
    const weekRange = document.getElementById("calendar-week-range");

    const weekStart = getStartOfWeek(currentWeek);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    // Update the heading above the calendar.
    weekRange.textContent =
        `${formatShortDate(weekStart)} – ${formatShortDate(weekEnd)}`;

    calendarGrid.innerHTML = "";

    // Create one calendar cell for each day of the week.
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);

        const dateKey = formatDateKey(date);

        const dayEvents = scheduledOpportunities.filter(
            event => event.date === dateKey
        );

        const dayElement = document.createElement("div");
        dayElement.className = "calendar-day";

        if (dateKey === formatDateKey(new Date())) {
            dayElement.classList.add("today");
        }

        if (dayEvents.length > 0) {
            dayElement.classList.add("has-events");
        }

        const eventHTML = dayEvents.map(event => `
            <div class="calendar-event">
                ${escapeHTML(event.title)}
            </div>
        `).join("");

        dayElement.innerHTML = `
            <span class="calendar-day-number">${date.getDate()}</span>
            ${eventHTML}
        `;

        calendarGrid.appendChild(dayElement);
    }
}

/* Display Upcoming Commitments */

function displayUpcomingEvents() {
    const upcomingList = document.getElementById("upcoming-events-list");
    const emptyMessage = document.getElementById("empty-schedule-message");
    const eventCount = document.getElementById("upcoming-event-count");

    // Include today and future events, then sort them by date.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = scheduledOpportunities
        .filter(event => parseLocalDate(event.date) >= today)
        .sort((a, b) => a.date.localeCompare(b.date));

    upcomingList.innerHTML = "";

    eventCount.textContent = upcomingEvents.length;

    emptyMessage.hidden = upcomingEvents.length > 0;

    upcomingEvents.forEach(event => {
        const eventDate = parseLocalDate(event.date);

        const eventElement = document.createElement("div");
        eventElement.className = "upcoming-event";

    eventElement.innerHTML = `
    <div class="upcoming-event-date">
        <span>${eventDate.toLocaleDateString("en-US", { month: "short" })}</span>
        <strong>${eventDate.getDate()}</strong>
    </div>

    <div class="upcoming-event-details">
        <h3>${escapeHTML(event.title)}</h3>
        <p>${escapeHTML(event.organization)}</p>
        <p>${escapeHTML(event.startTime)} – ${escapeHTML(event.endTime)}</p>
        <p>${escapeHTML(event.location)}</p>
    </div>

    <button
        type="button"
        class="remove-event-button"
        data-id="${escapeHTML(event.id)}"
        aria-label="Remove ${escapeHTML(event.title)} from schedule"
        title="Remove from schedule">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M3 6h18"/>
                <path d="M8 6V4h8v2"/>
                <path d="m19 6-1 14H6L5 6"/>
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
            </svg>
    </button>
    `;

        upcomingList.appendChild(eventElement);
    });
}

/* Update Schedule Page */

function updateSchedule() {
    displayCalendar();
    displayUpcomingEvents();
}

/* Remove an Event From the Schedule */

document.getElementById("upcoming-events-list").addEventListener(
    "click",
    function(event) {

        const removeButton = event.target.closest(".remove-event-button");

        // Only continue if the trash-can button was clicked.
        if (!removeButton) return;

        const opportunityId = removeButton.dataset.id;

        // Remove the selected opportunity.
        scheduledOpportunities = scheduledOpportunities.filter(
            opportunity => String(opportunity.id) !== opportunityId
        );

        // Update localStorage.
        localStorage.setItem(
            scheduleStorageKey,
            JSON.stringify(scheduledOpportunities)
        );

        // Refresh the calendar and upcoming events.
        updateSchedule();

    }
);

/* Calendar Navigation */

document.getElementById("previous-week").addEventListener("click", function () {
    currentWeek.setDate(currentWeek.getDate() - 7);
    updateSchedule();
});

document.getElementById("next-week").addEventListener("click", function () {
    currentWeek.setDate(currentWeek.getDate() + 7);
    updateSchedule();
});

document.getElementById("today-button").addEventListener("click", function () {
    currentWeek = new Date();
    updateSchedule();
});

/* Refresh When Schedule Changes in Another Tab */

window.addEventListener("storage", function (event) {
    if (event.key === scheduleStorageKey) {
        scheduledOpportunities = JSON.parse(
            localStorage.getItem(scheduleStorageKey) || "[]"
        );

        updateSchedule();
    }
});

/* Initial Display */

currentWeek = getStartOfWeek(new Date());
updateSchedule();