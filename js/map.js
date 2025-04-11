// Initialize the map
document.addEventListener('DOMContentLoaded', function() {
    // Create the map centered on Saudi Arabia
    const map = L.map('interactive-map').setView([23.8859, 45.0792], 6);
    
    // Add the base map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Sample landmarks data (replace with real data from API)
    const landmarksData = {
        riyadh: [
            {
                id: 1,
                name: "قصر المصمك",
                type: "historical",
                location: [24.6310, 46.7146],
                description: "قلعة تاريخية في الرياض تعود إلى عام 1865، كانت مسرحًا لاستعادة الرياض على يد الملك عبدالعزيز آل سعود",
                images: ["masmak1.jpg", "masmak2.jpg"],
                oldImage: "images/old/masmak-old.jpg",
                newImage: "images/new/masmak-new.jpg"
            },
            {
                id: 2,
                name: "المتحف الوطني السعودي",
                type: "cultural",
                location: [24.6476, 46.7136],
                description: "أكبر المتاحف في المملكة، يوثق تاريخ شبه الجزيرة العربية وتاريخ الدولة السعودية",
                images: ["museum1.jpg", "museum2.jpg"],
                oldImage: "",
                newImage: "museum-new.jpg"
            }
        ],
        makkah: [
            {
                id: 3,
                name: "المسجد الحرام",
                type: "religious",
                location: [21.3891, 39.8579],
                description: "أقدس موقع في الإسلام، يضم الكعبة المشرفة ومقام إبراهيم والحجر الأسود",
                images: ["haram1.jpg", "haram2.jpg"],
                oldImage: "haram-old.jpg",
                newImage: "haram-new.jpg"
            },
            {
                id: 4,
                name: "جبل النور",
                type: "historical",
                location: [21.4575, 39.8649],
                description: "يضم غار حراء حيث نزل الوحي على النبي محمد صلى الله عليه وسلم",
                images: ["noor1.jpg", "noor2.jpg"],
                oldImage: "noor-old.jpg",
                newImage: "noor-new.jpg"
            }
        ],
        madina: [
            {
                id: 5,
                name: "المسجد النبوي",
                type: "religious",
                location: [24.4672, 39.6112],
                description: "ثاني أقدس مسجد في الإسلام، بناه النبي محمد صلى الله عليه وسلم",
                images: ["nabawi1.jpg", "nabawi2.jpg"],
                oldImage: "nabawi-old.jpg",
                newImage: "nabawi-new.jpg"
            }
        ],
        jeddah: [
            {
                id: 6,
                name: "نافورة الملك فهد",
                type: "modern",
                location: [21.5169, 39.1782],
                description: "أطول نافورة في العالم، تصل إلى ارتفاع 312 متراً",
                images: ["fountain1.jpg", "fountain2.jpg"],
                oldImage: "",
                newImage: "fountain-new.jpg"
            }
        ],
        dammam: [
            {
                id: 7,
                name: "الكورنيش",
                type: "modern",
                location: [26.4336, 50.1143],
                description: "أحد أجمل الواجهات البحرية في المملكة بطول 4 كم",
                images: ["corniche1.jpg", "corniche2.jpg"],
                oldImage: "corniche-old.jpg",
                newImage: "corniche-new.jpg"
            }
        ],
        alula: [
            {
                id: 8,
                name: "مدائن صالح",
                type: "historical",
                location: [26.7925, 37.9477],
                description: "موقع تراث عالمي يضم آثار قوم ثمود المنحوتة في الجبال",
                images: ["madaen1.jpg", "madaen2.jpg"],
                oldImage: "madaen-old.jpg",
                newImage: "madaen-new.jpg"
            }
        ]
    };
    
    // Add city markers to the map
    const cities = {
        riyadh: { name: "الرياض", location: [24.7136, 46.6753] },
        makkah: { name: "مكة المكرمة", location: [21.3891, 39.8579] },
        madina: { name: "المدينة المنورة", location: [24.5247, 39.5692] },
        jeddah: { name: "جدة", location: [21.5435, 39.1730] },
        dammam: { name: "الدمام", location: [26.4207, 50.0888] },
        alula: { name: "العلا", location: [26.6085, 37.9232] }
    };
    
    // Object to store landmark markers
    const landmarkMarkers = {};
    
    // Add markers for each city
    Object.keys(cities).forEach(cityId => {
        const city = cities[cityId];
        const marker = L.marker(city.location).addTo(map)
            .bindPopup(`<b>${city.name}</b><br>انقر لعرض معالم المدينة`);
        
        marker.on('click', function() {
            showLandmarksForCity(cityId);
        });
    });
    
    // Function to show landmarks for a specific city
    function showLandmarksForCity(cityId) {
        // Clear existing landmark markers
        Object.values(landmarkMarkers).forEach(marker => {
            map.removeLayer(marker);
        });
        
        // Clear the landmarks results container
        const landmarksResults = document.getElementById('landmarks-results');
        landmarksResults.innerHTML = '';
        
        // Update the selected city name
        document.getElementById('selected-city-name').textContent = cities[cityId].name;
        
        // Get landmarks for the selected city
        const landmarks = landmarksData[cityId] || [];
        
        if (landmarks.length === 0) {
            landmarksResults.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>لا توجد معالم مسجلة لهذه المدينة حالياً</p>
                </div>
            `;
            return;
        }
        
        // Add landmarks to the map and sidebar
        landmarks.forEach(landmark => {
            // Create marker for the landmark
            const marker = L.marker(landmark.location).addTo(map)
                .bindPopup(`
                    <h3>${landmark.name}</h3>
                    <p>${landmark.description.substring(0, 100)}...</p>
                 
                `);
            
            // Store the marker reference
            landmarkMarkers[landmark.id] = marker;
            
            // Add landmark to the sidebar list
            const landmarkItem = document.createElement('div');
            landmarkItem.className = 'landmark-item';
            landmarkItem.innerHTML = `
                <h4>${landmark.name}</h4>
                <p>${landmark.description.substring(0, 60)}...</p>
                
            `;
            landmarksResults.appendChild(landmarkItem);
        });
        
        // Zoom to the city
        const city = cities[cityId];
        map.flyTo(city.location, 10, {
            duration: 1,
            easeLinearity: 0.25
        });
    }
    
    // Function to show landmark details (to be implemented)
    window.showLandmarkDetail = function(landmarkId) {
        // Find the landmark in all cities
        let landmark;
        for (const city in landmarksData) {
            landmark = landmarksData[city].find(l => l.id === landmarkId);
            if (landmark) break;
        }
        
        if (!landmark) return;
        
        // Create a modal or redirect to details page
        alert(`عرض تفاصيل المعلم: ${landmark.name}\n${landmark.description}`);
        // In a real implementation, you would show a modal or redirect to a details page
    };
    
    // City selection from sidebar
    document.querySelectorAll('#cities-menu li').forEach(item => {
        item.addEventListener('click', function() {
            const cityId = this.getAttribute('data-city');
            showLandmarksForCity(cityId);
            
            // Highlight selected city
            document.querySelectorAll('#cities-menu li').forEach(li => {
                li.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close any open popups
            map.closePopup();
        });
    });
    
    // Search functionality
    document.getElementById('search-btn').addEventListener('click', function() {
        const searchTerm = document.getElementById('map-search').value.toLowerCase();
        
        if (!searchTerm) {
            alert("الرجاء إدخال مصطلح البحث");
            return;
        }
        
        // Search in all landmarks
        let foundLandmark = null;
        for (const city in landmarksData) {
            foundLandmark = landmarksData[city].find(landmark => 
                landmark.name.toLowerCase().includes(searchTerm) || 
                landmark.description.toLowerCase().includes(searchTerm)
            );
            
            if (foundLandmark) {
                // Highlight the city
                document.querySelector(`#cities-menu li[data-city="${city}"]`).click();
                
                // Open the landmark popup
                map.flyTo(foundLandmark.location, 15, {
                    duration: 1,
                    easeLinearity: 0.25
                });
                
                setTimeout(() => {
                    landmarkMarkers[foundLandmark.id].openPopup();
                }, 1000);
                
                break;
            }
        }
        
        if (!foundLandmark) {
            alert("لم يتم العثور على معلم مطابق للبحث");
        }
    });
    
    // Initialize with Riyadh landmarks
    document.querySelector('#cities-menu li[data-city="riyadh"]').click();
});

// Add this to your CSS file:
// .map-popup-btn {
//     background: var(--primary-color);
//     color: white;
//     border: none;
//     padding: 5px 10px;
//     border-radius: 3px;
//     cursor: pointer;
//     margin-top: 5px;
// }
// 
// .map-popup-btn:hover {
//     background: var(--primary-light);
// }