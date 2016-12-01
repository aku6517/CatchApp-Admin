function GetXMLHttp(){
	//Firefox를 위한 코드
	if(window.XMLHttpRequest) return new XMLHttpRequest();
	
	// IE 6이하를 위한 코드
	var versions = [	
		"Microsoft.XMLHttp",   
		"MSXML2.XMLHttp.5.0",
		"MSXML2.XMLHttp.4.0",
		"MSXML2.XMLHttp.3.0",
		"MSXML2.XMLHttp"
	];
	
	for(var i = 0; i < versions.length; i++){
		try{
			var oXMLHttp = new ActiveXObject(versions[i]);
			return oXMLHttp;
		}
		catch(e){}
	}
	
	throw new Error("No XMLhttp");
}

function parseXML(resposeXML){
	try{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(resposeXML);
		return xmlDoc
	} catch(e) {
		try{
			parser = DOMPaser();
			xmlDoc = parser.parseFromString(resposeXML,"text/xml");
			return xmlDoc;
		} catch(e) {
			alert(e.message);
			return null;
		}
	}
}

GridWidth 		= new Array();	
GridPkLoc 		= new Array();	
GridColType 	= new Array();	
GridAlign			= new Array();	
GridColId			= new Array();	
GridSelUseY		= new Array();	
GridTdATag 		= new Array();	
GridColName  	= new Array();	
GridNotField 	= new Array();	
GridCbType  	= new Array();	
GridHeight  	= new Array();	
GridHapHtml  	= new Array();
GridHap  			= new Array();
GridPageging	= new Array();

function GridReady(gb){
	var Grid = eval("Grid" + gb); 
	GridWidthT = Grid.width.split(";");
	var tempGridW = "";
	for(var i = 0;i <= GridWidthT.length -1; i++){
		if( GridWidthT[i] != "999"){
			tempGridW = tempGridW + " width='" + GridWidthT[i] + "px' ;"
		}else{
			tempGridW = tempGridW + " class='pdl_10 rewidth_sizing' ;"
		}		
	}
	Grid.width = tempGridW.substring(0,tempGridW.length-1);
	
	GridWidth[gb] 		= Grid.width.split(";");
	GridPkLoc[gb] 		= Grid.PkLoc.split(";");
	GridColType[gb] 	= Grid.ColType.split(";");
	GridAlign[gb]			= Grid.Align.split(";");
	GridColId[gb]			= Grid.ColId.split(";");
	if(Grid.SelUseY){GridSelUseY[gb]	= Grid.SelUseY.split(";");}
	GridTdATag[gb] 		= Grid.TdATag.split(";");
	GridColName[gb]  	= Grid.ColName.split(";");
	GridNotField[gb] 	= Grid.NotField.split(";");
	if(Grid.Pageging){GridPageging[gb] 	= Grid.Pageging.split(";");}
	GridCbType[gb] 		= Grid.CbType;
	if(Grid.HapHtml){GridHapHtml[gb]	= Grid.HapHtml.split(";");}

	var ajaxTableS = "<table width='100%' cellpadding='0' cellspacing='0' class='sub_board_normal222'>"
  ajaxTableS = ajaxTableS +	"  <colgroup> "

  for(var w = 0;w < GridCbType[gb] ; w++){
    ajaxTableS = ajaxTableS +	"  <col " + GridWidth[gb][w] + " >"
	}
	ajaxTableS = ajaxTableS +	"	<col width='17px'></th> "
  ajaxTableS = ajaxTableS +	"  </colgroup><tr>"
	for(var n = 0;n < GridCbType[gb] ; n++){
		if(	GridColType[gb][n] == "chk" ){	
    	ajaxTableS = ajaxTableS +	"	<th align='center'><input type='checkbox' name='AllDel"+gb+"'	onclick='fn_CheckedAll("+gb+")'></th> "
  	} else {
  		ajaxTableS = ajaxTableS +	"	<th align='center'>" + GridColName[gb][n] + "</th> "
  	}	
	}
	ajaxTableS = ajaxTableS +	"	<th ></th> "
  ajaxTableS = ajaxTableS +	" </tr></table>"	
	document.all["Grid"+gb+"Subject"].innerHTML = ajaxTableS;  

	var hc = "F"
	for(var c = 0; c < GridColType[gb].length; c++){
		if(GridColType[gb][c] == "sel"){
			hc = "T";
		}
	}	
	if( hc == "T" ){
		Grid.Height = "29" 
	} else {
		Grid.Height = "25"
	}		
	GridHeight[gb]  	= Grid.Height

}

