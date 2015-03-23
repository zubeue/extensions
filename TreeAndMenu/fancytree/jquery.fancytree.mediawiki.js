/*!
 * jquery.fancytree.mediawiki.js
 *
 * Add mediawiki-specific ajax loading and some mediawiki helper functions
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2015, Aran Dunkley (http://www.organicdesign.co.nz/aran)
 *
 * Released under the GNU General Public Licence 2.0 or later
 *
 */

;(function($, window, document, mw, undefined) {

"use strict";


/**
 * Private functions and variables
 */
var _assert = $.ui.fancytree.assert;


/**
 * Open the tree to the node containing the passed title, or current page if none supplied
 */
$.ui.fancytree._FancytreeClass.prototype.makeTitleVisible = function(title) {
	var local = this.ext.mediawiki;
	if(typeof(title) === 'undefined') title = mw.config.get('wgTitle');
	this.visit(function(node) {
		if(node.title == title) {
			node.makeVisible({ noAnimation: true, noEvents: true, scrollIntoView: false });
			node.setActive({ noEvents: true });
			return false;
		}
	});
};

$.ui.fancytree.registerExtension({

	name: "mediawiki",
	version: "0.0.1",

	// Default options for this extension.
	options: {
	},

	// When a tree is initialised, do some modifications appropriate to mediawiki trees
	treeInit: function(ctx) {
		var tree = ctx.tree,
			opts = ctx.options,
			local = this._local,
			instOpts = this.options.mediawiki;

		// Make nodes with hrefs back into normal links
		opts.renderTitle = function(title,foo) {
			var s = 'title:\n';
			for(var i in title) s+=i+':'+title[i]+'\n';
			s += 'foo:\n';
			for(var i in foo) s+=i+':'+foo[i]+'\n';
			console.log('info: '+s);
		};

		// Init the tree
		return this._superApply(arguments);
	},

});
}(jQuery, window, document, mw));