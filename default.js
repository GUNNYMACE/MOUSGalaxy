//MOUS Galaxy Notes
//Current Known Bugs:
//GroundSmash into lava does not trigger game over.


//Global Var
var MOUS;
var BOX;
var timerTXT;
//Platforms+Detection
var platform;
var fallplatform;
var platformDetectL;
var platformDetectR;
//Other Global
var debug = false;
var currentlevel = 1;
var currentlyJumping = false;
var currentlyPhasing = false;
var currentFallingSpeed = 1;
var currentJumpPower = 0;
var currentJumps = 0;
var currentSecond = 0;
var currentBoxCount = 0;

//Changeable Var(Mess with any below)
var MOUSsize = 25;
var movementSpeed = getWidth()/25;
var actionSecond = 10;
var timerSecond = 1000;
//  Box Var
var boxSize = 25;
var boxColor = "Blue";
//  Jump Var
var startJumpPower = 10;
var jumpLoopSpeed = 10;
var minJumpPower = .5;
var jumpPowerInc = .5
var maxJump = 2;
//  Fall Var
var fallingSpeedInc = .5;
var maxFallingSpeed = 10;
// Preset Time
var lvlI_Timer = 60;
var lvlII_Timer = 30;
var lvlIII_Timer = 30;





//Instruction Function
function start() {
    //Difficulty Selector(Not Finished)
    var difficulty = readLine("What difficulty? (Type Easy or Hard)");
    if (difficulty == "Easy" || difficulty == "easy") {
        maxJump = 2;
    } else if (difficulty == "Hard" || difficulty == "hard") {
        println("Coming Soon, (Never)");
    } else if (difficulty == "Debug" || difficulty == "debug") {
        println("Debug Enabled");
        debug = true;
    } else {
        txtCreate("Not A Option, Try Again", 70, 30, "30pt Arial");
        removeAll();
        start();
    }
    //How to play + Some Lore.
    txtCreate("MOUS Galaxy", 70, 30, "30pt Arial");
    txtCreate("How to play:", 0, 60, "20pt Arial");
    txtCreate("You have been selected to complete a great mission for your kind. ", 0, 85, "10pt Arial");
    txtCreate("You are MOUS, and you are a apart of the civilization known as", 0, 100, "10pt Arial");
    txtCreate("MOUS. Your mission is to colonize the galaxy. To complete the", 0, 115, "10pt Arial");
    txtCreate("mission you must collect all of the BOX's per level. Be careful, if", 0, 130,"10pt Arial");
    txtCreate("you get too far from the mission area, the Space will kill you.", 0, 145,"10pt Arial");
    txtCreate("Our trust is in you MOUS. Complete the Mission, and try not to die.", 0, 160,"10pt Arial");
    
    txtCreate("Controls:", 0, 200, "20pt Arial");
    txtCreate("Left OR A to move Left.", 0, 215, "10pt Arial");
    txtCreate("Right OR D to move Right.", 0, 230, "10pt Arial");
    txtCreate("(TIP:Use the same Left/A or Right/D to move faster in that direction.)", 0, 245, "10pt Arial");
    txtCreate("Up or W to jump. (You have a double jump!)", 0, 260, "10pt Arial");
    txtCreate("Down or S to fall though platforms, or to just fall faster.", 0, 275, "10pt Arial");
    
    txtCreate("Press Space to Countinue", 40, getHeight()-20, "20pt Arial");
    keyDownMethod(keyPressMainMenu);
}
//Press Function for ^^^
function keyPressMainMenu(e) {
    if (e.keyCode == Keyboard.SPACE) {
        removeAll();
        gameStart();
    }
}





//--\\--MAIN GAME - MOUS GALAXY--//--\\

