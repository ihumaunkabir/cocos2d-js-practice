var INITIALIZED = false;

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();


        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("Hungry Hall", "Arial", 45);
        helloLabel.setPosition(cc.p(size.width / 2, size.height / 2 + 200))
        this.addChild(helloLabel, 1);


        var sprite = new cc.Sprite.create(res.Track);
        sprite.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(sprite,0);

        var menuItem = new cc.MenuItemFont("Play", play);

        var menu = new cc.Menu(menuItem);
        menu.alignItemsVerticallyWithPadding(50);
        this.addChild(menu);

        return true;
    }
});



var play = function(){

    var scene = new HelloWorldScene2();
    cc.director.pushScene(scene); 

}


var HelloWorldScene = cc.Scene.extend({ 
    onEnter:function () {
        this._super();
        if(INITIALIZED == false){

            INITIALIZED = true;
            var layer = new HelloWorldLayer();
            this.addChild(layer);
        }
    }
});

