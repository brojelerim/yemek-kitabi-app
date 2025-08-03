// Veri yapısı
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [
    { id: 'main', name: 'Ana Yemek' },
    { id: 'soup', name: 'Çorba' },
    { id: 'salad', name: 'Salata' },
    { id: 'dessert', name: 'Tatlı' }
];

// Örnek tarifler (ilk kullanım için)
const sampleRecipes = [
    {
        id: 1,
        name: "Mercimek Çorbası",
        category: "soup",
        image: null,
        imageData: null,
        ingredients: [
            "1 su bardağı kırmızı mercimek",
            "1 adet soğan",
            "1 adet havuç",
            "2 yemek kaşığı tereyağı",
            "Tuz, karabiber",
            "6 su bardağı su"
        ],
        instructions: [
            "Mercimekleri yıkayıp süzün",
            "Soğanı ve havucu doğrayın",
            "Tereyağında soğanları kavurun",
            "Mercimek ve havuçları ekleyin",
            "Su ekleyip 30 dakika pişirin",
            "Blenderdan geçirin ve servis yapın"
        ],
        videoUrl: "https://www.youtube.com/watch?v=example1",
        time: 45,
        difficulty: "easy"
    },
    {
        id: 2,
        name: "Tavuk Sote",
        category: "main",
        image: null,
        imageData: null,
        ingredients: [
            "500g tavuk göğsü",
            "2 adet biber",
            "1 adet soğan",
            "2 yemek kaşığı zeytinyağı",
            "Tuz, karabiber, kekik",
            "2 diş sarımsak"
        ],
        instructions: [
            "Tavukları kuşbaşı doğrayın",
            "Sebzeleri julyen doğrayın",
            "Zeytinyağında tavukları pişirin",
            "Sebzeleri ekleyin",
            "Baharatları ekleyip 5 dakika daha pişirin",
            "Sıcak servis yapın"
        ],
        videoUrl: "https://www.youtube.com/watch?v=example2",
        time: 30,
        difficulty: "medium"
    },
    {
        id: 3,
        name: "Çoban Salata",
        category: "salad",
        image: null,
        imageData: null,
        ingredients: [
            "2 adet domates",
            "1 adet salatalık",
            "1 adet soğan",
            "100g beyaz peynir",
            "Zeytin",
            "Zeytinyağı, limon, tuz"
        ],
        instructions: [
            "Domates, salatalık ve soğanı küp küp doğrayın",
            "Beyaz peyniri küp küp doğrayın",
            "Zeytinleri ekleyin",
            "Zeytinyağı, limon ve tuz ile karıştırın",
            "Soğuk servis yapın"
        ],
        videoUrl: "https://www.youtube.com/watch?v=example3",
        time: 15,
        difficulty: "easy"
    },
    {
        id: 4,
        name: "Tiramisu",
        category: "dessert",
        image: null,
        imageData: null,
        ingredients: [
            "6 adet yumurta",
            "150g şeker",
            "500g mascarpone peyniri",
            "200g lady finger bisküvi",
            "2 fincan kahve",
            "Kakao tozu"
        ],
        instructions: [
            "Yumurta sarılarını şekerle çırpın",
            "Mascarpone'yi ekleyip karıştırın",
            "Bisküvileri kahveye batırın",
            "Katmanlar halinde dizin",
            "Üzerine kakao serpin",
            "4 saat buzdolabında bekletin"
        ],
        videoUrl: "https://www.youtube.com/watch?v=example4",
        time: 60,
        difficulty: "hard"
    }
];

// Eğer localStorage boşsa örnek verileri ekle
if (recipes.length === 0) {
    recipes = sampleRecipes;
    saveData();
}

// DOM elementleri
const recipesContainer = document.getElementById('recipesContainer');
const searchInput = document.getElementById('searchInput');
const addRecipeModal = document.getElementById('addRecipeModal');
const categoryModal = document.getElementById('categoryModal');
const backupModal = document.getElementById('backupModal');
const recipeForm = document.getElementById('recipeForm');
const categoriesContainer = document.getElementById('categoriesContainer');
const recipeCategorySelect = document.getElementById('recipeCategory');
const closeBtns = document.querySelectorAll('.close');

// Service Worker kayıt
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    displayCategories();
    displayRecipes(recipes);
    setupEventListeners();
    updateCategorySelect();
});

// Event listener'ları ayarla
function setupEventListeners() {
    // Modal kapatma
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // Arama fonksiyonu
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(searchTerm)
            )
        );
        displayRecipes(filteredRecipes);
    });

    // Form submit
    recipeForm.addEventListener('submit', handleFormSubmit);
}

// Kategorileri görüntüle
function displayCategories() {
    categoriesContainer.innerHTML = `
        <button class="category-btn active" onclick="filterRecipes('all')">
            Tümü
        </button>
        ${categories.map(category => `
            <button class="category-btn" onclick="filterRecipes('${category.id}')">
                ${category.name}
            </button>
        `).join('')}
    `;
}

