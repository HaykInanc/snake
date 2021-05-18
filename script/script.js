const cvsElem = document.getElementById('cvs');
cvsElem.style.border = '2px solid black';

const ctx = cvsElem.getContext('2d');

cvsElem.width = 500;
cvsElem.height = 500

class Sq {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.step = 50;
	}

	left(){
		this.x--;
	}

	right(){
		this.x++;
	}

	up(){
		this.y--;
	}

	down(){
		this.y++;
	}

	draw(ctx){
		ctx.fillRect(this.x*this.step, this.y*this.step, this.step, this.step);
	}
}


function draw(){
	ctx.clearRect(0, 0, 500, 500);
	arr.forEach(elem=>elem.draw(ctx));
}

// document.addEventListener('keypress', e=>{
// 	if(e.code == 'KeyW'){
// 		console.log('up');
// 		arr.forEach(sq=>sq.up());
// 	}else if(e.code == 'KeyA'){
// 		console.log('left');
// 		arr.forEach(sq=>sq.left());
// 	}else if(e.code == 'KeyS'){
// 		console.log('down');
// 		arr.forEach(sq=>sq.down());
// 	}else if(e.code == 'KeyD'){
// 		console.log('right');
// 		arr.forEach(sq=>sq.right());
// 	};
// 	draw()
// })

class Snake{
	constructor(size){
		this.size = size;
		this.body = [];
		for (let i=0; i<size; i++){
			this.body.push(new Sq(size-i-1, 5));
		}
		this.direction = 0;
		this.changeFlg = true;
		this.gameoverFlg = false;
	}

	draw(ctx){
		ctx.clearRect(0, 0, 500, 500);
		this.body.forEach(sq=>sq.draw(ctx));
		this.changeFlg = true;
	}

	move(){
		for (let i=1; i<this.size; i++){
			const index = this.size-i;
			this.body[index].x = this.body[index-1].x;
			this.body[index].y = this.body[index-1].y;
		}
		if (this.direction == 0){
			this.body[0].x++;
		}else if (this.direction == 1){
			this.body[0].y++;
		}else if (this.direction == 2){
			this.body[0].x--;
		}else if (this.direction == 3){
			this.body[0].y--;
		}
	}

	checkGameover(){
		const head =  this.body[0];
		if (head.x === 0 && this.direction === 2
		||  head.y === 0 && this.direction === 3
		||  head.x === 9 && this.direction === 0
		||  head.y === 9 && this.direction === 1){
			this.gameoverFlg = true;
		}
	}


	changeDirection(code){
		if (this.changeFlg == false){
			return
		}
		this.changeFlg = false;
		if(code == 'KeyW' && this.direction != 1){
			this.direction = 3;
		}else if(code == 'KeyA' && this.direction != 0){
			this.direction = 2;
		}else if(code == 'KeyS' && this.direction != 3){
			this.direction = 1;
		}else if(code == 'KeyD' && this.direction != 2){
			this.direction = 0;
		};
	}

}

const snake = new Snake(4);
snake.draw(ctx);


setInterval(()=>{
	snake.checkGameover()
	if (!snake.gameoverFlg){
		snake.move();
		snake.draw(ctx);
		console.log(snake.gameoverFlg);
	}


}, 500);

document.addEventListener('keypress', e=>{
	snake.changeDirection(e.code)
})
