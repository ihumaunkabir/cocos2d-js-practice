var INITIALIZED_2 = false;

var bar, man, main_bg, main_bg1;
var hoz1, hoz2, size;
var bgMove, bgMove1;
var barMove, bar_h;
var bar1, bar2, man_w, man_h;
var score, slabel;

var HelloWorldLayer2 = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();


        size = cc.winSize;
        bgMove = size.height/2;
        bgMove1 = size.height;
        barMove = size.height-100;
        man_w = 20;
        man_h =  size.height/2 - 220;
        score = 0;

        slabel = new cc.LabelTTF("Score: 0", "Arial", 25); 
        slabel.setPosition(cc.p(size.width/2, size.height - 50));
        this.addChild(slabel, 5);

        man = new cc.Sprite.create(res.Man);
        man.setPosition(cc.p(100, size.height/2 - 150));
        this.addChild(man, 1);

        main_bg = new cc.Sprite.create(res.Main_bg);
        main_bg.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(main_bg, 0);

        main_bg1 = new cc.Sprite.create(res.Main_bg1);
        main_bg1.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(main_bg1, 0);

        bar = new cc.Sprite.create(res.Bar);
        bar.setPosition(cc.p(0, size.height/2 - 200));
        //this.addChild(bar,1);

        bar1 = new cc.Sprite.create(res.Bar1);
        bar1.setPosition(cc.p(size.width-50, size.height- 298));
        this.addChild(bar1,1);

        bar2 = new cc.Sprite.create(res.Bar2);
        bar2.setPosition(cc.p(cc.p(20, size.height/2 - 230)));
        this.addChild(bar2,1);

        this.scheduleUpdate();


        if(cc.sys.capabilities.hasOwnProperty("mouse")){
            
            cc.eventManager.addListener({

                event: cc.EventListener.MOUSE,

                onMouseDown: function(event){

                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT){

                        score +=1;
                                man_w = man.getPosition().x + 700;
                                man_h = man.getPosition().y + 250;
                        var man_actionj = cc.JumpTo.create(1.5, cc.p(man_w, man_h), 200, 1);
                        man.runAction(man_actionj);

                        if(man_w == man.getPosition().x){
                            man_w = man.getPosition().y + 250;
                            man_h = man.getPosition().x + 700;
                        }

                        if(man_w == man.getPosition().y){
                            man_w = man.getPosition().x + 700;
                            man_h = man.getPosition().y + 250; 
                        }


                    }
                }


            }, this);
        }


        return true;
    },

    update: function(){

        var rect1 = man.getBoundingBox();
        var rect2 = bar.getBoundingBox();
        var rect3 = bar1.getBoundingBox();
        var rect4 = bar2.getBoundingBox();

        if(cc.rectIntersectsRect(rect1, rect4)){

                            barMove -= 5;
        }

        if(cc.rectIntersectsRect(rect1, rect3)){

                        slabel.setString("Score: "+score);

                            bar2.setPosition(0,barMove);
                            if(barMove <= 0) barMove = size.height - 100;

                            man.setPosition(cc.p(size.width - 100, size.height/2 - 180));
                            bar1.setPosition(cc.p(size.width-50, size.height/2 - 250));


        }
                           

                            bgMove1 -= 5;
                            bgMove -= 5;

                            main_bg.setPosition(size.width/2, bgMove);
                            if(bgMove <= 0) bgMove = size.height;

                            main_bg1.setPosition(size.width/2, bgMove1);
                            if(bgMove1 <=0) bgMove1 = size.height;


    }

});

var HelloWorldScene2 = cc.Scene.extend({ 
    onEnter:function () {
        this._super();
        if(INITIALIZED_2 == false){

            INITIALIZED_2 = true;
            var layer = new HelloWorldLayer2();
            this.addChild(layer);
        }
    }
});
