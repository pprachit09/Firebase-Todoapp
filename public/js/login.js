$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementsByClassName("container")[0].style.WebkitFilter = 'blur(4px)';
  document.getElementsByClassName("container")[0].style.filter= 'blur(4px)';
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementsByClassName("container")[0].style.WebkitFilter = 'blur(0px)';
  document.getElementsByClassName("container")[0].style.filter= 'blur(0px)';
}