<%@Language="VBScript" CODEPAGE="65001" %>
<!--METADATA TYPE= "typelib"  NAME= "ADODB Type Library" FILE="C:\Program Files\Common Files\SYSTEM\ADO\msado15.dll"  -->
<!--#include virtual = "/inc/include/SQLDBConn.asp"-->
<!--#include virtual = "/inc/include/Function.asp"-->
<%
Response.Buffer = True
Response.Expires = -1
Response.AddHeader "cache-control", "no-store"

Dim RS, RS_GetRows, SubRs_GetRows, ROWS, strSQL, SQL

Session.CodePage  = 65001 
Response.CharSet  = "utf-8" 
Response.codepage="65001"
Response.ContentType="text/html;charset=utf-8"

wwwURL		= "http://" & Trim(Request.ServerVariables("HTTP_HOST")) & "/login.asp"
ActionUrl 	= Request.ServerVariables("PATH_INFO")

If SSUserId = "" Then 
	SSUserId	=	Session("UserId")
End If

If SSUserName = "" Then
	SSUserName	=	Session("UserName")
End If

If SSAdminType = "" Then
	SSAdminType	=	Session("AdminType")
End If

If Session("AdminType") = "1" Then
	strAdminType = "슈퍼 관리자"
Else
	strAdminType = "일반 관리자"
End If

TitleStr = "++ CatchApp 관리자 ++"

If Request("MenuCode") <> "" Then
	MenuCode = Request("MenuCode")
	session("MenuCode")	=	MenuCode
End If

SSMenuCode	=	Session("MenuCode")

ImgPath = "/images"
CssPath = "/inc/css"
JsPath 	= "/inc/js"

ReferUrl 	= Trim(Request.ServerVariables("HTTP_REFERER"))
ThisUrl 	= Trim(Request.ServerVariables("HTTP_HOST"))

If MenuCode <> "000000" Then
	MenuAuth 	= Chk_Auth(SSMenuCode,SSUserId, SSAdminType)
'	ManageYN	=	Left(MenuAuth,1)
	ManageYN	=	"Y"
	PersonYN	=	Right(MenuAuth,1)
	TopMenuName	= Chk_MenuName(SSMenuCode)
End If

%>