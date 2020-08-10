https://stackoverflow.com/questions/25421233/javascript-removing-undefined-fields-from-an-object

import { pickBy, identity } from 'lodash'

Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});
// Or use short-circuit evaluation instead of ternary: (@Matt Langlois, thanks for the info!)

Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])





const cleanedObject = pickBy(originalObject, identity)
// Note that the identity function is just x => x and its result will be false for all falsy values. So this removes undefined, "", 0, null, ...

// If you only want the undefined values removed you can do this:

const cleanedObject = pickBy(originalObject, v => v !== undefined)