//--Main Functions (Starting and Inf)--//
function gameStart() {
    currentBoxCount = 0;
    //LevelCreation
    if (currentlevel == 1) {
        levelCreate();
        currentSecond = lvlI_Timer;
        timerTXTCreate(currentSecond);
    } else if (currentlevel == 2) {
        levelCreate2();
        currentSecond = lvlII_Timer;
        timerTXTCreate(currentSecond);
    } else if (currentlevel == 3) {
        levelCreate3();
        currentSecond = lvlIII_Timer;
        timerTXTCreate(currentSecond);
    } else if (currentlevel == 4) {
        winnerWinner();
    }
    //To prevent other assest from loading, this if statement checks if its on the winner level.
    if (currentlevel < 4) {
        //OtherCreation
        txtCreate("Time Left:",0,getHeight()-16,"20pt Arial");
        //PlayerEvents
        keyDownMethod(keyPress);
        keyUpMethod(keyUnPress);
        //InfLoopStart
        setTimer(tick, actionSecond);
        setTimer(timerTick, timerSecond);
    }
}
//tick in this case means inf loop. This is good for the falling function to check every frame to see if MOUS hits a platform.
function tick() {
    platformDetectL = getElementAt(MOUS.getX(), MOUS.getY()+MOUSsize+.5);
    platformDetectR = getElementAt(MOUS.getX()+MOUSsize-1, MOUS.getY()+MOUSsize+.5);
    
    //Platform Detection
    if (currentlyJumping == false) {
        if (platformDetectL != null && currentlyPhasing == false) {
            if (platformDetectL.getBorderColor() == Color.black) {
                currentFallingSpeed = 1;
                currentJumps = 0;
                //PlatformFix
                if ((MOUS.getY()+MOUSsize) > platformDetectL.getY()) {
                    var movementFixCount = (MOUS.getY()+MOUSsize) - platformDetectL.getY();
                    MOUS.move(0,-movementFixCount);
                }
            } else if (platformDetectL.getBorderColor() == Color.blue) {
                //Box Delete
                remove(platformDetectL);
                currentBoxCount--;
                if (currentBoxCount <= 0) {
                    if (currentlevel == 4) {
                        println("Winning Screen Soon...");
                    } else {
                        stopTimer(tick);
                        stopTimer(timerTick);
                        currentlevel++;
                        removeAll();
                        gameStart();
                    }
                }
            } else if (platformDetectL.getBorderColor() == Color.red) {
                gameOver(1);
            }
        } else if (platformDetectR != null && currentlyPhasing == false){
            if (platformDetectR.getBorderColor() == Color.black) {
                currentFallingSpeed = 1;
                currentJumps = 0;
                //PlatformFix
                if ((MOUS.getY()+MOUSsize) > platformDetectR.getY()) {
                    var movementFixCount = (MOUS.getY()+MOUSsize) - platformDetectR.getY();
                    MOUS.move(0,-movementFixCount);
                }
            } else if (platformDetectR.getBorderColor() == Color.blue) {
                //Box Delete
                remove(platformDetectR);
                currentBoxCount--;
                if (currentBoxCount <= 0) {
                    stopTimer(tick);
                    stopTimer(timerTick);
                    currentlevel++; 
                    removeAll();
                    gameStart();
                }
            } else if (platformDetectR.getBorderColor() == Color.red) {
                //Gameover detection
                //Falling too far down.
                gameOver(1);
            }
        } else if (platformDetectL == null && platformDetectR == null || currentlyPhasing == true){
            MOUS.move(0,currentFallingSpeed)
            if (currentFallingSpeed < maxFallingSpeed) {
                currentFallingSpeed+=fallingSpeedInc;
            } else if (currentFallingSpeed > maxFallingSpeed+2) {
                currentFallingSpeed = maxFallingSpeed;
            }
        }
    }
}





