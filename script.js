document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuIcon && mobileMenu) {
        menuIcon.addEventListener('click', () => {
            const isExpanded = menuIcon.getAttribute('aria-expanded') === 'true';
            menuIcon.setAttribute('aria-expanded', String(!isExpanded));
            mobileMenu.classList.toggle('is-open');
        });
    }

    // GSAP Scroll Animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.animate-on-scroll').forEach(element => {
            gsap.from(element, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                }
            });
        });
    }

    // --- PRODUCT PAGE SPECIFIC SCRIPT ---
    const productGrid = document.getElementById('product-grid-container');
    if (productGrid) {

        const products = [
            { id: 1, name: "Antique Gold Ring", price: 85000, category: "rings", desc: "A timeless gold ring with intricate hand-carved patterns, perfect for every celebration.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/99df5ba9-e12d-4974-b0e8-47afbcd9de21.png" },
            { id: 2, name: "Diamond Choker", price: 280000, category: "necklaces", desc: "An exquisite choker adorned with hand-picked diamonds for unmatched elegance.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/911d5d00-60ff-4480-b148-0049f5779331.png" },
            { id: 3, name: "Emerald Drop Earrings", price: 150000, category: "earrings", desc: "Lustrous emeralds in a delicate drop design that speaks of luxury and grace.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/70083816-5b05-4e53-97b8-258c64b3d26e.png" },
            { id: 4, name: "Solitaire Engagement Ring", price: 310000, category: "rings", desc: "A brilliant solitaire diamond ring symbolizing eternal love and commitment.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/081a4169-71b1-4049-be65-d5ace18aa45e.png" },
            { id: 5, name: "Gold Bead Necklace", price: 85000, category: "necklaces", desc: "Classic gold beads strung with precision, adding warmth to any attire.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e944f249-cd17-49d8-94e8-97def6f301c4.png" },
            { id: 6, name: "Teardrop Diamond Earrings", price: 175000, category: "earrings", desc: "Radiant diamonds shaped like teardrops for a refined, sparkling look.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e88ae5d9-9757-4d7c-b170-e6d4e04d9705.png" },
            { id: 7, name: "Pearl Bracelet", price: 95000, category: "bracelets", desc: "Natural pearls set in a fine gold frame, a symbol of grace and sophistication.", image: "https://images.pexels.com/photos/1769356/pexels-photo-1769356.jpeg?auto=compress&cs=tinysrgb&w=400" },
            { id: 8, name: "Custom Jewelry Set", price: 400000, category: "custom", desc: "A one-of-a-kind jewelry set tailored to your vision, crafted by master artisans.", image: "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=400" }
        ];

        let currentFilter = 'all';

        function renderProducts() {
            const filteredProducts = products.filter(p => currentFilter === 'all' || p.category === currentFilter);
            productGrid.innerHTML = '';
            filteredProducts.forEach(p => {
                const card = document.createElement('div');
                card.className = 'product-card relative overflow-hidden rounded-lg bg-soft-cream shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl';
                card.innerHTML = `
                  <img src="${p.image}" alt="${p.name}" class="w-full h-64 object-cover" />
                  <div class="p-5">
                    <h2 class="font-playfair text-lg mb-1">${p.name}</h2>
                    <p class="font-semibold mb-2">₹${p.price.toLocaleString('en-IN')}</p>
                    <a href="javascript:void(0);" onclick='showDetails(${JSON.stringify(p)})' class="text-rich-brown hover:text-elegant-gold underline text-sm">View Details</a>
                  </div>
                `;
                productGrid.appendChild(card);
            });
        }

        renderProducts();

        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.filter-button.active').classList.remove('active');
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderProducts();
            });
        });

        const modal = document.getElementById('product-modal');
        const modalBody = document.getElementById('modal-body');
        const closeModalBtn = document.getElementById('close-modal-btn');

        window.showDetails = function(product) {
            modalBody.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover mb-4 rounded">
                <h2 class="text-2xl font-playfair mb-2">${product.name}</h2>
                <p class="font-semibold text-lg mb-2">₹${product.price.toLocaleString('en-IN')}</p>
                <p class="capitalize mb-2"><strong>Category:</strong> ${product.category}</p>
                <p>${product.desc}</p>
            `;
            modal.classList.remove('hidden');
        }

        function closeModal() {
            modal.classList.add('hidden');
        }

        if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if(modal) modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});