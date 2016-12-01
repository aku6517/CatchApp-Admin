<!--#include virtual="/Inc/Include/ConfigSet.asp"-->
<!--#include virtual="/Inc/Include/LoginConfirm.asp"-->
<%

	HMenuLevel 		=	SqlDefense(Trim(Request("HMenuLevel")))
	HMenuCode 		=	SqlDefense(Trim(Request("HMenuCode")))
	HMode					=	Trim(Request("HMode"))
	HMenuDelCode	= SqlDefense(Trim(Request("HMenuDelCode")))
	
	DbMenuCode		=	SqlDefense(Trim(Request("DbMenuCode")))
	DbMenuName		=	Trim(Request("DbMenuName"))
	DbMenuUrl			=	Trim(Request("DbMenuUrl"))
	HMenuInfo			=	Ucase(SqlDefense(Trim(Request("HMenuInfo"))))
	HMenuPopup		=	Ucase(SqlDefense(Trim(Request("HMenuPopup"))))
	DbMenuPerId		=	SqlDefense(Trim(Request("DbMenuPerId")))
	DbMenuPer			=	SqlDefense(Trim(Request("DbMenuPer")))
	
	If HMode = "D" Then	 
		
		HMenuDelCode = Replace( Replace( HMenuDelCode," ","" ),",","§" )
		
		Dim ParamInfo(1)
	
		ParamInfo(0) = Amway.MakeParam("@argMenuDelCode",		adVarWChar,			adParamInput,		 2000,		HMenuDelCode)
		ParamInfo(1) = Amway.MakeParam("@argMenuLevel",			adTinyInt,			adParamInput,		 		 ,		HMenuLevel)
	
		Amway.ExecSP "US_MENUDEL", ParamInfo, 0, Nothing	
	
	ElseIf HMode = "S" Then	 

		DbMenuCode 		= Replace( Replace( DbMenuCode," ","" ),	",","§" ) & "§"
		DbMenuName 		= Replace( Replace( DbMenuName," ","" ),	",","§" ) & "§"
		DbMenuUrl 		= Replace( Replace( DbMenuUrl," ","" ),		",","§" ) & "§"
		DbMenuInfo 		= Replace( Replace( HMenuInfo," ","" ),	",","§" )
		DbMenuPopup 	= Replace( Replace( HMenuPopup," ","" ),	",","§" )
		DbMenuPerId 	= Replace( Replace( DbMenuPerId," ","" ),	",","§" ) & "§"
		
		Dim MParamInfo(8)
	
		MParamInfo(0) = Amway.MakeParam("@argMMenuLevel",		adTinyInt,			adParamInput,		  ,		HMenuLevel)
		MParamInfo(1) = Amway.MakeParam("@argMMenuCode",		adVarWChar,			adParamInput,		 6,		HMenuCode)
		MParamInfo(2) = Amway.MakeParam("@argMenuCode",			adVarWChar,			adParamInput,	4000,		DbMenuCode)
		MParamInfo(3) = Amway.MakeParam("@argMenuName",			adVarWChar,			adParamInput,	4000,		DbMenuName)
		MParamInfo(4) = Amway.MakeParam("@argMenuUrl",			adVarWChar,			adParamInput,	4000,		DbMenuUrl)
		MParamInfo(5) = Amway.MakeParam("@argMenuInfo",			adVarWChar,			adParamInput,	4000,		DbMenuInfo)
		MParamInfo(6) = Amway.MakeParam("@argMenuPopup",		adVarWChar,			adParamInput,	4000,		DbMenuPopup)
		MParamInfo(7) = Amway.MakeParam("@argMenuPerId",		adVarWChar,			adParamInput,	4000,		DbMenuPerId)
		MParamInfo(8) = Amway.MakeParam("@argUserId",				adVarWChar,			adParamInput,	  30,		SSUserId)
	
		Amway.ExecSP "US_MENUMODI", MParamInfo, 0, Nothing
		
	End If
	'<!--//로그 남기기 페이지가 인크루드 될 자리 입니다.//-->
	If PersonYN = "Y" Then
		SqlStr 	= "EXEC US_MENUMODI '" & HMenuLevel & "', '" & HMenuCode & "', '" & DbMenuCode & "','" & DbMenuName & "', '" & DbMenuUrl & "','" & DbMenuInfo	& "'," & DbMenuPopup	& "''" & DbMenuPerId	& "'," & SSUserId	& "'"	
		SqlStr = Replace(SqlStr,"'","※")
		Call sb_LogInPut(SqlStr)
	End If	
	'<!--//로그 남기기 페이지가 인크루드 될 자리 입니다.//-->
	
	Call OnLoadCall("Return_Page()")
%>
<script language="javascript">
<!--
function Return_Page() {
	var form = document.AbnFrm;
	form.action = "/Management/Menu/MenuManageSub.asp";
	form.submit();
}
//-->
</script>
<form name="AbnFrm" method="post">
	<input type="hidden" name="blank" value="">
	<input type="hidden" name="MMenuLevel"	value="<%=HMenuLevel%>" >
	<input type="hidden" name="MMenuCode" 	value="<%=HMenuCode%>" >
</form>
<!--#include virtual="/Common/Inc/DbNothing.asp"-->