/**
 * @author Administrator
 */		
		// ���� �Է��� Ȱ��ȭ/��Ȱ��ȭ
		function fu_BrandInputVisible() {
			$('#brandVisible').slideToggle('slow');
		}
		
		// �޷� �˾����� ������ ������ �Է� (������, 2011-04-22)
		function fn_SelBookingDays(arrSelDayValue, year, month){
			
			//���� ������ ���� ����
			fn_DaySetRemove();
			
			for (i = 0, arrayRow = arrSelDayValue.length; i < arrayRow; i++) {
				var content = $('span[name="addDay"]');				
				
				if(content.length == 0) {
					fn_SetDay(arrSelDayValue[i]);
				}
				else {
					var duplicateCheck = 0;
					for (j = 0, rowCount = content.length; j < rowCount; j++) {
						if(content[j].innerHTML.replace("&nbsp;","").replace("��","") == (arrSelDayValue[i])) {
							duplicateCheck++;
						}
					}
					
					if (duplicateCheck == 0) {
						fn_SetDay(arrSelDayValue[i]);
					}
				}
			}
			
			// �˾����� ������ ���� ����
			if (month.substring(0, 2) != "10") {
				month = month.substring(0, 2).replace("0", "");
			}
			
			if($("#currentDate") != undefined) {
				$("#currentDate").html(year + "�� " + month + "��");
				var hdnCurrentDate = document.getElementById("hdnCurrentDate"); //���
				hdnCurrentDate.value = year + month;				
			}	
		}
		
		// �޷� �˾����� ������ ������ �Է� (����������� �˾� ȣ���)
		function fn_SelBookingModifyDays(year, month, day){
			var param_SetDays = document.getElementById("param_SetDays");
			var hdnCurrentDate = document.getElementById("hdnCurrentDate"); //��� 
			var hdnCurrentDay  = document.getElementById("hdnCurrentDay");  //�����
			
			param_SetDays.value  = day;
			
			if (month.length == 1) month = "0" + month;
			if (day.length == 1)   day   = "0" + day;
									
			$("#bookingDate").html(year + "-" + month + "-" + day);
			hdnCurrentDate.value = year + month;
			hdnCurrentDay.value  = year + month + day;
		}
		
		// �����Ͽ��� ȣ�� (��/�� ���� �޷� ����)
		function fn_PopupSelDay(url) {
			var varSetDays = document.getElementById("param_SetDays");
			var varSection = document.getElementById("param_Section");
			var rdolTargetSingle = document.getElementById("rdolTargetSingle");
			
			var target;
			if (rdolTargetSingle.checked == true)
				target = "0";
			else
				target = "1";
			
			// ������ ���� �˾����� ������.
			var bookingDefaultDate = $("#hdnCurrentDate").val();
			year  = bookingDefaultDate.substring(0, 4);
			month = bookingDefaultDate.substring(4, 7);
			if (month.length == 1) month = "0" + month;

			url += ("?param_SetDays="+varSetDays.value+"&param_Section="+varSection.value+"&param_Target="+target+"&param_year="+year+"&param_month="+month+"&param_Type=1");
			window.open(url,'calset','width=420,height=490');
		}
		
		// ����������� ȣ��
		function fn_PopupSelDayModify(url) {
			var varSetDays = document.getElementById("param_SetDays");
			var varSection = document.getElementById("param_Section");
			var target = document.getElementById("param_Target");

			// ������ ���� �˾����� ������.
			var bookingDefaultDate = $("#hdnCurrentDate").val();
			year  = bookingDefaultDate.substring(0, 4);
			month = bookingDefaultDate.substring(4, 7);
			if (month.length == 1) month = "0" + month;
			
			url += ("?param_SetDays="+varSetDays.value+"&param_Section="+varSection.value+"&param_Target="+target.value+"&param_year="+year+"&param_month="+month+"&param_Type=1&param_Modify=Y");
			window.open(url,'calset','width=420,height=490');
		}
				
		// ���� �߰� (������, 2011-04-22)
		function fn_SetDay(addDay) 
		{
			var content = $('div[name="dayMultiSet"]');
			if(content != undefined){
				var count = content.length;				
				var addDayID = "addDay_" + parseInt(count + 1).toString();				
				var addHTML;			

				addHTML  = "<div name=\"dayMultiSet\" id=\"" + addDayID + "\" class=\"mt5\">";
				addHTML += "<span class=\"day\">" + addDay + "&nbsp;��</span>";
				addHTML += "<input type=\"hidden\" name=\"hdnaddDay\" id=\"hdn" + addDayID + "\" value=\"" + addDay + "\" /><br />";
				addHTML += "</div>";
				
				document.getElementById("param_SetDays").value += (addDay + ",");
								
				$("#daySet").append(addHTML);						
			}					
		}
		
		// ���� ���� (������)
		function fn_DaySetRemove()
		{	
			var content = $('div[name="dayMultiSet"]');			
			var count = content.length;			
			var addDayID;	
			
			if(content != undefined){
				for (var i=0; i < count; i++) {
					addDayID = "addDay_" + parseInt(i + 1).toString();
					$("#" + addDayID).remove();
				}
			}			
			// popup���� ���� param
			document.getElementById("param_SetDays").value = "";
		}
		
		// �� �̵� (������, 2011-04-21)
		function fn_SetDate(mode)
		{
			var currentDate, currentYear, currentMonth;
			var prevDate;
			
			if ($("#currentDate").html != "") {			
				currentDate = $("#currentDate").html();
				currentDate = currentDate.replace("��","").replace(" ","").replace("��","");
				currentYear = currentDate.substring(0, 4);
				currentMonth = currentDate.substring(4);
				if(currentDate.substring(4).length == 1)
				{
					currentMonth = "0" + currentDate.substring(4);
				}

				currentDate = String(currentMonth + "/01" + "/" + currentYear);		
				currentDate = new Date(currentDate);
				
				switch (mode)
				{
					case "previous":
						currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
						break;
					case "next":
						currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
						break;
					default:
						break;
				}
				
				if (currentDate.getMonth() == 0) {
					prevDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);
				} else {
					prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
				}
				
				currentYear = currentDate.getFullYear();
				currentMonth = currentDate.getMonth() + 1;
			}
			else {
				currentDate = new Date();
				currentYear = currentDate.getFullYear();
				currentMonth = parseInt(currentDate.getMonth()) + 1;
			}
			
			$("#currentDate").html(currentYear + "�� " + currentMonth.toString() + "��");
			$("#hdnCurrentDate").val(currentYear + currentMonth.toString());
			if (prevDate.getMonth() > 9) {
				$("#reservationsOpenDate").val(prevDate.getFullYear().toString() + prevDate.getMonth().toString() + "01");
			} else {
				if (prevDate.getMonth() == 0) {
					$("#reservationsOpenDate").val(prevDate.getFullYear().toString() + "12" + "01");
				} else {
					$("#reservationsOpenDate").val(prevDate.getFullYear().toString() + "0" + prevDate.getMonth().toString() + "01");
				}
			}
		}
		
		// �ð� ���� �߰� (������, 2011-04-22)
		function fn_TimeSetAdd(){
			var content = $('div[name="timeBandWidth"]');
			
			if (content != undefined && content.length < 4) {
				var count = parseInt(document.getElementById("time_Counting").value);
				document.getElementById("time_Counting").value = parseInt(count) + 1;
				//var count = content.length;
				var timeBandWidthID = "timeBandWidth_" + parseInt(count + 1).toString();
				var fromHourID = "fromHour_" + parseInt(count + 1).toString();
				var fromMinuteID = "fromMinute_" + parseInt(count + 1).toString();
				var toHourID = "toHour_" + parseInt(count + 1).toString();
				var toMinuteID = "toMinute_" + parseInt(count + 1).toString();
				var minuteValue = 0;
				var addHTML;
							
				addHTML  = "<div name=\"timeBandWidth\" id=\"" + timeBandWidthID + "\" class=\"mt5\">";
				addHTML += "<select name=\"fromHour\" id=\"" + fromHourID + "\" style=\"text-align:right; width:50px;\">";							
				for(i = 1, maxCount = 24; i <= maxCount; i++)
				{
					addHTML += "<option value=\"" + i + "\" style=\"text-align:right;\">" + i + "</option>";
				}				
				addHTML += "</select>&nbsp;";
				addHTML += "<span>��</span>&nbsp;";
				addHTML += "<select name=\"fromMinute\" id=\"" + fromMinuteID + "\" style=\"text-align:right; width:50px;\">";
				while (minuteValue <= 55)
				{
					if(minuteValue < 10)
					{
						minuteValue = 0 + minuteValue.toString();	
					}

				  	addHTML += "<option value=\"" + minuteValue + "\" style=\"text-align:right;\">" + minuteValue + "</option>";
				  	minuteValue = parseInt(minuteValue) + 5;
				}	
				addHTML += "</select>&nbsp;";
				addHTML += "<span>��</span>&nbsp;~&nbsp;";
				addHTML += "<select name=\"toHour\" id=\"" + toHourID + "\" style=\"text-align:right; width:50px;\">";							
				for(i = 1, maxCount = 24; i <= maxCount; i++)
				{
					addHTML += "<option value=\"" + i + "\" style=\"text-align:right;\">" + i + "</option>";
				}		
				addHTML += "</select>&nbsp;";
				addHTML += "<span>��</span>&nbsp;";
				addHTML += "<select name=\"toMinute\" id=\"" + toMinuteID + "\" style=\"text-align:right; width:50px;\">";
				minuteValue = 0;
				while (minuteValue <= 55)
				{
					if(minuteValue < 10)
					{
						minuteValue = 0 + minuteValue.toString();	
					}

				  	addHTML += "<option value=\"" + minuteValue + "\" style=\"text-align:right;\">" + minuteValue + "</option>";
				  	minuteValue = parseInt(minuteValue) + 5;
				}
				addHTML += "</select>&nbsp;";
				addHTML += "<span>��</span>&nbsp;";	
				if (count >= 0) {
					addHTML += "<img src=\"/images/btns_del.gif\" alt=\"����\" onclick=\"fn_TimeSetRemove('" + timeBandWidthID + "')\" />";
				}
				addHTML += "</div>";
				
				$("#timeSet").append(addHTML);		

				if (content.length == 0) {
					if (document.getElementById("param_Section").value == "1") { //NBE
						document.getElementById(fromHourID).value = "14";
						document.getElementById(fromMinuteID).value = "00";
						document.getElementById(toHourID).value = "18";
						document.getElementById(toMinuteID).value = "00";
					} else {
						document.getElementById(fromHourID).value = "14";
						document.getElementById(fromMinuteID).value = "00";
						document.getElementById(toHourID).value = "17";
						document.getElementById(toMinuteID).value = "00";					
					}
				} else {
					if (document.getElementById("param_Section").value == "1") { //NBE
						document.getElementById(fromHourID).value = "14";
						document.getElementById(fromMinuteID).value = "00";
						document.getElementById(toHourID).value = "18";
						document.getElementById(toMinuteID).value = "00";
					} else {
						document.getElementById(fromHourID).value = "14";
						document.getElementById(fromMinuteID).value = "00";
						document.getElementById(toHourID).value = "17";
						document.getElementById(toMinuteID).value = "00";					
					}
				}
			}
			else{
				alert("�ð� ������ 4�� ������ �߰� ���� �մϴ�.");
			}
		}
		
		// ����������� ����� �ð������� ���
		function fn_TimeSetAddModify(idx, fromHour, fromMinute, toHour, toMinute){							
			// selectbox ����
			fn_TimeSetAdd();
			
			var content = $('div[name="timeBandWidth"]');
			if (content != undefined && content.length < 4) {
				var count = content.length;
				var fromHourID = "fromHour_" + parseInt(idx + 1).toString();
				var fromMinuteID = "fromMinute_" + parseInt(idx + 1).toString();
				var toHourID = "toHour_" + parseInt(idx + 1).toString();
				var toMinuteID = "toMinute_" + parseInt(idx + 1).toString();
				
				document.getElementById(fromHourID).value = parseInt(fromHour);
				document.getElementById(fromMinuteID).value = fromMinute;
				document.getElementById(toHourID).value = parseInt(toHour);
				document.getElementById(toMinuteID).value = toMinute;
			}
		}
		
		// ����������� ����� Ư�������� (IBO)
		function fn_IBOSetAddModify(idx, ibo, nbe){							
			fn_IBOAdd();
			
			var content = $('div[name="reservationsIBO"]');
			if (content != undefined) {
				var count = content.length;
				var reservationsIBO = "reservationsIBO_" + parseInt(idx + 1).toString();
				var reservationsNBE = "reservationsNBE_" + parseInt(idx + 1).toString();
				
				document.getElementById(reservationsIBO).value = ibo;
				document.getElementById(reservationsNBE).value = nbe;
			}
		}		
		
		// �ð� ���� ���� (������, 2011-04-22)
		function fn_TimeSetRemove(timeBandWidthID){
			var content = $('div[name="timeBandWidth"]');

			if (content.length <= 1)
				return;
			
			$("#" + timeBandWidthID).remove();
		}
		
		function fn_IBOSearch(onUrl)
		{
			window.open(onUrl,'ibofind','width=400,height=400,,scrollbars=yes'); 
			return false;
		}
			
		// Ư�� ������ IBO ��ȣ �߰� (������, 2011-04-22)
		function fn_IBOAdd(){
			var content = $('div[name="reservationsIBO"]');
			
			if (content != undefined) {
				var count = content.length;
				var reservationsIBOID  = "reservationsIBO_" + parseInt(count + 1).toString();
				var reservationsNBEID  = "reservationsNBE_" + parseInt(count + 1).toString();
				var reservationsIBODiv = "reservationsIBODIV_" + parseInt(count + 1).toString();
				var addHTML;			
				addHTML  = "<div name=\"reservationsIBO\" id=\"" + reservationsIBODiv + "\" class=\"mt5\">";
				addHTML += "<input type=\"text\" id=\"" + reservationsIBOID + "\" name=\"IBONumber\" style=\"width:100px;\" class=\"input01\" value=\"\" readonly/>&nbsp;";
				addHTML += "<input type=\"hidden\" id=\"" + reservationsNBEID + "\" name=\"NBENumber\" style=\"width:100px;\" class=\"input01\" value=\"\" />&nbsp;";
				addHTML += "<img src=\"/images/btns_find.gif\" alt=\"ã��\" onclick=\"fn_IBOSearch('/Common/asp/Popup/PopIbofind.asp?param_IboType=2&param_IboLoc=" + reservationsIBOID + "&param_NbeLoc=" + reservationsNBEID + "');\" />&nbsp;";
				if (count >= 0) {
					addHTML += "<img src=\"/images/btns_del.gif\" alt=\"����\" onclick=\"fn_IboSetRemove('" + reservationsIBODiv + "', '" + reservationsIBOID + "', '" + reservationsNBEID + "')\" />";
				}
				addHTML += "</div>";
								
				$("#iboSet").append(addHTML);	
			}	
		}		
		
		// Ư�� ������ IBO ��ȣ ���� (������, 2011-04-22)
		function fn_IboSetRemove(reservationsIBODiv, reservationsIBOID, reservationsNBEID)
		{	
			var content = $('div[name="reservationsIBO"]');

			if (content.length <= 1) {
				$("#" + reservationsIBOID).val("");
				$("#" + reservationsNBEID).val("");
				return;
			}
			
			$("#" + reservationsIBODiv).remove(); 
		}	
				
		// �޷����� �̵�
		function fn_GoCalendar(param_section, param_year, param_month) {
			location.href="BrandManageSubCalendar.asp?param_section="+param_section+"&param_year="+param_year+"&param_month="+param_month;
		}
		
		// �������ȭ������ �̵�
		function fn_GoBookingModify(param_bookingDtlId, param_section) {			
			location.href="BrandManageSubReserModify.asp?param_section="+param_section+"&param_bookingDtlId="+param_bookingDtlId;			
		}
		
		// ����
		function fn_MstDelete(rowNum) {
			if (rowNum > 0) {
				alert("�����ڰ� ��ϵǾ� ������ �� �����ϴ�.");
				return false;
			}
			var brandForm = document.BrandForm;	
			brandForm.action = "./BrandManageSubAction.asp";
			
			var param_SaveModityCheck = document.getElementById("param_SaveModityCheck");
			param_SaveModityCheck.value = "D";
			
			brandForm.submit();		
		}
		
		// ���� : 'S', ���� : 'M'
		function fn_Validation(saveModityCheck) {
			var brandForm = document.BrandForm;		
			
			// �����Է�â ��Ȱ��ȭ
			$("#brandVisisble").css("display", "");
			
			var param_SaveModityCheck = document.getElementById("param_SaveModityCheck");
			param_SaveModityCheck.value = saveModityCheck;
			
			var rdolTargetSingle, rdolTarget;			
			var dayOne = document.getElementById("dayOne");
			var dayTwo = document.getElementById("dayTwo");
			var dayThree = document.getElementById("dayThree");
			
			var reservationsOpenDate     = document.getElementById("reservationsOpenDate");
			var reservationsOpenTime     = document.getElementById("reservationsOpenTime");
			var reservationsPossibleDate = document.getElementById("reservationsPossibleDate");
			
			var cancellation = document.getElementById("cancellation");
			var penaltyDate = document.getElementById("penaltyDate"); 
			var renewalDate = document.getElementById("renewalDate"); 
			
			var pinLevelFromOne   = document.getElementById("pinLevelFromOne");
			var pinLevelToOne     = document.getElementById("pinLevelToOne");
			var pinLevelFromTwo   = document.getElementById("pinLevelFromTwo");
			var pinLevelToTwo     = document.getElementById("pinLevelToTwo");
			var pinLevelFromThree = document.getElementById("pinLevelFromThree");
			var pinLevelToThree   = document.getElementById("pinLevelToThree");
			
			// �ð������� 
			var content = $('div[name="timeBandWidth"]');			
			var fromHour, fromMinute, toHour, toMinute, fromTime, toTime;
			var fromHourID, fromMinuteID, toHourID, toMinuteID;
			var PrevFromHour, prevFromMinute, prevToHour, prevToMinute, prevFromTime, prevToTime;
			var prevFromHourID, prevFromMinuteID, prevToHourID, prevToMinuteID;
			var divID, prevDivID;
			var number, prevNumber;
			
			if (content != undefined && content.length >= 1) {
				for(var i = 0; i < content.length; i++) {
					divID = content[i].id;
					number = divID.split("_");
					fromHourID = "fromHour_" + parseInt(number[1]).toString();
					fromMinuteID = "fromMinute_" + parseInt(number[1]).toString();
					toHourID = "toHour_" + parseInt(number[1]).toString();
					toMinuteID = "toMinute_" + parseInt(number[1]).toString();
					
					if (fromHourID != null && toHourID != null) {
						if($("#" + fromHourID) != undefined) {
							fromHour = $("#" + fromHourID + " option:selected").val();
							fromMinute = $("#" + fromMinuteID + " option:selected").val();
						}
						if($("#" + toHourID) != undefined) {
							toHour   = $("#" + toHourID   + " option:selected").val();
							toMinute = $("#" + toMinuteID + " option:selected").val();
						}					
					}
					if (parseInt(fromHour) > parseInt(toHour)) {
						alert('���� �ð��� ����ð����� Ŭ �� �����ϴ�');
						$("#" + fromHourID).focus();
						return false;
					}
					
					fromTime = parseInt(fromHour) * 100 + parseInt(fromMinute);
					toTime = parseInt(toHour) * 100 + parseInt(toMinute);
					
					for(var j = 0; j < content.length; j++) {
						if (i != j) {
							prevDivID = content[j].id;
							prevNumber = prevDivID.split("_");
							prevFromHourID = "fromHour_" + parseInt(prevNumber[1]).toString();
							prevFromMinuteID = "fromMinute_" + parseInt(prevNumber[1]).toString();
							prevToHourID = "toHour_" + parseInt(prevNumber[1]).toString();
							prevToMinuteID = "toMinute_" + parseInt(prevNumber[1]).toString();
							
							if (fromHourID != null && toHourID != null) {
								if($("#" + fromHourID) != undefined) {
									prevFromHour = $("#" + prevFromHourID + " option:selected").val();
									prevFromMinute = $("#" + prevFromMinuteID + " option:selected").val();
								}
								if($("#" + toHourID) != undefined) {
									prevToHour   = $("#" + prevToHourID   + " option:selected").val();
									prevToMinute = $("#" + prevToMinuteID + " option:selected").val();
								}					
							}
							
							prevFromTime = parseInt(prevFromHour) * 100 + parseInt(prevFromMinute);
							prevToTime = parseInt(prevToHour) * 100 + parseInt(prevToMinute);
							
							if ((fromTime >= prevFromTime && fromTime <= prevToTime) || (toTime >= prevFromTime && toTime <= prevToTime) || fromTime >= prevFromTime && toTime <= prevToTime) {
								alert('�ð��� �ߺ��Ǿ� �ֽ��ϴ�.');
								return false;
							}
						}
					}
				}
			}
			
			var contentIBO = $('div[name="reservationsIBO"]');
			var reservationsIBO;
			var IBOs, inputIBOs, excelIBOs;
			inputIBOs = "";
			if (contentIBO != undefined && contentIBO.length >= 1) {
				for (var i = 0; i < contentIBO.length; i++) {
					divID = contentIBO[i].id;
					number = divID.split("_");
					reservationsIBO = "reservationsIBO_" + parseInt(number[1]).toString();
					if (document.getElementById(reservationsIBO).value != "") {
						inputIBOs = inputIBOs + document.getElementById(reservationsIBO).value + "|";
					}
				}
			}
			var excelIBOs = document.BrandForm.iboIDExcel.value;
			IBOs = inputIBOs + excelIBOs.replace(/(^|\r\n)/g, "|");
			IBOs = IBOs.split("|");
			for (var i = 0; i < IBOs.length; i++) {
				//alert(IBOs[i] + " // " + IBOs[i].replace(" ", "").length);
				if (IBOs[i].replace(" ", "").length > 0) {
					for (var j = i + 1; j < IBOs.length; j++) {
						if (IBOs[j].replace(" ", "").length > 0) {
							if (IBOs[i] == IBOs[j]) {
								alert(IBOs[i] + ' �������ڰ� �ߺ��Ǿ� �ֽ��ϴ�.');
								return false;
							}
						}
					}
				}
			}
			
			if (saveModityCheck == "S") {
				// ���ϼ���
				var content = $('div[name="dayMultiSet"]');
				if(content != undefined){
					var count = content.length;
					if (count == 0) {
						alert('����(����)�� 1 �� �̻� �����Ͻñ� �ٶ��ϴ�');
						return;
					}
				}
			}
			
			// ���డ�� �ο�
			var txtMaxNum = document.getElementById("maxNum");
			var txtMinNum = document.getElementById("minNum");
			
			if(txtMaxNum != undefined) {
				if (parseInt(txtMinNum.value) > parseInt(txtMaxNum.value)){
					alert('���డ�� �ο� �ּҰ��� �ִ밪���� Ŭ �� �����ϴ�');
					txtMinNum.focus();
					return false;
				}
			}					
			
			// �� �� �켱���� (Data Sort�� �ݵ�� PIN���� ASC �ؾ��Ѵ�)
			var vPinLevelFromOneIdx   = parseInt(pinLevelFromOne.options[pinLevelFromOne.selectedIndex].value);
			var vPinLevelToOneIdx     = parseInt(pinLevelFromOne.options[pinLevelToOne.selectedIndex].value);
			var vPinLevelFromTwoIdx   = parseInt(pinLevelFromOne.options[pinLevelFromTwo.selectedIndex].value);
			var vPinLevelToTwoIdx     = parseInt(pinLevelFromOne.options[pinLevelToTwo.selectedIndex].value);
			var vPinLevelFromThreeIdx = parseInt(pinLevelFromOne.options[pinLevelFromThree.selectedIndex].value);
			var vPinLevelToThreeIdx   = parseInt(pinLevelFromOne.options[pinLevelToThree.selectedIndex].value);
			
			if (pinLevelFromOne.selectedIndex == 0 && pinLevelToOne.selectedIndex == 0) {
				dayOne.value = "";
			} else {
				if (pinLevelFromOne.selectedIndex < pinLevelToOne.selectedIndex) {
					alert('���õ� ���� �켱������  Ȯ���Ͻñ� �ٶ��ϴ�');
					pinLevelFromOne.focus();
					return false;
				} else if (dayOne.value == "" || dayOne.value == "0") {
					alert('Award ���ڸ� Ȯ�����ּ���!');
					dayOne.focus();
					return false;
				}
			}
			if (pinLevelFromTwo.selectedIndex == 0 && pinLevelToTwo.selectedIndex == 0) {
				dayTwo.value = "";
			} else {
				if (pinLevelFromTwo.selectedIndex < pinLevelToTwo.selectedIndex) {
					alert('���õ� ���� �켱������  Ȯ���Ͻñ� �ٶ��ϴ�');
					pinLevelFromTwo.focus();
					return false;
				} else if (dayTwo.value == "" || dayTwo.value == "0") {
					alert('Award ���ڸ� Ȯ�����ּ���!');
					dayTwo.focus();
					return false;
				}
			}
			if (pinLevelFromThree.selectedIndex == 0 && pinLevelToThree.selectedIndex == 0) {
				dayThree.value = "";
			} else {
				if (pinLevelFromThree.selectedIndex < pinLevelToThree.selectedIndex) {
					alert('���õ� ���� �켱������  Ȯ���Ͻñ� �ٶ��ϴ�');
					pinLevelFromThree.focus();
					return false;
				} else if (dayThree.value == "" || dayThree.value == "0") {
					alert('Award ���ڸ� Ȯ�����ּ���!');
					dayThree.focus();
					return false;
				}
			}
			
			var targetMsg1, targetMsg2 = "";
			if (saveModityCheck == "S") {
				rdolTargetSingle = document.getElementById("rdolTargetSingle");					
				// �ɺ��켱���� �� ��Ÿ���� �Է°�				
				if (rdolTargetSingle.checked == true) {
					targetMsg1 = "������ �г�Ƽ ����Ⱓ�� �Է��ϼ���";
					targetMsg2 = "���� �� �� ���� �Ұ� �Ⱓ�� �Է��ϼ���";
				} else {
					targetMsg1 = "14���� ��ҽ� �г�Ƽ ����Ⱓ�� �Է��ϼ���";
					targetMsg2 = "���� ��ҽ� �г�Ƽ ����Ⱓ�� �Է��ϼ���";				
				}
			} else {
				rdolTarget = document.getElementById("param_Target");
				if (rdolTarget.value == "0") {
					targetMsg1 = "������ �г�Ƽ ����Ⱓ�� �Է��ϼ���";
					targetMsg2 = "���� �� �� ���� �Ұ� �Ⱓ�� �Է��ϼ���";
				} else {
					targetMsg1 = "14���� ��ҽ� �г�Ƽ ����Ⱓ�� �Է��ϼ���";
					targetMsg2 = "���� ��ҽ� �г�Ƽ ����Ⱓ�� �Է��ϼ���";				
				}
			}
			
			if (reservationsOpenDate.value == "") {
				alert('���� ���� ����(����)�� �Է��ϼ���');
				reservationsOpenDate.focus();
				return false;
			} else if (fn_dayValueCheck(2, reservationsOpenTime.value) == false) {
				alert('���� ���� ����(�ð�)�� �Է��ϼ���');
				reservationsOpenTime.focus();
				return false;
			} else if (fn_dayValueCheck(3, reservationsPossibleDate.value) == false) {
				alert('���� ���� ������ �Է��ϼ���');
				reservationsPossibleDate.focus();
				return false;
			} else if (fn_dayValueCheck(3, cancellation.value) == false) {
				alert('���,���氡�� ������ �Է��ϼ���');
				cancellation.focus();
				return false;
			}else if (fn_dayValueCheck(0, penaltyDate.value) == false) {
				alert(targetMsg1);
				penaltyDate.focus();
				return false;
			}else if (fn_dayValueCheck(0, renewalDate.value) == false) {
				alert(targetMsg2);
				renewalDate.focus();
				return false;
			}
			
			
			
			// �����޷����� �̵��� ���� ����� ���� �̵��Ѵ�
			var bookingDefaultDate = $("#hdnCurrentDate").val();
			year  = bookingDefaultDate.substring(0, 4);
			month = bookingDefaultDate.substring(4, 7);
			if (month.length == 1) month = "0" + month;	

			var param_year = document.getElementById("param_year");
			var param_month = document.getElementById("param_month");
			
			param_year.value  = year;
			param_month.value = month;

			brandForm.submit();
		}		