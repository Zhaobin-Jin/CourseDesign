var array=[];

var loc = location.href;//获取整个跳转地址内容，其实就是你传过来的整个地址字符串
console.log("我的地址"+loc);
var n1 = loc.length;//地址的总长
var n2 = loc.indexOf("%");//取得=号的位置
var parameter = decodeURI(loc.substr(n2+1, n1-n2));//截取从?号后面的内容,也就是参数列表，因为传过来的路径是加了码的，所以要解码
id = parameter;
document.getElementById("form1").action="/addnewproduct%"+id;
// document.getElementById("uploadnew").action="/upload_new%"+id;
document.getElementById("priceform").action="/priceform%"+id;


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
     document.getElementById('formm').action="/newaddtable%"+id;

    }
    button.innerHTML="添加新表"
    form.appendChild(button);

Number.prototype.toPercent = function(){
    return (Math.round(this * 10000)/100) + '%';
}//变成百分数

//添加第一个表格的行
function addbodyrow1(){
  var row = document.createElement('tr'); //创建行
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text'  size='10' name='id' value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text'  size='10' name='classification' value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text'  size='16' name='name'  value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text'  size='8' name='version'  value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似    var bodycell = document.createElement('td'); //创建第一列id
        var bodycell = document.createElement('td'); //创建第一列id

        bodycell.innerHTML="<input type='text'   size='11' name='hard_name' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
            bodycell.innerHTML="<input type='text'  size='16' name='model' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                bodycell.innerHTML="<input type='text'  size='6' name='quantity' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                    bodycell.innerHTML="<input type='text'  size='6' name='batch_costs' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                        bodycell.innerHTML="<input type='text'  size='6' name='price' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                            bodycell.innerHTML="<input type='text'  size='8' name='recycle' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='8' name='recycle_price' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text'  size='8' name='first' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
            bodycell.innerHTML="<input type='text'  size='8' name='second' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                bodycell.innerHTML="<input type='text'  size='8' name='third' value='"+"'>"

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
        bodycell.innerHTML="<input type='text'  size='10' name='id' value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text'  size='9' name='classification' value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text'  size='15' name='name'  value=''>"

    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text'  size='7' name='version'  value=''>"
            row.appendChild(bodycell); //加入表头  ，下面类似

            var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='11' name='softname' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='18' name='main_content' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
        bodycell.innerHTML="<input type='text'  size='6' name='quantity' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
            bodycell.innerHTML="<input type='text'  size='6' name='batch_costs' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                bodycell.innerHTML="<input type='text'  size='6' name='price' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                    bodycell.innerHTML="<input type='text'  size='8' name='recycle' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //
                        bodycell.innerHTML="<input type='text'  size='10' name='recycle_price' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                                bodycell.innerHTML="<input type='text'  size='10' name='first' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                                    bodycell.innerHTML="<input type='text'   size='10' name='second' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
                                        bodycell.innerHTML="<input type='text'  size='4' name='third' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML ="<button  type='submit' onclick='addbody2()'>添加"+"</button>"; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}


//插入第三个表格表体
function body3() {
    var row = document.createElement('tr'); //创建行
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='id' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='20' name='name' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='8' name='version' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='9' name='hard_costs' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='soft_costs' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='period' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='first_hard_costs' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='first_soft_costs' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='batch_costs' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12'  name='cost_percent' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似

    return row;
}

//插入第四个表格表体
function body4(a) {
    var row = document.createElement('tr'); //创建行


    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='actual' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='20' name='agent' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='8' name='profit_share' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='9' name='fake_profit' value='"+"'>"

    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='actual_profit' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='profit_demand' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='price' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='actual_profit_ratial' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
    var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML="<input type='text'  size='12' name='fake_profit_ratial' value='"+"'>"
    row.appendChild(bodycell); //加入表头  ，下面类似
     var bodycell = document.createElement('td'); //创建第一列id
    bodycell.innerHTML ="<button  type='submit' onclick='addbody3()'>添加"+"</button>"; //填充数据
    row.appendChild(bodycell); //加入表头  ，下面类似
    return row;
}

// 获取4个node
var tablebody=[document.getElementById("tbMain1"),document.getElementById("tbMain2"),document.getElementById("tbMain3"),document.getElementById("tbMain4")];
                tablebody[0].appendChild(addbodyrow1());
                tablebody[1].appendChild(addbodyrow2());
                tablebody[2].appendChild(body3());
                tablebody[3].appendChild(body4());


//添加硬件价格的一行
function addbody1(){
    document.getElementById('hardform').action="/addnewhard%"+id;
    }
    //添加软件价格的一行
function addbody2(){
    document.getElementById('softform').action="/addnewsoft%"+id;
    }
        //添加产品售价的一行

    function addbody3(){
    document.getElementById('priceform').action="/addnewpriceform%"+id;
    }
function back() {
    window.location.replace("http://127.0.0.1:5000/back")
}