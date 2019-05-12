
var INITIALIZED_2 = false;
var size, hoz, hoz1, scoreLabel, life, sprite, track, man, bar, bar2,bar3, bar1, bar00, bar11;
var time, lsum, speed, hscore, hs;
var man_h, man_w;
var barMove, barMove1, barMove2, barMove3, barMove4, barMove5, man_menuItem;
hscore = 0;
var upBtn, downBtn, btnMenu;

var HelloWorldLayer2 = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();

        //initialization of necessary variables
        size = cc.winSize;
        hoz = size.width/2;
        hoz1 = size.width;
        man_h = 160;
       

        barMove = size.width;
        barMove1 = size.width + 300;
        barMove2 = size.width + 100;
        barMove3 = size.width + 500;
        barMove4 = size.width * 1.5;
        barMove5 = size.width * 2;

        time = 0;
        lsum =  100;
        speed = 2;


        //distance label
        scoreLabel = new cc.LabelTTF("Score: "+0+"m", "Arial", 30);
        scoreLabel.setPosition(cc.p(size.width / 2 - 350, size.height / 2 + 250))
        this.addChild(scoreLabel, 1);

        //life point label
        life = new cc.LabelTTF("Energy : " + lsum, "Arial", 30);
        life.setPosition(cc.p(size.width / 2 - 100, size.height / 2 + 250))
        this.addChild(life, 1);

        hs = new cc.LabelTTF("HighScore: " + hscore, "Arial", 30);
        hs.setPosition(cc.p(size.width / 2 + 50, size.height / 2 + 250))
       // this.addChild(hs, 1);

        //first track as background
        sprite = new cc.Sprite.create(res.Track);
        sprite.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(sprite,0);

        //adding more tracks
        track = new cc.Sprite.create(res.Track0);
        track.setPosition(cc.p(size.width, size.height/2));
        this.addChild(track,0);

        //adding the running character
        man = new cc.Sprite.create(res.Man);
        man.setPosition(cc.p(size.width/2 - 200, man_h));   //one  = 60, two = 130, three = 230
        this.addChild(man, 1);

        //adding the obstacle
        bar = new cc.Sprite.create(res.Bar1);
        bar.setPosition(cc.p(size.width, 60));
        this.addChild(bar, 1);

        bar1 = new cc.Sprite.create(res.Bar0);
        bar1.setPosition(cc.p(size.width + 500, 140));
        this.addChild(bar1, 1);

        bar2 = new cc.Sprite.create(res.Obs);
        bar2.setPosition(cc.p(size.width + 300, size.height/2 - 400));
        this.addChild(bar2, 2);

        bar3 = new cc.Sprite.create(res.Bar2);
        bar3.setPosition(cc.p(size.width + 300, size.height/2 - 180));
        this.addChild(bar3, 2);

        bar00 = new cc.Sprite.create(res.Bar00);
        bar00.setPosition(cc.p(barMove5, 235));
        this.addChild(bar00, 2);

        bar11 = new cc.Sprite.create(res.Bar11);
        bar11.setPosition(cc.p(barMove4, 240));
        this.addChild(bar11, 2);

        //game end menu
        man_menuItem = new cc.MenuItemImage(res.GameOver, res.GameOver, res.GameOver);
        
        man_menuItem.setVisible(false);
        man_menu = new cc.Menu(man_menuItem);

        man_menu.alignItemsVertically();
        man_menu.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(man_menu, 1);

        upBtn = new cc.MenuItemImage(res.Up_png, res.Up_png, upward);
        downBtn = new cc.MenuItemImage(res.Down_png, res.Down_png, downward);
        btnMenu = new cc.Menu(upBtn, downBtn);
        btnMenu.setPosition(cc.p(size.width-100, size.height-80));
        btnMenu.alignItemsVertically();
        this.addChild(btnMenu, 1);



        this.scheduleUpdate();


        //adding mouse event for left click
        var i = 0;

        if(cc.sys.capabilities.hasOwnProperty("mouse")){
            
            cc.eventManager.addListener({

                event: cc.EventListener.MOUSE,
/*
                onMouseDown: function(event){

                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
                            
                             if(man_h == 160){
                                    man_h = 70;

                            }
                            else if(man_h == 70){
                                man_h = 160;
                            }


                                var act = cc.JumpTo.create(0.5, cc.p(size.width/2 - 200, man_h), 100, 1);
                                man.runAction(act);

                    }
                },*/
                onMouseUp: function(event){
                    if(event.getButton() == cc.EventMouse.BUTTON_RIGHT){
                        cc.log("Right");

                                var act;
                                if(man_h == 160) act = cc.JumpTo.create(1, cc.p(size.width/2 - 200, man_h), size.height/2-150, 1);
                                else act = cc.JumpTo.create(1, cc.p(size.width/2 - 200, man_h), size.height/2-180, 1);
                                man.runAction(act);
                    }
                }


            }, this);
        }



        return true;
    },

    update: function(dt){

            var ranMove = 444;

               if(lsum <= 0) {
                
               // this.removeAllChildren(true);
               // this.addChild(man_menu);
               man_menuItem.setVisible(true);

            }
            else{

                    time += dt;
                    //cc.log("TIme: "+ time);
                    scoreLabel.setString("Score : " + Number(time).toFixed(2) +"m");


                    if(man_h == 130 && i%2 == 0) man_h = 230;


              //comment start
                    hoz -= speed;
                    hoz1 -= speed;
         
                    barMove -= 4;
                    barMove1 -= 7;
                    barMove2 -= 5.5;
                    barMove3 -= 3;
                    barMove4 -= 4.85;
                    barMove5 -= 4.5;


                    //for floating the background track 
                    sprite.setPosition(hoz,size.height/2);
                    track.setPosition(hoz1,size.height/2);

                    bar.setPosition(barMove, 60);
                    bar2.setPosition(barMove1, 50);
                    bar3.setPosition(barMove2, size.height/2 - 180);
                    bar1.setPosition(barMove3, 140);
                    bar00.setPosition(barMove5, 220);
                    bar11.setPosition(cc.p(barMove4, 240));

                    if(hoz <= 0) hoz = size.width;
                    if(hoz1 <= 0 ) hoz1 = size.width;

                           //collision detection       
                            var rect1 = man.getBoundingBox();

                            var rect2 = bar.getBoundingBox();
                            var rect3 = bar2.getBoundingBox();
                            var rect4 = bar3.getBoundingBox();
                            var rect5 = bar1.getBoundingBox();
                            var rect6 = bar00.getBoundingBox();
                            var rect7 = bar11.getBoundingBox();

                            if ( cc.rectIntersectsRect( rect1, rect2 ) || cc.rectIntersectsRect(rect1, rect5) || cc.rectIntersectsRect(rect1, rect6) ){
                               // cc.log( "Collided" );
                               //if(cc.rectIntersectsRect(rect1, rect5)) barMove3 = size.width + 500;
                               //else barMove = size.width;

                                lsum += 1;
                            }
                                else if(cc.rectIntersectsRect(rect1, rect4) ){

                                    lsum -= 1.25;
                                }
                                    else if(cc.rectIntersectsRect( rect1, rect3 )){

                                        lsum -= 1.5;
                                    }
                                      else if(cc.rectIntersectsRect( rect1, rect7 )){

                                        lsum -= 1.3;
                                    }
            
                             life.setString("Energy : " + Number(lsum).toFixed(2));


                    if(barMove <= -45 ) barMove = size.width;
                    if(barMove1 <= -50) barMove1 = size.width + 250;
                    if(barMove2 <= -10) barMove2 = size.width + 550;
                    if(barMove3 <= -25) barMove3 = size.width + 500;
                    if(barMove4 <= -50) barMove4 = size.width * 1.5;
                    if(barMove5 <= -20) barMove5 = size.width * 2;



            }



    }
});

var upward = function(){
    cc.log("Up pressed");

        if(man_h == 160){
                 man_h = 250;
             }
            else if(man_h == 70){
                         man_h = 160;
                     }

        var act = cc.JumpTo.create(0.5, cc.p(size.width/2 - 200, man_h), 100, 1);
        man.runAction(act);

}

var downward = function(){
    cc.log("down pressed");

        if(man_h == 250){
                 man_h = 160;
             }
            else if(man_h == 160){
                         man_h = 70;
                     }

        var act = cc.JumpTo.create(0.5, cc.p(size.width/2 - 200, man_h), 100, 1);
        man.runAction(act);
}

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




