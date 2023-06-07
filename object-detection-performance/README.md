# Object Detection Performance

# Description

This piece utilizes computer vision to trigger different instruments. The piece explores the interaction between objects, people, and sound, and creating a soundscape based on audio representation of different objects. 

The two main components is an object detection for different instruments, as well as a ‘visual theremin’ – a synth able to be controlled by a person’s location. 

The base of this project uses [Gibber](https://github.com/gibber-cc/gibber) - a live coding environment for the web browser. Gibber runs via browser, you can click [here](https://gibber.cc/playground/index.html) to access the live editor. This piece additionally makes use of some bass and effect sounds from Pure Data, which can be downloaded [here](https://puredata.info/). 

# Instrument/Code Information

## Object Detection - Instrument Triggers

Instrument trigger code can be found in the folder [cv-object-trigger](cv-object-trigger). 

When [instrument-detect-main.py](cv-object-trigger/instrument-detect-main.py) is run, video output from the computer’s inbuilt camera will show. This starts a WebSocket, sending a list of objects currently in view (also shown in video output with a green box). 
Gibber can receive this list, and trigger instruments by finding certain objects in the list.
For example, copy the following code into [Gibber](https://github.com/gibber-cc/gibber) and trigger after starting [instrument-detect-main.py](cv-object-trigger/instrument-detect-main.py). The object name can be changed to any of the predefined objects – the model is trained on the COCO model, find the list of possible objects [here](object/cv-weights-model/coco_names.txt).   

```
// Copy me into gibber!!!


// Initialize Instrument
plantA = Synth[4]('shimmer', { decay:0.7, attack: 0.7, cutoff:0.1, Q:0.1 })
plantA.chord.seq([[0-7,2-7,4-7,6-7]], 3)
plantA.loudness = 0 


//  WEBSOCKET START
instrumentStatus = {
  "plant": false
}

const socket = new WebSocket("ws://localhost:8777")
socket.addEventListener("open", (event) => {
  console.log("connected to websocket")
})
socket.addEventListener("message", (event) => {
  console.log(event.data)

  if (event.data.includes("POTTED PLANT")) {
    if (instrumentStatus["plant"] == false) {
      instrumentStatus["plant"] == true

      //Instrument
			plantA.loudness = 1
			plantB.loudness = 0.5
			plantC.loudness = 0.5
    }
    
  } else {
    instrumentStatus["plant"] == false

    // Stop Instrument
    plantA.loudness = 0

  }
})

```


The commands inside the WebSocket logic can be changed, however it is recommended to set the loudness inside the logic so that sequencers (and any other setting) can be modified outside, so changes can be made during a performance. 

**Live Coding this Instrument:**
For the performance, the instrument sequencers and effects are able to be changed live, to create a dynamic performance. The instruments can still be brought in and out of view, with their changes still active. 

The middle part of the performance contains some preset sequencers and effects to assist the performance, however these can be changed, and should be changed live. This lies under `/// BEAT TIME Start Here \\\ `

Performers should join a gibber room to assist with this performance, and only code below the comment line: `/// RANDOM TIME Start Here \\\ `

## Object Detection – Visual Theremin 

Visual theremin code can be found in the folder [cv-visual-theremin](cv-visual-theremin). 

When [visual-theremin-main.py](cv-visual-theremin/visual-theremin-main.py) is run, video output from the computer’s inbuilt camera will show. This starts a WebSocket, sending the coordinates of the bounding box surrounding a person detected on the screen. 
Gibber receives this data, and outputs sound based on the person’s location, live. 

Moving lower increases the frequency the low pass is set at, and also reduces the overall volume. Moving left and right changes the pitch, rounding to notes within the scale set on Gibber. Note that parameters relating to the person’s position may need to be changed in the Gibber code, depending on the camera resolution (they have been set up specifically for this performance and laptop).

The Gibber code for this component of the project can be run separately (externally from the Gibber room set up in the previous section). Copy [visual-theremin-gibber.js](cv-visual-theremin/visual-theremin-gibber.js). 

## Pure Data – Andy Warhol Sampler

All Pure Data (PD) patches are stored in the folder `pure-data`. [Open this patch here](pure-data/andy-euclid.pd). 

This patch contains several short snippets from interviews with Andy Warhol - artist known for his pop art works depicting every day objects, like a Campell Soup Can, bananas, and Brillo soap pads. 

The patch needs to be initialized - loading the samples in (the samples could be changed for future performances, if the naming system is followed). Then, after 'start' is pressed, the samples are played back at random, fitting to the beat determined by the euclidean pattern set by the orange sliders. Delay, reverb and volume can also be controlled. 

## Pure Data – Bass Synth

All Pure Data (PD) patches are stored in the folder `pure-data`. [Open this patch here](pure-data/bass.pd). 

This patch's main controls are initialized with the grey 'bang' object. The 8 notes to the right are controlled by gradualling bringing their volume sliders up and down (the smaller, lighter coloured sliders). The darker coloured sliders indicate the note's panning (left to right), they are not controls. The grey reverb slider controls reverb for all notes. Lower pitched notes are lower on the patch, higher pitched notes are at the top. 

The sun patch - to the bottom left - is a separate sound, with a wobbly LFO. There are 2 notes which can also be added gradually using their sliders. 



# Performance Notes
## Roles

| Who | Instrument | Role |
| ------ | ------ | ------ |
| All | Physical Instruments | Place instruments in and out of camera view to trigger instruments
| Chloe, Weiyung, Evangeline | Gibber | In a gibber room, control the predefined instruments being triggered by CV, or add additional instruments. 
| Corey | PD | Play audio samples and bass tones – both PD patches. 
| Evangeline | Hand & Camera | Using hand movements, control sound using CV and Gibber interface


## Files and Resources
The relevant files for this performance in the directory are: 
- cv-object-trigger
  - group-gibber.js
  - instrument-detect-main.py
- visual-theremin
  - visual-theremin-gibber.js
  - visual-theremin-main.py
- pure-data
  - bass.pd
  - andy-euclid.pd

The way in which these are set up and used are described in the following useage sections. 

## Laptop Set Up 
|Laptop Number|Software Open|Files Open/Description|
|:----|:----|:----|
|1|PD|Bass.pd, glitch.pd
|2|Gibber|Connected to gibber room
|3|Gibber|Connected to gibber room
|4|Python CV script, Gibber|Screen A: visual-theremin-gibber.js, visual-theremin-main.py. Screen B: connected to gibber room. Can flick between easily using swipe motion.|
|5|Python CV script, Gibber|Laptop purely for communicating between CV script and gibber, for instrument triggers. Computer vision screen shown the entire time. Physical control during the performance does not happen via this laptop.|


## Set Up Procedure

### Instrument Object Detection CV setup (L2, L3, L4, L5)
1.	Start a gibber room, Connect L2, L3, L4, L5
2.	Paste in group-gibber.js into the gibber workspace.
3.	Trigger the Gibber effects and instruments for the entire piece on L5
4.	Start the python code: gibber-cv-main.py on L5.
5.	Trigger the Gibber code corresponding to receiving WebSocket information om L5
6.	Ensure python code is outputting a correct list of items identified, and gibber is outputting sound. 

### Pure Data Bass and Glitch Set Up (L1)
1.	On L1, open the PD patches titled bass.pd and andy-euclid.pd
2.	Refer to PD patch with instructions on how to use each instrument. 
3.	Ensure sound outputting before beginning of performance. 

### Theremin CV Set Up (L4)
1.	On L4, load the gibber script visual-theremin-gibber.js into gibber.
2.	On same laptop, run the python code titled visual-theremin-main.py
3.	Run the entire gibber script
4.	Ensure body movement is detected in camera and outputting sound in PD. 


# References


### WebSocket and Gibber Code

[1] Yacine Rouizi. 2022. Object Detection with Python, Deep Learning, and OpenCV. Retrieved from: <https://dontrepeatyourself.org/post/object-detection-with-python-deep-learning-and-opencv/>

[2] MDN Web Docs. 2023. Writing WebSocket client applications. Retrieved from: <https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications>

[3] Acknowledgement and thanks to Charlie, creator of Gibber, for his assistance in setting WebSockets up. 

### Pure Data Patch : andy-euclid.pd

[4] Charles Martin. 2023. sampling-scratch.pd. Retrieved from: <https://github.com/cpmpercussion/ComputerMusicIntro/blob/master/1-digital-synthesis/sampling-scratch.pd>

[5] Charles Martin. 2023. euclidean-sequencer.pd. Retrieved from: <https://github.com/cpmpercussion/ComputerMusicIntro/blob/master/6-algorithmic-composition/euclidean-sequencer.pd>

[6] Sound Simulator. 2021. Delay (Pure Data Tutorial). Retrieved from: <https://www.youtube.com/watch?v=rMs1H_J2fII> 

### Audio Samples from andy-eudlid.pd

[7] Andy Warhol. 1966. Interview. Retrieved from: <https://www.youtube.com/watch?v=p7nw9Up54pg>

[8] Andy Warhol. 1971. Interview. Retrieved from: <https://www.youtube.com/watch?v=HNqYH6B1sIs>

[9] Andy Warhol. 1972. WFAA Interview. Retrieved from: <https://www.youtube.com/watch?v=byy2qTKpWwU>

### bass.pd PD Patch

[10] Evangeline Sturges. 2023. planets.pd (Indivdual Performance ANU SMC 2023). Retrieved from: <https://gitlab.cecs.anu.edu.au/u7121991/SMC-2023-submissions/-/tree/main/solo-performance>

### Externals for Both Pure Data Patches: Freeverb

[11] olafmatt. 2010. Freeverb. Retrieved from: <https://puredata.info/downloads/freeverb>

