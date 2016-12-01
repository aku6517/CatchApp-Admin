
var sElements,defaultDate;


function getPosition(oE,which) {
	var Position = 0;
	while (oE!=null) {
		Position += oE["offset" + which];
		oE = oE.offsetParent;
	}
	return Position;
}



	function CalendarLoad(oItems){
		var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;    // true if Internet Explorer
		if (typeof(calendar) =="undefined" ){ 
			var _Layer = document.createElement("DIV");
			_Layer.id = "calendar";
			_Layer.style.zindex = "100";
			_Layer.style.position = "absolute";
			_Layer.style.display = "none";
			document.body.appendChild(_Layer);
		}
		document.getElementById("calendar").style.pixelLeft = getPosition(oItems,"Left");
		document.getElementById("calendar").style.pixelTop =  getPosition(oItems,"Top")+oItems.offsetHeight; 

		var dates;
		if(oItems.value.length){ 
			slices = oItems.value.split("-"); 
			dates = new Date(slices[0],slices[1]-1,slices[2]);
			defaultDate = dates;
		}else{
			dates = new Date();
			defaultDate = dates;
		}
		sElements = oItems;
		CalendarDraw(dates);
		if ( document.getElementById("calendar").style.display == "none") {
			document.getElementById("calendar").style.display = "";
		}else{
			document.getElementById("calendar").style.display = "none"; return false;
		}
	}



	function CalendarDraw(oDate){
		var weekdayName= new Array("ÀÏ","¿ù","È­","¼ö", "", "¸ñ", "±Ý");
		var oddDate= new Date(oDate.getFullYear(),oDate.getMonth(),1);  // ½ÃÀÛÀÏÀÚ

		var notThisMonth; 
		var thisMonth=oddDate.getMonth()+1; // ÇöÀç ¿ù
		var currentDate=new Date(); // ¿À´Ã³¯Â¥	Server Date

		title  = oddDate.getFullYear()+"³â&nbsp;"+thisMonth +"¿ù";  
		thisdate = new Date(oDate); // ¼±ÅÃÀÏÀÚ
		oddDate.setDate(oddDate.getDate() - oddDate.getDay()); //´Þ·Â¿¡¼­ÀÇ Ã³À½ ÀÏ¿äÀÏÀÇ ³¯Â¥·Î Setting..
		notThisMonth=new Date(oddDate)	//Ã¹ ÀÏ¿äÀÏ¿¡ ÇØ´çÇÏ´Â ´Þ

		var aStria=new Array(); 
		var days,selected,stria; 
		var year,month,day,oTable="";

		for(var i=1;i<7;i++){	
			aStria[i] = "<tr>";
			for(var j=1;j<8;j++)  {	
				var days=oddDate.getDate();
				var notMonth=notThisMonth.getMonth()+1;
				if( notMonth != thisMonth){ // ¹þ¾î³­ ´Þ  
					aStria[i] += "<td bgcolor=#ffffff style=\"font-size:8pt;width: 14%;color:#999999;font-family:verdana;text-align:center;text-decoration:none;\">" + days+"</td>";
				}else{	
					selected = new Date(oddDate.getFullYear(),oddDate.getMonth(),days);
					year = new String(selected.getFullYear());
					month = new String(selected.getMonth()+1);
					day = new String(selected.getDate());
					//year=year+"/"+month+"/"+day ;
					//year=new Date(year,month,days);

					stria = '<td bgcolor=\"#ffffff\" onclick=\"javascript:parent.setDateToElement('+year+','+month+','+day+');\" style=\"font-size:8pt;width:14%;cursor:hand;color:black;font-family:verdana;text-align: center;text-decoration: none;\" onmouseover=\"this.style.backgroundColor=\'#dbdbdb\';\" onmouseout=\"this.style.backgroundColor=\'\';\">';

					if ((year == currentDate.getFullYear()) && ( month == currentDate.getMonth()+1) && (day == currentDate.getDate())) // ¿À´Ã ³¯Â¥ 
						aStria[i] += stria + "<font color=\"#1e90ff\" style=\"font:8pt;\"><b>"+days +"</b></font>"+ "</td>";
					else if ((year == defaultDate.getFullYear()) && ( month == defaultDate.getMonth()+1) && (day == defaultDate.getDate())) // ¼±ÅÃµÈ ³¯Â¥ 
						aStria[i] += stria + "<font color=\"#ff0000\" style=\"font:8pt;\"><b>"+days +"</b></font>"+ "</td>";
					else			
						aStria[i] += stria + days+ "</td>" ; 			
				}
				oddDate.setDate(oddDate.getDate()+1);
				notThisMonth=new Date(oddDate);
			}
			aStria[i] +="</tr>";
		}

		//-----------------------------------------------------------------------------------	
		//oTable= "<table width=100% border=0 cellspacing=1 cellpadding=1  >";
		for(var i=1 ;i<7;i++)
		oTable += aStria[i];
		oTable += "</table>";
		//-----------------------------------------------------------------------------------

		var oStrings,sDate;
		var weekdayName= new Array("êÅ","ûý","â©","ÙÊ","ÐÝ");

		sDate = new Date(oDate.getFullYear(),oDate.getMonth(),1);
		oStrings = "";
		oStrings += '<table width=\"100%\" cellspacing=0 border=0 cellpadding=2  >';
		oStrings += '<tr bgcolor=\"#b2bed8\"  valign=\"middle\" height=\"22\">';
		oStrings += '<td onclick=\"parent.CalendarMove(-1,\''+sDate+'\');\" style=\"cursor:hand;font:12pt Marlett;border:1px solid #b2bed8;\" onmouseover=\"this.style.border=\'1px solid #000000\'\" onmouseout=\"this.style.border=\'1px solid #b2bed8\'\">3</td>';
		oStrings += '<td align=\"center\" valign=\"bottom\" width=\"100%\" style=\"font-weight: bold;font-size: 9pt;color:#000000;font-family:verdana;text-align:center\">' + title + '</td>';
		oStrings += '<td onclick=\"parent.CalendarMove(1,\''+sDate+'\');\" style=\"cursor:hand;font:12pt Marlett;border:1px solid #b2bed8;\" onmouseover=\"this.style.border=\'1px solid #000000\'\" onmouseout=\"this.style.border=\'1px solid #b2bed8\'\">4</td>';
		oStrings += '</tr></table>';
		oStrings += '<table  cellspacing=1  cellpadding=1 width=100%  border=0><tr>';
		oStrings += '<td bgcolor=#ffffff style=\"font-size:8pt;width:14%;color:#cc0033;font-family:verdana;text-align:center;\" >ìí</td>'; //ÀÏ¿äÀÏ Header
		for( var i=0; i<5;i++){
			oStrings += '<td bgcolor=#ffffff style=\"font-size:8pt;width:14%;color:#000000;font-family:verdana;text-align:center\">'+ weekdayName[i] +'</td>';
		}
		oStrings += '<td bgcolor=#ffffff style=\"font-size:8pt;width:14%;color:#0033cc;font-family:verdana;text-align:center\">÷Ï</td>'; //Åä¿äÀÏ Header
		oStrings += '</tr>';
		oStrings += oTable;
		// iframe À¸·Î »õ·Î Á¦ÀÛµÈ ºÎºÐÀÓ
		document.getElementById("calendar").innerHTML= '<iframe id="fraICalenda" name="fraICalenda" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" vspace="0" hspace="0" style="width:170;height:142;"></iframe>';
		fraICalenda.document.write('<table cellspacing=1  width=170 cellpadding=0  border=1 ><tr><td bgcolor=#dbdbdb>'+oStrings+'</td></tr></table>');
		//document.getElementById("calendar").innerHTML = '<table cellspacing=1  width=170 cellpadding=0  border=1 ><tr><td bgcolor=#dbdbdb>'+oStrings+'</td></tr></table>';
	}


	function CalendarMove(differ,dates){ // differ = -1  +1
		oDate=new Date(dates);
		oDate.setMonth(oDate.getMonth()+differ);
		CalendarDraw(oDate,1);
	}



	function setDateToElement(sYear,sMonth,sDay){
		if(sMonth < 10) sMonth = "0"+sMonth;
		if(sDay < 10) sDay = "0"+sDay;
		sElements.value = sYear+"-"+sMonth+"-"+sDay; 
		//alert(sElements.parentElement.tagName);
		//alert(sElements.parentElement.firstChild.tagName);
		//alert(sElements.parentElement.lastChild.tagName);
		//alert(sElements.parentElement.children(1).tagName); <--button
		document.getElementById("calendar").style.display = "none";
		xDate = new Date(sYear,sMonth-1,sDay,false);
		DateText = DateName(xDate)

		if (typeof(document.all.calendarButton) =="object" ) { 
			if (typeof(dateDisplay) =="undefined" ) { 
				var _Layer = document.createElement("SPAN");
				_Layer.id = "dateDisplay";
				_Layer.style.color = "#0027bc";
				_Layer.style.fontWeight = "bold";
				_Layer.style.paddingLeft = "5px";
				_Layer.innerText =  DateText;
				document.all.calendarButton.insertAdjacentElement("AfterEnd",_Layer );
				//document.all.calendarButton.insertAdjacentHTML("AfterEnd",_Layer );
			}else{
				dateDisplay.innerHTML = DateText;
			}
		}
	} 



	function DateName(sDate,timeDisplay){
		//oYear = aform.sYear.options[aform.sYear.selectedIndex].value;
		//oMonth = aform.sMonth.options[aform.sMonth.selectedIndex].value;
		//oDay = aform.sDay.options[aform.sDay.selectedIndex].value;
		//oHour = aform.sHour.options[aform.sHour.selectedIndex].value;
		//oMinute = aform.sMinute.options[aform.sMinute.selectedIndex].value; 

		oYear = new String(sDate.getFullYear());
		oMonth = new String(sDate.getMonth()+1);
		oDay = new String(sDate.getDate());

		var weekdayName= new Array("ìí","êÅ","ûý","â©","ÙÊ","ÐÝ","÷Ï");
		//	var weekdayName= new Array("ŒŽ","‰Î","…","–Ø", "‹à", "“y", "“ú");


		if(timeDisplay){
			APM = (oHour < 12 ) ? "AM":"PM";
			if(oHour > 12 ) oHour = oHour-12;
			return (oYear+"”N "+oMonth+"ŒŽ"+oDay+"ìí "+weekdayName[sDate.getDay()]+"èøìí "+APM+" "+oHour+"ãÁ "+oMinute+"ÝÂ ");
		}else{ 
			return (oYear+"”N "+oMonth+"ŒŽ"+oDay+"ìí "+weekdayName[sDate.getDay()]+"èøìí"); 
		}
	}

	function DateSelect(aYear,aMonth,aDay){
		// var syear,smonth,sday,extent;
		//DateSelect.arguments[0];
		//	e= event.srcElement;
		//	thats = e.id; // Select Object.
		//	isat =  thats.substring(0,1) //±¸ºÐÀÚ
		//	isatexcept =  thats.substring(1,thats.length)
		//	if ((isat=="s" || isat=="e") ) //return false;
		//  {

		oYear = aYear.options[aYear.selectedIndex].value;
		oMonth = aMonth.options[aMonth.selectedIndex].value;
		oDay = aDay.options[aDay.selectedIndex].value;
		//	extent = isform(isat+"day").length;  	 // Select Day Options Length
		extent = aDay.length;  	 // Select Day Options Length

		//	alert(extent);
		//if(isatexcept ==  "year" || isatexcept  ==  "month" ){  
		days = wholeDays(oYear,oMonth-1);  // ¼±ÅÃÇÑ ³¯Â¥¿¡ ´ëÇÑ ÃÑ³¯Â¥ 

		if(days != extent){ 
			if(days > extent){
				for(var i=extent;i<days;i++){ // Ãß°¡
					oDayOptions = document.createElement("OPTION");
					oDayOptions.text = (i+1);
					oDayOptions.value= (i+1);
					aDay.options.add(oDayOptions);
				}
			}else if(days < extent){ // Á¦°Å
				//var len = isform.oDay.length;
				while(extent >= days){
					aDay.options.remove(extent);
					extent--;
				}
			} 
		} 
		//} 
		//Indicater();
		xDate = new Date(oYear,oMonth-1,oDay,false);
		DateDisplay.innerHTML = DateName(xDate)
	}





	function Indicater(){
		sdate = new Date(aform.syear.options[aform.syear.selectedIndex].value,parseInt(aform.smonth.options[aform.smonth.selectedIndex].value)-1,aform.sday.options[aform.sday.selectedIndex].value); 
		edate = new Date(aform.eyear.options[aform.eyear.selectedIndex].value,parseInt(aform.emonth.options[aform.emonth.selectedIndex].value)-1,aform.eday.options[aform.eday.selectedIndex].value); 
		datediff = (edate - sdate)/86400000;
		daydiff.innerHTML = datediff;
		sweekday.innerHTML = weekdayName[sdate.getDay()]
		eweekday.innerHTML = weekdayName[edate.getDay()]
	}


	function wholeDays(years,months){
		var days = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30,31, 30, 31); 
		if (((years%4 == 0) && (years%100 != 0)) || (years%400 == 0))	  days[1] = 29; 
		//adays = Days[today.getMonth()]; 
		return days[months];
	}



	function ContextMenuLocation(isobject){
		//var E = window.event;
		//	isobject.style.pixelLeft = E.clientX - document.body.scrollLeft + 10;  
		//isobject.style.pixelTop =  E.clientY + document.body.scrollTop + 10;
		//isobject.style.display=(isobject.style.display == 'none')? '':'none'; 

		var rights=document.body.clientWidth-event.clientX;
		var bottoms=document.body.clientHeight-event.clientY;

		if (rights<isobject.offsetWidth)
			isobject.style.pixelLeft=document.body.scrollLeft+event.clientX-isobject.offsetWidth;
		else
			isobject.style.pixelLeft=document.body.scrollLeft+event.clientX;

		if (bottoms<isobject.offsetHeight)
			isobject.style.pixelTop=document.body.scrollTop+event.clientY-isobject.offsetHeight;
		else
			isobject.style.pixelTop=document.body.scrollTop+event.clientY;
		isobject.style.display= "";
		//isobject.style.display=(isobject.style.display == 'none')? '':'none'; 
		return false
	}
