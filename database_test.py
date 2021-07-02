import sys
import pymysql

db=pymysql.connect("localhost","root","cuidonghao","bishe",charset='utf8')
cursor = db.cursor()

#用户查询
def chaxun_by_userName_passWord(userName,passWord):
    sql="select * from user where user_name='"+userName+"' and pass_word = '"+passWord+"' "
    try:
        cursor.execute(sql)
        for row in cursor.fetchall():
            return row       
    except:
        print("查询失败")

#注册用户，插入信息        
def charu(userName,passWord):
    sql = "insert into user values('"+userName+"','"+passWord+"',null)"
    print(sql)
    try:
        cursor.execute(sql)
        db.commit()
    except:
        print("新建用户失败")

#删除用户
def delete(userName,passWord):
    sql="delete from user where user_name='"+userName+"' and pass_word = '"+passWord+"' "
    print(sql)
    try:
        cursor.execute(sql)
        db.commit()
    except:
        print("删除失败")

#更新用户信息
def update(userName,passWord):
    sql="update user set pass_word ='"+passWord+"' where user_name='"+userName+"'"
    print(sql)
    try:
        cursor.execute(sql)
        db.commit()
    except:
        print("更新用户密码失败")


