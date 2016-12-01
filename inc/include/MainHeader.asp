	<div class="header">
		<div class="lft_area">
			<h1 class="logo"><img src="/images/logo_catchapp.png" alt="CATCHAPP"></h1>
		</div>
		<div class="rgt_area">
			<!-- 메뉴제목 -->
			<% If MenuCode = "000000" Then %>
				<h2 class="h_tit">메인 메뉴</h2>
			<% Else %>
				<h2 class="h_tit"><%=TopMenuName%></h2>
			<% End If %>
			<!-- //메뉴제목 -->
			<div class="session_wrap">
				<p class="user_info">
					<strong class="user_id"><%=SSUserName%>(<%=SSUserId%>)</strong>
					<span class="user_type"><%=strAdminType%></span>
				</p>
				<a href="/Logout.asp" class="btn logout">로그아웃</a>
			</div>
		</div>
	</div>