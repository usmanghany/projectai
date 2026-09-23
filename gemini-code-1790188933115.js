document.addEventListener('DOMContentLoaded', () => {
    // Basic Add to Cart interaction alert
    const cartButtons = document.querySelectorAll('.btn-action');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productTitle = e.target.parentElement.querySelector('h3').innerText;
            alert(`Added to cart: ${productTitle}`);
        });
    });
});