<!--#include virtual="/Inc/Include/ConfigSet.asp"-->
<!--#include virtual="/Inc/Include/LoginConfirm.asp"-->
<%
Dim lparamInfo(1)

MMenuLevel 	=	SqlDefense(Trim(Request("MMenuLevel")))
MMenuCode 	=	SqlDefense(Trim(Request("MMenuCode")))
MMenuName		=	SqlDefense(Trim(Request("MMenuName")))

MMenuLevelStr = MMenuLevel

If MMenuLevel <> 1 And MMenuCode = "" Then
	MMenuLevel = 0
End If

If MMenuLevel = "" Then
	MMenuLevel = 1
End If

If MMenuLevelStr = 1 Then
	SpanNo = "3"
	HeightNo = "524"
Else
	SpanNo = "6"
	HeightNo = "222"
End If	

Set conn = Server.CreateObject("ADODB.Connection")
conn.Open Enders.getConnStr(0)

		 SQL = "SELECT"
		 SQL = SQL & "	IFNULL(A.chMENU_CODE,'') "
		 SQL = SQL & "	, IFNULL(A.vchMENU_NAME,'') "
		 SQL = SQL & "	, IFNULL(A.vchMENU_URL,'') "
		 SQL = SQL & "	, IFNULL(B.vchUSER_ID,'') "
		 SQL = SQL & "	, IFNULL(B.vchUSER_NAME,'') "
		 SQL = SQL & "	, IFNULL(A.chMENU_LEVEL,'1') "
		 SQL = SQL & "	FROM "
		 SQL = SQL & "	ADMIN_MENU A LEFT OUTER JOIN "
		 SQL = SQL & "	ADMIN_USER_MASTER B ON A.vchOPERATOR_ID = B.vchUSER_ID "
		 SQL = SQL & "	WHERE "
		 SQL = SQL & "	A.chUSE_YN = 'Y'	AND A.chMENU_LEVEL     = '"& MMenuLevel &"' "
 		 SQL = SQL & "	AND (IFNULL('"& MMenuCode &"','') = '' OR A.chMENU_UP_CODE = '"& MMenuCode &"') "
		 SQL = SQL & "	ORDER BY A.chMENU_CODE ASC " 

	Set RS = conn.Execute(SQL)

	If NOT(RS.Bof) Then RS_GetRows = RS.GetRows

		 SQL2 = " select vchUSER_ID, vchUSER_NAME from ADMIN_USER_MASTER order by vchUSER_NAME "

	Set RS2 = conn.Execute(SQL2)
	
	If NOT(RS2.Bof) Then SRS_GetRows = RS2.GetRows

Enders.Dispose(0)

%>

<link rel="stylesheet" type="text/css" href="/inc/css/admin.css">
<link rel="stylesheet" type="text/css" href="/inc/css/common.css">
<script type="text/javascript" src="/inc/js/Common.Js"></script>
<script type="text/javascript">
function fn_SelectPer(MenuPerId){
	var frm = document.EndersFrm;
	
	var i = frm.HLayerArr.value

	var j = frm.SMenuPer.options.selectedIndex;
	var MenuPerText = frm.SMenuPer.options[j].text;
	if( frm.DbMenuPer.length > 0 ){
		frm.DbMenuPerId[i].value = MenuPerId.value;
		frm.DbMenuPer[i].value = MenuPerText;
		frm.DbMenuPer[i].style.display = "";
	}else{
		frm.DbMenuPerId.value = MenuPerId.value;
		frm.DbMenuPer.value = MenuPerText;
		frm.DbMenuPer.style.display = "";	
	}	
	var lyname = frm.HLayerName.value
	document.all[lyname].innerHTML = "";
	document.all[lyname].style.display = "none";
	frm.HLayerName.value 	= "";
	frm.HLayerArr.value 	= "";
}


function fn_ChangePerSelect(lyname,i){
	var frm = document.EndersFrm;
	if( frm.HLayerName.value != "" ){
		alert("열려있는 담당자 선택창을 먼저 선택해 주세요.");
		return;
	}	
	
	var SBStr = ""
	SBStr = SBStr + "<select name='SMenuPer' style='width:80px;' onchange='fn_SelectPer(this)'>"
	SBStr = SBStr + "<option value=''>선 택</option>"
	SBStr = SBStr + "<option value=''>없 음</option>"
	<%
	If isArray(SRS_GetRows) Then
		For i = 0 To UBound(SRS_GetRows, 2)	
			PersonId	 = Trim(SRS_GetRows(0, i))  
			PersonName = Trim(SRS_GetRows(1, i)) 			
	%>	
	SBStr = SBStr + "<option value='<%=PersonId%>'><%=PersonName%></option>"
	<%
		Next	
	End If		
	%>
	SBStr = SBStr + "</select>"  
	
	frm.HLayerName.value = lyname;
	frm.HLayerArr.value = i;
	if( frm.DbMenuPer.length > 0 ){
		frm.DbMenuPer[i].style.display = "none";
	}else{
		frm.DbMenuPer.style.display = "none";	
	}	
	document.all[lyname].innerHTML = SBStr;
	document.all[lyname].style.display = "";
}	
	
