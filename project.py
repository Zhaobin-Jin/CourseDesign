# 导入Flask类
# coding:utf-8
import os
from csv import excel
import re

from flask import Flask, jsonify, make_response, send_from_directory, g, session
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import *
import json
import xlrd
from datetime import datetime
import datetime as tttoday
import pymysql


# from flask_restful import Api
# from flask_restful import Resource
# from flask_restful import reqparse
from pymysql.constants.FLAG import AUTO_INCREMENT
from werkzeug.utils import secure_filename
import pymysql

db=pymysql.connect("localhost","root","cuidonghao","bishe",charset='utf8')
cursor = db.cursor()
# 实例化，可视为固定格式
basedir = os.path.abspath(os.path.dirname(__file__))

now = tttoday.datetime.now()
year = now.year
month = now.month
day = now.day

ALLOWED_IMAGE = set(['png', 'jpg', 'JPG', 'PNG', 'bmp','jpeg'])
ALLOWED_FILE = set(['docx','doc','pdf'])
ALLOWED_VIDEO = set(['mp4','mov','avi'])
ALLOWED_VISIO = set(['visio'])
ALLOWED_MAX = set(['max'])
app = Flask(__name__)
CORS(app, supports_credentials=True)
CORS(app, resources=r'/*')
app.config["SQLALCHEMY_DATABASE_URI"]="mysql+pymysql://root:cuidonghao@localhost:3306/bishe"
app.config['SECRET_KEY'] = 'mkisoq;'


database=SQLAlchemy(app)
def allowed_image(filename):
    return '.' in filename and filename.split('.')[-1] in ALLOWED_IMAGE
def allowed_video(filename):
    return '.' in filename and filename.split('.')[-1] in ALLOWED_VIDEO
def allowed_file(filename):
    return '.' in filename and filename.split('.')[-1] in ALLOWED_FILE
def allowed_visio(filename):
    return '.' in filename and filename.split('.')[-1] in ALLOWED_VISIO
def allowed_max(filename):
    return '.' in filename and filename.split('.')[-1] in ALLOWED_MAX

class User(database.Model):
    __tablename__="user"
    username = database.Column(database.String(255),primary_key=True)
    password=database.Column(database.String(255))

class Product(database.Model):
    __tablename__="product"
    id = database.Column(database.Integer,primary_key=True,autoincrement=True)
    classification = database.Column(database.String(255))
    name = database.Column(database.String(255))
    version = database.Column(database.String(255))
    research_costs = database.Column(database.Float(10,2))
    batch_costs = database.Column(database.Float(10,2))
    price = database.Column(database.Float(10,2))
    update_time = database.Column(database.String(255))
    charge_person = database.Column(database.String(255))

#配置参数小表见表
class Table(database.Model):
    #基础参数
    __tablename__="tb"
    id = database.Column(database.Integer,primary_key=True,autoincrement=True)
    name = database.Column(database.String(255),nullable=False)
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"))#添加外键确定所属产品。



#基础参数见表
class Product_information(database.Model):
    #基础参数
    __tablename__="tb1"
    id = database.Column(database.Integer,primary_key=True,autoincrement=True)
    name = database.Column(database.String(255))
    parameters = database.Column(database.String(3000))
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"))#添加外键确定所属产品。

#16线雷达信息见表
class Line_lidar(database.Model):
    #16线雷达
    __tablename__ = "tb2"
    id = database.Column(database.Integer,primary_key=True,autoincrement=True)
    name = database.Column(database.String(255))
    parameters = database.Column(database.String(3000))
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"))#添加外键确定所属产品。

#线控底盘信息见表
class Chassis_wire(database.Model):
    #线控底盘
    __tablename__ = "tb3"
    id = database.Column(database.Integer,primary_key=True,autoincrement=True)
    name = database.Column(database.String(255))
    parameters = database.Column(database.String(3000))
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"))#添加外键确定所属产品。

#处理器见表
class Processor(database.Model):
    #处理器
    __tablename__ = "tb4"
    id = database.Column(database.Integer,primary_key=True,autoincrement=True)
    name = database.Column(database.String(255))
    parameters = database.Column(database.String(3000))
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"))#添加外键确定所属产品。

#显示器见表
class Display_screen(database.Model):
    #显示屏
    __tablename__ = "tb5"
    id = database.Column(database.Integer,primary_key=True,autoincrement=True)
    name = database.Column(database.String(255))
    parameters = database.Column(database.String(3000))
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"))#添加外键确定所属产品。
class Hardware(database.Model):
    __tablename__="hardware"
    id = database.Column(database.String(255))
    classification = database.Column(database.String(255))
    name = database.Column(database.String(255))
    version = database.Column(database.String(255))
    hard_name = database.Column(database.String(255))
    model = database.Column(database.String(255))
    quantity = database.Column(database.Integer)
    batch_costs = database.Column(database.Float(10,2))
    price = database.Column(database.Float(10,2))
    recycle = database.Column(database.String(255))
    recycle_price = database.Column(database.Float(10,2))
    first = database.Column(database.String(255))
    second = database.Column(database.String(255))
    third = database.Column(database.String(255))
    iiid = database.Column(database.Integer, autoincrement=True, primary_key=True, nullable=False)
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"))#添加外键确定所属产品。


class Software(database.Model):
    __tablename__="software"
    id = database.Column(database.String(255))
    classification = database.Column(database.String(255))
    name = database.Column(database.String(255))
    version = database.Column(database.String(255))
    softname = database.Column(database.String(255))
    main_content = database.Column(database.String(255))
    quantity = database.Column(database.Integer)
    batch_costs = database.Column(database.Float(10,2))
    price = database.Column(database.Float(10,2))
    recycle = database.Column(database.String(255))
    recycle_price = database.Column(database.Float(10,2))
    first = database.Column(database.String(255))
    second = database.Column(database.String(255))
    third = database.Column(database.String(255))
    iiid = database.Column(database.Integer, autoincrement=True, primary_key=True, nullable=False)
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"))#添加外键确定所属产品。


class ProductPrice(database.Model):
    __tablename__="productPrice"

    id = database.Column(database.String(255))
    name = database.Column(database.String(255))
    version = database.Column(database.String(255))
    hard_costs = database.Column(database.Float(10,2))
    soft_costs = database.Column(database.Float(10,2))
    period = database.Column(database.Integer)
    first_hard_costs = database.Column(database.Float(10,2))
    first_soft_costs = database.Column(database.Float(10,2))
    batch_costs = database.Column(database.Float(10, 2))
    total_costs = database.Column(database.Float(10,2))
    cost_percent=database.Column(database.Float(10,2))
    actual = database.Column(database.Float(10,2))
    agent=database.Column(database.Float(10,2))
    profit_share=database.Column(database.Float(10,2))
    fake_profit = database.Column(database.Float(10,2))
    actual_profit = database.Column(database.Float(10,2))
    profit_demand = database.Column(database.Float(10,2))
    price = database.Column(database.Float(10,2))
    actual_profit_ratial=database.Column(database.Float(10,2))
    fake_profit_ratial=database.Column(database.Float(10,2))
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"), primary_key=True)#添加外键确定所属产品。
class Technical(database.Model):
    __tablename__="technical"
    type = database.Column(database.String(255))
    name=database.Column(database.String(255))
    date=database.Column(database.Date)
    place=database.Column(database.String(255),primary_key=True)
    extension = database.Column(database.String(255))
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"))#添加外键确定所属产品。


class Image(database.Model):
    __tablename__ = "image"
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"))#添加外键确定所属产品。
    id = database.Column(database.Integer, autoincrement=True, primary_key=True, nullable=False)
    image_name = database.Column(database.String(255))
    image_path = database.Column(database.String(255))
    name = database.Column(database.String(255))

class File(database.Model):
    __tablename__ = "file"
    role_id = database.Column(database.Integer,database.ForeignKey("product.id",ondelete="CASCADE",onupdate="CASCADE"))#添加外键确定所属产品。
    id = database.Column(database.Integer, autoincrement=True, primary_key=True, nullable=False)
    file_name = database.Column(database.String(255))
    file_path = database.Column(database.String(255))

@app.route('/?<string:username>')
def index(username):
    return render_template('HomePage.html')


