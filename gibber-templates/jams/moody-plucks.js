//Global

Clock.bpm = 120
Theory.root = 'c#5' 
Theory.mode = 'dorian' 

Theory.degree.seq( ['i', '-iv', '-v'], [2, 1, 1])


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

mod1.frequency = 0 // to turn above effect off

// Drums 

d2 = Drums()
d2.tidal( '<kd*17 kd*21 kd*13 kd*19> sd [kd*2 sd] <oh ch*3 ch*12>' )
d2.loudness = 0.4
d2.stop()

// pluck synth

verb = Reverb( 'space' ).bus()

perc = Pluck({
  damping: 0.4, 
  spread: 0.975, 
  loudness: 1, 
  blend:1
})

perc.note.seq( [-7, -2, -4, -6, -4, -2], 1/4)
perc.decay = gen(0.3+cycle(0.3)*0.1)
perc.glide = gen(500 + cycle(1)*10)
perc.connect( verb, .3)
perc.fx.add(Distortion({ pregain: 4, postgain: 0.9}))

perc.loudness = 0.8

perc.stop()

// quick synth 

s = Synth()
s.note.seq([2,1,7,4,6],1/16,2)
s.loudness = 0.3
s.cutoff = sine(1, 0.3, 0.7)

mod = lfo( 'sine', 10, 7, 0 )
mod.connect( s.frequency )