function fn_List(urlKind,pram,gb){ 
	var Grid = eval("Grid" + gb); 
	var frm  			= document.AbnFrm;
	
	var URL = "/Common/AjaxXml/AjaxList.asp?urlKind=" + urlKind + "&pram=" + pram + "&gb="+ gb;
	if(Grid.Pageging){
		URL = URL + "&pageging="+GridPageging[1][0] + "&pagesize="+GridPageging[1][1];
	}
	//alert(URL)
	frm.HGb.value 	= gb;
	
	ajaxList	= GetXMLHttp();
	ajaxList.onreadystatechange = ListCallback;
	ajaxList.open("GET", URL, true);
	ajaxList.send();
}

function ListCallback(){
	var gb = document.AbnFrm.HGb.value;

	if(ajaxList.readyState == 4){
		if(ajaxList.status == 200){
			var node = new Array();			
			var xmlDoc = parseXML(ajaxList.responseText);
			var data = xmlDoc.getElementsByTagName("TB").length;

			var ajaxTable = "<table id='tableAjax"+gb+"' width='100%' cellpadding='0' cellspacing='0' class='sub_board_ajax'>"
			var ajaxTablePk = "<input type='hidden' name='Grid"+gb+"Key'		value='$value$' >";
			
			if(GridHapHtml){
				for(j=0;j<GridColId[gb].length;j++){
					GridHap[j] = 0;
				}
			}
			for(var i = 0;i < data; i++){
				ajaxTable = ajaxTable + "<tr onMouseOver=\"this.style.backgroundColor='#000000'\" onMouseOut=\"this.style.backgroundColor='#FFFFFF'\">";
				var ajaxTempPk = "";
				
				for(var j = 0;j < GridCbType[gb] ; j++){
					node[j] 	= xmlDoc.getElementsByTagName("TB")[i].selectNodes("node")[j].text;
					nodeThis	= node[j];
					if(GridHapHtml[gb]){
						if(GridHapHtml[gb][j] == "Y"){
							GridHap[j] = GridHap[j] + parseInt(nodeThis)
						}
					}
					
					if(GridPkLoc[gb][j] == "P"){
						ajaxTempPk = ajaxTempPk + nodeThis + "§"
					}
					
					var nodeValue = "";
					switch(GridColType[gb][j]) {
						case("int") : 
							nodeValue = parseInt(nodeThis) 	
							break;
						case("str") : 
							nodeValue = nodeThis 									
							break;
						case("date") : 
							nodeValue = nodeThis.substring(0,10)
							break;							
						case("edit") : 
							nodeValue = "<input type='text' name='" + GridColId[gb][j] + "' class='input_text iput_ajax' 	value='" + nodeThis + "'>"
							break;
						case("edro") : 
							nodeValue = "<input type='text' name='" + GridColId[gb][j] + "' class='input_text iput_ajax' 	value='" + nodeThis + "' readonly>"
							break;							
						case("sel") : 
							nodeValue = "<select name='" + GridColId[gb][j] + "' >"
							for(var s = 0; s < GridSelUseY[gb].length; s++){
								if( nodeThis == GridSelUseY[gb][s].split(":")[0] ){
									nodeValue = nodeValue + "<option value='" + GridSelUseY[gb][s].split(":")[0] + "' selected>" + GridSelUseY[gb][s].split(":")[1] + "</option>"
								} else {	
									nodeValue = nodeValue + "<option value='" + GridSelUseY[gb][s].split(":")[0] + "'>" + GridSelUseY[gb][s].split(":")[1] + "</option>"
								}	
							}
							nodeValue = nodeValue + " </select>"
							break;
						case("chk") : 	
							if(nodeThis == "Y"){
								nodeValue = nodeValue +	" <input type='checkbox' name='Del"+gb+"' checked	> "
							}else{
								nodeValue = nodeValue +	"  <input type='checkbox' name='Del"+gb+"' 	> "
							}	
							break;
						default :
							nodeValue = nodeThis;
							break;							
					}				
					if(GridTdATag[gb][j] == "N" ){
						ajaxTable = ajaxTable +	" <td align='" + GridAlign[gb][j] + "' " + GridWidth[gb][j] + " height='" + GridHeight[gb] + "'> " + nodeValue +"</td>"
					} else { 
						ajaxTable = ajaxTable +	" <td align='" + GridAlign[gb][j] + "' " + GridWidth[gb][j] + " height='" + GridHeight[gb] + "' onclick = '" + GridTdATag[gb][j].replace("()","(" + i + ")") + "' style ='cursor:hand'> " + nodeValue +"</td>"
					}	
				}
				ajaxTable = ajaxTable + ajaxTablePk.replace("$value$",ajaxTempPk.substring(0,ajaxTempPk.length-1));	
				ajaxTable = ajaxTable +	"</tr>"									
			}	
			ajaxTable = ajaxTable +	"</table>"
			
			if( data == 1 ){
				for(var k = 0;k < GridCbType[gb] ; k++){
					if( GridColType[gb][0] != "chk" || GridColType[gb][0] != "str" || GridColType[gb][0] != "int" ){
						if( GridColId[gb][k] != "N" ){
							ajaxTable = ajaxTable +	"<input type='hidden' name='" + GridColId[gb][k] + "' value=''>"
						}	
					}
				}
				ajaxTable = ajaxTable +	"<input type='hidden' name='Grid"+gb+"Key'		value='' >";
			}
			//alert(ajaxTable)
			document.all["Grid"+gb].innerHTML = ajaxTable;
			if(GridHapHtml[gb]){
				var ajaxHapTable = "<table id='tableAjaxHap"+gb+"' width='100%' cellpadding='0' cellspacing='0' class='sub_board_ajax'><tr>"
				for(var l = 0;l < GridCbType[gb] ; l++){
					if(GridHapHtml[gb][l] == "Y"){
						ajaxHapTable = ajaxHapTable +	" <td align='" + GridAlign[gb][l] + "' " + GridWidth[gb][l] + " height='" + GridHeight[gb] + "'>" + GridHap[l] +"</td>"
					}else{
						ajaxHapTable = ajaxHapTable +	" <td align='" + GridAlign[gb][l] + "' " + GridWidth[gb][l] + " height='" + GridHeight[gb] + "'></td>"
					}
				}			
				ajaxHapTable = ajaxHapTable +	"</tr></table>"	
				document.all["Grid"+gb+"Hap"].innerHTML = ajaxHapTable;
			}			
		}
	}	
}	