@app.route('/Update%<string:id>',methods=['post','get'])
def Update(id):
    DB = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = DB.cursor()
    detail_path =basedir+"\static\details"
    if request.method == 'POST':
        request_str = str(request.files)

        if 'photo' in request_str and 'photo_2' in request_str and 'video' in request_str:
            photo_01 = request.files['photo']
            photo_02 = request.files['photo_2']
            video_01 = request.files['video']
            if photo_01 and allowed_image(photo_01.filename):
                path = "\产品图片\\"
                fname = secure_filename(photo_01.filename)
                fname = fname.split(".")
                file_name = fname[0]
                fname = fname[len(fname) - 1]
                full_path = detail_path + path  # 文件的实际存储路径
                full_path = full_path.replace("\\", "/")
                split_path = full_path.split("/")
                db_path = ""
                for index in range(len(split_path)):
                    if index < len(split_path)-1 and index > len(split_path) - 5:
                        db_path += split_path[index] + "/"
                image_path = db_path # 数据库内存储的相对路径
                image_name = file_name + "_" + id + "." + fname
                Image_jiemian = Image(image_name=image_name, image_path=image_path, role_id=id)
                database.session.add(Image_jiemian)
                database.session.commit()
                photo_01.save(os.path.join(full_path, image_name))

            if photo_02 and allowed_image(photo_02.filename):
                path = "\软件界面\\"
                fname = secure_filename(photo_02.filename)
                fname = fname.split(".")
                file_name = fname[0]
                fname = fname[len(fname) - 1]
                full_path = detail_path + path  # 文件的实际存储路径
                full_path = full_path.replace("\\", "/")
                split_path = full_path.split("/")
                db_path = ""
                for index in range(len(split_path)):
                    if index < len(split_path)-1 and index > len(split_path) - 5:
                        db_path += split_path[index] + "/"
                image_path = db_path # 数据库内存储的相对路径
                image_name = file_name + "_" + id + "." + fname
                Image_jiemian = Image(image_name=image_name, image_path=image_path, role_id=id)
                database.session.add(Image_jiemian)
                database.session.commit()
                photo_02.save(os.path.join(full_path, image_name))

            if video_01 and allowed_video(video_01.filename):
                path = "\产品视频\\"
                fname = secure_filename(video_01.filename)
                fname = fname.split(".")
                file_name = fname[0]
                fname = fname[len(fname) - 1]
                full_path = detail_path + path  # 文件的实际存储路径
                full_path = full_path.replace("\\", "/")
                split_path = full_path.split("/")
                db_path = ""
                for index in range(len(split_path)):
                    if index < len(split_path)-1 and index > len(split_path) - 5:
                        db_path += split_path[index] + "/"
                image_path = db_path # 数据库内存储的相对路径
                image_name = file_name + "_" + id + "." + fname
                Image_jiemian = Image(image_name=image_name, image_path=image_path, role_id=id)
                database.session.add(Image_jiemian)
                database.session.commit()
                video_01.save(os.path.join(full_path, image_name))

        if "'image_1'" in request_str:
            print("第二张表")
            image_01 = request.files['image_1']
            visio = request.files['visio']
            if image_01 and allowed_image(image_01.filename):
                path = "\逻辑框架\\"
                fname = secure_filename(image_01.filename)
                fname = fname.split(".")
                file_name = fname[0]
                fname = fname[len(fname) - 1]
                full_path = detail_path + path  # 文件的实际存储路径
                full_path = full_path.replace("\\", "/")#将实际的\路径转为相对路径/
                split_path = full_path.split("/")
                db_path = ""
                for index in range(len(split_path)):
                    if index < len(split_path)-1 and index > len(split_path) - 5:
                        db_path += split_path[index] + "/"
                image_path = db_path # 数据库内存储的相对路径
                image_name = file_name + "_" + id + "." + fname
                Image_jiemian = Image(image_name=image_name, image_path=image_path, role_id=id)
                database.session.add(Image_jiemian)
                database.session.commit()
                image_01.save(os.path.join(full_path, image_name))
            if visio and allowed_visio(visio.filename):
                path = "\产品手册\\"
                fname = secure_filename(visio.filename)
                fname = fname.split(".")
                file_name = fname[0]
                fname = fname[len(fname) - 1]

                full_path = detail_path + path  # 文件的实际存储路径
                full_path = full_path.replace("\\", "/")#将实际的\路径转为相对路径/
                split_path = full_path.split("/")
                db_path = ""
                for index in range(len(split_path)):
                    if index < len(split_path)-1 and index > len(split_path) - 5:
                        db_path += split_path[index] + "/"
                image_path = db_path # 数据库内存储的相对路径
                image_name = file_name + "_" + id + "." + fname
                Image_jiemian = Technical(type="逻辑框架",extension=fname,role_id=id,name=file_name,place=full_path,date=datetime(year,month,day))#添加到数据库操作
                database.session.add(Image_jiemian)
                database.session.commit()
                visio.save(os.path.join(full_path, image_name))

        if  "'file'" in request_str:
            print("上传文件")
            file = request.files['file']
            if file:
                if request.form.get('whichone')=="三维结构" and allowed_max(file.filename):
                    path ="\三维结构\\"
                    fname = secure_filename(file.filename)
                    fname = fname.split('.')
                    file_name = request.form.get('filename')
                    fname = fname[len(fname) - 1]#最后一个“.”后的扩展名
                    full_path = detail_path + path  # 文件的实际存储路径
                    full_path = full_path.replace("\\", "/")#将实际的\路径转为相对路径/
                    split_path = full_path.split("/")
                    db_path = ""
                    for index in range(len(split_path)):
                        if index < len(split_path)-1 and index > len(split_path) - 5:
                            db_path += split_path[index] + "/"
                    file_path = db_path # 数据库内存储的相对路径
                    Technical_file=Technical(role_id=id,place=file_path+file_name,type = request.form.get('whichone'),name=file_name,date=datetime(year,month,day),extension="."+fname)#添加到数据库操作
                    database.session.add(Technical_file)
                    database.session.commit()
                    file_name = file_name + "_" + id + "." + fname
                    file.save(os.path.join(full_path, file_name))
                if request.form.get('whichone') == "产品手册" and allowed_file(file.filename):
                    path ="\产品手册\\"
                    fname = secure_filename(file.filename)
                    fname = fname.split('.')
                    file_name = request.form.get('filename')
                    fname = fname[len(fname) - 1]#最后一个“.”后的扩展名
                    full_path = detail_path + path  # 文件的实际存储路径
                    full_path = full_path.replace("\\", "/")#将实际的\路径转为相对路径/
                    split_path = full_path.split("/")
                    db_path = ""
                    for index in range(len(split_path)):
                        if index < len(split_path)-1 and index > len(split_path) - 5:
                            db_path += split_path[index] + "/"
                    file_path = db_path # 数据库内存储的相对路径
                    Technical_file=Technical(role_id=id,place=file_path+file_name,type = request.form.get('whichone'),name=file_name,date=datetime(year,month,day),extension="."+fname)#添加到数据库操作
                    database.session.add(Technical_file)
                    database.session.commit()
                    file_name = file_name + "_" + id + "." + fname
                    file.save(os.path.join(full_path, file_name))

    cursor.close()
    DB.close()
    return render_template('Update.html')
#更新基本信息
@app.route('/Update1%<string:id>',methods=['post'])
def Updatename(id):
    print(id)
    #更新对象，保证更新时不出错
    name=request.form.get('productname')
    chargeperson=request.form.get('chargeperson')
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql1="update product set name='"+name+"' where id='"+id+"'"
    sql="update product set charge_person='"+chargeperson+"' where id='"+id+"'"

    cursor.execute(sql)
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Update%"+id)
@app.route('/login')
def login():
    return render_template('Login.html')


@app.route('/back')
def back():
    return redirect(url_for('index',username=session['username']))

#html中action对应route地址
@app.route('/deal_login',methods=['post'])
def deal_login():
    userName=request.form.get('username')
    passWord=request.form.get('password')
    result=User.query.filter_by(username=userName,password=passWord).first()
    if result!=None:
        print("存在用户")
        session['username']=userName
        return redirect(url_for('index',username=userName))
    else:
        return redirect(url_for('login'))



# 从数据库中获取首页发送至前端
@app.route('/test_post/nn', methods=['GET'])
def getSql():
    DB = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = DB.cursor()
    sql = "select * from Product"
    cursor.execute(sql)
    results = cursor.fetchmany(9)
    products = []
    for r in results:
        product = {}
        product['id'] = r[0]
        product['classification'] = r[1]
        product['name'] = r[2]
        product['version'] = r[3]
        product['research_costs'] = r[4]
        product['batch_costs'] = r[5]
        product['price'] = r[6]
        product['update_time'] = r[7]
        product['charge_person'] = r[8]
        products.append(product)
    jsonStr = json.dumps(products,ensure_ascii=False)
    return jsonStr
#获取详情页图片
@app.route('/Detail%<string:classification>&<string:name>&<string:version>&<string:charge_person>&<string:id>')
def Detail(classification,name,version,charge_person,id):
    product_id = id.split("=")
    id = product_id[1]
    DB = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = DB.cursor()
    cursor.close()
    DB.close()
    return render_template('Detail.html')

#获取配置参数信息
@app.route('/tb/<string:product_id>',methods=['GET'])
def tb(product_id):

    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sqlmin = "select id from tb where role_id = '" + product_id + "'order by id asc"
    aa = cursor.execute(sqlmin)
    min = cursor.fetchmany(aa)

    sql = "select name from tb where role_id = '" + product_id + "'order by id asc"
    aa = cursor.execute(sql)
    tablename = cursor.fetchmany(aa)
    print(tablename)
    jsonStr=""
    technicals = []

    for j in min:
        technical = {}
        technical['tablename'] = tablename[min.index(j)][0]
        technicals.append(technical)
    jsonStr =jsonStr+json.dumps(technicals, ensure_ascii=False)+";"

    for p in min:
        sql = "select name,parameters,id from tb"+str(p[0])+" where role_id = '" + product_id + "'order by id asc"
        aa = cursor.execute(sql)
        results = cursor.fetchmany(aa)
        technicals = []
        desc = cursor.description
        for r in results:
            technical = {}
            for i in range(0, len(desc)):
                name = desc[i][0]
                technical[name] = str(r[i])

            technicals.append(technical)

        jsonStr =jsonStr+json.dumps(technicals, ensure_ascii=False)+";"
    db.close()
    return jsonStr
#删除功能逻辑实现
@app.route('/deal_delete/<string:id>&<string:username>')
def deal_delete(id,username):
    if id!='0':
        print(id)
        sql1= "delete from product where id='"+id+"'"
        sql2= "update product set id = id-1 where id > "+id+""
        sql3= "ALTER TABLE `product` AUTO_INCREMENT = "+id+""
        cursor.execute(sql1)
        cursor.execute(sql2)
        cursor.execute(sql3)
        db.commit()
        print("删除成功")
    database.session.close_all()
    return redirect(url_for('index',username=username))

@app.route('/deal_shangyi/<string:id>&<string:username>')
def deal_shangyi(id,username):
    if(id=='1'):
        return redirect(url_for('index',username=username))
    else:
        #更新对象，保证更新时不出错
        sql="update product set id=0 where id='"+id+"'"
        cursor.execute(sql)
        db.commit()
        #更新当前对象上方的id，等于下移操作
        sql="update product SET id =(id+1) where id=("+id+"-1)"
        cursor.execute(sql)
        db.commit()
        sql = "update product SET id = ("+id+"-1) where id = 0 "
        cursor.execute(sql)
        db.commit()



        return redirect(url_for('index',username=username))


    #把login和主页的内容加到数据库
