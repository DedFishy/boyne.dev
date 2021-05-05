$(window).scroll(function(){
    $(".top").css("opacity", 1 - $(window).scrollTop() / 600);
  });

['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function(prefix){
	document.body.style[prefix + 'transform'] = 'rotate(180deg)';
});