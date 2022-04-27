Harry_Potter_Song = "";
Peter_Pan_Song = "";
leftWrist = 0;
rightWrist = 0;
leftWristX = 0;
leftWristY = 0;
confidenceLevel = 0.3;
Status = "";                                                            

function modelLoaded ()
{
    console.log("poseNet is  initialized");
}

function preload() 
{
    
    Harry_Potter_Song = loadSound("play.mp3");
    Peter_Pan_Song = loadSound("music2.mp3"); 
}

function setup() 
{
    canvas = createCanvas(500, 330);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    Status = Harry_Potter_Song.isPlaying();
    fill("#DC143C");
    stroke("#DC143C");
    if (leftWrist > confidenceLevel)
    {
       console.log("Left wrist identified!");
       circle(leftWristX, leftWristY, 20);
       Peter_Pan_Song.stop();
       console.log("Harry_Potter_Song play status is: " + Status);
       if (false == Status )
       {
           Harry_Potter_Song.play();
           document.getElementById("songName").innerText = "Harry Potter Song";
           leftWrist = 0;
       }
    }

   Status = Peter_Pan_Song.isPlaying();
    if (rightWrist > confidenceLevel)
   {
      console.log("Right wrist identified!" + leftWristX + ":" + leftWristY);
    circle(leftWristX, leftWristY, 20);
       Harry_Potter_Song.stop();
       console.log("Peter_Pan_Song play status is: " + Status);
      if (false == Status )
       {
            Peter_Pan_Song.play();
          document.getElementById("songName").innerText = "Peter Pan Song";
         rightWrist = 0;
       }
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        //console.log(results);

        leftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.keypoints[9].position.x;
        leftWristY = results[0].pose.keypoints[9].position.y;
        rightWrist = results[0].pose.keypoints[10].score;
        

        if((rightWrist > confidenceLevel) && (rightWrist > leftWrist))
        {
            leftWrist = 0;
            leftWristX = results[0].pose.keypoints[10].position.x;
            leftWristY = results[0].pose.keypoints[10].position.y;
        }

    }
}