def addingToDb():
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    admin = User(username="zhejiushiwo", password="test1111")
    database.session.add(admin)
    test_product = Product(id="1", classification="单要素教学产品", name="激光雷达教学实训台架", version="基础版本", research_costs=7.65,
                           price=23.44, charge_person="测试人员")
    database.session.add(test_product)
    test_product = Product(id="2", classification="单要素教学产品", name="激光雷达教学实训台架", version="基础版本", research_costs=7.65,
                           price=23.44, charge_person="测试人员")
    database.session.add(test_product)
    test_product = Product(id="3", classification="单要素教学产品", name="激光雷达教学实训台架", version="基础版本", research_costs=7.65,
                           price=23.44, charge_person="测试人员")
    database.session.add(test_product)
    database.session.commit()
    db.close()

@app.route('/deal_xiayi/<string:id>&<string:username>')
def deal_xiayi(id,username):
    sql='select COUNT(*) from product'
    cursor.execute(sql)
    result=cursor.fetchmany(1)
    for r in result:
        max_id=r[0]
    max_id=str(max_id)
    if(id==max_id):
        return redirect(url_for('index',username=username))
    else:
        #将该对象设置为0，避免与其他主键冲突
        sql="update product set id=0 where id='"+id+"'"
        cursor.execute(sql)
        db.commit()
        # 将该对象下方的产品id-1，等于让另外一个上移
        sql="update product SET id =(id-1) where id=("+id+"+1)"
        cursor.execute(sql)
        db.commit()
        # 将该对象的id复原到原id+1
        sql="update product set id=("+id+"+1) where id=0"
        cursor.execute(sql)
        db.commit()
        database.session.close_all()
        return redirect(url_for('index',username=username))

#数据库把excel的表传到前端
@app.route('/detail%<string:id>', methods=['GET'])
def getExcel(id):
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql = "select * from Hardware where role_id = "+id
    aa=cursor.execute(sql)
    results = cursor.fetchmany(aa)
    hardwares = []
    desc = cursor.description
    for r in results:
        hardware = {}
        for i in range(0, len(desc)):
            name=desc[i][0]
            hardware[name] = r[i]
        hardwares.append(hardware)
    sql = "select * from Software where role_id = "+id
    aa = cursor.execute(sql)
    results = cursor.fetchmany(aa)
    softwares = []
    desc = cursor.description
    for r in results:
        software = {}
        for i in range(0, len(desc)):
            name = desc[i][0]
            software[name] = r[i]
        softwares.append(software)
    sql = "select * from ProductPrice where role_id = "+id
    aa = cursor.execute(sql)
    results = cursor.fetchmany(aa)
    ProductPrices = []
    desc = cursor.description
    for r in results:
        ProductPrice = {}
        for i in range(0, len(desc)):
            name = desc[i][0]
            ProductPrice[name] = r[i]
        ProductPrices.append(ProductPrice)
    jsonStr1 = json.dumps(hardwares,ensure_ascii=False)
    jsonStr2 = json.dumps(softwares,ensure_ascii=False)
    jsonStr3 = json.dumps(ProductPrices,ensure_ascii=False)

    return jsonStr1+";"+jsonStr2+";"+jsonStr3
#excel里的东西存到数据库里
def excelToDatabase():
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    query1 = """INSERT INTO hardware(id,classification,name,version,hard_name,model,quantity,batch_costs,price,recycle,recycle_price,first,second,third,role_id) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,1)"""  # 插入语句
    query2 = """INSERT INTO software(id,classification,name,version,softname,main_content,quantity,batch_costs,price,recycle,recycle_price,first,second,third,role_id) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,1)"""  # 插入语句
    query3 = """INSERT INTO productPrice(id,name,version,hard_costs,soft_costs,period,first_hard_costs,first_soft_costs,batch_costs,cost_percent, actual, agent,profit_share,fake_profit,actual_profit,profit_demand,price,actual_profit_ratial,fake_profit_ratial,role_id) VALUES(%s, %s, %s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,1)"""  # 插入语句
    excel = xlrd.open_workbook("static/details/成本核算/激光雷达教学实训台架-基础版.xlsx",encoding_override="utf-8")  # 文件名，把文件与py文件放在同一目录下
    sheet = excel.sheets()[0]
    for r in range(1, sheet.nrows):  # 第一行是我的标题名，对应表中的字段名所以应该从第二行开始，计算机以0开始计数，所以值是1
        id = sheet.cell(r, 0).value
        classification = sheet.cell(r, 1).value
        name =sheet.cell(r, 2).value
        version = sheet.cell(r, 3).value
        hard_name = sheet.cell(r, 4).value
        model = sheet.cell(r, 5).value
        quantity = sheet.cell(r, 6).value
        batch_costs =round( sheet.cell(r, 7).value,2)
        price = round( sheet.cell(r, 8).value,2)
        recycle = sheet.cell(r, 9).value
        recycle_price = round( sheet.cell(r, 10).value,2)
        first = sheet.cell(r, 11).value
        second = sheet.cell(r, 12).value
        third = sheet.cell(r, 13).value
        values1 = (id,classification,name,version,hard_name,model,quantity,batch_costs,price,recycle,recycle_price,first,second,third)
        cursor.execute(query1, values1)  # 执行sql语句

    sheet = excel.sheets()[1]
    for r in range(1, sheet.nrows):  # 第一行是我的标题名，对应表中的字段名所以应该从第二行开始，计算机以0开始计数，所以值是1
        id = sheet.cell(r, 0).value
        classification = sheet.cell(r, 1).value
        name = sheet.cell(r, 2).value
        version = sheet.cell(r, 3).value
        softname = sheet.cell(r, 4).value
        main_content = sheet.cell(r, 5).value
        quantity = sheet.cell(r, 6).value
        batch_costs = round( sheet.cell(r, 7).value,2)
        price = round( sheet.cell(r, 8).value,2)
        recycle = sheet.cell(r, 9).value
        recycle_price = round( sheet.cell(r, 10).value,2)
        first = sheet.cell(r, 11).value
        second = sheet.cell(r, 12).value
        third = sheet.cell(r, 13).value
        values2 = (
        id, classification, name, version, softname, main_content, quantity, batch_costs, price, recycle, recycle_price,
        first, second, third)

        cursor.execute(query2, values2)  # 执行sql语句

    sheet = excel.sheets()[2]
    for r in range(1, sheet.nrows):  # 第一行是我的标题名，对应表中的字段名所以应该从第二行开始，计算机以0开始计数，所以值是1
        id = sheet.cell(r, 0).value
        name = sheet.cell(r, 1).value
        version = sheet.cell(r, 2).value
        hard_costs =round ( sheet.cell(r, 3).value,2)
        soft_costs =round( sheet.cell(r, 4).value,2)
        period = sheet.cell(r, 5).value
        first_hard_costs = round( sheet.cell(r, 6).value,2)
        first_soft_costs = round( sheet.cell(r, 7).value,2)
        batch_costs = round( sheet.cell(r, 8).value,2)
        cost_percent = round( sheet.cell(r, 10).value,4)
        actual = round( sheet.cell(r, 11).value,2)
        agent = round( sheet.cell(r, 12).value,4)
        profit_share = round( sheet.cell(r, 13).value,4)
        fake_profit= round( sheet.cell(r, 14).value,2)
        actual_profit= round( sheet.cell(r, 15).value,2)
        profit_demand=round( sheet.cell(r, 16).value,4)
        price=round( sheet.cell(r, 17).value,2)
        actual_profit_ratial=round( sheet.cell(r, 18).value,4)
        fake_profit_ratial=round( sheet.cell(r, 19).value,4)
        values3 = (
        id, name, version, hard_costs, soft_costs, period, first_hard_costs, first_soft_costs, batch_costs,
        cost_percent, actual, agent,profit_share,fake_profit,actual_profit,profit_demand,price,actual_profit_ratial,fake_profit_ratial)

        cursor.execute(query3, values3)  # 执行sql语句
    sql = "UPDATE productprice SET total_costs = (SELECT IFNULL((SELECT ROUND(SUM(price),2) from software where software.recycle LIKE '%否%' and software.role_id = productprice.role_id),0) + IFNULL((SELECT ROUND(SUM(price),2) from hardware where hardware.recycle LIKE '%否%' and hardware.role_id = productprice.role_id),0));"
    cursor.execute(sql)
    sql = "UPDATE product SET batch_costs = (SELECT IFNULL((SELECT ROUND(SUM(price),2) from software where software.recycle LIKE '%否%' and role_id = product.id),0) + IFNULL((SELECT ROUND(SUM(price),2) from hardware where hardware.recycle LIKE '%否%' and role_id = product.id),0));"
    cursor.execute(sql)
    db.commit()
    db.close()
    return
#technical存到数据库
def techicalToDb():

    first = Technical(type="三维结构", name="激光雷达教学实训台架", date=datetime(2021,5,29),place="static/details/三维结构/激光雷达教学实训台架.max",extension=".max",role_id=1)
    second = Technical(type="产品手册", name="激光雷达教学实训台架实训工单-基础版", date=datetime(2021,5,29),place="static/details/产品手册/激光雷达教学实训台架实训工单-基础版.docx",extension=".docx",role_id=1)
    third = Technical(type="产品手册", name="激光雷达教学实训台架使用手册-基础版", date= datetime(2021,5,29),place="static/details/产品手册/激光雷达教学实训台架使用手册-基础版.docx",extension=".docx",role_id=1)

    database.session.add_all([first, second, third])
    database.session.commit()

