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
											text +=	item + "(" + node["transform"][item]+"px)";
											break;
										case "scale":
											text += item + "(" + node["transform"][item]+")";
											break;
										case "rotate":
											text += item + "(" + node["transform"][item]+"deg)";
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
			},100);
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
		//	定义元素起始位置
			var elementX = 0;
		//	抽象ul的位子
			var now = 0;
			
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
				elementX = charles.css(list,"translateX");
				list.style.transition = "none";
				
				clearInterval(clearTime);
			});
			
			wrap.addEventListener("touchmove",function(ev){
				ev = ev||event;
				var touchA = ev.changedTouches[0];
				var nowX = touchA.clientX;
				var disX = nowX - startX;
				
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
				},3000);
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
 
	
})(window);

	
	
