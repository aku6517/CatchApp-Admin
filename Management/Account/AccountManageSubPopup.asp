<!--#include virtual="/Inc/Include/ConfigSet.asp"-->
<!--#include virtual="/Inc/Include/LoginConfirm.asp"-->
<%
	ActionID		= Trim(request("ActionID"))
	ActionMode		= Trim(request("ActionMode"))
	UserID			= ""
	Pwd				= ""
	If ActionMode = "U" then
		Set conn = Server.CreateObject("ADODB.Connection")
		conn.Open Enders.getConnStr(0)

		SQL = "SELECT * FROM ADMIN_USER_MASTER "
		SQL = SQL & " where vchUSER_ID = '"& ActionID &"' "

		Set RS = conn.Execute(SQL)

		If Not RS.BOF And Not RS.EOF Then
			UserID = RS("vchUSER_ID")
			UserName = RS("vchUSER_NAME")
			UserTel = RS("vchUSER_TEL")
			UserPosition = RS("chPOSITION")
			UserAttached = RS("vchATTACHED")
			UserAdminType = RS("chADMIN_TYPE")
		Else
			response.write "<script type='text/javascript'>alert('수정하시려는 계정에 오류가 있습니다.');history.back();</script>"
			Response.end
		End If
	End If
%>
<html lang="en">
 <head>
  <meta http-equiv="Content-Type" content="text/html" charset="utf-8">
  <title>CatchAPP Admin - Account ADD</title>
  <link rel="stylesheet" type="text/css" href="/inc/css/admin.css">
  <script type="text/javascript" src="/inc/js/jquery-1.11.2.min.js"></script>
</head>
<SCRIPT LANGUAGE="JavaScript">

