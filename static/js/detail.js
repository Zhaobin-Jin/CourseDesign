var paValue = new Array();//创建一个用于保存具体值得数组
var loc = location.href;//获取整个跳转地址内容，其实就是你传过来的整个地址字符串
console.log("我的地址"+loc);
var n1 = loc.length;//地址的总长
var n2 = loc.indexOf("%");//取得=号的位置
var parameter = decodeURI(loc.substr(n2+1, n1-n2));//截取从?号后面的内容,也就是参数列表，因为传过来的路径是加了码的，所以要解码
var parameters  = parameter.split("&");//从&处拆分，返回字符串数组
console.log("参数列表"+parameters);
for (var i = 0; i < parameters.length; i++) {
		console.log("参数键值对值"+i+":"+parameters[i]);
		var m1 = parameters[i].length;//获得每个键值对的长度
		var m2 = parameters[i].indexOf("=");//获得每个键值对=号的位置
		var value = parameters[i].substr(m2+1, m1-m2);//获取每个键值对=号后面具体的值
		paValue[i] = value;
		console.log("参数值"+i+":"+value);
}
	document.getElementById("currentPlace").innerHTML="当前位置:"+paValue[0]+">"+paValue[1]+">"+paValue[2];

	document.getElementById("mainpage").innerHTML="负责人:"+paValue[3];
	console.log("具体参数数组："+paValue);

window.addEventListener('scroll', function(){
    let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
    if(t>0){
        $('.navigation').addClass('navigation-active')
    }else{
        $('.navigation').removeClass('navigation-active')
    }
})
//保证导航栏始终在上边

//实现菜单栏选中加亮
$("#menu li:nth-child(1)").addClass('cur');
var fulla = $("#basic").offset().top;
var fullb = $("#logic").offset().top;
var fullc = $("#allocation").offset().top;
var fulld = $("#cost").offset().top;
var fulle = $("#resource").offset().top;

var index;

function scr(index) {
    //
    $("#menu li").removeClass("cur").eq(index).addClass("cur")
}

$(window).scroll(function() {
    var scrTop = $(window).scrollTop() + fulla + 1;

    // scrTop > fulla && scrTop < fullb ? scr(0):(scrTop > fullb && scrTop < fullc ? scr(1):scrTop > fullc && scrTop < fulld?scr(2):scr(3));
    // 下面是上面的意思
    if (scrTop > fulla && scrTop < fullb) {
        scr(0)
    } else if (scrTop > fullb && scrTop < fullc) {
        scr(1)
    } else if (scrTop > fullc && scrTop < fulld) {
        scr(2)
    } else if (scrTop > fulld && scrTop < fulle) {
        scr(3)
    }else{
        scr(4)
    }

})
$('a[href^="#"]').click(function(e) {


    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top-48

    }, 300);
});

Number.prototype.toPercent = function(){
    return (Math.round(this * 10000)/100) + '%';
}//变成百分数


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
                   if(i==0||i==1){
                   var div = document.getElementById("photodiv"+(i+1));
                   var ul=document.createElement('ul');
                   div.appendChild(ul);

                   for(var k=0;k<val.length;k++){

                        var li=document.createElement("li");
                       ul.appendChild(li);

                        if(k==0){
                            li.className='active';
                        }
                       var img = document.createElement("img");
                       img.className='pic'
                       img.src=val[k].image_path+val[k].image_name;
                       li.appendChild(img);

                                                         }

                   }
                   else if(i==2){

                      var div = document.getElementById("photodiv3");
                                                            for(var k=0;k<val.length;k++){

                   //添加div
                   var classfirst = document.createElement("div");
                   div.appendChild(classfirst);
                 //图片
                   var video = "<video class='pic' preload controls> <source src='"+val[k].image_path+val[k].image_name+"'/> </video> "

                   classfirst.innerHTML=video;
                   }
                   }
                   else if(i==3){
                   var div = document.getElementById("logic");
                                                         for(var k=0;k<val.length;k++){

                   //添加div
                   var classfirst = document.createElement("div");
                   div.appendChild(classfirst);
                   //图片
                   var img = document.createElement("img");
                   img.className='logicPic'
                   img.src=val[k].image_path+val[k].image_name;
                   classfirst.appendChild(img);

                                 //文字
                    var p=document.createElement("p");
                    p.className="descriptions1";
                    p.innerHTML=val[k].image_name.split('.')[0];
                    classfirst.appendChild(p);
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
			xmlhttp111.open("GET", "http://127.0.0.1:5000/test_post/picture%"+paValue[4], true);
			xmlhttp111.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp111.withCredentials = false;
			xmlhttp111.send();
		}
	);
