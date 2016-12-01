<%
Dim DbMenuCode, DbMenuName, DbMenuUrl, DbMenuLevel, DbMenuCodeUp

Set conn = Server.CreateObject("ADODB.Connection")
conn.Open Enders.getConnStr(0)

SQL = "SELECT "
SQL = SQL & " IFNULL(B.chMENU_CODE,'') "
SQL = SQL & " , IFNULL(B.vchMENU_NAME,'') "
SQL = SQL & " , IFNULL(B.vchMENU_URL,'') "
SQL = SQL & " , IFNULL(B.chMENU_LEVEL,'') "
SQL = SQL & " , IFNULL(B.chMENU_UP_CODE,'') "
SQL = SQL & " , (SELECT CASE WHEN COUNT(*) = 0 THEN 'N' ELSE 'Y' END FROM ADMIN_MENU WHERE chMENU_UP_CODE = B.chMENU_CODE) "
SQL = SQL & " FROM "
SQL = SQL & " ADMIN_MENUAUTH A INNER JOIN "
SQL = SQL & " ADMIN_MENU B ON A.chMENU_CODE = B.chMENU_CODE INNER JOIN "
SQL = SQL & " ADMIN_USER_MASTER C ON A.vchUSER_ID = C.vchUSER_ID "
SQL = SQL & " WHERE "
SQL = SQL & " A.vchUSER_ID = '"& SSUserId &"' "
If session("AdminType") = "2" Then
	SQL = SQL & " AND A.chVIEW_AUTH = 'Y' "
	SQL = SQL & " AND B.chUSE_YN = 'Y' "
End if
SQL = SQL & " ORDER BY "
SQL = SQL & " B.chMENU_CODE ASC "

Set RS = conn.Execute(SQL)

If NOT RS.Bof Then 	RS_GetRows = RS.GetRows

Enders.Dispose(0)

%>
<input type="text" name="MenuCode" value="<%=MenuCode%>">
<input type="hidden" name="MenuCilckYn" value="">
<script type="text/javascript">
function fn_OpenMenu(MenuCode, Level, ActionUrl){
	var frm = document.EndersFrm;
	var Url;

	Url = ActionUrl;

	frm.MenuCode.value 	= MenuCode;
	frm.MenuCilckYn.value 	= "Y";
	frm.action = Url;
	frm.submit();
}

function fn_GoUrl(Url, MenuCode){
	var frm = document.EndersFrm;

	frm.MenuCode.value 	= MenuCode;
	frm.MenuCilckYn.value 	= "Y";
	frm.action = Url;
	frm.submit();
}
</script>
		<div class="lnb">
			<div class="nav">
				<ul class="depth1">
				<%
				If isArray(RS_GetRows) Then
					For i = 0 To UBound(RS_GetRows, 2)
						ClassType = ""
						DbNextMenuLevel = "0"
						DbMenuCode										=	Trim(RS_GetRows(0, i))
						DbMenuName										=	Trim(RS_GetRows(1, i))
						DbMenuUrl										=	Trim(RS_GetRows(2, i))
						DbMenuLevel										=	Trim(RS_GetRows(3, i))
						If (i + 1) <= UBound(RS_GetRows, 2) Then
							DbNextMenuLevel								=	Trim(RS_GetRows(3, i+1))
						End If
						DbMenuCodeUp									=	Trim(RS_GetRows(4, i))
						DbMenuDownYn									=	Trim(RS_GetRows(5, i))

						If DbMenuLevel = "1" Then
							If Left(MenuCode,2) = Left(DbMenuCode,2) Then
								ClassType	= "active"
							End If
				%>
					<li class="menu <%=ClassType%>">
						<a href="javascript:fn_OpenMenu('<%=DbMenuCode%>',1, '<%=ActionUrl%>')" class="link"><%=DbMenuName%></a>
				<%
						ElseIf DbMenuLevel = "2" Then
				%>
						<ul class="depth2">
							<li class="menu"><a href="javascript:fn_GoUrl('<%=DbMenuUrl%>','<%=DbMenuCode%>')" class="link"><%=DbMenuName%></a></li>
						</ul>

				<%
						End If
						
						PreMenuLevel = DbMenuLevel
					Next
				End If 
				%>
					</li>
				</ul>
			</div>
		</div>