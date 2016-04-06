# fix-until
A simple javascript lib that fixes elements on scroll, until they reach the respective desired element

# Usage
- Download the script here: https://github.com/Stefuu/fix-until/blob/master/fix-until.js
- Insert the script into your page head tag
- Create an instance of Fixuntil as the following:

```javascript
var pairs = new Fixuntil({ 
		"elements" : ['.myDiv','.myHeader'], 
		"targets" : ['.myDivTarget','.myHeaderTarget'] 
	});
```
