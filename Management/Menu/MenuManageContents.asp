		<div class="content">
			<div class="box_round">
				<!-- 페이지명 -->
				<div class="top_area">
					<h3 class="h_tit">메뉴 관리</h3>
				</div>
				<!-- //페이지명 -->				
				<!-- tbDesign -->

				<input type="hidden" name="MMenuDown" 	value="N" >
				<input type="hidden" name="MMenuLevel" 	value="0" >
				<input type="hidden" name="MMenuCode" 	value="<%=MenuCode%>" >
				<table width="100%" cellspacing="0" cellpadding="0" border="0">
					<tr>
						<td width="10" rowspan=3>
							&nbsp;
						</td>
						<td height="500" rowspan=3 width="38%">
					  <table width="100%" cellspacing="0" cellpadding="0">
						<tr>
						  <td width="24%" height="30"><span class="txt_ju_11">▶</span> <span class="txt_blue_14"><strong>1차메뉴</strong> </span></td>
						  <td width="76%" align="right">
									<%
										If ManageYN = "Y" Then
										%>
							<input type="button" value="추가" class="button2 yellow" onclick="SubFrame1.fn_MenuAddPopup()">
							<input type="button" value="저장" class="button2 blue" onclick="SubFrame1.fn_GoAction('S')">
							<input type="button" value="삭제" class="button2" onclick="SubFrame1.fn_GoAction('D')">
							<%
								End If
							%>  
						  </td>
						</tr>
					  </table>			
					  <table cellpadding="0" cellspacing="0" class="sub_board_normal222 sbn_type_d">
						<colgroup>
						<col width="30px">
						<col >
						<col width="90px">
						<col width="17px">
						</colgroup>
						<tr>
							<th align="center"><input type="checkbox" name="AllDel"	onclick="fn_CheckedAll()"></td>
						  <th align="center">메뉴명</th>
						  <th align="center">담당자</th>
						  <th align="center"></th>
						</tr>			
							</table>			
							<iframe name="SubFrame1" width="100%" height="90%" frameborder="0" src="/Management/Menu/MenuManageSub.asp?MMenuLevel=1"></iframe>	
						</td>
						<td width="10" rowspan=3>
							&nbsp;
						</td>
						<td height="564" rowspan=4 width="59%">
					  <table width="100%" cellspacing="0" cellpadding="0">
						<tr>
						  <td width="16%" height="30"><span class="txt_ju_11">▶</span> <span class="txt_blue_14"><strong>2차메뉴</strong> </span></td>
						  <td width="25%" height="30"><span class="txt_12" id="MenuTitle2"></span></td>
						  <td width="59%" align="right">
									<%
										If ManageYN = "Y" Then
										%>
							<input type="button" value="추가" class="button2 yellow" onclick="SubFrame2.fn_MenuAddPopup()">
							<input type="button" value="저장" class="button2 blue" onclick="SubFrame2.fn_GoAction('S')">
							<input type="button" value="삭제" class="button2" onclick="SubFrame2.fn_GoAction('D')">
							<%
								End If
							%>  
						  </td>
						</tr>
					  </table>	
					  <table cellpadding="0" cellspacing="0" class="sub_board_normal222 sbn_type_d">
						<colgroup>
						<col width="30px">
						<col width="150px">
						<col >
						<col width="90px">
						<col width="17px">
						</colgroup>
						<tr>
							<th align="center"><input type="checkbox" name="AllDel"	onclick="fn_CheckedAll()"></td>
						  <th align="center">메뉴명</th>
						  <th align="center">URL</th>
						  <th align="center">담당자</th>
						  <th align="center"></th>
						</tr>   
					  </table>	           		
							<iframe name="SubFrame2" width="100%" height="80%" frameborder="0" src="/Management/Menu/MenuManageSub.asp?MMenuLevel=2"></iframe>
						</td>
					</tr>
					<tr>
						<td height="10">
						</td>		
					</tr>

				</table>	
				<!-- //tbDesign -->

				</div>
				
			</div>
		</div>