//--GameplayFunctions--//
//timerTick is here purely because it operates by second instead of a 100th of a second.
function timerTick() {
    if (currentSecond <= 0) {
        gameOver(2);
    } else {
        currentSecond--;
    }
    timerTXT.setText(currentSecond);
}
//Game-Over-Screen
function gameOver(death) {
    removeAll();
    stopTimer(tick);
    stopTimer(timerTick);
    
    txtCreate("Game Over", 92.5, 30, "30pt Arial");
    if (death == 1) {
        txtCreate("You've died by touching lava!", 0, 100, "16pt Arial");
        txtCreate("Try not to do that, its hot.", 0, 120, "16pt Arial");
    } else if (death == 2) {
        txtCreate("You've died by running out of time!", 0, 100, "16pt Arial");
        txtCreate("Try not to do that.", 0, 120, "16pt Arial");
    } else if (death == 3) {
        txtCreate("You've died by glitching out of the game!", 0, 100, "16pt Arial");
        txtCreate("We gonna sue you now.", 0, 120, "16pt Arial");
    }
    
    txtCreate("Enter - restart", 0, getHeight()-40, "15pt Arial");
    txtCreate("Space - reset to current level.", 0, getHeight()-15, "20pt Arial");
    keyDownMethod(gameOverPress);
}
//Game-Over-Screen Button Functions
function gameOverPress(e) {
    if (e.keyCode == Keyboard.SPACE) {
        stopTimer(tick);
        stopTimer(timerTick);
        removeAll();
        gameStart();
    } else if (e.keyCode == Keyboard.ENTER) {
        stopTimer(tick);
        stopTimer(timerTick);
        removeAll();
        currentlevel = 1;
        gameStart();
    }
}
//Win-Screen-Function
function winnerWinner() {
    removeAll();
    stopTimer(tick);
    stopTimer(timerTick);
    
    txtCreate("You completed your mission.", 0, 30, "20pt Arial");
    
    txtCreate("It was a terrible journey but you've made it.", 0, 200, "14pt Arial");
    txtCreate("Well done, now MOUS can explory the Galaxy.", 0, 220, "14pt Arial");
    txtCreate("You now can return to home and take a well", 0, 240, "14pt Arial");
    txtCreate("deserved rest.", 0, 260, "14pt Arial");
    
    txtCreate("Press Space to Countinue", 40, getHeight()-20, "20pt Arial");
    keyDownMethod(winnerWinnerPress);
}
//winner-Winner-Screen Button Functions
function winnerWinnerPress(e) {
    if (e.keyCode == Keyboard.SPACE) {
        removeAll();
        currentlevel = 1;
        start();
    }
}



//--Key/MovementDetectFunctions--//
function keyPress(e) {
    if (e.keyCode == Keyboard.LEFT || e.keyCode == Keyboard.letter('A')) {
        //Movement Left
        if (MOUS.getX()>0) {
            MOUS.move(-movementSpeed, 0);
        }
    } else if (e.keyCode == Keyboard.RIGHT || e.keyCode == Keyboard.letter('D')) {
        //Movement Right
        if (MOUS.getX()+movementSpeed<[getWidth()-MOUSsize]) {
            MOUS.move(movementSpeed,0);
        }
    } else if (e.keyCode == Keyboard.UP || e.keyCode == Keyboard.letter('W')) {
        //Movement Jump
        if (currentJumps < maxJump) {
            if (currentlyJumping == false) {
                jump();
                currentJumps++;
                currentFallingSpeed = 1;
            }
        }
    } else if (e.keyCode == Keyboard.DOWN || e.keyCode == Keyboard.letter('S')) {
        //Movement Down/Smash
        currentlyPhasing = true;
        currentlyJumping = false;
        currentFallingSpeed = maxFallingSpeed+2;
    } else if (e.keyCode == Keyboard.letter('0')) {
        //LevelReset incase MOUS cannot move or a glitch happens.
        println("Level Restart");
        stopTimer(tick);
        stopTimer(timerTick); 
        removeAll();
        gameStart();
    }
}
function keyUnPress(e) {
    //Movement Down/Smash Countinued
    if (e.keyCode == Keyboard.DOWN) {
        currentlyPhasing = false;
    }
}
//JumpFunctions
function jump() {
    currentlyJumping = true;
    currentJumpPower = startJumpPower;
    setTimer(jumpLoop, actionSecond);
}
function jumpLoop() {
    if (currentlyJumping = true) {
        MOUS.move(0,-currentJumpPower);
        currentJumpPower-=jumpPowerInc;
        if (currentJumpPower <= minJumpPower) {
            currentlyJumping = false;
            stopTimer(jumpLoop);
        }
    } else {
        stopTimer(jumpLoop);
    }
}




