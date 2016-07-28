var timeout;

if( 'ontouchstart' in window || navigator.maxTouchPoints ) {
  // Disable on touch devices, too many bugs :)
} else {
  var clone = document.querySelector('.wrapper').appendChild( document.querySelector('.intro').cloneNode(true) );

  clone.className += ' clone';

  window.addEventListener('scroll', function(e) {
    var top = document.body.scrollTop || document.documentElement.scrollTop; // Cross browser check

    if( top >= clone.offsetTop ) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      if( document.body.className.indexOf('trollface') <= 0 ) {
        document.body.className += ' trollface';
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          document.body.className = document.body.className.replace('trollface', '');
        }, 500);
      }
    }
  });
}