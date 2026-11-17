
/* GOODHOURS - STUDENT DASHBOARD */

/* Storage Keys */

const hoursStorageKey = "goodhours_hourEntries";
const goalStorageKey = "goodhours_hourGoal";
const scheduleStorageKey = "goodhours_commitments";
const savedStorageKey = "goodhours_savedOpportunities";


/* Retrieve Saved Information */

let volunteerEntries = JSON.parse(
    localStorage.getItem(hoursStorageKey) || "[]"
);

let hourGoal = Number(
    localStorage.getItem(goalStorageKey) || 85
);


/* 1. VOLUNTEER HOURS */

function calculateTotalHours() {

    // Add together the hours from every volunteer entry.
    const total = volunteerEntries.reduce((sum, entry) => {
        return sum + Number(entry.hours || 0);
    }, 0);

    return total;
}


/* 2. UPDATE PROGRESS DISPLAY */

function updateProgressDisplay() {

    const totalHours = calculateTotalHours();

    // Calculate percentage of the goal completed.
    const percentage = Math.min(
        (totalHours / hourGoal) * 100,
        100
    );

    // Update total hours.
    document.getElementById("total-hours").textContent =
        Number(totalHours.toFixed(2));

    // Update percentage.
    document.getElementById("goal-percentage").textContent =
        `${Math.round(percentage)}%`;

    // Update progress bar.
    document.getElementById("progress-fill").style.width =
        `${percentage}%`;

    // Update progress description.
    document.getElementById("goal-progress-text").textContent =
        `${Number(totalHours.toFixed(2))} of ${hourGoal} hours completed`;

}


/* 3. CUSTOMIZABLE VOLUNTEER GOAL */

const goalInput = document.getElementById("goal-input");
const saveGoalButton = document.getElementById("save-goal-button");


function saveHourGoal() {

    const newGoal = Number(goalInput.value);

    // Make sure the goal is valid.
    if (
        !Number.isFinite(newGoal) ||
        !Number.isInteger(newGoal) ||
        newGoal < 1 ||
        newGoal > 10000
    ) {
        alert("Please enter a whole number between 1 and 10,000.");
        return;
    }

    // Save the new goal.
    hourGoal = newGoal;

    localStorage.setItem(
        goalStorageKey,
        hourGoal
    );

    // Refresh the dashboard.
    updateProgressDisplay();

    alert("Your volunteer goal has been updated!");
}


// Connect the button to the function.
saveGoalButton.addEventListener("click", saveHourGoal);


/* 4. INITIAL DASHBOARD DISPLAY*/

// Display the saved goal in the input.
goalInput.value = hourGoal;
updateProgressDisplay();

/* 5. UPCOMING EVENTS */

function displayUpcomingEvents() {

    const upcomingContainer = document.getElementById(
        "dashboard-upcoming-events"
    );

    // Retrieve scheduled opportunities.
    const scheduledOpportunities = JSON.parse(
        localStorage.getItem(scheduleStorageKey) || "[]"
    );

    // Get today's date.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter out past events and sort by date.
    const upcomingEvents = scheduledOpportunities
        .filter(event => {
            const [year, month, day] = event.date.split("-").map(Number);
            const eventDate = new Date(year, month - 1, day);

            return eventDate >= today;
        })
        .sort((a, b) => a.date.localeCompare(b.date));

    // Show an empty message if there are no events.
    if (upcomingEvents.length === 0) {

        upcomingContainer.innerHTML = `
            <p class="dashboard-empty-message">
                You don't have any upcoming volunteer events.
                Explore opportunities to get started!
            </p>
        `;

        return;
    }

    // Display each upcoming event.
    upcomingContainer.innerHTML = upcomingEvents.map(event => {

        const [year, month, day] = event.date.split("-").map(Number);

        const eventDate = new Date(year, month - 1, day);

        const monthName = eventDate.toLocaleDateString("en-US", {
            month: "short"
        });

        return `
            <div class="commitment-item">

                <div class="commitment-date">
                    <span>${monthName}</span>
                    <strong>${day}</strong>
                </div>

                <div class="commitment-details">
                    <h3>${escapeHTML(event.title)}</h3>
                    <p>${escapeHTML(event.organization)}</p>
                    <p>${escapeHTML(event.startTime)} – ${escapeHTML(event.endTime)}</p>
                </div>

            </div>
        `;

    }).join("");

}


/* Saved Opportunities */

// Retrieve saved opportunity IDs
let savedOpportunities = JSON.parse(
    localStorage.getItem(savedStorageKey) || "[]"
);

// Information matching the IDs in opportunities.js
const opportunityInfo = {
    "opportunity-1": {
        title: "Community Park Cleanup",
        category: "ENVIRONMENT"
    },

    "opportunity-2": {
        title: "Animal Shelter Assistant",
        category: "ANIMALS"
    },

    "opportunity-3": {
        title: "Community Tutoring",
        category: "EDUCATION"
    },

    "opportunity-4": {
        title: "Neighborhood Tree Planting",
        category: "ENVIRONMENT"
    },

    "opportunity-5": {
        title: "Community Food Pantry Volunteer",
        category: "COMMUNITY"
    },

    "opportunity-6": {
        title: "Community Health Fair Volunteer",
        category: "HEALTH"
    }
};


/* Display Saved Opportunities */

function displayDashboardSavedOpportunities() {

    const savedCount = document.getElementById(
        "saved-opportunities-count"
    );

    const savedContainer = document.getElementById(
        "dashboard-saved-opportunities"
    );

    // Update the saved opportunities count
    savedCount.textContent = savedOpportunities.length;

    // Clear previous content
    savedContainer.innerHTML = "";

    // Display an empty message if nothing is saved
    if (savedOpportunities.length === 0) {

        savedContainer.innerHTML = `
            <p class="dashboard-empty-message">
                You haven't saved any opportunities yet.
            </p>
        `;

        return;
    }

    // Display up to three saved opportunities
    savedOpportunities.slice(0, 3).forEach(opportunityId => {

        const opportunity = opportunityInfo[opportunityId];

        if (!opportunity) return;

        const opportunityElement = document.createElement("div");

        opportunityElement.classList.add("dashboard-saved-item");

        opportunityElement.innerHTML = `
            <p class="saved-item-title">
                ${escapeHTML(opportunity.title)}
            </p>

            <p class="saved-item-category">
                ${escapeHTML(opportunity.category)}
            </p>
        `;

        savedContainer.appendChild(opportunityElement);

    });

    // Show how many additional opportunities are saved
    if (savedOpportunities.length > 3) {

        const remaining = savedOpportunities.length - 3;

        const moreMessage = document.createElement("p");

        moreMessage.classList.add("saved-more-message");

        moreMessage.textContent = `+ ${remaining} more`;

        savedContainer.appendChild(moreMessage);
    }

}


/* Protect Displayed Text */

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
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



/* Refresh Dashboard When Data Changes */

window.addEventListener("storage", function(event) {

    if (event.key === hoursStorageKey) {
        volunteerEntries = JSON.parse(
            localStorage.getItem(hoursStorageKey) || "[]"
        );

        updateProgressDisplay();
    }

    if (event.key === scheduleStorageKey) {
        displayUpcomingEvents();
    }


    if (event.key === savedStorageKey) {

    savedOpportunities = JSON.parse(
        localStorage.getItem(savedStorageKey) || "[]"
    );

    displayDashboardSavedOpportunities();

}
});


/*Initialize Displays*/

displayUpcomingEvents();

displayDashboardSavedOpportunities();


