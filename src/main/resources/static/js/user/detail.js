'use strict';

/** 画面のロード時の処理 */
jQuery(function($){
	$('#btn-update').click(function(event){
		updateUser();
	});
	$('#btn-delete').click(function(event){
		deleteUser();
	});
});

function updateUser() {
	var formData = $('#user-detail-form').serializeArray();
	// ajax通信
	$.ajax({
		type:"PUT",
		cache:false,
		url:'/user/update',
		data:formData,
		dataType:'json'	
	}).done(function(data){
		alert('ユーザを更新しました');
		window.location.href = '/user/list';
	}).fail(function(jqXHR, textStatus, errorThrown){
		alert('ユーザ更新に失敗しました');
	}).always(function(){
	});
}

function deleteUser() {
	var formData = $('#user-detail-form').serializeArray();
	// ajax通信
	$.ajax({
		type:"DELETE",
		cache:false,
		url:'/user/delete',
		data:formData,
		dataType:'json'	
	}).done(function(data){
		alert('ユーザを削除しました');
		window.location.href = '/user/list';
	}).fail(function(jqXHR, textStatus, errorThrown){
		alert('ユーザ削除に失敗しました');
	}).always(function(){
	});
}
