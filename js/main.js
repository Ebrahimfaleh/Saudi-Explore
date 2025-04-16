// بيانات نموذجية للمعالم (يجب استبدالها ببياناتك الفعلية)
const landmarksData = {
    riyadh: {
        old: "images/old/riyadh.jpg",
        new: "images/new/riyadh.jpg"
    },
    makkah: {
        old: "images/old/makkah.jpg",
        new: "images/new/makkah.jpg"
    },
    madina: {

        old: "images/old/madina.jpg",
        
        new: "images/new/madina.jpg"
        
        },
        jeddah: {

            old: "images/old/jeddah.jpg",
            
            new: "images/new/jeddah.jpg"
            
         },
        alula: {

            old: "images/old/alula.jpg",
                
            new: "images/new/alula.jpg"
                
         },
        dammam: {

            old: "images/old/Dammam.jpg",
                
            new: "images/new/Dammam.jpg"
                
         }
};

// إضافة حدث النقر لعناصر المدن
document.querySelectorAll('#cities-menu li').forEach(item => {
    item.addEventListener('click', function() {
        const city = this.dataset.city;
        updateComparisonImages(city);
    });
});

// دالة تحديث الصور
function updateComparisonImages(city) {
    const comparisonSection = document.querySelector('.comparison-section');
    const beforeImage = document.querySelector('.before-image');
    const afterImage = document.querySelector('.after-image');

    if (landmarksData[city]) {
        beforeImage.src = landmarksData[city].old;
        afterImage.src = landmarksData[city].new;
        comparisonSection.style.display = 'block';
    } else {
        comparisonSection.style.display = 'none';
    }
}