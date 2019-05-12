var sprite;
var darrow;
var label;
var score; 
var sprite_seq;

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
         var size = cc.winSize;

        sprite = new cc.Sprite.create(res.Spinner);
        sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(sprite,0);

        darrow = new cc.Sprite.create(res.DArrow);
        darrow.setAnchorPoint(cc.p(0.5, 0.5));
        darrow.setPosition(cc.p(size.width/2, size.height-190));
        this.addChild(darrow);

        var menuItem = new cc.MenuItemFont("Spin", spin);
        label = new cc.LabelTTF("Score : ", "Arial", 30);
        label.setPosition(cc.p((size.width/2)+200, size.height - 100));
        this.addChild(label);

        
        var menu = new cc.Menu(menuItem);
        menu.setPosition(cc.p(size.width/2, size.height-100));
        this.addChild(menu);

        //this.scheduleUpdate();

        return true;
    },
    update: function(dt){

        if(sprite_seq.isDone() == true){
            label.setString("Score: "+ score);
        }

    }
});

var spin = function(){
    var max = 30;
    var min = 10;
    var rad = 36;
    var ran = Math.floor( Math.random() * (+max - +min) )+ +min;
    score = 11- (ran%10);

    if(score == 11) score = 1;

    cc.log("Score: " + (11- (ran%10)));

    sprite_action0 = cc.RotateBy.create(0.50, rad * 20);
    sprite_action1 = cc.RotateBy.create(0.75, rad * 20);
    sprite_action2 = cc.RotateBy.create(1.00, rad * 20);
    sprite_action3 = cc.RotateBy.create(1.25, rad * 20);
    sprite_action4 = cc.RotateBy.create(1.50, rad * 20);
    sprite_action5 = cc.RotateBy.create(1.75, rad * 20);
    sprite_action6 = cc.RotateBy.create(2.00, rad * 20);
    sprite_action7 = cc.RotateBy.create(2.25, rad * 20);
    sprite_action8 = cc.RotateBy.create(2.50, rad * 20);
    sprite_action81 = cc.RotateBy.create(2.60, rad * 20);
    sprite_action82 = cc.RotateBy.create(2.65, rad * 20);
    sprite_action83 = cc.RotateBy.create(2.70, rad * 20);
    sprite_action9 = cc.RotateBy.create(2.75, rad * ran);

    
    sprite_seq = cc.Sequence.create(sprite_action0, sprite_action1, sprite_action2, sprite_action3, sprite_action4, sprite_action5, sprite_action6, sprite_action7, sprite_action8,sprite_action81, sprite_action82, sprite_action83, sprite_action9);
    sprite.runAction(sprite_seq);
    //label.setString("Score: "+ score);
    
}

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

