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
			"elements" : ['.el6','.el11','.el2'], 
			"targets" : ['.el8','.el15','.el5'] 
		});
		
	};

	ready(init);
	

})();