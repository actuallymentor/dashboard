import Cookie from 'js-cookie'
const date = new Date()
const hour = date.getHours()
const midnight = new Date( ).setHours(24,0,0,0)
// { expires: midnight }

const q = query => document.querySelector( query )
const qa = query => document.querySelectorAll( query )
const trans = query => q( query ).classList.add( 'trans' )
const untrans = query => q( query ).classList.remove( 'trans' )

window.onload = f => {

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

	// Get LIT cookie, if present, populate input
	Promise.resolve( Cookie.get( 'lit' ) )
	.then( lit => q( '#lit' ).value = lit || 'Less Important Todo...')
	// If LIT input changes, set cookie
	q( '#lit' ).addEventListener( 'keyup', event => Cookie.set( 'lit', event.target.value ) )

	// Tag clicked todos
	const habits = qa( '.habits li' )
	for (let i = habits.length - 1; i >= 0; i--) {

		// Set id
		habits[i].id = `habit${i}`
		// Set listener
		habits[i].addEventListener( 'click', event => {
			event.target.classList.toggle( 'strike' )
			Cookie.set( `habit${i}`, event.target.classList.contains( 'strike' ), { expires: midnight } )
		} )
		// Get previous tag states
		if( Cookie.get( `habit${i}` ) == 'true' ) habits[i].classList.toggle( 'strike' )
	}


}

