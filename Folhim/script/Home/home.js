// Smooth scroll from Home button to posts container
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const btnAdd = document.querySelector('.btnAdd');
    const postsContainer = document.getElementById('posts');

    if (!btnAdd) return; // no button on this page
    if (!postsContainer) return; // no posts container

    btnAdd.addEventListener('click', function (e) {
      e.preventDefault();
      // Scroll with smooth behavior. Will work even if the user hasn't set scroll-behavior in CSS.
      postsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
