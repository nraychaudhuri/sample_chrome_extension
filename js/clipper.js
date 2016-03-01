var WebClipper = function() {
	var self = {};

	self.init = function() {
		var previewDOM;
		var highlightedText = window.getSelection().toString();
		
		if(highlightedText) {
			previewDOM = getSelectedDOM();
		} else if($("article").size() > 0) {
			// previewDOM = $("article")
			// find main article that is not in header, nav, aside, footer, etc
		} else {
			var sizes = scanSizes(document.querySelectorAll("*"));
			// rule out header, nav, aside, footer, etc
			// look for main class or id

		}
	};

	var getSelectedDOM = function() {
		var firstEl = getSelectionBoundaryElement(true);
		var lastEl = getSelectionBoundaryElement(false);

		return createSelectedElementsArray(firstEl, lastEl);
	};

	var createSelectedElementsArray  = function(firstEl, lastEl) {
		var foundIt = false;
		var currentEl = firstEl;
		var elements = [];

		while (!foundIt) {
		    elements.push($(currentEl)[0]);

		    if($(currentEl).is($(lastEl))) {
		    	foundIt = true;
		    } else {	    
		    	var children = $(currentEl).find("*").toArray();
			    $(children).each(function() {
			    	if($(this).is($(lastEl))) {
			    		foundIt = true;
			    	}
			    });
		    }

			currentEl = $(currentEl).next()
		}

		return elements;
	};

	var getSelectionBoundaryElement = function(fromStart) {
	    var range, container;
	    var sel = window.getSelection();

	    if (sel.getRangeAt) {
	        if (sel.rangeCount > 0) {
	            range = sel.getRangeAt(0);
	        }
	    } else {
	        range = document.createRange();
	        range.setStart(sel.anchorNode, sel.anchorOffset);
	        range.setEnd(sel.focusNode, sel.focusOffset);

	        if (range.collapsed !== sel.isCollapsed) {
	            range.setStart(sel.focusNode, sel.focusOffset);
	            range.setEnd(sel.anchorNode, sel.anchorOffset);
	        }
	   	}

	    if (range) {
	       container = range[fromStart ? "startContainer" : "endContainer"];
	       return container.nodeType === 3 ? container.parentNode : container;
	    }   
    };

	var scanSizes = function(root) {
		return [].map.call(root, function(node) {
			var bounds = node.getBoundingClientRect();
			var tag = node.outerHTML;
			if(tag.includes("<html") || tag.includes("<head") || tag.includes("<body") || tag.includes("<header") || tag.includes("<nav") || tag.includes("<aside") || tag.includes("<footer")) {
				return
			} else {
				return {tag: tag, area: bounds.width * bounds.height};
			}
		}).sort(function(x, y) {
			var a = x.area, b = y.area;
			return a > b ? -1 : a < b ? 1 : 0;
		});
	};
}

	return self;
}();

document.addEventListener('DOMContentLoaded', function() {
  WebClipper.init();
});
