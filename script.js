 document.addEventListener('DOMContentLoaded', function () {
    const ratingContainers = document.querySelectorAll('.rating');

    ratingContainers.forEach(container => {
        container.addEventListener('click', function (e) {
            const stars = container.querySelectorAll('.star');
            const clickedStar = e.target;

            // Reset all stars to empty
            stars.forEach(star => star.classList.remove('filled'));

            // Fill the clicked star and all previous stars
            stars.forEach(star => {
                star.classList.add('filled');
                if (star === clickedStar) {
                    return false; // Stop when the clicked star is reached
                }
            });
        });
    });
});
