/* Explore Opportunities*/

/* Saved Opportunities*/
const savedStorageKey = "goodhours_savedOpportunities";

const opportunityCards = document.querySelectorAll(
    "#browse-opportunities .opportunity-card"
);

const savedGrid = document.getElementById("saved-opportunities-grid");
const emptySavedMessage = document.getElementById("empty-saved-message");

const modal = document.getElementById("opportunity-modal");
const modalSaveButton = document.getElementById("modal-save-button");

let savedOpportunities = JSON.parse(
    localStorage.getItem(savedStorageKey) || "[]"
);

/* Save Data */

function saveOpportunities() {
    localStorage.setItem(
        savedStorageKey,
        JSON.stringify(savedOpportunities)
    );
}


/* Check Whether an Opportunity Is Saved */

function isSaved(opportunityId) {
    return savedOpportunities.includes(opportunityId);
}


/* Update Save Buttons */

function updateSaveButtons() {
    const allCards = document.querySelectorAll(".opportunity-card");

    allCards.forEach(card => {
        const opportunityId = card.dataset.id;
        const saveButton = card.querySelector(".save-button");

        if (!saveButton) return;

        if (isSaved(opportunityId)) {
            saveButton.textContent = "♥ Saved";
        } else {
            saveButton.textContent = "♡ Save";
        }
    });
}


/* Display Saved Opportunities */

function displaySavedOpportunities() {
    savedGrid.innerHTML = "";

    savedOpportunities.forEach(opportunityId => {

        const originalCard = document.querySelector(
            `#browse-opportunities [data-id="${opportunityId}"]`
        );

        if (!originalCard) return;

        const savedCard = originalCard.cloneNode(true);
        savedCard.style.display = "";
        savedGrid.appendChild(savedCard);
    });

    emptySavedMessage.hidden = savedOpportunities.length > 0;

    updateSaveButtons();
}


/* Save or Remove an Opportunity */

function toggleSavedOpportunity(opportunityId) {

    if (isSaved(opportunityId)) {

        savedOpportunities = savedOpportunities.filter(
            id => id !== opportunityId
        );

    } else {

        savedOpportunities.push(opportunityId);

    }

    saveOpportunities();
    displaySavedOpportunities();
}


/* Opportunity Information */

