(function(w){
	w.charles = Object.create(null);
	w.charles.css = function(node,type,val){
						if(typeof node["transform"]==="undefined"){
							node["transform"]={};
						}
						
						if(arguments.length>=3){
							var text = "";
							node["transform"][type] = val;
							
							for(var item in node["transform"]){
								
								if(node["transform"].hasOwnProperty(item)){
									switch (item){
										case "translateX":
										case "translateY":
										case "translateZ":
											text += item + "(" + node["transform"][item] + "px)";
											break;
										case "scale":
											text += item + "(" + node["transform"][item] + ")";
											break;
										case "rotate":
											text += item + "(" + node["transform"][item] + "deg)";
											break;
									}
								}
							}
							node.style.transform = node.style.webkitTransform = text;
						}else if(arguments.length==2){
							val = node["transform"][type];
							
							if(typeof val === "undefined"){
								if(type==="translateX"||type==="translateY"||type==="rotate"){
									val = 0;
								}else if(type==="scale"){
									val = 1;
								}
							}
							return val;
						}
						
					}
	w.charles.cos=function(urls){
			var pointsFlag = urls.length;
				//滑屏区
			var wrap = document.querySelector("#carouse-wrapper");
			var needCos = wrap.getAttribute("needCos");//有"" 无null
			needCos = needCos === null?false:true;
			if(needCos){
				urls = urls.concat(urls);
			}
			//滑屏元素
			var list = document.createElement("ul");
			//3D硬件加速
			charles.css(list,"translateZ",1);
			
			var liText = "";
			//	根据图片数量自动生成对应li
			for(var i=0;i<urls.length;i++){
				
				liText += '<li><a href="javascript:;"><img src="'+urls[i]+'" /></a></li>';
			}
			list.innerHTML = liText;
			wrap.appendChild(list);
			//所有图片的对象
			var imags = document.querySelectorAll("#carouse-wrapper ul > li img");
			
			//设置延时才能获取相应的高宽，一般为50ms
			setTimeout(function(){
				var styleNode = document.createElement("style");
				styleNode.innerHTML+="#carouse-wrapper ul{width:"+ urls.length + "00% !important}"; 
				styleNode.innerHTML+="#carouse-wrapper ul > li{width:"+ (1/urls.length*100) +"%!important}";
				styleNode.innerHTML+="#carouse-wrapper{height:"+ imags[0].offsetHeight + "px!important}";
				document.head.appendChild(styleNode);
			},50);
		//小圆点样式
			var pWrap = document.querySelector("#carouse-wrapper .points-wrapper");
			if(pWrap){
				var spanText = "";
				for(i=0;i<pointsFlag;i++){
					if(i==0){
						spanText+="<span class='active'></span>";
					}else{
						spanText+="<span></span>";
					}
				}
				pWrap.innerHTML = spanText;
				var points = document.querySelectorAll("#carouse-wrapper .points-wrapper > span");
			}
			
		//	滑屏逻辑
		//	定义手的初始位置
			var startX = 0;
			var startY = 0;
		//	定义元素起始位置
			var elementX = 0;
			var elementY = 0;
		//	抽象ul的位子
			var now = 0;
		//	判断滑动方向
			var isX = true;
		//	首次判断
			var isFirst = true;
			
			wrap.addEventListener("touchstart",function(ev){
				ev = ev||event;
				var touchA = ev.changedTouches[0];//确定初始的手指
				
				//在X轴上手指的偏移量
				
				if(needCos){
					now = charles.css(list,"translateX")/document.documentElement.clientWidth;
					if(now == 0){
						now = -urls.length/2;
					}else if(now == 1-urls.length){
						now = 1-urls.length/2;
					}
					charles.css(list,"translateX",now*document.documentElement.clientWidth);
				}
				startX = touchA.clientX;
				startY = touchA.clientY;
				elementX = charles.css(list,"translateX");
				elementY = charles.css(list,"translateY");
				list.style.transition = "none";
				
				clearInterval(clearTime);
				//重启抖动判断
				isX = true;
				isFirst = true;
			});
			
			wrap.addEventListener("touchmove",function(ev){
				if(!isX){
					return;
				}
				ev = ev||event;
				var touchA = ev.changedTouches[0];
				var nowX = touchA.clientX;
				var nowY = touchA.clientY;
				var disX = nowX - startX;
				var disY = nowY -startY;
				//防抖动
				if(isFirst){
					isFirst = false;
					if(Math.abs(disY) > Math.abs(disX)){
						isX = false;
						return;
					}
				}
				
				charles.css(list,"translateX",elementX+disX);
			})
			wrap.addEventListener("touchend",function(ev){
				ev = ev||event;
				var touchA = ev.changedTouches[0];
				now = charles.css(list,"translateX")/document.documentElement.clientWidth;
				
				now = Math.round(now);
				
				if(now>0){
					now = 0; 
				}else if(now < 1-urls.length){
					now = 1-urls.length
				}
				moveAuto();
				
				if(needAuto){
					auto();
				}
				
			});
			
			//自动轮播
			var clearTime = 0;
			var needAuto = wrap.getAttribute("needAuto");//有"" 无null
			needAuto = needAuto === null?false:true;
			if(needAuto){
				auto();
			}
			
			function auto(){
				clearInterval(clearTime);
				clearTime=setInterval(function(){
					if(now == 1-urls.length){
						list.style.transition = "none";
						now = 1-urls.length/2;
						charles.css(list,"translateX",now*document.documentElement.clientWidth);
					}
					setTimeout(function(){
						now--;
						moveAuto();
					},50)
				},2000);
			}
			
			function moveAuto(){
				list.style.transition=".5s";
				charles.css(list,"translateX",now*document.documentElement.clientWidth);
				//小圆点的同步
				if(pWrap){
					for(var i=0;i<points.length;i++){
						points[i].className="";
					}
					points[-now%pointsFlag].className="active";
					//console.log([-now%pointsFlag])
				}
			}
	
	}
	//竖向滑屏
 	w.charles.vMove = function(wrap,callBack){
 		
 		var list = wrap.children[0];
 		//3D加速
 		charles.css(list,"translateZ",1);
 		//滑屏的最大值
 		var minY = wrap.clientHeight - list.offsetHeight;
 		//手指和元素的起始位置；
 		var startP = {};
 		var elementP = {};
 		//上一次时间和位置
 		var lastTime = 0;
 		var lastPoint = 0;
 		//时间差和位置差
 		var timeVal = 1;
 		var pointVal = 0;
 		//防抖动
		var isY = true;
		var isFirst = true;
		//即点即停
		var Tween={
				 Linear: function(t,b,c,d){ return c*t/d + b; },
				 Back: function(t,b,c,d,s){
		            if (s == undefined) s = 1.70158;
		            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		        }
			}
 		wrap.addEventListener("touchstart",function(ev){
 			ev=ev||event;
 			var touchA = ev.changedTouches[0];
 			//手指和元素的起始位置
 			minY = wrap.clientHeight - list.offsetHeight;
 			startP = {clientX:touchA.clientX,clientY:touchA.clientY};
 			elementP = {x:charles.css(list,"translateX"),y:charles.css(list,"translateY")};
 			
 			list.style.transition = "none";
 			list.elasticd=false;
 			
 			lastTime = new Date().getTime();
 			lastPoint = touchA.clientY;
 			
 			pointVal = 0;
 			//重启防抖动判断
			isY = true;
			isFirst = true;
				
			//即点即停
			clearInterval(wrap.clearTime);
			if(callBack&&typeof callBack["start"] === "function"){
					callBack["start"].call(this);
				}
 		})
 		
 		wrap.addEventListener("touchmove",function(ev){
 			if(!isY){
 				return;
 			}
 			ev=ev||event;
 			var touchA = ev.changedTouches[0]; 
 			
 			var nowP = touchA;
 			var dis = {x:nowP.clientX-startP.clientX,y:nowP.clientY-startP.clientY};
 			
 			var translateY = elementP.y + dis.y;
 			//每次触发move事件的时间和位置
 			var nowTime = new Date().getTime();
 			var nowPiont = touchA.clientY;
 			
 			timeVal = nowTime - lastTime;
 			pointVal = nowPiont - lastPoint;
 			//重置上次的时间和位置值
 			lastPoint = nowPiont;
 			lastTime = nowTime;
 			//手动橡皮经效果
 			
 			if(translateY>0){
 				var scale = document.documentElement.clientHeight/((document.documentElement.clientHeight+translateY)*2);
 				translateY = charles.css(list,"translateY") + pointVal*scale;
 				list.elasticd = true;
 			}else if(translateY<minY){
 				var over = minY - translateY;
 				var scale = document.documentElement.clientHeight/((document.documentElement.clientHeight+over)*2);
 				translateY = charles.css(list,"translateY") + pointVal*scale;
 				list.elasticd = true;
 				
 			}
 			if(isFirst){
					isFirst =false;
					if(Math.abs(dis.x) > Math.abs(dis.y) ){
						isY = false;
						return;
					}
				}
 			charles.css(list,"translateY",translateY);
 			if(callBack&&typeof callBack["move"] === "function"){
					callBack["move"].call(this);
				}
 		})
 		
 		wrap.addEventListener("touchend",function(ev){
 			//最后一次的平均速度
 			var speed = pointVal/timeVal;
 			//调整值
 			speed = Math.abs(speed)<1?0:speed;
 			var translateY = charles.css(list,"translateY");
 			var targetY = translateY + speed*200;
 			var time = Math.abs(speed)*0.15;
 				time = time>1?1:time;
 			
 			var type = "Linear";
 			//橡皮筋效果判断
 			if(targetY > 0){
 				targetY = 0;
 				type = "Back";
 				if(list.elasticd){
						time = .5;
						type="Linear";
					}
 			}else if(targetY < minY){
 				targetY = minY;
 				type = "Back";
 				if(list.elasticd){
 					time = .5;
 					type = "Linear";
 				}
 			}
 			move(type,targetY,time);
 			if(callBack&&typeof callBack["end"] === "function"){
					callBack["end"].call(this);
				}
 		})
 		
 		function move(type,targetY,time){
 			var point = 0;
				
				var t = 0;
				var b = charles.css(list,"translateY");
				var c  = targetY -b;
				var d = time/(0.02);
				var s =1;
				
				clearInterval(wrap.clearTime);
				wrap.clearTime=setInterval(function(){
					t++;
					if(t>d){
						clearInterval(wrap.clearTime);
						if(callBack&&typeof callBack["over"] === "function"){
							callBack["over"].call(this);
						}
						return;
					}
					point = Tween[type](t,b,c,d,s);
					charles.css(list,"translateY",point);
					if(callBack&&typeof callBack["move"] === "function"){
						callBack["move"].call(this);
					}
				},20)
 			
 		}
 	}
	
})(window);

	
	
