/*左侧菜单点击*/
$(".side-menu").on('click', 'li a', function(e) {
	var animationSpeed = 300;
	var $this = $(this);
	var checkElement = $this.next();

	if (checkElement.is('.menu-item-child') && checkElement.is(':visible')) {
	  checkElement.slideUp(animationSpeed, function() {
		checkElement.removeClass('menu-open');
	  });
	  checkElement.parent("li").removeClass("active");
	}
	//如果菜单是不可见的
	else if ((checkElement.is('.menu-item-child')) && (!checkElement.is(':visible'))) {
	  //获取上级菜单
	  var parent = $this.parents('ul').first();
	  //从父级开始找所有打开的菜单并关闭
	  var ul = parent.find('ul:visible').slideUp(animationSpeed);
	  //在父级中移出menu-open标记
	  ul.removeClass('menu-open');
	  //获取父级li
	  var parent_li = $this.parent("li");
	  //打开菜单时添加menu-open标记
	  checkElement.slideDown(animationSpeed, function() {
		//添加样式active到父级li
		checkElement.addClass('menu-open');
		parent.find('li.active').removeClass('active');
		parent_li.addClass('active');
	  });
	}
	//防止有链接跳转
	e.preventDefault();

	addIframe($this);
});

/*添加iframe*/
function addIframe(cur){
	var $this = cur;
	var h = $this.attr("href"),
		m = $this.data("index"),
		label = $this.find("span").text(),
		isHas = false;
	if (h == "" || $.trim(h).length == 0) {
		return false;
	}
	
	var fullWidth = $(window).width();
	if(fullWidth >= 750){
		$(".layout-side").show();
	}else{
		$(".layout-side").hide();
	}
	
	$(".content-tab").each(function() {
		if ($(this).data("id") == h) {
			if (!$(this).hasClass("active")) {
				$(this).addClass("active").siblings(".content-tab").removeClass("active");
				addTab(this);
			}
			isHas = true;
		}
	});
	if(isHas){
		$(".body-iframe").each(function() {
			if ($(this).data("id") == h) {
				$(this).show().siblings(".body-iframe").hide();
			}
		});
	}
	if (!isHas) {
		var tab = "<a href='javascript:;' class='content-tab active' data-id='"+h+"'>"+ label +" <i class=''>&#xe617;</i></a>";
		$(".content-tab").removeClass("active");
		$(".tab-nav-content").append(tab);
		var iframe = "<iframe class='body-iframe' name='iframe"+ m +"' width='100%' height='99%' src='"+ h +"' frameborder='0' data-id='"+ h +"' seamless></iframe>";
		$(".layout-main-body").find("iframe.body-iframe").hide().parents(".layout-main-body").append(iframe);
		addTab($(".content-tab.active"));
	}
	return false;
}


/*获取宽度*/
// function tabWidth(tabarr) {
// 	var allwidth = 0;
// 	$(tabarr).each(function() {
// 		allwidth += $(this).outerWidth(true)
// 	});
// 	return allwidth;
// }

// /*左按钮事件*/
// $(".btn-left").on("click", leftBtnFun);
// /*右按钮事件*/
// $(".btn-right").on("click", rightBtnFun);
// /*选项卡切换事件*/
// $(".tab-nav-content").on("click", ".content-tab", navChange);
// /*选项卡关闭事件*/
// $(".tab-nav-content").on("click", ".content-tab i", closePage);
// /*选项卡双击关闭事件*/
// $(".tab-nav-content").on("dblclick", ".content-tab", closePage);


/*左按钮方法*/
function leftBtnFun() {
	var ml = Math.abs(parseInt($(".tab-nav-content").css("margin-left")));
	var other_width = tabWidth($(".layout-main-tab").children().not(".tab-nav"));
	var navWidth = $(".layout-main-tab").outerWidth(true)-other_width;//可视宽度
	var hidewidth = 0;
	if ($(".tab-nav-content").width() < navWidth) {
		return false
	} else {
		var tabIndex = $(".content-tab:first");
		var n = 0;
		while ((n + $(tabIndex).outerWidth(true)) <= ml) {
			n += $(tabIndex).outerWidth(true);
			tabIndex = $(tabIndex).next();
		}
		n = 0;
		if (tabWidth($(tabIndex).prevAll()) > navWidth) {
			while ((n + $(tabIndex).outerWidth(true)) < (navWidth) && tabIndex.length > 0) {
				n += $(tabIndex).outerWidth(true);
				tabIndex = $(tabIndex).prev();
			}
			hidewidth = tabWidth($(tabIndex).prevAll());
		}
	}
	$(".tab-nav-content").animate({
		marginLeft: 0 - hidewidth + "px"
	},
	"fast");
}

