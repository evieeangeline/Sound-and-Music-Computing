


// creepy-high
// Creepy distortedey high pitched synth, triggered off sine wave


Clock.bpm = 140
verb = Reverb( 'space' ).bus() 

creepy-high = Synth( 'cry', { gain:.1, octave:1 })
  .connect( verb, 1 )
  .note.seq( sine( .15, 7 )  , [1/2,1,2] )

creepy-high.stop()


// Fun Plucks

i1 = FM('perc').fx.add(Reverb()) 
i1.note.seq( sine( btof(7), 1,7)     , [1/3],  0 )
i1.decay = 1/5
i1.loudness = 0.5

i2 = FM('perc').fx.add(Reverb())
i2.note.seq( sine( btof(1),3,3)  , 1/5,  0 )
i2.decay = 1/5
i2.loudness = 0.5

i3 = FM('bass').fx.add(Reverb())    
i3.note.seq(sine(btof(10),3,0), 1, 0)

i1.stop()
i2.stop()
i3.stop()

mod1 = lfo( 'sine', 4, 40, 0 )
mod1.connect(i1.frequency)

mod1.frequency = 0 // to turn above off

// stab-pluck

verb = Reverb( 'space' ).bus()

stab-pluck = Pluck({
  damping: 0.4, 
  spread: 0.975, 
  loudness: 1, 
  blend:1
})

stab-pluck.note.seq( [-7, -2, -4, -6, -4, -2], 1/4)
stab-pluck.decay = gen(0.3+cycle(0.3)*0.1)
stab-pluck.glide = gen(500 + cycle(1)*10)
stab-pluck.connect( verb, .9)
stab-pluck.fx.add(Distortion({ pregain: 4, postgain: 0.9}))

stab-pluck.loudness = 0.5

stab-pluck.stop()


// mod synth

mod-synth = Synth()
mod-synth.note.seq([2,1,7,4,6],1/16,2)
mod-synth.loudness = 0.3
mod-synth.cutoff = sine(1, 0.3, 0.7)

mod = lfo( 'sine', 10, 7, 0 )
mod.connect( mod-synth.frequency )

mod-synth.stop()


// spacey arpeggios

s = FM()
s.connect(verb,1)
s.note.seq([30, 26, 28,23, 29],1/64,0)
s.loudness = 0.3
s.stop()