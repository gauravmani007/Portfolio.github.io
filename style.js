// sidebar

function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const menuBtn = document.querySelector('.menubtn');

  sidebar.classList.add('active');
  menuBtn.style.display = 'none' /// hide outsude dot
}

function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const menuBtn = document.querySelector('.menubtn');
  
  sidebar.classList.remove('active');
  menuBtn.style.display = 'block'; // show outside dot
}

// Optional: Close sidebar when clicking outside (you can keep this)
document.addEventListener('click', function(event) {
  const sidebar = document.querySelector('.sidebar');
  const menuBtn = document.querySelector('.menubtn');

  if (sidebar.classList.contains('active') &&
      !sidebar.contains(event.target) &&
      !menuBtn.contains(event.target)) {
    hideSidebar();
  }
});





ScrollReveal().reveal('.section-heading', {
    delay: 100,
    origin: 'top',
    distance: '50px',
    duration: 1000,
    easing: 'ease-in-out'
  });

  ScrollReveal().reveal('.details-container', {
    delay: 300,
    origin: 'bottom',
    distance: '40px',
    duration: 800,
    interval: 200
  });

  ScrollReveal().reveal('.home-info, .home-img', {
    delay: 200,
    origin: 'left',
    distance: '60px',
    duration: 1000,
    easing: 'ease-out'
  });



// Skill and project section


document.addEventListener('DOMContentLoaded', function() {
  // Animate skill bars
  const skillItems = document.querySelectorAll('.skill-item');
  
  const animateSkills = () => {
    skillItems.forEach(item => {
      const skillLevel = item.getAttribute('data-skill');
      const progressBar = item.querySelector('.skill-progress');
      const percentText = item.querySelector('.skill-percent');
      
      let width = 0;
      const interval = setInterval(() => {
        if (width >= skillLevel) {
          clearInterval(interval);
        } else {
          width++;
          progressBar.style.width = width + '%';
          percentText.textContent = width + '%';
        }
      }, 20);
    });
  };
  
  // Only animate when skills section is in view
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  skillsObserver.observe(document.getElementById('skills'));
  
  // Project card hover effect enhancement
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
  
  // Scroll reveal animations
  ScrollReveal().reveal('.skill-category', {
    delay: 200,
    origin: 'bottom',
    distance: '50px',
    duration: 800,
    interval: 200
  });
  
  ScrollReveal().reveal('.project-card', {
    delay: 300,
    origin: 'bottom',
    distance: '50px',
    duration: 800,
    interval: 200
  });
});




//   contact section
  ScrollReveal().reveal('.contact-container', {
    delay: 200,
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    easing: 'ease-in-out'
  });

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  // Floating label functionality
  const inputs = document.querySelectorAll('.contact-input');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      const label = this.nextElementSibling;
      label.classList.add('active');
    });
    
    input.addEventListener('blur', function() {
      if (this.value === '') {
        const label = this.nextElementSibling;
        label.classList.remove('active');
      }
    });
  });

  // Form validation and submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    
    // Validate form
    let isValid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name === '') {
      document.getElementById('name-error').textContent = 'Name is required';
      isValid = false;
    }
    
    if (email === '') {
      document.getElementById('email-error').textContent = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(email)) {
      document.getElementById('email-error').textContent = 'Please enter a valid email';
      isValid = false;
    }
    
    if (message === '') {
      document.getElementById('message-error').textContent = 'Message is required';
      isValid = false;
    }
    
    if (!isValid) return;
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    submitBtn.disabled = true;

    fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: { 'Accept': 'application/json' } })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          formStatus.textContent = 'Your message has been sent successfully!';
          formStatus.classList.add('success');
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Failed');
        }
      })
      .catch(() => {
        formStatus.textContent = 'Error sending message. Please try again.';
        formStatus.classList.add('error');
      })
      .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 5000);
      });
  });

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Animation for contact section
  ScrollReveal().reveal('.contact-info-item', {
    delay: 200,
    origin: 'left',
    distance: '50px',
    duration: 800,
    interval: 100
  });
  
  ScrollReveal().reveal('.contact-form', {
    delay: 300,
    origin: 'right',
    distance: '50px',
    duration: 800
  });
});
