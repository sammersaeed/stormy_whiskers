document.addEventListener("DOMContentLoaded", () => {
    // For each slideshow, make sure the first image is visible
    const allSlideshows = document.querySelectorAll(".slideshow-container");
    allSlideshows.forEach((container) => {
        const slides = container.querySelectorAll(".slide-image");
        if (slides.length > 0) {
        slides[0].classList.add("active"); // Show the first slide by default
        }
    });
});

function moveSlide(button, direction) {
    // Get the specific slideshow container
    const container = button.closest(".slideshow-container");

    // Get all slides within that container
    const slides = container.querySelectorAll(".slide-image");

    // Find currently active slide index
    let currentIndex = Array.from(slides).findIndex(slide =>
        slide.classList.contains("active")
    );

    // Remove current active class
    if (currentIndex !== -1) {
        slides[currentIndex].classList.remove("active");
    }

    // Calculate next index
    let nextIndex = (currentIndex + direction + slides.length) % slides.length;

    // Show next slide
    slides[nextIndex].classList.add("active");
}