<%
	Session("userId") = ""
	Session("userName") = ""

%>

<SCRIPT LANGUAGE="JavaScript">
function fn_logout(){
	var frm = document.CommFrm;
	alert('로그아웃 되었습니다.');
	frm.submit();
}
</script>

<body onload="fn_logout();">
	<form name="CommFrm" method="post" action="/Login.asp">
	</form>
</body>