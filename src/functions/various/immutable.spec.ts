import { db } from "../../../data/data"
import { shoppingData } from "../../../data/data-shopping"

describe('Immutable ES6 operations', () => {
	const employees = db.getEmployees();

	const john = {
		firstname: "John",
		lastname: "Lennon"
	}

	const paul = {
		firstname: "Paul",
		lastname: "McCartney"
	}

	const musician = {
		profession: "musician",
		salary: 5000
	}

	it('merge two objects', () => {
		// define `merge2objects` function here
		// for 2 given parameters, the function returns an new merged object 
		function merge2objects(a: {}, b: {}) {
			return Object.assign(a, b)
		}

		expect(merge2objects(john, musician)).toEqual({
			firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
		})

		expect(merge2objects(paul, musician)).toEqual({
			firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
		})
	})

	it('merging multiple objects', () => {
		// define `mergeManyObjects` function here
		// same as above, but accepts multiple objects as input parameters 
		function mergeManyObjects(...objects) {
			return Object.assign({}, ...objects)
		}

		expect(mergeManyObjects({ id: 8492745921 }, john, musician)).toEqual({
			id: 8492745921, firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
		})

		expect(mergeManyObjects({ id: 5193421984 }, paul, musician)).toEqual({
			id: 5193421984, firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
		})
	})

	it('strip static attribute from objects', () => {
		// define `stripId` function here
		// it will return an immutable version of input object with `id` removed
		function stripId(obj: {}) {
			return Object.keys(obj).reduce((acc, key) => {
				if (key !== "id") {
					return { ...acc, [key]: obj[key] }
				}
				return acc
			}, {})
		}

		// all following expectations check the same - `id` attr should have been removed
		expect(stripId({
			id: 8492745921, firstname: "John", lastname: "Lennon"
		})).toEqual({
			firstname: "John", lastname: "Lennon"
		})

		expect(stripId(shoppingData[0])).toEqual({
			type: 'Clothes', name: 'Socks', price: 1.00, qty: 5
		})

		expect(stripId(employees[0])).toEqual({
			"nationality": "DE",
			"name": "Earlene Hirthe",
			"email": "Aileen.Kunze1@hotmail.com",
			"phone": "629-959-7611 x2136",
			"address": {
				"city": "New Gottliebviewland",
				"street": "24235 Schmeler Ranch",
				"code": "48310-2670"
			},
			"joined": "2007-06-13T08:25:51.338Z",
			"salary": 8260,
			"bio": "Dolorum corporis aspernatur. Commodi tempore ea et. Est occaecati dolorem perspiciatis soluta ipsum quia. Mollitia consectetur non necessitatibus est expedita et corrupti provident. Ut doloremque minima repudiandae sapiente quia optio maxime et et.\n \rEst debitis minima occaecati molestiae corrupti praesentium sit tenetur qui. Non autem ad consequatur saepe. Enim dolor animi amet.\n \rSit sed occaecati necessitatibus. Sit quo blanditiis quidem earum dolorem similique sed omnis eveniet. Saepe ab voluptatem autem laborum.\n \rDoloribus tempora laboriosam sit repellendus quibusdam qui repellendus. Necessitatibus enim sit consequatur a. Distinctio dolor libero id ducimus laudantium ipsum magnam et. Autem commodi voluptate impedit modi. Ut rerum non aspernatur optio ut sunt.\n \rQuae asperiores quam placeat sit assumenda. Mollitia blanditiis eius maiores odio ab neque. Fugiat qui quam quia ab delectus aliquam et dolores. Doloremque accusamus ut. Laborum consequuntur sit nihil officia tempore harum."
		})
	})

	it('strip dynamic attribute from objects', () => {
		// define `stripKey` function here
		// same as above, but accepts the key as the 1st param (it's not hardcoded)
		// and the object itself as the 2nd param

		// OPTION 1: EASY, remove the attr, as long as the original one isn't affected
		// function stripKey(property:string,obj: {}) {
		// 	return Object.keys(obj).reduce((acc, key) => {
		// 		if (key !== property) {
		// 			return { ...acc, [key]: obj[key] }
		// 		}
		// 		return acc
		// 	}, {})
		// }

		// OPTION 2: use ES6 destructuring (tricky and a little crazy one)
		// hint: computed property ( attr ---> [attrExpr])
		function stripKey(property:string,obj) {
			let {[property]: removed, ...others} = obj
			return others
		}

		expect(stripKey('firstname', {
			id: 8492745921, firstname: "John", lastname: "Lennon"
		})).toEqual({
			id: 8492745921, lastname: "Lennon"
		})

		expect(stripKey('qty',
			stripKey('price', shoppingData[0]))).toEqual({
				type: 'Clothes', name: 'Socks', id: 421801449988
			})
	})
})
