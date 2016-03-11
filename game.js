window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var enemyCvs;
var ctxEnemy;

var drawBtn;
var clearBtn;

// var drawRect;
// var clearRect;

var gameWidth = 800;
var gameHeight = 500;

var background = new Image();//фон
background.src = "bg.jpg";

var tiles = new Image();//фон
tiles.src = "img/tiles.gif";

var player;
var enemy;

var isPlaying;


var requestAnimFrame = window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame;

function init(){
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	pl = document.getElementById("player");
	// ctxPlayer = map.getContext("2d");
	ctxPl = pl.getContext("2d");

	//Инициализируем переменные для врагов
	enemyCvs = document.getElementById("enemy");
	ctxEnemy = enemyCvs.getContext("2d");


	//Инициализируем размер игры
	map.width = gameWidth;
	map.height = gameHeight;

	//Игрок
	pl.width = gameWidth;//60
	pl.height = gameHeight;//80
	//Враг

	enemyCvs.width = gameWidth;
	enemyCvs.height = gameHeight;

	//Инициалищируем кнопки
	drawBtn = document.getElementById("drawBtn"); 
	clearBtn = document.getElementById("clearBtn");

	drawBtn.addEventListener("click", drawRect, false); //Действие по клику
	clearBtn.addEventListener("click", clearRect, false);

	player = new Player();
	enemy = new Enemy();


	drawBg();
	startLoop();

	document.addEventListener("keydown", chekKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);

}

function loop(){
	if(isPlaying){
		draw();
		update();
		requestAnimFrame(loop);
	}
}

function startLoop(){
	isPlaying = true;
	loop();
}


function stopLoop(){
	isPlaying = false;

}
//До 84 строчки нет ошибок

// Глобальная фунция в котороый вызываем отрисовку отъетов игры
function draw(){
	player.draw();
	enemy.draw();
}



function update(){
	player.update();
	enemy.update();
}

function Player(){

	//Движение игрока
	this.srcX = 0; 		//Задаем координаты в самом файле
	this.srcY = 0;
	this.drawX = 50;
	this.drawY = 100;
	this.width = 60;
	this.height = 80;
	this.speed = 5;
		

	//for keys
	this.isUp = false;
	this.isDown = false;
	this.isRight = false
	this.isLeft = false;
}


//Для черной птицы
function Enemy(){
	this.srcX = 0; //Задаем координаты в самом файле
	this.srcY = 100;
	this.drawX = 500;
	this.drawY = 100;
	this.width = 80;
	this.height = 50;

	this.speed = 8;
}



Enemy.prototype.draw = function() {
	clearCtxEnemy();
	ctxEnemy.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,//Сама картинка
		this.drawX, this.drawY, this.width, this.height);// На экране
}

Enemy.prototype.update = function() {
	this.drawX -= 3;
}



Player.prototype.draw = function(){
	clearCtxPlayer();
	ctxPl.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,//Сама картинка
		this.drawX, this.drawY, this.width, this.height);// На экране
}



//Функция перемещает объект на 3 пикс.вправо
Player.prototype.update = function(){
	this.chooseDir();
}

//Увеличиваем или уменьшаем координаты X,Y при нажатии стрелок
//Сначала готовим метод, потом вызываем ()
Player.prototype.chooseDir = function(){
	if(this.isUp)
		this.drawY -= this.speed;

	if(this.isDown)
		this.drawY += this.speed;

	if(this.isRight)
		this.drawX += this.speed;

	if(this.isLeft)
		this.drawX -= this.speed;
}


function chekKeyDown(e){
	var keyID = e.keyCode || e.wich; //Поддержка старых брузеров
	var keyChar = String.fromCharCode (keyID);

	if(keyChar == "W"){
		player.isUp = true;
		e.preventDefault();
	}
	if(keyChar == "S"){
		player.isDown = true;
		e.preventDefault();
	}
	if(keyChar == "D"){
		player.isRight = true;
		e.preventDefault();
	}
	if(keyChar == "A"){
		player.isLeft = true;
		e.preventDefault();
	}
}

function checkKeyUp(e){
	var keyID = e.keyCode || e.wich; //Поддержка старых брузеров
	var keyChar = String.fromCharCode (keyID);

	if(keyChar == "W"){
		player.isUp = false;
		e.preventDefault();
	}
	if(keyChar == "S"){
		player.isDown = false;
		e.preventDefault();
	}
	if(keyChar == "D"){
		player.isRight = false;
		e.preventDefault();
	}
	if(keyChar == "A"){
		player.isLeft = false;
		e.preventDefault();
	}
}

function drawRect(){

	ctxMap.fillStyle = "#3D3D3D";
	ctxMap.fillRect(10, 10, 100, 100); //Координаты , ширина и высота
}

function clearRect(){
	ctxMap.clearRect(0, 0, 800, 500);
}


//Очищаем область в канвасе в координатах 0 0 (Чтобы объекты не оставляли за собой след)
function clearCtxPlayer(){
	//Очищаем прямоугольную область
	ctxPl.clearRect(0, 0, gameWidth, gameHeight);
}

function clearCtxEnemy(){
	//Очищаем прямоугольную область
	ctxEnemy.clearRect(0, 0, gameWidth, gameHeight);
}

//Рисуем фон
function drawBg(){
	ctxMap.drawImage(background, 0, 0, 800, 480,//Сама картинка
		0, 0, gameWidth, gameHeight);// На экране

}
