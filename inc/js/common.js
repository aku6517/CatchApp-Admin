/* Check Length */
function fnShowLength(obj, objId) {

	if (objId!=undefined && document.getElementById(objId)!=undefined) {
		document.getElementById(objId).innerText = obj.value.lengthB();
	}
}

String.prototype.lengthB = function(){ return (this.length+(escape(this)+'%u').match(/%u/g).length-1); }

function chkMaxLength(obj, len, str) {
	if (str!=undefined && str.lengthB()==0) str = "입력 내용";

	if (obj.value.lengthB() > len) {
		alert( str + "을(를) " + len + " Bytes 이내로 입력하세요.");
		obj.focus();
		return false;
	}
	return true;
}

// 파일 업로드
function fn_GoUpfile(FilePath,FormInputName){

	var url 			= "/Common/CommonPage/FileUploadPopup.asp?FilePath=" + FilePath + "&FormInputName=" +  FormInputName	;
	var sizeW 		= "450";
	var sizeH 		= "50";
	var isScroll 	= "0";
	var name 			= FormInputName;
	OpenWindow(url, name, sizeW, sizeH, isScroll)
}

// 파일 삭제
function fn_GoDelfile(FilePath, FileName){
	dynamicLog.src = "http://down.amway.co.kr/AbnAdminDownLoad/Inc/DelFile.asp?FileName=" + FileName + "&FilePath=" + FilePath;
	fn_AfterDelFile();
}

// 글 삭제시 파일 삭제
function fn_GoDelfile1(FilePath, FileName){
	dynamicLog.src = "http://down.amway.co.kr/AbnAdminDownLoad/Inc/DelFile.asp?FileName=" + FileName + "&FilePath=" + FilePath;
}

// 공백제거
function udf_Trim(keyword){ 
	var st_num; 
	st_num = keyword.indexOf(" ");
	while (st_num != -1){
		keyword = keyword.replace(" ","");
		st_num  = keyword.indexOf(" ");
	}
	return keyword;
}


// Null Cheak
function NullChk(str)
{
	for (var i=0;i<str.length;i++)
	{
		if (str.charAt(i) != ' ')
		break
	}
	if (i==str.length)
	return false
}
/**
 * 화면 사이즈를 조정함 : onLoad에 사용
 * 각각의 화면에 lfnInit()에서 호출.
 */
function setBodySize(){
	var clientHeight = document.body.clientHeight;
	if (clientHeight>70) {
		document.getElementById("divLayoutBody").style.height = parseInt(clientHeight) - 70;
	}
}

//플래시 불러오는 함수
function FlashMainbody(Ftrans,wid,hei) {
	mainbody = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='"+ wid +"' height='"+ hei +"'>";
	mainbody += "<param name='movie' value='"+ Ftrans +"'>";
	mainbody += "<param name='quality' value='high'>";
	mainbody += "<param name='wmode' value='transparent'>";
	mainbody += "<param name='menu' value='false'>";
	mainbody += "<embed src='"+ Ftrans +"' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='"+ wid +"' height='"+ hei +"'></embed>"
	mainbody += "</object>";

	//document.body.innerHTML = mainbody
	document.write(mainbody);
	return;
}

//flash(파일주소, 가로, 세로, 배경색, 윈도우모드, 변수, 경로)
function flash(url,w,h,bg,win,vars,base){
	var s=
	"<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='"+w+"' height='"+h+"' align='middle'>"+
	"<param name='allowScriptAccess' value='always' />"+
	"<param name='movie' value='"+url+"' />"+
	"<param name='wmode' value='"+win+"' />"+
	"<param name='menu' value='false' />"+
	"<param name='quality' value='high' />"+
	"<param name='FlashVars' value='"+vars+"' />"+
	"<param name='bgcolor' value='"+bg+"' />"+
	"<param name='base' value='"+base+"' />"+
	"<embed src='"+url+"' base='"+base+"' wmode='"+win+"' menu='false' quality='high' bgcolor='"+bg+"' width='"+w+"' height='"+h+"' align='middle' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />"+
	"</object>";
	document.write(s);
}

function flashMenu(url,width,height) { 
	document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+width+'" height="'+height+'" />');
    document.write('<param name="allowScriptAccess" value="sameDomain" />');
	document.write('<param name=movie value="'+url+'" />');
	//document.write('<param name=wmode value=opaque>');
	document.write('<param name=quality value=high />');
    document.write( "<param name=wmode value=transparent>");
	document.write('<embed src="'+url+'" quality=high allowScriptAccess="sameDomain" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+width+'" height="'+height+'">');
	document.write('</embed> ');
	document.write('</object>');
}

//팝업관련
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

//이미지 점선 안나오게	
function bluring(){ 
	if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus(); 
} 
document.onfocusin=bluring; 	
	
function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}


/**
 * 지정한 테이블만 인쇄
 */
function printDiv () {
  if (document.all && window.print) {
    window.onbeforeprint = beforeDivs;
    window.onafterprint = afterDivs;
    window.print();
  }
}
function beforeDivs () {
  if (document.all) {
    objContents.style.display = 'none';
    objSelection.innerHTML = document.all['d1'].innerHTML + document.all['d2'].innerHTML+ document.all['d3'].innerHTML;
  }
}
function afterDivs () {
  if (document.all) {
    objContents.style.display = 'block';
    objSelection.innerHTML = "";
  }
}


/**
 * 마우스 우클릭 막기
 */
/*
document.oncontextmenu = gfnNoMouseMenu;
function gfnNoMouseMenu() {
	event.cancelBubble = true;
	event.returnValue = false;
	return false;
}
*/

/**
 * ajax 객체 생성
 */
