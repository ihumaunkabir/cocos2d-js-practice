var INITIALIZED_3 = false;

var HelloWorldLayer3 = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();


        var size = cc.winSize;

        var sprite = new cc.Sprite.create(res.Help);
        sprite.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(sprite, 0);
  
        var helloLabel = new cc.LabelTTF("Summer Sports", "Arial", 45);
        helloLabel.setPosition(cc.p(size.width / 2, size.height / 2 + 200))
        this.addChild(helloLabel, 1);

        var menuItem0 = new cc.MenuItemFont("- Instructions -");
        var menuItem = new cc.MenuItemFont("Click or << Tap >>  to save yourself from the obstacle. ");
        var menuItem1 = new cc.MenuItemFont("If you hit the obstacle then your energy decreases.Reach fast! Go!");
        var menuItem2 = new cc.MenuItemFont("-----------------------------------------------------------");
        var menuItem3 = new cc.MenuItemFont("<< Back to Home >>", back);

        var menu = new cc.Menu(menuItem0, menuItem, menuItem1, menuItem2, menuItem3);
        menu.alignItemsVertically();
        this.addChild(menu);

        
        return true;
    }
});

var back = function(){

    INITIALIZED_3 = false;
    cc.director.popScene();
}

var HelloWorldScene3 = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if(INITIALIZED_3 == false){

            INITIALIZED_3 = true;
            var layer = new HelloWorldLayer3();

            this.addChild(layer);
    }
    }
});

