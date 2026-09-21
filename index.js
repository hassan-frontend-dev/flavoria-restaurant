// بيانات الوجبات مع دعم اللغتين
const menuItems = [
    { id: 1, nameAr: "برجر كلاسيك", nameEn: "Classic Burger", price: 120, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 2, nameAr: "بيتزا مارجريتا", nameEn: "Margherita Pizza", price: 150, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { id: 3, nameAr: "باستا فروتي دي ماري", nameEn: "Seafood Pasta", price: 180, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500" },
    { id: 4, nameAr: "بطاطس مقلية", nameEn: "French Fries", price: 45, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" }
];

let cart = [];
let currentLang = 'ar'; // اللغة الافتراضية

// قاموس الترجمات للنصوص الثابتة
const translations = {
    ar: {
        title: "مطعم الأكيل",
        logo: "🍔 مطعم الأكيل",
        home: "الرئيسية",
        menu: "المنيو",
        cart: "السلة",
        heroTitle: "أطعم المأكولات بين يديك",
        heroDesc: "جرب طعم الطازج والمميز اليوم!",
        heroBtn: "عرض القائمة",
        menuTitle: "قائمة الطعام",
        cartTitle: "سلة الشراء",
        emptyCart: "السلة فارغة حالياً.",
        total: "الإجمالي",
        currency: "ج.م",
        checkout: "إتمام الشراء",
        addToCart: "إضافة إلى السلة",
        langButton: "English"
    },
    en: {
        title: "Al-Akeel Restaurant",
        logo: "🍔 Al-Akeel",
        home: "Home",
        menu: "Menu",
        cart: "Cart",
        heroTitle: "Delicious Food At Your Fingertips",
        heroDesc: "Try the fresh and unique taste today!",
        heroBtn: "View Menu",
        menuTitle: "Our Menu",
        cartTitle: "Shopping Cart",
        emptyCart: "Your cart is currently empty.",
        total: "Total",
        currency: "EGP",
        checkout: "Checkout",
        addToCart: "Add to Cart",
        langButton: "عربي"
    }
};

// دالة تبديل اللغة بانسيابية ونعومة تامة
function toggleLanguage() {
    const body = document.body;
    
    // إضافة فئة التلاشي
    body.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    body.style.opacity = "0";
    body.style.transform = "translateY(10px)"; // حركة خفيفة للأسفل مع الاختفاء

    setTimeout(() => {
        // تبديل اللغة والاتجاه أثناء اختفاء المحتوى
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        
        const htmlTag = document.documentElement;
        htmlTag.lang = currentLang;
        htmlTag.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        updateTexts();
        displayMenu();
        updateCart();

        // إعادة ظهور المحتوى بنعومة تامة
        body.style.opacity = "1";
        body.style.transform = "translateY(0)";
    }, 300); // مدة التلاشي (300 ملي ثانية لتبدو طبيعية وناعمة جداً)
}

// تحديث النصوص الثابتة بناءً على اللغة الحالية
function updateTexts() {
    const t = translations[currentLang];

    document.getElementById('page-title').innerText = t.title;
    document.getElementById('logo-text').innerText = t.logo;
    document.getElementById('nav-home').innerText = t.home;
    document.getElementById('nav-menu').innerText = t.menu;
    document.getElementById('nav-cart').innerText = t.cart;
    document.getElementById('hero-title').innerText = t.heroTitle;
    document.getElementById('hero-desc').innerText = t.heroDesc;
    document.getElementById('hero-btn').innerText = t.heroBtn;
    document.getElementById('menu-title').innerText = t.menuTitle;
    document.getElementById('cart-title').innerText = t.cartTitle;
    document.getElementById('total-text').innerText = t.total;
    document.getElementById('currency').innerText = t.currency;
    document.getElementById('checkout-btn-text').innerText = t.checkout;
    document.getElementById('lang-btn').innerText = t.langButton;

    if (cart.length === 0) {
        document.getElementById('empty-cart-text').innerText = t.emptyCart;
    }
}

// عرض القائمة في الـ DOM
function displayMenu() {
    const menuGrid = document.getElementById('menu-grid');
    const t = translations[currentLang];

    menuGrid.innerHTML = menuItems.map(item => `
        <div class="card">
            <img src="${item.image}" alt="${currentLang === 'ar' ? item.nameAr : item.nameEn}">
            <h3>${currentLang === 'ar' ? item.nameAr : item.nameEn}</h3>
            <p class="price">${item.price} ${t.currency}</p>
            <button class="add-btn" onclick="addToCart(${item.id})">${t.addToCart}</button>
        </div>
    `).join('');
}

// إضافة منتج للسلة
function addToCart(id) {
    const item = menuItems.find(p => p.id === id);
    cart.push(item);
    updateCart();
}

// تحديث عرض السلة والإجمالي
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');
    const t = translations[currentLang];

    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p id="empty-cart-text">${t.emptyCart}</p>`;
        totalPrice.innerText = '0';
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span>${currentLang === 'ar' ? item.nameAr : item.nameEn}</span>
            <span>${item.price} ${t.currency}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.innerText = total;
}

// تشغيل الدوال عند تحميل الصفحة لأول مرة
displayMenu();