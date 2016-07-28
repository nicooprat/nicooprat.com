var delay = 0;

setInterval(function() {
  delay = 0;
}, 100);

var books = document.querySelectorAll('.books-item');

Array.prototype.slice.call( books ).forEach(function(book) {
  var waypoint = new Waypoint({
    element: book,
    handler: function(direction) {
      if( direction == 'down' ) {
        if( this.element.className.indexOf('is-inview') <= 0 ) {
          this.element.className = this.element.className.trim() + ' is-inview';
          this.element.style['transition-delay'] = delay + 'ms';
          this.element.style['-webkit-transition-delay'] = delay + 'ms';
          delay += 100;
        }
      } else {
        this.element.className = this.element.className.replace(/is-inview/, '');
        this.element.style = '';
      }
    },
    offset: '90%'
  });
});