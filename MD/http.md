##express使用步骤
    1.创建一个新的项目
    2.在项目中创建一个package.json
    3.创建一个项目的主文件（index.js/app.js/main.js）
    4.项目中创建一个文件夹public,并向文件中添加一个index.html
    5.下载安装express
        npm i express --save
    6.引入express
        var express = require("express");
    7.创建一个app(application)对象
        var app = express();
    8.配置静态资源
        app.use(express.static("public"));
    9.监听3000端口并启动服务器
        app.listen(3000)
##get请求报文
    GET /index.html?username=sunwukong&password=123123 HTTP/1.1
    Accept: text/html, application/xhtml+xml, */*
    X-HttpWatch-RID: 8103-10148
    Referer: http://localhost:3000/form.html
    Accept-Language: zh-CN,en-US;q=0.5
    User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko
    Accept-Encoding: gzip, deflate
    Host: localhost:3000
    DNT: 1
    Connection: Keep-Alive
    -
        get没有请求体，所以空行对于get请求没有意义
        get请求报文的结构：
            GET /index.html?username=sunwukong&password=123123 HTTP/1.1
            请求的方式/请求路径?查询字符串/协议名/协议版本
            get请求通过查询字符串将请求参数发送给服务器
        请求头：是一个一个名值对的结果，名值和值之间使用：连接，有的名对应一个值，有的
                名对应多个值，浏览器通过请求头将其信息发给服务器
            Accept: text/html, application/xhtml+xml, */*
            			客户端可以接收的文件类型：后边的值是一个一个  MIME值（xxx/xxx）	*/*表示任意类型
            			-
            			Referer: http://localhost:3000/form.html
            			请求的来源：广告计费、防止盗链
            			-
            			Accept-Language: zh-CN,en-US;q=0.5
            			客户端使用的语言：zh-CN 中文简体
            			-
            			User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko
            			用户代理（浏览器）：客户端的信息
            			-
            			Accept-Encoding: gzip, deflate
            			允许的压缩格式：
            			-
            			Host: localhost:3000
            			主机地址：
            			-
            			Connection: Keep-Alive
            			连接时间：Keep-Alive表示这是一个长连接，把所有资源加载完毕以后，再断开意思
##post请求报文
    User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko
    Content-Type: application/x-www-form-urlencoded
    Accept-Encoding: gzip, deflate
    Host: localhost:3000
    Content-Length: 34
    DNT: 1
    Connection: Keep-Alive
    Cache-Control: no-cache

    username=sunwukong&password=123123

    post请求
    	请求首行
    		POST /index.html HTTP/1.1

    	请求头
    		Accept: text/html, application/xhtml+xml, */*
    		Referer: http://localhost:3000/form.html
    		Accept-Language: zh-CN,en-US;q=0.5
    		User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko
    		Content-Type: application/x-www-form-urlencoded
    			请求体的类型: application/x-www-form-urlencoded表示请求体中的内容将会被url编码

    		Accept-Encoding: gzip, deflate
    		Host: localhost:3000
    		Content-Length: 34
    			请求体的长度:

    		Connection: Keep-Alive
    		Cache-Control: no-cache
    			缓存的控制：no-cache 不使用缓存

    	空行
    		空行用来分隔请求首部和请求体

    	请求体
    		username=sunwukong&password=123123
    		- post请求通过请求体发送请求参数，请求参数的结构和查询字符串一样

    get请求和post请求的区别
    		1.除了表单的method属性是post时发送的请求，其他情况都是get请求（没有AJAX的情况）
    		2.get请求通过url地址发送请求参数，请求参数在地址栏直接可见，安全性较差
    			post请求通过请求体发送请求参数的，请求参数不能在地址栏直接看见，相对安全
    		3.url地址的长度限制在255个字节，所以使用get请求无法发送过多的请求参数，
    			请求体的大小没有任何限制，可以发送任意多的参数
    		4.提交表单时如果没有特殊需要一般都使用post
##响应报文
    	HTTP/1.1 200 OK
        X-Powered-By: Express
        Accept-Ranges: bytes
        Cache-Control: public, max-age=0
        Last-Modified: Wed, 25 Oct 2017 01:57:36 GMT
        ETag: W/"b2-15f513fcd27"
        Content-Type: text/html; charset=UTF-8
        Content-Length: 178
        Date: Wed, 25 Oct 2017 03:17:47 GMT
        Connection: keep-alive

        <!DOCTYPE html>
        <html lang="en">
        <head>
        	<meta charset="UTF-8">
        	<title>首页</title>
        </head>
        <body>
        <h1>网页</h1>

        </body>
        </html>

        响应首行
        	HTTP/1.1 200 OK
        	协议名/协议版本 响应状态码 响应状态码的描述

        		常见的响应状态码
        			200
        				- 表示响应成功，所有以2开头的都和成功有关
        			302
        				- 请求重定向，所有以3开头的都和重定向相关
        			404
        				- 资源未找到，所有以4开头的都是客户端的错误
        			500
        				- 服务器内部错误，所有以5开头的都是服务器的错误




        响应头
        	X-Powered-By: Express
        		服务器的版本:

        	Accept-Ranges: bytes
        		允许的单位:

        	Cache-Control: public, max-age=0
        		缓存的控制：public使用缓存

        	Last-Modified: Wed, 25 Oct 2017 01:57:36 GMT
        		网页的最后修改时间:

        	ETag: W/"b2-15f513fcd27"
        		网页的标签：通过该头来识别网页的版本

        	Content-Type: text/html; charset=UTF-8
        		响应体的类型：text/html 表示响应体是一个网页

        	Content-Length: 178
        		响应体的长度:

        	Date: Wed, 25 Oct 2017 03:17:47 GMT
        		响应的时间:

        	Connection: keep-alive
        		连接的时间:

        空行
        	空行用来分隔首部和体

        响应体
        	- 响应体是服务器发送给浏览器的主要内容
        	<!DOCTYPE html>
        	<html lang="en">
        	<head>
        		<meta charset="UTF-8">
        		<title>首页</title>
        	</head>
        	<body>
        	<h1>网页</h1>

        	</body>
        	</html>