photo.then(function(data){
		last_idx1=document.getElementById("photodiv2").getElementsByTagName('ul')[0].getElementsByTagName('li').length;
			last_idx=document.getElementById("photodiv1").getElementsByTagName('ul')[0].getElementsByTagName('li').length;

	console.log(data);
}).catch(function(reason){
	console.log(reason);
});




//插入第一个表格的表体
function body1(a) {
    var row = document.createElement('tr'); //创建行
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.hard_name; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.model; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.quantity; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.batch_costs; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.price; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.recycle; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.recycle_price; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.first; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.second; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.third; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}
//插入第二个表格表体
function body2(a) {
    var row = document.createElement('tr'); //创建行
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.softname; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.main_content; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.quantity; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.batch_costs; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.price; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.recycle; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //
    bodycell.innerHTML = a.recycle_price; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.first; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.second; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.third; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}
//插入第三个表格表体
function body3(a) {
    var row = document.createElement('tr'); //创建行
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.id; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.name; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.version; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.hard_costs; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.soft_costs; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.period; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.first_hard_costs; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.first_soft_costs; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.batch_costs; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.total_costs; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}
//插入第四个表格表体
function body4(a) {
    var row = document.createElement('tr'); //创建行

    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.cost_percent.toPercent(); //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.actual; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.agent.toPercent(); //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.profit_share.toPercent(); //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.fake_profit; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.actual_profit; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.profit_demand.toPercent(); //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.price; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.actual_profit_ratial.toPercent(); //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.fake_profit_ratial.toPercent(); //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}

// 获取4个node

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

                object=xmlhttp.responseText.split(";");

                for (var x=0;x<object.length;x++) {

                    val = JSON.parse(object[x]);
                    for (var i = 0; i < val.length; i++) {

                                        if(val.length!=0){

                        if(x==0) {
                            var tr = body1(val[i]);
                            document.getElementById("tbMain1").appendChild(tr);
                        }
                        else if (x==1){
                            var tr = body2(val[i]);
                            document.getElementById("tbMain2").appendChild(tr);

                        }
                        else{

                            var tr = body3(val[i]);
                            document.getElementById("tbMain3").appendChild(tr);

                            var tr2=body4(val[i]);
                            document.getElementById("tbMain4").appendChild(tr2);


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

        xmlhttp.open("GET", "http://localhost:5000/detail%"+paValue[4], true);
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
                if(val.length!=0){
                for (var i = 0; i < val.length; i++) {
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
        xmlhttp2.open("GET", "http://localhost:5000/technical%"+paValue[4], true);
        xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp2.withCredentials = false;
        xmlhttp2.send();
    }
);
technical.then(function(data){
 fulla = $("#basic").offset().top;
 fullb = $("#logic").offset().top;
 fullc = $("#allocation").offset().top;
fulld = $("#cost").offset().top;
 fulle = $("#resource").offset().top;
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
    var bodycell = document.createElement('td'); //创建第一列id
    let str=s.place;
    let index = str .lastIndexOf(".")
    str =str.substring(index+1,str.length);
    bodycell.innerHTML ="."+str; //填充数据
    fname ="."+str;

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id

    bodycell.innerHTML="<u>下载</u>"; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    bodycell.onclick = function () {
        window.location.replace("http://127.0.0.1:5000/download/"+s.name+fname)
    }
    return row;
}
var body=[document.getElementById("body1"),document.getElementById("body2"),document.getElementById("body3"),document.getElementById("body4"),document.getElementById("body5")];
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
                   classfirst.className='firstPic';
                   div.appendChild(classfirst);
                   var table = "<p class='descriptions'>"+JSON.parse(object[0])[x-1].tablename+"</p> <table id='tb"+x+"'cellspacing='0' width='100%'> </table>";
                   classfirst.innerHTML=table;
                   var table=document.getElementById('tb'+x);
                   var thead=document.createElement("thead");
                   table.appendChild(thead);
                   var tr=document.createElement("tr");
                   tr.className='tbhead';
                   thead.appendChild(tr);

                   var th="<th width='20%'>"+"名称</th> <th width='80%'>"+"参数</th>";
                   tr.innerHTML=th;
                   var tbody=document.createElement("tbody");
                   tbody.id='body'+x
                   table.appendChild(tbody);
                    for (var j = 0; j < val.length; j++) {
                                       if(val.length!=0){

                    document.getElementById("body"+x).appendChild(allocation(val[j]));
                    }
}

                }



                resolve('成功了');
            } else {
                setTimeout(function () {
                    reject('失败了');
                }, 1000);
            }
        }
                xmlhttp3.open("GET", "http://127.0.0.1:5000/tb/"+paValue[4], true);
                xmlhttp3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp3.withCredentials = false;
                xmlhttp3.send();

    }
);
allocation1.then(function(data){

    console.log(data);
}).catch(function(reason){
    console.log(reason);
});
//添加配置参数的表格
function allocation(a){
    var row = document.createElement('tr'); //创建行

    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.name; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    bodycell.className="name";
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML = a.parameters; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}


var paValue = new Array();//创建一个用于保存具体值得数组
$(function() {
	var loc = location.href;//获取整个跳转地址内容，其实就是你传过来的整个地址字符串
	console.log("我的地址"+loc);
	var n1 = loc.length;//地址的总长
	var n2 = loc.indexOf("%");//取得=号的位置
	var parameter = decodeURI(loc.substr(n2+1, n1-n2));//截取从?号后面的内容,也就是参数列表，因为传过来的路径是加了码的，所以要解码
	var parameters  = parameter.split("&");//从&处拆分，返回字符串数组
	console.log("参数列表"+parameters);
	for (var i = 0; i < parameters.length; i++) {
		console.log("参数键值对值"+i+":"+parameters[i]);
		var m1 = parameters[i].length;//获得每个键值对的长度
		var m2 = parameters[i].indexOf("=");//获得每个键值对=号的位置
		var value = parameters[i].substr(m2+1, m1-m2);//获取每个键值对=号后面具体的值
		paValue[i] = value;
		console.log("参数值"+i+":"+value);

	}
	document.getElementById("currentPlace").innerHTML="当前位置:"+paValue[0]+">"+paValue[1]+">"+paValue[2];

	document.getElementById("mainpage").innerHTML="负责人:"+paValue[3];
	console.log("具体参数数组："+paValue);
});

function back() {
    window.location.replace("http://127.0.0.1:5000/back")
}


//实现图片切换

      var last_idx1;

      $("#left-scroll1").click(function(){
        var idx1=$("#photodiv2 ul li").index($("#photodiv2 ul .active")[0]);
        $("#photodiv2 li").eq(idx1).removeClass("active").hide();
        idx1-=1;
        if(idx1==-1){
          idx1=last_idx1-1;
        }
        $("#photodiv2 li").eq(idx1).addClass("active").show();
      })
      $("#right-scroll1").click(function(){
        var idx1=$("#photodiv2 ul li").index($("#photodiv2 ul .active")[0]);
        $("#photodiv2 li").eq(idx1).removeClass("active").hide();
        idx1+=1;
        console.log(idx1);
                console.log(last_idx1);

        if(idx1%last_idx1==0){
          idx1=0;
        }

        $("#photodiv2 li").eq(idx1).addClass("active").show();      })


       var last_idx;

      $("#left-scroll").click(function(){
        var idx=$("#photodiv1 ul li").index($("#photodiv1 ul .active")[0]);
        $("#photodiv1 li").eq(idx).removeClass("active").hide();
        idx-=1;
        if(idx==-1){
          idx=last_idx-1;
        }
        $("#photodiv1 li").eq(idx).addClass("active").show();
      })
      $("#right-scroll").click(function(){
        var idx=$("#photodiv1 ul li").index($("#photodiv1 ul .active")[0]);
        $("#photodiv1 li").eq(idx).removeClass("active").hide();
        idx+=1;

        if(idx%last_idx==0){
          idx=0;
        }

        $("#photodiv1 li").eq(idx).addClass("active").show();      })