const opportunityDetails = {

    "opportunity-1": {
        organization: "Green Earth Volunteers",
        date: "2026-11-14",
        startTime: "9:00 AM",
        endTime: "12:00 PM",
        location: "Riverside Community Park",
        age: "Ages 14 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-2": {
        organization: "Happy Tails Animal Shelter",
        date: "2026-11-18",
        startTime: "3:00 PM",
        endTime: "5:00 PM",
        location: "Happy Tails Animal Shelter",
        age: "Ages 16 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-3": {
        organization: "Bright Futures Learning Center",
        date: "2026-11-21",
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        location: "Bright Futures Learning Center",
        age: "Ages 14 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-4": {
        organization: "Green Earth Volunteers",
        date: "2026-11-28",
        startTime: "9:00 AM",
        endTime: "11:00 AM",
        location: "Oakwood Neighborhood Park",
        age: "Ages 14 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-5": {
        organization: "Community Food Network",
        date: "2026-12-05",
        startTime: "8:00 AM",
        endTime: "11:00 AM",
        location: "Community Food Pantry",
        age: "Ages 15 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-6": {
        organization: "Healthy Communities Initiative",
        date: "2026-12-12",
        startTime: "10:00 AM",
        endTime: "2:00 PM",
        location: "Community Health Center",
        age: "Ages 16 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-7": {
        organization: "Coastal Conservation Volunteers",
        date: "2026-12-19",
        startTime: "9:00 AM",
        endTime: "12:00 PM",
        location: "Jacksonville Beach",
        age: "Ages 14 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-8": {
        organization: "Green Roots Community Garden",
        date: "2027-01-09",
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        location: "Green Roots Community Garden",
        age: "Ages 14 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-9": {
        organization: "Paws & Care Foundation",
        date: "2027-01-16",
        startTime: "9:00 AM",
        endTime: "11:00 AM",
        location: "Paws & Care Community Center",
        age: "Ages 14 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-10": {
        organization: "Happy Tails Animal Shelter",
        date: "2027-01-23",
        startTime: "10:00 AM",
        endTime: "1:00 PM",
        location: "Happy Tails Adoption Center",
        age: "Ages 16 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-11": {
        organization: "Bright Futures Learning Center",
        date: "2027-01-30",
        startTime: "9:00 AM",
        endTime: "11:00 AM",
        location: "Bright Futures Learning Center",
        age: "Ages 14 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-12": {
        organization: "Next Generation Learning",
        date: "2027-02-06",
        startTime: "3:00 PM",
        endTime: "5:00 PM",
        location: "Oakwood Community Library",
        age: "Ages 15 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-13": {
        organization: "Community Care Network",
        date: "2027-02-13",
        startTime: "9:00 AM",
        endTime: "12:00 PM",
        location: "Community Donation Center",
        age: "Ages 14 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-14": {
        organization: "Jacksonville Community Events",
        date: "2027-02-20",
        startTime: "10:00 AM",
        endTime: "2:00 PM",
        location: "Riverside Community Center",
        age: "Ages 15 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-15": {
        organization: "Golden Years Community Center",
        date: "2027-02-27",
        startTime: "1:00 PM",
        endTime: "4:00 PM",
        location: "Golden Years Community Center",
        age: "Ages 14 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-16": {
        organization: "Healthy Communities Initiative",
        date: "2027-03-06",
        startTime: "8:00 AM",
        endTime: "12:00 PM",
        location: "Riverside Park",
        age: "Ages 15 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-17": {
        organization: "Wellness for All Foundation",
        date: "2027-03-13",
        startTime: "10:00 AM",
        endTime: "1:00 PM",
        location: "Community Health Center",
        age: "Ages 16 and older",
        contact: "volunteer@example.org"
    },

    "opportunity-18": {
        organization: "Green Earth Volunteers",
        date: "2027-03-20",
        startTime: "9:00 AM",
        endTime: "11:00 AM",
        location: "Oakwood Recycling Center",
        age: "Ages 14 and older",
        contact: "volunteer@example.org"
    }

};


/* Opportunity Details Modal */

function openOpportunityModal(card) {

    const opportunityId = card.dataset.id;
    const details = opportunityDetails[opportunityId];

    const title = card.querySelector("h3").textContent;
    const category = card.querySelector(".opportunity-category").textContent;
    const description = card.querySelector(".opportunity-info > p:not(.opportunity-category)").textContent;
    const image = card.querySelector("img");

    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-category").textContent = category;
    document.getElementById("modal-description").textContent = description;

    document.getElementById("modal-image").src = image.src;
    document.getElementById("modal-image").alt = image.alt;

    document.getElementById("modal-organization").textContent =
        "Organized by " + details.organization;

    document.getElementById("modal-date").textContent =
        "Date: " + new Date(details.date + "T12:00:00").toLocaleDateString(
            "en-US",
            { month: "long", day: "numeric", year: "numeric" }
        );

    document.getElementById("modal-time").textContent =
        "Time: " + details.startTime + " – " + details.endTime;

    document.getElementById("modal-location").textContent =
        "Location: " + details.location;

    document.getElementById("modal-age").textContent =
        "Age requirement: " + details.age;

    document.getElementById("modal-contact-info").textContent =
        details.contact;

    modal.dataset.activeOpportunity = opportunityId;

    modalSaveButton.textContent = isSaved(opportunityId)
        ? "♥ Saved"
        : "♡ Save Opportunity";

    updateScheduleButton(opportunityId);

    modal.style.display = "flex";
}

/* Close Opportunity Modal */

function closeOpportunityModal() {
    modal.style.display = "none";
    delete modal.dataset.activeOpportunity;
}


/* Opportunity Card Buttons */

function handleCardClick(event) {

    const card = event.target.closest(".opportunity-card");

    if (!card) return;

    const opportunityId = card.dataset.id;

    if (event.target.closest(".save-button")) {
        toggleSavedOpportunity(opportunityId);
    }

    if (event.target.closest(".details-button")) {
        openOpportunityModal(card);
    }
}


/* Main Opportunity Cards */

document.getElementById("browse-opportunities").addEventListener(
    "click",
    handleCardClick
);


/* Saved Opportunity Cards */

savedGrid.addEventListener("click", handleCardClick);


/* Save Button Inside Modal */

modalSaveButton.addEventListener("click", function () {

    const opportunityId = modal.dataset.activeOpportunity;

    if (!opportunityId) return;

    toggleSavedOpportunity(opportunityId);

    modalSaveButton.textContent = isSaved(opportunityId)
        ? "♥ Saved"
        : "♡ Save Opportunity";
});


/* Close Modal Buttons */

document.querySelector(".close-modal").addEventListener(
    "click",
    closeOpportunityModal
);


/* Close Modal When Clicking Outside */

modal.addEventListener("click", function (event) {

    if (event.target === modal) {
        closeOpportunityModal();
    }

});


/* Close Modal With Escape Key */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeOpportunityModal();
    }

});

/* Scheduled Opportunities */

const scheduleStorageKey = "goodhours_commitments";

let scheduledOpportunities = JSON.parse(
    localStorage.getItem(scheduleStorageKey) || "[]"
);


/* Save Scheduled Opportunities */

function saveScheduledOpportunities() {

    localStorage.setItem(
        scheduleStorageKey,
        JSON.stringify(scheduledOpportunities)
    );

}


/* Update Schedule Button */
function updateScheduleButton(opportunityId) {

    const button = document.getElementById("add-to-schedule-button");

    const alreadyScheduled = scheduledOpportunities.some(
        event => event.id === opportunityId
    );

    button.textContent = alreadyScheduled
        ? "− Remove from My Schedule"
        : "+ Add to My Schedule";

    button.disabled = false;

}


/* Add or Remove Opportunity From Schedule */

document.getElementById("add-to-schedule-button").addEventListener(
    "click",
    function () {

        const opportunityId = modal.dataset.activeOpportunity;

        if (!opportunityId) return;

        const alreadyScheduled = scheduledOpportunities.some(
            event => event.id === opportunityId
        );

        if (alreadyScheduled) {

            scheduledOpportunities = scheduledOpportunities.filter(
                event => event.id !== opportunityId
            );

        } else {

            const details = opportunityDetails[opportunityId];

            const card = document.querySelector(
                `#browse-opportunities [data-id="${opportunityId}"]`
            );

            const title = card.querySelector("h3").textContent;

            const newEvent = {
                id: opportunityId,
                title: title,
                organization: details.organization,
                date: details.date,
                startTime: details.startTime,
                endTime: details.endTime,
                location: details.location
            };

            scheduledOpportunities.push(newEvent);

        }

        saveScheduledOpportunities();
        updateScheduleButton(opportunityId);

    }
);

/* Initial Display */

displaySavedOpportunities();


/* Search / Filter Opportunities*/

// Search bar
const searchInput = document.getElementById("search-input");

// Filter buttons
const filterButtons = document.querySelectorAll(".filter-button");

// Opportunity count
const opportunityCount = document.getElementById("opportunity-count");

// Pagination elements
const previousPageButton = document.getElementById("previous-page");
const nextPageButton = document.getElementById("next-page");
const currentPageDisplay = document.getElementById("current-page");
const totalPagesDisplay = document.getElementById("total-pages");
const paginationResults = document.getElementById("pagination-results");

// Pagination settings
const cardsPerPage = 6;
let currentPage = 1;

// Currently selected category
let selectedCategory = "all";


/* Get Opportunities Matching Search and Filters */

function getFilteredOpportunities() {

    const searchText = searchInput.value.toLowerCase().trim();

    return Array.from(opportunityCards).filter(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();

        const description = card.querySelector(
            ".opportunity-info > p:not(.opportunity-category)"
        ).textContent.toLowerCase();

        const category = card.dataset.category;

        const organization = opportunityDetails[
            card.dataset.id
        ].organization.toLowerCase();

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText) ||
            category.includes(searchText) ||
            organization.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

}


/* Display the Current Page */

function displayOpportunityPage() {

    const filteredCards = getFilteredOpportunities();

    const totalPages = Math.max(
        1,
        Math.ceil(filteredCards.length / cardsPerPage)
    );

    // Prevent the current page from exceeding the page count
    currentPage = Math.min(currentPage, totalPages);

    // Calculate which cards belong on this page
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const cardsToDisplay = filteredCards.slice(startIndex, endIndex);

    // Hide all opportunity cards
    opportunityCards.forEach(card => {
        card.style.display = "none";
    });

    // Display only the six cards for this page
    cardsToDisplay.forEach(card => {
        card.style.display = "";
    });

    // Update opportunity count
    opportunityCount.textContent =
        `${filteredCards.length} ${
            filteredCards.length === 1 ? "Opportunity" : "Opportunities"
        }`;

    // Update pagination numbers
    currentPageDisplay.textContent = currentPage;
    totalPagesDisplay.textContent = totalPages;

    // Update results information
    if (filteredCards.length === 0) {

        paginationResults.textContent = "No opportunities found";

    } else {

        paginationResults.textContent =
            `Showing ${startIndex + 1}–${Math.min(
                endIndex,
                filteredCards.length
            )} of ${filteredCards.length} opportunities`;

    }

    // Disable arrows when there are no more pages
    previousPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;

}


/* Search Bar Event Listener */

searchInput.addEventListener("input", function() {

    currentPage = 1;
    displayOpportunityPage();

});


/* Filter Button Event Listeners */

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        selectedCategory = this.dataset.category;

        filterButtons.forEach(filter => {
            filter.classList.remove("active");
        });

        this.classList.add("active");

        currentPage = 1;
        displayOpportunityPage();

    });

});


/* Previous Page Button */

previousPageButton.addEventListener("click", function() {

    if (currentPage > 1) {

        currentPage--;
        displayOpportunityPage();

    }

});


/* Next Page Button */

nextPageButton.addEventListener("click", function() {

    const filteredCards = getFilteredOpportunities();

    const totalPages = Math.ceil(
        filteredCards.length / cardsPerPage
    );

    if (currentPage < totalPages) {

        currentPage++;
        displayOpportunityPage();

    }

});


/* Initial Display */

displayOpportunityPage();

/* Open a Specific Opportunity From an External Link */

function openRequestedOpportunity() {

    const requestedOpportunityId = window.location.hash.slice(1);

    if (!requestedOpportunityId) return;

    const requestedCard = Array.from(opportunityCards).find(
        card => card.dataset.id === requestedOpportunityId
    );

    if (!requestedCard) return;

    const cardIndex = Array.from(opportunityCards).indexOf(
        requestedCard
    );

    // Find the page containing the requested opportunity.
    currentPage = Math.floor(cardIndex / cardsPerPage) + 1;

    // Display the correct page.
    displayOpportunityPage();

    // Scroll to the requested opportunity.
    requestedCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}

// Run when the page first loads.
openRequestedOpportunity();

// Also run whenever the URL hash changes.
window.addEventListener("hashchange", openRequestedOpportunity);


