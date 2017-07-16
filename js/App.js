'use strict';

if(__private__ === undefined)
	var __private__ =  new WeakMap();

class App {

	constructor() {

		// Set up private member variables.
		let m = {
			done : false
		};
		__private__.set( this, m );

		//this.myDraggableHandler = new DraggableHandler( $('#editor-game') );
		
		
		this.myEditor = new Editor();
		nav.create();
		nav.itemPersonalization(event);
		nav.itemData();
		nav.menuNavigation();
		
		//this.myEditor._getLevel();
		this.myEditor._saveLevel();
		this.myEditor._getLevelList();

		// Set up user event handlers.
		$('.submission-form').on('submit', ( event ) => {

			event.preventDefault();
			//this._getLevel( event );
		});
		// Initialize the App.
		this.init();
	}

	init() {

		let m = __private__.get( this );

	}

	run() {};
}

// Main -- START HERE!
$(document).ready( () => {

	let app = new App();
	app.run();
});
