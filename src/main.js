// Navigation Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle (for responsive design)
  const mobileToggle = document.createElement('button');
  mobileToggle.className = 'mobile-nav-toggle';
  mobileToggle.innerHTML = '☰';

  const headerContainer = document.querySelector('.header-top .container');
  const logo = document.querySelector('.logo');

  if (headerContainer && logo) {
    headerContainer.insertBefore(mobileToggle, logo.nextSibling);
  }

  // Toggle mobile menu when hamburger is clicked
  mobileToggle.addEventListener('click', function() {
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
      mainNav.classList.toggle('mobile-visible');
      // Change toggle icon between hamburger and X
      mobileToggle.innerHTML = mainNav.classList.contains('mobile-visible') ? '✕' : '☰';
    }
  });

  // Handle dropdown menu behavior
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  
  // Hide all dropdown menus on page load
  dropdownMenus.forEach(menu => {
    menu.style.display = 'none';
  });

  // Handle hover behavior for dropdown menus
  const menuItems = document.querySelectorAll('.has-dropdown');
  menuItems.forEach(item => {
    const dropdownMenu = item.querySelector('.dropdown-menu');
    
    // Show dropdown on hover
    item.addEventListener('mouseenter', () => {
      dropdownMenu.style.display = 'block';
    });
    
    // Hide dropdown when mouse leaves
    item.addEventListener('mouseleave', () => {
      dropdownMenu.style.display = 'none';
    });
    
    // For touch devices, add a touch handler
    item.addEventListener('touchstart', (e) => {
      // Don't follow the link on first touch
      if (dropdownMenu.style.display === 'none') {
        e.preventDefault();
        
        // Close all other dropdowns
        dropdownMenus.forEach(menu => {
          menu.style.display = 'none';
        });
        
        // Show this dropdown
        dropdownMenu.style.display = 'block';
      }
    });
  });

  // Close dropdowns when clicking elsewhere on the page
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      dropdownMenus.forEach(menu => {
        menu.style.display = 'none';
      });
    }
  });

  // Handle window resize events
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      // Reset mobile menu state on desktop view
      const mainNav = document.querySelector('.main-nav');
      if (mainNav && mainNav.classList.contains('mobile-visible')) {
        mainNav.classList.remove('mobile-visible');
        mobileToggle.innerHTML = '☰';
      }
      
      // Ensure dropdowns are hidden
      dropdownMenus.forEach(menu => {
        menu.style.display = 'none';
      });
    }
  });

  // Search functionality
  const searchButton = document.querySelector('.btn-search');
  if (searchButton) {
    searchButton.addEventListener('click', function() {
      // Create search overlay
      const searchOverlay = document.createElement('div');
      searchOverlay.className = 'search-overlay';

      const searchContainer = document.createElement('div');
      searchContainer.className = 'search-container';

      const searchForm = document.createElement('form');
      searchForm.innerHTML = `
        <input type="text" placeholder="Search WebMD" class="search-input">
        <div class="search-buttons">
          <button type="submit" class="search-submit">Search</button>
          <button type="button" class="search-close">Close</button>
        </div>
      `;

      searchContainer.appendChild(searchForm);
      searchOverlay.appendChild(searchContainer);
      document.body.appendChild(searchOverlay);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when search is open

      // Focus on the search input
      setTimeout(() => {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);

      // Close search when close button is clicked
      const closeButton = document.querySelector('.search-close');
      if (closeButton) {
        closeButton.addEventListener('click', function() {
          document.body.removeChild(searchOverlay);
          document.body.style.overflow = ''; // Re-enable scrolling
        });
      }

      // Close search on overlay click
      searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
          document.body.removeChild(searchOverlay);
          document.body.style.overflow = ''; // Re-enable scrolling
        }
      });

      // Close search on ESC key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.contains(searchOverlay)) {
          document.body.removeChild(searchOverlay);
          document.body.style.overflow = ''; // Re-enable scrolling
        }
      });

      // Handle search form submission
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = document.querySelector('.search-input').value.trim();
        if (searchTerm) {
          alert(`Searching for: ${searchTerm}`);
          document.body.removeChild(searchOverlay);
          document.body.style.overflow = ''; // Re-enable scrolling
        } else {
          alert('Please enter a search term');
        }
      });
    });
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        const thankYouMessage = document.createElement('p');
        thankYouMessage.textContent = `Thank you for subscribing with ${emailInput.value}`;
        thankYouMessage.className = 'thank-you-message';

        const formParent = newsletterForm.parentNode;
        formParent.replaceChild(thankYouMessage, newsletterForm);

        // Reset the form after 5 seconds
        setTimeout(() => {
          formParent.replaceChild(newsletterForm, thankYouMessage);
          emailInput.value = '';
        }, 5000);
      } else {
        alert('Please enter a valid email address');
      }
    });
  }

  // For demo purposes: add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .condition-link, .news-item, .special-article');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'transform 0.2s ease';
    });

    element.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Ensure images are loaded properly
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    // Add a fallback for broken images
    img.addEventListener('error', function() {
      this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU1RTUiLz48cGF0aCBkPSJNMTAwIDg2QzkzLjM3MjYgODYgODggOTEuMzcyNiA4OCA5OEM4OCAxMDQuNjI3IDkzLjM3MjYgMTEwIDEwMCAxMTBDMTA2LjYyNyAxMTAgMTEyIDEwNC42MjcgMTEyIDk4QzExMiA5MS4zNzI2IDEwNi42MjcgODYgMTAwIDg2Wk02OCAxMDBDNjggODAuMTE3NyA4NC4xMTc3IDY0IDEwMCA2NEMxMTUuODgyIDY0IDEzMiA4MC4xMTc3IDEzMiAxMDBDMTMyIDExOS44ODIgMTE1Ljg4MiAxMzYgMTAwIDEzNkM4NC4xMTc3IDEzNiA2OCAxMTkuODgyIDY4IDEwMFoiIGZpbGw9IiM5Q0E3QjgiLz48L3N2Zz4=';
      this.alt = 'Image could not be loaded';
      this.style.opacity = '0.7';
    });
  });
});

