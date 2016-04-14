# fix-until
A simple javascript lib that fixes elements on scroll, until they reach the respective desired element

# Usage
- Download the script here: https://github.com/Stefuu/fix-until/blob/master/fix-until.js
- Insert the script into your page head tag
- Create an instance of Fixuntil as the following:

With simple element-target pairs
The element .myDiv will stop at the element .myDivTarget and so on

```javascript
var pairsA = new Fixuntil({ 
		"elements" : ['.myDiv','.myHeader'], 
		"targets" : ['.myDivTarget','.myHeaderTarget'] 
	});


```

With multiple possible targets to an element
The element .el1 will stop at the element .el3, if it exists, and will stop at the element .el4 if .el3 does not exists, .el2 will stop at el .el7

```javascript
	var pairsB = new Fixuntil({ 
			"elements" : [
							'.el1',
							'.el2'
						], 
			"targets" : [
							['.el3','.el4'],
							'.el7'
						]
		});
```