function fn_MenuManage(MenuCode, MenuDown, MenuLevel, MenuName){
	var frm = top.document.EndersFrm;

	if( MenuLevel == 1 ) {
		parent.SubFrame2.location.href = "<%=ActionUrl%>?MMenuLevel=2";
	}
	if( frm.MMenuCode.value != MenuCode ){
		if (MenuLevel == 1)	{
			parent.SubFrame2.location.href = "<%=ActionUrl%>?MMenuLevel=<%=MMenuLevel+1%>&MMenuCode=" + MenuCode + "&MMenuName=" + MenuName
			parent.document.all.MenuTitle2.innerHTML = MenuName;
		}
		frm.MMenuDown.value 	= MenuDown;
		frm.MMenuLevel.value 	= MenuLevel;
		frm.MMenuCode.value 	= MenuCode;
	}

}	

function fn_CheckedAll(){
	var frm = document.EndersFrm;
	if( frm.DbMenuDel ){
		if( frm.DbMenuDel.length > 0 ){ 
			for( i = 0; i < frm.DbMenuDel.length;i++){
				if(frm.AllDel.checked == true){
		    	frm.DbMenuDel[i].checked = true;
				} else {
					frm.DbMenuDel[i].checked = false;
				}	
			}
		} else {
			if(frm.AllDel.checked == true){
	    	frm.DbMenuDel.checked = true;
			} else {
				frm.DbMenuDel.checked = false;
			}				
		}
	}
}



function fn_GoAction(mode){
	var frm = document.EndersFrm;
	
	if( mode == "D" ){
		if(!confirm("삭제하시겠습니까?")){
			return;
		}
		if( !frm.DbMenuDel ){
			alert("삭제할 메뉴가 없습니다.");
			return;
		}	
		
		var MenuDelCode = "";
		if( frm.DbMenuDel.length > 0 ){ 
			for( i = 0; i < frm.DbMenuDel.length;i++){
				if( frm.DbMenuDel[i].checked == true ){
					MenuDelCode = MenuDelCode + frm.DbMenuCode[i].value + "," 
				}
			}
		} else {
			if( frm.DbMenuDel.checked == true ){
				MenuDelCode = frm.DbMenuCode.value + "," 
			}		
		}
		
		frm.HMenuDelCode.value = MenuDelCode;

		if( frm.HMenuDelCode.value == "" ){
			alert("선택된 메뉴가 없습니다.")
			return;
		}	
	} else if( mode == "S" ){
		if(!confirm("저장하시겠습니까?")){
			return;
		}
		if( !frm.DbMenuDel ){
			alert("저장할 메뉴가 없습니다.");
			return;
		}	
		if( frm.DbMenuCode.length > 0 ){ 
			for(i=0;i<frm.DbMenuCode.length;i++){
				if( udf_Trim(frm.DbMenuName(i).value) == ""){
					alert("메뉴명을 입력해주세요.")
					frm.frm.DbMenuName(i).focus();
					return;
				}
				if( frm.DbMenuUrl ){
					if( udf_Trim(frm.DbMenuUrl(i).value) == ""){
						frm.DbMenuUrl(i).value = "`";
					}
				}
				if( frm.DbMenuInfo ){			
					if( frm.DbMenuInfo(i).checked == true ){
						frm.HMenuInfo.value = frm.HMenuInfo.value + "Y, "
					}else if( frm.DbMenuInfo(i).checked == false ){
						frm.HMenuInfo.value = frm.HMenuInfo.value + "N, "
					}
				}				
				if( frm.DbMenuPopup ){	
					if( frm.DbMenuPopup(i).checked == true ){
						frm.HMenuPopup.value = frm.HMenuPopup.value + "Y, "
					}else if( frm.DbMenuPopup(i).checked == false ){
						frm.HMenuPopup.value = frm.HMenuPopup.value + "N, "
					}
				}
				if( frm.DbMenuPerId ){	
					if( udf_Trim(frm.DbMenuPerId(i).value) == ""){
						frm.DbMenuPerId(i).value = "`";
					}									
				}
			}
		}	else {
			if( udf_Trim(frm.DbMenuName.value) == ""){
				alert("메뉴명을 입력해주세요.")
				frm.frm.DbMenuName.focus();
				return;
			}
			if( frm.DbMenuUrl ){
				if( udf_Trim(frm.DbMenuUrl.value) == ""){
					frm.DbMenuUrl.value = "`";
				}
			}
			if( frm.DbMenuInfo ){			
				if( frm.DbMenuInfo.checked == true ){
					frm.HMenuInfo.value = frm.HMenuInfo.value + "Y, "
				}else if( frm.DbMenuInfo.checked == false ){
					frm.HMenuInfo.value = frm.HMenuInfo.value + "N, "
				}
			}				
			if( frm.DbMenuPopup ){	
				if( frm.DbMenuPopup.checked == true ){
					frm.HMenuPopup.value = frm.HMenuPopup.value + "Y, "
				}else if( frm.DbMenuPopup.checked == false ){
					frm.HMenuPopup.value = frm.HMenuPopup.value + "N, "
				}
			}
			if( frm.DbMenuPerId ){	
				if( udf_Trim(frm.DbMenuPerId.value) == ""){
					frm.DbMenuPerId.value = "`";
				}									
			}
		}		
	}

	frm.HMode.value = mode;
	frm.target = "";	
	frm.action="/Management/Menu/MenuManageSubAction.asp"
	frm.submit();	

}