// Add CSS class for search overlay and mobile dropdown
const style = document.createElement('style');
style.textContent = `
  .search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .search-container {
    width: 90%;
    max-width: 600px;
    background-color: white;
    border-radius: 4px;
    padding: 20px;
  }

  .search-input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 15px;
  }

  .search-buttons {
    display: flex;
    gap: 10px;
  }

  .search-submit {
    flex: 1;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
  }

  .search-close {
    flex: 1;
    background-color: #f5f5f5;
    color: #333;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
  }

  .mobile-nav-toggle {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
  }

  .thank-you-message {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 15px;
    border-radius: 4px;
    text-align: center;
  }

  /* Override dropdown menu display */
  .main-nav ul li:hover .dropdown-menu {
    display: none !important;
  }

  /* The JS will handle showing/hiding dropdowns instead */

  @media (max-width: 768px) {
    .search-buttons {
      flex-direction: column;
    }

    .search-submit, .search-close {
      width: 100%;
    }
    
    /* Mobile navigation styles */
    .mobile-nav-toggle {
      display: block;
    }
    
    .main-nav {
      display: none;
    }
    
    .main-nav.mobile-visible {
      display: block;
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 5px 10px rgba(0,0,0,0.2);
      z-index: 1000;
    }
    
    .main-nav.mobile-visible ul {
      flex-direction: column;
      padding: 10px 0;
    }
    
    .main-nav.mobile-visible ul li {
      width: 100%;
      margin-right: 0;
      border-bottom: 1px solid #eee;
    }
    
    .main-nav.mobile-visible ul li a {
      padding: 15px 20px;
    }
    
    .main-nav.mobile-visible .dropdown-menu {
      position: static;
      width: 100%;
      box-shadow: none;
      border-top: none;
    }
    
    .main-nav.mobile-visible .dropdown-menu li a {
      padding-left: 40px;
    }
  }
`;

document.head.appendChild(style);