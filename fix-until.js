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
		if (document.readyState != 'loading'){
			this.init();
		}else{
			document.addEventListener('DOMContentLoaded', this.init);
		}
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
			
			// For each element in the elments array
			for( i; i < self.getElements().length; i++ ){
				
				// The anonymous function bellow is used to transfer
				// the 'for' index to the scroll event listener scope
				(function(i){

					// Get the elements selectors
					var elsSelectors = self.getElements();

					// Get the targets selectors
					var tarSelectors = self.getTargets();
					
					// Uses the selectors to create Element arrays if the array is
					if( !(elsSelectors[0] instanceof Element) ){
						var els = self.selectorToElement( elsSelectors );
						
					}else{
						var els = elsSelectors;
					}

					// Uses the selectors to create Element arrays if the array is
					if( !(tarSelectors[0] instanceof Element) ){
						var targs = self.selectorToElement( tarSelectors );
					}else{
						var targs = tarSelectors;
					}
					
					// The sticky element
					var element = els[i];

					// The target element were the sticky element will stop
					var target = targs[i];

					// The distance from the sticky element to the page top
					var elTopDist = element.getBoundingClientRect().top + window.scrollY;

					// The left distance fo the sticky element
					var elLeftDist = element.getBoundingClientRect().left;

					// The sticky element height
					var elHeight = element.offsetHeight;

					// The sticky element padding-bottom
					var elPaddingBottom = parseInt(window.getComputedStyle(element, null).getPropertyValue('padding-bottom'));

					// The sticky element margin-bottom
					var elMarginBottom = parseInt(window.getComputedStyle(element, null).getPropertyValue('margin-bottom'));
					
					var elMarginLeft = parseInt(window.getComputedStyle(element, null).getPropertyValue('margin-left'));
					
					var elBorderBottom = parseInt(window.getComputedStyle(element, null).getPropertyValue('border-bottom'));

					// The distance from the target element to the page top
					var tarTopDist = target.getBoundingClientRect().top + window.scrollY;
					
					// The target element height
					var tarHeight = target.offsetHeight;
					
					// The target element padding-bottom
					var tarPaddingTop = parseInt(window.getComputedStyle(target, null).getPropertyValue('padding-top'));
					
					// The target element margin-bottom
					var tarMarginTop = parseInt(window.getComputedStyle(target, null).getPropertyValue('margin-top'));
					
					var tarBorderBottom = parseInt(window.getComputedStyle(target, null).getPropertyValue('border-top'));

					// Finds the first element whit position relative up the DOM
					// and get the distance from that element the top
					var firstRelative = element;
					while( firstRelative.parentNode instanceof Element ){
						
						if( window.getComputedStyle(firstRelative.parentNode, null).getPropertyValue('position') == 'relative' ){
						
							firstRelative = firstRelative.parentNode;
							break;
						}

						firstRelative = firstRelative.parentNode;	
						
					}
					
					// The margin-bottom of the first element with position relative up the DOM tree
					var firstRelativePaddingLeft = parseInt(window.getComputedStyle(firstRelative, null).getPropertyValue('padding-left'));
					
					// The margin-left of the first element with position relative up the DOM tree
					var firstRelativeMarginLeft = parseInt(window.getComputedStyle(firstRelative, null).getPropertyValue('margin-left'));
					
					// The top distance of the first element with position relative up the DOM tree
					var firstRelativeTopDist = firstRelative.getBoundingClientRect().top +  window.scrollY;
					
					// The left distance of the first element with position relative up the DOM tree
					var firstRelativeLeftDist = firstRelative.getBoundingClientRect().left;
					
					// The difference between the left position of the sticky element and the first element with position relative up the DOM tree
					var leftDiff = elLeftDist - firstRelativeLeftDist;

					// Scroll event listener
					window.addEventListener("scroll", function(){

						// Get the scroll position
						var scrollTopDist = window.scrollY;	

						// If the scroll has not yet reached the element
						if( scrollTopDist < elTopDist ){

							// If a placeholder element exists, destroy it
							if( element.className.indexOf('hasPlHolder') != -1 ){
								
								var divPl = element.nextSibling;
								element.className = element.className.replace('hasPlHolder','');
								divPl.parentNode.removeChild(divPl);

							}

							// Return element to normal state
							element.style.position = 'inherit';
							element.style.width = '';
						}
						
						// If the area where the element must be sticky has been reached
						if( scrollTopDist >= elTopDist){

							// If a placeholder doesn't exists, create one
							if( element.className.indexOf('hasPlHolder') == -1 ){
								
								element.className += ' hasPlHolder';
								var divPl = document.createElement('div');
								divPl.style.width = element.clientWidth + 'px';
								divPl.style.height = element.clientHeight + 'px';
								divPl.className = divPl.className.replace('hasPlHolder','') + ' placeholder';
								divPl.style.opacity = '0';
								element.parentNode.insertBefore(divPl, element.nextSibling);
							}
							
							// Fix the element
							element.style.width = window.getComputedStyle(element, null).getPropertyValue('width');
							element.style.position = 'fixed';
							element.style.left = elLeftDist - elMarginLeft + 'px';
							element.style.top = '0';						

						}
						
						// If the scroll is bellow the area where the element must be fixed
						if( tarTopDist - elMarginBottom - elPaddingBottom - tarPaddingTop - tarMarginTop - elHeight - scrollTopDist <= 0  ){
							
							// Position the sticky element abouve the target element
							element.style.width = window.getComputedStyle(element, null).getPropertyValue('width');
							element.style.position = 'absolute';
							element.style.left = leftDiff - elMarginLeft+ 'px';
							element.style.top = tarTopDist - elMarginBottom - elPaddingBottom - elHeight - elBorderBottom - tarBorderBottom - tarPaddingTop - tarMarginTop - firstRelativeTopDist + 'px';	

						}

					}, false);

				})(i);
			}

	};

})();
