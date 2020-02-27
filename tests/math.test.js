const {calculateTip,fahrenheitToCelsius,celsiusToFahrenheit,add} = require('../src/math')
test('Should Calculate Total',()=>{
    const total = calculateTip(10,.3)

    expect(total).toBe(13)

})

test('Should Calculate Total With Default TIP',()=>{
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should Convert 32F to 0C',()=>{
    const convert = fahrenheitToCelsius(32)
    expect(convert).toBe(0)
})

test('Should Convert 0C to 32F',()=>{
    const convert = celsiusToFahrenheit(0)
    expect(convert).toBe(32)
})

// test('Async test demo',(done)=>{
//     setTimeout(()=>{
//         expect(1).toBe(2)
//         done()
//     },2000)
// })

test('Should Add two numbers',(done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await',async ()=>{
    const sum = await add(10,22)
    expect(sum).toBe(32)
})