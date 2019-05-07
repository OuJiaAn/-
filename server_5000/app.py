# -*- coding: utf-8 -*-

from flask import Flask,request
from db_manager import db_manager
import json
import datetime


app = Flask(__name__)

@app.before_first_request
def before_first_request():
    print "before_first_request()"
    pass


@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/get_all_msg')
def get_all_msg():
    return db_manager.get_all_msg_json()
    pass

@app.route('/add_msg', methods=['GET', 'POST'])
def add_msg():
    detail = request.args.get('detail')
    title  = request.args.get('title')
    author = request.args.get('author')
    if 'POST' == request.method:
        detail = request.form['detail']
        title  = request.form['title']
        author = request.form['author']
    ret = "failed"
    if True == db_manager.add_msg(title, author, detail):
        ret = 'success'

    return ret
    pass

@app.route('/login', methods=['GET', 'POST'])
def login():

    username = request.args.get('username')
    password = request.args.get('password')
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

    msg     = 'Login faileded'
    logined = False
    while True:
        if None == username \
                or None == password:
            break

        if 'admin' != username \
                or '123456' != password:
            break
        msg     = 'Login succeeded!'
        logined = True
        break

    ret = {'logined'  : logined
        , 'loginName' : username
        , 'loginTime' : datetime.datetime.now().strftime('%Y-%m-%d')
        , 'msg'       : msg}

    return json.dumps(ret)



if __name__ == '__main__':
    app.run(host = '0.0.0.0')