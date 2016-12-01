String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/gi, "");
}

function isNumeric(v) {
	var ch;

	v = v.trim();
	
	if (v.length == 0)
		return false;
	
	for (i = 0; i < v.length; i++) {
		ch = v.charAt(i);
		if (!((ch >= '0') && (ch <= '9')))
			return false;
	}

	return true;
}

function getNowDateTime() {
	var d = new Date();
	var year, month, day, hour, minute, second;

	year = d.getFullYear();
	month = d.getMonth() + 1;
	day = d.getDate();

	hour = d.getHours();
	minute = d.getMinutes();
	second = d.getSeconds();

	if (month < 10)
		month = '0' + month;

	if (day < 10)
		day = '0' + day;

	if (hour < 10)
		hour = '0' + hour;

	if (minute < 10)
		minute = '0' + minute;

	if (second < 10)
		second = '0' + second;

	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

function inStr(search, charSearchFor) {
	var searchLen = String(charSearchFor).length;
	
	for (var i = 0; i < search.length; i++) {
		if (charSearchFor == mid(search, i, searchLen)) {   
			return i;   
		}   
	}   
	return -1;
}

function mid(str, start, len) {   
	if (start < 0 || len < 0) return "";

	var iEnd, iLen = String(str).length;
	
	if (start + len > iLen)   
			  iEnd = iLen;   
	else
		iEnd = start + len;
	
	return String(str).substring(start,iEnd);
}

function checkLevels(levels, siteCode) {
	if (inStr(levels, siteCode) < 0) {
		alert("관리 권한이 없습니다.");
		return false;
	}

	return true;
}