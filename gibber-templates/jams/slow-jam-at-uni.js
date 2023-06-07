
Clock.bpm = 50
Theory.root = 'c'
Theory.mode = 'aeolian'
 
verb  = Reverb( 'space' ).bus() 
delay = Delay( '1/6' ).bus()

Theory.degree.seq( ['i','iv','VI'], [1] )


////// Airy Drums

drumsA = Drums().connect( verb, 0.5)
drumsA.tidal('kd [kd, sd] kd [kd, sd]')

// high hat
hat = Hat({ gain:.075 })
hat.trigger.seq( [1,.5, 1,.5, 1,.5, 1,.5,.5,.5,.5], [1/8, 1/16,1/8, 1/16, 1/8, 1/16, 1/8, 1/16, 1/16, 1/32, 1/32, 1/32, 1/32 ] )
hat.decay = gen( .02 + cycle( beats(16) * 4 ) * .0125 )
hat.fx.add( Distortion({ pregain:100, postgain:.1 }) )

//chords
padA = Synth[4]('rhodes', {octave:6, decay:8, gain:0.4 })
padA.fx[0].connect( verb, 1 )
padA.chord.seq([[21,23,25,27]], 1)

// glitchey boy
glitch = Freesound[5]({ query:'glitch', max:.5 })
  .connect( verb, .05 )
  .spread(1) // pan voices full stereo

glitch.pickplay.seq(
  Rndi(0,14),
  Euclid(9,16)
)

// spacey arpeggios

s = FM()
s.connect(verb,1)
s.note.seq([30, 26, 28,23, 29],1/64,0)
s.loudness = 0.3
s.stop()


// yummy bass

bass = Synth('monoSynth', { saturation: 25, gain: 0.35 })
						.connect(delay, 0.2)
						.connect(verb, 0.3)
bass.note.tidal('0 1 0 0 1 7 0 ~ 0 ~ 7 -5 ~ 0 -7 2')
bass.delay.seq([1 / 64, 1 / 32], 1 / 4)
bass.glide.seq([1, 1, 150, 150], 1 / 8)
bass.Q = gen(0.5 + cycle(0.15) * 0.5)
bass.cutoff = gen(0.5 + cycle(0.1) * 0.4)
bass.loudness = 2.5

bass.stop()

