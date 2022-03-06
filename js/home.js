function quake() 
{ 
  ['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function(prefix){
	Array.prototype.slice.call(document.querySelectorAll('div,p,span,img,a')).map(function(el){
    el.style["transition"] = "1000s";
		el.style[prefix + 'transform'] = 'rotate(' + (Math.floor(Math.random() * 1000) - 1) + 'deg)';
	});
});
} 