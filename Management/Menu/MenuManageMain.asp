<!--#include virtual="/Inc/Include/ConfigSet.asp"-->
<!--#include virtual="/Inc/Include/LoginConfirm.asp"-->
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html" charset="utf-8">
<title>CatchAPP Admin - Main</title>
<link rel="stylesheet" type="text/css" href="/inc/css/common.css">
<link rel="stylesheet" type="text/css" href="/inc/css/admin.css">
</head>
<body>
<form name="EndersFrm" method="post" action="<%=ActionUrl%>">	
	<div class="wrap">
		<!-- Header -->
		<!--#include virtual="/inc/include/MainHeader.asp"-->
		<!-- //Header -->
		
	<!-- container -->
	<div  class="container">
		
		<!-- lnb -->
		<!--#include virtual="/inc/include/LeftMenuList.asp"-->
		<!-- //lnb -->

		<!-- content -->
		<!--#include virtual="/Management/Menu/MenuManageContents.asp"-->
		<!-- //content -->

	</div>
	<!-- //container -->
	
		<!-- footer -->
		<!--#include virtual="/inc/include/MainFooter.asp"-->
		<!-- //footer -->
	</div>
</form>
</body>
</html>
