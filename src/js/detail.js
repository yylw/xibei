define(['jquery','lib/arttemplate','js/detpl'],function($,tpl,detpl){
	if(location.href.indexOf('detail.html')==-1)return false;

	function getUrl(){
		var date=decodeURI(location.search);
		date=date.slice(1).split("&");
		var arr=[];
		var obj={}
		for(var i=0;i<date.length;i++){
			arr=date[i].split("=")
			obj[arr[0]]=arr[1]
		}
		return obj
	}
	var url=getUrl();
	var ids=getUrl().ids;
	//数据渲染
	$.when($.ajax('../data/diningHall.json'))
	.done(function(data){
		var render = tpl.compile(detpl.detpl);
		var html = render(data.success[0]);

		$('.content').html(html).trigger('rendered');
		var detop=$(".detop");
		$(".title",detop).html(url.name);
		$(".sale",detop).html('月售'+url.sales+'份');
		$(".startTip",detop).html('起送费￥'+url.startTip);
		$(".tip",detop).html('配送费￥'+url.tip);
		$(".time",detop).html('预计'+url.time+'min送达');
		$(".imgs",detop).attr("src",'../'+url.img)
		//localStorage.clear();

	})
	
	$('.detail').on('rendered',function(){
		var H = $('header').outerHeight() + $('.detop').outerHeight();
		//每个标题距离上方的距离
		var $data = $('.right .tit');
		var arrTop = [];
		 $('.right .tit').each(function(i,v){
			arrTop.push($(v).offset().top-110);
		})
		console.log(arrTop)

		//时间轴
		$('.right').scroll(function(){

			var srcTop = $(this).scrollTop();
			console.log($(this).scrollTop())
			for(var i=0;i<arrTop.length;i++){
				if(i==arrTop.length-1){
					if(srcTop >arrTop[i]){
						deadd(i);
					}else{
						deremove(i);
					}
				}else{
					if(srcTop > arrTop[i] && srcTop<arrTop[i+1]){
						deadd(i);
					}else{
						deremove(i);
					}
				}
			}

		})
		//点击左侧导航
		$('.left').on('click','li',function(){
			$(this).addClass('bg').siblings().removeClass('bg');
			$('.right>div').find('.tit').removeClass('fixed');
			var idx = $(this).index();
			$('.right').scrollTop(arrTop[idx]+1);


		})
		function deadd(i){
			$('.right>div').eq(i).find('.tit').addClass('fixed');
			$('.left li').eq(i).addClass('bg').siblings().removeClass('bg');
		}
		function deremove(i){
			$('.right>div').eq(i).find('.tit').removeClass('fixed');
		}

		
		$('.right').find('.reduce').hide();
		$('.right').find('.num').hide();
		$('.right .num').each(function(){
			var id = $(this).parents('dl').index(),
				tit = $(this).parents('dl').siblings('.tit').html();
			var keyname =ids+'-'+ tit + '-' + id;
            if(localStorage.getItem(keyname)){
				var arr=localStorage.getItem(keyname).split('-');
				$(this).html(arr[2]);
			}
		})
		//点击增加按钮
		$('.right').on('click','.add',function(){
			$(this).siblings('.reduce').show();
			$(this).siblings('.num').show();
			var num=$(this).siblings('.num').text();
			num++;
			$(this).siblings('.num').html(num);
			var cid = $(this);
			storage(cid);
		})
		
		//点击减少按钮
		$('.right').on('click','.reduce',function(){
			var num=$(this).siblings('.num').text();
			num--;
			if(num<=0){
				$(this).hide();
				$(this).siblings('.num').hide();
				num = 0;
			}
			$(this).siblings('.num').html(num);
			var cid = $(this);
			storage(cid);
		})


		//存储

		function storage(cid){
			var id = cid.parents('dl').index(),
				tit = cid.parents('dl').siblings('.tit').html(),
				name = cid.attr('name'),
				price = cid.attr('price'),
				n = cid.siblings('.num').html();
			var key =ids+'-'+ tit + '-' + id,
				value = name + '-' + price + '-' + n;
			localStorage.setItem(key,value);
			
			if(n<=0){
				localStorage.removeItem(key,value);
			}
			
			$('.count>span').html(localStorage.length);
			
			sumprice();
		}
		$('.count').click(function(){
			//从本地渲染数量框的内容
			if($('.count').text()=='0项'){
				$('.mark').hide();
				return false;
			}
			var str='';
			for(var i=0;i<localStorage.length;i++){
				var name=localStorage.key(i),
		    		arr=localStorage[name].split('-');
				var tit = arr[0],
					price = arr[1],
					num = arr[2];
				str+='<li>'+
					'<p class="con">'+
						'<span class="titleck">'+tit+'</span>'+
						'<span class="priceck">￥'+price+'</span>'+
					'</p>'+
					'<p class="choosenum">'+
						'<span class="reduce btn" name="'+name+'" price="'+price+'"  tit="'+tit+'" num="'+num+'">-</span>'+
						'<span class="num">'+num+'</span>'+
						'<span class="add btn" name="'+name+'" price="'+price+'" tit="'+tit+'" num="'+num+'">+</span>'+
					'</p>'+
				'</li>';
			}
			$('.slide').html(str);
			$('.mark').show();
			$('.slide').show();
			$('.right').find('.reduce').hide();
			$('.right').find('.num').hide();
		})

		//数量框中的加减
		$('.slide').on('click','.add',function(){
			var num=$(this).siblings('.num').text();
			var name=$(this).attr('name');
			num++;
			$(this).siblings('.num').html(num);
			var did = $(this);
			storage2(did);
			$('.right .num').each(function(){
				var id = $(this).parents('dl').index(),
					tit = $(this).parents('dl').siblings('.tit').html();
				var keyname =ids+'-'+tit + '-' + id;
				if(keyname == name){
					$(this).html(num);
				}
			})
		})
		$('.slide').on('click','.reduce',function(){
			var num=$(this).siblings('.num').text();
			var name=$(this).attr('name');
			num--;
			if(num<=0){
				$(this).parents('li').remove();
			}
			$(this).siblings('.num').html(num);
			var did = $(this);
			storage2(did);
			$('.right .num').each(function(){
				var id = $(this).parents('dl').index(),
					tit = $(this).parents('dl').siblings('.tit').html();
				var keyname =ids+'-'+tit + '-' + id;
				if(keyname == name){
					$(this).html(num);
				}
			})
		})
		function storage2(did){
			var name = did.attr('name'),
				price = did.attr('price'),
				tit = did.attr('tit'),
				num = did.siblings('.num').html();
			var key = name,
				value = tit + '-' + price + '-' + num;
			localStorage.setItem(key,value);
			if(num<=0){
				localStorage.removeItem(key,value);
			}
			sumprice();
		}
		
		//点击任意地方数量框消失
		$(document).on('click',function(e){
			var target = $(e.target);
			if(target.closest('.slide').length == 0){
				if(target.closest('.count').length == 0 && target.closest('.reduce').length == 0){
					$('.slide').hide();
					$('.mark').hide();
				}
			}
		})
		//总价
		function sumprice(){
			var all = 0;
			for(var i=0;i<localStorage.length;i++){
				var name=localStorage.key(i),
		    		arr=localStorage[name].split('-');
				var name = arr[0],
					price = arr[1],
					num = arr[2];
				all+=price*num;
			}
			$('.total>span').html(all);
			//几项
			$('.count>span').html(localStorage.length);	
		}
		sumprice();
	})
    $(".selected").on("click",function(){
		if($(".count").text()=='0项') return;
		location.href='message.html'
	})
	$(".back").on("click",function(){
		location.href='restaurant.html'
	})
})
