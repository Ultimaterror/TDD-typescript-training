import {customMatchers} from "../matchers"
/// <reference path="../matchers.ts" />


describe('Functional programming', function () {

	let list3 = [3, 6, 12, 24, 36, 39, 51, 63];
	let list5 = [5, 15, 30, 40, 45, 55, 105];

	it('simple operations on primitives collection', () => {
		// use .map function on arrays to make tests pass
		// define multiplyBy3 and multiplyBy5 functions
		// and use them along with .map

		// code should look like: collection.map(fn)

		let multiplyBy3 = function (num: number) {
			return num * 3
		};
		let multiplyBy5 = function (num: number) {
			return num * 5
		};;
		let list3times3 = list3.map(item => multiplyBy3(item));
		let list5times5 = list5.map(item => multiplyBy5(item));

		expect(typeof multiplyBy3).toEqual("function");
		expect(multiplyBy3.length).toEqual(1);
		expect(multiplyBy3(3)).toEqual(9);
		expect(typeof multiplyBy5).toEqual("function");
		expect(multiplyBy5.length).toEqual(1);
		expect(multiplyBy5(5)).toEqual(25);
		expect(list3times3).toEqual([9, 18, 36, 72, 108, 117, 153, 189]);
		expect(list5times5).toEqual([25, 75, 150, 200, 225, 275, 525]);

		// reuse functions from previous exercise

		// reuse multiplyBy3 and multiplyBy5 functions from above within .map
		// additionally, define isEven function that returns boolean whether a number is even
		// use it to filter only even numbers (remainder of dividing by 2 is 0) from result arrays

		// code should look like: collection.map(fn).filter(fn)

		let isEven = function (num: number) {
			return num % 2 === 0
		};
		let list3times3filteredEven = list3.map(item => multiplyBy3(item)).filter(item => isEven(item));
		let list5times5filteredEven = list5.map(item => multiplyBy5(item)).filter(item => isEven(item));

		expect(typeof isEven).toEqual("function");
		expect(isEven.length).toEqual(1);
		expect(isEven(2016)).toEqual(true);
		expect(isEven(2017)).toEqual(false);
		expect(list3times3filteredEven).toEqual([18, 36, 72, 108]);
		expect(list5times5filteredEven).toEqual([150, 200]);

		// again, reuse functions from previous exercise
		// reuse multiplyBy3, multiplyBy5 and isEven functions from above
		// additionally, define sum function that will reduce a list into a single value
		// use the sum function to sum the lists of multiplied-and-then-filtered elements

		// code should look like: collection.map(fn).filter(fn).reduce(fn)

		let sum = function (a: number, b: number) {
			return a + b
		};
		let list3times3filteredEvenSum = list3.map(item => multiplyBy3(item)).filter(item => isEven(item)).reduce(sum);
		let list5times5filteredEvenSum = list5.map(item => multiplyBy5(item)).filter(item => isEven(item)).reduce(sum);

		expect(typeof sum).toEqual("function");
		expect(sum.length).toEqual(2);
		expect(sum(2016, 2017)).toEqual(4033);
		expect(list3times3filteredEvenSum).toEqual(234);
		expect(list5times5filteredEvenSum).toEqual(350);
	});

	it('reverses lists', function () {
		// reverse both arrays
		// but be careful - don't alter original arrays!

		let list3reversed = list3.map(item => item).reverse();
		let list5reversed = list5.map(item => item).reverse();

		expect(list3reversed).toEqual([63, 51, 39, 36, 24, 12, 6, 3]);
		expect(list3).toEqual([3, 6, 12, 24, 36, 39, 51, 63]);
		expect(list5reversed).toEqual([105, 55, 45, 40, 30, 15, 5]);
		expect(list5).toEqual([5, 15, 30, 40, 45, 55, 105]);
	});

	it('sequentially processes calculations', () => {
		let numbers = [2, 3, 8, 1, 33, 76, 13, 32, 13];
		// given above list of numbers, perform following calculations
		// - take all numbers to the power of 3
		// - summarize all the new elements which are odd (not even)
		let result = numbers.map(item => Math.pow(item, 3)).filter(item => item % 2 !== 0).reduce((acc, cValue) => acc + cValue);

		expect(result).toEqual(40359);
	});

	it('picks a single element (where .find does not apply)', () => {
		let numbers = [{ "val": 2 }, { "val": 3 }, { "val": 8 }, { "val": 1 }, { "val": 33 }, { "val": 76 }, { "val": 13 }, { "val": 32 }, { "val": 13 }];
		// use .reduce to find maximal and minimal item from above array

		let maxValue = numbers.reduce((max, cValue) => max.val > cValue.val ? max : cValue);
		let minValue = numbers.reduce((min, cValue) => min.val < cValue.val ? min : cValue);


		expect(maxValue).toEqual({ val: 76 });
		expect(minValue).toEqual({ val: 1 });
	});

	describe('algorithms', () => {
		// CUSTOM MATCHERS DON'T WORK

		// beforeEach(() => {
		// 	jasmine.addMatchers(customMatchers);
		// });

		it('gimmePairs function', () => {
			// write function `gimmePairs` which accepts dynamic number of parameters
			// and returns an array of all possible pairs

			let gimmePairs = function(...nums:number[]){
				if (nums.length < 2) {
					return []
				}
				let res: number[][] = []
				for (let i = 0; i < nums.length - 1; i++) {
					for (let j = i + 1; j < nums.length; j++) {
						res.push([nums[i], nums[j]])
					}
				}
				return res.sort()
			};

			expect(gimmePairs(1)).toEqual([]);
			expect(gimmePairs(1, 2)).toEqual([[1, 2]].sort());
			expect(gimmePairs(1, 2, 3)).toEqual([[1, 2], [2, 3], [1, 3]].sort());
			expect(gimmePairs(1, 2, 3, 4)).toEqual([[1, 2], [2, 3], [3, 4], [1, 3], [2, 4], [1, 4]].sort());

			// expect(gimmePairs(1)).toEqualJSON([]);
			// expect(gimmePairs(1, 2)).toEqualJSON([[1, 2]]);
			// expect(gimmePairs(1, 2, 3)).toEqualJSON([[1, 2], [2, 3], [1, 3]]);
			// expect(gimmePairs(1, 2, 3, 4)).toEqualJSON([[1, 2], [2, 3], [3, 4], [1, 3], [2, 4], [1, 4]]);
		});
	});
});
