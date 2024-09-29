let attractions = [];  // Array to store fetched attractions data
let savedLocations = [];  // Array to hold saved locations

// Function to add location to saved locations
function addLocationToSaved(locationName) {
    if (!savedLocations.includes(locationName)) {
        savedLocations.push(locationName);  // Add to the saved locations array
        const savedLocationsDiv = document.getElementById('savedLocations');
        const locationDiv = document.createElement('div');
        locationDiv.className = 'saved-location';
        locationDiv.textContent = locationName;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.onclick = function() {
            savedLocationsDiv.removeChild(locationDiv);
            savedLocations = savedLocations.filter(loc => loc !== locationName);
        };

        // Create an add to itinerary button
        const itineraryButton = document.createElement('button');
        itineraryButton.textContent = 'Add to Itinerary';
        itineraryButton.className = 'itinerary-button';
        itineraryButton.onclick = function() {
            addLocationToItinerary(locationName);
            savedLocationsDiv.removeChild(locationDiv);
            savedLocations = savedLocations.filter(loc => loc !== locationName);
        };

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        buttonContainer.appendChild(itineraryButton);
        buttonContainer.appendChild(removeButton);
        locationDiv.appendChild(buttonContainer);
        savedLocationsDiv.appendChild(locationDiv);
    } else {
        alert("Location already saved!");
    }
}

function addLocationToItinerary(locationName) {
    const itineraryLocationsDiv = document.getElementById('itineraryLocations');
    const itineraryDiv = document.createElement('div');
    itineraryDiv.className = 'itinerary-location';
    itineraryDiv.textContent = locationName;

    const removeItineraryButton = document.createElement('button');
    removeItineraryButton.textContent = 'Remove from Itinerary';
    removeItineraryButton.className = 'remove-itinerary-button';
    removeItineraryButton.onclick = function() {
        itineraryLocationsDiv.removeChild(itineraryDiv);
    };

    itineraryDiv.appendChild(removeItineraryButton);
    itineraryLocationsDiv.appendChild(itineraryDiv);
}

function searchSavedLocations() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const savedLocationsDiv = document.getElementById('savedLocations');
    savedLocationsDiv.innerHTML = '';  // Clear current displayed locations
    
    savedLocations.forEach(location => {
        if (location.toLowerCase().includes(filter)) {
            const locationDiv = document.createElement('div');
            locationDiv.className = 'saved-location';
            locationDiv.textContent = location;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-button';
            removeButton.onclick = function() {
                savedLocationsDiv.removeChild(locationDiv);
                savedLocations = savedLocations.filter(loc => loc !== location);
            };

            const itineraryButton = document.createElement('button');
            itineraryButton.textContent = 'Add to Itinerary';
            itineraryButton.className = 'itinerary-button';
            itineraryButton.onclick = function() {
                addLocationToItinerary(location);
                savedLocationsDiv.removeChild(locationDiv);
                savedLocations = savedLocations.filter(loc => loc !== location);
            };

            locationDiv.appendChild(removeButton);
            locationDiv.appendChild(itineraryButton);
            savedLocationsDiv.appendChild(locationDiv);
        }
    });
}

var map = L.map('map').setView([51.505, -0.09], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch('/api/getAttractions')
    .then(response => response.json())
    .then(data => {
        attractions = data;  // Store fetched attractions
        data.forEach(attraction => {
            var marker = L.marker([attraction.lat, attraction.lng]).addTo(map);
            marker.bindPopup(`
                <b>${attraction.name}</b><br><br>
                ${attraction.address}<br><br>
                <button class="add-to-saved-btn" onclick="addLocationToSaved('${attraction.name}')">Add to Saved</button>
                <img src="{{ url_for('static', filename='images/review-icon.png') }}" class="review-icon" id="reviewIcon-${attraction.id}" alt="Review Icon" style="cursor: pointer; margin-top: 10px;" title="View Reviews">
            `);
        });

        // Listen for the 'popupopen' event to attach click listener to the review icon
        map.on('popupopen', function(e) {
            const popupId = e.popup._source._leaflet_id;
            const attraction = attractions.find(attr => attr.id === popupId);
            if (attraction) {
                const reviewIcon = document.getElementById(`reviewIcon-${attraction.id}`);
                if (reviewIcon) {
                    reviewIcon.addEventListener('click', function() {
                        openReviewPanel(attraction.id);
                    });
                }
            }
        });
    })
    .catch(error => console.error('Error fetching attractions:', error));

// Function to open the review panel
function openReviewPanel(locationId) {
    const location = attractions.find(attr => attr.id === locationId);

    const reviewContentDiv = document.getElementById('reviewContent');
    reviewContentDiv.innerHTML = '';  // Clear previous reviews

    location.reviews.forEach(review => {
        const reviewBox = document.createElement('div');
        reviewBox.className = 'review-box';
        reviewBox.textContent = review;
        reviewContentDiv.appendChild(reviewBox);
    });

    const reviewPanel = document.getElementById('reviewPanel');
    reviewPanel.style.display = 'block';  // Make panel visible
}

// Function to close the review panel
function closeReviewPanel() {
    const reviewPanel = document.getElementById('reviewPanel');
    reviewPanel.style.display = 'none';  // Hide panel
}
