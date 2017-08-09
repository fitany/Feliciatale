// Game scene
// -------------

// Runs the core gameplay loop
Crafty.scene('Game', function() {
  var round = 1;
  var hp = 10;
  var numBushes = 0;
  document.getElementById("hp").innerHTML = "HP: "+hp+"/10";
  document.getElementById("round").innerHTML = "Round: "+round+"/10";

  // Player character, placed at 5, 5 on our grid
  this.player = Crafty.e('PlayerCharacter').at(11, 11)
    .checkHits('Virus','Solid')
    .bind('HitOn',function(hitData){
      if(hitData.length != 3){
        hp--;
        if(hp < 1){
          Crafty.audio.stop("bonestrousle");
          Crafty.audio.play("heartbreak");
          this.destroy();
          Crafty.scene("GameOver");
        }
        document.getElementById("hp").innerHTML = "HP: "+hp+"/10";
        Crafty.audio.play("hit");
      } 
    })
    .bind('EnterFrame', function(){
        if(numBushes == 0){
          round++;
          if(round == 11){ //orig 11
            Crafty.audio.stop("bonestrousle");
            this.destroy();
            Crafty.scene("Victory");
          } else {
            spawn(this);
            document.getElementById("round").innerHTML = "Round: "+round+"/10";
          }
        }         
     });

  spawn(this.player);

  // Play a ringing sound to indicate the start of the journey
  Crafty.audio.play('bonestrousle');

  function spawn(player){
    // Place a tree at every edge square on our grid of 16x16 tiles
    for (var x = 0; x < Game.map_grid.width; x = x + 2) {
      for (var y = 0; y < Game.map_grid.height; y = y + 2) {
        var at_edge = x == 0 || x == Game.map_grid.width - 1 ||
                      y == 0 || y == Game.map_grid.height - 1;
        if (!at_edge && Math.random() < .12) {
          numBushes++;
          Crafty.e('Bush').at(x, Math.random() * -50)
            .bind('EnterFrame',function(){
              if(this.y > Game.height()) {
                this.destroy();
                numBushes--;
              }
            });
        }
      }
    }
      // Place a tree at every edge square on our grid of 16x16 tiles
    for (var x = 0; x < Game.map_grid.width; x++) {
      for (var y = 0; y < Game.map_grid.height; y++) {
        var at_edge = x == 0 || x == Game.map_grid.width - 1 ||
                      y == 0 || y == Game.map_grid.height - 1;
        if (at_edge) {
          // Place a tree entity at the current tile
          Crafty.e('Tree').at(x, y);
        }
      }
    }
  };

}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('VillageVisited', this.show_victory);
});

// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('GameOver', function() {
  Crafty.audio.play("determination");
  // Display some text in celebration of the victory
  Crafty.e('2D, DOM, Image')
    .image('assets/gameover.png')
    .attr({ x: 0, y: Game.height()/8 - 24, w: Game.width() });
  var message = Math.floor(Math.random() * (3 - 0));
  if(message == 0) {
    Crafty.e('2D, DOM, Text')
    .text('Stay determined, Felicia! Press any key to play again.')
    .attr({ x: 0, y: 3*Game.height()/4 - 24, w: Game.width() })
    .textFont({ size: '24px', weight: 'bold' });
  } else if (message == 1) {
    Crafty.e('2D, DOM, Text')
    .text('Our fate rests upon you, Felicia... Press any key to play again.')
    .attr({ x: 0, y: 3*Game.height()/4 - 24, w: Game.width() })
    .textFont({ size: '24px', weight: 'bold' });
  } else if (message == 2) {
    Crafty.e('2D, DOM, Text')
    .text('You cannot give up just yet, Felicia! Press any key to play again.')
    .attr({ x: 0, y: 3*Game.height()/4 - 24, w: Game.width() })
    .textFont({ size: '24px', weight: 'bold' });
  }

  // After a short delay, watch for the player to press a key, then restart
  // the game when a key is pressed
  var delay = true;
  setTimeout(function() { delay = false; }, 2000);
  this.restart_game = Crafty.bind('KeyDown', function() {
    if (!delay) {
      Crafty.audio.stop('determination');
      Crafty.scene('Game');
    }
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('KeyDown', this.restart_game);
});

// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('Victory', function() {
  Crafty.audio.play("temshop");
  // Display some text in celebration of the victory
  var message = Math.floor(Math.random() * (5 - 0));
  if(message == 0) {
    Crafty.e('2D, DOM, Text')
      .text('Congrats! You did it! Press any key to play again.')
      .attr({ x: 0, y: 3*Game.height()/4 - 24, w: Game.width() })
      .textFont({ size: '24px', weight: 'bold' });
  } else if (message == 1) {
    Crafty.e('2D, DOM, Text')
      .text('Happy Birthday, Felicia! Press any key to play again.')
      .attr({ x: 0, y: 3*Game.height()/4 - 24, w: Game.width() })
      .textFont({ size: '24px', weight: 'bold' });
  } else if (message == 2) {
    Crafty.e('2D, DOM, Text')
      .text('Wahoo, you win!! Press any key to play again.')
      .attr({ x: 0, y: 3*Game.height()/4 - 24, w: Game.width() })
      .textFont({ size: '24px', weight: 'bold' });
  } else if (message == 3) {
    Crafty.e('2D, DOM, Text')
      .text('HAPPY BDAY TO YOU~ Press any key to play again.')
      .attr({ x: 0, y: 3*Game.height()/4 - 24, w: Game.width() })
      .textFont({ size: '24px', weight: 'bold' });
  } else if (message == 4) {
    Crafty.e('2D, DOM, Text')
      .text('Happeh Birthduhh! Press any key to play again.')
      .attr({ x: 0, y: 3*Game.height()/4 - 24, w: Game.width() })     
      .textFont({ size: '24px', weight: 'bold' });
  }

  Crafty.e('2D, DOM, Image')
    .image('assets/temmie.gif')
    .attr({ x: Game.width()/4, y: Game.height()/8 - 24, w: Game.width() });

  // Give'em a round of applause!
  Crafty.audio.play('applause');

  // After a short delay, watch for the player to press a key, then restart
  // the game when a key is pressed
  var delay = true;
  setTimeout(function() { delay = false; }, 2000);
  this.restart_game = Crafty.bind('KeyDown', function() {
    if (!delay) {
      Crafty.audio.stop("temshop");
      Crafty.scene('Game');
    }
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('KeyDown', this.restart_game);
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  
  Crafty.e('2D, DOM, Text')
    .text('Loading; please wait...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css($text_css);

  // Load our sprite map image
  var assetsObj = {
    "audio": {
      knock:     ['assets/door_knock_3x.mp3',
                  'assets/door_knock_3x.ogg',
                  'assets/door_knock_3x.aac'],
      applause:  ['assets/board_room_applause.mp3',
                  'assets/board_room_applause.ogg',
                  'assets/board_room_applause.aac'],
      bonestrousle: ['assets/bonestrousle.mp3'],
      temshop:   ['assets/temshop.mp3'],
      determination:  ['assets/determination.mp3'],
      heartbreak: ['assets/heartbreak.wav'],
      hit:       ['assets/hit.wav']
    },
    "images": ["assets/temmie.gif","assets/gameover.png"],
    "sprites": {
      "assets/heart.png": {
        "tile": 35,
        "tileh": 35,
        "map": { "spr_player": [0,0] }
      },
      "assets/virus.gif": {
        "tile": 50,
        "tileh": 50,
        "map": { "spr_virus" : [0,0] }
      }
    }
  }
  
  Crafty.load(assetsObj,
    function(){
      Crafty.scene('Game');
    },
    function(e) { //progress
    },

    function(e) { //uh oh, error loading
    }
  );
});