function fn_MenuAddPopup(){
	var frm = document.EndersFrm;

	var url = "/Management/Menu/MenuManageSubPopup.asp";
	var sizeW = "500";
  <%
  If MMenuLevelStr = 1 Then
  %>  	
	var sizeH = "110";
  <%
	Else
  %>  
  var sizeH = "200";
  <%
	End If
  %>  
	var isScroll = "yes";
	<%
	If MMenuLevelStr = 1 Then
	%>
	if( frm.HMenuLevel.value == "1"){
		OpenWindowPost(url, frm, "Add1", sizeW, sizeH, isScroll, "no");
	}
	<%
	ElseIf MMenuLevelStr = 2 Then
	%>	
	if( frm.HMenuLevel.value == "2" && frm.HMenuCode.value != "" ){
		OpenWindowPost(url, frm, "Add2", sizeW, sizeH, isScroll, "no");
	} else { 
		alert("2차메뉴를 추가 하시기전에\n\n1차메뉴를 선택하세요");
		return;
	}
	<%
	End If
	%>	
}

</script>	
<form name="EndersFrm" method="post" action="/Management/Menu/MenuManageSubAction.asp">	
	<input type="hidden" name="HMenuLevel"		value="<%=MMenuLevelStr%>" >
	<input type="hidden" name="HMenuCode" 		value="<%=MMenuCode%>" >
	<input type="hidden" name="HMenuName" 		value="<%=MMenuName%>" >
	<input type="hidden" name="HMode" 				value="" >
	<input type="hidden" name="HMenuDelCode"	value="" >
	<input type="hidden" name="HLayerName"		value="" >
	<input type="hidden" name="HMenuInfo"			value="" >
	<input type="hidden" name="HMenuPopup"		value="" >
	<input type="hidden" name="HLayerArr"			value="" >
<table width="100%" cellspacing="0" cellpadding="0" >
  <tr>
    <td valign="top" align="center" >
      <table width="100%" cellspacing="0" cellpadding="0" >
        <tr>
          <td valign="top">
            <table cellpadding="0" cellspacing="0" class="sub_board_normal222_i sbn_type_d">
              <colgroup>
              <%
              If MMenuLevelStr = 1 Then
              %>              
			<col width="30px">
			<col >
			<col width="90px">
			<col width="17px">
              <%
            	Else
              %>
 			  <col width="30px">
			  <col width="150px">
     		  <col >
			  <col width="90px">
			  <col width="17px">

              <%
              End If
              %>
              </colgroup>
              <%
							If isArray(RS_GetRows) Then
								For i = 0 To UBound(RS_GetRows, 2)
									DbMenuCode	= Trim(RS_GetRows(0, i))   
									DbMenuName  = Trim(RS_GetRows(1, i))  
									DbMenuUrl  	= Trim(RS_GetRows(2, i))  
									DbMenuPerId = Trim(RS_GetRows(3, i))
									DbMenuPer   = Trim(RS_GetRows(4, i))
									DbMenuLevel = Trim(RS_GetRows(5, i))

              %>              
              <tr  height="31">
              	<input type="hidden" name="DbMenuCode" value="<%=DbMenuCode%>" >
              	<td align="center"><input type="checkbox" name="DbMenuDel"></td>
                <td align="center"><input type="text"  maxlength="20" name="DbMenuName" class="input_text iput_st_m" value="<%=DbMenuName%>" onclick="fn_MenuManage('<%=DbMenuCode%>','<%=DbMenuDown%>','<%=DbMenuLevel%>','<%=DbMenuName%>')" style="cursor:hand"></td>
                <%
                If MMenuLevelStr <> 1 Then
                %>              	
                <td align="center"><input type="text"  	maxlength="100"	name="DbMenuUrl" class="input_text iput_st_m" value="<%=DbMenuUrl%>"></td>
	              <%
	              End If
	              %> 
	              <input type="hidden" name="DbMenuPerId" value="<%=DbMenuPerId%>" >               
                <td align="center"><input type="text" name="DbMenuPer" class="input_text iput_st_m" value="<%=DbMenuPer%>" readonly style="cursor:hand" onclick="fn_ChangePerSelect('MenuPer<%=i%>','<%=i%>')"><div id="MenuPer<%=i%>"></div></td>
				<td align="center"></td>
              </tr>
         			<%
								Next
							Else
							%>
							<tr height="<%=HeightNo%>">
                <td align="center" colspan="<%=SpanNo%>">등록 된 <%=MMenuLevelStr%>차 메뉴가 없습니다.</td>
              </tr>								
							<%	
							End If	
							%>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</form>