function fn_CheckedAll(gb){
	var frm  			= document.AbnFrm;
	var delChk 		= eval("frm.Del"+gb)
	var allDelChk = eval("frm.AllDel"+gb)
	if( delChk ){
		if( delChk.length > 0 ){ 
			for( i = 0; i < delChk.length;i++){
				if(allDelChk.checked == true){
		    	delChk[i].checked = true;
				} else {
					delChk[i].checked = false;
				}	
			}
		} else {
			if(allDelChk.checked == true){
	    	delChk.checked = true;
			} else {
				delChk.checked = false;
			}				
		}
	}
}	

function fn_GoAction(mode,gb){
	var frm = document.AbnFrm;
	var AcCode = ""
	chkDel = eval("frm.Del" + gb);
	chkDel = eval("frm.Del" + gb);
	PkDel = eval("frm.Grid"+gb+"Key");
	if( gb == "2" ){
		var gbP = gb - 1;
	}else{
		var gbP = gb; 
	}
	ClickPk = eval("frm.Grid"+gbP+"ClickPk"); 
	if( mode == "D" ){
		if(!confirm("삭제하시겠습니까?")){
			return;
		}
		if( !chkDel ){
			alert("삭제할 정보가 없습니다.");
			return;
		}	

		var DelCode = "";
		if( chkDel.length > 0 ){ 
			for( i = 0; i < chkDel.length;i++){
				if( chkDel[i].checked == true ){
					DelCode = DelCode + PkDel(i).value + "," 
				}
			}
		} else {
			if( chkDel.checked == true ){
				DelCode = PkDel(0).value + "," 
				//alert(PkDel(0).value)
			}		
		}
		frm.HDelCode.value = DelCode;

		AcCode = DelCode + "※" + ClickPk.value ;

		if( frm.HDelCode.value == "" ){
			alert("선택된 정보가 없습니다.")
			return;
		}

	} else if( mode == "S" ){
		if(!confirm("저장하시겠습니까?")){
			return;
		}
		if( !chkDel ){
			alert("저장할 정보가 없습니다.");
			return;
		}	

		ColPk = "";
		
		if( chkDel.length > 0 ){ 
			var AcTempCode = new Array();	
			for(j=0;j<GridColId[gb].length;j++){
				AcTempCode[j] = "";
			}
			GridKey = eval("frm.Grid"+gb+"Key");
			for(i=0;i<chkDel.length;i++){
				ColPk = ColPk + GridKey(i).value + ",";
				for(j=0;j<GridColId[gb].length;j++){
					if(GridColId[gb][j] != "N"){
						ColId = eval("frm." + GridColId[gb][j]);

						if(GridNotField[gb][j] == "Y" && ColId[i].value == ""){
							alert(GridColName[gb][j]+" 를(을) 입력해주세요.")
							return;
						}else if(GridNotField[gb][j] == "N" && ColId(i).value == "" ){
							ColId(i).value = "`";
						}

						AcTempCode[j] = AcTempCode[j] + ColId(i).value + ",";
					}
				}
			}
			for(k=0;k<AcTempCode.length;k++){
				if(AcTempCode[k] != ""){
					AcCode = AcCode + AcTempCode[k] + "※"; 	
				}
			}
			AcCode = ColPk + "※" + AcCode;
		}	else {
			var AcTempCode = "";
			GridKey = eval("frm.Grid"+gb+"Key");
			ColPk = GridKey(0).value;
			for(j=0;j<GridColId[gb].length;j++){
				if(GridColId[gb][j] != "N"){
					ColId = eval("frm." + GridColId[gb][j]);
					if(GridNotField[gb][j] == "Y" && ColId(0).value == ""){
						alert(GridColName[gb][j]+" 를(을) 입력해주세요.")
						return;
					}else if(GridNotField[gb][j] == "N" && ColId.value == "" ){
						ColId.value = "`";
					}
					AcTempCode = AcTempCode + ColId(0).value + ",※";
				}
			}
			AcCode = ColPk + ",※" + AcTempCode;	
		}		
	}
	var PreKey = frm.HPreKey.value
	if(PreKey == "Y"){
		var num 			= gb - 1
		var	AcFindStr	=	eval("frm.Grid"+num+"ClickPk");
		BfClickPk = AcFindStr.value;		
		AcCode = AcCode + BfClickPk + "※";
	}else{
		if(frm.HDKey){
			var Dk = frm.HDKey.value
			if(Dk == "Y"){
				var Dpk = frm.HDPKey.value
				AcCode = AcCode + Dpk + " ※";
			}else{
				AcCode = AcCode + " ※";
			}	
		}else{
			AcCode = AcCode + " ※";
		}	
	}

	frm.HMode.value = mode;
	frm.HGb.value 	= gb;
	var PageIdAc 	= frm.HPageId.value;
	
	var URL = "/Common/AjaxXml/AjaxAction.asp?mode=" + mode + "&gb=" + gb + "&AcCode=" + AcCode + "&PageId=" + PageIdAc;

	ajaxAction	= GetXMLHttp();
	ajaxAction.onreadystatechange = ActionCallback;
	ajaxAction.open("GET", URL, true);
	ajaxAction.send();
	

	if(mode == "S"){
		alert("저장되었습니다.");
	}else if(mode == "D"){
		alert("삭제되었습니다.");
	} 
	document.AbnFrm.HPreKey.value 	= ""; 
}

