'use strict';

/** 画面のロード時の処理 */
jQuery(function($){
	$('#btn-signup').click(function(event){
		signupUser();
	});
});

function signupUser() {
	// バリデーション結果をクリア
	removeValidResult();
	var formData = $('#signup-form').serializeArray();
	// ajax通信
	$.ajax({
		type:"POST",
		cache:false,
		url:'/user/signup/rest',
		data:formData,
		dataType:'json'	
	}).done(function(data){
		// ajax成功時の処理
		console.log(data);
		if (data.result == 90) {
			// validationエラーの処理
			$.each(data.errors, function(key, value) {
				reflectValidResult(key, value);
			});
		} else if (data.result == 0) {
			alert('ユーザを登録しました');
			window.location.href = '/login';
		}
	}).fail(function(jqXHR, textStatus, errorThrown){
		alert('ユーザ登録に失敗しました');
	}).always(function(){
	});
}

function removeValidResult() {
	$('.is-invalid').removeClass('is-invalid');
	$('.invalid-feedback').remove();
	$('.text-danger').remove();
}

function reflectValidResult(key, value){
	// エラーメッセージ追加
	if (key == 'gender') {
		// CSS適用
		$('input[name=' + key +']').addClass('is-invalid');
		// エラーメッセージ追加
		$('input[name=' + key +']')
		.parent().parent()
		.append('<div class="text-danger">' + value + '</div>');
	} else {
		// CSS適用
		$('input[id=' + key +']').addClass('is-invalid');
		// エラーメッセージ追加
		$('input[id=' + key +']')
		.after('<div class="invalid-feedback">' + value + '</div>');
	}
}