(function(){
	
	function ready(fn) {
	  if (document.readyState != 'loading'){
	    fn();
	  } else {
	    document.addEventListener('DOMContentLoaded', fn);
	  }
	};

	function init(){
		
		var a = new Fixuntil({ 
			"elements" : ['header','.el11'], 
			"targets" : ['.el2','.el15'] 
		});
		
	};

	ready(init);
	

})();