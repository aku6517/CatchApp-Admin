var WEC = null;	//Web Editor Control 객체;
//Toolbar 초기화
function setToolbar() {
	WEC.ShowBarIcon(10371, false);
/*
	WEC.ShowBarIcon(57635, false);
	WEC.ShowBarIcon(57634, false);
	WEC.ShowBarIcon(57637, false);
	WEC.ShowBarIcon(10403, false);
	WEC.ShowBarIcon(10061, false);
	WEC.ShowBarIcon(10382, false);
	WEC.ShowBarIcon(10080, false);
	WEC.ShowBarIcon(10068, false);
	WEC.ShowBarIcon(10071, false);
	WEC.ShowBarIcon(10073, false);
	WEC.ShowBarIcon(10156, false);
	WEC.ShowBarIcon(10157, false);
	WEC.ShowBarIcon(10158, false);
	WEC.ShowBarIcon(10159, false);
	WEC.ShowBarIcon(10159, false);
	WEC.ShowBarIcon(10156, false);
	WEC.ShowBarIcon(10157, false);
	WEC.ShowBarIcon(10158, false);
	WEC.ShowBarIcon(10159, false);
	WEC.ShowBarSeparator(57637, false);
	WEC.ShowBarSeparator(10080, false);
	WEC.ShowBarSeparator(10073, false);
*/
}
/*==================  일반적인 WEC Initialize ================ */
function WEC_Init() {
	WEC = document.all("WEC");
	setToolbar();
	
	switch(docmode) {
	case "New":
		set_new_control();
		break;
	case "Edit":
		setTimeout("set_edit_control();", 500);
		break;
	case "Read":
		set_read_control();
		break;
	case "Reply":
		setTimeout("set_reply_control();", 500);
		break;
	}
}
/* 일반적인 문서를 새로 작성 */
function set_new_control() {
	WEC.SetServiceServer(location.hostname);	// 2003,2,20,1 이후버전 추가
	WEC.SetDefaultFont("굴림", 9);
	WEC.IsWebMode = true;
}
/* 읽기 모드일시 수행하는 부분 */
function set_read_control() {
	document.all.doc_body.style.display = "";
}
// 일반적인 문서의 편집 모드
function set_edit_control() {
	WEC.SetServiceServer(location.hostname);	// 2003,2,20,1 이후버전 추가
	WEC.SetDefaultFont("굴림", 9);
	WEC.PutHtmlSrc(document.all("Body").value.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;nbsp;/gi, " "));
	WEC.SetCaretPosition(1,1,1);
	WEC.IsWebMode = true;
}
function set_reply_control() {
	WEC.SetDefaultFont("굴림", 9);
	var header = get_reply_header();			//각 응답양식의 js header에서 정의되어 있어야 함
	WEC.PutHtmlSrc(header + "<P>&nbsp;</P>"+parent.Header.body_content);
	WEC.SetCaretPosition(1,1,1);
	WEC.IsWebMode = true;
}
/* ===================================================================== */
/*==================  Mail WEC Initialize ================ */
function WEC_InitMail(action) {
	WEC = document.all("WEC");
	setToolbar();
	WEC.SetServiceServer(location.hostname);	// 2003,2,20,1 이후버전 추가
	WEC.SetDefaultFont("굴림", 9);
	var signature = f.RTSignature.value;
	switch (action) {
	case "new":
		WEC.PutHtmlSrc("<P STYLE='font-size:9pt;'>&nbsp;</P><P STYLE='font-size:9pt; '>"+signature+"</P>");
		WEC.SetCaretPosition(1,1,1);
		WEC.IsWebMode = true;
		document.forms[0].EnterPeople.focus();
		break;
	case "edit":
		setTimeout("set_edit_mail_control()", 500);
		break;
	default:
		setTimeout("set_default_mail_control()", 500);
		break;
	}
}
function set_edit_mail_control() {
	WEC.HtmlSrc = document.all("Body").value.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;nbsp;/gi, " ");
	WEC.SetCaretPosition(1,1,1);
	WEC.IsWebMode = true;
}
function set_default_mail_control() {
	var init_head = get_initHTMLs(action);
//	WEC.PutHtmlSrc(document.all("Body").value.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;nbsp;/gi, " "));
	WEC.PutHtmlSrc(document.all("Body").value);
	WEC.SetCaretPosition(1,1,1);
	WEC.IsWebMode = true;
	WEC.LineSpace=150;
}
//메일 초기화시 header정보 구하기
function get_initHTMLs(action) {
	var f = document.forms[0];
	var doc = document.all;
	
	var init_head = "";
	var signature = "";
	var content = "";
	var fixed_content = "";
	var font_tag = "<P style=\"FONT-SIZE:9pt\">";
	if (action == "forward" || action == "reply_with_history" || action=="reply_all") {
		signature = "<br><br>" + f.RTSignature.value;
		init_head = f.init_head.value;
		fixed_content = font_tag+"&nbsp;</P>"+font_tag+signature+"</P>"+"<P>&nbsp;</P>"+init_head.replace(/\n/gi,"<P>");
	} else if(action == "save_folder") {
		fixed_content = "";
	} else if(action == "forward2") {
		signature = "<br><br>" + f.RTSignature.value;
		init_head = parent.Header.init_head;
		fixed_content = font_tag+"&nbsp;</P>"+font_tag+signature+"</P>"+"<P>&nbsp;</P>"+init_head.replace(/\n/gi,"<P>");
	} else {
		signature = "<br><br>" + f.RTSignature.value;
		fixed_content = font_tag+"&nbsp;</P>"+font_tag+signature+"</P>";
	}	
	return fixed_content;
}
//----------------------------------------------------------------------
/* 보라텍 내의 내용을 저장하는 일을 수행 */
/* 2003,2,20,1 이전버전 사용 함수
function WEC_ImageUpload(imgunid){
	var imgfilepath = "/"+wecimgmng_path+"/ImageForm?OpenForm";
	var viewpath = location.protocol + "//" +location.hostname+ "/"+wecimgmng_path+"/imgview/" + imgunid + "/$file/";
	WEC.UploadImageToDomino(location.hostname, 80, imgfilepath, imgunid, viewpath);
}
*/
// 2003,2,20,1 이후버전 사용 함수
function WEC_ImageUpload(imgunid){
	var dummy ="";
	var imgfilepath = "/" + wecimgmng_path;
	WEC.LocalUploadPath = location.protocol + "//" +location.hostname+ "/" + wecimgmng_path ;
	dummy = WEC.GetHtmlSrc();
	alert(location.protocol + "//"+ location.hostname + imgfilepath);
	WEC.UploadImageDomino(location.protocol + "//"+ location.hostname + imgfilepath, imgunid);
	return dummy;
}
// 메일 발송
function WEC_SaveDoc(imgunid){
	var htmlstr = "";
	htmlstr = WEC_ImageUpload(imgunid);
	var f = document.forms[0];
	var savebody = document.all("Body");
	savebody.value = fix_img_name(htmlstr)
}
function fix_img_name(htmlStr) {
	var start_index = htmlStr.indexOf("/$file/");

	if (start_index > -1) {
		var end_index = htmlStr.indexOf(".", start_index);
		return htmlStr.substring(0, start_index) + htmlStr.substring(start_index, end_index) + fix_img_name(htmlStr.substr(end_index));
	} else {
		return htmlStr;
	}
}
// html tag내에 iframe이 있는 경우 이 함수가 iframe내의 html문자열을 구해 리턴함
function get_iframe_html(htmlstr) {
	var bodyhtml = "";
	var index = htmlstr.toLowerCase().indexOf("<iframe");
	bodyhtml = htmlstr.substring(0, index);
	if (index >= 0) {
		for(var i=0;i < document.frames[0].document.all.length; i++) {
			if (document.frames[0].document.all[i].tagName.toLowerCase() == "html") {
				bodyhtml += document.frames[0].document.all[i].outerHTML;
				break;
			}
		}
	} else {
		bodyhtml = htmlstr;
	}
	return bodyhtml;	
}
//조회시 body내용 표시
function showBodyContents() {
	if(document.frames.length == 0) {
		PURE_BODY_CONTENTS = recover_err_link(document.all.doc_body.innerHTML);
		document.write(PURE_BODY_CONTENTS);
	} else {
		try {
			PURE_BODY_CONTENTS = "<div style='padding:5px; position:relative;height:50%;'>"+get_iframe_contents()+"</div>";
			document.write(PURE_BODY_CONTENTS);
		} catch(e) {
			PURE_BODY_CONTENTS = recover_err_link(document.all.doc_body.innerHTML);
			document.write(PURE_BODY_CONTENTS);
		}
	}
}
// Recover Link Error
function recover_err_link(src_html) {
	if (src_html.length == 0) return src_html;
	var anchor_len = '&lt;a href="'.length;
	var link_start = src_html.toLowerCase().indexOf('&lt;a href="<' + 'a href="');
	if (link_start < 0) {
		return src_html;
	} else {
		var link_end = src_html.toLowerCase().indexOf('">', link_start + anchor_len);
		var del_link_index = src_html.toLowerCase().indexOf("</a>", link_end) + "</a>".length;
		var return_html = src_html.substring(0, link_start) + src_html.substring(link_start + anchor_len, link_end) + recover_err_link(src_html.substr(del_link_index));
		return return_html.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;nbsp;/gi, " ");
	}
}
//iframe contents를 ocx를 이용 구함
function get_iframe_contents() {
	var objDoc = document.all.DocControl2;
	var url = document.frames[0].location.href;
	objDoc.Initialize();
	var htmlstr = objDoc.getURLContents(url);
	return htmlstr;
}