// Kategori seçim listesini güncelle
function updateCategorySelect() {
    recipeCategorySelect.innerHTML = categories.map(category => 
        `<option value="${category.id}">${category.name}</option>`
    ).join('');
}

// Tarifleri görüntüle
function displayRecipes(recipesToShow) {
    if (recipesToShow.length === 0) {
        recipesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Tarif bulunamadı</h3>
                <p>Aradığınız kriterlere uygun tarif bulunamadı.</p>
            </div>
        `;
        return;
    }

    recipesContainer.innerHTML = recipesToShow.map(recipe => `
        <div class="recipe-card">
            <div class="recipe-image">
                ${recipe.imageData ? 
                    `<img src="${recipe.imageData}" alt="${recipe.name}" style="width: 100%; height: 100%; object-fit: cover;">` :
                    `<i class="fas fa-utensils"></i>`
                }
            </div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.name}</h3>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.time} dk</span>
                    <span class="difficulty-${recipe.difficulty}">
                        <i class="fas fa-star"></i> 
                        ${getDifficultyText(recipe.difficulty)}
                    </span>
                    <span><i class="fas fa-tag"></i> ${getCategoryName(recipe.category)}</span>
                </div>
                <p class="recipe-description">
                    ${recipe.ingredients.slice(0, 3).join(', ')}...
                </p>
                <div class="recipe-actions">
                    <button class="recipe-btn view-btn" onclick="viewRecipe(${recipe.id})">
                        <i class="fas fa-eye"></i> Tarifi Gör
                    </button>
                    ${recipe.videoUrl ? `
                        <a href="${recipe.videoUrl}" target="_blank" class="recipe-btn video-btn">
                            <i class="fas fa-play"></i> Video
                        </a>
                    ` : ''}
                    <button class="recipe-btn delete-btn" onclick="deleteRecipe(${recipe.id})">
                        <i class="fas fa-trash"></i> Sil
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Kategori filtreleme
function filterRecipes(category) {
    // Aktif kategori butonunu güncelle
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Tarifleri filtrele
    const filteredRecipes = category === 'all' ? 
        recipes : 
        recipes.filter(recipe => recipe.category === category);
    
    displayRecipes(filteredRecipes);
}

// Yeni tarif ekleme modalını aç
function addNewRecipe() {
    addRecipeModal.style.display = 'block';
    recipeForm.reset();
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('imagePreview').innerHTML = '';
}

// Resim önizleme
function previewImage() {
    const fileInput = document.getElementById('recipeImageFile');
    const preview = document.getElementById('imagePreview');
    
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Önizleme">`;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

// Form submit işlemi
function handleFormSubmit(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('recipeImageFile');
    let imageData = null;
    
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageData = e.target.result;
            saveRecipe(imageData);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        saveRecipe(null);
    }
}

// Tarifi kaydet
function saveRecipe(imageData) {
    const newRecipe = {
        id: Date.now(),
        name: document.getElementById('recipeName').value,
        category: document.getElementById('recipeCategory').value,
        image: null,
        imageData: imageData,
        ingredients: document.getElementById('recipeIngredients').value
            .split('\n')
            .filter(ingredient => ingredient.trim() !== ''),
        instructions: document.getElementById('recipeInstructions').value
            .split('\n')
            .filter(instruction => instruction.trim() !== ''),
        videoUrl: document.getElementById('recipeVideo').value || null,
        time: parseInt(document.getElementById('recipeTime').value),
        difficulty: document.getElementById('recipeDifficulty').value
    };

    recipes.push(newRecipe);
    saveData();
    closeAllModals();
    displayRecipes(recipes);
    showNotification('Tarif başarıyla eklendi!', 'success');
}

// Tarif sil
function deleteRecipe(recipeId) {
    if (confirm('Bu tarifi silmek istediğinizden emin misiniz?')) {
        recipes = recipes.filter(recipe => recipe.id !== recipeId);
        saveData();
        displayRecipes(recipes);
        showNotification('Tarif silindi!', 'info');
    }
}

// Kategori yönetimi modalını aç
function manageCategories() {
    categoryModal.style.display = 'block';
    displayCategoriesList();
}

// Kategorileri listele
function displayCategoriesList() {
    const categoriesList = document.getElementById('categoriesList');
    categoriesList.innerHTML = categories.map(category => `
        <div class="category-item">
            <span>${category.name}</span>
            <button class="delete-category-btn" onclick="deleteCategory('${category.id}')">
                <i class="fas fa-trash"></i> Sil
            </button>
        </div>
    `).join('');
}

