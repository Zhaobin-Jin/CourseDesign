
let mysql=require("mysql");
const db_config={
    host:"localhost",
    user:"root",
    password:"wuyiwen520",
    port:"3306",
    database:"wuyiwen"
}
let pool=mysql.createPool(db_config);
pool.getConnection(function(err,connect){//通过getConnection()方法进行数据库连接
    if(err){
        console.log(`mysql链接失败${err}`);
    }else{
        connect.query('select * from Product',function(err,result){
            if(err){
                console.log(`SQL error:${err}`)
            }else{
                var dataString = JSON.stringify(result);
                data = JSON.parse(dataString);
                console.log(data);
                connect.release();//释放连接池中的数据库连接
                pool.end();//关闭连接池
            }
        });
    }
});
    var express = require("express");//构建服务器
    var app = express();
    app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.withCredentials=false;
    next();
});
    app.get("/", function(req, res) {
        res.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});


        for(var i=0;i<data.length;i++){
            var obj={
                id:data[i]["id"],
                classification:data[i]["classification"],
                name:data[i]["name"],
                version:data[i]["version"],
                research_costs:data[i]["research_costs"],
                batch_costs:data[i]["batch_costs"],
                price:data[i]["price"],
                update_time:data[i]["update_time"],
                charge_person:data[i]["charge_person"],
            };
            res.write(JSON.stringify(obj));//向前端发送数据
            if (i<data.length-1){
                res.write(",");
            }
        }
        res.end();
    });
    app.listen(8081,function() {
    console.log("应用实例，访问地址为 http://127.0.0.1:8081");
    });
