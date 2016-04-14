(function(){
	
	function ready(fn) {
	  if (document.readyState != 'loading'){
	    fn();
	  } else {
	    document.addEventListener('DOMContentLoaded', fn);
	  }
	};

	function init(){
				
		var pairB = new Fixuntil({ 
			"elements" : [
							'.el1',
							'.el9'
						 ], 
			"targets" : [
							['.elcleiton','.el'], 
							'.el12'
						]
		});
	};

	ready(init);
	

})();