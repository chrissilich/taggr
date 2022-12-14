import exampleresult from '../exampleresult'

gapi.load('client')

let waitForClientLoadID = setInterval(function () {
	console.log('waitForClientLoadID')
	if (gapi.client && gapi.client.setApiKey) {
		clearInterval(waitForClientLoadID)
	} else {
		return
	}
	gapi.client.setApiKey('AIzaSyBJM2Sx8opQ58Cjs0MKAndIFq4wE90oEf8')
	gapi.client
		.load('https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest')
		.then(() => {
			console.log('GAPI client loaded for API')
		})
		.catch((err) => {
			console.error('Error loading GAPI client for API', err)
		})
}, 50)

async function search(term, page) {
	// return exampleresult.items

	let searchOptions = {
		q: term,
		cx: '75899d8a2b153407f',
		size: 'large',
		start: page * 15,
		searchType: 'image',
		safe: 'active',
	}
	console.log('send search to google with options', searchOptions)

	return gapi.client.search.cse
		.list(searchOptions)
		.then((response) => {
			// Handle the results here (response.result has the parsed body).
			// console.log('Successful search response', response)
			return response.result.items.map((i) => {
				i.key = Math.random()
				return i
			})
		})
		.catch((err) => {
			console.error('Execute error', err)
		})
}

export { search }