def product_informationToDb():

    Product_Information01 = Product_information(name="设备简介",parameters="基础版激光雷达教学实训平台主要由台架、16线激光雷达、线控底盘、AGX、显示屏等设备组成，以激光雷达原理教学、构造教学（动画）、安装调试、目标检测、故障检测、自动驾驶应用为教学实训内容，具有11种功能及20余项实训项目，能够使学生由浅入深、掌握激光雷达应用于自动驾驶的基本知识。",id=1,role_id=1)
    Product_Information02 = Product_information(name="设备功能",parameters="1、了解激光雷达的工作原理；<br/>2、了解激光雷达的内部构造；<br/>3、了解单线激光雷达和多线激光雷达的区别；<br/>4、了解激光雷达国内外的主要品牌；<br/>5、了解激光雷达在自动驾驶中的应用；<br/>6、能够进行激光雷达的拆装演示及操作；<br/>7、能够进行激光雷达的标定演示及操作；<br/>8、能够使用激光雷达进行目标检测与分类；<br/>9、能够设置激光雷达模块故障，并提供检测方法；<br/>10、能够使用激光雷达进行自动驾驶停障测试；<br/>11、能够使用激光雷达进行自动驾驶避障测试；",id=2,role_id=1)
    Product_Information03 = Product_information(name="实训项目",parameters="1、激光雷达设备的拆装，包括连接线束、选择安装位置、调整安装倾斜角等内容；<br/>2、激光雷达的角度标定；<br/>3、激光雷达参数调节，包括16线激光雷达线束数据的筛选、检测距离的设置、角度的调节等3项内容；<br/>4、激光雷达模块故障检测，包括通讯故障、电源故障、设备故障、IP 错误等4类故障形式；<br/>5、使用16线激光雷达进行目标检测和分类；<br/>6、使用线控底盘搭载激光雷达进行停避障测试",id=3,role_id=1)
    database.session.add_all([Product_Information01,Product_Information02,Product_Information03])
    database.session.commit()
    Line_lidar_01 = Line_lidar(name="传感器",id=1,role_id=1,parameters="TOF 法测距 16 通道<br/>测距：20cm 至 150 米（目标反射率 20%）<br/>精度：+/- 2cm（典型值）<br/>视角（垂直）：±15°（共 30°）<br/>角分辨率：（垂直）：2°<br/>视角（水平）：360°<br/>角分辨率（水平/方位角）：0.09°（5Hz）至0.36°（20Hz）<br/>转速：300/600/1200rpm（5/10/20Hz）")
    Line_lidar_02 = Line_lidar(name="激光",id=2,role_id=1,parameters="Class 1<br/>波长：905nm<br/>激光发射角：水平 3mrad，垂直1.2mrad")
    Line_lidar_03 = Line_lidar(name="输出",id=3,role_id=1,parameters="320k 点/秒<br/>百兆以太网<br/>UDP 包中包含<br/>距离信息<br/>旋转角度信息<br/>经校准的反射率信息<br/>同步的时间标签（分辨率1us）<br/>")
    Line_lidar_04 = Line_lidar(name="机械/电子操作",id=4,role_id=1,parameters="功耗：9w(典型值)<br/>工作电压：12VDC（带接口盒，稳定电压），9-32VDC<br/>重量：0.840kg（不包含数据线）<br/>尺寸：直径109mm*高82.7 mm<br/>防护安全级别：IP67<br/>工作温度范围：10°C～60°C")
    Line_lidar_05 = Line_lidar(name="其他",id=5,role_id=1,parameters="防护安全级别：IP67<br/>操作温度：-30℃～+60℃<br/>规格：H:82.7mm*φ:109mm<br/>重量：0.84kg（不包含数据线）<br/>采集数据：三维空间坐标、反射率")
    database.session.add_all([Line_lidar_01,Line_lidar_02,Line_lidar_03,Line_lidar_04,Line_lidar_05])
    database.session.commit()
    Chassis_wire_01 = Chassis_wire(name="整车信息",id=1,role_id=1,parameters="主要材质 \t  Q235，防腐蚀喷漆<br/>设计尺寸 \t  519*431*320mm<br/>底盘结构  \t 承载式车身<br/>整车质量 \t  40kg<br/>轮距 \t            431mm<br/>轴距  \t          260mm<br/>底盘离地间隙  \t  62.5mm<br/>使用温度  \t     -20℃~40℃<br/>防护等级    \t   IP56")
    Chassis_wire_02 = Chassis_wire(name="底盘性能",id=2,role_id=1,parameters="负载能力\t	25kg<br/>运行速度\t	0-1.5m/s<br/>最大跨越\t	80mm<br/>最大越障\t	50mm<br/>最大爬坡角度\t	30°<br/>转弯半径\t	0")
    Chassis_wire_03 = Chassis_wire(name="驱动系统",id=3,role_id=1,parameters="驱动方式\t	差动<br/>制动方式\t	电机反向制动<br/>电机类型\t	直流无刷电机<br/>单个电机功率\t	200W<br/>电机工作电压\t	48V<br/>电机数量\t	2<br/>预留控制接口类型\t	can /232")
    Chassis_wire_04 = Chassis_wire(name="电源及管理",id=4,role_id=1,parameters="电池容量\t	20AH<br/>电池类型\t	三元锂电池<br/>电池额定电压\t	48V<br/>电池通讯接口\t	485<br/>")
    database.session.add_all([Chassis_wire_01,Chassis_wire_02,Chassis_wire_03,Chassis_wire_04])
    database.session.commit()
    Table1=Table(name="基础参数",role_id=1)
    Table2=Table(name="16线激光雷达",role_id=1)
    Table3=Table(name="线控底盘",role_id=1)
    Table4=Table(name="处理器",role_id=1)
    Table5=Table(name="显示屏",role_id=1)
    database.session.add_all([Table1,Table2,Table3,Table4,Table5])
    database.session.commit()


    Processor_01=Processor(name="GPU",id=1,role_id=1,parameters="512核Volta GPU(具有64个Tensor核心)<br/>11TFLOPS（FP16）<br/>22TOPS(INT8)")
    Processor_02=Processor(name="DL加速器",id=2,role_id=1,parameters="(2x)NVDLA引擎<br/>5TFLOPS（FP16）<br/>10TOPS(INT8)")
    Processor_03=Processor(name="CPU",id=3,role_id=1,parameters="8核ARM v8.2 64位CPU、8MB L2+4MB L3")
    Processor_04=Processor(name="内存",id=4,role_id=1,parameters="16GB 256位LPDDR4x<br/>2133MHz-137GB/s")
    Processor_05=Processor(name="显示接口",id=5,role_id=1,parameters="三个模式DP 1.2/eDP 1.4/HDMI 2.0")
    Processor_06=Processor(name="存储空间",id=6,role_id=1,parameters="32GB eMMC 5.1")
    Processor_07=Processor(name="视觉加速器",id=7,role_id=1,parameters="7通道 VLIW视觉处理器")
    Processor_08=Processor(name="视频编码",id=8,role_id=1,parameters="8*4k 30(HEVC)")
    Processor_09=Processor(name="视频解码",id=9,role_id=1,parameters="12*4k 30(HEVC)")
    Processor_010=Processor(name="摄像头",id=10,role_id=1,parameters="16通道MIPI CSI-2，8通道SLVS-EC<br/>D-PHY（40Gbps）<br/>C-PHY（109Gbps）")
    Processor_011=Processor(name="UPHY",id=11,role_id=1,parameters="3*USB3.1，4*USB2.0<br/>1*8或1*4或1*2或2*1PCle(Gen4)")
    Processor_012=Processor(name="其他",id=12,role_id=1,parameters="UART、SPI、CAN、I2C、I2S、DMIC、GPIO")
    Processor_013=Processor(name="连接",id=13,role_id=1,parameters="10/100/1000 RGMII")
    Processor_014=Processor(name="尺寸",id=14,role_id=1,parameters="100mm*87mm")
    database.session.add_all([Processor_01,Processor_02,Processor_03,Processor_04,Processor_05,Processor_06,Processor_07,Processor_08,Processor_09,Processor_010,Processor_011,Processor_012,Processor_013,Processor_014])
    database.session.commit()

    Display_screen_01 = Display_screen(name="显示屏",role_id=1,id=1,parameters="具备不少于DVI、HDMI和USB等的多种接口类型<br/>刷新率60HZ<br/>支持电压12V-24V")
    database.session.add(Display_screen_01)
    database.session.commit()
    Image_01 = Image(image_path="static/details/产品图片/", image_name="ADAS教学实训台架-完整版.jpg", role_id=1,
                     name="ADAS教学实训台架-完整版")
    Image_02 = Image(image_path="static/details/软件界面/", image_name="视觉传感器教学实训台架界面设计-基础版.JPG", role_id=1,
                     name="视觉传感器教学实训台架界面设计-基础版")
    Image_03 = Image(image_path="static/details/逻辑框架/", image_name="自适应巡航逻辑框图.png", role_id=1, name="自适应巡航逻辑框图")
    Image_04 = Image(image_path="static/details/逻辑框架/", image_name="泊车辅助逻辑框图.png", role_id=1, name="泊车辅助逻辑框图")
    Image_05 = Image(image_path="static/details/逻辑框架/", image_name="车道线识别保持逻辑框图.png", role_id=1, name="车道线识别保持逻辑框图")
    Image_06 = Image(image_path="static/details/逻辑框架/", image_name="疲劳驾驶检测逻辑框图.png", role_id=1, name="疲劳驾驶检测逻辑框图")
    Image_07 = Image(image_path="static/details/逻辑框架/", image_name="自适应前照明逻辑框图.png", role_id=1, name="自适应前照明逻辑框图")
    Image_08 = Image(image_path="static/details/产品视频/", image_name="远程运行终点选择.mov", role_id=1, name="远程运行终点选择")

    database.session.add_all([Image_01,Image_02,Image_03,Image_04,Image_05,Image_06,Image_07,Image_08])
    database.session.commit()
    #关闭连接
    database.session.close_all()
    DB = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = DB.cursor()
    sql = "CREATE TRIGGER productprice_tri_1 AFTER UPDATE on hardware for EACH ROW  UPDATE productprice SET total_costs = (SELECT IFNULL((SELECT ROUND(SUM(price),2) from software where software.recycle LIKE '%否%' and software.role_id = productprice.role_id),0) + IFNULL((SELECT ROUND(SUM(price),2) from hardware where hardware.recycle LIKE '%否%' and hardware.role_id = productprice.role_id),0));"
    cursor.execute(sql)
    sql ="CREATE TRIGGER productprice_tri_2 AFTER UPDATE on hardware for EACH ROW UPDATE product SET batch_costs = (SELECT IFNULL((SELECT ROUND(SUM(price),2) from software where software.recycle LIKE '%否%' and role_id = product.id),0) + IFNULL((SELECT ROUND(SUM(price),2) from hardware where hardware.recycle LIKE '%否%' and role_id = product.id),0));"
    cursor.execute(sql)
    sql = "CREATE TRIGGER product_tri_1 AFTER UPDATE on software for EACH ROW UPDATE productprice SET total_costs = (SELECT IFNULL((SELECT ROUND(SUM(price),2) from software where software.recycle LIKE '%否%' and software.role_id = productprice.role_id),0) + IFNULL((SELECT ROUND(SUM(price),2) from hardware where hardware.recycle LIKE '%否%' and hardware.role_id = productprice.role_id),0));"
    cursor.execute(sql)
    sql = "CREATE TRIGGER product_tri_2 AFTER UPDATE on software for EACH ROW UPDATE product SET batch_costs = (SELECT IFNULL((SELECT ROUND(SUM(price),2) from software where software.recycle LIKE '%否%' and role_id = product.id),0) + IFNULL((SELECT ROUND(SUM(price),2) from hardware where hardware.recycle LIKE '%否%' and role_id = product.id),0));"
    cursor.execute(sql)
    DB.commit()
    cursor.close()
    DB.close()