function ActionCallback(){
	var frm = document.AbnFrm;
	var PageIdAc 	= frm.HPageId.value;
	var gbAc 			= frm.HGb.value;
	var BfClickPk = "";
	if(gbAc!=1){
		var num 			= gbAc - 1;
		var	AcFindStr	=	eval("frm.Grid"+num+"ClickPk");
		BfClickPk = AcFindStr.value;
	}
	
	fn_List(PageIdAc,BfClickPk,gbAc);	

	if(frm.HMode.value == "D"){
		fn_Delcallback(gbAc);
	}
}	


function formPost(docForm) {
	var strSubmitContent = "";
	var formElem;
	var strLastElemName = "";              
	for (i = 0; i < docForm.elements.length; i++) {                        
		formElem = docForm.elements[i];
		switch (formElem.type) {
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "select-one":
			  strSubmitContent += formElem.name + "=" + formElem.value + "&"
			  break;
			case "radio":
				if (formElem.checked) {
					strSubmitContent += formElem.name + "=" + formElem.value + "&"
				}
				break;                                           
			case "checkbox":
				if (formElem.checked) {
					if (formElem.name == strLastElemName) {
						if (strSubmitContent.lastIndexOf("&") == strSubmitContent.length-1) {
							strSubmitContent = 
							strSubmitContent.substr(0, strSubmitContent.length - 1);
						}
						strSubmitContent += "," + formElem.value;
					} else {
						strSubmitContent += formElem.name + "=" + formElem.value;
					}
					strSubmitContent += "&";
					strLastElemName = formElem.name;
				}
				break;                                           
		}
	}            
	strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
	return strSubmitContent;
}

