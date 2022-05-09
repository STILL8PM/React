(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PropTypes=f()}})(function(){var define,module,exports;return(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){'use strict';var printWarning=function(){};if("development"!=='production'){var ReactPropTypesSecret=require('./lib/ReactPropTypesSecret');var loggedTypeFailures={};var has=require('./lib/has');printWarning=function(text){var message='Warning: '+text;if(typeof console!=='undefined'){console.error(message);}
try{throw new Error(message);}catch(x){}};}
function checkPropTypes(typeSpecs,values,location,componentName,getStack){if("development"!=='production'){for(var typeSpecName in typeSpecs){if(has(typeSpecs,typeSpecName)){var error;try{if(typeof typeSpecs[typeSpecName]!=='function'){var err=Error((componentName||'React class')+': '+location+' type `'+typeSpecName+'` is invalid; '+
'it must be a function, usually from the `prop-types` package, but received `'+typeof typeSpecs[typeSpecName]+'`.'+
'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');err.name='Invariant Violation';throw err;}
error=typeSpecs[typeSpecName](values,typeSpecName,componentName,location,null,ReactPropTypesSecret);}catch(ex){error=ex;}
if(error&&!(error instanceof Error)){printWarning((componentName||'React class')+': type specification of '+
location+' `'+typeSpecName+'` is invalid; the type checker '+
'function must return `null` or an `Error` but returned a '+typeof error+'. '+
'You may have forgotten to pass an argument to the type checker '+
'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and '+
'shape all require an argument).');}
if(error instanceof Error&&!(error.message in loggedTypeFailures)){loggedTypeFailures[error.message]=true;var stack=getStack?getStack():'';printWarning('Failed '+location+' type: '+error.message+(stack!=null?stack:''));}}}}}
checkPropTypes.resetWarningCache=function(){if("development"!=='production'){loggedTypeFailures={};}}
module.exports=checkPropTypes;},{"./lib/ReactPropTypesSecret":5,"./lib/has":6}],2:[function(require,module,exports){'use strict';var ReactPropTypesSecret=require('./lib/ReactPropTypesSecret');function emptyFunction(){}
function emptyFunctionWithReset(){}
emptyFunctionWithReset.resetWarningCache=emptyFunction;module.exports=function(){function shim(props,propName,componentName,location,propFullName,secret){if(secret===ReactPropTypesSecret){return;}
var err=new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. '+
'Use PropTypes.checkPropTypes() to call them. '+
'Read more at http://fb.me/use-check-prop-types');err.name='Invariant Violation';throw err;};shim.isRequired=shim;function getShim(){return shim;};var ReactPropTypes={array:shim,bigint:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};ReactPropTypes.PropTypes=ReactPropTypes;return ReactPropTypes;};},{"./lib/ReactPropTypesSecret":5}],3:[function(require,module,exports){'use strict';var ReactIs=require('react-is');var assign=require('object-assign');var ReactPropTypesSecret=require('./lib/ReactPropTypesSecret');var has=require('./lib/has');var checkPropTypes=require('./checkPropTypes');var printWarning=function(){};if("development"!=='production'){printWarning=function(text){var message='Warning: '+text;if(typeof console!=='undefined'){console.error(message);}
try{throw new Error(message);}catch(x){}};}
function emptyFunctionThatReturnsNull(){return null;}
module.exports=function(isValidElement,throwOnDirectAccess){var ITERATOR_SYMBOL=typeof Symbol==='function'&&Symbol.iterator;var FAUX_ITERATOR_SYMBOL='@@iterator';function getIteratorFn(maybeIterable){var iteratorFn=maybeIterable&&(ITERATOR_SYMBOL&&maybeIterable[ITERATOR_SYMBOL]||maybeIterable[FAUX_ITERATOR_SYMBOL]);if(typeof iteratorFn==='function'){return iteratorFn;}}
var ANONYMOUS='<<anonymous>>';var ReactPropTypes={array:createPrimitiveTypeChecker('array'),bigint:createPrimitiveTypeChecker('bigint'),bool:createPrimitiveTypeChecker('boolean'),func:createPrimitiveTypeChecker('function'),number:createPrimitiveTypeChecker('number'),object:createPrimitiveTypeChecker('object'),string:createPrimitiveTypeChecker('string'),symbol:createPrimitiveTypeChecker('symbol'),any:createAnyTypeChecker(),arrayOf:createArrayOfTypeChecker,element:createElementTypeChecker(),elementType:createElementTypeTypeChecker(),instanceOf:createInstanceTypeChecker,node:createNodeChecker(),objectOf:createObjectOfTypeChecker,oneOf:createEnumTypeChecker,oneOfType:createUnionTypeChecker,shape:createShapeTypeChecker,exact:createStrictShapeTypeChecker,};function is(x,y){if(x===y){return x!==0||1/x===1/y;}else{return x!==x&&y!==y;}}
function PropTypeError(message,data){this.message=message;this.data=data&&typeof data==='object'?data:{};this.stack='';}
PropTypeError.prototype=Error.prototype;function createChainableTypeChecker(validate){if("development"!=='production'){var manualPropTypeCallCache={};var manualPropTypeWarningCount=0;}
function checkType(isRequired,props,propName,componentName,location,propFullName,secret){componentName=componentName||ANONYMOUS;propFullName=propFullName||propName;if(secret!==ReactPropTypesSecret){if(throwOnDirectAccess){var err=new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. '+
'Use `PropTypes.checkPropTypes()` to call them. '+
'Read more at http://fb.me/use-check-prop-types');err.name='Invariant Violation';throw err;}else if("development"!=='production'&&typeof console!=='undefined'){var cacheKey=componentName+':'+propName;if(!manualPropTypeCallCache[cacheKey]&&manualPropTypeWarningCount<3){printWarning('You are manually calling a React.PropTypes validation '+
'function for the `'+propFullName+'` prop on `'+componentName+'`. This is deprecated '+
'and will throw in the standalone `prop-types` package. '+
'You may be seeing this warning due to a third-party PropTypes '+
'library. See https://fb.me/react-warning-dont-call-proptypes '+'for details.');manualPropTypeCallCache[cacheKey]=true;manualPropTypeWarningCount++;}}}
if(props[propName]==null){if(isRequired){if(props[propName]===null){return new PropTypeError('The '+location+' `'+propFullName+'` is marked as required '+('in `'+componentName+'`, but its value is `null`.'));}
return new PropTypeError('The '+location+' `'+propFullName+'` is marked as required in '+('`'+componentName+'`, but its value is `undefined`.'));}
return null;}else{return validate(props,propName,componentName,location,propFullName);}}
var chainedCheckType=checkType.bind(null,false);chainedCheckType.isRequired=checkType.bind(null,true);return chainedCheckType;}
function createPrimitiveTypeChecker(expectedType){function validate(props,propName,componentName,location,propFullName,secret){var propValue=props[propName];var propType=getPropType(propValue);if(propType!==expectedType){var preciseType=getPreciseType(propValue);return new PropTypeError('Invalid '+location+' `'+propFullName+'` of type '+('`'+preciseType+'` supplied to `'+componentName+'`, expected ')+('`'+expectedType+'`.'),{expectedType:expectedType});}
return null;}
return createChainableTypeChecker(validate);}
function createAnyTypeChecker(){return createChainableTypeChecker(emptyFunctionThatReturnsNull);}
function createArrayOfTypeChecker(typeChecker){function validate(props,propName,componentName,location,propFullName){if(typeof typeChecker!=='function'){return new PropTypeError('Property `'+propFullName+'` of component `'+componentName+'` has invalid PropType notation inside arrayOf.');}
var propValue=props[propName];if(!Array.isArray(propValue)){var propType=getPropType(propValue);return new PropTypeError('Invalid '+location+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an array.'));}
for(var i=0;i<propValue.length;i++){var error=typeChecker(propValue,i,componentName,location,propFullName+'['+i+']',ReactPropTypesSecret);if(error instanceof Error){return error;}}
return null;}
return createChainableTypeChecker(validate);}
function createElementTypeChecker(){function validate(props,propName,componentName,location,propFullName){var propValue=props[propName];if(!isValidElement(propValue)){var propType=getPropType(propValue);return new PropTypeError('Invalid '+location+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected a single ReactElement.'));}
return null;}
return createChainableTypeChecker(validate);}
function createElementTypeTypeChecker(){function validate(props,propName,componentName,location,propFullName){var propValue=props[propName];if(!ReactIs.isValidElementType(propValue)){var propType=getPropType(propValue);return new PropTypeError('Invalid '+location+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected a single ReactElement type.'));}
return null;}
return createChainableTypeChecker(validate);}
function createInstanceTypeChecker(expectedClass){function validate(props,propName,componentName,location,propFullName){if(!(props[propName]instanceof expectedClass)){var expectedClassName=expectedClass.name||ANONYMOUS;var actualClassName=getClassName(props[propName]);return new PropTypeError('Invalid '+location+' `'+propFullName+'` of type '+('`'+actualClassName+'` supplied to `'+componentName+'`, expected ')+('instance of `'+expectedClassName+'`.'));}
return null;}
return createChainableTypeChecker(validate);}
function createEnumTypeChecker(expectedValues){if(!Array.isArray(expectedValues)){if("development"!=='production'){if(arguments.length>1){printWarning('Invalid arguments supplied to oneOf, expected an array, got '+arguments.length+' arguments. '+
'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');}else{printWarning('Invalid argument supplied to oneOf, expected an array.');}}
return emptyFunctionThatReturnsNull;}
function validate(props,propName,componentName,location,propFullName){var propValue=props[propName];for(var i=0;i<expectedValues.length;i++){if(is(propValue,expectedValues[i])){return null;}}
var valuesString=JSON.stringify(expectedValues,function replacer(key,value){var type=getPreciseType(value);if(type==='symbol'){return String(value);}
return value;});return new PropTypeError('Invalid '+location+' `'+propFullName+'` of value `'+String(propValue)+'` '+('supplied to `'+componentName+'`, expected one of '+valuesString+'.'));}
return createChainableTypeChecker(validate);}
function createObjectOfTypeChecker(typeChecker){function validate(props,propName,componentName,location,propFullName){if(typeof typeChecker!=='function'){return new PropTypeError('Property `'+propFullName+'` of component `'+componentName+'` has invalid PropType notation inside objectOf.');}
var propValue=props[propName];var propType=getPropType(propValue);if(propType!=='object'){return new PropTypeError('Invalid '+location+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an object.'));}
for(var key in propValue){if(has(propValue,key)){var error=typeChecker(propValue,key,componentName,location,propFullName+'.'+key,ReactPropTypesSecret);if(error instanceof Error){return error;}}}
return null;}
return createChainableTypeChecker(validate);}
function createUnionTypeChecker(arrayOfTypeCheckers){if(!Array.isArray(arrayOfTypeCheckers)){"development"!=='production'?printWarning('Invalid argument supplied to oneOfType, expected an instance of array.'):void 0;return emptyFunctionThatReturnsNull;}
for(var i=0;i<arrayOfTypeCheckers.length;i++){var checker=arrayOfTypeCheckers[i];if(typeof checker!=='function'){printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but '+
'received '+getPostfixForTypeWarning(checker)+' at index '+i+'.');return emptyFunctionThatReturnsNull;}}
function validate(props,propName,componentName,location,propFullName){var expectedTypes=[];for(var i=0;i<arrayOfTypeCheckers.length;i++){var checker=arrayOfTypeCheckers[i];var checkerResult=checker(props,propName,componentName,location,propFullName,ReactPropTypesSecret);if(checkerResult==null){return null;}
if(checkerResult.data.hasOwnProperty('expectedType')){expectedTypes.push(checkerResult.data.expectedType);}}
var expectedTypesMessage=(expectedTypes.length>0)?', expected one of type ['+expectedTypes.join(', ')+']':'';return new PropTypeError('Invalid '+location+' `'+propFullName+'` supplied to '+('`'+componentName+'`'+expectedTypesMessage+'.'));}
return createChainableTypeChecker(validate);}
function createNodeChecker(){function validate(props,propName,componentName,location,propFullName){if(!isNode(props[propName])){return new PropTypeError('Invalid '+location+' `'+propFullName+'` supplied to '+('`'+componentName+'`, expected a ReactNode.'));}
return null;}
return createChainableTypeChecker(validate);}
function invalidValidatorError(componentName,location,propFullName,key,type){return new PropTypeError((componentName||'React class')+': '+location+' type `'+propFullName+'.'+key+'` is invalid; '+
'it must be a function, usually from the `prop-types` package, but received `'+type+'`.');}
function createShapeTypeChecker(shapeTypes){function validate(props,propName,componentName,location,propFullName){var propValue=props[propName];var propType=getPropType(propValue);if(propType!=='object'){return new PropTypeError('Invalid '+location+' `'+propFullName+'` of type `'+propType+'` '+('supplied to `'+componentName+'`, expected `object`.'));}
for(var key in shapeTypes){var checker=shapeTypes[key];if(typeof checker!=='function'){return invalidValidatorError(componentName,location,propFullName,key,getPreciseType(checker));}
var error=checker(propValue,key,componentName,location,propFullName+'.'+key,ReactPropTypesSecret);if(error){return error;}}
return null;}
return createChainableTypeChecker(validate);}
function createStrictShapeTypeChecker(shapeTypes){function validate(props,propName,componentName,location,propFullName){var propValue=props[propName];var propType=getPropType(propValue);if(propType!=='object'){return new PropTypeError('Invalid '+location+' `'+propFullName+'` of type `'+propType+'` '+('supplied to `'+componentName+'`, expected `object`.'));}
var allKeys=assign({},props[propName],shapeTypes);for(var key in allKeys){var checker=shapeTypes[key];if(has(shapeTypes,key)&&typeof checker!=='function'){return invalidValidatorError(componentName,location,propFullName,key,getPreciseType(checker));}
if(!checker){return new PropTypeError('Invalid '+location+' `'+propFullName+'` key `'+key+'` supplied to `'+componentName+'`.'+
'\nBad object: '+JSON.stringify(props[propName],null,'  ')+
'\nValid keys: '+JSON.stringify(Object.keys(shapeTypes),null,'  '));}
var error=checker(propValue,key,componentName,location,propFullName+'.'+key,ReactPropTypesSecret);if(error){return error;}}
return null;}
return createChainableTypeChecker(validate);}
function isNode(propValue){switch(typeof propValue){case 'number':case 'string':case 'undefined':return true;case 'boolean':return!propValue;case 'object':if(Array.isArray(propValue)){return propValue.every(isNode);}
if(propValue===null||isValidElement(propValue)){return true;}
var iteratorFn=getIteratorFn(propValue);if(iteratorFn){var iterator=iteratorFn.call(propValue);var step;if(iteratorFn!==propValue.entries){while(!(step=iterator.next()).done){if(!isNode(step.value)){return false;}}}else{while(!(step=iterator.next()).done){var entry=step.value;if(entry){if(!isNode(entry[1])){return false;}}}}}else{return false;}
return true;default:return false;}}
function isSymbol(propType,propValue){if(propType==='symbol'){return true;}
if(!propValue){return false;}
if(propValue['@@toStringTag']==='Symbol'){return true;}
if(typeof Symbol==='function'&&propValue instanceof Symbol){return true;}
return false;}
function getPropType(propValue){var propType=typeof propValue;if(Array.isArray(propValue)){return 'array';}
if(propValue instanceof RegExp){return 'object';}
if(isSymbol(propType,propValue)){return 'symbol';}
return propType;}
function getPreciseType(propValue){if(typeof propValue==='undefined'||propValue===null){return ''+propValue;}
var propType=getPropType(propValue);if(propType==='object'){if(propValue instanceof Date){return 'date';}else if(propValue instanceof RegExp){return 'regexp';}}
return propType;}
function getPostfixForTypeWarning(value){var type=getPreciseType(value);switch(type){case 'array':case 'object':return 'an '+type;case 'boolean':case 'date':case 'regexp':return 'a '+type;default:return type;}}
function getClassName(propValue){if(!propValue.constructor||!propValue.constructor.name){return ANONYMOUS;}
return propValue.constructor.name;}
ReactPropTypes.checkPropTypes=checkPropTypes;ReactPropTypes.resetWarningCache=checkPropTypes.resetWarningCache;ReactPropTypes.PropTypes=ReactPropTypes;return ReactPropTypes;};},{"./checkPropTypes":1,"./lib/ReactPropTypesSecret":5,"./lib/has":6,"object-assign":7,"react-is":11}],4:[function(require,module,exports){if("development"!=='production'){var ReactIs=require('react-is');var throwOnDirectAccess=true;module.exports=require('./factoryWithTypeCheckers')(ReactIs.isElement,throwOnDirectAccess);}else{module.exports=require('./factoryWithThrowingShims')();}},{"./factoryWithThrowingShims":2,"./factoryWithTypeCheckers":3,"react-is":11}],5:[function(require,module,exports){'use strict';var ReactPropTypesSecret='SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';module.exports=ReactPropTypesSecret;},{}],6:[function(require,module,exports){module.exports=Function.call.bind(Object.prototype.hasOwnProperty);},{}],7:[function(require,module,exports){'use strict';var getOwnPropertySymbols=Object.getOwnPropertySymbols;var hasOwnProperty=Object.prototype.hasOwnProperty;var propIsEnumerable=Object.prototype.propertyIsEnumerable;function toObject(val){if(val===null||val===undefined){throw new TypeError('Object.assign cannot be called with null or undefined');}
return Object(val);}
function shouldUseNative(){try{if(!Object.assign){return false;}
var test1=new String('abc');test1[5]='de';if(Object.getOwnPropertyNames(test1)[0]==='5'){return false;}
var test2={};for(var i=0;i<10;i++){test2['_'+String.fromCharCode(i)]=i;}
var order2=Object.getOwnPropertyNames(test2).map(function(n){return test2[n];});if(order2.join('')!=='0123456789'){return false;}
var test3={};'abcdefghijklmnopqrst'.split('').forEach(function(letter){test3[letter]=letter;});if(Object.keys(Object.assign({},test3)).join('')!=='abcdefghijklmnopqrst'){return false;}
return true;}catch(err){return false;}}
module.exports=shouldUseNative()?Object.assign:function(target,source){var from;var to=toObject(target);var symbols;for(var s=1;s<arguments.length;s++){from=Object(arguments[s]);for(var key in from){if(hasOwnProperty.call(from,key)){to[key]=from[key];}}
if(getOwnPropertySymbols){symbols=getOwnPropertySymbols(from);for(var i=0;i<symbols.length;i++){if(propIsEnumerable.call(from,symbols[i])){to[symbols[i]]=from[symbols[i]];}}}}
return to;};},{}],8:[function(require,module,exports){var process=module.exports={};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}
function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}
(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}
try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}}())
function runTimeout(fun){if(cachedSetTimeout===setTimeout){return setTimeout(fun,0);}
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}
try{return cachedSetTimeout(fun,0);}catch(e){try{return cachedSetTimeout.call(null,fun,0);}catch(e){return cachedSetTimeout.call(this,fun,0);}}}
function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){return clearTimeout(marker);}
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}
try{return cachedClearTimeout(marker);}catch(e){try{return cachedClearTimeout.call(null,marker);}catch(e){return cachedClearTimeout.call(this,marker);}}}
var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}
draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}
if(queue.length){drainQueue();}}
function drainQueue(){if(draining){return;}
var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}
queueIndex=-1;len=queue.length;}
currentQueue=null;draining=false;runClearTimeout(timeout);}
process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}
queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};function Item(fun,array){this.fun=fun;this.array=array;}
Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';process.versions={};function noop(){}
process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[]}
process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return '/'};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],9:[function(require,module,exports){(function(process){(function(){'use strict';if(process.env.NODE_ENV!=="production"){(function(){'use strict';var hasSymbol=typeof Symbol==='function'&&Symbol.for;var REACT_ELEMENT_TYPE=hasSymbol?Symbol.for('react.element'):0xeac7;var REACT_PORTAL_TYPE=hasSymbol?Symbol.for('react.portal'):0xeaca;var REACT_FRAGMENT_TYPE=hasSymbol?Symbol.for('react.fragment'):0xeacb;var REACT_STRICT_MODE_TYPE=hasSymbol?Symbol.for('react.strict_mode'):0xeacc;var REACT_PROFILER_TYPE=hasSymbol?Symbol.for('react.profiler'):0xead2;var REACT_PROVIDER_TYPE=hasSymbol?Symbol.for('react.provider'):0xeacd;var REACT_CONTEXT_TYPE=hasSymbol?Symbol.for('react.context'):0xeace;var REACT_ASYNC_MODE_TYPE=hasSymbol?Symbol.for('react.async_mode'):0xeacf;var REACT_CONCURRENT_MODE_TYPE=hasSymbol?Symbol.for('react.concurrent_mode'):0xeacf;var REACT_FORWARD_REF_TYPE=hasSymbol?Symbol.for('react.forward_ref'):0xead0;var REACT_SUSPENSE_TYPE=hasSymbol?Symbol.for('react.suspense'):0xead1;var REACT_SUSPENSE_LIST_TYPE=hasSymbol?Symbol.for('react.suspense_list'):0xead8;var REACT_MEMO_TYPE=hasSymbol?Symbol.for('react.memo'):0xead3;var REACT_LAZY_TYPE=hasSymbol?Symbol.for('react.lazy'):0xead4;var REACT_BLOCK_TYPE=hasSymbol?Symbol.for('react.block'):0xead9;var REACT_FUNDAMENTAL_TYPE=hasSymbol?Symbol.for('react.fundamental'):0xead5;var REACT_RESPONDER_TYPE=hasSymbol?Symbol.for('react.responder'):0xead6;var REACT_SCOPE_TYPE=hasSymbol?Symbol.for('react.scope'):0xead7;function isValidElementType(type){return typeof type==='string'||typeof type==='function'||type===REACT_FRAGMENT_TYPE||type===REACT_CONCURRENT_MODE_TYPE||type===REACT_PROFILER_TYPE||type===REACT_STRICT_MODE_TYPE||type===REACT_SUSPENSE_TYPE||type===REACT_SUSPENSE_LIST_TYPE||typeof type==='object'&&type!==null&&(type.$$typeof===REACT_LAZY_TYPE||type.$$typeof===REACT_MEMO_TYPE||type.$$typeof===REACT_PROVIDER_TYPE||type.$$typeof===REACT_CONTEXT_TYPE||type.$$typeof===REACT_FORWARD_REF_TYPE||type.$$typeof===REACT_FUNDAMENTAL_TYPE||type.$$typeof===REACT_RESPONDER_TYPE||type.$$typeof===REACT_SCOPE_TYPE||type.$$typeof===REACT_BLOCK_TYPE);}
function typeOf(object){if(typeof object==='object'&&object!==null){var $$typeof=object.$$typeof;switch($$typeof){case REACT_ELEMENT_TYPE:var type=object.type;switch(type){case REACT_ASYNC_MODE_TYPE:case REACT_CONCURRENT_MODE_TYPE:case REACT_FRAGMENT_TYPE:case REACT_PROFILER_TYPE:case REACT_STRICT_MODE_TYPE:case REACT_SUSPENSE_TYPE:return type;default:var $$typeofType=type&&type.$$typeof;switch($$typeofType){case REACT_CONTEXT_TYPE:case REACT_FORWARD_REF_TYPE:case REACT_LAZY_TYPE:case REACT_MEMO_TYPE:case REACT_PROVIDER_TYPE:return $$typeofType;default:return $$typeof;}}
case REACT_PORTAL_TYPE:return $$typeof;}}
return undefined;}
var AsyncMode=REACT_ASYNC_MODE_TYPE;var ConcurrentMode=REACT_CONCURRENT_MODE_TYPE;var ContextConsumer=REACT_CONTEXT_TYPE;var ContextProvider=REACT_PROVIDER_TYPE;var Element=REACT_ELEMENT_TYPE;var ForwardRef=REACT_FORWARD_REF_TYPE;var Fragment=REACT_FRAGMENT_TYPE;var Lazy=REACT_LAZY_TYPE;var Memo=REACT_MEMO_TYPE;var Portal=REACT_PORTAL_TYPE;var Profiler=REACT_PROFILER_TYPE;var StrictMode=REACT_STRICT_MODE_TYPE;var Suspense=REACT_SUSPENSE_TYPE;var hasWarnedAboutDeprecatedIsAsyncMode=false;function isAsyncMode(object){{if(!hasWarnedAboutDeprecatedIsAsyncMode){hasWarnedAboutDeprecatedIsAsyncMode=true;console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, '+'and will be removed in React 17+. Update your code to use '+'ReactIs.isConcurrentMode() instead. It has the exact same API.');}}
return isConcurrentMode(object)||typeOf(object)===REACT_ASYNC_MODE_TYPE;}
function isConcurrentMode(object){return typeOf(object)===REACT_CONCURRENT_MODE_TYPE;}
function isContextConsumer(object){return typeOf(object)===REACT_CONTEXT_TYPE;}
function isContextProvider(object){return typeOf(object)===REACT_PROVIDER_TYPE;}
function isElement(object){return typeof object==='object'&&object!==null&&object.$$typeof===REACT_ELEMENT_TYPE;}
function isForwardRef(object){return typeOf(object)===REACT_FORWARD_REF_TYPE;}
function isFragment(object){return typeOf(object)===REACT_FRAGMENT_TYPE;}
function isLazy(object){return typeOf(object)===REACT_LAZY_TYPE;}
function isMemo(object){return typeOf(object)===REACT_MEMO_TYPE;}
function isPortal(object){return typeOf(object)===REACT_PORTAL_TYPE;}
function isProfiler(object){return typeOf(object)===REACT_PROFILER_TYPE;}
function isStrictMode(object){return typeOf(object)===REACT_STRICT_MODE_TYPE;}
function isSuspense(object){return typeOf(object)===REACT_SUSPENSE_TYPE;}
exports.AsyncMode=AsyncMode;exports.ConcurrentMode=ConcurrentMode;exports.ContextConsumer=ContextConsumer;exports.ContextProvider=ContextProvider;exports.Element=Element;exports.ForwardRef=ForwardRef;exports.Fragment=Fragment;exports.Lazy=Lazy;exports.Memo=Memo;exports.Portal=Portal;exports.Profiler=Profiler;exports.StrictMode=StrictMode;exports.Suspense=Suspense;exports.isAsyncMode=isAsyncMode;exports.isConcurrentMode=isConcurrentMode;exports.isContextConsumer=isContextConsumer;exports.isContextProvider=isContextProvider;exports.isElement=isElement;exports.isForwardRef=isForwardRef;exports.isFragment=isFragment;exports.isLazy=isLazy;exports.isMemo=isMemo;exports.isPortal=isPortal;exports.isProfiler=isProfiler;exports.isStrictMode=isStrictMode;exports.isSuspense=isSuspense;exports.isValidElementType=isValidElementType;exports.typeOf=typeOf;})();}}).call(this)}).call(this,require('_process'))},{"_process":8}],10:[function(require,module,exports){'use strict';var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;},{}],11:[function(require,module,exports){(function(process){(function(){'use strict';if(process.env.NODE_ENV==='production'){module.exports=require('./cjs/react-is.production.min.js.js');}else{module.exports=require('./cjs/react-is.development.js.js');}}).call(this)}).call(this,require('_process'))},{"./cjs/react-is.development.js":9,"./cjs/react-is.production.min.js":10,"_process":8}]},{},[4])(4)});