#删除文档功能逻辑实现
@app.route('/deletetechnical/<string:type>/<string:name>/<string:id>')
def deletetechnical(id,type,name):
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    print(id)
    sql1= "delete from technical where type='"+type+"' and name='"+name+"'"

    cursor.execute(sql1)
    db.commit()
    print("删除成功")
    db.close()

    return redirect('/Update%'+id)
#数据库把technical传到前端
@app.route('/technical%<string:id>', methods=['GET'])
def getTechnical(id):
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql = "select * from Technical where role_id = "+id
    aa=cursor.execute(sql)
    results = cursor.fetchmany(aa)
    technicals = []
    desc = cursor.description
    for r in results:
        technical = {}
        for i in range(0, len(desc)):
            name=desc[i][0]
            technical[name] = str(r[i])


        technicals.append(technical)

    jsonStr = json.dumps(technicals,ensure_ascii=False)
    db.close()

    return jsonStr


#下载文件
@app.route('/download/<string:filename>', methods=['GET'])
def download(filename):
    if request.method == "GET":
        DB = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
        cursor = DB.cursor()
        sql = "select place from technical where place LIKE '%"+filename+"%';"
        aa = cursor.execute(sql)
        result = cursor.fetchmany(aa)
        for r in result:
            download_place = r[0]
        places = download_place.split('/')
        download_place = places[0]+"/"+places[1]+"/"+places[2]+"/"
        print(download_place)
        if os.path.isfile(os.path.join(download_place, filename)):
            return send_from_directory(download_place, filename, as_attachment=True)
        pass

#修改产品售价
@app.route('/priceform%<string:role_id>',methods=['post'])
def priceform(role_id):
    #更新对象，保证更新时不出错
    id=request.form.get('id')
    name=request.form.get('name')
    version=request.form.get('version')
    hard_costs=request.form.get('hard_costs')
    soft_costs=request.form.get('soft_costs')
    period=request.form.get('period')
    first_hard_costs=request.form.get('first_hard_costs')
    first_soft_costs=request.form.get('first_soft_costs')
    batch_costs=request.form.get('batch_costs')
    cost_percent=str(float(request.form.get('cost_percent').strip("%"))/100.0);
    actual=request.form.get('actual')
    agent=str(float(request.form.get('agent').strip("%"))/100.0);
    profit_share=str(float(request.form.get('profit_share').strip("%"))/100.0);
    fake_profit=request.form.get('fake_profit')
    actual_profit=request.form.get('actual_profit')
    profit_demand=str(float(request.form.get('profit_demand').strip("%"))/100.0);
    price=request.form.get('price')
    actual_profit_ratial=str(float(request.form.get('actual_profit_ratial').strip("%"))/100.0);
    fake_profit_ratial=str(float(request.form.get('fake_profit_ratial').strip("%"))/100.0);
    if not (re.match("^(0|[1-9][0-9]*)$",period,re.I) and re.match("^(-?\d+)(\.\d+)?$",actual_profit,re.I) and re.match("^(-?\d+)(\.\d+)?$",fake_profit,re.I) and re.match("^(-?\d+)(\.\d+)?$",actual,re.I) and re.match("^(-?\d+)(\.\d+)?$",batch_costs,re.I) and re.match("^(-?\d+)(\.\d+)?$",first_soft_costs,re.I) and re.match("^(-?\d+)(\.\d+)?$",first_hard_costs,re.I) and re.match("^(-?\d+)(\.\d+)?$",price,re.I) and re.match("^(-?\d+)(\.\d+)?$",hard_costs,re.I) and re.match("^(-?\d+)(\.\d+)?$",soft_costs,re.I)):
        return redirect("/Update%" + role_id)
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql1="update productPrice set id='"+id+"', name='"+name+"', version='"+version+"', hard_costs="+hard_costs+", soft_costs="+soft_costs+", period="+period+", first_hard_costs="+first_hard_costs+", first_soft_costs="+first_soft_costs+", batch_costs="+batch_costs+", cost_percent="+cost_percent+", fake_profit="+fake_profit+", profit_demand="+profit_demand+", profit_share="+profit_share+", actual="+actual+", fake_profit_ratial="+fake_profit_ratial+", actual_profit_ratial="+actual_profit_ratial+", price="+price+", agent="+agent+", actual_profit="+actual_profit+" where role_id='"+role_id+"'"
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Update%"+role_id)
#删除软件售价功能逻辑实现
@app.route('/deletesoft%<string:role_id>&<string:iiid>')
def deletesoft(role_id,iiid):
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql = "select iiid from software where role_id='" + role_id + "'"
    aa = cursor.execute(sql)
    iiid = str(cursor.fetchmany(aa)[int(iiid) - 1][0])
    sql1= "delete from software where role_id='"+role_id+"' and iiid='"+iiid+"'"
    sql2 = "update software set iiid = iiid-1 where iiid > " + iiid + ""
    sql3 = "ALTER TABLE `software` AUTO_INCREMENT = " + iiid + ""

    cursor.execute(sql2)
    cursor.execute(sql1)
    cursor.execute(sql3)

    db.commit()
    db.close()
    return redirect('/Update%'+role_id)
#删除硬件售价功能逻辑实现
@app.route('/deletehard%<string:role_id>&<string:iiid>')
def deletehard(role_id,iiid):
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql = "select iiid from hardware where role_id='" + role_id + "'"
    aa = cursor.execute(sql)
    iiid = str(cursor.fetchmany(aa)[int(iiid) - 1][0])
    sql1= "delete from hardware where role_id='"+role_id+"' and iiid='"+iiid+"'"
    sql2 = "update hardware set iiid = iiid-1 where iiid > " + iiid + ""
    sql3 = "ALTER TABLE `hardware` AUTO_INCREMENT = " + iiid + ""
    cursor.execute(sql1)
    cursor.execute(sql2)
    cursor.execute(sql3)

    db.commit()
    db.close()
    return redirect('/Update%'+role_id)

#修改软件售价
@app.route('/upsoft%<string:role_id>&<string:iiid>',methods=['post'])
def upsoft(role_id,iiid):
    #更新对象，保证更新时不出错
    softname=request.form.get('softname'+iiid)
    main_content=request.form.get('main_content'+iiid)
    quantity=str(request.form.get('quantity'+iiid))
    price=str(request.form.get('price'+iiid))
    recycle=request.form.get('recycle'+iiid)
    recycle_price=str(request.form.get('recycle_price'+iiid))
    first=request.form.get('first'+iiid)
    batch_costs=str(request.form.get('batch_costs'+iiid))
    second=request.form.get('second'+iiid)
    third=request.form.get('third'+iiid)
    if not (re.match("^(0|[1-9][0-9]*)$",quantity,re.I) and re.match("^(-?\d+)(\.\d+)?$",price,re.I) and re.match("^(-?\d+)(\.\d+)?$",recycle_price,re.I) and re.match("^(-?\d+)(\.\d+)?$",batch_costs,re.I)):
        return redirect("/Update%" + role_id)
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql = "select iiid from software where role_id='" + role_id + "'"
    aa = cursor.execute(sql)
    iiid = str(cursor.fetchmany(aa)[int(iiid) - 1][0])
    sql1="update software set softname='"+softname+"', main_content='"+main_content+"', quantity="+quantity+", recycle='"+recycle+"', recycle_price="+recycle_price+", first='"+first+"', third='"+third+"', batch_costs="+batch_costs+", second='"+second+"', price="+price+" where role_id='"+role_id+"' and iiid="+iiid
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Update%"+role_id)
#修改硬件售价
@app.route('/uphard%<string:role_id>&<string:iiid>',methods=['post'])
def uphard(role_id,iiid):
    #更新对象，保证更新时不出错
    hard_name=request.form.get('hard_name'+iiid)
    model=request.form.get('model'+iiid)
    quantity=str(request.form.get('quantity'+iiid))
    price=str(request.form.get('price'+iiid))
    recycle=request.form.get('recycle'+iiid)
    recycle_price=str(request.form.get('recycle_price'+iiid))
    first=request.form.get('first'+iiid)
    batch_costs=str(request.form.get('batch_costs'+iiid))
    second=request.form.get('second'+iiid)
    third=request.form.get('third'+iiid)
    if not (re.match("^(0|[1-9][0-9]*)$",quantity,re.I) and re.match("^(-?\d+)(\.\d+)?$",price,re.I) and re.match("^(-?\d+)(\.\d+)?$",recycle_price,re.I) and re.match("^(-?\d+)(\.\d+)?$",batch_costs,re.I)):
        return redirect("/Update%" + role_id)
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql = "select iiid from hardware where role_id='" + role_id + "'"
    aa = cursor.execute(sql)
    iiid = str(cursor.fetchmany(aa)[int(iiid) - 1][0])
    sql1="update hardware set hard_name='"+hard_name+"', model='"+model+"', quantity="+quantity+", recycle='"+recycle+"', recycle_price="+recycle_price+", first='"+first+"', third='"+third+"', batch_costs="+batch_costs+", second='"+second+"', price="+price+" where role_id='"+role_id+"' and iiid="+iiid
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Update%"+role_id)
#删除配置参数行功能逻辑实现
@app.route('/deleteallo%<string:name>&<string:role_id>&<string:id>')
def deleteallo(name,role_id,id):
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql = "select id from tb where role_id='" + role_id + "'"
    aa = cursor.execute(sql)
    results = cursor.fetchmany(aa)[int(name) - 1][0]
    sql1= "delete from tb"+str(results)+" where role_id='"+role_id+"' and id='"+id+"'"
    sql2 = "update tb"+str(results)+" set id = id-1 where id > " + id + ""
    sql3 = "ALTER TABLE `tb"+str(results)+"` AUTO_INCREMENT = " + id + ""
    cursor.execute(sql1)
    cursor.execute(sql2)
    cursor.execute(sql3)

    db.commit()
    db.close()
    return redirect('/Update%'+role_id)
