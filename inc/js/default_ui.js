$(function(){
	
	//찾아보기 버튼 
	$('.fn_add_file').on('change', function(){
		addfile_cvt($(this));
	});

	//top gnb 클릭시
	$('.top_nav > ul >li').on('click',function(e){
		gnb_btn($(this));
		// e.preventDefault(); //href 막기
	});

	//게시판 숨김 버튼
	$('.list_fold').on('click',function(){
		target_fold($('.board_list article'));
		$('.paging, .top_cate').toggle();
	});

	//팝업 열기
	$('.open_pop').on('click',function(){
		target_pop = $(this).attr('data-id');
		pop_work_show(target_pop);
	});

	//팝업 닫기
	$('.btn_close, .btn_cancel').on('click',function(){
		$(this).parentsUntil('.pop_work_write').parent('.pop_work_write').hide();
	});

	
})
//팝업 열기
function pop_work_show(id){
	$('#' + id).show();
	$('#' + id +' .btn_close').focus();
}

//찾아보기 버튼 텍스트 뿌리기
function addfile_cvt(t){
	var add_filename = t.val().split('\\'); // \로 분리
	var arr_last = add_filename.length -1 ; // 마지막 배열값 번호
	// console.log( arr_last+'///'+ add_filename[arr_last] );
	t.parent().parent().find('.fn_add_file_txt').val(add_filename[arr_last]); // 해당 클래스 dom에 마지막 배열 츌력
}

//메인메뉴 on
function gnb_btn(t){
	$('.top_nav > ul >li').removeClass('on');
	t.addClass('on');
}

//메인 게시판 숨김처리
function target_fold(target){
	target.toggleClass('fold');

}

function getWorkingDayPlus(i) 
{ 
	var theDay = new Date();

	while ( --i >= 0)
	{
		skipWeekend(theDay);
		theDay.setDate(theDay.getDate() + 1);
	}

	theMonth = eval(theDay.getMonth()+1);
	if (theMonth < 10)
		theMonth = "0" + theMonth;
	theDate = eval(theDay.getDate());
	if (theDate < 10)
		theDate = "0" + theDate;

	var x = theDay.getYear() + "" + theMonth + "" + theDate;

	return x;    
}

// date 객체를 넘기면 주말을 무조건 건너뛰는 함수
function skipWeekend(date) {
	while ( date.getDay() == 0 || date.getDay() == 6) {
		date.setDate( date.getDate() + 1);
	}
}