//저장을 위한 체크 로직_정병준_20161120
function fn_GoAction(){
	var frm = document.EndersFrm;
    var i, sum=0;
    var obj = document.all.UserAdminType.length;
    var reg_exp = new RegExp("^[a-zA-Z][a-zA-Z0-9]{4,12}$","g");  
    var match = reg_exp.exec(frm.UserId.value); 

	if (frm.ActionMode.value != "U"){
		if( frm.UserId.value == "" ){
			alert("아이디를 입력해주세요.");
			frm.UserId.focus();
			return;
		}

		if (match == null || frm.UserId.value.length <  3 || frm.UserId.value > 11) { 
			alert ("아이디는 4~12자이며, 한글입력은 불가합니다.\n또한, 아이디의 맨앞자리는 숫자가 입력될 수 없습니다."); 
			frm.UserId.focus();
			return; 
		}
		
		if( frm.UserIDChk.value == "" ){
			alert("아이디 중복 체크를 해주세요.");
			frm.UserId.focus();
			return;
		}
	}

	if (frm.ActionMode.value != "U"){
		if( frm.Pwd.value == "" ){
			alert("패스워드를 입력해주세요.");
			frm.Pwd.focus();
			return;
		}else{
			frm.UserPwdChk.value = fn_ChangePwdCheck(frm.Pwd.value)
			if (frm.UserPwdChk.value == "false"){
				alert("패스워드 정책에 맞지 않습니다.\n영문+숫자 혼합 8자 이상 입력해주세요.");
				frm.Pwd.focus();
				return;
			}
		}
	}

	if( frm.UserName.value == "" ){
		alert("이름을 입력해주세요.");
		frm.UserName.focus();
		return;
	}
	if( frm.UserAttached.value == "" ){
		alert("소속을 입력해주세요.");
		frm.UserAttached.focus();
		return;
	}
	if( frm.UserPosition.value == "" ){
		alert("직급/직책을 입력해주세요.");
		frm.UserPosition.focus();
		return;
	}	
	if( frm.UserTel.value == "" ){
		alert("연락처를 입력해주세요.");
		frm.UserTel.focus();
		return;
	}

	for (i=0;i<obj ;i++){ 
	  if (document.all.UserAdminType[i].checked == true){ 
		  break; 
	  } 
	} 
	
	if (i == obj){ 
	  alert("권한 타입 선택이 안되어 있습니다."); 
	  return;
	} 


	frm.submit();
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

function CheckID(){ 
	var frm = document.EndersFrm;

	var id = frm.UserId.value;

	if (id == ""){
		alert("입력하신 아이디가 없습니다.");
		frm.UserId.focus();
		return;
	}

	$.ajax({ 
	   type: "POST", 
	   url: "/Management/Account/AjaxIDCheck.asp", 
	   data: "UserId="+id, 
	   success: function(msg){ 
		 if( msg =="true") //사용가능 
		 { 
			alert("입력하신 아이디는 사용 가능합니다."); 
			frm.Pwd.focus();
			frm.UserIDChk.value = "Y";
		 }else 
		 { 
			alert("입력하신 아이디는 중복되었습니다."); 
			return;
		 } 
	   } 
	}); 
}

</script>
 <body onload="document.EndersFrm.UserId.focus();">
  <form name="EndersFrm" method="post" action="/Management/Account/AccountManageSubPopupAction.asp">	
  <input type="hidden" name="UserPwdChk">
  <input type="hidden" name="UserIDChk">
  <input type="hidden" name="ActionMode" value="<%=ActionMode%>">
 	<!-- container -->
	<div  class="pop_container">
		<!-- content -->
		<div class="pop_content">
			<div class="box_round">
				<!-- 페이지명 -->
				<div class="top_area">
					<h3 class="h_tit">관리자 계정 관리</h3>
				</div>
				<!-- //페이지명 -->	
				<!-- tbDesignWrite -->
				<table class="tbDesignWrite" summary="">
				<colgroup>
					<col width="187">
					<col>
				</colgroup>
				<tbody>
				<tr>
					<th><em>아이디</em></th>
					<td>
						<input type="text" class="input_txt" style="width:128px;" name="UserId" id="UserId" value="<%=UserID%>" <% If ActionMode = "U" Then %> readonly <% End If %>>
						<% If ActionMode = "I" Then %> 
							<a href="javascript:CheckID();" class="button">아이디 중복확인</a>
						<% End If %>
					</td>
				</tr>
				<tr>
					<th><em>초기비밀번호</em></th>
					<td><input type="password" class="input_txt" style="width:128px;" name="Pwd" <% If ActionMode = "U" Then %> readonly <% End If %>>
					</br>관리자의 비밀번호는 평문+숫자 조합 8자리 이상 이어야 합니다.
					</td>
				</tr>
				<tr>
					<th><em>이름</em></th>
					<td><input type="text" class="input_txt" style="width:128px;" name="UserName" value="<%=UserName%>"></td>
				</tr>
				<tr>
					<th><em>소속</em></th>
					<td><input type="text" class="input_txt" style="width:128px;" name="UserAttached" value="<%=UserAttached%>"></td>
				</tr>
				<tr>
					<th><em>직급/직책</em></th>
					<td><input type="text" class="input_txt" style="width:128px;" name="UserPosition" value="<%=UserPosition%>"></td>
				</tr>
				<tr>
					<th><em>전화번호</em></th>
					<td><input type="text" class="input_txt" style="width:128px;" name="UserTel" maxlength="12" value="<%=UserTel%>">
					</br>전화번호를 연속으로 입력 해주세요.(ex:01012345678)
					</td>
				</tr>
				<tr>
					<th><em>권한 타입</em></th>
					<td>
						<label><input type="radio" class="input_radio" name="UserAdminType" value="1" <% If UserAdminType = "1" Then %> checked="checked" <% End If %>> 슈퍼관리자</label>&nbsp;&nbsp;&nbsp;
						<label><input type="radio" class="input_radio" name="UserAdminType" value="2" <% If UserAdminType = "2" Then %> checked="checked" <% End If %>> 일반관리자</label>
					</td>
				</tr>
				</tbody>
				</table>
				<!-- //tbDesignWrite -->

				<!-- buttonArea -->
				<div class="buttonArea">
					<span class="btnC">
						<input type="button" class="button2 yellow" value="저장" onclick="fn_GoAction();">
						<input type="button" class="button2" value="나가기" onclick="window.close();">
					</span>
				</div>
				<!-- //buttonArea -->

			</div>
		</div>
	</div>
 </form>
 </body>
</html>
