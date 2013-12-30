(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function () {
    this.towers = [[3, 2, 1], [], []];
    this.fromTower = 'unset';
    this.addHandler();
    this.run();
  };

  Game.prototype.addHandler = function() {
    var that = this;
    $('span').on( 'click', function() {
      var tower = $(this).index();
      if ( that.fromTower != 'unset' ) {
        that.takeTurn (  that.fromTower , tower  );
        that.fromTower = 'unset';
      } else {
        that.fromTower = tower;
      }
    });
  }

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.run = function () {
    console.log( 'welcome to hanoi, click a starting tower then a placing tower.');
    this.printBoard();
  };

  Game.prototype.printBoard = function () {
    $('#board span div').addClass('hidden');
    $('#board span div').removeClass('big medium small');

    var game = this;
    var xInt;
    var yInt;
    var markPos;
    game.towers.forEach(function(tower, x){
      tower.forEach( function(ring, y){
        xInt = parseInt(x + 1);
        yInt = 4 - parseInt(y + 1);

        markPos = $('#board span:nth-child('+ xInt +') div:nth-child(' + yInt + ')');
        if ( ring ){
          switch(ring) {
          case 3:
            markPos.addClass('big');
            break;
          case 2:
            markPos.addClass('medium');
            break;
          case 1:
            markPos.addClass('small');
            break;
          }
          markPos.removeClass('hidden');
        }
      });
    });
  };

  Game.prototype.takeTurn = function (start,end){
    var game = this;



    if (game.move(start,end)) {
      game.printBoard();
    } else {
      console.log("Invalid move!")
    }

    if (game.isWon()) {
      $('span').off();
      console.log("You win!");
    }
  }
})(this);

// this.Hanoi.Game is a constructor function, so we instantiate a new object, then run it.
var that = this;
$(document).ready( function() {
  var Game = new that.Hanoi.Game();
});

