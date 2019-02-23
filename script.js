//start按钮事件
var start = document.getElementById("start");
start.addEventListener('click',function(){
	start.style.display = 'none';
//	启动动画效果
	gameStart();
})
//start按钮事件结束

function gameStart(){
//	记录得分score
	var score = 0;
	var block = document.getElementById("block");
		var timer = setInterval(function(){
//		隔10ms执行一次函数,产生运动效果
    	doItPerSecond();
	},10)
// 	block初始top值为-150;
	var t = -150;
	function doItPerSecond() {
//		每10msblock的top值+1,让他往下运动
		var speed = 0;
		if (score > 1) {
			speed = score/10;
		}
    	t = t + 1 + speed;
    	block.style.top = t+'px';
//  	判断top值是否==0,等于0的话,创建的ul已经完全移入可视区,然后top重新等于-150创建新的ul元素
    	if (t >= 0) {
    		t = -150;
	    	block.style.top = t+'px';
			//	追加ul li
			var randNum = Math.floor(Math.random()*(4));
	    	var newUlist = document.createElement('ul');
			//追加四个li元素
			for (var i = 0; i<4; i++) {
				var newli = document.createElement('li');
				newUlist.appendChild(newli );
			}
			newUlist.children[randNum].classList.add('black');
			block.insertBefore(newUlist,block.firstElementChild);
			//黑块点击事件
			block.onclick = function(e){
				var ev = e || window.event;
				if(ev.target.className == ''){
					clearInterval(timer);
					alert('游戏结束，得分：'+ score);
				}else{
					score++;
					ev.target.style.backgroundColor = 'red';
					ev.target.setAttribute('flag','true');
					ev.target.classList.remove('black');
				}
			}
			var lastElement = block.lastElementChild;
			var flag = 0;
			for (var i = 0; i< 4;i++) {
				var f = lastElement.children[i].hasAttribute('flag');
				if (f) {
					flag++;
				}
			}
			if (flag == 0 && lastElement.offsetTop == 750) {
				clearInterval(timer);
				alert('游戏结束，得分：'+ score)
			}
//			移除最后一个元素
			var ltt = lastElement.offsetTop;
			if (ltt > 600) {
				block.lastElementChild.remove()
			}
    	}
	}
}
