
// Theory 
Clock.bpm = 120
Theory.root = 'd#4'
Theory.mode = 'dorian'
 
delay = Delay( '1/6' ).bus()
 

// high_rhodes
// rhodes keys with lots of wah wah 

Theory.degree.seq( ['i','-iv','-V'], [8,4,4] )

verb  = Reverb( 'space' ).bus() 

high_rhodes = Synth[4]('rhodes', { decay:8, gain:.15 })
high_rhodes.fx[0].connect( verb, 1 )
high_rhodes.chord.seq([[0,2,4,6], [1,2,4,7]], 4 )

high_rhodes.stop()
 

