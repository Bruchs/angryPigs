/**
 * App Singleton MAIN
 */

class Editor {
	// App Singleton for restaurant form
	
	constructor() {
		
		this.saveLevel = $('#save-level-btn');
		this.loadLevelNav = $('#load-btn');
		this.loadLevel = $('#load-level-btn');
		this.cannonItem = $('.item-cannon');
		this.birdItem = $('.item-bird');
		this.boxItem = $('.item-box');
	}
	
	_saveLevel() {
		
		// preventDefault() is mandatory with the submit event.
		
		this.saveLevel.click(() => {
			
			var data = "JSONData=" + (JSON.stringify(nav.level));
			//console.log(data);	
			let levelName = "levelName=" + nav.level.levelName;
			console.log(levelName);
			
			let command = {'action':'saveLevel'};
			let request = $.param(command) + "&" + data + "&" + levelName;
			
			$.post('server/', request).then( ( dataString ) => {
				this._showResponse( dataString );
			});
		});
		
	}
	
	_getLevelList() {
		
		this.loadLevelNav.click(()=> {
			
			var levelList = [];
			let command = { 'action' : 'getLevels' };
			let request = $.param(command) + "&" + levelList;
			$.post('server/', request).then(( dataString ) => {
				let result = JSON.parse(dataString);				
				
				$('#load-select').html("");
				
				for(var i = 0; i < result["levelList"].length; i++)
				{
					$('#load-select').append($('<option>', {
					    value: result["levelList"][i],
					    text: result["levelList"][i]
					}));
				}
			});
		});
	}
	
	/*_getLevel( event ) {
		
		this.loadLevel.click(()=> {
			
			$('#editor-right').fadeOut( "fast" );
			$('#editor-left').fadeOut( "fast" );
			$('#save-btn').fadeOut( "fast" );
			
			let levelName = $('#load-select').val();
			let command = { 'action' : 'loadlevel', 'levelName' : levelName };
			let request = $.param( command );
			// Post message to the server AND THEN.
			$.post('server/', request).then(( responseStr ) => {
				var result = JSON.parse(responseStr);
				result = JSON.parse(result);
				
				$('#editor-game').html("");
				$('#editor-game').css('width', "80%");
				$('#editor-game').css('margin-left', "8%");
				
				nav.level.levelName = result.levelName;
				nav.level.levelAuthor = result.levelAuthor;
				nav.level.levelProjectiles = result.levelProjectiles;
				
				$('#editor-game').css("backgroundImage", result.levelBackground);
					
				var actualCannon = this.cannonItem.appendTo(('#editor-game'));
		        
		        actualCannon.attr("id", "game-cannon");
		        actualCannon.css('position', 'relative');
		        actualCannon.css('left', result.levelCannon.xPos);
				actualCannon.css('top', result.levelCannon.yPos);
				
		        for (var i = 0; i <= result.levelBirds.length - 1; i++) {

		        
		          let birdObject = {
		            birdId : i,
		            birdWidth : result.levelBirds[i].birdWidth,
		            birdHeight : result.levelBirds[i].birdHeight,
		            birdXPos : result.levelBirds[i].birdXPos,
		            birdYPos : result.levelBirds[i].birdYPos
		          }
		          
		          var bird = this.birdItem.clone().appendTo( $('#editor-game') );
		          bird.removeClass("item");
		          bird.attr('id', "bird" + birdObject.birdId);
		          bird.addClass("bird-anim");
		          bird.css('height', birdObject.birdHeight);
		          bird.css('width', birdObject.birdWidth)
		          bird.css('position', 'absolute');
		          bird.css('left', birdObject.birdXPos + 55);
		          bird.css('top', birdObject.birdYPos);   		          
		        }
		        
		        // Setup items
		        for (var i = 0; i <= result.levelItems.length - 1; i++) {
		        	
		        	let itemObject = {
	        			itemId : i,
	        	        itemWidth : result.levelItems[i].itemWidth,
	        	        itemHeight : result.levelItems[i].itemHeight,
	        	        itemXPos : result.levelItems[i].itemXPos,
	        	        itemYPos : result.levelItems[i].itemYPos,
	        	        itemBack : result.levelItems[i].itemBack,
	        	        itemMass : result.levelItems[i].itemDensity,
	        	        itemFriction : result.levelItems[i].itemFriction,
	        	        itemBounce : result.levelItems[i].itemBounce,
		        	}
		        	
		        	var item = this.boxItem.clone().appendTo($('#editor-game'));
		        	item.attr('id', "item" + itemObject.itemId);
		        	item.addClass("draggable-item draggable");
		        	item.css('height', itemObject.itemHeight);
		        	item.css('width', itemObject.itemWidth);
		        	item.css('left', itemObject.itemXPos);
		        	item.css('top', itemObject.itemYPos);
		        	item.css('background-image', itemObject.itemBack);
		        	item.data("mass", itemObject.itemMass);
		        	item.data("friction", itemObject.itemFriction);
		        	item.data("bounce", itemObject.itemBounce);
		        }
			});
		});
	} */
}	