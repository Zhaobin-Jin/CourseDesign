var array=[];

var loc = location.href;//获取整个跳转地址内容，其实就是你传过来的整个地址字符串
console.log("我的地址"+loc);
var n1 = loc.length;//地址的总长
var n2 = loc.indexOf("%");//取得=号的位置
var parameter = decodeURI(loc.substr(n2+1, n1-n2));//截取从?号后面的内容,也就是参数列表，因为传过来的路径是加了码的，所以要解码
id = parameter;
document.getElementById("form1").action="/Update1%"+id;
// document.getElementById("uploadnew").action="/upload_new%"+id;
document.getElementById("priceform").action="/priceform%"+id;

//操纵点击修改图片保证readonly的变化
document.getElementById("updateimg").onclick=function(){
if(document.getElementById("productname").readOnly)
{
document.getElementById("updateimg").src="static/photos/xiugai.png";
document.getElementById("productname").readOnly=false;
document.getElementById("chargeperson").readOnly=false;
}
else{
document.getElementById("updateimg").src="static/photos/xiugai-2.png";
document.getElementById("productname").readOnly=true;
document.getElementById("chargeperson").readOnly=true;
}


}
    //调用函数使修改图片起作用
    enableUpdate("updateprice","priceform","input",'');
    enableUpdate("updatesoft","softform","input",'');
    enableUpdate("updatehard","hardform","input",'');
    //操纵点击修改图片保证readonly的变化的函数
    var photo = new Promise(function (resolve, reject) {

		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp111 = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp111 = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlhttp111.withCredentials=false;
		xmlhttp111.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {
                object = xmlhttp111.responseText.split(";");
                for (var i=0;i<object.length;i++){
                   var val = JSON.parse(object[i]);
                   for(var k=0;k<val.length;k++){
                   if(val.length!=0)
                   {
                   if(i==0){
                   var div = document.getElementById("photodiv"+(i+1));
                   //添加div
                   var classfirst = document.createElement("div");
                   div.appendChild(classfirst);
                   //图片
                   var img = document.createElement("img");
                   img.className='pic'
                   img.src=val[k].image_path+val[k].image_name;
                   classfirst.appendChild(img);

                   //删除的按钮
                   var button=document.createElement("button");
                    button.className="pphoto";
                    button.setAttribute("onclick","deletepicture(this)")
                    button.innerHTML="删除"
                    button.type="button"
                    classfirst.appendChild(button);
                   }
                   else if(i==1){
                   var div = document.getElementById("photodiv"+(i+1));
                   //添加div
                   var classfirst = document.createElement("div");
                   div.appendChild(classfirst);
                   //图片
                   var img = document.createElement("img");
                   img.className='pic'
                   img.src=val[k].image_path+val[k].image_name;
                   classfirst.appendChild(img);

                   //删除的按钮
                   var button=document.createElement("button");
                    button.className="pphoto";
                    button.setAttribute("onclick","deletephoto(this)")
                    button.innerHTML="删除"
                    button.type="button"
                    classfirst.appendChild(button);
                   }
                   else if(i==2){
                      var div = document.getElementById("photodiv3");
                   //添加div
                   var classfirst = document.createElement("div");
                   div.appendChild(classfirst);
                 //图片
                   var video = "<video class='pic' preload controls> <source src='"+val[k].image_path+val[k].image_name+"'/> </video> "

                   //删除的按钮
                   var button="<button class='pphoto' onclick='deletevideo(this)'>删除"+"</button>"
                       button.type="button"
                   classfirst.innerHTML=video+button;
                   }
                   else if(i==3){
                   var div = document.getElementById("aiyowoqu");
                   //添加div
                   var classfirst = document.createElement("div");
                   div.appendChild(classfirst);
                   //图片
                   var img = document.createElement("img");
                   img.className='logicPic'
                   img.src=val[k].image_path+val[k].image_name;
                   classfirst.appendChild(img);


                   //删除的按钮
                     var button=document.createElement("button");
                    button.className="pphoto";
                    button.setAttribute("onclick","deleteimage(this)")
                    button.innerHTML="删除"
                       button.type="button"
                    classfirst.appendChild(button);
                                 //文字
                    var p=document.createElement("input");
                    p.type='text';
                    p.id='photoname'+k;
                    p.value=val[k].name;
                    classfirst.appendChild(p);
                   //修改的按钮
                     var button=document.createElement("button");
                    button.className="pphoto";
                    button.setAttribute("onclick","imagename(this)")
                    button.innerHTML="修改"
                       button.type="button"
                    classfirst.appendChild(button);
                   }
                   }

                   }





}

				resolve('成功了');

			}
			else
				{
					setTimeout(function () {

						reject('失败了');
					}, 1000);
				}
			}
			xmlhttp111.open("GET", "http://127.0.0.1:5000/test_post/picture%"+id, true);
			xmlhttp111.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp111.withCredentials = false;
			xmlhttp111.send();
		}
	);
