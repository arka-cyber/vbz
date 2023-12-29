<script>
  const rating = document.getElementsByName('rating');
  let selectedRating;

  for (let i = 0; i < rating.length; i++) {
    rating[i].addEventListener('change', function() {
      selectedRating = this.value;
      // Submit the selected rating to the server
    });
  }
</script>
