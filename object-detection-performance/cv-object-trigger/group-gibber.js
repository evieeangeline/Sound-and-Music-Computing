//////////////////////////   INIT START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 


// Theory
Clock.bpm = 160
Theory.root = 'g4'
Theory.mode = 'dorian'

// Effects
verb = Reverb('space').bus()
delay = Delay( '1/6' ).bus()
bass_dist = Distortion('earshred').bus()

// Water
water = Freesound[5]({ query:'water', max:.5 }).spread(1)
water.connect( verb, 0.4 )
water.pickplay.seq(Rndi(0,14), Euclid(3,16)  ) 

water.loudness = 0
//water.loudness = 0.1

// Bowl
bowl = Synth('acidBass2', { saturation:20, gain:.3 })
  .connect( delay, .25 )
  .connect( verb , .125 )
bowl.decay = 1
bowl.sustain = 1
bowl.attack = 1
bowl.Q = 0.1
bowl.cutoff = 0.1
bowl.connect(delay, .5)
bowl.connect( verb, 1 )
bowl.note.seq([0], [2])

bowl.loudness = 0

//bowl.loudness = 0.3

// Cups

cup = FM[4]('perc', { octave: 1})
cup.note.seq( sine( btof(1.3), 7,5) , [1/5],  1 )
cup.decay = 1/25
cup.connect(verb, 0.1)

cup.loudness = 0

//cup.loudness = 0.5

// Plant
plantA = Synth[4]('shimmer', { decay:0.7, attack: 0.7, cutoff:0.1, Q:0.1 })
plantA.chord.seq([[0-7,2-7,4-7,6-7]], 3)
plantB = Synth[4]('shimmer', { decay:0.9, attack: 0.9, cutoff:0.1, Q:0.1 })
plantB.seq([7, 2, 3, 0], [6/3, 1/3])
plantC = Synth[4]('shimmer', { decay:0.9, attack: 0.9, cutoff:0.1, Q:0.1 })
plantC.seq([0, 2, 7, 3], [4/3, 1/3])

plantA.loudness = 0 
plantB.loudness = 0 
plantC.loudness = 0

//plantA.loudness = 1
//plantB.loudness = 0.5
//plantC.loudness = 0.5

// EXTRAS

synth = Synth('brass', {octave:-1})
synth2 = Synth('brass', {octave:-2})
kick = Drums()
hat = Hat({ gain:.075 }).connect( verb, .15 )


//  WEBSOCKET START

instrumentStatus = {
  "drum": false,
  "guitar": false, 
  "bass": false,
  "keys": false
}

const socket = new WebSocket("ws://localhost:8777")
socket.addEventListener("open", (event) => {
  console.log("connected to websocket")
})
socket.addEventListener("message", (event) => {
  console.log(event.data)


  // WATER
  if (event.data.includes("BOTTLE")) {
    if (instrumentStatus["drum"] == false) {
      instrumentStatus["drum"] == true

      // Instrument
      water.loudness = 0.1

    }
  } else {
    instrumentStatus["drum"] == false

    // Stop drums
    water.loudness = 0
    
  }


  // BOWL
  if (event.data.includes("BOWL")) {
    if (instrumentStatus["bass"] == false) {
      instrumentStatus["bass"] == true

      //Instrument
      bowl.loudness = 0.3

    }
  } else {
    instrumentStatus["bass"] == false

    // Stop Instrument
    bowl.loudness = 0

  }

  // CUP
  if (event.data.includes("CUP")) {
    if (instrumentStatus["keys"] == false) {
      instrumentStatus["keys"] == true

      //Instrument
      cup.loudness = 0.5

    }
  } else {
    instrumentStatus["keys"] == false

    // Stop Instrument
    cup.loudness = 0

  }

  // PLANT
  if (event.data.includes("POTTED PLANT")) {
    if (instrumentStatus["guitar"] == false) {
      instrumentStatus["guitar"] == true

      //Instrument
			plantA.loudness = 1
			plantB.loudness = 0.5
			plantC.loudness = 0.5

    }
  } else {
    instrumentStatus["guitar"] == false

    // Stop Instrument
    plantA.loudness = 0
		plantB.loudness = 0
		plantC.loudness = 0

  }
})



/// WEBSOCKET END


//////////////////////// BEAT TIME Start Here \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Drums
kick.connect( verb , 0.02 )  
kick.tidal('kd ~ ~ kd ~ ~')

hat.loudness = 0.25
hat.trigger.seq( [1,.5, .25], [1/6] )

kick.tidal('kd ~ ~ [kd, sd] ~ ~')
kick.connect( delay, 0.2 )
kick.connect( verb, 0.02 )

// Stop Plants
plantB.stop()
plantC.stop()
plantA.chord.seq([[0,2,4,6], [1,2,4,7], [2,4,6,8], [2,4,6,8], [2,4,6,8], [3,4,6,10], [2,4,7], [2,4,7]], 1/2 )

/* WAIT FOR SAMPLES */ 

plantA.Q = 0
plantA.chord.seq([[0,2,4]], 1)

bowl.note.seq([0], [1])
bowl.decay = 1
bowl.sustain = 1
bowl.attack = 0.1

Theory.degree.seq( ['i', 'III', 'ii', 'v', 'ii', 'ii', 'III', 'III'], [1] )

synth.attack = 0
synth.cutoff = 1
synth.connect(bass_dist, 0)

synth2.attack = 0
synth2.cutoff = 1
synth2.connect(bass_dist, 0)

synth.seq([0,4], [1/2, 3/2])
synth2.seq([0,4], [1/2, 3/2])

/* wait */ 

Theory.degree.seq( ['i'], [1] )


//////////////////////    RANDOM TIME Start Here    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/* 
RULES
- cannot .stop() instruments unless absolutely nessessary - all instruments here (except drums) 
		are websocket instruments so they will disapear
- cannot .gain or .loudness instrumets - that is triggered in the websocket so you will find 
		that it does not work

IDEAS
- rndi(min, max, quantity)
- .note.seq( sine( btof([sine wave speed]), [range],[start note]), [frequency to get number],  1 )
  EG  .note.seq( sine( btof(1.3), 7,5), [1/5],  1 )
- hold LONG notes
- play with EFFECTS

I've left you with one command with an example/the last active sequencer. 
Go for EFFECTS! (and sequencer)

*/

// WEIYUNG - DRUMS
// Drums - get rid of quickly - they are different - they need to be faded out
// (not websocket instrument)
kick.tidal('kd')
hat.trigger.seq( [1,.5, .25], [1/3] )
kick.gain.fade(1, 0, 9)
hat.gain.fade(0.25, 0, 9)

// CHLOE - PLANT
plantA.chord.seq( Rndi(0,10,4) , 3 ) // gives random chords

// CHLOE - CUP
cup.note.seq( sine( btof(1.3), 7,5), [1/5],  1 )


// WEIYUNG - BASS
bowl.note.seq([0, -4, 3, 2], 3)


// WEIYUNG - WATER
// only one sequencing command - edit the effects of water
water.pickplay.seq(Rndi(0,14), Euclid(1,16))     