photo.then(function(data){

	console.log(data);
}).catch(function(reason){
	console.log(reason);
});

function enableUpdate(picture,form,texttype,form2){
    document.getElementById(picture).onclick=function(){

     var a=document.getElementById(form);
        var ppp=a.getElementsByTagName(texttype);
        if(ppp[0].readOnly)
        {
            document.getElementById(picture).src="static/photos/xiugai.png";
            for(var i=0;i<ppp.length;i++){
            ppp[i].readOnly=false;
            }
                 if(form2!=''){
               var b=document.getElementById(form2).getElementsByTagName("input");
               b[0].readOnly=false;
}


            for(var aa=0;aa<a.getElementsByTagName("textarea").length;aa++){
            a.getElementsByTagName("textarea")[aa].readOnly=false;
            }

        }
        else{
            document.getElementById(picture).src="static/photos/xiugai-2.png";
            for(var i=0;i<ppp.length;i++){
            ppp[i].readOnly=true;
            }
            if(form2!=''){
               var b=document.getElementById(form2).getElementsByTagName("input");
            b[0].readOnly=true;
}

                  for(var aa=0;aa<a.getElementsByTagName("textarea").length;aa++){
            a.getElementsByTagName("textarea")[aa].readOnly=true;
            }

        }
    }

}
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

				val = JSON.parse(xmlhttp.responseText);
				console.log(val);
                document.getElementById("productname").value=val[id-1].name;
			     document.getElementById("chargeperson").value=val[id-1].charge_person;
				resolve('成功了');

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

function getTechnical(s){
    var fname;
    var row = document.createElement('tr'); //创建行
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = s.type; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = s.name; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = s.date; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var operationCell = document.createElement('td');//创建第三列job
	operationCell.innerHTML ="<button onclick='deletetechnical(this)'>删除"+"</button>";
	row.appendChild(operationCell);
    const param = {
			type:s.type,
			name:s.name,

		}
		array.push(param);
    return row;
}
var technical = new Promise(function (resolve, reject) {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp2 = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp2 = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                val = JSON.parse(xmlhttp2.responseText);

                for (var i = 0; i < val.length; i++) {
                   if(val.length!=0){

                    tr = getTechnical(val[i]);
                    document.getElementById("tbMain").appendChild(tr);
                    }


                }
                                    resolve('成功了');


            }
            else
            {
                setTimeout(function () {
                    reject('失败了');
                }, 1000);
            }
        }
        xmlhttp2.open("GET", "http://localhost:5000/technical%"+id, true);
        xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp2.withCredentials = false;
        xmlhttp2.send();
    }
);
technical.then(function(data){
    console.log(data);
}).catch(function(reason){
    console.log(reason);
});
function deletetechnical(rows) {
    if(confirm("确定删除这一行嘛？")){
	var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
		console.log(rowIndex)
    }

        var type=array[rowIndex].type;
        var name=array[rowIndex].name;
    window.location.replace("http://127.0.0.1:5000/deletetechnical/"+type+"/"+name+"/"+id)
    }
}

