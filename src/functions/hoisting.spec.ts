describe('Hoisting', () => {

	var logMemory;
	function log(...args){
		logMemory = logMemory.concat(args);
	}

	beforeEach(() => {
		logMemory = [];
	});

	it('should create undefined before initialization', () => {
		log(a, b, c);
		var a = 1;
		var b;
		var c = 3;
		log(a, b, c);

		expect(logMemory).toEqual([undefined,undefined,undefined,1,undefined,3]);
	});

	it('should create variables per function memory frame', () => {
		var a;
		(function(){
			log(a);
			var a = 1;
			log(a);
		}());
		log(a);

		expect(logMemory).toEqual([undefined,1,undefined]);
	});

	describe('advanced usage', () => {

		it('last function declaration is available', () => {
			function foo(){
				function bar(){
					return 3;
				}
				return bar();
				function bar(){
					return 8;
				}
			}
			log(foo());

			expect(logMemory).toEqual([8]);
		});

		it('last already executed function expression is available', () => {
			function foo(){
				var bar = function(){
					return 3;
				};
				return bar();
				var bar = function(){
					return 8;
				};
			}
			log(foo());

			expect(logMemory).toEqual([3]);
		});

		it('last already executed function expression is available, executed with hoisting', () => {
			log(foo());
			function foo(){
				var bar = function(){
					return 3;
				};
				return bar();
				var bar = function(){
					return 8;
				};
			}

			expect(logMemory).toEqual([3]);
		});

		it('executing not initialized yet function will throw', () => {
			function foo(){
				return bar();
				var bar = function(){
					return 3;
				};
				var bar = function(){
					return 8;
				};
			}
	
			expect(foo).toEqual(foo);
		});
	});
});
