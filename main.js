img = "";
status = "";
objects = [];

function preload(){
   img = loadImage("dog_cat.jpg");
}

function setup(){
   canvas = createCanvas(600, 400);
   canvas.center();

   video = createCapture(VIDEO);
   video.size(600, 400);
   video.hide();

   objectDetector = ml5.objectDetector("cocossd", modelLoaded);

   document.getElementById("status").innerHTML = "Stautus: Detecting objects...";
}

function modelLoaded(){
    console.log("Model loaded successfully!");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 600, 400);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected: " + objects.length;            
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}