<%
Dim ParamInfo(0), DbMenuCode, DbMenuName, DbPersonalInfoYn, DbMenuUrl, DbMenuLevel, DbMenuCodeUp, DbMenuPopupYn, MenuLevelCnt
Dim PreMenuLevel, MenuLevelDisplay, MenuLevelDisplayContent, MenuLevelDisplayContentBasic, Width2, Width3, MenuLevelDisplayBasic

ParamInfo(0) = Amway.MakeParam("@USERID", advarChar, adParamInput, 20, SqlDefense(SSUserId))

SET RS = Amway.ExecSPReturnRS("US_MENULIST", ParamInfo, 0, Nothing)

If NOT RS.Bof Then 	RS_GetRows = RS.GetRows
	
RS.Close
SET RS = Nothing

Amway.Dispose(0)

%>
<input type="hidden" name="OpenMenuCode" value="">	
<input type="hidden" name="MenuCode" value="<%=MenuCode%>">
<input type="hidden" name="MenuCilckYn" value="">
<script type="text/javascript">
function fn_OpenMenu(menucode,level){
	var frm = document.AbnFrm;
	var OpenMenuCode;
	OpenMenuCode = frm.OpenMenuCode.value;

	mview = eval("m"+menucode);

	if( mview.className == "off" ){
		mview.className = "on";
		OpenMenuCode = OpenMenuCode + "," + menucode;
	} else {
		mview.className = "off";	
		OpenMenuCode = OpenMenuCode.replace(","+menucode,"")

		if( level == "1" && OpenMenuCode != ""){
			var OpenMenuArr = OpenMenuCode.toString().split(",");
			for(i = 1; i < OpenMenuArr.length;i++){
				if( OpenMenuArr[i].substring(0,2) == menucode.substring(0,2) ){
					mview3 = eval("m"+OpenMenuArr[i]);
					mview3.className = "off";
					OpenMenuCode = OpenMenuCode.replace(","+OpenMenuArr[i],"")
				}
			} 
		}
	}	

	frm.OpenMenuCode.value = OpenMenuCode;
}

