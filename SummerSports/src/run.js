
var INITIALIZED_2 = false;
var man, sprite, bar, bar2;                     //sprites in the scene 
var track, track3, track4, track5, track0;      //running track sprite
var size, barMove, barMove1;                    //bar heights which is variable.
var hoz, hoz1, hoz0, hoz3, hoz4, hoz5;          //horizontal values for the tracks.
var time = 0;                                   //time is for calculating distance
var end = false;                                //ending flag
var scoreLabel;                                 //scoreLabel
var life, lsum;                                 //life points variables
var speed = 5;                                  //decreasing speed
var man_menu, man_menu1;                        //game end menu


var HelloWorldLayer2 = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();

        //initialization of necessary variables
        size = cc.winSize;
        hoz = size.width/2;
        hoz1 = size.width;

        barMove = size.width - 100;
        barMove1 = size.width + 350;
        lsum = 100;

        //distance label
        scoreLabel = new cc.LabelTTF("Distance: "+0+"m", "Arial", 30);
        scoreLabel.setPosition(cc.p(size.width / 2 - 350, size.height / 2 + 250))
        this.addChild(scoreLabel, 1);

        //life point label
        life = new cc.LabelTTF("Life Points: " + lsum, "Arial", 30);
        life.setPosition(cc.p(size.width / 2 - 100, size.height / 2 + 250))
        this.addChild(life, 1);

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
        man.setPosition(cc.p(size.width/2 -300, size.height - 400));
        this.addChild(man, 1);

        //adding the obstacle
        bar = new cc.Sprite.create(res.Bar);
        bar.setPosition(cc.p(size.width - 100, size.height - 444));
        this.addChild(bar, 1);

        bar2 = new cc.Sprite.create(res.Bar2);
        bar2.setPosition(cc.p(size.width + 450, size.height - 444));
        this.addChild(bar2, 1);

        //game end menu
        var man_menuItem = new cc.MenuItemFont("<< Game Over >>");
        var man_menuItem1 = new cc.MenuItemFont("<<Bingo! You're a finisher.>>");

        man_menu = new cc.Menu(man_menuItem);
        man_menu1 = new cc.Menu(man_menuItem1);
        man_menu.alignItemsVertically();
        man_menu.setPosition(cc.p(size.width/2, size.height/2));
        man_menu1.alignItemsVertically();
        man_menu1.setPosition(cc.p(size.width/2, size.height/2));
        man_menuItem.setEnabled(false);
        man_menu1.setEnabled(false);
       // this.addChild(man_menu);
       // this.addChild(man_menu1);


        this.scheduleUpdate();


        //adding mouse event for left click 

        if(cc.sys.capabilities.hasOwnProperty("mouse")){
            
            cc.eventManager.addListener({

                event: cc.EventListener.MOUSE,

                onMouseDown: function(event){
                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
                        
                    //jump against mouse click
                    var man_actionj = cc.JumpTo.create(1.5, cc.p(size.width/2 -300, size.height - 400), (size.height - 430), 1);
                    man.runAction(man_actionj);



                    }
                }


            }, this);
        }



        return true;
    },

    update: function(dt){

            var ranMove = 444;


            time += dt;
            //cc.log("TIme: "+ time);
            scoreLabel.setString("Distance: " + Number(time).toFixed(2) +"m");




//comment start
            hoz -= speed;
            hoz1 -= speed;
 
            barMove -= speed;
            barMove1 -=speed;

            //for floating the background track 
            sprite.setPosition(hoz,size.height/2);
            track.setPosition(hoz1,size.height/2);

            bar.setPosition(barMove, size.height - ranMove);
            bar2.setPosition(barMove1, size.height - ranMove);

            if(hoz <= 0) hoz = size.width;
            if(hoz1 <= 0 ) hoz1 = size.width;


            if(barMove == -size.width + 300 ) barMove = size.width - 100;
            if(barMove1 == -size.width * 1.25) barMove1 = size.width + 350;



            //comment end

            //collision detection       
            // called when the user moves their finger
                    var rect1 = man.getBoundingBox();
                    var rect2 = bar.getBoundingBox();
                    var rect3 = bar2.getBoundingBox();

                    if ( cc.rectIntersectsRect( rect1, rect2 ) ){
                       // cc.log( "Collided" );
                        lsum -= 1;
                    }
                    else if(cc.rectIntersectsRect( rect1, rect3 )){
                        cc.log( "Collided" );
                        lsum -= 1;
                    }
                    else{
                        //cc.log( "Not collided" );
                    }     
            life.setString("Life Points: " + lsum);
            if(lsum <= 0) {
               // man_menu.setEnabled(true);
                //exit(0);

                this.removeAllChildren(true);
                this.addChild(man_menu);
            

            }

            if(time > 50.00){
                this.removeAllChildren(true);
                this.addChild(man_menu1);
            }
/*            if(time >= 10.00){
              exit(0);
            }*/
            //collision ended here


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