/*右按钮方法*/
function rightBtnFun() {
	var ml = Math.abs(parseInt($(".tab-nav-content").css("margin-left")));
	var other_width = tabWidth($(".layout-main-tab").children().not(".tab-nav"));
	var navWidth = $(".layout-main-tab").outerWidth(true)-other_width;//可视宽度
	var hidewidth = 0;
	if ($(".tab-nav-content").width() < navWidth) {
		return false
	} else {
		var tabIndex = $(".content-tab:first");
		var n = 0;
		while ((n + $(tabIndex).outerWidth(true)) <= ml) {
			n += $(tabIndex).outerWidth(true);
			tabIndex = $(tabIndex).next();
		}
		n = 0;
		while ((n + $(tabIndex).outerWidth(true)) < (navWidth) && tabIndex.length > 0) {
			n += $(tabIndex).outerWidth(true);
			tabIndex = $(tabIndex).next()
		}
		hidewidth = tabWidth($(tabIndex).prevAll());
		if (hidewidth > 0) {
			$(".tab-nav-content").animate({
				marginLeft: 0 - hidewidth + "px"
			},
			"fast");
		}
	}
}

/*选项卡切换方法*/
function navChange() {
	if (!$(this).hasClass("active")) {
		var k = $(this).data("id");
		$(".body-iframe").each(function() {
			if ($(this).data("id") == k) {
				$(this).show().siblings(".body-iframe").hide();
				return false
			}
		});
		$(this).addClass("active").siblings(".content-tab").removeClass("active");
		addTab(this);
	}
}



/*循环菜单*/
function initMenu(menu,parent){
	for(var i=0; i<menu.length; i++){   
		var item = menu[i];
		var str = "";
		try{
			if(item.isHeader == "1"){
				str = "<li class='menu-header'>"+item.name+"</li>";
				$(parent).append(str);
				if(item.childMenus != ""){
					initMenu(item.childMenus,parent);
				}
			}else{
				item.icon == "" ? item.icon = "&#xe610" : item.icon = item.icon;
				if(item.childMenus == ""){
					str = "<li><a href='"+item.url+"'><span>"+item.name+"</span></a></li>";
					$(parent).append(str);
				}else{
					str = "<li><a href='"+item.url+"'><span>"+item.name+"</span><i class='icon-font icon-right'>&#xe60b;</i></a>";
					str +="<ul class='menu-item-child' id='menu-child-"+item.id+"'></ul></li>";
					$(parent).append(str);
					var childParent = $("#menu-child-"+item.id);
					initMenu(item.childMenus,childParent);
				}
			}
		}catch(e){}
	}
}



/*头部下拉框移入移出*/
$(document).on("mouseenter",".header-bar-nav",function(){
	$(this).addClass("open");
});
$(document).on("mouseleave",".header-bar-nav",function(){
	$(this).removeClass("open");
});

/*左侧菜单展开和关闭按钮事件*/
$(document).on("click",".layout-side-arrow",function(){
	if($(".layout-side").hasClass("close")){
		$(".layout-side").removeClass("close");
		$(".layout-main").removeClass("full-page");
		$(".layout-footer").removeClass("full-page");
		$(this).removeClass("close");
		$(".layout-side-arrow-icon").removeClass("close");
	}else{
		$(".layout-side").addClass("close");
		$(".layout-main").addClass("full-page");
		$(".layout-footer").addClass("full-page");
		$(this).addClass("close");
		$(".layout-side-arrow-icon").addClass("close");
	}
});

/*头部菜单按钮点击事件*/
$(".header-menu-btn").click(function(){
	$(".layout-side").removeClass("close");
	$(".layout-main").removeClass("full-page");
	$(".layout-footer").removeClass("full-page");
	$(".layout-side-arrow").removeClass("close");
	$(".layout-side-arrow-icon").removeClass("close");
	
	$(".layout-side").slideToggle();
});

/*左侧菜单响应式*/
$(window).resize(function() {  
	var width = $(this).width();  
	if(width >= 750){
		$(".layout-side").show();
	}else{
		$(".layout-side").hide();
	}
});

/*皮肤选择*/
$(".dropdown-skin li a").click(function(){
	var v = $(this).attr("data-val");
	var hrefStr=$("#layout-skin").attr("href");
	var hrefRes=hrefStr.substring(0,hrefStr.lastIndexOf('skin/'))+'skin/'+v+'/skin.css';
	$(window.frames.document).contents().find("#layout-skin").attr("href",hrefRes);
	
	setCookie("scclui-skin", v);
});

