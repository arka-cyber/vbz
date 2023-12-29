  <script>
    const ratingInputs = document.querySelectorAll('.rating input');
    let selectedRating = 0;

    ratingInputs.forEach(input => {
      input.addEventListener('change', () => {
        selectedRating = input.value;
        console.log('Selected Rating:', selectedRating);
        // You can use the selectedRating variable for further processing
      });
    });
  </script>
