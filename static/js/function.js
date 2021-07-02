var url_this = location.href;//获取整个跳转地址内容，其实就是你传过来的整个地址字符串
var n01 = url_this.length;//地址的总长
var n02 = url_this.indexOf("3F")//3F不知道是什么符号的十六进制表现形式
var username = decodeURI(url_this.substr(n02+2,n01-1))

var val=[];//ajax获得的数据
var table = document.getElementById("tbMain");
var array = [];//存一下param
 window.addEventListener('scroll', function(){
 	let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
 	if(t>0){
		$('.navigation').addClass('navigation-active')
	}else{
		$('.navigation').removeClass('navigation-active')
	}
 })
 //保证导航栏始终在上边


var p = new Promise(function (resolve, reject) {

		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlhttp.withCredentials=false;
		xmlhttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {
				val = JSON.parse(xmlhttp.responseText );
								console.log(val);

				for (var i = 0; i < val.length; i++) {
					tr = getDataRow(val[i]);
					table.appendChild(tr);
					resolve('成功了');
				}
				const params = JSON.stringify(array); // 因为localStorage只能存字符串，所以需要转化成JSON 字符串。
		        localStorage.setItem('params',params);

			}
			else
				{
					setTimeout(function () {

						reject('失败了');
					}, 1000);
				}
			}
			xmlhttp.open("GET", "http://localhost:5000/test_post/nn", true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.withCredentials = false;
			xmlhttp.send();
		}
	);
p.then(function(data){

	console.log(data);
}).catch(function(reason){
	console.log(reason);
});
function getDataRow(h){
	var row = document.createElement('tr'); //创建行

	var idCell = document.createElement('td'); //创建第一列id
	idCell.innerHTML = h.id; //填充数据
	row.appendChild(idCell); //加入行  ，下面类似

	var idCell = document.createElement('td');
	idCell.innerHTML="<img id='up' src=' static/photos/up.png' onclick='deal_shangyi(this)'>"+"<img id='down' src=' static/photos/down.png' onclick='deal_xiayi(this)'>"; //填充数据
	row.appendChild(idCell); //加入行  ，下面类似


	var classificationCell = document.createElement('td');//创建第二列name
	classificationCell.innerHTML = h.classification;
	row.appendChild(classificationCell);

	var nameCell = document.createElement('td');//创建第三列job
	nameCell.innerHTML = h.name;
	row.appendChild(nameCell);

	var versionCell = document.createElement('td');//创建第三列job
	versionCell.innerHTML = h.version;
	row.appendChild(versionCell);

	var research_costsCell = document.createElement('td');//创建第三列job
	research_costsCell.innerHTML = h.research_costs;
	row.appendChild(research_costsCell);

	var batch_costsCell = document.createElement('td');//创建第三列job
	batch_costsCell.innerHTML = h.batch_costs;
	row.appendChild(batch_costsCell);

	var priceCell = document.createElement('td');//创建第三列job
	priceCell.innerHTML = h.price;
	row.appendChild(priceCell);

	var update_timeCell = document.createElement('td');//创建第三列job
	update_timeCell.innerHTML = h.update_time;
	row.appendChild(update_timeCell);

	var charge_personCell = document.createElement('td');//创建第三列job
	charge_personCell.innerHTML = h.charge_person;
	row.appendChild(charge_personCell);

	var operationCell = document.createElement('td');//创建第三列job
	operationCell.innerHTML = "<button id='check' onclick='check(this)'>查看"+"</button>"+"·"+"<button id='change' onclick='update(this)'>修改"+"</button>"+"·"+"<button id='delete' onclick='deleteRow(this)'>删除"+"</button>";
	row.appendChild(operationCell);

const param = {
            id:h.id,
			classification:h.classification,
			name:h.name,
			version:h.version,
			charge_person:h.charge_person,
		}
		array.push(param);



	return row; //返回tr数据
}
function deleteRow(rows){

if(confirm("确定删除这一行嘛？")){
	var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
		console.log(rowIndex)
    }
	window.location.replace("http://127.0.0.1:5000/deal_delete/"+rowIndex+"&"+username)
    table.deleteRow(index);

    for(var i=index;i<table.rows.length;i++){
    table.rows[i].cells[0].innerHTML=i+1;

    }
    }

}
function deal_shangyi(rows) {
	var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
		console.log(rowIndex)
    }
	window.location.replace("http://127.0.0.1:5000/deal_shangyi/"+rowIndex+"&"+username)
}
function deal_xiayi(rows) {
	var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
		console.log(rowIndex)
    }
	window.location.replace("http://127.0.0.1:5000/deal_xiayi/"+rowIndex+"&"+username)
}
function check(rows){
	var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
		console.log(rowIndex)
    }
    rowIndex--;
    var classification=array[rowIndex].classification;
    var name=array[rowIndex].name;
    var version=array[rowIndex].version;
    var charge_person=array[rowIndex].charge_person;
    rowIndex++;
window.location.replace("http://127.0.0.1:5000/Detail%"+"classification="+classification+"&name="+name+"&version="+version+"&charge_person="+charge_person+"&id="+rowIndex)
}
function update(rows){
	var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
		console.log(rowIndex)
    }
    rowIndex--;
    var id=array[rowIndex].id;
window.location.replace("http://127.0.0.1:5000/Update%"+id);

}
function newproduct(){
window.location.replace("http://127.0.0.1:5000/Updatenew");
}

