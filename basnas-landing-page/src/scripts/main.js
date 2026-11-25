// This file contains JavaScript code for interactive features on the landing page.

document.addEventListener('DOMContentLoaded', () => {
    // Fetch company data from JSON file
    fetch('./data/company.json')
        .then(response => response.json())
        .then(data => {
            displayCompanyInfo(data);
        })
        .catch(error => console.error('Error fetching company data:', error));

    // Function to display company information
    function displayCompanyInfo(data) {
        const companyInfoSection = document.querySelector('#company-info');
        companyInfoSection.innerHTML = `
            <h1>${data.name}</h1>
            <p>${data.mission}</p>
            <h2>Our Services</h2>
            <ul>
                ${data.services.map(service => `<li>${service}</li>`).join('')}
            </ul>
        `;
    }

    // Handle contact form submission
    const contactForm = document.querySelector('#contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Simulate form submission
        console.log('Form submitted:', data);
        alert('Thank you for contacting us!');
        contactForm.reset();
    });
});