/**
 * Created by lingjing on 2016/6/25.
 * @last
 *
 *
 */

'use strict'
//使用node建立http服务步骤
//1、获得http对象、创建一个http请求
var http = require('http');
var url = require('url');
//2、创建服务
//参数1 request：获取客户端请求的信息
//参数2 response：发送响应给客户端的信息
var server = http.createServer(function(request,response){
    //第二个参数是个布尔值，为true的时候，把url的内容转为json格式
    var info = url.parse(request.url,true).query;
    //console.log(info);
    console.log(request.url);
    //向客户端响应数据
    response.write('hi');
    //响应结束
    response.end();
})
//3、启动服务
//第一个参数是端口，第二个是IP字符串允许使用自己的IP，最后一个是一个函数
server.listen(3000,function(error){
    console.log('服务启动了')
})