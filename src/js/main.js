import Cookie from 'js-cookie'
const date = new Date()
const currentHour = date.getHours()
const midnight = new Date( new Date( ).setHours(24,0,0,0) ) // Make epuch midnight and create data obj from it
// { expires: midnight }

const q = query => document.querySelector( query )
const qa = query => document.querySelectorAll( query )
const untrans = query => q( query ).classList.remove( 'hide' )
const hide = item => item.classList.add( 'hide' )
const itemTime = item => {
	const match = item.className.match( /(after|before)(\d{1,2})/ )
	if( !match ) return false
	return {
		direction: match[1],
		time: match[2]
	}
}

window.onload = f => {

	// Show habits on load
	q( '#habits' ).classList.remove( 'hide' )

	// Reset button
	q( 'a#reset' ).addEventListener( 'click', f => Object.keys( Cookie.get() ).forEach( cookie => {
	  Cookie.remove( cookie )
	  location.reload()
	} ) )

	// Set input width on change
	const inputs = qa( "input[type='text']" )
	for (var i = inputs.length - 1; i >= 0; i--) {
		inputs[i].addEventListener( 'keyup', event => event.target.style.width = `${ event.target.value.length }rem` )
	}

	// Get MIT cookie, if present, populate input
	Promise.resolve( Cookie.get( 'mit' ) )
	.then( mit => q( '#mit' ).value = mit || 'Most Important Todo...')
	// If MIT input changes, set cookie
	q( '#mit' ).addEventListener( 'keyup', event => Cookie.set( 'mit', event.target.value ) )

	// // Get LIT cookie, if present, populate input
	// Promise.resolve( Cookie.get( 'lit' ) )
	// .then( lit => q( '#lit' ).value = lit || 'Less Important Todo...')
	// // If LIT input changes, set cookie
	// q( '#lit' ).addEventListener( 'keyup', event => Cookie.set( 'lit', event.target.value ) )

	// Tag clicked todos
	const habits = qa( '.habits li' )
	for (let i = habits.length - 1; i >= 0; i--) {

		// Set id
		habits[i].id = `habit${i}`
		// Set listener
		habits[i].addEventListener( 'click', event => {
			event.target.classList.toggle( 'hide' )
			Cookie.set( `habit${i}`, event.target.classList.contains( 'hide' ), { expires: midnight } )
		} )
		// Get previous tag states
		if( Cookie.get( `habit${i}` ) == 'true' ) habits[i].classList.toggle( 'hide' )
	}

	// If the li has a time, hide it base on it
	const lis = qa( "li, ul" )
	const after = []
	const before = []
	// Find lis with .after
	for (let i = lis.length - 1; i >= 0; i--) {

		const timing = itemTime( lis[i] )
		if( timing && timing.direction == 'before' && timing.time < currentHour ) hide( lis[i] )
		if( timing && timing.direction == 'after' && timing.time > currentHour ) hide( lis[i] )
	}	

}

