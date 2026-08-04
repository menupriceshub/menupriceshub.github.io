<script>
  // Smooth scroll fix for Kiwi and older browsers
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId) || 
                   document.querySelector('[name="' + targetId + '"]');
      
      if (target) {
        e.preventDefault();
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - 160;
        
        // Try native smooth scroll first
        if ('scrollBehavior' in document.documentElement.style) {
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        } else {
          // Manual smooth scroll for Kiwi/older browsers
          var start = window.pageYOffset;
          var distance = targetPos - start;
          var duration = 600;
          var startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var ease = progress < 0.5 
              ? 2 * progress * progress 
              : -1 + (4 - 2 * progress) * progress;
            window.scrollTo(0, start + distance * ease);
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      }
    });
  });
</script>