function fn_GoUrl(Url, MenuCode, PopupYn, PersonalInfoYn){
	if( PersonalInfoYn == "Y" ){
		var frm = document.AbnFrm;
		frm.MenuCode.value 	= MenuCode;
		frm.MenuCilckYn.value 	= "Y";
		frm.action = Url;
		frm.submit();
	}else{
		alert("개인정보가 포함된 페이지 입니다.\n\n권한이 없습니다. 관리자에게 문의하세요.");
	}	
}
</script>
<style type="text/css">
<!--
.select{COLOR:#FFFE00 1px solid;}
.deselect{COLOR:#9BAEAC 1px solid;}
.on{display:block;}
.off{display:none;}
-->
</style>
<table cellspacing="0" cellpadding="0">
	<tr>
		<td><img src="<%=ImgPath%>/main/t_admin.gif" width="146" height="52"></td>
	</tr>
	<tr>
		<td align="center" background="<%=ImgPath%>/main/r_bg.gif">
			<!--서브메뉴시작 -->
			<table width="90%" cellspacing="0" cellpadding="0">
				<!--서브메뉴01시작 -->
				<%
				If isArray(RS_GetRows) Then
					For i = 0 To UBound(RS_GetRows, 2)
						DbNextMenuLevel = "0"
						DbMenuCode										=	Trim(RS_GetRows(0, i))
						DbMenuName										=	Trim(RS_GetRows(1, i))
						DbPersonalInfoYn							=	Trim(RS_GetRows(2, i))
						DbMenuUrl											=	Trim(RS_GetRows(3, i))
						DbMenuLevel										=	Trim(RS_GetRows(4, i))
						If (i + 1) <= UBound(RS_GetRows, 2) Then
							DbNextMenuLevel								=	Trim(RS_GetRows(4, i+1))
						End If
						DbMenuCodeUp									=	Trim(RS_GetRows(5, i))
						DbMenuPopupYn									=	Trim(RS_GetRows(6, i))
						DbMenuDownYn									=	Trim(RS_GetRows(7, i))
				
						ClassName = ""
						ClassType	= "off"
						If DbMenuLevel = "1" Then
							If Left(MenuCode,2) = Left(DbMenuCode,2) Then
								ClassName = "style='font-weight:bold;'"
							End If
				%>
				<tr>
					<td class="r_new02">
						<table width="100%" cellspacing="0" cellpadding="0">
							<tr>
								<td><a href="javascript:fn_OpenMenu('<%=DbMenuCode%>',1)" class="pdl_10" <%=ClassName%>><%=DbMenuName%></a></td>
								<td width="9" align="right"><img src="<%=ImgPath%>/main/r_p.gif" width="9" height="11"></td>
							</tr>
						</table>
					</td>
				</tr>
				<%
						ElseIf DbMenuLevel = "2" Then
							
							If Left(MenuCode,2) = Left(DbMenuCode,2) Then
								ClassType = "on"
							End If	
							
							If Left(MenuCode,4) = Left(DbMenuCode,4) Then
								ClassName = "style='font-weight:bold;'"
							End If	
														
							If PreMenuLevel = "1" Then
								Response.Write "<tr id='m" & DbMenuCodeUp & "' class='" & ClassType & "'><td class='r_new02'>"
							End If
							If DbMenuDownYn = "Y" Then
								Response.Write "<table width='100%' cellspacing='0' cellpadding='0' height='18'><tr><td><span class='txt_green_11'>▶</span><a href=""javascript:fn_OpenMenu('" & DbMenuCode & "',2);"" " & ClassName & " >" & DbMenuName & "</a>"
							Else
								If DbMenuPopupYn = "N" Then
									Response.Write "<table width='100%' cellspacing='0' cellpadding='0' height='18'><tr><td><span class='txt_green_11'>▶</span><a href=""javascript:fn_GoUrl('" & DbMenuUrl & "','" & DbMenuCode & "','" & DbMenuPopupYn & "','" & DbPersonalInfoYn & "')""" & ClassName & " >" & DbMenuName & "</a>"
								Else
									Response.Write "<table width='100%' cellspacing='0' cellpadding='0' height='18'><tr><td><span class='txt_green_11'>▶</span><a href=""" & DbMenuUrl & """ " & ClassName & " target=""blank"">" & DbMenuName & "</a>"
								End If		
							End If	
							
							If DbNextMenuLevel = "2" Then
								Response.Write "</td></tr></table>"
							ElseIf DbNextMenuLevel <> "3" Then
									Response.Write "</td></tr></table></td></tr>"
							End If	
							
						ElseIf DbMenuLevel = "3" Then
							
							If Left(MenuCode,4) = Left(DbMenuCode,4) Then
								ClassType = "on"
							End If	
							If Left(MenuCode,6) = Left(DbMenuCode,6) Then
								ClassName = "style='font-weight:bold;'"
							End If
								
							If PreMenuLevel = "2" Then
								Response.Write "<table width='100%' cellspacing='0' cellpadding='0' ><tr id='m" & DbMenuCodeUp & "' class='" & ClassType & "'><td>"
							End If	
							If DbMenuPopupYn = "N" Then
								Response.Write "<table width='100%' cellspacing='0' cellpadding='0' height='18'><tr><td> - <a href=""javascript:fn_GoUrl('" & DbMenuUrl & "','" & DbMenuCode & "','" & DbMenuPopupYn & "','" & DbPersonalInfoYn & "')"" " & ClassName & " >" & DbMenuName & "</a></td></tr></table>"
							Else
								Response.Write "<table width='100%' cellspacing='0' cellpadding='0' height='18'><tr><td> - <a href=""" & DbMenuUrl & """ " & ClassName & " target=""blank"">" & DbMenuName & "</a></td></tr></table>"
							End If	
							
							If DbNextMenuLevel = "2" Then
								Response.Write "</td></tr></table></td></tr></table>"
							ElseIf DbNextMenuLevel <> "3" Then
								Response.Write "</td></tr></table></td></tr></table></td></tr>"
							End If	
						End If
						PreMenuLevel = DbMenuLevel
					Next
				End If 
				%>
				<tr>
					<td height="20">
					</td>	
				</tr>	
				<!--서브메뉴01끝 -->
			</table>
			<!--서브메뉴끝-->
		</td>
	</tr>
</table>
