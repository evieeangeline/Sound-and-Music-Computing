


// clave 
// euclidean patterns

verb  = Reverb( 'space' ).bus() 
clave = Clave({ gain:.1 }).connect( verb, .25 )
clave.trigger.seq( .5, e = Euclid(3,8)  )
clave.stop()

// drums
// very basic drums with cool delay

delay = Delay( '1/6' ).bus()

drums = Drums()
drums.fx.add( Distortion({ pregain:1.5, postgain:1 }) )
drums.connect(delay, 0.5)
drums.tidal('kd [kd, sd] kd [kd, sd]')

drums.stop()

// hat
// high hat with changing parameters

hat = Hat({ gain:.075 })
hat.trigger.seq( [1,.5], [1/8, 1/16] )
hat.decay = gen( .02 + cycle( beats(16) * 4 ) * .0125 )
hat.fx.add( Distortion({ pregain:100, postgain:.1 }) )

hat.stop()


// drum with bass 
// cool sequence

d2 = Drums()
d2.tidal( '<kd*17 kd*21 kd*13 kd*19> sd [kd*2 sd] <oh ch*3 ch*12>' )
d2.loudness = 0.4
d2.stop()


// airy_drums

airy_drums = Drums().connect( verb, 0.5)
airy_drums.tidal('kd [kd, sd] kd [kd, sd]')
airy_drums.stop()

hat = Hat({ gain:.075 })
hat.trigger.seq( [1,.5, 1,.5, 1,.5, 1,.5,.5,.5,.5], [1/8, 1/16,1/8, 1/16, 1/8, 1/16, 1/8, 1/16, 1/16, 1/32, 1/32, 1/32, 1/32 ] )
hat.decay = gen( .02 + cycle( beats(16) * 4 ) * .0125 )
hat.fx.add( Distortion({ pregain:100, postgain:.1 }) )
