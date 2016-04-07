(function(){
	
	console.log('Fixuntil 1.0.0');

	'use strict';

	/**
	 * Constructor
	 * @param {Object} settings
	 * @return {void}
	 */
	window.Fixuntil = function(settings){
		this.elements = settings.elements;
		this.targets = settings.targets;
		this.init();
	};

	/**
	 * Get
	 * @return {Array} elements
	 */
	Fixuntil.prototype.getElements = function(){
		return this.elements;
	};

	/**
	 * Get
	 * @return {Array} targets
	 */
	Fixuntil.prototype.getTargets = function(){
		return this.targets;
	};

	/**
	 * Validate the settings input
	 * @return {Boolean} isValid
	 */
	Fixuntil.prototype.validateSettings = function(){
		// Every element must have a respective target. If not, the lib stops
		/*if( els.length != targs.length ){
			console.warn('Make sure every element have a respective target.');
			return;
		}*/
	};

	/**
	 * Transforms the selector array into a DOM elements array
	 * @param {Array} selectors
	 * @return {Array}
	 */
	Fixuntil.prototype.selectorToElement = function(selectors){
		
		var i = 0;
		var aux = [];
		
		for( i; i < selectors.length; i++ ){
			aux.push( document.querySelector( selectors[i] ) );
		}

		return aux;
	};

	/**
	 * Make the elements fixed to the page top, 
	 * until they find the respective desired element
	 * @return {void}
	 */
	Fixuntil.prototype.init = function(){
		
		var self = this;
			var i = 0;
			
			for( i; i < self.selectorToElement( self.getElements() ).length; i++ ){
								
				(function(i){

					var elsSelectors = self.getElements();
					var tarSelectors = self.getTargets();
					var els = self.selectorToElement( elsSelectors );
					var targs = self.selectorToElement( tarSelectors );
					
					var size = els.length;

					var element = els[i];

					var target = targs[i];

					var elTopDist = element.getBoundingClientRect().top + window.scrollY;
					var elHeight = element.offsetHeight;
					var elPaddingBottom = parseInt(window.getComputedStyle(element, null).getPropertyValue('padding-bottom'));
					var elMarginBottom = parseInt(window.getComputedStyle(element, null).getPropertyValue('margin-bottom'));

					var tarTopDist = target.getBoundingClientRect().top + window.scrollY;
					var tarHeight = target.offsetHeight;
					var tarPaddingTop = parseInt(window.getComputedStyle(target, null).getPropertyValue('padding-top'));
					var tarMarginTop = parseInt(window.getComputedStyle(target, null).getPropertyValue('margin-top'));

						

					window.addEventListener("scroll", function(){

						var scrollTopDist = window.scrollY;	
							
							element.style.position = 'inherit';
							element.style.width = '';

						// If the scroll has not yet reached the element
						if( scrollTopDist < elTopDist ){

							// If a placeholder exists, destroy it
							if( element.className.indexOf('hasPlHolder') != -1 ){
								var divPl = element.nextSibling;
								element.className = element.className.replace('hasPlHolder','');
								divPl.parentNode.removeChild(divPl);

							}

							// Return element to normal state
							element.style.position = 'inherit';
							element.style.width = '';
						}
						
						if( scrollTopDist >= elTopDist){

							// If a placeholder dosn't exists, create one
							if( element.className.indexOf('hasPlHolder') == -1 ){
								
								element.className += ' hasPlHolder';
								var divPl = document.createElement('div');
								divPl.style.width = element.clientWidth + 'px';
								divPl.style.height = element.clientHeight + 'px';
								divPl.className = divPl.className.replace('hasPlHolder','') + ' placeholder';
								divPl.style.opacity = '0';
								element.parentNode.insertBefore(divPl, element.nextSibling);
							}
							//element.style.position = 'inherit';
							//elTopDist = element.getBoundingClientRect().top + window.scrollY
							// Fix the element
							element.style.width = element.clientWidth + 'px';
							element.style.position = 'fixed';
							element.style.top = '0';						
							element.style.backgroundColor = '#e6e6e6';

						}
						
						if( tarTopDist - elHeight - scrollTopDist <= 0  ){
							
							var firstRelative = element;

							while( firstRelative.parentNode instanceof Element ){
								
								if( window.getComputedStyle(firstRelative.parentNode, null).getPropertyValue('position') == 'relative' ){
								
									firstRelative = firstRelative.parentNode;
									break;
								}

								firstRelative = firstRelative.parentNode;	
								
							}

							
							var firstRelativeDist = firstRelative.getBoundingClientRect().top + scrollTopDist;

							// Fix the element
							element.style.width = element.clientWidth + 'px';
							element.style.position = 'absolute';
							element.style.top = tarTopDist - elHeight - tarPaddingTop - tarMarginTop - firstRelativeDist + 'px';	

						}

					}, false);

				})(i);
			}

	};

})();