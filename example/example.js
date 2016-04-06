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
			"elements" : ['.el10','.el1'], 
			"targets" : ['.el12','.el3'] 
		});
		
	};

	ready(init);
	

})();