var allocation1 = new Promise(function (resolve, reject) {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp3 = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp3 = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp3.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                object = xmlhttp3.responseText.split(";");
                for (var x = 1; x < object.length-1; x++) {
                     val= JSON.parse(object[x]);

                   var div = document.getElementById("allocation");
                   //添加表名
                   var classfirst = document.createElement("div");
                   classfirst.className='first';
                   div.appendChild(classfirst)
                                      //表单
                   var form = document.createElement("form");
                   form.id='formname'+x;
                   form.method='post';
                   classfirst.appendChild(form);
                   var input = document.createElement("input");
                   input.type='text';
                   input.readOnly=true;
                   input.name='tablename';
                   input.value=JSON.parse(object[0])[x-1].tablename;
                   form.appendChild(input);
                   //修改表名的按钮
                   var button=document.createElement("button");
                    button.className="changetable";
                    button.setAttribute("onclick","changetablename(this)")
                    button.innerHTML="修改表名"
                    form.appendChild(button);
                    //删除表的按钮
                    var button=document.createElement("button");
                    button.className="changetable";
                    button.setAttribute("onclick","deleteAllocationTable(this)")
                    button.innerHTML="删除本表"
                    button.type='button'
                    form.appendChild(button);
                   //修改图片
                   var img = document.createElement("img");
                   img.id='update'+x;
                   img.className='updatepicture'
                   img.src="static/photos/xiugai-2.png";
                   form.appendChild(img);
                     var form = document.createElement("form");
                   form.id='formm'+x;
                   form.method='post';
                   classfirst.appendChild(form);
                   //表格
                   var table = "<table id='tb"+x+"'cellspacing='0' width='100%'> </table>";
                   form.innerHTML=table;
                   var table=document.getElementById('tb'+x);
                   var thead=document.createElement("thead");
                   table.appendChild(thead);
                   var tr=document.createElement("tr");
                   tr.className='tbhead';
                   thead.appendChild(tr);

                   var th="<th width='20%'>"+"名称</th> <th width='60%'>"+"参数</th> <th width='20%'>"+"操作</th>";
                   tr.innerHTML=th;
                   var tbody=document.createElement("tbody");
                   tbody.id='body'+x
                   table.appendChild(tbody);

                    for (var j = 0; j < val.length; j++) {
                                       if(val.length!=0){

                    document.getElementById("body"+x).appendChild(allocation(val[j]));
                    }
                    }
                document.getElementById("body"+x).appendChild(addallocation());


                }


                resolve('成功了');
            } else {
                setTimeout(function () {
                    reject('失败了');
                }, 1000);
            }
        }
                xmlhttp3.open("GET", "http://127.0.0.1:5000/tb/"+id, true);
                xmlhttp3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp3.withCredentials = false;
                xmlhttp3.send();

    }
);
allocation1.then(function(data){
    for(var k=1;k<object.length-1;k++){
    enableUpdate("update"+k,"formm"+k,"input",'formname'+k);

    }

    var div=document.getElementById("allocation")
    var classfirst = document.createElement("div");
    classfirst.className='first';
    div.appendChild(classfirst);
                      //表单
    var form = document.createElement("form");
    form.id='formm';
    form.method='post';
    classfirst.appendChild(form);
    var input=document.createElement("input");
    input.type='text';
    input.name='addnewtable';
    input.value='';
    input.id="inn"
    input.placeholder="请输入表名"
    form.appendChild(input);
    var button=document.createElement("button");
    button.id="addnewtb";
    button.onclick=function addnewtb(){
        if (document.getElementById("inn").value==""){
            alert("请输入表名!")

    }
     document.getElementById('formm').action="/addform%"+id;

    }
    button.innerHTML="添加新表"
    form.appendChild(button);
    console.log(data);
}).catch(function(reason){
    console.log(reason);
});
//添加配置参数的表格
function allocation(a){
    var row = document.createElement('tr'); //创建行

    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='20' name='name"+a.id+"' value='"+a.name+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    bodycell.className="name";
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<textarea readonly name='parameters"+a.id+"'  rows='10' cols='80'>"+a.parameters+"</textarea>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.style['text-align'] = 'center';
    bodycell.innerHTML = "<button  type='button'  onclick='deleteallo(this)'>删除"+"</button>"+"<button  type='submit' onclick='upallo(this)'>修改"+"</button>"; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}
//添加配置参数的表格
function addallocation(){
    var row = document.createElement('tr'); //创建行

    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input readonly style='border:1px solid rgb(153,153,153)' type='text' size='20' name='name' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    bodycell.className="name";
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<textarea readonly name='parameters'  rows='10' cols='80'>"+"</textarea>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.style['text-align'] = 'center';
    bodycell.innerHTML ="<button  type='submit' onclick='addallo(this)'>添加"+"</button>"; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}

Number.prototype.toPercent = function(){
    return (Math.round(this * 10000)/100) + '%';
}//变成百分数

