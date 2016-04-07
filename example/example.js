(function(){
	
	function ready(fn) {
	  if (document.readyState != 'loading'){
	    fn();
	  } else {
	    document.addEventListener('DOMContentLoaded', fn);
	  }
	};

	function init(){
		
		var pairA = new Fixuntil({ 
			"elements" : [document.querySelector('.el9')], 
			"targets" : [document.querySelector('.el12')]
		});
		
		var pairB = new Fixuntil({ 
			"elements" : ['.el1'], 
			"targets" : ['.el3']
		});
	};

	ready(init);
	

})();