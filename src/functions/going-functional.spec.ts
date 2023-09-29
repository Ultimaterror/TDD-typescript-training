// /// <reference path="../../data/data.ts" />
import { db } from "../../data/data"

describe('Functional Programming', function () {

	describe('always function', function () {
		it('returns the same value no matter the arguments', function () {
			// write the `always` closure function below which,
			// once accepted an argument (while creating the closure),
			// will always return it from that moment, no matter what
			// arguments will be passed later (while using the closure) 

			// function always
			function always(origin: any) {
				return function never(...others:any[]) {
					return origin
				}
			}

			let always5 = always(5);
			expect(always5()).toEqual(5);
			expect(always5(3)).toEqual(5);
			expect(always5(1, 2, 3)).toEqual(5);
			let alwaysJack = always({ name: "Jack" });
			expect(alwaysJack()).toEqual({ name: "Jack" });
			expect(alwaysJack(false)).toEqual({ name: "Jack" });
			expect(alwaysJack({ name: "Ben" })).toEqual({ name: "Jack" });
		});
	});

	describe('unary function', function () {
		it('can override arguments passed down to a function', function () {
			// introduction
			// we saw that following code doesn't behave as expected:
			//   ['1', '2', '3'].map(parseInt);
			//   ['10', '10', '10', '10'].map(parseInt);
			// the problem here is that parseInt accepts 2 parameters and map passes 3 arguments,
			// the first argument pair (the value) is fine, but the second one (the radix) breaks the computation

			// write the `unary` closure function below, which wraps a given function
			// and executes is beneath passing only one parameters
			// Example:
			// console.log('hello', 'beautiful', 'world') -> 'hello', 'beautiful', 'world'
			// unaryLog = unary(console.log)
			// unaryLog('hello', 'beautiful', 'world') -> 'hello'

			// function unary
			function unary(callback:Function) {
				return function (param: any) {
					return callback(param)
				}
			}

			let unaryParseInt = unary(parseInt);
			expect(parseInt('10', 2)).toEqual(2);
			expect(unaryParseInt('10', 2)).toEqual(10);
			expect(['1', '2', '3'].map(parseInt)).toEqual([1, NaN, NaN]);
			expect(['1', '2', '3'].map(unaryParseInt)).toEqual([1, 2, 3]);
			expect(['10', '10', '10', '10'].map(parseInt)).toEqual([10, NaN, 2, 3]);
			expect(['10', '10', '10', '10'].map(unaryParseInt)).toEqual([10, 10, 10, 10]);
		});
	});

	describe('compose function', function () {
		it('can execute sequence of 2 operations as a new reusable function', function () {
			// often we nest function calls like this: a(b(c(d(x))))
			// which become less readable the more steps there are
			// the output of 'd' is passed as input of 'c', its output becomes input of 'b' and so on

			// write the `compose` closure function below, which wraps two functions
			// each time the new function is called, the sequence of operations is called

			// function compose
			function compose(callback1:Function, callback2:Function) {
				return function (param: number) {
					return callback2(callback1(param))
				}
			}

			let roundedSquareRoot = compose(Math.sqrt, Math.round);
			expect(roundedSquareRoot(4)).toEqual(2);
			expect(roundedSquareRoot(12.5)).toEqual(4);
			expect(roundedSquareRoot(197.25)).toEqual(14);
			expect(roundedSquareRoot(1852.5)).toEqual(43);
			expect(roundedSquareRoot(-1852.8)).toBeNaN();
		});

		it('can execute sequence of N operations as a new reusable function', function () {
			// same as above, but 'compose' accepts N function parameters
			// watch out for the functions order:  compose(f, g)(x) -> f(g(x))

			// function compose
			function compose(...callbacks:Function[]) {
				return function (name:string) {
					let res = name
					for (let index = callbacks.length - 1; index >= 0; index--) {
						res = callbacks[index](res);
					}
					return res
				}
			}

			let appendMr = function (str) { return "Mr. " + str; };
			let appendJr = function (str) { return str + " Jr"; };
			let appendThird = function (str) { return str + " III"; };
			let appendTheMad = function (str) { return str + " the Mad"; };
			let appendDukeOfEscobar = function (str) { return str + ", Duke of Escobar"; };
			let thirdTheMadDukeOfEscobar = compose(appendDukeOfEscobar, appendTheMad, appendThird);
			expect(thirdTheMadDukeOfEscobar("John Lennon")).toEqual("John Lennon III the Mad, Duke of Escobar");
			expect(thirdTheMadDukeOfEscobar("Paul McCartney")).toEqual("Paul McCartney III the Mad, Duke of Escobar");
			let mrJrTheThird = compose(appendMr, appendThird, appendJr);
			expect(mrJrTheThird("John Lennon")).toEqual("Mr. John Lennon Jr III");
			expect(mrJrTheThird("Paul McCartney")).toEqual("Mr. Paul McCartney Jr III");
		});

		it('can be used for complex data processing', function () {
			let employees = db.getEmployees();

			// write 'sum' function that, given a list of numbers, calculates its sum

			// function sum
			function sum(params:number[]) {
				return params.reduce((acc: number, curr: number) => acc + curr, 0)
			}

			expect(sum([1, 2, 3, 4])).toEqual(10);
			expect(sum([1, 2, 3, 4, 5])).toEqual(15);

			// write 'getEmployeesByNationality' closure function
			// it accepts the nationality to filter by
			// and returns a function that, given employees list, returns employees fltered by nationality

			// function getEmployeesByNationality
			function getEmployeesByNationality(nat:string) {
				return function (arr:any[]) {
					return arr.filter(el => el.nationality === nat)
				}
			}

			expect(typeof getEmployeesByNationality).toEqual("function");
			expect(getEmployeesByNationality.length).toEqual(1);

			let getDEEmployees = getEmployeesByNationality('DE');
			expect(typeof getDEEmployees).toEqual("function");
			expect(getDEEmployees.length).toEqual(1);
			expect(getDEEmployees(employees).length).toEqual(62);

			let getUKEmployees = getEmployeesByNationality('UK');
			expect(typeof getUKEmployees).toEqual("function");
			expect(getUKEmployees.length).toEqual(1);
			expect(getUKEmployees(employees).length).toEqual(40);

			// write 'half' function that returns half of a number

			// function half
			function half(num:number) {
				return num / 2
			}

			expect(half(10)).toEqual(5);
			expect(half(1234)).toEqual(617);

			// write 'getSalaries' function that, given employees list,
			// will return a list of their salary attribute values list

			// function getSalaries
			function getSalaries(arr:any[]) {
				return arr.map(el => el.salary)
			}

			expect(getSalaries([{ salary: 125 }, { salary: 345 }])).toEqual([125, 345]);

			// reuse n-arg compose function

			// function compose
			function compose(...callbacks:Function[]) {
				return function (arr:any[]) {
					let res = arr
					for (let index = callbacks.length - 1; index >= 0; index--) {
						res = callbacks[index](res);
					}
					return res
				}
			}

			// use function composition to: get (1) half of (2) the sum of (3) all salaries of (4) only DE employees
			let halfDESalary = compose(half, sum, getSalaries, getDEEmployees);
			expect(halfDESalary(employees)).toEqual(167455);

			// use function composition to: get (1) the sum of (2) all salaries of (3) only UK employees
			let fullUKSalary = compose(sum, getSalaries, getUKEmployees);
			expect(fullUKSalary(employees)).toEqual(213080);

		});
	});

	describe('method function', function () {

		let dog = {
			name: "Fluffy",
			hello: function () {
				return "bark, bark, " + this.name;
			}
		};

		let john = {
			name: "John Lennon",
			hello: function () {
				return "Hi, I'm " + this.name;
			}
		};

		let machine = {
			name: "ZX Spectrum",
			hello: function () {
				return 'PRINT "' + this.name + ' here"';
			}
		};

		it('can invoke a certain method on whatever object you pass', function () {
			// introduction: given an object, you can call any method or access any attribute
			// imagine you'd be given a method that you can call on any object you are passed

			// write the `method` closure function below
			// it somehow inverts calling an object method, instead of object.method, it's method(object)
			// in the 1st step, method name shall be given
			// in the 2nd step, you pass the object upon which the method (above) should be executed

			// function method
			function method(fName:string) {
				return function (obj:Object) {
					return obj[fName]()
				}
			}

			let hello = method("hello");
			expect(hello(dog)).toEqual("bark, bark, Fluffy");
			expect(hello(john)).toEqual("Hi, I'm John Lennon");
			expect(hello(machine)).toEqual('PRINT "ZX Spectrum here"');
		});
	});

});