//--ShapeCreationFunctions--//
function platformCreate(xsize,ysize,xpos,ypos) {
    platform = new Rectangle(xsize,ysize);
    platform.setPosition(xpos,ypos);
    platform.setBorderColor(Color.black);
    add(platform);
}
function fallPlatformCreate(xsize,ysize,xpos,ypos,color) {
    fallplatform = new Rectangle(xsize,ysize);
    fallplatform.setPosition(xpos,ypos);
    fallplatform.setBorderColor(color);
    fallplatform.setColor(color);
    add(fallplatform);
}
function txtCreate(txt,xpos,ypos,font) {
    var txt = new Text(txt,font);
    txt.setPosition(xpos,ypos);
    add(txt);
}
function timerTXTCreate(txt) {
    timerTXT = new Text(txt,"20pt Arial");
    timerTXT.setPosition(125,getHeight()-16);
    add(timerTXT);
}
//Use mins as the top left corner
//Use maxs as the bottom right corner
function BOXRandomizer(xposmin,yposmin,xposmax,yposmax) {
    var x = Randomizer.nextInt(xposmin, xposmax-boxSize);
    var y = Randomizer.nextInt(yposmin, yposmax-boxSize);
    if (debug == true) {
        var rect = new Rectangle(xposmax-xposmin,yposmax-yposmin);
        rect.setPosition(xposmin,yposmin);
        rect.setColor(Color.red);
        add(rect);
    }
    BOXCreate(x,y);
}
function BOXCreate(xpos,ypos) {
    BOX = new Rectangle(boxSize, boxSize);
    BOX.setPosition(xpos,ypos);
    BOX.setColor(boxColor);
    BOX.setBorderColor(Color.blue);
    add(BOX);
    currentBoxCount++;
}





//--LevelCreationFunctions--//
//Level 1 Creation
function levelCreate() {
    //Player Creation
    MOUS = new Rectangle(MOUSsize,MOUSsize);
    MOUS.setPosition(0,getHeight()/456);
    add(MOUS);
    //Platform Creation
    fallPlatformCreate(getWidth(),50,0,getHeight()-50,Color.red);
    platformCreate(getWidth()/2,25,0,getHeight()/2);
    platformCreate(getWidth()/3,25,getWidth()/2,getHeight()/8);
    platformCreate(getWidth()/3,25,getWidth()/2,getHeight()/2);
    platformCreate(getWidth()/2,25,0,getHeight()-100);
    platformCreate(getWidth()/2,25,300,getHeight()-100);
    //BOX Creation
    BOXCreate(70,305);
    BOXCreate(255,35);
    BOXCreate(350,305);
}
//Level 2 Creation
function levelCreate2() {
    //Player Creation
    MOUS = new Rectangle(MOUSsize,MOUSsize);
    MOUS.setPosition(0,getHeight()/456);
    add(MOUS);
    //Platform Creation
    fallPlatformCreate(getWidth(),50,0,getHeight()-50,Color.red);
    platformCreate(getWidth()-300,15,0,getHeight()/4);
    platformCreate(getWidth()/3,15,getWidth()/3,getWidth()/8);
    platformCreate(getWidth()/3,15,getWidth()/2,getHeight()-300);
    platformCreate(getWidth()/2,15,0,getHeight()-100);
    platformCreate(getWidth()/2,15,300,getHeight()-100);
    platformCreate(getWidth()/2,15,300,getHeight()-200);
    //BOX Creation
    BOXCreate(350,50);
    BOXCreate(75,225);
    BOXCreate(235,getHeight()-100);
    BOXCreate(340,355);
}
//Level 3 Creation
function levelCreate3() {
   //Player Creation
    MOUS = new Rectangle(MOUSsize,MOUSsize);
    MOUS.setPosition(0,getHeight()/456);
    add(MOUS);
    //Platform Creation
    fallPlatformCreate(getWidth(),50,0,getHeight()-50,Color.red);
    platformCreate(getWidth()-300,25,0,getHeight()/4);
    platformCreate(getWidth()/3,15,getWidth()/3,getHeight()/8);
    platformCreate((getWidth()/4)*3,15,0,getHeight()-75);
    platformCreate(getWidth()/2,15,300,getHeight()-275);
    //Box Creation
    BOXRandomizer(10,175,250,375);
    BOXRandomizer(10,175,250,375);
    BOXRandomizer(10,175,250,375);
    BOXCreate(350,180);
}
//balls :)
