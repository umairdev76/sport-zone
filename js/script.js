// SportZone - JavaScript Functionality

// DOM Content Loaded Event
// document.addEventListener('DOMContentLoaded', function() {
//     initializeWebsite();
// });

// Initialize all website functionality
function initializeWebsite() {
    initializeNavigation();
    initializeCarousels();
    initializeScrollEffects();
    initializeProductInteractions();
    initializeCartFunctionality();
    initializeSearchFunctionality();
    initializeContactForm();
    initializeImageZoom();
    initializeGoToTopButton();
    updateCartCount();
}

// ===== NAVIGATION =====
// function initializeNavigation() {
//     // Mobile menu toggle
//     const navbarToggler = document.querySelector('.navbar-toggler');
//     const navbarCollapse = document.querySelector('.navbar-collapse');
    
//     if (navbarToggler && navbarCollapse) {
//         navbarToggler.addEventListener('click', function() {
//             navbarCollapse.classList.toggle('show');
//         });
        
//         // Close mobile menu when clicking outside
//         document.addEventListener('click', function(e) {
//             if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
//                 navbarCollapse.classList.remove('show');
//             }
//         });
//     }
    
//     // Active navigation highlighting
//     const currentPage = window.location.pathname.split('/').pop() || 'index.html';
//     const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
//     navLinks.forEach(link => {
//         const href = link.getAttribute('href');
//         if (href === currentPage || (currentPage === '' && href === 'index.html')) {
//             link.classList.add('active');
//         } else {
//             link.classList.remove('active');
//         }
//     });
// }
function toggleSidebar() {
    const sidebar = document.getElementById("customSidebar");
    sidebar.classList.toggle("active");
  }

  window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
      header.classList.add('shadow-sm');
    } else {
      header.classList.remove('shadow-sm');
    }
  });

// // Optionally keep your existing initializeNavigation()
// initializeNavigation();

// ===== CAROUSELS =====
function initializeCarousels() {
    // Hero carousel auto-play control
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 2000,
            wrap: true,
            pause: 'hover'
        });
        
        // Add fade effect to hero slides
        heroCarousel.addEventListener('slide.bs.carousel', function(e) {
            const activeSlide = heroCarousel.querySelector('.carousel-item.active');
            const nextSlide = e.relatedTarget;
            
            activeSlide.style.opacity = '0';
            setTimeout(() => {
                activeSlide.style.opacity = '1';
            }, 300);
        });
    }
    
    // Product carousel
    const productCarousel = document.getElementById('productCarousel');
    if (productCarousel) {
        new bootstrap.Carousel(productCarousel, {
            interval: 2000,
            wrap: true,
            pause: 'hover'
        });
    }
    
    // Gallery carousel
    const galleryCarousel = document.getElementById('galleryCarousel');
    if (galleryCarousel) {
        new bootstrap.Carousel(galleryCarousel, {
            interval: 3000,
            wrap: true,
            pause: 'hover'
        });
    }
    
    // Testimonials carousel
    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    if (testimonialsCarousel) {
        new bootstrap.Carousel(testimonialsCarousel, {
            interval: 4000,
            wrap: true,
            pause: 'hover'
        });
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Navbar background opacity on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrolled > 50) {
                navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = 'var(--dark-color)';
                navbar.style.backdropFilter = 'none';
            }
        }
    });
    
    // // Smooth scrolling for anchor links
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const target = document.querySelector(this.getAttribute('href'));
    //         if (target) {
    //             target.scrollIntoView({
    //                 behavior: 'smooth',
    //                 block: 'start'
    //             });
    //         }
    //     });
    // });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .category-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== PRODUCT INTERACTIONS =====