//插入第一个表格的表体
function body1(a) {
    var row = document.createElement('tr'); //创建行
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='10' name='id"+a.iiid+"' value='"+a.id+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='10' name='classification"+a.iiid+"' value='"+a.classification+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='16' name='name"+a.iiid+"' value='"+a.name+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='8' name='version"+a.iiid+"' value='"+a.version+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='11' name='hard_name"+a.iiid+"' value='"+a.hard_name+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
            bodycell.innerHTML="<input type='text' readonly size='16' name='model"+a.iiid+"' value='"+a.model+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                bodycell.innerHTML="<input type='text' readonly size='6' name='quantity"+a.iiid+"' value='"+a.quantity+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                    bodycell.innerHTML="<input type='text' readonly size='6' name='batch_costs"+a.iiid+"' value='"+a.batch_costs+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                        bodycell.innerHTML="<input type='text' readonly size='6' name='price"+a.iiid+"' value='"+a.price+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                            bodycell.innerHTML="<input type='text' readonly size='8' name='recycle"+a.iiid+"' value='"+a.recycle+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='8' name='recycle_price"+a.iiid+"' value='"+a.recycle_price+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='8' name='first"+a.iiid+"' value='"+a.first+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
            bodycell.innerHTML="<input type='text' readonly size='8' name='second"+a.iiid+"' value='"+a.second+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                bodycell.innerHTML="<input type='text' readonly size='8' name='third"+a.iiid+"' value='"+a.third+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML ="<button type='button' onclick='deletehard(this)'>删除"+"</button>"+"<button type='submit' onclick='uphard(this)'>修改"+"</button>"; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}
//添加第一个表格的行
function addbodyrow1(){
  var row = document.createElement('tr'); //创建行
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='10' name='id' value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='10' name='classification' value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='16' name='name'  value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='8' name='version'  value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似    var bodycell = document.createElement('td'); //创建第一列id
        var bodycell = document.createElement('td'); //创建第一列id

        bodycell.innerHTML="<input type='text' readonly  size='11' name='hard_name' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
            bodycell.innerHTML="<input type='text' readonly size='16' name='model' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                bodycell.innerHTML="<input type='text' readonly size='6' name='quantity' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                    bodycell.innerHTML="<input type='text' readonly size='6' name='batch_costs' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                        bodycell.innerHTML="<input type='text' readonly size='6' name='price' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                            bodycell.innerHTML="<input type='text' readonly size='8' name='recycle' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='8' name='recycle_price' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='8' name='first' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
            bodycell.innerHTML="<input type='text' readonly size='8' name='second' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                bodycell.innerHTML="<input type='text' readonly size='8' name='third' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML ="<button  type='submit' onclick='addbody1()'>添加"+"</button>"; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}
//添加第一个表格的行
function addbodyrow2(){
var row = document.createElement('tr'); //创建行
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='10' name='id' value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text'readonly  size='9' name='classification' value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='15' name='name'  value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='7' name='version'  value=''>"
            row.appendChild(bodycell); //加入表头  ，下面类似

            var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='11' name='softname' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='18' name='main_content' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='6' name='quantity' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
            bodycell.innerHTML="<input type='text' readonly size='6' name='batch_costs' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                bodycell.innerHTML="<input type='text' readonly size='6' name='price' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                    bodycell.innerHTML="<input type='text' readonly size='8' name='recycle' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //
                        bodycell.innerHTML="<input type='text' readonly size='10' name='recycle_price' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                                bodycell.innerHTML="<input type='text' readonly size='10' name='first' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                                    bodycell.innerHTML="<input type='text' readonly  size='10' name='second' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                                        bodycell.innerHTML="<input type='text' readonly size='4' name='third' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML ="<button  type='submit' onclick='addbody2()'>添加"+"</button>"; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}