// Kategori ekle
function addCategory() {
    const categoryName = document.getElementById('newCategoryName').value.trim();
    if (categoryName) {
        const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
        const newCategory = { id: categoryId, name: categoryName };
        categories.push(newCategory);
        saveData();
        displayCategories();
        updateCategorySelect();
        displayCategoriesList();
        document.getElementById('newCategoryName').value = '';
        showNotification('Kategori eklendi!', 'success');
    }
}

// Kategori sil
function deleteCategory(categoryId, event) {
    if (event) event.stopPropagation();
    
    // Bu kategoride tarif var mı kontrol et
    const recipesInCategory = recipes.filter(recipe => recipe.category === categoryId);
    if (recipesInCategory.length > 0) {
        alert(`Bu kategoride ${recipesInCategory.length} tarif bulunuyor. Önce tarifleri silin veya başka kategoriye taşıyın.`);
        return;
    }
    
    if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
        categories = categories.filter(category => category.id !== categoryId);
        saveData();
        displayCategories();
        updateCategorySelect();
        displayCategoriesList();
        showNotification('Kategori silindi!', 'info');
    }
}

// Veri yedekleme modalını aç
function showBackupModal() {
    backupModal.style.display = 'block';
}

// Verileri dışa aktar
function exportData() {
    const data = {
        recipes: recipes,
        categories: categories,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yemek-kitabi-verileri-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Veriler başarıyla indirildi!', 'success');
}

// Verileri içe aktar
function importData() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (data.recipes && data.categories) {
                    if (confirm('Mevcut verileriniz silinecek. Devam etmek istiyor musunuz?')) {
                        recipes = data.recipes;
                        categories = data.categories;
                        saveData();
                        displayCategories();
                        displayRecipes(recipes);
                        updateCategorySelect();
                        showNotification('Veriler başarıyla yüklendi!', 'success');
                    }
                } else {
                    alert('Geçersiz dosya formatı!');
                }
            } catch (error) {
                alert('Dosya okunamadı!');
            }
        };
        reader.readAsText(file);
    }
}

// Tarif detayını görüntüle
function viewRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    // Mevcut detay modalını kaldır
    const existingModal = document.querySelector('.recipe-detail-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Yeni detay modalı oluştur
    const modal = document.createElement('div');
    modal.className = 'recipe-detail-modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="recipe-detail-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            
            ${recipe.imageData ? 
                `<img src="${recipe.imageData}" alt="${recipe.name}" class="recipe-detail-image">` :
                `<div class="recipe-detail-image" style="display: flex; align-items: center; justify-content: center; background: linear-gradient(45deg, #f0f0f0, #e0e0e0); color: #999; font-size: 3rem;">
                    <i class="fas fa-utensils"></i>
                </div>`
            }
            
            <h2 class="recipe-detail-title">${recipe.name}</h2>
            
            <div class="recipe-detail-meta">
                <span><i class="fas fa-clock"></i> ${recipe.time} dakika</span>
                <span class="difficulty-${recipe.difficulty}">
                    <i class="fas fa-star"></i> ${getDifficultyText(recipe.difficulty)}
                </span>
                <span><i class="fas fa-tag"></i> ${getCategoryName(recipe.category)}</span>
                ${recipe.videoUrl ? `
                    <span><i class="fas fa-video"></i> Video mevcut</span>
                ` : ''}
            </div>
            
            <div class="recipe-section">
                <h3><i class="fas fa-list"></i> Malzemeler</h3>
                <ul>
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recipe-section">
                <h3><i class="fas fa-utensils"></i> Hazırlanışı</h3>
                <ol>
                    ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                </ol>
            </div>
            
            ${recipe.videoUrl ? `
                <div class="recipe-section">
                    <h3><i class="fas fa-video"></i> Video Tarifi</h3>
                    <a href="${recipe.videoUrl}" target="_blank" class="recipe-btn video-btn">
                        <i class="fas fa-play"></i> Videoyu İzle
                    </a>
                </div>
            ` : ''}
        </div>
    `;

    document.body.appendChild(modal);

    // Modal dışına tıklandığında kapat
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Tüm modalları kapat
function closeAllModals() {
    addRecipeModal.style.display = 'none';
    categoryModal.style.display = 'none';
    backupModal.style.display = 'none';
}

// Kategori modalını kapat
function closeCategoryModal() {
    categoryModal.style.display = 'none';
}

// Yedekleme modalını kapat
function closeBackupModal() {
    backupModal.style.display = 'none';
}

// Verileri kaydet
function saveData() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
    localStorage.setItem('categories', JSON.stringify(categories));
}

// Yardımcı fonksiyonlar
function getDifficultyText(difficulty) {
    const difficulties = {
        'easy': 'Kolay',
        'medium': 'Orta',
        'hard': 'Zor'
    };
    return difficulties[difficulty] || difficulty;
}

function getCategoryName(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
}

// Bildirim gösterme
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? '#4ecdc4' : type === 'info' ? '#ff6b6b' : '#ffa726'};
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CSS animasyonları için style ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 