function initializeProductInteractions() {
    // Product quick view
    // document.querySelectorAll('.product-overlay .btn').forEach(btn => {
    //     btn.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         showQuickView(this);
    //     });
    // });
    
    // Product image hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Size selection
    document.querySelectorAll('input[name="size"]').forEach(input => {
        input.addEventListener('change', function() {
            updateProductPrice();
        });
    });
    
    // Color selection
    document.querySelectorAll('input[name="color"]').forEach(input => {
        input.addEventListener('change', function() {
            updateProductImage(this.value);
        });
    });
}

// Show product quick view
function showQuickView(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    
    // Create modal content
    const modalHTML = `
        <div class="modal fade" id="quickViewModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Quick View - ${productName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="product-placeholder">
                                    <img src="assets/shoe-product.jpg" alt="">
                                    <p>${productName}</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h4>${productName}</h4>
                                <p class="text-muted">Premium quality athletic wear</p>
                                <div class="product-rating mb-3">
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="far fa-star text-warning"></i>
                                    <span class="text-muted">(24 reviews)</span>
                                </div>
                                <div class="price mb-3">
                                    <span class="h4 text-primary">${productPrice}</span>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Size:</label>
                                    <div class="btn-group" role="group">
                                        <input type="radio" class="btn-check" name="quickSize" id="quickS" value="S">
                                        <label class="btn btn-outline-secondary" for="quickS">S</label>
                                        <input type="radio" class="btn-check" name="quickSize" id="quickM" value="M" checked>
                                        <label class="btn btn-outline-secondary" for="quickM">M</label>
                                        <input type="radio" class="btn-check" name="quickSize" id="quickL" value="L">
                                        <label class="btn btn-outline-secondary" for="quickL">L</label>
                                    </div>
                                </div>
                                <button class="btn btn-primary w-100" onclick="addToCartQuick('${productName}', '${productPrice}')">
                                    <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('quickViewModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    modal.show();
    
    // Remove modal from DOM when hidden
    document.getElementById('quickViewModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Update product price based on selections
function updateProductPrice() {
    // This would typically fetch from a database or API
    console.log('Product price updated based on selections');
}

// Update product image based on color selection
function updateProductImage(color) {
    console.log(`Product image updated to ${color} variant`);
}

// ===== CART FUNCTIONALITY =====
let cart = JSON.parse(localStorage.getItem('sportzone_cart')) || [];

function initializeCartFunctionality() {
    updateCartDisplay();
    
    // Add event listeners for cart buttons
    document.querySelectorAll('[onclick*="addToCart"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            if (productCard) {
                const product = extractProductData(productCard);
                addToCart(product);
            }
        });
    });
}

// ✅ Define this FIRST
function updateCartDisplay() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const emptyCartState = document.getElementById('emptyCartState');

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.style.display = 'none';
    if (emptyCartState) {
      emptyCartState.classList.remove('d-none');
    }
    return;
  }

  if (emptyCartState) {
    emptyCartState.classList.add('d-none');
  }

  updateCartSummary();
}


// Extract product data from card
function extractProductData(productCard) {
    return {
        id: Math.random().toString(36).substr(2, 9),
        name: productCard.querySelector('.product-name').textContent,
        price: productCard.querySelector('.product-price').textContent,
        code: productCard.querySelector('.product-code')?.textContent || '',
        image: 'placeholder',
        quantity: 1
    };
}

// Add item to cart
function addToCart(product = null) {
    if (!product) {
        // Get product details from current page
        product = {
            id: Math.random().toString(36).substr(2, 9),
            name: document.querySelector('.product-title')?.textContent || 'Product',
            price: document.querySelector('.current-price')?.textContent || '$0.00',
            code: document.querySelector('.product-code')?.textContent || '',
            size: document.querySelector('input[name="size"]:checked')?.value || 'M',
            color: document.querySelector('input[name="color"]:checked')?.value || 'Black',
            quantity: parseInt(document.getElementById('quantity')?.value) || 1,
            image: 'placeholder'
        };
    }
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => 
        item.name === product.name && 
        item.size === product.size && 
        item.color === product.color
    );
    
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    
    // Save to localStorage
    localStorage.setItem('sportzone_cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    showCartNotification('Item added to cart!');
    
    console.log('Product added to cart:', product);
}

// Add to cart from quick view
function addToCartQuick(name, price) {
    const product = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        price: price,
        size: document.querySelector('input[name="quickSize"]:checked')?.value || 'M',
        quantity: 1,
        image: 'placeholder'
    };
    
    addToCart(product);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('quickViewModal'));
    if (modal) {
        modal.hide();
    }
}

// Update cart count in header
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(badge => {
        badge.textContent = cartCount;
        badge.style.display = cartCount > 0 ? 'inline-block' : 'none';
    });
}

// Update cart display on cart page
updateCartSummary

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => {
        // ✅ Safe check before using .replace()
        let price = 0;

        if (item.price && typeof item.price === 'string') {
            // Remove $ if present and convert to number
            price = parseFloat(item.price.replace('$', '').trim());
        }

        const quantity = item.quantity || 1;
        return total + (price * quantity);
    }, 0);

    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + tax + shipping;

    // Update summary display
    const summaryItems = document.querySelectorAll('.summary-item span:last-child');
    if (summaryItems.length >= 3) {
        summaryItems[0].textContent = `$${subtotal.toFixed(2)}`;
        summaryItems[1].textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        summaryItems[2].textContent = `$${tax.toFixed(2)}`;
    }

    const totalElement = document.querySelector('.summary-total span:last-child');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}


// Update item quantity
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(itemId);
        } else {
            localStorage.setItem('sportzone_cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
        }
    }
}

// Remove item from cart
function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('sportzone_cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    showCartNotification('Item removed from cart');
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = []; 
        localStorage.removeItem('sportzone_cart'); 
        updateCartCount();
        updateCartDisplay(); 
        showCartNotification('Cart cleared'); 
    }
}


// Change quantity on product detail page
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        let currentValue = parseInt(quantityInput.value);
        let newValue = currentValue + change;
        
        if (newValue < 1) newValue = 1;
        if (newValue > 10) newValue = 10;
        
        quantityInput.value = newValue;
    }
}

// Add to wishlist
function addToWishlist() {
    showCartNotification('Added to wishlist!');
    console.log('Product added to wishlist');
}

// Buy now
function buyNow() {
    addToCart();
    window.location.href = 'cart.html';
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // In a real application, this would redirect to a checkout page
    alert('Proceeding to checkout... (This would redirect to a secure checkout page)');
}

// Apply promo code
function applyPromoCode() {
    const promoCode = document.getElementById('promoCode')?.value.trim();
    
    if (!promoCode) {
        alert('Please enter a promo code');
        return;
    }
    
    // Mock promo code validation
    const validCodes = {
        'SAVE10': 0.1,
        'WELCOME': 0.05,
        'ATHLETE': 0.15
    };
    
    if (validCodes[promoCode.toUpperCase()]) {
        const discount = validCodes[promoCode.toUpperCase()];
        showCartNotification(`Promo code applied! ${(discount * 100)}% discount`);
        updateCartSummary();
    } else {
        alert('Invalid promo code');
    }
}

// Show cart notification
function showCartNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show position-fixed" 
             style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;">
            <i class="fas fa-check-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add to cart from recently viewed
function addToCartFromRecentlyViewed(productCode) {
    const product = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Product ${productCode}`,
        price: '$99.99',
        code: productCode,
        quantity: 1,
        image: '/assets/about-img.jpeg'
    };

    addToCart(product);
}


