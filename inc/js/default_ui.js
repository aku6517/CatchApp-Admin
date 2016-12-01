$(function(){
	
	//ã�ƺ��� ��ư 
	$('.fn_add_file').on('change', function(){
		addfile_cvt($(this));
	});

	//top gnb Ŭ����
	$('.top_nav > ul >li').on('click',function(e){
		gnb_btn($(this));
		// e.preventDefault(); //href ����
	});

	//�Խ��� ���� ��ư
	$('.list_fold').on('click',function(){
		target_fold($('.board_list article'));
		$('.paging, .top_cate').toggle();
	});

	//�˾� ����
	$('.open_pop').on('click',function(){
		target_pop = $(this).attr('data-id');
		pop_work_show(target_pop);
	});

	//�˾� �ݱ�
	$('.btn_close, .btn_cancel').on('click',function(){
		$(this).parentsUntil('.pop_work_write').parent('.pop_work_write').hide();
	});

	
})
//�˾� ����
function pop_work_show(id){
	$('#' + id).show();
	$('#' + id +' .btn_close').focus();
}

//ã�ƺ��� ��ư �ؽ�Ʈ �Ѹ���
function addfile_cvt(t){
	var add_filename = t.val().split('\\'); // \�� �и�
	var arr_last = add_filename.length -1 ; // ������ �迭�� ��ȣ
	// console.log( arr_last+'///'+ add_filename[arr_last] );
	t.parent().parent().find('.fn_add_file_txt').val(add_filename[arr_last]); // �ش� Ŭ���� dom�� ������ �迭 ����
}

//���θ޴� on
function gnb_btn(t){
	$('.top_nav > ul >li').removeClass('on');
	t.addClass('on');
}

//���� �Խ��� ����ó��
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

// date ��ü�� �ѱ�� �ָ��� ������ �ǳʶٴ� �Լ�
function skipWeekend(date) {
	while ( date.getDay() == 0 || date.getDay() == 6) {
		date.setDate( date.getDate() + 1);
	}
}