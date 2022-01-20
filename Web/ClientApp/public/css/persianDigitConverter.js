let input = document.getElementsByTagName('input');
let charMap = [
	{
		pattern: /\u0660/,
		replace: '0'
	},
	{
		pattern: /\u0661/,
		replace: '1'
	},
	{
		pattern: /\u0662/,
		replace: '2'
	},
	{
		pattern: /\u0663/,
		replace: '3'
	},
	{
		pattern: /\u0664/,
		replace: '4'
	},
	{
		pattern: /\u0665/,
		replace: '5'
	},
	{
		pattern: /\u0666/,
		replace: '6'
	},
	{
		pattern: /\u0667/,
		replace: '7'
	},
	{
		pattern: /\u0668/,
		replace: '8'
	},
	{
		pattern: /\u0669/,
		replace: '9'
	},

];

input.onkeyup = function (e) {
	console.log(e);
	for (let i = 0; i < charMap.length; i++) {
		input.value = input.value.replace(charMap[i].pattern, charMap[i].replace);
	}
}
