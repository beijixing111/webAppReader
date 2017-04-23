var koa = require("koa");
var controller = require("koa-route");
var app = koa();
var querystring = require('querystring');

var views = require('co-views');
var render = views('./view',{
	map:{html :'ejs'}
});

var koa_static = require('koa-static-server');
var service = require('./service/webAppService.js');
app.use(koa_static({
	rootDir: './static/',
	rootPath:'/static/',
	maxage: 0
}));

// controller = controller();
// console.log(controller.router);
// app.use(controller.get('./router_test',function(){
// 	this.set('Cache-Control','no-cache');
// 	this.body = "hello koa!";
// }));

app.use(controller.get('/ejs_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('test',{nav:'title_test'});
}));

app.use(controller.get('/',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('index',{nav:'商城首页'});
}));

app.use(controller.get('/search',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('search');
}));

app.use(controller.get('/reader',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('reader');
}));

app.use(controller.get('/male',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('male',{nav:'男生频道'});
}));

app.use(controller.get('/female',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('female',{nav:'女生频道'});
}));

app.use(controller.get('/category',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('category',{nav:'分类'});
}));

app.use(controller.get('/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('rank',{nav:'排行'});
}));

app.use(controller.get('/book',function*(){
	this.set('Cache-Control','no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render('book',{nav:'书籍详情',bookId:bookId});
}));

app.use(controller.get('/api_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_test_data();
}));

app.use(controller.get('/ajax/index',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_index_data();
}));

app.use(controller.get('/ajax/book',function*(){
	this.set('Cache-Control','no-cache');
	// var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
		id = '';
	}
	this.body = service.get_book_data(id);
}));

app.use(controller.get('/ajax/chapter_data',function*(){
	this.set('Cache-Control','no-cache');
	// var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
		id = '';
	}
	this.body = service.get_chapter_content_data(id);
}));

app.use(controller.get('/ajax/chapter',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_chapter_data();
}));

app.use(controller.get('/ajax/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_rank_data();
}));

app.use(controller.get('/ajax/seach',function*(){
	this.set('Cache-Control','no-cache');
	
	var params = querystring.parse(this.req._parsedUrl.query);
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start,end,kewword);
}));


app.listen(3002);
console.log('Koa server is started! port:3002');