// ===== SEARCH FUNCTIONALITY =====
function initializeSearchFunctionality() {
    // Search form submission
    const searchForms = document.querySelectorAll('#searchForm, .search-form form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch();
        });
    });
    
    // Search input handling
    const searchInputs = document.querySelectorAll('#searchInput, #mainSearchInput');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
        
        // Auto-complete suggestions (mock)
        input.addEventListener('input', function() {
            showSearchSuggestions(this.value);
        });
    });
}
// Open search modal
function openSearch() {
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        const modal = new bootstrap.Modal(searchModal);
        modal.show();
        
        // Focus on search input when modal opens
        searchModal.addEventListener('shown.bs.modal', function() {
            const searchInput = searchModal.querySelector('#searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        });
    }
}

// Perform search
// function performSearch() {
//     const searchInput = document.querySelector('#searchInput, #mainSearchInput');
//     const query = searchInput ? searchInput.value.trim() : '';
    
//     if (!query) {
//         alert('Please enter a search term');
//         return;
//     }
    
//     // Close search modal if open
//     const searchModal = document.getElementById('searchModal');
//     if (searchModal) {
//         const modal = bootstrap.Modal.getInstance(searchModal);
//         if (modal) {
//             modal.hide();
//         }
//     }
    
//     // Redirect to search page with query
//     const currentPage = window.location.pathname.split('/').pop();
//     if (currentPage !== 'search.html') {
//         window.location.href = `search.html?q=${encodeURIComponent(query)}`;
//     } else {
//         updateSearchResults(query);
//     }
// }

// Show search suggestions
function showSearchSuggestions(query) {
    if (query.length < 2) return;
    
    // Mock search suggestions
    const suggestions = [
        'running shoes',
        'basketball shoes',
        'athletic wear',
        'training equipment',
        'nike products',
        'adidas products'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    console.log('Search suggestions:', suggestions);
}

// Update search results
function updateSearchResults(query) {
    const resultsTitle = document.getElementById('searchResultsTitle');
    const resultsCount = document.getElementById('searchResultsCount');
    
    if (resultsTitle) {
        resultsTitle.textContent = `Search Results for "${query}"`;
    }
    
    if (resultsCount) {
        resultsCount.textContent = `Showing 1-12 of 51 results for "${query}"`;
    }
    
    // Update search input with query
    const searchInput = document.getElementById('mainSearchInput');
    if (searchInput) {
        searchInput.value = query;
    }
    
    console.log(`Searching for: ${query}`);
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission();
        });
    }
}

