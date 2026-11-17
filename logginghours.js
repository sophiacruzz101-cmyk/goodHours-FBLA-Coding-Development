/*Logging Hours */


/* Saved Volunteer Entries */

const hoursStorageKey = "goodhours_hourEntries";

const hoursForm = document.getElementById("hours-form");
const recentEntriesList = document.getElementById("recent-entries-list");

const entryModal = document.getElementById("entry-details-modal");
const closeEntryModalButton = document.getElementById("close-entry-modal");

let volunteerEntries = JSON.parse(
    localStorage.getItem(hoursStorageKey) || "[]"
);


/* Permanent Volunteer Hours Total */

const totalHoursStorageKey = "goodhours_totalHours";


function getPermanentTotal() {

    const savedTotal = localStorage.getItem(totalHoursStorageKey);

    if (savedTotal !== null) {
        return Number(savedTotal);
    }

    const startingTotal = volunteerEntries.reduce((sum, entry) => {
        return sum + Number(entry.hours || 0);
    }, 0);

    localStorage.setItem(
        totalHoursStorageKey,
        startingTotal
    );

    return startingTotal;
}


getPermanentTotal();



function addToPermanentTotal(hours) {

    const currentTotal = getPermanentTotal();

    const updatedTotal = currentTotal + hours;

    localStorage.setItem(
        totalHoursStorageKey,
        updatedTotal
    );

}

/* Save Entries */

function saveVolunteerEntries() {
    localStorage.setItem(
        hoursStorageKey,
        JSON.stringify(volunteerEntries)
    );
}

/* Format Dates */

function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function formatVolunteerDate(dateString) {
    return parseLocalDate(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

/* Protect Displayed Text */

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

/* Display Recent Entries */

function displayRecentEntries() {
    recentEntriesList.innerHTML = "";
    document.getElementById("clear-entries-button").disabled =
        volunteerEntries.length === 0;

    if (volunteerEntries.length === 0) {
        recentEntriesList.innerHTML = `
            <p class="empty-entries-message">
                Your logged volunteer hours will appear here.
                Start by submitting your first entry!
            </p>
        `;

        return;
    }

    // Sort entries from newest to oldest.
    const sortedEntries = [...volunteerEntries].sort((a, b) => {
        return b.date.localeCompare(a.date) ||
            b.createdAt - a.createdAt;
    });

    sortedEntries.forEach(entry => {
        const entryButton = document.createElement("button");

        entryButton.type = "button";
        entryButton.className = "recent-entry";
        entryButton.dataset.entryId = entry.id;

        entryButton.innerHTML = `
            <div class="recent-entry-info">
                <h3>${escapeHTML(entry.organization)}</h3>
                <p>
                    ${escapeHTML(entry.activity)}
                    · ${escapeHTML(formatVolunteerDate(entry.date))}
                </p>
            </div>

            <div class="recent-entry-hours">
                ${escapeHTML(entry.hours)} hrs
            </div>

            <span class="recent-entry-arrow">→</span>
        `;

        recentEntriesList.appendChild(entryButton);
    });
}

/* Open Entry Details */

function openEntryDetails(entryId) {
    const entry = volunteerEntries.find(
        item => item.id === entryId
    );

    if (!entry) return;

    document.getElementById("entry-modal-organization").textContent =
        entry.organization;

    document.getElementById("entry-modal-date").textContent =
        formatVolunteerDate(entry.date);

    document.getElementById("entry-modal-activity").textContent =
        entry.activity;

    document.getElementById("entry-modal-hours").textContent =
        `${entry.hours} hours`;

    document.getElementById("entry-modal-description").textContent =
        entry.description || "No description was provided for this entry.";

    entryModal.style.display = "flex";
}

/* Close Entry Details */

function closeEntryDetails() {
    entryModal.style.display = "none";
}

closeEntryModalButton.addEventListener("click", closeEntryDetails);

entryModal.addEventListener("click", function (event) {
    if (event.target === entryModal) {
        closeEntryDetails();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeEntryDetails();
    }
});

/* Click a Recent Entry */

recentEntriesList.addEventListener("click", function (event) {
    const entryButton = event.target.closest(".recent-entry");

    if (!entryButton) return;

    openEntryDetails(entryButton.dataset.entryId);
});

/* Submit Volunteer Hours */

hoursForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const organization = document.getElementById("organization").value.trim();
    const activity = document.getElementById("activity").value;
    const date = document.getElementById("volunteer-date").value;
    const hours = Number(document.getElementById("volunteer-hours").value);
    const description = document.getElementById("activity-description").value.trim();

    // Check that the date is not in the future.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (parseLocalDate(date) > today) {
        alert("Please enter a date that has already occurred.");
        return;
    }

    // Check that the number of hours is valid.
    if (!Number.isFinite(hours) || hours < 0.25 || hours > 24) {
        alert("Please enter a valid number of hours between 0.25 and 24.");
        return;
    }

    // Create a new volunteer record.
    const newEntry = {
        id: String(Date.now()) + Math.random().toString(16).slice(2),
        organization: organization,
        activity: activity,
        date: date,
        hours: hours,
        description: description,
        createdAt: Date.now()
    };

    volunteerEntries.push(newEntry);

    // Update the permanent accumulated hours.
    addToPermanentTotal(hours);

    saveVolunteerEntries();
    displayRecentEntries();

    hoursForm.reset();

    alert("Your volunteer hours have been saved!");
});

/* Set Maximum Date to Today */

const volunteerDateInput = document.getElementById("volunteer-date");

const today = new Date();
const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

volunteerDateInput.max = todayString;



/* Clear All Volunteer Entries */

document.getElementById("clear-entries-button").addEventListener(
    "click",
    function () {
        if (volunteerEntries.length === 0) return;

        const confirmed = confirm(
            "Are you sure you want to clear all your volunteer entries? This action cannot be undone."
        );

        if (!confirmed) return;

        volunteerEntries = [];

        saveVolunteerEntries();
        displayRecentEntries();
    }
);



/* Initial Display */

displayRecentEntries();