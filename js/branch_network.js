// Branch Network JavaScript

let map;
let markers = [];
let infoWindows = [];

// Initialize Google Map
function initMap() {
    const mapElement = document.getElementById('branchMap');
    if (!mapElement || !window.google || !google.maps) {
        return;
    }

    mapElement.innerHTML = '';

    // Set default center (Sri Lanka)
    const defaultCenter = { lat: 7.8731, lng: 80.7718 };
    
    // Create map
    map = new google.maps.Map(document.getElementById('branchMap'), {
        zoom: 8,
        center: defaultCenter,
        mapTypeId: 'roadmap',
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    // Add markers for branches
    addBranchMarkers();
}

document.addEventListener('DOMContentLoaded', function() {
    // Map View Toggle
    const mapViewButtons = document.querySelectorAll('.map-view-btn');
    
    mapViewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            mapViewButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the view type
            const viewType = this.getAttribute('data-view');
            
            // Change map type
            if (map) {
                map.setMapTypeId(viewType === 'map' ? 'roadmap' : 'satellite');
            }
        });
    });

    // Fullscreen Toggle
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const mapContainer = document.querySelector('.branch-map');
    
    if (fullscreenBtn && mapContainer) {
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                mapContainer.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }

    // Search Functionality
    const searchBtn = document.querySelector('.search-btn-red');
    const locationSelect = document.getElementById('locationSelect');
    const categorySelect = document.getElementById('categorySelect');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            if (!locationSelect || !categorySelect) {
                return;
            }

            const selectedLocation = locationSelect.value;
            const selectedCategory = categorySelect.value;
            
            console.log('Searching for:', {
                location: selectedLocation,
                category: selectedCategory
            });
            
            // Filter branches based on selection
            filterBranches(selectedLocation, selectedCategory);
        });
    }

    // Get Directions Buttons
    const directionButtons = document.querySelectorAll('.directions-btn');
    
    directionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const branchCard = this.closest('.branch-card');
            const branchName = branchCard.querySelector('h3').textContent;
            const branchAddress = branchCard.querySelector('.branch-address').textContent.trim();
            
            console.log('Getting directions to:', branchName);
            
            // Open Google Maps directions in new tab
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branchAddress)}`;
            window.open(mapsUrl, '_blank');
        });
    });

    // Filter Branches Function
    function filterBranches(location, category) {
        const branchCards = document.querySelectorAll('.branch-card');
        let visibleCount = 0;
        
        branchCards.forEach(card => {
            const cardLocation = card.dataset.location || '';
            const cardCategory = card.dataset.category || '';
            
            const locationMatch = location === 'all' || cardLocation === location;
            const categoryMatch = category === 'all' || cardCategory === category;
            
            if (locationMatch && categoryMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update results count
        updateResultsCount(visibleCount);
    }

    // Update Results Count
    function updateResultsCount(count) {
        const resultsTitle = document.querySelector('.branch-results h2');
        if (resultsTitle) {
            resultsTitle.textContent = `Branch Locations (${count} Results)`;
        }
    }

    // Initialize with all results
    const totalBranches = document.querySelectorAll('.branch-card').length;
    updateResultsCount(totalBranches);
    
});

// Add Branch Markers to Google Map
function addBranchMarkers() {
    // Close any open info windows
    infoWindows.forEach(iw => iw.close());
    infoWindows = [];
    
    // RDB Bank branch locations across Sri Lanka
    const branches = [
        {
            name: 'Agalawatta Branch',
            code: '103',
            position: { lat: 6.5833, lng: 80.0500 },
            type: 'branch',
            address: 'Baduraliiya Road, Agalawatta',
            phone: '034-2247448',
            email: 'agalawatta@rdb.lk',
            district: 'Kalutara',
            region: 'Western',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Agarapathana Branch',
            code: '617',
            position: { lat: 6.8667, lng: 80.6167 },
            type: 'branch',
            address: '158, Hoolbrook, Agarapathana',
            phone: '051-2230335',
            email: 'agarapathana@rdb.lk',
            district: 'Nuwara Eliya',
            region: 'Central',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Agunakolapelessa Branch',
            code: '209',
            position: { lat: 6.0833, lng: 80.8500 },
            type: 'branch',
            address: 'Ranna Road, Agunakolapelessa',
            phone: '047-2228223',
            email: 'agunakolapelessa@rdb.lk',
            district: 'Hambantota',
            region: 'Southern',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Ahangama Branch',
            code: '243',
            position: { lat: 5.9667, lng: 80.3667 },
            type: 'branch',
            address: 'Piyadigama, Ahangama',
            phone: '091-2283986',
            email: 'ahangama@rdb.lk',
            district: 'Galle',
            region: 'Southern',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Akkaraipattu Branch',
            code: '805',
            position: { lat: 7.2167, lng: 81.8500 },
            type: 'branch',
            address: 'Main Street, Akkaraipattu',
            phone: '067-2277532',
            email: 'akkaraipattu@rdb.lk',
            district: 'Ampara',
            region: 'Eastern',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Akmeemana Branch',
            code: '222',
            position: { lat: 6.0667, lng: 80.2000 },
            type: 'branch',
            address: 'Ganegoda, Akmeemana',
            phone: '091-2222954',
            email: 'akmeemana@rdb.lk',
            district: 'Galle',
            region: 'Southern',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Akuressa Branch',
            code: '204',
            position: { lat: 6.1000, lng: 80.4833 },
            type: 'branch',
            address: '59, Matara Road, Akuressa',
            phone: '041-2283166',
            email: 'akuressa@rdb.lk',
            district: 'Matara',
            region: 'Southern',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Alawwa Branch',
            code: '304',
            position: { lat: 7.2833, lng: 80.2500 },
            type: 'branch',
            address: 'Main Street, Alawwa',
            phone: '037-2278083',
            email: 'alawwa@rdb.lk',
            district: 'Kurunegala',
            region: 'North Western',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Ambalantota Branch',
            code: '208',
            position: { lat: 6.1167, lng: 81.0167 },
            type: 'branch',
            address: '139, Hambantota Road, Ambalantota',
            phone: '047-2223113',
            email: 'ambalantota@rdb.lk',
            district: 'Hambantota',
            region: 'Southern',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Ambanpola Branch',
            code: '331',
            position: { lat: 7.3667, lng: 80.2833 },
            type: 'branch',
            address: '85, Anuradapura Road, Ambanpola',
            phone: '037-2253535',
            email: 'ambanpola@rdb.lk',
            district: 'Kurunegala',
            region: 'North Western',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Ampara Branch',
            code: '801',
            position: { lat: 7.2917, lng: 81.6750 },
            type: 'branch',
            address: '72, D.S. Senanayake Street, Ampara',
            phone: '063-2222480',
            email: 'ampara@rdb.lk',
            district: 'Ampara',
            region: 'Eastern',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Anamaduwa Branch',
            code: '315',
            position: { lat: 8.0167, lng: 79.9000 },
            type: 'branch',
            address: '43, Nawagatthaegama Road, Anamaduwa',
            phone: '032-2263293',
            email: 'anamaduwa@rdb.lk',
            district: 'Puttalam',
            region: 'North Western',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Anuradhapura Branch',
            code: '402',
            position: { lat: 8.3114, lng: 80.4037 },
            type: 'branch',
            address: 'No 133, Bank Place Anuradhapura',
            phone: '025-2226347',
            email: 'anuradhapuracity@rdb.lk',
            district: 'Anuradhapura',
            region: 'North Central',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Anuradhapura New Town Branch',
            code: '419',
            position: { lat: 8.3500, lng: 80.3833 },
            type: 'branch',
            address: '561/85C, 2nd Cross Road, New Bus stand, Anuradhapura',
            phone: '025-2225760',
            email: 'anuradhapuranewtown@rdb.lk',
            district: 'Anuradhapura',
            region: 'North Central',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Aralagamvila Branch',
            code: '423',
            position: { lat: 7.6833, lng: 80.7500 },
            type: 'branch',
            address: '300, Kolongashandiya, Aralagamvila',
            phone: '027-2257070',
            email: 'aralagamvila@rdb.lk',
            district: 'Polonnaruwa',
            region: 'North Central',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Aranayake Branch',
            code: '506',
            position: { lat: 7.2167, lng: 80.5167 },
            type: 'branch',
            address: '815, Digittiya, Aranayake',
            phone: '035-2256104',
            email: 'aranayake@rdb.lk',
            district: 'Kegalle',
            region: 'Sabaragamuwa',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Athugalpura Branch',
            code: '329',
            position: { lat: 7.3500, lng: 80.0833 },
            type: 'branch',
            address: '155, Negombo Road, Kurunegala',
            phone: '037-2227428',
            email: 'hqs@rdb.lk',
            district: 'Kurunegala',
            region: 'North Western',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        },
        {
            name: 'Awissawella Branch',
            code: '127',
            position: { lat: 6.9500, lng: 80.2167 },
            type: 'branch',
            address: '17, Yatigannota Road, Awissawella',
            phone: '036-2222480',
            email: 'awissawella@rdb.lk',
            district: 'Colombo',
            region: 'Western',
            hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
        }
    ];
    
    branches.forEach(branch => {
        const marker = new google.maps.Marker({
            position: branch.position,
            map: map,
            title: branch.name,
            icon: getMarkerIcon(branch.type),
            animation: google.maps.Animation.DROP
        });
        
        // Create info window content
        const infoWindowContent = `
            <div style="padding: 14px; max-width: 280px; font-family: Arial, sans-serif;">
                <h3 style="margin: 0 0 8px 0; color: #0099ab; font-size: 1.15rem; font-weight: 700;">${branch.name}</h3>
                <p style="margin: 0 0 10px 0; color: #888; font-size: 0.85rem; font-weight: 500;">
                    Branch Code: ${branch.code} | ${branch.region} Region
                </p>
                <div style="border-top: 2px solid #e0f7fa; padding-top: 10px;">
                    <p style="margin: 6px 0; color: #555; font-size: 0.9rem; line-height: 1.4;">
                        <strong style="color: #333;">📍 Address:</strong><br>
                        <span style="color: #666;">${branch.address}</span>
                    </p>
                    <p style="margin: 6px 0; color: #555; font-size: 0.9rem;">
                        <strong style="color: #333;">📞 Phone:</strong> <span style="color: #666;">${branch.phone}</span>
                    </p>
                    <p style="margin: 6px 0; color: #555; font-size: 0.9rem;">
                        <strong style="color: #333;">✉️ Email:</strong> <span style="color: #0099ab;">${branch.email}</span>
                    </p>
                    <p style="margin: 6px 0; color: #555; font-size: 0.9rem;">
                        <strong style="color: #333;">📍 District:</strong> <span style="color: #666;">${branch.district}</span>
                    </p>
                    <p style="margin: 6px 0; color: #555; font-size: 0.9rem;">
                        <strong style="color: #333;">🕒 Hours:</strong> <span style="color: #666;">${branch.hours}</span>
                    </p>
                </div>
                <button onclick="getDirectionsFromMap(${branch.position.lat}, ${branch.position.lng}, '${branch.address.replace(/'/g, "\\'")}')" 
                        style="margin-top: 12px; width: 100%; padding: 10px 16px; background: #0099ab; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s;">
                    🗺️ Get Directions
                </button>
            </div>
        `;
        
        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });
        
        marker.addListener('click', () => {
            // Close all other info windows
            infoWindows.forEach(iw => iw.close());
            infoWindow.open(map, marker);
        });
        
        markers.push(marker);
        infoWindows.push(infoWindow);
    });
}

// Get custom marker icon based on type
function getMarkerIcon(type) {
    const colors = {
        branch: '#0099ab',
        atm: '#ff9800',
        cdm: '#9c27b0'
    };
    
    return {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: colors[type] || '#0099ab',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3
    };
}

// Get directions from map info window
function getDirectionsFromMap(lat, lng, address) {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
}