// Handle contact form submission
function handleContactSubmission() {
    const formData = {
        firstName: document.getElementById('firstName')?.value,
        lastName: document.getElementById('lastName')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        subject: document.getElementById('subject')?.value,
        message: document.getElementById('message')?.value,
        newsletter: document.getElementById('newsletter')?.checked
    };
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            document.getElementById('contactForm').reset();
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }, 2000);
    }
    
    console.log('Contact form submitted:', formData);
}

// ===== IMAGE ZOOM =====
function initializeImageZoom() {
    const mainImage = document.getElementById('mainImage');
    const zoomLens = document.getElementById('zoomLens');
    const zoomResult = document.getElementById('zoomResult');
    
    if (mainImage && zoomLens && zoomResult) {
        mainImage.addEventListener('mousemove', function(e) {
            showZoom(e, this, zoomLens, zoomResult);
        });
        
        mainImage.addEventListener('mouseenter', function() {
            zoomLens.style.display = 'block';
            zoomResult.style.display = 'block';
        });
        
        mainImage.addEventListener('mouseleave', function() {
            zoomLens.style.display = 'none';
            zoomResult.style.display = 'none';
        });
    }
}

// Show zoom effect
function showZoom(e, img, lens, result) {
    const pos = getCursorPos(e, img);
    const x = pos.x;
    const y = pos.y;
    
    // Calculate lens position
    let lensX = x - (lens.offsetWidth / 2);
    let lensY = y - (lens.offsetHeight / 2);
    
    // Prevent lens from going outside image
    if (lensX > img.offsetWidth - lens.offsetWidth) {
        lensX = img.offsetWidth - lens.offsetWidth;
    }
    if (lensX < 0) lensX = 0;
    if (lensY > img.offsetHeight - lens.offsetHeight) {
        lensY = img.offsetHeight - lens.offsetHeight;
    }
    if (lensY < 0) lensY = 0;
    
    // Set lens position
    lens.style.left = lensX + 'px';
    lens.style.top = lensY + 'px';
    
    // Calculate zoom result position
    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;
    
    result.style.backgroundPosition = `-${lensX * cx}px -${lensY * cy}px`;
    result.style.backgroundSize = `${img.offsetWidth * cx}px ${img.offsetHeight * cy}px`;
}