function createXMLHttpRequest() {
	if(window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	else if(window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}
}

function createAjaxObject() {
	var xmlHttp;
	if(window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	else if(window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}
	return xmlHttp;
}

function createXMLHttpRequestJSON(){  
	if( typeof XMLHttpRequest == "undefined" ) 
	XMLHttpRequest = function() {    
		try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") }catch(e) {}    
		try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") }catch(e) {}    
		try { return new ActiveXObject("Msxml2.XMLHTTP") }catch(e) {}    
		try { return new ActiveXObject("Microsoft.XMLHTTP") }catch(e) {}     
		throw new Error( "This browser does not support XMLHttpRequest." ) 
	}; 
	return new XMLHttpRequest();
}

/**
 * ajax 콤보 공통 콜백함수
 */
function commonCallback(ajaxObj, opt, selCode) {
	if(ajaxObj.readyState == 4) {
		if(ajaxObj.status == 200) {
			
			var root = ajaxObj.responseXML.getElementsByTagName("root")[0];
			if(root == null) {
				alert("서버 작업 중입니다.. 잠시후에 다시 시도해 주십시오.");
				return;
			}
			
			var comboName = root.getElementsByTagName("comboName")[0].firstChild.nodeValue;  //콤보박스명
			
			//콤보박스 clear
			clearCombo(document.getElementById(comboName));
			
			var list = root.getElementsByTagName("list");
			
			var index = 0;
			
			if(opt == "all") {
				document.getElementById(comboName).options[index] = new Option("전체", "", false, false);
				index++;
			}
			else if(opt == "sel") {
				document.getElementById(comboName).options[index] = new Option("선택", "", false, false);
				index++;
			}
			
			if(list.length > 0) {
				//document.getElementById(comboName).disabled = false;
				
				for(var i = 0; i < list.length; i++) {
					var data = list[i];
					var code = data.getElementsByTagName("code")[0].firstChild.nodeValue;
					var name = data.getElementsByTagName("name")[0].firstChild.nodeValue;
					
					document.getElementById(comboName).options[index] = new Option(name, code, false, false);
					
					/* 콤보박스 특정값 선택 */
					if ((isEmpty(selCode) == false) && (code == selCode)){
						document.getElementById(comboName).options[index].selected = true;
					}
					
					index++;
				}
			}
			else {
				clearCombo(document.getElementById(comboName));
				document.getElementById(comboName).options[0] = new Option("정보없음", "", false, false);
				//document.getElementById(comboName).disabled   = true;
			}
		}
		else {
			alert("서버 작업 중입니다. 잠시후에 다시 시도해 주십시오.");
			return;
		}
	}
	
	ajaxObj = null;
}

/**
 * 문자 변환
 */
function replaceAll(value, str1, str2) {
	if(value != null && str1 != null && str2 != null ) {
		while(value.indexOf(str1) > -1) {
			value = value.replace(str1, str2);
		}
	}
	return value;
}

/**
 * 문자 변환 \ -> \\
 */
function replaceAll2(value, str1, str2) {
	var tempValue = value;
	value = "";
	if(tempValue != null && str1 != null && str2 != null ) {
		while(tempValue.indexOf(str1) > -1) {
			var idx = tempValue.indexOf(str1);
			tempValue = tempValue.replace(str1, str2);
			value += tempValue.substring(0, idx+2);
			tempValue = tempValue.substring(idx+2);
		}
		value += tempValue;
	}
	return value;
}

/**
 * 문자열의 시작부분에서 공백을 제거합니다.
 */
String.prototype.Ltrim = function() {
	return this.replace(/(^\s*)/g, "");
}
/**
 * 문자열의 끝에서 공백을 제거합니다.
 */
String.prototype.Rtrim = function() {
	return this.replace(/(\s*$)/g, "");
}

/**
 * 문자열의 처음과 끝에 있는 공백을 제거합니다.
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 문자열이 특정 문자열로 시작되는지 체크합니다.
 */
String.prototype.startsWith = function(str) {
	if (this.substr(0,str.length)==str) return true;
	else return false;
}

/**
 * 문자열이 특정 문자열로 끝나는지 체크합니다.
 */
String.prototype.endsWith = function(str) {
	if (this.substr(this.length-str.length)==str) return true;
	else return false;
}

/**
 * 문자열의 왼쪽부터 지정한 수만큼의 문자열를 반환합니다.
 */
String.prototype.Left = function(len) {
	if (this==null || this=="") return this;
	var strLength=this.length;
	if (strLength<1 || len>=strLength) return this;
	else return this.substr(0,len);
}

/**
 * 문자열의 오른쪽부터 지정한 수만큼의 문자열를 반환합니다.
 */
String.prototype.Right = function(len) {
	if (this==null || this=="") return this;
	var strLength=this.length;
	if (len<=0 || len>=strLength) return this;
	else return this.substr(strLength-len);
}

/**
 *  한글을 포함한 문자열 길이 반환합니다.
 */
String.prototype.ByteLength = function() {
	var i,ch;
	var strLength = this.length;
	var count = 0;

	for(i=0;i<strLength;i++)
	{
		ch = escape(this.charAt(i));

		if(ch.length > 4)
			count += 2;
		else if(ch!='\r') 
			count++;
	}
	return count;
}

/**
 * 뉴라인을 HTML 라인 브레이크(<BR>)로 변환한다.
 */
String.prototype.Nl2Br = function() {
	return this.replace(/\r\n/g,"<br>");
}

/**
 * 스페이스를 HTML (&nbsp;)로 변환한다.
 */
String.prototype.Nl2Sp = function() {
	return this.replace(/\s/g,"&nbsp;");
}

/**
 * 일반 팝업
 */
function OpenWindow(url, name, sizeW, sizeH, isScroll) {
	var nLeft = screen.width/2 - sizeW/2 ; 
	var nTop  = screen.height/2 - sizeH/2 ; 
	var scrollstat = "no";
	
	if ( isScroll == 1 )  scrollstat = "yes";
	opt = ",toolbar=no,menubar=no,location=no,scrollbars="+scrollstat+",status=yes,resizable=yes"; 
  var win = window.open(url, name, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + opt ); 
	focus();
    win.focus();
    
	return win;
}

/**
 * form 전달 팝업
 */
function OpenWindowPost(url, frmObj, winName, sizeW, sizeH, scroll, resize) {
	var nLeft = screen.width/2 - sizeW/2 ;
	var nTop  = screen.height/2 - sizeH/2 ;
	nTop = 0;//위아래 중앙이 안되서 0 으로 주었음
	
	opt = ",toolbar=no,menubar=no,location=no,scrollbars="+scroll+",status=yes,resizable="+resize;
	var winObj = window.open('', winName, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + opt );
	
	frmObj.method = "post";
	frmObj.target = winName;
	frmObj.action = url;
	frmObj.submit();
	frmObj.target = "";
	return winObj;
}

/**
 * 모달 오픈 
 */
function openModal(url, width, height) {
	var opt = 'dialogWidth=' + width + 'px;dialogHeight=' + height + 'px;resizable=no;status=no;scroll=auto;help=no';
	//window.showModalDialog(url, window, opt);
	window.showModalDialog(url, '', opt);
}

/**
 * 모달 오픈 후 리로드
 */
function openModalReload(url, width, height) {
	var opt = 'dialogWidth=' + width + 'px;dialogHeight=' + height + 'px;resizable=no;status=no;scroll=auto;help=no';
	//window.showModalDialog(url, window, opt);
	var reLoadC = window.showModalDialog(url, '', opt);

	if( reLoadC == "Y" ){
		lfnReload();
	}
}

/**
 * 모달 오픈 - 파라미터전송 - scroll no
 */
function openModalParam(url, param, width, height) {
	var opt = 'dialogWidth=' + width + 'px;dialogHeight=' + height + 'px;resizable=no;status=no;scroll=no;help=no';
	window.showModalDialog(url, param, opt);
}

/**
 * 모달 오픈 - 파라미터전송 - scroll auto
 */
function openModalParamScroll(url, param, width, height) {
	var opt = 'dialogWidth=' + width + 'px;dialogHeight=' + height + 'px;resizable=no;status=no;scroll=auto;help=no';
	window.showModalDialog(url, param, opt);
}


/**
 * select 콤보박스 지우기
 */
function clearCombo(obj) { 
	obj.options.length = 0; 
}

/**
 * select 콤보박스 옵션 추가
 */
function addOpt(obj, text, value, flag) { 
	var newOpt = document.createElement('option'); 
	newOpt.text = text; 
	newOpt.value = value; 
	obj.add(newOpt, flag); 
}

/**
 * select 콤보박스 옵션 삭제
 */
function delOpt(obj, index) { 
    obj.options[index] = null;
} 

/**
 * select 콤보박스 세팅
 */
function initCombo(obj, arrVals) {
	if (eval(obj) == null) { 
		alert("Object cannot be null!"); 
		return; 
	}
	if (eval(arrVals) == null) { 
		alert("Value array for options cannot be null!"); 
		return; 
	}	
	
	obj.options.length = arrVals.length;
	
	for (var i = 0; i < arrVals.length; i++) {
		obj.options[i] = new Option(arrVals[i][0], arrVals[i][1], false, false);
	}
}

/**
 * form에 대한 모든 체크박스 해제(unchecked)
 */
function hasCheckbox(form) {
    for ( i = 0; i < form.length; i++ ) {
        if ( form[i].type == 'checkbox' ) {
        	form[i].checked = false;
        }
    }
    return;
}

/**
 * 실제길이 반환 (한글 2byte 계산)
 */
function getByteLength(s) {
	var len = 0;
	if (s == null) return 0;
	for(var i = 0; i < s.length; i++) {
		var c = escape(s.charAt(i));
		if (c.length == 1) len ++;
		else if (c.indexOf("%u") != -1) len += 2;
		else if (c.indexOf("%") != -1) len += c.length/3;
	}
	return len;
}

/**
 * 오라클의 LPAD 함수 기능
 */
function lpad(SourceString, Len, fillString) {
	var retString = String(SourceString);
	if(retString != "" && retString.length < Len) {
		for(var i = 0; i<Len; i++) {
			retString = fillString + retString; 
			if(retString.length == Len)	break;
		}
	}
	return(retString);
}

/**
 * 오라클의 RPAD 함수 기능
 */
function rpad(SourceString, Len, fillString) {
	var retString = SourceString;
	if(retString != "" && retString.length < Len) {
		for(var i=0; i<Len; i++) {
			retString += fillString; 
			if(retString.length == Len)	break;
		}
	}
	return(retString);	
}

/**
 * 빈값 검증
 */
function isEmpty(pValue) {
	if( (pValue == "") || (pValue == null) || (pValue == "undefined") ) {
	    return true;
	}
	return false;
}

/**
 * 숫자 검증
 */
function isNum(str) {
    if(isEmpty(str)) return false;

    for(var idx = 0; idx < str.length; idx++) {
        if(str.charAt(idx) < '0' || str.charAt(idx) > '9') {
            return false;
        }
    }
    return true;
}

function isNum2(str) {
    for(var idx = 0; idx < str.length; idx++) {
        if(str.charAt(idx) < '0' || str.charAt(idx) > '9') {
            return idx;
        }
    }
    return -1;
}
/**
 * 영문자 검증 
 */
function isAlpha(str) {
    if(isEmpty(str)) return false;

    for(var idx = 0; idx < str.length; idx++) {
        if(!((str.charAt(idx) >='a' && str <= 'z') || (str.charAt(idx) >= 'A' && str <= 'Z'))){
            return false;
        }
    }
    return true;
}

/**
 * 한글 검증 
 */
function isHangul(str) {
    if(isEmpty(str)) return false;
    
	for(var idx = 0; idx < str.length; idx++) {
		var c = escape(str.charAt(idx));
		if (c.indexOf("%u") == -1) {
			return false;
		}
	}
	return true;
}

/**
 * '-' 검증
 */
function isDash(str) {
    if(isEmpty(str)) return false;

    for(var idx = 0; idx < str.length; idx++) {
        if(!((str.charAt(idx) == '-'))){
            return false;
        }
    }
    return true;
}

/**
 * '.' 검증
 */
function isPoint(str) {
    if(isEmpty(str)) return false;

    for(var idx = 0; idx < str.length; idx++) {
        if(!((str.charAt(idx) == '.'))) {
            return false;
        }
    }
    return true;
}

/**
 * 숫자만 입력 - onKeyDown 이벤트
 * @param object
 * @return
 */
function onlyNumber(obj) {
	for(var i = 0; i<obj.value.length; i++) {
		var chr = obj.value.substr(i, 1);
		chr = escape(chr);
		var key_eg = chr.charAt(1);
		if(key_eg == "u") {
			var key_num = chr.substr(i, (chr.length-1));
			if((key_num < "AC00") || (key_num > "D7A3")) {
				event.returnValue = false;
			}
		}
	}
	
	if(event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 8 || event.keyCode == 9) {}
	else { event.returnValue = false; }
}

/**
 * 숫자만 입력 - onKeyUp 이벤트
 * @param object
 * @return
 */
function onlyNum(obj) {
    var pattern = /^[0-9]+$/;

	for(var i = 0; i<obj.value.length; i++) {
		var chr = obj.value.substr(i, 1);
		if(pattern.test(chr) || event.keyCode == 8) {}
		else {
			alert("숫자만 입력 가능합니다.");
			obj.value = obj.value.substr(0, i);
			obj.select();
		}
	}
}

/**
 * 숫자와 영문만 입력 - onKeyUp 이벤트
 * @param object
 * @return
 */
function onlyNumEng(obj) {
    var pattern = /^[0-9a-zA-Z]+$/;

	for(var i = 0; i<obj.value.length; i++) {
		var chr = obj.value.substr(i, 1);
		if(pattern.test(chr) || event.keyCode == 8) {}
		else {
			alert("숫자와 영문만 입력 가능합니다.");
			obj.value = obj.value.substr(0, i);
			obj.select();
		}
	}
}


/**
 * 현재 날짜 구하기
 * var a = getDayStamp();	//yyyy-mm-dd
 * var b = getDateStamp();	//yyyy-mm-dd hh:mi:ss
*/
function getDayStamp() {
	var d = new Date();
	var s = zeroFormated(d.getFullYear(),4) +'-'+
			zeroFormated(d.getMonth()+1,2) +'-'+
			zeroFormated(d.getDate(),2);
	return s;
}
function getDateStamp() {
	var d = new Date();
	var s = zeroFormated(d.getFullYear(),4) +'-'+
			zeroFormated(d.getMonth()+1,2) +'-'+
			zeroFormated(d.getDate(),2) +' '+
			zeroFormated(d.getHours(),2) +':'+
			zeroFormated(d.getMinutes(),2) +':'+
			zeroFormated(d.getSeconds(),2);
	return s;
}


//다음 날짜 계산
function getNextDayStamp() {
var d = new Date();
var e= new Date(d.setDate(d.getDate() + 1));
var s = zeroFormated(e.getFullYear(),4) +'-'+
		zeroFormated(e.getMonth()+1,2) +'-'+
		zeroFormated(e.getDate(),2);
return s;
}

//입력한 자릿수의 빈공간을 0으로 채운다.
function zeroFormated(n,digits) {
	var zero = '';
	n = n.toString();
	
	if(n.length<digits) {
		for (i=0;i<digits-n.length;i++)
			zero += '0';
	}
	return zero+n;
}

/**
 * 시작일과 종료일 일수 구하기
*/
function dateRange(val1, val2) { 
	// 년도, 월, 일로 분리 
	var start_dt = val1.split("-"); 
	var end_dt = val2.split("-"); 
	
	// 월 - 1(자바스크립트는 월이 0부터 시작하기 때문에...) 
	start_dt[1] = (Number(start_dt[1]) - 1) + ""; 
	end_dt[1] = (Number(end_dt[1]) - 1) + ""; 
	
	var from_dt = new Date(start_dt[0], start_dt[1], start_dt[2]); 
	var to_dt = new Date(end_dt[0], end_dt[1], end_dt[2]); 
	
	return (to_dt.getTime() - from_dt.getTime()) / 1000 / 60 / 60 / 24; 
}

/**
 * 개체의 상대적 top과 left 값을 구한다.
*/
function GetObjectTop(obj) {
    if (obj.offsetParent == document.body)
        return obj.offsetTop;
    else
        return obj.offsetTop + GetObjectTop(obj.offsetParent);
}
function GetObjectLeft(obj) {
    if (obj.offsetParent == document.body)
        return obj.offsetLeft;
    else
        return obj.offsetLeft + GetObjectLeft(obj.offsetParent);
}

/**
 * 조회 조건 체크박스의 value 값을 "Y / N"로 세팅한다.
*/
function setChkboxValue(obj) {
	if(obj.disabled) return "";
	else {
		if(obj.checked) return "Y";
		else return "N";
	}
}

/**
 * 그리드 체크박스의 value 값을 "Y / N"로 세팅한다.
*/
function setChkboxValueGrid(value) {
	if(value == "1") return "Y";
	else return "N";
}

/**
 * 라디온 버튼 value 값 가져오기
 */
function getRadioValue(obj) {
	for(var i = 0; i < obj.length; i++)
		if(obj[i].checked)
			return obj[i].value;
} 

/**
 * 잠시대기 sleep 기능 
 * 사용 방법 : wait(1000); <--- 1초!
*/
function wait(msecs) {
	var start = new Date().getTime();
	var cur = start;
	while(cur - start < msecs) {
		cur = new Date().getTime();
	}
}
function sleep(milliseconds) {
	var start = new Date().getTime();
	for(var i = 0; i < 1e7; i++) {
		if((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

/**
 * 합계에 대한 데이터 포맷을 설정한다.(3자리 단위로 ','표시)
*/
function priceFormat(price) {
	price = String(price);
	var data = price.split(".");

	var data1 = data[0];
	var data2 = data[1];

	if(data[1] == undefined){
		data2 = "";
	}else{
		data2 = "."+data2;
	}

	var priceStr    = data1 + "";
	var returnValue = "";
	
	for(var i = priceStr.length, j = 0; i > 0; i--, j++) {
		if(((i%3) % 2) > 0 && i != 1) 
			returnValue += priceStr.substring(j, j+1) + ",";
		else			  
			returnValue += priceStr.substring(j, j+1);
	}
	
	return returnValue+data2;
}

/**
 * 숫자에 대한 데이터 포맷을 설정한다.(3자리 단위로 ','표시)
*/
function addComma(n) {
	var reg = /(^[+-]?\d+)(\d{3})/;
	n += '';
	
	while (reg.test(n)) {
		n = n.replace(reg, '$1' + ',' + '$2');
	}
	return n;
} 


/**
 * column 의 cell value 들의 합계를 계산한다.
*/
function sumColumn(mygrid, ind, excRows) {

	var out   = 0;
	var value = 0;

	//파라미터 excRows 는 합계 계산에서 제외할 rowid 이다.
	//예) excRows = "1@3" 이면 rowid=1, rowid=3 인 것은 계산에서 제외한다.
	var excRowId;
	if(excRows != "undefined" && excRows != null)
		excRowId = excRows.split("@");

	for(var i = 0; i < mygrid.getRowsNum(); i++){
		var flag = true;	//제외할 row 인지
		
		if(excRows != "undefined" && excRows != null) {
			for(var j = 0; j < excRowId.length; j++) {
				if(i == excRowId[j]) {
					flag = false;
					break;
				}
			}
		}
	
		if(flag)	value = mygrid.cells2(i,ind).getValue();		
		else		value = 0;

		if(value == "" || value == null)	//그리드 상에서는 0 이 보이지만 그 실제값은 0 이 아닐 수도 있다.
			value = 0;
		out += parseFloat(value);
	}
	
	return out;

}

/**
 * 소수점 몇번째 자리까지의 반올림 구하기
*/
function round(val, precision) {
	val = val * Math.pow(10,precision); 
	val = Math.round(val); 
	return val/Math.pow(10,precision);
}

/**
 * 시간 포멧을 체크한다.
*/
function checkTimeFormat(mygrid, rowId, cellInd) {
	mygrid1.editor.obj.onkeyup = function(e){
    	var strTime = mygrid1.cells(rowId, cellInd).getValue();
		for(i=0;i<strTime.length;i++){
			ch=strTime.charAt(i);
			if( !(ch>="0" && ch<="9") ){
				alert("숫자만 입력 가능합니다.\n시간은 24시간 형식으로 4자리를 입력하십시오.\n\n(예 : 오전9시5분 = \"0905\" ,  오후11시5분 = \"2305\")");
				mygrid1.cells(rowId, cellInd).setValue("");
				//해당 cell 로 포커스 이동 후 edit mode 로 변경/////////
				(arguments[0]||window.event).cancelBubble=true;
				mygrid1.selectCell(rowId-1,cellInd,false,false,true);
				/////////////////////////////////////////////////////////
				return;
			}
		}
		
		if(strTime.length > 4){
     		alert("시간은 24시간 형식으로 4자리를 입력하십시오.\n\n(예 : 오전9시5분 = \"0905\" ,  오후11시5분 = \"2305\")");
     		mygrid1.cells(rowId, cellInd).setValue(strTime.substring(0, 4));
			//해당 cell 로 포커스 이동 후 edit mode 로 변경/////////
			(arguments[0]||window.event).cancelBubble=true;
			mygrid1.selectCell(rowId-1,cellInd,false,false,true);
			/////////////////////////////////////////////////////////
     		return;
  		}
  		else{
  			for(j=0;j<strTime.length;j++){
  				//시간 첫번째 숫자 검사
  				if(strTime.substring(0, 1) > 2){
  					alert("입력이 잘못되었습니다. 첫번째 숫자는 0~2 사이의 값이어야 합니다.\n시간은 24시간 형식으로 4자리를 입력하십시오.\n\n(예 : 오전9시5분 = \"0905\" ,  오후11시5분 = \"2305\")");
		        	mygrid1.cells(rowId, cellInd).setValue("");
					//해당 cell 로 포커스 이동 후 edit mode 로 변경/////////
					(arguments[0]||window.event).cancelBubble=true;
					mygrid1.selectCell(rowId-1,cellInd,false,false,true);
					/////////////////////////////////////////////////////////
		            return;
		        }
		        //hour(시간 첫번째 숫자 + 시간 두번째 숫자) 검사
		        if(strTime.substring(0, 2) > 23){
		        	alert("입력이 잘못되었습니다. 시간은 00 ~ 23 값이어야 합니다.\n\n(예 : 오전9시5분 = \"0905\" ,  오후11시5분 = \"2305\")");
		        	mygrid1.cells(rowId, cellInd).setValue("");
					//해당 cell 로 포커스 이동 후 edit mode 로 변경/////////
					(arguments[0]||window.event).cancelBubble=true;
					mygrid1.selectCell(rowId-1,cellInd,false,false,true);
					/////////////////////////////////////////////////////////
		            return;
		        }
		        //시간 세번째 숫자 검사
  				if(strTime.substring(2, 3) > 5){
  					alert("입력이 잘못되었습니다. 세번째 숫자는 0~5 사이의 값이어야 합니다.\n시간은 24시간 형식으로 4자리를 입력하십시오.\n\n(예 : 오전9시5분 = \"0905\" ,  오후11시5분 = \"2305\")");
		        	mygrid1.cells(rowId, cellInd).setValue("");
					//해당 cell 로 포커스 이동 후 edit mode 로 변경/////////
					(arguments[0]||window.event).cancelBubble=true;
					mygrid1.selectCell(rowId-1,cellInd,false,false,true);
					/////////////////////////////////////////////////////////
		            return;
		        }
  			}
  		}
	}
}

/**
 * 진행 상태바 표시
 * vTop  : Top px
 * vLeft : Left px
 * vPop  : PopUp화면 여부(true/false)
 */
function progessBar(vTop, vLeft, vPop) {
	var screenWidth  = screen.width;
	var screenHeight = screen.height;
	
	var progessDiv = document.createElement("div");
	progessDiv.id = "progessBar";
	progessDiv.style.zIndex = "101";
	
	var width  = 500;
	var height = 120;
	progessDiv.style.width    = width;
	progessDiv.style.height   = height;

	var topPos  = "";
	var leftPos = "";
	progessDiv.style.position = "absolute";
	
	if(vPop){
		//topPos  = screenHeight/2 - height/2;
		//leftPos = screenWidth/2 - width/2;
		topPos  = document.body.scrollHeight/2 - height/2;
		leftPos = document.body.scrollWidth/2 - width/2;
	}else{
		topPos  = vTop;
		leftPos = vLeft;
	}
	progessDiv.style.top  = topPos + "px";
	progessDiv.style.left = leftPos + "px";
	
	var progessImg = document.createElement("img");
	progessImg.src = baseDir+"/images/progress.gif";

	progessDiv.appendChild(progessImg);
	
	if(parent && parent.document.getElementById("fullBackDiv")!=null) {
		parent.document.getElementById("fullBackDiv").style.display = "block";
	}
	
	document.body.appendChild(progessDiv);

	progessDiv = null;
	progessImg = null;
}

/**
 * 진행 상태바 제거
*/
function rmProgessBar() {
	if(document.getElementById("progessBar") != null) {
		if(parent && parent.document.getElementById("fullBackDiv")!=null) {
			parent.document.getElementById("fullBackDiv").style.display = "none";
		}
		document.body.removeChild(document.getElementById("progessBar"));
	}
}

/**
 * 문자열이 날짜 형식이 가능한 Format인지 검사
*/
function gfnCheckDateFormat(sDate) {
	try{
		var sChrCode = "";
        sDate = sDate.replace(".","").replace(".","").replace("-","").replace("-","");
        for(var i = 0; i < sDate.length; i++) {
        	sChrCode = sDate.charAt(i);
            if(!(sChrCode>="0" && sChrCode<="9")) {
            	return false;
            	break;
            }
        }
        
        if(sDate.length != 8) {
        	return false;
        }
        else {
            var sYear  = sDate.substring(0, 4);
            var sMonth = sDate.substring(4, 6);
            var sDay   = sDate.substring(6, 8);
            if(sMonth < 1 || sMonth > 12)
            	return false;
            if(sDay < 1 || sDay > 31)
            	return false;
            if(sYear < 0 || sYear > 9999)
            	return false;
            if(sMonth == 4 || sMonth == 6 || sMonth == 9 || sMonth == 11) {
            	if(sDay == 31)
                	return false;
            }
            if(sMonth == 2) {
            	if(isNaN(parseInt(sYear/4)))
            		return false;
            	if(sDay > 29)
            		return false;
            	if (sDay == 29 && ((sYear/4) != parseInt(sYear/4)))
            		return false;
            }
        }
        return true;
	}catch(e){
		return false;
	}
}

/**
 * 문자열이 시간 형식이 가능한 Format인지 검사
*/   
function gfnCheckTime(strTime) {
	strTime=strTime.replace(":","").replace(":","");
	for(i = 0; i < strTime.length; i++){
		ch=strTime.charAt(i);
		if( !(ch>="0" && ch<="9") ) {
			return false;
            break;
		}
	}
	if(strTime.length != 4) {
		return false;
	}else{
		nTime   = strTime.substring(0, 2);
		nMinute = strTime.substring(2, 4);
		if(nTime < 0 || nTime > 24)
            return false;
		if(nMinute < 0 || nMinute > 59)
            return false;
	}
	return true;
}

/**
 * 파라미터 string Encode
 */
function encodeParam(str) {
	return escape(encodeURIComponent(str));
}

/**
 * 파일 업로드 시 업로드 불가 확장자 확인
 */
function noUploadFile(str) {
	var fileExt = str.substring(str.lastIndexOf(".")+1);
	if(fileExt == "asp" || fileExt == "bat" || fileExt == "cmd" || fileExt == "com" || fileExt == "msi" || fileExt == "do"
	   || fileExt == "exe" || fileExt == "htm" || fileExt == "html" || fileExt == "inc" || fileExt == "jsp" || fileExt == "php") {
		
 		alert("업로드가 불가능한 파일입니다!\n\n다음 확장자를 가진 파일은 업로드 하실 수 없습니다.\n(asp, bat, cmd, com, msi, do, exe, htm, html, inc, jsp, php)");
 		return true;
 	}
	return false;
}

/**
 * 콜백 메시지 검사
 */
function callBackMsg(loader) {
	try {
		var resText = loader.responseText;
		
		//xml 데이터가 아니면 메시지 보여준다.
		if(resText.indexOf('<?xml version="1.0" encoding="UTF-8"?>') == -1) {
			alert(resText);
			rmProgessBar();
	  	  	return false;
		}
    } 
	catch(e) {
        alert('Error\n\n' + e.description);
	  	rmProgessBar();
	  	return false;
    }
    return true;
}

/**
 * 처리 완료 후 Message 출력
 */
var defCallbackProcMsg = function(o) {
	var loader = o.xmlDoc;
	try {
		alert(loader.responseText);
		//rmProgessBar();
	} 
	catch(e) { 
		alert('Error\n\n' + e.description);
		rmProgessBar(); 
	}
	finally {
		loader = null;
	}
}

/**
 * 처리 완료 Message 출력 후 조회 버튼 호출
 */
var defCallbackProcSearch = function(o) {
	var loader = o.xmlDoc;
	try {
		alert(loader.responseText);
		//rmProgessBar();
		lfnSearch(); //저장 완료 후 조회 버튼 호출
	} 
	catch(e) { 
		alert('Error\n\n' + e.description);
		rmProgessBar(); 
	}
	finally {
		loader = null;
	}
}

/**
 * 처리 완료 Message 출력 후 조회 버튼 호출(일반팝업창)
 */
var defCallbackProcPopup1 = function(o) {
	var loader = o.xmlDoc;
	try {
		alert(loader.responseText);
		//rmProgessBar();
		opener.lfnSearch(); //저장 완료 후 조회 버튼 호출
		window.close();
	} 
	catch(e) { 
		alert('Error\n\n' + e.description);
		rmProgessBar(); 
	}
	finally {
		loader = null;
	}
}

/**
 * 처리 완료 Message 출력 후 조회 버튼 호출(모달팝업창)
 */
var defCallbackProcPopup2 = function(o) {
	var loader = o.xmlDoc;
	try {
		alert(loader.responseText);
		//rmProgessBar();
		window.dialogArguments.lfnSearch(); //저장 완료 후 조회 버튼 호출
		window.close();
	}
	catch(e) {
		alert('Error\n\n' + e.description);
		//rmProgessBar(); 
	}
	finally {
		loader = null;
	}
}

/**
 * 메시지 호출
 */
function gfnMsg(oError, sFunctionNmae){
  try{
	 alert("JavaScript handle Or Object Access Error!\r"+
		   "\rFunction Name     : " + sFunctionNmae +
		   "\rError Number      : " + oError.number +
		   "\rError Description : " + oError.description);
  }catch(e){
	 return;
  }
}

/**
 * From ~ To value 값 체크(From값, To값, 포맷)
 */
function gfnChkFromTo(fval, tval, format){
	if(format == "date") {
		fval = parseInt(replaceAll(replaceAll(fval,":",""),"-",""));
		tval = parseInt(replaceAll(replaceAll(tval,":",""),"-",""));
	}
	else {
		fval = parseInt(fval);
		tval = parseInt(tval);
	}
	
	return (fval > tval ? true : false);
}

function gfnCheckDate(sDate) {
	var sStartDt    = "";
	var sEndDt      = "";
	var sStartDtOld = "";
	
	if(isEmpty(document.getElementById("sStartDt"))) {
		sStartDt    = sDate;
		sStartDtOld = sDate;
	}
	else {
		sStartDt    = document.getElementById("sStartDt").value;
		sStartDtOld = sStartDt;
	}
	
	if(isEmpty(document.getElementById("sEndDt"))) {
		sEndDt = sDate;
	}
	else {
		sEndDt = document.getElementById("sEndDt").value;
	}

	sStartDt = replaceAll(sStartDt, "-", "");
	sEndDt   = replaceAll(sEndDt, "-", "");
	
	if(gfnChkFromTo(sStartDt, sEndDt, "date")) {
		alert("종료일이 시작일보다 빠를 수 없습니다.");
		document.getElementById("sEndDt").value = sStartDtOld;
		return;
	}
}

/**
 * 버튼에 대한 스타일 변경
 */
function gfnOverBtnImg(aTagId, spanTagId) {
	document.getElementById(aTagId).style.backgroundPosition    = "0% -23px";
	document.getElementById(spanTagId).style.backgroundPosition = "100% -23px";
	document.getElementById(spanTagId).style.color              = "#ffffff";
}
function gfnOutBtnImg(aTagId, spanTagId) {
	document.getElementById(aTagId).style.backgroundPosition    = "left top";
	document.getElementById(spanTagId).style.backgroundPosition = "right top";
	document.getElementById(spanTagId).style.color              = "#ffffff";
}

/**
 * 파일 업로드
 */
function gfnUploadFile(fileForm, targetDir, param) {
	var fileCnt = gfnHasFile(fileForm);
	
	fileForm.action = "/jsp/Common/UploadFile.jsp?targetDir=" + targetDir + "&fileCnt=" + fileCnt + "&param=" + param;
	fileForm.target = "uploadFrame";
	fileForm.submit();
}

/**
 * 숨겨진 input type=file 을 대체할 입력 폼값을 세팅한다. 
 */
function gfnChangeFile(form, obj, textId, targetDir) {
	var uploadFile = obj.value;

	//업로드 제한 파일 체크
	if(noUploadFile(uploadFile)) {
		var oriObj = eval(obj);
		var newObj = oriObj.cloneNode(false);
		oriObj.parentNode.replaceChild(newObj, oriObj);
		
		document.getElementById(textId).value = "";
		
		return;
	}
	
	document.getElementById(textId).value = uploadFile.substring(uploadFile.lastIndexOf("\\")+1);
}

/**
 * 숨겨진 input type=file 갯수
 */
function gfnHasFile(form) {
	var cnt = 0;
    for (i = 0; i < form.length; i++) {
        if (form[i].type == 'file') {
        	cnt++;
        }
    }
    return cnt;
}

/**
 * 파일삭제
 */
function gfnDeleteFile(fileGb, propertyId) {
	var realAttach = document.getElementById("attach"+fileGb).value;

	if(realAttach == "") {
		gfnInitFile(fileGb);		
		return;
	}
	
	var url    = "/Common.do";
	var params = "method=deleteFile";
	params 	  += "&realAttach=" + encodeParam(realAttach);  //한글 encode
	params    += "&propertyId=" + propertyId;

	var ajaxObj = createAjaxObject();
	
	ajaxObj.open("POST", url, true);
	ajaxObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajaxObj.onreadystatechange = function() { gfnDelFileCallback(ajaxObj, fileGb); };
	ajaxObj.send(params);
}

/**
 * 파일삭제 콜백함수
 */
function gfnDelFileCallback(ajaxObj, fileGb) {
	if(ajaxObj.readyState == 4) {
		if(ajaxObj.status == 200) {			
			var root = ajaxObj.responseXML.getElementsByTagName("root")[0];
			if(root == null) {
				alert("서버 작업 중입니다.. 잠시후에 다시 시도해 주십시오.");
				return;
			}
			
			var confirm = root.getElementsByTagName("confirm")[0].firstChild.nodeValue;
			
			if(confirm == "true") {
				alert("파일삭제완료");
				gfnInitFile(fileGb);
			}
			else {
				alert("파일삭제실패. 잠시후에 다시 시도해 주십시오.");
			}
		}
		else {
			alert("서버 작업 중입니다. 잠시후에 다시 시도해 주십시오.");
			return;
		}
	}
	
	ajaxObj = null;
}

/**
 * 파일폼 초기화
 */
function gfnInitFile(fileGb) {
	document.getElementById("attach"+fileGb).value = "";
	document.getElementById("file"+fileGb).value   = "";
	
	document.getElementById("uploadFile"+fileGb).style.display = "inline";

	//input type=file 초기화
	var oriObj = eval("document.fileForm.uploadFile"+fileGb);
	var newObj = oriObj.cloneNode(false);
	oriObj.parentNode.replaceChild(newObj, oriObj);
}

/**
 * 페이징 문자열
 */
function pageIndexList(totalDataCount) {
	if(totalDataCount == undefined || totalDataCount == 0) { 
		return "";
	}
	
	var currentPageSetUp = 0;
	var n                = 0;
	var page             = 0;
	var totalPage        = 0;
	var strList          = "";
	
	//전체 페이지 수
	totalPage = Math.ceil(totalDataCount / numPerPage);
	
	if(pageNum > totalPage) {
		pageNum = totalPage;
	}
	
	//표시할 첫 페이지
	currentPageSetUp = Math.floor(pageNum / numPerBlock) * numPerBlock;
	if(pageNum % numPerBlock == 0) {
		currentPageSetUp = currentPageSetUp - numPerBlock;
	}
	
	//1페이지
	if((totalPage > numPerBlock) && (currentPageSetUp > 0)) {
		strList = "<a href='#' onClick='lfnSearch(1);' ";
        strList = strList + "onMouseOver=\"self.status='처음페이지';return true\"><img src='../images/icon_left01.gif' alt='처음페이지(1)' style='margin-bottom:-2px;' /></a>";
	}
	
	//총페이지수가 numPerBlock 이상인 경우 이전 numPerBlock 보여줌
	n = pageNum - numPerBlock;
	if((totalPage > numPerBlock) && (currentPageSetUp > 0)) {
        strList = strList + " <a href='#' onClick='lfnSearch(" + n + ");' ";
        strList = strList + "onMouseOver=\"self.status='이전페이지';return true\"><img src='../images/icon_left02.gif' alt='이전페이지' style='margin-bottom:-2px;' /></a>";
    }
	
	//바로가기 페이지 구현
	page = currentPageSetUp + 1;
	var ckcnt = Math.floor(totalDataCount / numPerPage);
	
	strList = strList + " |";
	
	while((page <= totalPage) && (page <= currentPageSetUp + numPerBlock)) {
		if(page == pageNum) {
			strList = strList + " <span class='current'>" + page + " </span> |";
		}
		else {
            strList = strList + " <a href='#' onClick='lfnSearch(" + page + ");' ";
            strList = strList + "onMouseOver=\"self.status='" + page + "페이지';return true\">" + page + "</a> |";
		}
		page++;
	}
	
	//총페이지수가 numPerBlock 이상인 경우 다음 numPerBlock 보여줌
	n = pageNum + numPerBlock;
	if(totalPage - currentPageSetUp > numPerBlock) {
        strList = strList + " <a href='#' onClick='lfnSearch(" + n + ");' ";
        strList = strList + "onMouseOver=\"self.status='다음페이지';return true\"><img src='../images/icon_right02.gif' alt='다음페이지' style='margin-bottom:-2px;' /></a>";
    }
	
	//마지막 페이지
	if((totalPage > numPerBlock) && (currentPageSetUp + numPerBlock < totalPage)) {
        strList = strList + " <a href='#' onClick='lfnSearch(" + totalPage + ");' ";
        strList = strList + "onMouseOver=\"self.status='마지막페이지';return true\"><img src='../images/icon_right01.gif' alt='마지막페이지(" + totalPage + ")' style='margin-bottom:-2px;' /></a>";
	}
	
	//pageIndex 결과 스트링  리턴
	return strList;
}

/**
 * 엑셀다운로드
 */
function gfnExcel() {
	var jrow   = mygrid1.getRowsNum();
	var jstr   = mygrid1.getAllItemIds();
	var jrows  = new Array();
	var jrows  = jstr.split(',')
	var jcol   = mygrid1.getColumnCount(); 
	var xls    = new ActiveXObject("Excel.Application")
	
	xls.visible = true
	xls.Workbooks.Add
	
	/*****************************************/
	var row =0;
	for (i = -1; i<jrows.length; i++) {
		row++
		col =0;
		for (j=0; j<jcol; j++) {
			col++
			if (i<0) {
				xls.Cells( row, col).Value = mygrid1.getHeaderCol(j);
			}
			else {
				xls.Cells( row, col).Value = mygrid1.cells(jrows[i],j).getValue();
			}
		}
	}

	var rng = xls.Columns(String.fromCharCode(65, 58, 65 + jcol))
	rng.AutoFit
}

/********************************************************************************************
* 포커스 처리
********************************************************************************************/
function gfnFocus(obj) {
	obj.focus();
	if(obj.tagName.toLowerCase() == "input") {obj.select();}
}

/********************************************************************************************
* 특정 Object 포커스 이동 
********************************************************************************************/
function gfnFocusNext(oCurr,nLen,oNext){

	if(oCurr.value.length == nLen)
		gfnFocus(eval(oNext));
}

/********************************************************************************************
* 날짜포맷 셋팅
* Description : 날짜를 yyyy.mm.dd(yyyy-mm-dd)형식으로 바꿔주는 함수
********************************************************************************************/
function gfnSetFormatDate(sDate,sChrDigit){

	var retDate = sDate;
	if(sDate.length == 8) {
		var sYear  = sDate.substring(0, 4);
		var sMonth = sDate.substring(4, 6);
		var sDay   = sDate.substring(6, 8);
		
		retDate = sYear + sChrDigit + sMonth + sChrDigit + sDay;
	}
    
    return retDate;

}

/********************************************************************************************
* 시간포맷 셋팅
* Description : 시간를 hh:mm:ss(hh:mm)형식으로 바꿔주는 함수
********************************************************************************************/
function gfnSetFormatTime(sTime,sChrDigit){

	var retTime = sTime;
	var sHou    = "";
	var sMin    = "";
	var sSec    = "";
	switch(sTime.length){
    case 4:
		sHou    = sTime.substring(0, 2);
		sMin    = sTime.substring(2, 4);
		retTime = sHou + sChrDigit + sMin;
		break;
    case 6:
		sHou    = sTime.substring(0, 2);
		sMin    = sTime.substring(2, 4);
		sSec    = sTime.substring(4, 6);
		retTime = sHou + sChrDigit + sMin + sChrDigit + sSec;
		break;
	}
    
    return retTime;

}

function gfnNoMouseClick() {
	event.cancelBubble = true;
	event.returnValue = false;
	return false;
}

/********************************************************************************************
*  공통 콤보 콜백함수  : 콤보박스ID, 옵션(전체:all, 선택:sel), 선택값, Ajax객체
********************************************************************************************/
function handleComboBox(comboName, opt, autoSelValue, ajaxObj) {
	if(ajaxObj.readyState == 4) {
		if(ajaxObj.status == 200) {
			
			//ajaxObj.responseXML : XML을 text가 아닌 XML로 취급하도록 추출. 
			var root = ajaxObj.responseXML.getElementsByTagName("root")[0];
			if(root == null) {
				alert("서버 작업 중입니다.. 잠시후에 다시 시도해 주십시오.");
				return;
			}
			
			var comboName = root.getElementsByTagName("comboName")[0].firstChild.nodeValue;  //콤보박스명
			
			var list = root.getElementsByTagName("list");
			
			var index = 0;
			
			if(opt == "all") {
				document.getElementById(comboName).options[index] = new Option("전체", "", false, false);
				index++;
			}
			else if(opt == "sel") {
				document.getElementById(comboName).options[index] = new Option("선택", "", false, false);
				index++;
			}
			else if(opt != "") {
				document.getElementById(comboName).options[index] = new Option(opt, "", false, false);
				index++;
			}

			if(list.length > 0) {
				document.getElementById(comboName).length = list.length;
				document.getElementById(comboName).disabled = false;
				var data = "";
				var code = "";
				var name = "";
				for(var i = 0; i < list.length; i++) {
					data = list[i];
					code = data.getElementsByTagName("code")[0].firstChild.nodeValue;
					name = data.getElementsByTagName("name")[0].firstChild.nodeValue;

					var options = new Option(name, code); 
					document.getElementById(comboName).options[index] = options;
					if(autoSelValue == code) document.getElementById(comboName).options.selectedIndex = index;
					//document.getElementById(comboName).options[index] = new Option(name, code, false, false);
					index++;
				}
			}
			else {
				clearCombo(document.getElementById(comboName));
				document.getElementById(comboName).options[0] = new Option("없음", "", false, false);
				document.getElementById(comboName).disabled   = true;
			}
		}
		else {
			alert("서버 작업 중입니다. 잠시후에 다시 시도해 주십시오.");
			return;
		}
	}

	ajaxObj = null;
}

/**
 * Form 속성 On/Off
 * attr : readOnly / disabled
 */
function toggleFormAttr(objId, boolflag, attr){

	if (boolflag){
		eval('document.getElementById("' + objId + '").setAttribute("' + attr + '",true);');
		//alert('document.getElementById("' + objId + '").setAttribute("' + attr + '",true);');
	}else{
		eval('document.getElementById("' + objId + '").removeAttribute("' + attr + '");');
		//alert('document.getElementById("' + objId + '").removeAttribute("' + attr + '");');
	}
}

/**
 * null 값을 빈문자("")로 변환
 */
function nullToEmpty(value){
	if (value==null) return "";
	else value;
}

function fn_reply(returnmsg)
{
	//확인,취소 경고창
	result = confirm(returnmsg);
	if (result){
		return true;
	} else {
		return false;
	}
}

/**
 * flag - 0 : 월, 1 - 일, 2 - 시간(오전)
 */
function fn_dayValueCheck(flag, value) {
	if (value == "")
		return false;
	
	if (flag == 0) {
		if (parseInt(value) > 12) {
			return false;
		}		
	} else if (flag == 1) {
		if (parseInt(value) > 31) {
			return false;
		}		
	} else if (flag == 2) {
		if (parseInt(value) > 12) {
			return false;
		}				
	}
	return true;
}