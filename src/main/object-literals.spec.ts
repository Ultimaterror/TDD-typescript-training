type Beatle = {
  type:"Musician"
  name:string
  dead:boolean
  wantsToPlayWith(target:Beatle):string
}

describe('enhanced object literals', () => {

  it('can use shorthand for property names', () => {

    function createBeatle(name:string, dead: boolean):Beatle {
      // Using NEW Object Literal Syntax, return a literal that will allow the tests to pass
      return {
        type: 'Musician',
        // - in ES5 you'd do:
        // name: name,
        // dead: dead,
        // wantsToPlayWith: function (target){
        //   return `${this.name} wants to play with ${target.name} ${target.dead ? 'but he is' : 'and he is not'} dead`;
        // }
        // - do that in ES6 !
        name,
        dead,
        wantsToPlayWith (target) {
          return `${this.name} wants to play with ${target.name} ${target.dead ? 'but he is' : 'and he is not'} dead`;
        }
      }
    }

    const john = createBeatle('John', true)
    const paul = createBeatle('Paul', false)
    const george = createBeatle('George', false)

    expect(paul.name).toBe('Paul')
    expect(john.dead).toBe(true)
    expect(george.type).toBe('Musician')
    expect(paul.wantsToPlayWith(john)).toBe('Paul wants to play with John but he is dead')
    expect(paul.wantsToPlayWith(george)).toBe('Paul wants to play with George and he is not dead')
  })
})