// Get cursor position relative to image
function getCursorPos(e, img) {
    const a = img.getBoundingClientRect();
    const x = e.pageX - a.left - window.pageXOffset;
    const y = e.pageY - a.top - window.pageYOffset;
    return { x: x, y: y };
}

// Change main image (for thumbnails)
function changeMainImage(index) {
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail-item').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Add active class to selected thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    if (thumbnails[index]) {
        thumbnails[index].classList.add('active');
    }
    
    console.log(`Changed main image to index: ${index}`);
}

// ===== GO TO TOP BUTTON =====
function initializeGoToTopButton() {
    const goToTopBtn = document.getElementById('goToTop');
    
    if (goToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                goToTopBtn.classList.add('show');
            } else {
                goToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        goToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== UTILITY FUNCTIONS =====

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Local storage helpers
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function getLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return defaultValue;
    }
}

// ===== PAGE-SPECIFIC FUNCTIONALITY =====

// Initialize page based on current URL
function initializePageSpecific() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'search.html':
            initializeSearchPage();
            break;
        case 'product-detail.html':
            initializeProductDetailPage();
            break;
        case 'cart.html':
            initializeCartPage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
        default:
            break;
    }
}

// Initialize search page
function initializeSearchPage() {
    const query = getUrlParameter('q');
    if (query) {
        updateSearchResults(query);
    }
}

// Initialize product detail page
function initializeProductDetailPage() {
    // Product tabs
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', function() {
            console.log('Tab shown:', this.textContent);
        });
    });
}

// Initialize cart page
function initializeCartPage() {
    updateCartDisplay();
}

// Initialize contact page
function initializeContactPage() {
    // Initialize map (if using real map service)
    console.log('Contact page initialized');
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== INITIALIZATION =====
// Initialize page-specific functionality after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePageSpecific();
});

