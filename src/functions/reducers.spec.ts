// IMPORTANT (!)
// use reducers in all tasks
// don't use FOR loops

describe('Reducers', () => {
	// this is a flat, ungrouped collection of shopping items
	const data = [
		{ type: 'Clothes', name: 'Socks', price: 1.00, qty: 5, id: 421801449988 },
		{ type: 'Clothes', name: 'Trousers', price: 3.90, qty: 2, id: 346859289079 },
		{ type: 'Clothes', name: 'Pajams', price: 4.80, qty: 1, id: 522050190541 },
		{ type: 'Clothes', name: 'Shoes', price: 23.00, qty: 2, id: 983521769712 },
		{ type: 'Music', name: 'David Bowie', price: 11.90, qty: 1, id: 833864689518 },
		{ type: 'Music', name: 'Rolling Stones', price: 8.95, qty: 1, id: 446941704202 },
		{ type: 'Music', name: 'ABBA', price: 9.90, qty: 1, id: 609551649329 },
		{ type: 'Food', name: 'Chips', price: 3.50, qty: 4, id: 206058323583 },
		{ type: 'Food', name: 'Fish', price: 8.75, qty: 2, id: 837318618873 },
		{ type: 'Food', name: 'Beer', price: 2.80, qty: 12, id: 611830716982 },
	];

	it('can accumulate a collection down to a single value', () => {
		// (!) FIND A BUG, fix it to make the test pass

		// calculate total cost of above shopping cart
		let totalPrice = data.reduce((total, item) => {
			return total += item.qty * item.price;
		}, 0);

		expect(totalPrice).toEqual(159.45);
	});

	it('can split one big collection into smaller grouped collections', () => {
		// group all items by type; each type should have its own sub-collection (array)
		// the top-level should be a key-value structure
		let groupedAggregate = data.reduce((res, item) => {
			res[item.type].push(item)
			return res;
		}, { Clothes: [], Music: [], Food: [] });

		expect(groupedAggregate.Clothes.length).toEqual(4);
		expect(groupedAggregate.Music.length).toEqual(3);
		expect(groupedAggregate.Food.length).toEqual(3);
	});

	it('can also apply calculations to grouped items', () => {
		// same as above, we'll group items by type
		// but instead of putting them in per-type arrays, we want to calculate
		// the total price (item price times quantity) of all products that belong to a group
		// the final result should state: for this group, the total price equals x
		let priceAggregate = data.reduce((res, item) => {
			res[item.type] += item.price * item.qty
			return res;
		}, { Clothes: 0, Music: 0, Food: 0 });;

		expect(priceAggregate.Clothes).toEqual(63.6);
		expect(priceAggregate.Music).toEqual(30.75);
		expect(priceAggregate.Food).toEqual(65.1);
	});

	it('can check if all predicates are truthy', () => {
		// all following functions have the same signature:
		// (number) -> boolean
		let isEven = n => n % 2 === 0;
		let isOdd = n => n % 2 === 1;
		let isGT10 = n => n > 10;
		let isLT1000 = n => n < 1000;
		let isBetween20And50 = n => n >= 20 && n <= 50;
		let isNegative = n => n < 0;

		// write the function `allTruthy` that will check if
		// 1. for a given value
		// 2. all predicates are truthy (all functions for this value return true) 

		// function allTruthy(value, predicates)...
		function allTruthy(value:number, predicates: Function[]) {
			return predicates.reduce((res, callback)=> callback(value) ? res : res = false,true)
		}

		expect(allTruthy(0, [isEven, isLT1000])).toBe(true);
		expect(allTruthy(25, [isOdd, isGT10, isNegative])).toBe(false);
		expect(allTruthy(32, [isOdd, isBetween20And50, isLT1000])).toBe(false);
		expect(allTruthy(-1, [isEven, isOdd, isNegative])).toBe(false);
		expect(allTruthy(-1, [isNegative])).toBe(true);
	});

	it('sequential processing via function pipe', () => {
		// start - is a starting value
		// operations - is a sequence of operations, output of step n is an input of step n+1
		// write the execute function which accepts function sequence and the starting value
		// and returns the value processed by piping via function sequence

		// don't use FOR loops

		// function execute...
		function execute(ops:Function[], value:number) {
			return ops.reduce((acc, callback)=>callback(acc),value)
		}

		var start = 2;
		var operations = [
			function (a) { return 8 * a - 10; },
			function (a) { return (a - 3) * (a - 3) * (a - 3); },
			function (a) { return a * a + 4; },
			function (a) { return a % 5; }
		];
		var result = execute(operations, start);
		expect(result).toEqual(3);

		var start = 5;
		var operations = [
			function (a) { return (a - 3) * (a - 3) * (a - 3); },
			function (a) { return 8 * a - 10; },
			function (a) { return a * a + 4; }
		];
		var result = execute(operations, start);
		expect(result).toEqual(2920);
	});
});
