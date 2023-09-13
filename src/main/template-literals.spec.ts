describe('Template literals', () => {

  it('should support string interpolation', () => {
    const personPL: { name: string; friends: string[]; } = {
      name: 'Jarosław',
      friends: ['Antoni', 'Andrzej', 'Krystyna', 'Wiktor']
    }
    const personEN: { name: string; friends: string[]; } = {
      name: 'Darren',
      friends: ['Greg', 'Sebastian', 'Chloe']
    }
    // construct an arrow function using template literal string interpolation
    const friendsStr = (person: { name: string; friends: string[]; }) => {
      return `${person.name} has ${person.friends.length} friends: ${person.friends.join(', ')}`
    }

    expect(friendsStr(personPL)).toBe(
      'Jarosław has 4 friends: Antoni, Andrzej, Krystyna, Wiktor'
    )
    expect(friendsStr(personEN)).toBe(
      'Darren has 3 friends: Greg, Sebastian, Chloe'
    )
  })

  it('should support multi-line strings', () => {
    // construct a string with multiple lines without needing escaped newline characters
    const multiLine:string = `
    Oh
    my
    dear
    so much fun!`

    expect(multiLine).toBe('\n    Oh\n    my\n    dear\n    so much fun!')
  })

  it('should support string escaping', () => {
    // escape a string in a template literal for each of these
    let escapedString1:string = 'Hi\nthere!'
    let escapedString2:string = 'This is `escaped` backtics'
    expect(escapedString1).toBe('Hi\nthere!')
    expect(escapedString2).toBe('This is `escaped` backtics')
  })

  // you likely wont often use tagging, but it can be handy!
  it('should call the tagging function', () => {
    const noun:string = 'World'
    const emotion:string = 'happy'
    const hello:string = tagIt`Hello ${noun}! Are you feeling ${emotion} today?`
    expect(hello).toBe('Hello dear World! Are you feeling really happy today?')

    const name:string = 'John'
    const action:string = 'take a seat'
    const result:string = tagIt`Welcome ${name}, feel comfortable and ${action}!`
    expect(result).toBe('Welcome dear John, feel comfortable and really take a seat!')

    function tagIt(literalString:any, ...interpolatedParts:string[]):string {
      // implement this function to make the test pass      
      return `${literalString[0]}dear ${interpolatedParts[0]}${literalString[1]}really ${interpolatedParts[1]}${literalString[2]}`
    }
  })

  it('can be curried', () => {
    // Using tagged template strings, write journey function
    // that will accept following 3 template strings
    // and return a string describing the journey
    const journey = first => second => third => `${first}, then ${second} and finally ${third}!`;

    expect(journey`Warsaw` `Poznan` `Berlin`).toBe('Warsaw, then Poznan and finally Berlin!')
    expect(journey`Poland` `Czech` `Austria`).toBe('Poland, then Czech and finally Austria!')
    expect(journey`Europe` `Asia` `Australia`).toBe('Europe, then Asia and finally Australia!')
  })

})