#修改配置参数表
@app.route('/upallo%<string:tablename>&<string:role_id>&<string:id>',methods=['post'])
def upallo(tablename,role_id,id):
    #更新对象，保证更新时不出错
    name=request.form.get('name'+id)
    parameters=request.form.get('parameters'+id)
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql = "select id from tb where role_id='" + role_id + "'"
    aa = cursor.execute(sql)
    results = cursor.fetchmany(aa)[int(tablename) - 1][0]
    print(results)
    sql1="update tb"+str(results)+" set name='"+name+"', parameters='"+parameters+"' where role_id='"+role_id+"' and id="+id
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Update%"+role_id)
#添加配置参数表行
@app.route('/addallo%<string:tablename>&<string:role_id>&<string:id>',methods=['post'])
def addallo(tablename,role_id,id):

    name=request.form.get('name')
    parameters=request.form.get('parameters')
    print(tablename)
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql="select id from tb where role_id='"+role_id+"'"
    aa=cursor.execute(sql)
    results = cursor.fetchmany(aa)[int(tablename)-1][0]


    sql1="insert into tb"+str(results)+"(name,parameters,role_id,id) value('"+name+"','"+parameters+"','"+role_id+"','"+id+"')"
    print(sql1)
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Update%"+role_id)
#添加硬件表行
@app.route('/addhard%<string:role_id>',methods=['post'])
def addhard(role_id):
    id = request.form.get('id')
    name = request.form.get('name')
    classification = request.form.get('classification')
    version = request.form.get('version')

    hard_name = request.form.get('hard_name')
    model = request.form.get('model')
    quantity = request.form.get('quantity')

    price = str(request.form.get('price'))

    recycle = request.form.get('recycle')
    recycle_price = str(request.form.get('recycle_price'))

    first = request.form.get('first')
    batch_costs = str(request.form.get('batch_costs'))

    second = request.form.get('second')
    third = request.form.get('third')
    if not (re.match("^(0|[1-9][0-9]*)$",quantity,re.I) and re.match("^(-?\d+)(\.\d+)?$",price,re.I) and re.match("^(-?\d+)(\.\d+)?$",recycle_price,re.I) and re.match("^(-?\d+)(\.\d+)?$",batch_costs,re.I)):
        return redirect("/Update%" + role_id)
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql1="INSERT INTO hardware(id,classification,name,version,hard_name,model,quantity,batch_costs,price,recycle,recycle_price,first,second,third,role_id) VALUE('"+id+"','"+classification+"','"+name+"','"+version+"','"+hard_name+"','"+model+"','"+quantity+"','"+batch_costs+"','"+price+"','"+recycle+"','"+recycle_price+"','"+first+"','"+second+"','"+third+"','"+role_id+"')"
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Update%"+role_id)
#添加软件表行
@app.route('/addsoft%<string:role_id>',methods=['post'])
def addsoft(role_id):
    id = request.form.get('id')
    name = request.form.get('name')
    classification = request.form.get('classification')
    version = request.form.get('version')
    softname = request.form.get('softname')
    main_content = request.form.get('main_content')
    quantity = str(request.form.get('quantity'))

    price = str(request.form.get('price'))

    recycle = request.form.get('recycle')
    recycle_price = str(request.form.get('recycle_price'))

    first = request.form.get('first')
    batch_costs = str(request.form.get('batch_costs'))

    second = request.form.get('second')
    third = request.form.get('third')
    if not (re.match("^(0|[1-9][0-9]*)$", quantity, re.I) and re.match("^(-?\d+)(\.\d+)?$", price, re.I) and re.match(
            "^(-?\d+)(\.\d+)?$", recycle_price, re.I) and re.match("^(-?\d+)(\.\d+)?$", batch_costs, re.I)):
        return redirect("/Update%" + role_id)
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()

    sql1="INSERT INTO software(id,classification,name,version,softname,main_content,quantity,batch_costs,price,recycle,recycle_price,first,second,third,role_id) VALUE('"+id+"','"+classification+"','"+name+"','"+version+"','"+softname+"','"+main_content+"','"+quantity+"','"+batch_costs+"','"+price+"','"+recycle+"','"+recycle_price+"','"+first+"','"+second+"','"+third+"','"+role_id+"')"
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Update%"+role_id)


# 添加配置参数表
@app.route('/addform%<string:role_id>', methods=['post'])
def addform(role_id):
    name = request.form.get('addnewtable')
    if name == '':
        return redirect("/Update%" + role_id)
    else:

        db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
        cursor = db.cursor()
        sql1 = "INSERT INTO tb(name,role_id) VALUE('" + name + "','" + role_id + "')"
        cursor.execute(sql1)
        sql = "select max(id) from tb"
        aa = cursor.execute(sql)
        results = cursor.fetchmany(aa)[0][0]
        sql3="CREATE TABLE tb"+str(results)+" (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(255) DEFAULT NULL,`parameters` varchar(3000) DEFAULT NULL,`role_id` int(11) DEFAULT NULL,PRIMARY KEY (`id`),KEY `role_id`(`role_id`),CONSTRAINT `tb"+str(results)+"_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;"
        cursor.execute(sql3)
        print(sql3)


        db.commit()
        db.close()
        return redirect("/Update%" + role_id)

#修改表名称
@app.route('/changeformname%<string:role_id>&<string:tbid>',methods=['post'])
def changeformname(tbid,role_id):
    #更新对象，保证更新时不出错
    name=request.form.get('tablename')
    print(name)
    if name == '':
        return redirect("/Update%" + role_id)
    else:
        db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
        cursor = db.cursor()
        sql = "select id from tb where role_id='" + role_id + "'"
        aa = cursor.execute(sql)
        results = cursor.fetchmany(aa)[int(tbid) - 1][0]
        sql1="update tb set name='"+name+"' where role_id='"+role_id+"' and id="+str(results)
        cursor.execute(sql1)
        print(sql1)
        db.commit()
        db.close()
        return redirect("/Update%"+role_id)

# 删除配置参数表
@app.route('/deleteAllocationTable%<string:role_id>&<string:tbid>')
def deleteAllocationTable(tbid, role_id):
    # 更新对象，保证更新时不出错

    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql = "select id from tb where role_id='" + role_id + "'"
    aa = cursor.execute(sql)
    tbid = str(cursor.fetchmany(aa)[int(tbid) - 1][0])
    sqlmax = "select max(id) from tb"
    bb = cursor.execute(sqlmax)
    max = cursor.fetchmany(bb)[0][0]
    sql1= "delete from tb where role_id='"+role_id+"' and id='"+tbid+"'"
    sql2 = "update tb set id = id-1 where id > " + tbid + ""
    sql3 = "ALTER TABLE `tb` AUTO_INCREMENT = " + tbid + ""
    sql4 = "drop TABLE tb" + tbid

    cursor.execute(sql1)
    cursor.execute(sql2)
    cursor.execute(sql3)
    cursor.execute(sql4)

    for i in range(int(tbid)+1,max+1):
        sql=" ALTER TABLE tb"+str(i)+" RENAME TO tb"+str(i-1)
        print(sql)
        cursor.execute(sql)

    db.commit()
    db.close()
    return redirect('/Update%'+role_id)

