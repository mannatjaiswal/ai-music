song1="";
song2="";
leftWristX=0;
leftWristY=0;
scoreRightWrist=0;
scoreLeftWrist=0;
rightWristX=0;
rightWristY=0;
song1_status="";
song2_status="";
function preload(){
    song1=loadSound('my_heart');
    song2=loadSound('Faded');
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('modelloaded!');
}
function gotPoses(results){
    if(results.length>0){
    console.log(results);
leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;

rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;

scoreRightWrist=results[0].pose.keypoints[10].score;
scoreLeftWrist=results[0].pose.keypoints[9].score;

}
}
function draw(){
    image(video,0,0,600,500);
    fill ('red');
    stroke('red');

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop;
        if(song2_status==false){
            song2.play;
        }
    }

    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop;
        if(song1_status==false){
            song1.play;
        }
    }

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1)
}
