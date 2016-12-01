<!--#include virtual="/Inc/Include/ConfigSet.asp"-->
<!--#include virtual="/Inc/Include/LoginConfirm.asp"-->
<%
	HMenuLevel 		=	SqlDefense(Trim(Request("HMenuLevel")))
	HMenuCode 		=	SqlDefense(Trim(Request("HMenuCode")))
	AddMenuName		=	Trim(Request("AddMenuName"))
	AddMenuUrl		=	Trim(Request("AddMenuUrl"))
	AddMenuPer		=	SqlDefense(Trim(Request("AddMenuPer")))
	
	AddMenuName		=	Replace(AddMenuName,",","/")
	

	Set conn = Server.CreateObject("ADODB.Connection")
	conn.Open Enders.getConnStr(0)

	'MenuLevel 을 확인해서 MenuCode 를 부여한다.
	if HMenuLevel = 1 then
		SQL = "	SELECT IFNULL(MAX(LEFT(chMENU_CODE,2)),0) + 1 as PRECODE FROM ADMIN_MENU WHERE chMENU_LEVEL = 1"
	elseif HMenuLevel = 2 then
		SQL = "	SELECT IFNULL(MAX(SUBSTRING(chMENU_CODE,3,2)),0) + 1 as PRECODE FROM ADMIN_MENU WHERE chMENU_LEVEL = 2 and chMENU_UP_CODE = '"& MenuCode &"' "
	end if

	Set RS = conn.Execute(SQL)

	'MenuCode를 이용하여 최종 코드를 부여한다.
	if Not rs.eof and Not rs.bof Then
		If HMenuLevel = 1 then
			EndCode = "0" & RS("PRECODE") & "0000"
		Else
			EndCode = Left(HMenuCodeRS,2) & RS("PRECODE") & "00"
		End if
	Else
		EndCode = 0
	End if	

	'만약 최종 코드가 비어있을 경우 에러 처리
	If EndCode = "" Or EndCode = 0 Then
		response.write "<script type='text/javascript'>alert('메뉴코드가 생성되지 않았습니다.');Return_Page();</script>"
	End If

	'메뉴레벨이 1이면 대메뉴이므로 하위 메뉴가 있을수 있기 때문에 Y 로 처리
	'메뉴레벨이 2이면 중메뉴이므로 하위 메뉴가 없을 수 있기 때문에 N 으로 처리
	'만약 소메뉴가 필요하다면 메뉴 레벨 수정 필요
	If HMenuLevel = 1 Then
		MenuDownYn = "Y" 
	Else
		MenuDownYn = "N"
	End if

	SQL2 = " update ADMIN_MENU set chMENU_DOWN_YN = 'Y' where chMENU_CODE = '"& HMenuCode & "' "

	conn.Execute(SQL2)

	SQL3 = " INSERT INTO ADMIN_MENU "
	SQL3 = SQL3 & " (`chMENU_CODE`, `chMENU_LEVEL`, `vchMENU_NAME`, `vchMENU_URL`, `chMENU_UP_CODE`, `vchOPERATOR_ID`, `chMENU_DOWN_YN`, `chUSE_YN`, `dtREG_DT`, `vchREG_ID`) "
	SQL3 = SQL3 & " VALUES "
	SQL3 = SQL3 & " ('"& EndCode &"', '"& HMenuLevel &"', '"& AddMenuName &"', '"& AddMenuUrl &"', '"& HMenuCode &"', '"& AddMenuPer &"', '"& MenuDownYn &"', 'Y', now(), '"& SSUserId &"'); "

	conn.Execute(SQL3)

	Url1 = "/Management/Menu/MenuManageSub.asp?MMenuLevel=" & HMenuLevel & "&MMenuCode=" & HMenuCode

	If HMenuLevel = "1" Then
		iFrameName = "SubFrame1"
	ElseIf HMenuLevel = "2" Then
		iFrameName = "SubFrame2"
	ElseIf HMenuLevel = "3" Then
		iFrameName = "SubFrame3"
	End If		
	
	Call sb_AlertOpenerUrl(Url1, iFrameName)
	Call OnLoadCall("Return_Page()")
%>
<script language="javascript">
<!--
function Return_Page() {
	var form = document.EndersFrm;
	alert("메뉴 생성이 완료 되었습니다.");
	form.action = "/Management/Menu/MenuManageSubPopup.asp";
	form.submit();
	window.close();
}
//-->
</script>
<form name="EndersFrm" method="post">
	<input type="hidden" name="blank" value="">
	<input type="hidden" name="HMenuLevel"	value="<%=HMenuLevel%>" >
	<input type="hidden" name="HMenuCode" 	value="<%=HMenuCode%>" >
</form>