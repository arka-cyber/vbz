document.addEventListener('DOMContentLoaded', function () {
    const contactButton = document.getElementById('contactButton');
    const contactForm = document.getElementById('contactForm');

    contactButton.addEventListener('click', function () {
        contactForm.style.display = 'block';
        contactButton.style.display = 'none';
    });
});
