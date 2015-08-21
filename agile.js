/** UTILITY FUNCTIONS */

/**
 * Validates argument type and throws exception if needed
 * @arg any type
 * @type string - To be passed manually eg.: number, string, bulk(for multiple args)
 * @return string
 */

function typecheck(arg, type) {
	switch (type) {
		case 'string':
			if (!arg || typeof arg !== 'string') {
				throw "Data Type Error : Expecting string. Found " + typeof arg + '.';
			}
			break;

		case 'number':
			if (arg !== 0 && (!arg || typeof arg !== 'number')) {
				throw "Data Type Error : Expecting number. Found " + typeof arg + '.';
			}
			break;

		case 'bulk':
			if(!arg || !(arg instanceof Array)){
				throw "Data Type Error : Expecting Array. Found " + typeof arg + '.';
			}
			if(arg.length === 0){
				throw "The first argument supplied is an empty Array. Please supply array elements.";
			}

			for(i=0; i<arg.length; i++){
				if(arg[i].arg === undefined){
					throw "Missing Argument " + (i + 1) + '.';
				}else if(arg[i].expected === 'array'){
					if(!(arg[i].arg instanceof Array)){
						throw "Data Type Error : Expecting " + arg[i].expected + " for Argument " + (i+1) + ', but found ' + typeof arg[i].arg + ".";
					}	
				}else
				{
					if(typeof arg[i].arg !== arg[i].expected){
						throw "Data Type Error : Expecting " + arg[i].expected + " for Argument " + (i+1) + ', but found ' + typeof arg[i].arg + ".";
					}	
				}


			}
			break;
	}
}

/** STRING FUNCTIONS */

/**
 * Convert first letter to lower case of a string
 * @return string
 */
String.prototype.lcfirst = function() {
	var opStr = this.trim();
	return opStr.charAt(0).toLowerCase() + opStr.substr(1);
};


/**
 * Pad a string with the characters that are given as arguments
 * @padCh  	string
 * @padLen 	number - [Default 1]
 * @padMode string - 'LEFT', 'RIGHT', 'BOTH' [Default 1]
 * @return 	string
 */
String.prototype.strpad = function(padCh, padLen, padMode) {
	
	padLen = padLen || 1;
	padMode = padMode || "LEFT";

	typecheck([
		{
			arg: padCh,
			expected: 'string'
		},
		{
			arg: padLen,
			expected: 'number'
		},
		{
			arg: padMode,
			expected: 'string'
		}
	], 'bulk');
	
	if(!(padMode.toUpperCase() === 'LEFT' || padMode.toUpperCase() === 'RIGHT' || padMode.toUpperCase() === 'BOTH')){
		throw "Data Value Error: Expecting LEFT, RIGHT or BOTH for third argument. Found " + padMode + '.';
	}

	var result = this;

	if(padMode.toUpperCase() === 'LEFT' || padMode.toUpperCase() === 'BOTH'){
		result = padCh.repeat(padLen) + result;
	}

	if(padMode.toUpperCase() === 'RIGHT' || padMode.toUpperCase() === 'BOTH'){
		result = result + padCh.repeat(padLen);	
	}

	return result;
};

/**
 * Repeats a specific string till 'len' number of times
 * @param  number len - number of repetitions that user wants to have.
 * @return string 
 */
String.prototype.repeat = function(len){
	return Array(len+1).join(this);
};


/**
 * Upper case first letter of the word.
 * @return string String with uppercase first letter of word.
 */
String.prototype.ucwords = function() {

	var strArray = this.trim().split(' ');
	for (i = 0; i < strArray.length; i++) {
		strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1);
	}
	return strArray.join(" ");
};

/**
 * Convert special characters to HTML entities
 * @param  `string` The string being converted. 
 * @return `object` The converted string. 
 */

String.prototype.htmlspecialchars = function() {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};

	return this.replace(/[&<>"']/g, function(m) {
		return map[m];
	});

};

/** ARRAY FUNCTIONS */

/**
 * Get Unique elements from array
 * @return [array] Array of unique elements
 */
Array.prototype.unique = function() {
	var u = {},
		a = [],
		i;
	for (i = 0, l = this.length; i < l; ++i) {
		if (u.hasOwnProperty(this[i])) {
			continue;
		}
		a.push(this[i]);
		u[this[i]] = 1;
	}
	return a;
};

/**
 * If array has duplicate elements it will return true else false
 * @return {Boolean} 
 */
Array.prototype.has_duplicates = function() {
	var obj = {},
		i, status;
	for (i = 0, j = this.length; i < j; i++) {
		obj[this[i]] = (obj[this[i]] || 0) + 1;
	}

	for (var key in obj) {
		if (obj[key] > 1) {
			status = true;
			break;
		}
	}
	return status;
};

/**
 * If array has duplicate elements in specified key it will return true else false
 * @return {Boolean} 
 */
Array.prototype.has_duplicates_assoc = function(key) {

	typecheck(key, 'string');

	var obj = {},
		i, status = false,
		k;
	for (i = 0, j = this.length; i < j; i++) {
		obj[this[i][key]] = (obj[this[i][key]] || 0) + 1;
	}

	for (k in obj) {
		if (obj[k] > 1) {
			status = true;
			break;
		}
	}
	return status;
};

/**
 * Finds duplicates from one dimention array
 * @return `object` Duplicate elements containing their occurences
 */
Array.prototype.duplicates = function() {
	var obj = {},
		i;
	for (i = 0, j = this.length; i < j; i++) {
		obj[this[i]] = (obj[this[i]] || 0) + 1;
	}

	return obj;
};

/**
 * Finds duplicates from two dimention array based on key provided
 * @param  `string` key Used to find duplicates of same key
 * @return `object`     Duplicate elements containing their occurences
 */
Array.prototype.duplicates_assoc = function(key) {

	typecheck(key, 'string');

	if (!key) {
		throw "Please provide a key to find duplicates.";
	}
	var obj = {},
		i;
	for (i = 0, j = this.length; i < j; i++) {
		obj[this[i][key]] = (obj[this[i][key]] || 0) + 1;
	}
	return obj;
};