#添加新产品页面
@app.route('/Updatenew%<string:role_id>',methods=['post','get'])
def Updatenewto(role_id):
    DB = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = DB.cursor()
    detail_path =basedir+"\static\details"
    if request.method == 'POST':
        request_str = str(request.files)

        if 'photo' in request_str and 'photo_2' in request_str and 'video' in request_str:
            photo_01 = request.files['photo']
            photo_02 = request.files['photo_2']
            video_01 = request.files['video']
            if photo_01 and allowed_image(photo_01.filename):
                path = "\产品图片\\"
                fname = secure_filename(photo_01.filename)
                fname = fname.split(".")
                file_name = fname[0]
                fname = fname[len(fname) - 1]
                full_path = detail_path + path  # 文件的实际存储路径
                full_path = full_path.replace("\\", "/")
                split_path = full_path.split("/")
                db_path = ""
                for index in range(len(split_path)):
                    if index < len(split_path)-1 and index > len(split_path) - 5:
                        db_path += split_path[index] + "/"
                image_path = db_path # 数据库内存储的相对路径
                print(type(fname))
                print(type(role_id))
                print(type(file_name))
                image_name = file_name + "_" + role_id + "." + fname
                Image_jiemian = Image(image_name=image_name, image_path=image_path, role_id=role_id)
                database.session.add(Image_jiemian)
                database.session.commit()
                photo_01.save(os.path.join(full_path, image_name))

            if photo_02 and allowed_image(photo_02.filename):
                path = "\软件界面\\"
                fname = secure_filename(photo_02.filename)
                fname = fname.split(".")
                file_name = fname[0]
                fname = fname[len(fname) - 1]
                full_path = detail_path + path  # 文件的实际存储路径
                full_path = full_path.replace("\\", "/")
                split_path = full_path.split("/")
                db_path = ""
                for index in range(len(split_path)):
                    if index < len(split_path)-1 and index > len(split_path) - 5:
                        db_path += split_path[index] + "/"
                image_path = db_path # 数据库内存储的相对路径
                image_name = file_name + "_" + role_id + "." + fname
                Image_jiemian = Image(image_name=image_name, image_path=image_path, role_id=role_id)
                database.session.add(Image_jiemian)
                database.session.commit()
                photo_02.save(os.path.join(full_path, image_name))

            if video_01 and allowed_video(video_01.filename):
                path = "\产品视频\\"
                fname = secure_filename(video_01.filename)
                fname = fname.split(".")
                file_name = fname[0]
                fname = fname[len(fname) - 1]
                full_path = detail_path + path  # 文件的实际存储路径
                full_path = full_path.replace("\\", "/")
                split_path = full_path.split("/")
                db_path = ""
                for index in range(len(split_path)):
                    if index < len(split_path)-1 and index > len(split_path) - 5:
                        db_path += split_path[index] + "/"
                image_path = db_path # 数据库内存储的相对路径
                image_name = file_name + "_" + role_id + "." + fname
                Image_jiemian = Image(image_name=image_name, image_path=image_path, role_id=role_id)
                database.session.add(Image_jiemian)
                database.session.commit()
                video_01.save(os.path.join(full_path, image_name))

        if "'image_1'" in request_str:
            print("第二张表")
            image_01 = request.files['image_1']
            visio = request.files['visio']
            if image_01 and allowed_image(image_01.filename):
                path = "\逻辑框架\\"
                fname = secure_filename(image_01.filename)
                fname = fname.split(".")
                file_name = fname[0]
                fname = fname[len(fname) - 1]
                full_path = detail_path + path  # 文件的实际存储路径
                full_path = full_path.replace("\\", "/")#将实际的\路径转为相对路径/
                split_path = full_path.split("/")
                db_path = ""
                for index in range(len(split_path)):
                    if index < len(split_path)-1 and index > len(split_path) - 5:
                        db_path += split_path[index] + "/"
                image_path = db_path # 数据库内存储的相对路径
                image_name = file_name + "_" + role_id + "." + fname
                Image_jiemian = Image(image_name=image_name, image_path=image_path, role_id=role_id)
                database.session.add(Image_jiemian)
                database.session.commit()
                image_01.save(os.path.join(full_path, image_name))
            if visio and allowed_visio(visio.filename):
                path = "\产品手册\\"
                fname = secure_filename(visio.filename)
                fname = fname.split(".")
                file_name = fname[0]
                fname = fname[len(fname) - 1]

                full_path = detail_path + path  # 文件的实际存储路径
                full_path = full_path.replace("\\", "/")#将实际的\路径转为相对路径/
                split_path = full_path.split("/")
                db_path = ""
                for index in range(len(split_path)):
                    if index < len(split_path)-1 and index > len(split_path) - 5:
                        db_path += split_path[index] + "/"
                image_path = db_path # 数据库内存储的相对路径
                image_name = file_name + "_" + role_id + "." + fname
                Image_jiemian = Technical(type="逻辑框架",extension=fname,role_id=role_id,name=file_name,place=full_path,date=datetime(year,month,day))#添加到数据库操作
                database.session.add(Image_jiemian)
                database.session.commit()
                visio.save(os.path.join(full_path, image_name))

        if  "'file'" in request_str:
            print("上传文件")
            file = request.files['file']
            if file:
                if request.form.get('whichone')=="三维结构" and allowed_max(file.filename):
                    path ="\三维结构\\"
                    fname = secure_filename(file.filename)
                    fname = fname.split('.')
                    file_name = request.form.get('filename')
                    fname = fname[len(fname) - 1]#最后一个“.”后的扩展名
                    full_path = detail_path + path  # 文件的实际存储路径
                    full_path = full_path.replace("\\", "/")#将实际的\路径转为相对路径/
                    split_path = full_path.split("/")
                    db_path = ""
                    for index in range(len(split_path)):
                        if index < len(split_path)-1 and index > len(split_path) - 5:
                            db_path += split_path[index] + "/"
                    file_path = db_path # 数据库内存储的相对路径
                    Technical_file=Technical(role_id=role_id,place=file_path+file_name,type = request.form.get('whichone'),name=file_name,date=datetime(year,month,day),extension="."+fname)#添加到数据库操作
                    database.session.add(Technical_file)
                    database.session.commit()
                    file_name = file_name + "_" + role_id + "." + fname
                    file.save(os.path.join(full_path, file_name))
                if request.form.get('whichone') == "产品手册" and allowed_file(file.filename):
                    path ="\产品手册\\"
                    fname = secure_filename(file.filename)
                    fname = fname.split('.')
                    file_name = request.form.get('filename')
                    fname = fname[len(fname) - 1]#最后一个“.”后的扩展名
                    full_path = detail_path + path  # 文件的实际存储路径
                    full_path = full_path.replace("\\", "/")#将实际的\路径转为相对路径/
                    split_path = full_path.split("/")
                    db_path = ""
                    for index in range(len(split_path)):
                        if index < len(split_path)-1 and index > len(split_path) - 5:
                            db_path += split_path[index] + "/"
                    file_path = db_path # 数据库内存储的相对路径
                    Technical_file=Technical(role_id=role_id,place=file_path+file_name,type = request.form.get('whichone'),name=file_name,date=datetime(year,month,day),extension="."+fname)#添加到数据库操作
                    database.session.add(Technical_file)
                    database.session.commit()
                    file_name = file_name + "_" + role_id + "." + fname
                    file.save(os.path.join(full_path, file_name))

    cursor.close()
    DB.close()

    return render_template('Addnew.html')
#添加新产品
@app.route('/Updatenew')
def Updatenew():
    db = pymysql.connect("localhost", "root", "cuidonghao", "bishe", charset='utf8')
    cursor = db.cursor()
    sqlmax = "select max(id) from product"
    aa=cursor.execute(sqlmax)
    max = cursor.fetchmany(aa)[0][0]

    return redirect('/Updatenew%'+str(max+1))
#添加新产品的产品
@app.route('/addnewproduct%<string:role_id>',methods=['post'])
def addnewproduct(role_id):
    # if price
    productname = request.form.get('productname')
    classification = request.form.get('classification')
    version = request.form.get('version')
    research_costs = str(request.form.get('research_costs'))
    price = str(request.form.get('price'))
    chargeperson = request.form.get('chargeperson')
    update_time=str(tttoday.date.today())
    if not (re.match("^(-?\d+)(\.\d+)?$",price,re.I) and re.match("^(-?\d+)(\.\d+)?$",research_costs,re.I)):
        return redirect("/Updatenew%" + role_id)

    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql1="INSERT INTO product(id,name,classification,version,research_costs,price,charge_person,update_time) VALUE('"+role_id+"','"+productname+"','"+classification+"','"+version+"','"+research_costs+"','"+price+"','"+chargeperson+"','"+update_time+"')"
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Updatenew%"+role_id)
#添加新产品的表
@app.route('/newaddtable%<string:role_id>',methods=['post'])
def newaddtable(role_id):
    name = request.form.get('addnewtable')
    if name == '':
        return redirect("/Updatenew%" + role_id)
    else:

        db = pymysql.connect("localhost", "root", "cuidonghao", "bishe", charset='utf8')
        cursor = db.cursor()
        sql1 = "INSERT INTO tb(name,role_id) VALUE('" + name + "','" + role_id + "')"
        cursor.execute(sql1)
        sql = "select max(id) from tb"
        aa = cursor.execute(sql)
        results = cursor.fetchmany(aa)[0][0]
        sql3 = "CREATE TABLE tb" + str(results) + " (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(255) DEFAULT NULL,`parameters` varchar(3000) DEFAULT NULL,`role_id` int(11) DEFAULT NULL,PRIMARY KEY (`id`),KEY `role_id`(`role_id`),CONSTRAINT `tb" + str(results) + "_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;"
        cursor.execute(sql3)
        print(sql3)

        db.commit()
        db.close()
        return redirect("/Updatenew%" + role_id)

