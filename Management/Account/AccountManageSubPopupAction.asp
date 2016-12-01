<!--#include virtual="/Inc/Include/ConfigSet.asp"-->
<!--#include virtual="/Inc/Include/LoginConfirm.asp"-->
<!--#include virtual="/inc/include/KISA_SHA256.asp"-->
<%
	UserID			= Trim(request("UserID"))	
	UserPwd			= Trim(request("Pwd"))
	UserName		= Trim(request("UserName"))
	UserAttached	= Trim(request("UserAttached"))
	UserTel			= Trim(request("UserTel"))
	UserPosition	= Trim(request("UserPosition"))
	UserAdminType	= Trim(request("UserAdminType"))
	ActionMode		= Trim(request("ActionMode"))

	If ActionMode = "D" then
		DelUserID	= Trim(request("DelUserID"))
		arrDelUserID	= Split(DelUserID, ",")
		MaxCount	= request.form("DelUserID").count
	End If

	Set conn = Server.CreateObject("ADODB.Connection")
	conn.Open Enders.getConnStr(0)

	If UserPwd <> "" then
		UserPwd		= SHA256_Encrypt(UserPwd)
	End If

	If ActionMode = "I" then
		'만약 최종 코드가 비어있을 경우 에러 처리
		If UserID = "" Or UserPwd = "" Or UserName = "" Then
			response.write "<script type='text/javascript'>alert('입력하신 정보에 오류가 발생하였습니다.');window.close();</script>"
			Response.end
		End If

		SQL = " INSERT INTO ADMIN_USER_MASTER "
		SQL = SQL & " (vchUSER_ID, vchUSER_NAME, vchPASSWORD, vchUSER_TEL, chPOSITION, vchATTACHED, chADMIN_TYPE, dtREG_DT, vchREG_ID, vchUSE_YN) "
		SQL = SQL & " VALUES "
		SQL = SQL & " ('"& UserID &"', '"& UserName &"', '"& UserPwd &"', '"& UserTel &"', '"& UserPosition &"', '"& UserAttached &"', '"& UserAdminType &"', now(), '"& SSUserId &"', 'Y'); "

		conn.Execute(SQL)

		Str = "계정 추가가 완료 되었습니다."
		Call sb_AlertParentReload(Str)
	ElseIf ActionMode = "U" Then
		'만약 최종 코드가 비어있을 경우 에러 처리
		If UserID = "" Or UserName = "" Then
			response.write "<script type='text/javascript'>alert('입력하신 정보에 오류가 발생하였습니다.');window.close();</script>"
			Response.end
		End If

		SQL = " update ADMIN_USER_MASTER set vchUSER_ID = '"& UserID &"', vchUSER_NAME = '"& UserName &"', vchUSER_TEL = '"& UserTel &"'"
		SQL = SQL & ", chPOSITION = '"& UserPosition &"', vchATTACHED = '"& UserAttached &"', chADMIN_TYPE = '"& UserAdminType &"', dtMODI_DT = now(), vchMODI_ID = '"& SSUserId &"' "
		SQL = SQL & " where vchUSER_ID = '"& UserID &"' "
		conn.Execute(SQL)	

		Str = "계정 정보가 수정 되었습니다."
		Call sb_AlertParentReload(Str)
	ElseIf ActionMode = "D" Then
		'만약 최종 코드가 비어있을 경우 에러 처리
		If arrDelUserID(0) = "" Then
			response.write "<script type='text/javascript'>alert('입력하신 정보에 오류가 발생하였습니다.');history.back();</script>"
			Response.end
		End If

		For j = 0 To Ubound(arrDelUserID)
			SQL = ""
			SQL = " update ADMIN_USER_MASTER set vchUSE_YN = 'N', dtMODI_DT = now(), vchMODI_ID = '"& SSUserId &"' "
			SQL = SQL & " where vchUSER_ID = '"& arrDelUserID(j) &"' "
			conn.Execute(SQL)	
		Next
			Url = "/Management/Account/AccountManageMain.asp"
			Str = "계정 정보가 삭제 되었습니다."
			Call sb_AlertUrl(Url, Str)
	End If

	Enders.Dispose(0)
%>
