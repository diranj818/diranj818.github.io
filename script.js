// Set year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Gallery images array
const galleryImages = [
    'images/GMC23102025_073617.jpg',
    'images/GMC23102025_092234.jpg',
    'images/GMC24102025_083030.jpg',
    'images/IMG20250822164936.jpg',
    'images/IMG20250829173532.jpg',
    'images/IMG20250903171716.jpg',
    'images/IMG20250909180515.jpg',
    'images/IMG20250911181024.jpg',
    'images/IMG20250930172619.jpg',
    'images/IMG20251002175816.jpg',
    'images/IMG20251003140404.jpg',
    'images/IMG20251004101435.jpg',
    'images/IMG20251004101611.jpg',
    'images/IMG20251008165333.jpg',
    'images/IMG20251009180803.jpg',
    'images/IMG20251024164201.jpg',
    'images/IMG20251029170809.jpg',
    'images/IMG20251031161210.jpg',
    'images/IMG20251103175254_BURST000_COVER.jpg',
    'images/IMG20251106171235.jpg',
    'images/IMG20251107193226.jpg',
    'images/Screenshot_2025-10-02-20-51-18-40_99c04817c0de5652397fc8b56c3b3817.jpg'
];

// Set gallery image in modal
function setGalleryImage(index) {
    document.getElementById('modalImage').src = galleryImages[index];
}

// Toggle gallery visibility
function toggleGallery() {
    const hiddenItems = document.querySelectorAll('.gallery-hidden');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    
    // Check if any item is currently shown
    const isExpanded = hiddenItems[0] && hiddenItems[0].classList.contains('show');
    
    if (isExpanded) {
        // Hide all items
        hiddenItems.forEach(item => {
            item.classList.remove('show');
        });
        viewMoreBtn.innerHTML = '<i class="bi bi-chevron-down me-2"></i>Lihat Lebih Banyak';
    } else {
        // Show all items
        hiddenItems.forEach(item => {
            item.classList.add('show');
        });
        viewMoreBtn.innerHTML = '<i class="bi bi-chevron-up me-2"></i>Lihat Lebih Sedikit';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only process if href is not just "#" and has a valid target
        if (href && href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Contact form submission (only if form exists)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const mailtoLink = `mailto:nurbaetijanahdira@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Dari: ${name} (${email})\n\n${message}`)}`;
        
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Terima kasih! Email akan dibuka di aplikasi email Anda.');
        
        // Reset form
        this.reset();
    });
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill items for animation
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.style.opacity = '0';
    observer.observe(item);
});

// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.progress-bar');
const progressObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Active nav link highlighting on scroll
function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    if (navLinks.length === 0 || sections.length === 0) {
        return;
    }
    
    // Function to update active nav link
    function setActiveNavLink(id) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Function to determine which section is currently active
    function getCurrentSection() {
        const scrollPosition = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
        const offset = 150; // Offset untuk navbar dan padding
        
        // Handle top of page
        if (scrollPosition < 50) {
            return 'home';
        }
        
        let current = '';
        
        // Check each section to see if it's in the viewport
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            // Section is active if scroll position is within the section bounds
            if (scrollPosition + offset >= sectionTop && scrollPosition + offset < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        // If no section found, find the closest one
        if (!current) {
            let closestSection = '';
            let closestDistance = Infinity;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionId = section.getAttribute('id');
                const distance = Math.abs((scrollPosition + offset) - sectionTop);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = sectionId;
                }
            });
            
            current = closestSection || 'home';
        }
        
        return current;
    }
    
    // Update active nav on scroll
    function updateActiveNav() {
        const currentSection = getCurrentSection();
        setActiveNavLink(currentSection);
    }
    
    // Throttled scroll handler
    let scrollTicking = false;
    function onScroll() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Set initial active state
    setTimeout(function() {
        updateActiveNav();
    }, 100);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initActiveNav);
} else {
    initActiveNav();
}

window.addEventListener('load', function() {
    setTimeout(initActiveNav, 100);
});

// Add fade-in animation to cards on scroll
const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Parallax effect removed to prevent layout issues

// Initialize tooltips if Bootstrap is loaded
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Download CV functionality
const downloadCVBtn = document.getElementById('downloadCVBtn');
if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', function(e) {
        // The download attribute in HTML will handle the download
        // This is just for visual feedback
        const btn = this;
        const originalText = btn.innerHTML;
        const originalBg = btn.style.background;
        
        // Show success message after a short delay
        setTimeout(() => {
            btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Downloaded!';
            btn.style.background = '#28a745';
            btn.style.borderColor = '#28a745';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = originalBg;
                btn.style.borderColor = '';
            }, 2000);
        }, 100);
    });
}