# 添加新产品硬件表行
@app.route('/addnewhard%<string:role_id>', methods=['post'])
def addnewhard(role_id):
    id = request.form.get('id')
    name = request.form.get('name')
    classification = request.form.get('classification')
    version = request.form.get('version')
    hard_name = request.form.get('hard_name')
    model = request.form.get('model')
    quantity = str(request.form.get('quantity'))
    price = str(request.form.get('price'))
    recycle = request.form.get('recycle')
    recycle_price = str(request.form.get('recycle_price'))
    first = request.form.get('first')
    batch_costs = str(request.form.get('batch_costs'))
    second = request.form.get('second')
    third = request.form.get('third')
    if not (re.match("^(0|[1-9][0-9]*)$",quantity,re.I) and re.match("^(-?\d+)(\.\d+)?$",price,re.I) and re.match("^(-?\d+)(\.\d+)?$",recycle_price,re.I) and re.match("^(-?\d+)(\.\d+)?$",batch_costs,re.I)):
        return redirect("/Updatenew%" + role_id)

    db = pymysql.connect("localhost", "root", "cuidonghao", "bishe", charset='utf8')
    cursor = db.cursor()
    sql1 = "INSERT INTO hardware(id,classification,name,version,hard_name,model,quantity,batch_costs,price,recycle,recycle_price,first,second,third,role_id) VALUE('" + id + "','" + classification + "','" + name + "','" + version + "','" + hard_name + "','" + model + "','" + quantity + "','" + batch_costs + "','" + price + "','" + recycle + "','" + recycle_price + "','" + first + "','" + second + "','" + third + "','" + role_id + "')"
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Updatenew%" + role_id)
#添加新产品软件表行
@app.route('/addnewsoft%<string:role_id>',methods=['post'])
def addnewsoft(role_id):
    id = request.form.get('id')
    name = request.form.get('name')
    classification = request.form.get('classification')
    version = request.form.get('version')
    softname = request.form.get('softname')
    main_content = request.form.get('main_content')
    quantity = str(request.form.get('quantity'))
    price = str(request.form.get('price'))
    recycle = request.form.get('recycle')
    recycle_price = str(request.form.get('recycle_price'))
    first = request.form.get('first')
    batch_costs = str(request.form.get('batch_costs'))
    second = request.form.get('second')
    third = request.form.get('third')
    if not (re.match("^(0|[1-9][0-9]*)$",quantity,re.I) and re.match("^(-?\d+)(\.\d+)?$",price,re.I) and re.match("^(-?\d+)(\.\d+)?$",recycle_price,re.I) and re.match("^(-?\d+)(\.\d+)?$",batch_costs,re.I)):
        return redirect("/Updatenew%" + role_id)
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql1="INSERT INTO software(id,classification,name,version,softname,main_content,quantity,batch_costs,price,recycle,recycle_price,first,second,third,role_id) VALUE('"+id+"','"+classification+"','"+name+"','"+version+"','"+softname+"','"+main_content+"','"+quantity+"','"+batch_costs+"','"+price+"','"+recycle+"','"+recycle_price+"','"+first+"','"+second+"','"+third+"','"+role_id+"')"
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Updatenew%"+role_id)
#添加新产品产品售价行
@app.route('/addnewpriceform%<string:role_id>',methods=['post'])
def addnewpriceform(role_id):
    id = request.form.get('id')
    name = request.form.get('name')
    version = request.form.get('version')
    hard_costs = request.form.get('hard_costs')
    soft_costs = request.form.get('soft_costs')
    period = request.form.get('period')
    first_hard_costs = request.form.get('first_hard_costs')
    first_soft_costs = request.form.get('first_soft_costs')
    batch_costs = request.form.get('batch_costs')
    cost_percent = str(float(request.form.get('cost_percent').strip("%")) / 100.0);
    actual = request.form.get('actual')
    agent = str(float(request.form.get('agent').strip("%")) / 100.0);
    profit_share = str(float(request.form.get('profit_share').strip("%")) / 100.0);
    fake_profit = request.form.get('fake_profit')
    actual_profit = request.form.get('actual_profit')
    profit_demand = str(float(request.form.get('profit_demand').strip("%")) / 100.0);
    price = request.form.get('price')
    actual_profit_ratial = str(float(request.form.get('actual_profit_ratial').strip("%")) / 100.0);
    fake_profit_ratial = str(float(request.form.get('fake_profit_ratial').strip("%")) / 100.0);

    if not (re.match("^(0|[1-9][0-9]*)$",period,re.I) and re.match("^(-?\d+)(\.\d+)?$",actual_profit,re.I) and re.match("^(-?\d+)(\.\d+)?$",fake_profit,re.I) and re.match("^(-?\d+)(\.\d+)?$",actual,re.I) and re.match("^(-?\d+)(\.\d+)?$",batch_costs,re.I) and re.match("^(-?\d+)(\.\d+)?$",first_soft_costs,re.I) and re.match("^(-?\d+)(\.\d+)?$",first_hard_costs,re.I) and re.match("^(-?\d+)(\.\d+)?$",price,re.I) and re.match("^(-?\d+)(\.\d+)?$",hard_costs,re.I) and re.match("^(-?\d+)(\.\d+)?$",soft_costs,re.I)):
        return redirect("/Updatenew%" + role_id)
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql="select count(*) from productPrice where role_id='"+role_id+"'"
    aa=cursor.execute(sql)
    results = cursor.fetchmany(aa)[0][0]
    if results!=0:
        return redirect("/Updatenew%" + role_id)

    sql1 = "INSERT INTO productPrice(id,name,version,hard_costs,soft_costs,period,first_hard_costs,first_soft_costs,batch_costs,cost_percent, actual, agent,profit_share,fake_profit,actual_profit,profit_demand,price,actual_profit_ratial,fake_profit_ratial,role_id) VALUE('"+id+"','"+name+"','"+version+"','"+hard_costs+"','"+soft_costs+"','"+period+"','"+first_hard_costs+"','"+first_soft_costs+"','"+batch_costs+"','"+cost_percent+"','"+actual+"','"+agent+"','"+profit_share+"','"+fake_profit+"','"+actual_profit+"','"+profit_demand+"','"+price+"','"+actual_profit_ratial+"','"+fake_profit_ratial+"','"+role_id+"')"
    cursor.execute(sql1)

    db.commit()
    db.close()
    return redirect("/Updatenew%"+role_id)
@app.route('/delete_image%<string:product_id>%<string:id>',methods=['get','post'])
def delete_image(product_id,id):
    DB = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = DB.cursor()
    sql = "DELETE FROM image where id = (SELECT id from (SELECT id,image_path,image_name,(@rowno:=@rowno+1) as rowno from image,(select (@rowno:=0)) b where role_id = "+product_id+" and image_path LIKE '%逻辑框架%' order by id ASC) as image_temp WHERE rowno ="+id+");"
    cursor.execute(sql)
    DB.commit()
    cursor.close()
    DB.close()
    return redirect("/Update%"+product_id)
@app.route('/delete_photo%<string:product_id>%<string:id>',methods=['get','post'])
def delete_photo(product_id,id):
    DB = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = DB.cursor()
    sql = "DELETE FROM image where id = (SELECT id from (SELECT id,image_path,image_name,(@rowno:=@rowno+1) as rowno from image,(select (@rowno:=0)) b where role_id = "+product_id+" and image_path LIKE '%软件界面%' order by id ASC) as image_temp WHERE rowno ="+id+");"
    cursor.execute(sql)
    DB.commit()
    cursor.close()
    DB.close()
    return redirect("/Update%"+product_id)
@app.route('/delete_picture%<string:product_id>%<string:id>',methods=['get','post'])
def delete_picture(product_id,id):
    DB = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = DB.cursor()
    sql = "DELETE FROM image where id = (SELECT id from (SELECT id,image_path,image_name,(@rowno:=@rowno+1) as rowno from image,(select (@rowno:=0)) b where role_id = "+product_id+" and image_path LIKE '%产品图片%' order by id ASC) as image_temp WHERE rowno ="+id+");"
    cursor.execute(sql)
    DB.commit()
    cursor.close()
    DB.close()
    return redirect("/Update%"+product_id)
@app.route('/delete_video%<string:product_id>%<string:id>',methods=['get','post'])
def delete_video(product_id,id):
    DB = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = DB.cursor()
    sql = "DELETE FROM image where id = (SELECT id from (SELECT id,image_path,image_name,(@rowno:=@rowno+1) as rowno from image,(select (@rowno:=0)) b where role_id = "+product_id+" and image_path LIKE '%产品视频%' order by id ASC) as image_temp WHERE rowno ="+id+");"
    print(sql)
    cursor.execute(sql)
    DB.commit()
    cursor.close()
    DB.close()
    return redirect("/Update%"+product_id)
@app.route('/test_post/image%<string:id>', methods=['GET'])
def getImage(id):
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql = "select * from image where role_id = "+id+" and image_path like '%逻辑框架%' order by id asc"
    aa=cursor.execute(sql)
    results = cursor.fetchmany(aa)
    technicals = []
    desc = cursor.description
    for r in results:
        technical = {}
        for i in range(0, len(desc)):
            name=desc[i][0]
            technical[name] = str(r[i])

        technicals.append(technical)

    jsonStr = json.dumps(technicals,ensure_ascii=False)
    db.close()

    return jsonStr

@app.route('/test_post/picture%<string:id>', methods=['GET'])
def getPicture(id):
    db = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = db.cursor()
    sql = "select * from image where role_id = "+id+" and image_path like '%产品视频%' order by id asc"
    aa=cursor.execute(sql)
    results = cursor.fetchmany(aa)
    technicals1 = []
    desc = cursor.description
    for r in results:
        technical = {}
        for i in range(0, len(desc)):
            name=desc[i][0]
            technical[name] = str(r[i])
        technicals1.append(technical)
    jsonStr3 = json.dumps(technicals1,ensure_ascii=False)

    sql = "select * from image where role_id = "+id+" and image_path like '%软件界面%' order by id asc"
    aa=cursor.execute(sql)
    results = cursor.fetchmany(aa)
    technicals2 = []
    desc = cursor.description
    for r in results:
        technical = {}
        for i in range(0, len(desc)):
            name=desc[i][0]
            technical[name] = str(r[i])
        technicals2.append(technical)
    jsonStr2 = json.dumps(technicals2,ensure_ascii=False)

    sql = "select * from image where role_id = "+id+" and image_path like '%产品图片%' order by id asc"
    aa=cursor.execute(sql)
    results = cursor.fetchmany(aa)
    technicals3 = []
    desc = cursor.description
    for r in results:
        technical = {}
        for i in range(0, len(desc)):
            name=desc[i][0]
            technical[name] = str(r[i])
        technicals3.append(technical)
    jsonStr1 = json.dumps(technicals3,ensure_ascii=False)

    sql = "select * from image where role_id = "+id+" and image_path like '%逻辑框架%' order by id asc"
    aa=cursor.execute(sql)
    results = cursor.fetchmany(aa)
    technicals = []
    desc = cursor.description
    for r in results:
        technical = {}
        for i in range(0, len(desc)):
            name=desc[i][0]
            technical[name] = str(r[i])
        technicals.append(technical)
    jsonStr = json.dumps(technicals,ensure_ascii=False)
    db.close()
    return jsonStr1 + ";" + jsonStr2 + ";" + jsonStr3 + ";" + jsonStr

@app.route('/update_image%<string:product_id>%<string:id>%<string:name>',methods=['get','post'])
def update_image(product_id,id,name):
    DB = pymysql.connect("localhost", "root","cuidonghao","bishe", charset='utf8')
    cursor = DB.cursor()
    sql = "UPDATE image SET name = '"+name+"' where id = (SELECT id from (SELECT id,image_path,image_name,(@rowno:=@rowno+1) as rowno from image,(select (@rowno:=0)) b where role_id = "+product_id+" and image_path LIKE '%逻辑框架%' order by id ASC) as image_temp WHERE rowno = "+id+");"
    print("sql:"+sql)
    cursor.execute(sql)
    DB.commit()
    DB.close()
    return redirect("/Update%"+product_id)
if __name__ == '__main__':
    # 创建数据库前先清空
    database.drop_all()
    database.create_all()
    addingToDb()
    techicalToDb()
    excelToDatabase()#把excel里的数据传到数据库
    product_informationToDb()
    # app.run(host, port, debug, options)
    # 默认值：host=127.0.0.1, port=5000, debug=false
    # 解析三个excel表

    app.run(debug=True,port=5000)



