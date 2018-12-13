const date = new Date()
const hour = date.getHours()

const q = query => document.querySelector( query )
const trans = query => q( query ).classList.add( 'trans' )
const untrans = query => q( query ).classList.remove( 'trans' )

// Before 12 the pug already does the relevant trans
// if( hour < 12 ) 
if( hour > 17 ) {
	untrans( '#evening' )
	trans( '#wake' )
	trans( '#plan' )
}