/*获取cookie中的皮肤*/
function getSkinByCookie(){
	var v = getCookie("scclui-skin");
	var hrefStr=$("#layout-skin").attr("href");
	if(v == null || v == ""){
		v="qingxin";
	}
	if(hrefStr != undefined){
		var hrefRes=hrefStr.substring(0,hrefStr.lastIndexOf('skin/'))+'skin/'+v+'/skin.css';
		$("#skin").attr("href",hrefRes);
	}
}

/*随机颜色*/
function getMathColor(){
	var arr = new Array();
	arr[0] = "#ffac13";
	arr[1] = "#83c44e";
	arr[2] = "#2196f3";
	arr[3] = "#e53935";
	arr[4] = "#00c0a5";
	arr[5] = "#16A085";
	arr[6] = "#ee3768";

	var le = $(".menu-item > a").length;
	for(var i=0;i<le;i++){
		var num = Math.round(Math.random()*5+1);
		var color = arr[num-1];
		$(".menu-item > a").eq(i).find("i:first").css("color",color);
	}
}

/*
  初始化加载
*/
$(function(){
	/*获取皮肤*/
	//getSkinByCookie();

	/*菜单json*/
	var menu = [{"id":"1","name":"常见问题","parentId":"0","url":"","icon":"","order":"1","isHeader":"1","childMenus":[
					{"id":"3","name":"APP使用","parentId":"1","url":"","icon":"&#xe604;","order":"1","isHeader":"0","childMenus":[
						{"id":"4","name":"支付问题","parentId":"3","url":"home.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"5","name":"提现","parentId":"3","url":"home2.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"5","name":"账号绑定","parentId":"3","url":"home3.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"5","name":"实名认证","parentId":"3","url":"home4.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"5","name":"更换唯一银行卡","parentId":"3","url":"home5.html","icon":"","order":"1","isHeader":"0","childMenus":""}
					]},
					{"id":"6","name":"项目支持","parentId":"1","url":"","icon":"&#xe602;","order":"1","isHeader":"0","childMenus":[
						{"id":"7","name":"联系发起人","parentId":"6","url":"projectSupport.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"8","name":"参与支持","parentId":"6","url":"projectSupport2.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"8","name":"抽奖","parentId":"6","url":"projectSupport3.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"8","name":"退款","parentId":"6","url":"projectSupport4.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"8","name":"发货","parentId":"6","url":"projectSupport5.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"8","name":"投资相关","parentId":"6","url":"projectSupport6.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"8","name":"项目监管","parentId":"6","url":"projectSupport7.html","icon":"","order":"1","isHeader":"0","childMenus":""}
					]},
					{"id":"7","name":"发起项目","parentId":"1","url":"","icon":"&#xe602;","order":"1","isHeader":"0","childMenus":[
						{"id":"7","name":"提交","parentId":"6","url":"initiatingProject.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"8","name":"审核","parentId":"6","url":"initiatingProject2.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"8","name":"上线","parentId":"6","url":"initiatingProject3.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"8","name":"收费","parentId":"6","url":"initiatingProject4.html","icon":"","order":"1","isHeader":"0","childMenus":""}
					]},
					{"id":"8","name":"关于我们","parentId":"1","url":"","icon":"&#xe602;","order":"1","isHeader":"0","childMenus":[
						{"id":"7","name":"公司地址","parentId":"6","url":"aboutUs.html","icon":"","order":"1","isHeader":"0","childMenus":""},
						{"id":"8","name":"合作联系","parentId":"6","url":"aboutUs2.html","icon":"","order":"1","isHeader":"0","childMenus":""}
					]}
				]},
				{"id":"2","name":"使用指南","parentId":"0","url":"","icon":"","order":"2","isHeader":"1","childMenus":[
					{"id":"9","name":"发起人手册","parentId":"2","url":"useGuide.html","icon":"","order":"1","isHeader":"0","childMenus":""},
					{"id":"9","name":"共建人手册","parentId":"2","url":"useGuide2.html","icon":"","order":"1","isHeader":"0","childMenus":""},
					{"id":"9","name":"用户协议","parentId":"2","url":"useGuide3.html","icon":"","order":"1","isHeader":"0","childMenus":""},
					{"id":"9","name":"项目编辑指南","parentId":"2","url":"useGuide4.html","icon":"","order":"1","isHeader":"0","childMenus":""},
					{"id":"9","name":"项目尽掉资料清单","parentId":"2","url":"useGuide5.html","icon":"","order":"1","isHeader":"0","childMenus":""}
					
				]}
				];
	initMenu(menu,$(".side-menu"));
	$(".side-menu > li").addClass("menu-item");
	
	/*获取菜单icon随机色*/
	//getMathColor();
}); 