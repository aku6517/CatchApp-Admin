<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html" charset="utf-8">
<title>CatchAPP Admin - Login</title>
<script type="text/javascript" src="/inc/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="/inc/js/default_ui.js"></script>
<script type="text/javascript" src="/inc/js/placeholders.js"></script>
<link rel="stylesheet" type="text/css" href="/inc/css/admin.css">
</head>
<SCRIPT LANGUAGE="JavaScript">

//로그인 함수_정병준_20161120
function fn_login(){
	var frm = document.CommFrm;
	if( frm.UserId.value == "" ){
		alert("아이디를 입력해주세요.");
		frm.UserId.focus();
		return;
	}
	if( frm.Pwd.value == "" ){
		alert("패스워드를 입력해주세요.");
		frm.Pwd.focus();
		return;
	}
	
	frm.UserPwdChk.value = fn_ChangePwdCheck(frm.Pwd.value)

	frm.submit();
}

//팝업 오픈 함수_정병준_20161120
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

//패스워드 변경을 위한 팝업 오픈 함수_정병준_20161120
function fn_ChangePwd(){
	var url 			= "/popup/password/ChangePwdPopup.asp";
	var sizeW 		= "500";
	var sizeH 		= "190";
	var isScroll 	= "no";
	OpenWindow(url, "Pwdpop", sizeW, sizeH, isScroll)
}

//패스워드의 길이 체크를 위한 함수_정병준_20161120
function fn_ChangePwdCheck(PwdStr){
	var Alpha = "N";
	var Num 	= "N";
	var SChar = "N";
	var Str 	= false;
	var checkAl 	= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var checkNum 	= "1234567890";
  for(var idx = 0; idx < PwdStr.length; idx++) {
    if( checkNum.indexOf(PwdStr.charAt(idx)) > -1 ) {
      Num = "Y";
    }else if( checkAl.indexOf(PwdStr.charAt(idx)) > -1 ){
      Alpha = "Y";
    } else {
    	SChar = "Y";
    }
    if(	Alpha == "Y" && Num == "Y" && SChar == "Y"	){
    	break;
  	}
  }
	if( PwdStr.length < 8 ){
		Str = false;
	}else	if( PwdStr.length >= 8 && PwdStr.length <= 9 ){
		if(	Alpha == "Y" && Num == "Y" && SChar == "Y"	){
			Str = true;			
		}
	}else	if( PwdStr.length >= 10 ){
		if(	Alpha == "Y" && Num == "Y" ){
			Str = true;			
		}		
	}	
	return Str;
}

//웹 페이지 즐겨찾기 함수_정병준_20161120
function bookmarksite() { 
    var title = document.title; //현재 보고 있는 페이지의 Title
    var url = location.href; //현재 보고 있는 페이지의 Url

    if (window.sidebar && window.sidebar.addPanel) { //firefox
        window.sidebar.addPanel(title, url, "");
    } 
	else if (window.opera && window.print) { //opera
		var elem = document.createElement('a');
        
		elem.setAttribute('href', url);
        elem.setAttribute('title', title);
        elem.setAttribute('rel', 'sidebar');
        elem.click();
    } 
	else if (window.external && ('AddFavorite' in window.external)) { //msie
		window.external.AddFavorite(url, title);
    } 
	else {
        alert("해당브라우저는 즐겨찾기 추가기능이 지원되지 않습니다.\n\nCtrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
        return;
    }
}

</SCRIPT>
<body class="utillity" onload="document.CommFrm.UserId.focus();">
<form name="CommFrm" method="post" action="/LoginAction.asp">
<input type="hidden" name="UserPwdChk">
<input type="hidden" name="MenuCode" value="000000">
	<div class="wrap">	
	<!-- util_container -->
	<div  class="util_container">		
		<!-- util_content -->
		<div class="util_content">
			<form>
				<div class="top_cont">
					<h1 class="logo">CATCHAPP</h1>
					<h2 class="h_tit">케찹 어플리케이션 파트너사 전용 관리자 시스템입니다.</h2>
				</div>
				<fieldset>
					<legend>아이디/비번 입력</legend>
					<div class="list_type">
						<div class="user_id">
							<h3 class="tit">아이디</h3>
							<div class="input_type">
								<input type="text" id="UserId" name="UserId" placeholder="아이디" title="아이디 입력">
							</div>
						</div>
						<div class="user_pw">
							<h3 class="tit">비밀번호</h3>
							<div class="input_type">
								<input type="password" id="Pwd" name="Pwd" maxlength="20" placeholder="비밀번호" title="비밀번호 입력">
							</div>
						</div>
						<div class="btn_wrap">
							<button type="submit" class="btn yellow btn_util btn_login" onclick="fn_login();">로그인</button>
						</div>
						<div class="link_group">
							<a href="/Information/AD_W10_012.html" class="link id_search" target="_blank">아이디 찾기</a>
							<i class="unn_bar">|</i>
							<a href="/Information/AD_W10_011.html" class="link pw_change" target="_blank">비밀번호 변경</a>
							<i class="unn_bar">|</i>
							<a href="javascript:bookmarksite()" class="link bookmark_add">즐겨찾기 추가</a>
						</div>					
					</div>
				</fieldset>
			</form>
		</div>
		<!-- //util_content -->
	</div>
	<!-- //util_container -->
	<!-- util_footer -->
	<!--#include virtual="/inc/include/LoginFooter.asp"-->
	<!-- //util_footer -->
	</div>
</form>
</body>
</html>