//插入第二个表格表体
function body2(a) {
    var row = document.createElement('tr'); //创建行
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='10' name='id"+a.iiid+"' value='"+a.id+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='9' name='classification"+a.iiid+"' value='"+a.classification+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='15' name='name"+a.iiid+"' value='"+a.name+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='7' name='version"+a.iiid+"' value='"+a.version+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似    var bodycell = document.createElement('td'); //创建第一列id
        var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='11' name='softname"+a.iiid+"' value='"+a.softname+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='18' name='main_content"+a.iiid+"' value='"+a.main_content+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text' readonly size='6' name='quantity"+a.iiid+"' value='"+a.quantity+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
            bodycell.innerHTML="<input type='text' readonly size='6' name='batch_costs"+a.iiid+"' value='"+a.batch_costs+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                bodycell.innerHTML="<input type='text' readonly size='6' name='price"+a.iiid+"' value='"+a.price+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                    bodycell.innerHTML="<input type='text' readonly size='8' name='recycle"+a.iiid+"' value='"+a.recycle+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //
                        bodycell.innerHTML="<input type='text' readonly size='10' name='recycle_price"+a.iiid+"' value='"+a.recycle_price+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                                bodycell.innerHTML="<input type='text' readonly size='10' name='first"+a.iiid+"' value='"+a.first+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                                    bodycell.innerHTML="<input type='text' readonly size='10' name='second"+a.iiid+"' value='"+a.second+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                                        bodycell.innerHTML="<input type='text' readonly size='4' name='third"+a.iiid+"' value='"+a.third+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = "<button  type='button'  onclick='deletesoft(this)'>删除"+"</button>"+"<button  type='submit' onclick='upsoft(this)'>修改"+"</button>"; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}

//插入第三个表格表体
function body3(a) {
    var row = document.createElement('tr'); //创建行
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='id' value='"+a.id+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='20' name='name' value='"+a.name+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='8' name='version' value='"+a.version+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='9' name='hard_costs' value='"+a.hard_costs+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='soft_costs' value='"+a.soft_costs+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='period' value='"+a.period+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='first_hard_costs' value='"+a.first_hard_costs+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='first_soft_costs' value='"+a.first_soft_costs+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='batch_costs' value='"+a.batch_costs+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12'  name='cost_percent' value='"+a.cost_percent.toPercent()+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似

    return row;
}

//插入第四个表格表体
function body4(a) {
    var row = document.createElement('tr'); //创建行


    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='actual' value='"+a.actual+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='20' name='agent' value='"+a.agent.toPercent()+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='8' name='profit_share' value='"+a.profit_share.toPercent()+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='9' name='fake_profit' value='"+a.fake_profit+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='actual_profit' value='"+a.actual_profit+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='profit_demand' value='"+a.profit_demand.toPercent()+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='price' value='"+a.price+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='actual_profit_ratial' value='"+a.actual_profit_ratial.toPercent()+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text' readonly size='12' name='fake_profit_ratial' value='"+a.fake_profit_ratial.toPercent()+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}

// 获取4个node
var tablebody=[document.getElementById("tbMain1"),document.getElementById("tbMain2"),document.getElementById("tbMain3"),document.getElementById("tbMain4")];

var cost = new Promise(function (resolve, reject) {

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp11 = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp11 = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp11.withCredentials=false;
        xmlhttp11.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                object=xmlhttp11.responseText.split(";");
                if(object.length!=0){
                for (x=0;x<object.length;x++) {

                    val = JSON.parse(object[x]);
                    for (var i = 0; i < val.length; i++) {
                                       if(val.length!=0){

                        if(x==0) {
                            tr = body1(val[i]);
                        }
                        else if (x==1){
                            tr = body2(val[i]);

                        }
                        else{

                            tr = body3(val[i]);
                            tr2=body4(val[i]);
                            tablebody[3].appendChild(tr2);

                        }
                        tablebody[x].appendChild(tr);
                        }
                    }


                }
                tablebody[0].appendChild(addbodyrow1());
                                tablebody[1].appendChild(addbodyrow2());


            }
                                                        resolve('成功了');

            }
            else
            {
                setTimeout(function () {

                    reject('失败了');
                }, 1000);
            }
        }
        xmlhttp11.open("GET", "http://localhost:5000/detail%"+id, true);
        xmlhttp11.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp11.withCredentials = false;
        xmlhttp11.send();
    }
);
cost.then(function(data){


    console.log(data);
}).catch(function(reason){
    console.log(reason);
});
//删除软件表里某行

function deletesoft(rows){

	var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;

    }

    if(confirm("确定删除这一行嘛？")){
window.location.replace("http://127.0.0.1:5000/deletesoft%"+id+"&"+rowIndex)


	}


}
//删除硬件表里某行
function deletehard(rows){

		var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
    }

    if(confirm("确定删除这一行嘛？")){
window.location.replace("http://127.0.0.1:5000/deletehard%"+id+"&"+rowIndex)


	}


}
//修改硬件表里某行

