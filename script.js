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
<script>
    document.addEventListener("DOMContentLoaded", function () {
        let ratings = document.querySelectorAll(".rating");

        ratings.forEach(function (rating) {
            let ratingValue = rating.getAttribute("data-rating");
            setRating(rating, ratingValue);
        });

        function setRating(element, rating) {
            let stars = "";
            for (let i = 1; i <= 5; i++) {
                stars += i <= rating ? "★" : "☆";
            }
            element.innerHTML = stars;
        }
    });
</script>
<script>
  const ratingInputs = document.querySelectorAll('.rating input');
  const ratingValueDisplay = document.getElementById('rating-value'); // Optional, replace with your element ID

  ratingInputs.forEach(input => {
    input.addEventListener('change', () => {
      const selectedRating = input.value;
      // Optional: Display the selected rating to the user
      if (ratingValueDisplay) {
        ratingValueDisplay.innerText = `Selected Rating: ${selectedRating} stars`;
      }
    });
  });
</script>
