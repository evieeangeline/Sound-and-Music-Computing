
// START TRIGGER

Clock.bpm = 360

verb = Reverb( 'space' ).bus() 
verb2 = Reverb( 'space' ).bus() 
verb3 = Reverb( 'space' ).bus() 
delay = Delay( '1/3' ).bus().connect( verb, .1 )

lead = Synth('stringPad', {feedback:.2}).connect(verb,1).connect(verb,2).connect(verb,3).connect(delay, 0.9)


// WEBSOCKET 

instrumentStatus = {
  "hand": false,
}

const socket = new WebSocket("ws://localhost:8778")
socket.addEventListener("open", (event) => {
  console.log("connected to websocket")
})
socket.addEventListener("message", (event) => {
    console.log(event.data)

    obj = JSON.parse(event.data)
  	// [L box, height, R, Always at bottom]
  
    // between 0 and 1 in bewtee 0 and 315
  	vol = obj[1]/315
    // flip so lower height is more cuttoff
    if (vol < 0.5) {
        vol = 0.5 + (0.5 - vol);
    } else {
        vol = 0.5 - (vol - 0.5);
    }

    // note value bewteen -7 and 7 bewteen 0 and 250
    var minInput = 0;
    var maxInput = 670;
    var minOutput = -7;
    var maxOutput = 7;
    // Scale the value from the input range to the output range
    var noteval = ((obj[0] - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) + minOutput;

    // Round the output to the nearest integer
    noteval = Math.round(noteval);
   

    // assign: 
    lead.cutoff = vol
    lead.note.seq( noteval, 1/4)
})

