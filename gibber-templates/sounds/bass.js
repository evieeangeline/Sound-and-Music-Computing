// Theory

Clock.bpm = 120
Theory.root = 'd#4'
Theory.mode = 'dorian'
Theory.degree.seq( ['i','-iv','-V'], [8,4,4] )


// acid_bass 
// created by fasttriggerfish and thecharlie 

verb  = Reverb( 'space' ).bus() 
delay = Delay( '1/6' ).bus()

acid_bass = Synth('acidBass2', { saturation:20, gain:.3 })
  .connect( delay, .25 )
  .connect( verb, .125 )
 
acid_bass.note.tidal( '0 0 0 0 4 6 0 ~ 0 ~ 7 -7 ~ 0 -7 0' )
acid_bass.decay.seq( [1/32, 1/16], 1/2 )
acid_bass.glide.seq( [1,1,100,100 ], 1/4 )
acid_bass.Q = gen( 0.5 + cycle(0.1) * 0.49 )
acid_bass.cutoff = gen( 0.5 + cycle(0.07) * 0.45 )  
    
acid_bass.stop()



// dark_bass
// from gibber demo files - 'moody'≥

verb  = Reverb( 'space' ).bus() 

dark_bass = Monosynth( 'bassPad', { decay:4 }).connect( verb, .5 )
dark_bass.note.seq( [0, 0, -1, -1, -2, -2, -4, -4], [0.25, 3.75] )
 
dark_bass.stop()


// yummy stomach bass

stomach_bass = Synth('monoSynth', { saturation: 25, gain: 0.35 })
						.connect(delay, 0.2)
						.connect(verb, 0.3)
stomach_bass.note.tidal('0 1 0 0 1 7 0 ~ 0 ~ 7 -5 ~ 0 -7 2')
stomach_bass.delay.seq([1 / 64, 1 / 32], 1 / 4)
stomach_bass.glide.seq([1, 1, 150, 150], 1 / 8)
stomach_bass.Q = gen(0.5 + cycle(0.15) * 0.5)
stomach_bass.cutoff = gen(0.5 + cycle(0.1) * 0.4)
stomach_bass.loudness = 2.5