function movePaging(url, page) {
	var t = document.frmMain;
	
	t.page.value = page;
	t.action = url;
	t.method = "post";
	t.submit();
}