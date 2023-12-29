  const ratingInputs = document.querySelectorAll('.rating input');
const selectedRatingDisplay = document.getElementById('selectedRating');

ratingInputs.forEach(input => {
    input.addEventListener('change', () => {
        const selectedRating = input.value;
        selectedRatingDisplay.textContent = `Selected Rating: ${selectedRating} stars`;
    });
});
