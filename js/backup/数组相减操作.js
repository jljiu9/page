const {addArrMethod} = require('../common.js')
let cl = u => console.log(u)
addArrMethod()
let hh = [44,5,44,44,47,48,49,'hj']
let hhh = [5,4,3,9,6]
// cl(hh.match_first(4))
// cl(hh.match_last(4))

// cl(hh.match(4))
// cl(hh.match_del(4))
// cl(hh.match_delAll(4))

// jj = hhh.map(x=>x*2)
// hh.map(x => hhh.remove(x))
// hh.match_del('j')
hh.replaceAll(44,8)
hh.remove(47)
// let str = hh.match_rtn(4)



console.log(hh)
// console.log(hhh)
// console.log(jj)