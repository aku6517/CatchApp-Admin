/**
 * @author Administrator
 */		
		var calDiv;
		var getText;
		calDiv = "";
		//Object에 따라 달력 Position 설정
		function fn_position(obj, calNum) {
			var getdate;
			var curDate;
			if (calDiv != "" && calDiv.style.display == "") {
				fn_close();
			}
			if (calNum == 0) {
				calDiv = document.getElementById("Calendar_box");
				getText = document.getElementById("fromDate");
				getdate = getText.value;
			} else if (calNum == 1) {
				calDiv = document.getElementById("Calendar_box");
				getText = document.getElementById("toDate");
				getdate = getText.value;
			} else if (calNum == 2) {
				calDiv = document.getElementById("Calendar_box");
				getText = document.getElementById("reservationsOpenDate");
				getdate = getText.value;
			} else if (calNum == 3) {
				calDiv = document.getElementById("Calendar_box1");
				getText = document.getElementById("dayOne");
				getdate = getText.value;
			} else if (calNum == 4) {
				calDiv = document.getElementById("Calendar_box2");
				getText = document.getElementById("dayTwo");
				getdate = getText.value;
			} else if (calNum == 5) {
				calDiv = document.getElementById("Calendar_box3");
				getText = document.getElementById("dayThree");
				getdate = getText.value;
			} else if (calNum == 6) {
				calDiv = document.getElementById("divEventStartDate");
				getText = document.getElementById("txtEventStartDate");
				getdate = getText.value;
			} else if (calNum == 7) {
				calDiv = document.getElementById("Calendar_box1");
				getText = document.getElementById("fromDate");
				getdate = getText.value;
			} else if (calNum == 8) {
				calDiv = document.getElementById("Calendar_box2");
				getText = document.getElementById("toDate");
				getdate = getText.value;
			}
			
			var vYear, vMonth, vDay;
			
			if (getdate.length != 8) {
				curDate = new Date();
				getdate = curDate.getFullYear() + "0" + parseInt(curDate.getMonth()) + curDate.getDay();
				vYear = curDate.getFullYear();
				if (parseInt(curDate.getMonth()) + 1 < 10) {
					vMonth = "0" + (parseInt(curDate.getMonth()) + 1);
				} else {
					vMonth = parseInt(curDate.getMonth()) + 1;
				}
				if (parseInt(curDate.getDate()) < 10) {
					vDay = "0" + parseInt(curDate.getDate());
				} else {
					vDay = parseInt(curDate.getDate());
				}
			} else {
				vYear  = getdate.substring(0, 4);
				vMonth = Number(getdate.substring(4, 6));
				vDay   = Number(getdate.substring(6));
			}
			
			fn_showCalenda(vYear, vMonth, vDay, calNum);

			if (calNum == 0 || calNum == 1) {
				if (calDiv.style.display == "none") {
					var _x = event.x;		//마우스 위치
					var _y = event.y;
					var img_height = obj.height;	//개체의 높이
					var _xx = obj.offsetLeft;
					var _yy = obj.offsetTop;
			
					calDiv.style.display="";
					calDiv.style.top = _yy + img_height;
					calDiv.style.left = _xx;
				}
			}
			else {
				if (calDiv.style.display == "none") {
					calDiv.style.display="";
				}
			}
		}
		
		function fn_close() {
			//var calDiv = document.getElementById("Calendar_box");
			calDiv.style.display = "none";
		}
		
		//동적으로 달력 생성
		function fn_showCalenda(vYear, vMonth, vDay, calNum)
		{
			var arrWeekDay = new Array("일", "월", "화", "수", "목", "금", "토")
			var arrLastDay = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
			var nYear, nMonth, nDay;
			var prevYear, prevMonth, prevDay;
			var nextYear, nextMonth, nextDay;

			vMonth = parseInt(vMonth)
			vDay = parseInt(vDay)
			nYear = vYear;
			nMonth = vMonth - 1;
			nDay = vDay;
			if (((nYear % 4 == 0) && (nYear % 100 != 0)) || (nYear % 400 == 0))
				arrLastDay[1] = 29;

			var firstTmp = new Date(nYear, nMonth, 1);
			var nFstDay = firstTmp.getDay() + 1;

			if (vMonth == 1) {
				prevYear = (vYear*1) - 1;
				prevMonth = 12;
				prevDay = 1;
				nextYear = vYear;
				nextMonth = (vMonth*1) + 1;
				nextDay = 1
			}
			else if (vMonth == 12) {
				prevYear = vYear;
				prevMonth = (vMonth*1) - 1;
				prevDay = 1;
				nextYear = (vYear*1) + 1;
				nextMonth = 1;
				nextDay = 1				
			}
			else {
				prevYear = vYear;
				prevMonth = (vMonth*1) - 1;
				prevDay = 1;
				nextYear = vYear;
				nextMonth = (vMonth*1) + 1;
				nextDay = 1
			}

			var strHtml = "";
			var strSelMonth = "";

			strHtml += "<center><table><tr><td COLSPAN=6 align=center><button id='' class='ssbut' onclick='fn_showCalenda(" + prevYear + ", " + prevMonth + ", 1, " + calNum + ")'>&lt;</button>";
			strHtml += "<span class='sstxt'>" + nYear + "년" + (nMonth + 1) + "월</span>"
			strHtml += "<button id='' class='ssbut' onclick='fn_showCalenda(" + nextYear + ", " + nextMonth + ", 1, " + calNum + ")'>&gt;</button></td><td onclick='fn_close()' onmouseover=\"this.style.cursor='hand'\" style='padding-right:7px;'><label style='color:red;'><strong>X</strong></label></td></tr>";
			strHtml += "<tr align=center valign=middle>"

			for (var i = 0; i < 7; i++)
				strHtml += "<td style='color:#" + (i == 0 ? "ff0000" : (i == 6 ? "0000ff" : "000000")) + "'>" + arrWeekDay[i] + "</td>";

			var ndays = 1;
			var strnbsp = 1;

			strHtml += "</tr>";
			for (var i = 1; i <= Math.ceil((arrLastDay[nMonth] + nFstDay - 1) / 7); ++i)
			{
				strHtml += "<tr align=center>";
				for (var j = 1; j <= 7; j++)
				{
					if (ndays <= arrLastDay[nMonth])
					{
						if (strnbsp < nFstDay)
						{
							strHtml += "<td>&nbsp;</td>";
							strnbsp++;
						}
						else
						{
							if (ndays == nDay)
								strHtml += "<td style=\"font-weight:bold; font-size:15pt\"><a href='#none' onclick='fn_dateChange(" + nYear + ", " + nMonth + ", " + ndays + ", " + calNum + ")' ?=''>" + ndays + "</a></td>";
							else
								strHtml += "<td style='color:#" + (j == 1 ? "ff0000" : (j == 7 ? "0000ff" : "000000")) + "'><a href='#none' onclick='fn_dateChange(" + nYear + ", " + nMonth + ", " + ndays+ ", " + calNum + ")' ?=''>" + ndays + "</a></td>"
							ndays++
						}
					}
				}
				strHtml += "</tr>"
			}
			strHtml += "</table></center>";

			calDiv.innerHTML = strHtml;
		}
		
		//달력 Text Box에 데이터 입력
		function fn_dateChange(year, month, day, calNum) {
			var setdate = year;
			if (month + 1 < 10) setdate = setdate + "0" + (month + 1);
			else setdate = setdate + "" + (month + 1);

			if (day < 10) setdate = setdate + "0" + day;
			else setdate = setdate + "" + day;

			getText.value = setdate;
			calDiv.style.display="none";
		}