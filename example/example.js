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
			"elements" : ['.el1','.el10'], 
			"targets" : ['.el4','.el7']
		});
	};

	ready(init);
	

})();