// const form = document.getElementById('contactForm');

// form.addEventListener('submit', (event) => {
//     event.preventDefault();

//     // Get form data
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const message = document.getElementById('message').value;

//     // Send data to server (replace with your server-side script)
//     fetch('your_server_script.php', {
//         method: 'POST',
//         body: JSON.stringify({ name, email, message })
//     })
//     .then(response => {
//         if (response.ok) {
//             alert('Message sent successfully!');
//             form.reset();
//         } else {
//             alert('Error sending message. Please try again.');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('An error occurred. Please try again later.');
//     });
// });

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//       x.className += " responsive";
//     } else {
//       x.className = "topnav";
//     }
//   }


document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const menuLinks = document.querySelectorAll('#mobile-menu a');
  
    // Track menu state
    let isMenuOpen = false;
  
    // Toggle menu function
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        // Open menu
        mobileMenu.classList.remove('hidden');
        // Force reflow to enable transitions
        void mobileMenu.offsetWidth;
        mobileMenu.classList.add('active');
        hamburgerIcon.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        // Close menu
        mobileMenu.classList.remove('active');
        hamburgerIcon.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Wait for transition to complete before hiding
        setTimeout(() => {
          if (!isMenuOpen) {
            mobileMenu.classList.add('hidden');
          }
        }, 300);
      }
    }
  
    // Handle menu link clicks
    function handleMenuLinkClick(e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Close menu first
          if (isMenuOpen) {
            toggleMenu();
          }
          
          // Scroll to target after menu closes
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
            
            // Update URL without jumping
            if (history.pushState) {
              history.pushState(null, null, targetId);
            } else {
              location.hash = targetId;
            }
          }, isMenuOpen ? 300 : 0);
        }
      }
    }
  
    // Event listeners
    menuButton.addEventListener('click', toggleMenu);
  
    menuLinks.forEach(link => {
      link.addEventListener('click', handleMenuLinkClick);
    });
  
    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        toggleMenu();
      }
    });
  });