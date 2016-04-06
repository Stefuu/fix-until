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
			"elements" : ['.test_el'], 
			"targets" : ['.test_tar'] 
		});
	};

	ready(init);
	

})();