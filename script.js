// script.js
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const submitButton = document.getElementById('submit-rating');
    let selectedRating = 0;

    if (localStorage.getItem('userRating')) {
        setRating(parseFloat(localStorage.getItem('userRating')));
        submitButton.disabled = true;
    }

    stars.forEach(star => {
        star.addEventListener('click', () => {
            if (!localStorage.getItem('userRating')) {
                const index = parseInt(star.getAttribute('data-index'));
                toggleRating(index);
                submitButton.disabled = selectedRating === 0;
            }
        });

        star.addEventListener('mouseover', () => {
            if (!localStorage.getItem('userRating')) {
                const index = parseInt(star.getAttribute('data-index'));
                setHoverRating(index);
            }
        });

        star.addEventListener('mouseout', () => {
            if (!localStorage.getItem('userRating')) {
                clearHoverRating();
                setRating(selectedRating);
            }
        });
    });

    submitButton.addEventListener('click', () => {
        if (selectedRating > 0) {
            localStorage.setItem('userRating', selectedRating);
            submitButton.disabled = true;
            alert(`You rated ${selectedRating} stars`);
        }
    });

    function setRating(rating) {
        stars.forEach((star, index) => {
            if (index < Math.floor(rating)) {
                star.classList.add('full');
                star.classList.remove('half', 'selected');
            } else if (index < rating) {
                star.classList.add('half');
                star.classList.remove('full', 'selected');
            } else {
                star.classList.remove('full', 'half', 'selected');
            }
        });
    }

    function setHoverRating(index) {
        index = index - 1;
        stars.forEach((star, i) => {
            if (i < index) {
                star.classList.add('full');
                star.classList.remove('half');
            } else if (i < index + 0.5) {
                star.classList.add('half');
                star.classList.remove('full');
            } else {
                star.classList.remove('full', 'half');
            }
        });
    }

    function clearHoverRating() {
        stars.forEach(star => {
            star.classList.remove('full', 'half');
        });
    }

    function toggleRating(index) {
        if (selectedRating === index) {
            selectedRating = 0;
        } else if (selectedRating === index - 0.5) {
            selectedRating = index;
        } else {
            selectedRating = index - 0.5;
        }
        setRating(selectedRating);
    }
});