// Export functions for global use
window.SportZone = {
    addToCart,
    removeItem,
    updateQuantity,
    clearCart,
    changeQuantity,
    addToWishlist,
    buyNow,
    proceedToCheckout,
    applyPromoCode,
    openSearch,
    changeMainImage,
    addToCartFromRecentlyViewed
};
 document.addEventListener('DOMContentLoaded', function() {
            // Sticky Header
            window.addEventListener('scroll', function() {
                const header = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    header.classList.add('header-sticky');
                } else {
                    header.classList.remove('header-sticky');
                }
            });

            // Product Filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const productItems = document.querySelectorAll('.product-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    const filter = button.getAttribute('data-filter');
                    
                    productItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });

            // Wishlist Functionality
            window.toggleWishlist = function(button) {
                button.classList.toggle('active');
                const icon = button.querySelector('i');
                if (button.classList.contains('active')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#dc3545';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                }
            };

            // Quick View Modal
            const quickViewButtons = document.querySelectorAll('.quick-view-btn');
            const quickViewModal = document.getElementById('quickViewModal');
            
            quickViewButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-product-id');
                    const productCard = button.closest('.product-card');
                    const productTitle = productCard.querySelector('.product-name').textContent;
                    const productPrice = productCard.querySelector('.product-price').textContent;
                    
                    document.getElementById('quickViewTitle').textContent = productTitle;
                    document.getElementById('quickViewPrice').textContent = productPrice;
                });
            });

            // Newsletter Form
            const newsletterForm = document.getElementById('newsletterForm');
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                // Show success message
                const formContent = this.innerHTML;
                this.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        <i class="fas fa-check-circle me-2"></i>
                        Thank you for subscribing! Check your email for confirmation.
                    </div>
                `;
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.innerHTML = formContent;
                    this.reset();
                }, 3000);
            });

            // Animated Counters
            function animateCounter(elementId, targetValue, duration = 2000) {
                const element = document.getElementById(elementId);
                const startValue = 0;
                const increment = targetValue / (duration / 16);
                let currentValue = startValue;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        clearInterval(timer);
                        currentValue = targetValue;
                    }
                    element.textContent = Math.floor(currentValue);
                }, 16);
            }

            // Intersection Observer for counters
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter('counter-delivery', 1000);
                        animateCounter('counter-products', 500);
                        animateCounter('counter-secure', 100);
                        animateCounter('counter-support', 24);
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(document.querySelector('.usp-timeline'));

            // Countdown Timer
            function updateCountdown() {
                // Set the target date (7 days from now)
                const targetDate = new Date();
                targetDate.setDate(targetDate.getDate() + 7);
                
                const now = new Date();
                const difference = targetDate - now;
                
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                
                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            }
            
            // Update countdown every second
            setInterval(updateCountdown, 1000);
            updateCountdown(); // Initial call
        });

        // JavaScript for interactive features
        document.addEventListener('DOMContentLoaded', function() {
            // Sticky header
            window.addEventListener('scroll', function() {
                const header = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    header.classList.add('header-sticky');
                } else {
                    header.classList.remove('header-sticky');
                }
            });

            // Product filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Wishlist functionality
            window.toggleWishlist = function(button) {
                button.classList.toggle('active');
                const icon = button.querySelector('i');
                if (button.classList.contains('active')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#dc3545';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                }
            };

            // Quick view modal
            window.changeMainImage = function(src) {
                document.querySelector('.main-image img').src = src;
            };

            // Quantity controls
            window.incrementQuantity = function() {
                const input = document.getElementById('productQuantity');
                input.value = parseInt(input.value) + 1;
            };

            window.decrementQuantity = function() {
                const input = document.getElementById('productQuantity');
                if (parseInt(input.value) > 1) {
                    input.value = parseInt(input.value) - 1;
                }
            };

            // Add to cart functionality
            function addToCart(product) {
    // Check if product already exists
    const existing = cart.find(item => item.code === product.code);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Show toast
    showToast('Product added to cart!');
}


            // Wishlist from modal
            window.toggleWishlistFromModal = function() {
                const wishlistBtn = document.querySelector('.modal .btn-outline-primary');
                wishlistBtn.classList.toggle('active');
                
                if (wishlistBtn.classList.contains('active')) {
                    wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
                } else {
                    wishlistBtn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
                }
            };

            // Toast notification
            function showToast(message) {
                // Create toast element
                const toast = document.createElement('div');
                toast.className = 'toast-notification';
                toast.innerHTML = `
                    <div class="toast-content">
                        <i class="fas fa-check-circle me-2"></i>
                        <span>${message}</span>
                    </div>
                `;
                
                // Add styles
                toast.style.position = 'fixed';
                toast.style.bottom = '20px';
                toast.style.right = '20px';
                toast.style.backgroundColor = 'white';
                toast.style.color = '#333';
                toast.style.padding = '12px 20px';
                toast.style.borderRadius = '8px';
                toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                toast.style.zIndex = '9999';
                toast.style.display = 'flex';
                toast.style.alignItems = 'center';
                toast.style.transition = 'all 0.3s ease';
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px)';
                
                // Add to body
                document.body.appendChild(toast);
                
                // Show toast
                setTimeout(() => {
                    toast.style.opacity = '1';
                    toast.style.transform = 'translateY(0)';
                }, 100);
                
                // Hide and remove toast
                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, 300);
                }, 3000);
            }

           
        });
  // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

 const items = document.querySelectorAll(".wheel-item");
  const itemCount = items.length;
  const radius = 250;

  items.forEach((item, i) => {
    const angle = (i / itemCount) * 360;
    item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
  });