'use strict';

var userData = null;
var table = null;

/** 画面のロード時の処理 */
jQuery(function($){
	// DataTablesの初期化
	createDataTables();
	$('#btn-search').click(function(event){
		search();
	});
});

function search() {
	var formData = $('#user-search-form').serializeArray();
	// ajax通信
	$.ajax({
		type:"GET",
		url:'/user/get/list',
		data:formData,
		dataType:'json',
		contentType:'application/json;charset=UTF-8',
		cache:false,
		timeout:5000
	}).done(function(data){
		console.log(data);
		// JSONを変数に入れる
		userData = data;
		// Data Table作成
		createDataTables();
	}).fail(function(jqXHR, textStatus, errorThrown){
		alert('検索処理に失敗しました');
	}).always(function(){
	});
}
function createDataTables() {
	// 既にDataTablesが作成されている場合
	if (table != null) {
		table.destroy();
	}
	// DataTables作成
	table = $('#user-list-table').DataTable({
		// 日本語化
		language:{
			url:'/webjars/datatables-plugins/i18n/Japanese.json'
		},
		data :userData,
		columns:[
			{data: 'userId'},
			{data: 'userName'},
			{
				data:'birthday',
				render:function(data, type, row) {
					var data = new Date(data);
					var year = data.getFullYear();
					var month = data.getMonth() + 1;
					var date = data.getDate();
					return year + '/' + month + '/' + date;
				}
			},
			{data: 'age'},
			{
				data:'gender',
				render:function(data, type, row) {
					var gender = '';
					if (data === 1) {
						gender = '男性';
					} else {
						gender = '女性';
					}
					return gender;
				}
			},
			{
				data:'userId',
				render:function(data, type, row) {
					var url = '<a href="/user/detail/' + data + '"">詳細</a>';
					return url;
				}
			}
		]
	});
}