function upsoft(rows){

		var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
    }


    document.getElementById("softform").action="/upsoft%"+id+"&"+rowIndex;



}
//修改软件表里某行
function uphard(rows){

		var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
    }

    document.getElementById("hardform").action="/uphard%"+id+"&"+rowIndex;
}
//删除配置参数表里某行
function deleteallo(rows){
    var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
    }
    var name=rows.parentNode.parentNode.parentNode.parentNode.id.replace("tb","");

    if(confirm("确定删除这一行嘛？")){
        window.location.replace("http://127.0.0.1:5000/deleteallo%"+name+"&"+id+"&"+rowIndex);
	}
}
//修改配置参数表里某行
function upallo(rows){

	var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
    }
    var form=rows.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    var name=rows.parentNode.parentNode.parentNode.parentNode.id.replace("tb","");//表的名称

    document.getElementById(form).action="/upallo%"+name+"&"+id+"&"+rowIndex;
}
//添加配置参数表的一行

function addallo(rows){
	var rowIndex;
    var index=rows.parentNode.parentNode.rowIndex-1;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.parentNode.tagName.toLowerCase() == "td") {
        rowIndex = target.parentNode.parentNode.rowIndex;
    }
    var form=rows.parentNode.parentNode.parentNode.parentNode.parentNode.id;//表单名称
    var name=rows.parentNode.parentNode.parentNode.parentNode.id.replace("tb","");//表的名称
    document.getElementById(form).action="/addallo%"+name+"&"+id+"&"+rowIndex;
}
//添加硬件价格的一行
function addbody1(){
    document.getElementById('hardform').action="/addhard%"+id;
    }
    //添加软件价格的一行
function addbody2(){
    document.getElementById('softform').action="/addsoft%"+id;
    }
function changetablename(rows){
    var form=rows.parentNode.id;//表单名称

    if (document.getElementById(form).getElementsByTagName("input")[0].value==""){
        alert("请输入表名!")

}
 document.getElementById(form).action="/changeformname%"+id+"&"+form.replace('formname','');

}
function deleteAllocationTable(rows){
var tableindex=rows.parentNode.id.replace('formname','');//表单名称


window.location.replace("http://127.0.0.1:5000/deleteAllocationTable%"+id+"&"+tableindex)

}
function deletephoto(row) {
    var front = 0;//设置当前为0
    var row_tmp = row.parentElement;//按钮的父元素是div

    while (row_tmp.previousSibling && $(row_tmp).is('div')){//不断向前移元素，直到不是div为止
        row_tmp = row_tmp.previousSibling;
        front++;//记录有多少个元素
    }
    window.location.replace("http://127.0.0.1:5000/delete_photo%"+id+"%"+front);
}
function deleteimage(row) {
    var front = 0;//设置当前为0
    var row_tmp = row.parentElement;//按钮的父元素是div

    while (row_tmp.previousSibling && $(row_tmp).is('div')){//不断向前移元素，直到不是div为止
        row_tmp = row_tmp.previousSibling;
        front++;//记录有多少个元素
    }
    window.location.replace("http://127.0.0.1:5000/delete_image%"+id+"%"+front);
}
function deletepicture(row) {
        var front = 0;//设置当前为0
    var row_tmp = row.parentElement;//按钮的父元素是div

    while (row_tmp.previousSibling && $(row_tmp).is('div')){//不断向前移元素，直到不是div为止
        row_tmp = row_tmp.previousSibling;
        front++;//记录有多少个元素
    }
    window.location.replace("http://127.0.0.1:5000/delete_picture%"+id+"%"+front);
}
function deletevideo(row) {
    var front = 0;//设置当前为0
    var row_tmp = row.parentElement;//按钮的父元素是div

    while (row_tmp.previousSibling && $(row_tmp).is('div')){//不断向前移元素，直到不是div为止
        row_tmp = row_tmp.previousSibling;
        front++;//记录有多少个元素
    }
    window.location.replace("http://127.0.0.1:5000/delete_video%"+id+"%"+front);
}
function back() {
    window.location.replace("http://127.0.0.1:5000/back")
}
function imagename(rows){
    var name=rows.parentNode.getElementsByTagName('input')[0].value;
    var front = 0;//设置当前为0
    var row_tmp = rows.parentElement;//按钮的父元素是div

    while (row_tmp.previousSibling && $(row_tmp).is('div')){//不断向前移元素，直到不是div为止
        row_tmp = row_tmp.previousSibling;
        front++;//记录有多少个元素
    }
    window.location.replace("http://127.0.0.1:5000/update_image%"+id+"%"+front+"%"+name);

}