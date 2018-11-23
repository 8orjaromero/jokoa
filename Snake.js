//Aldagai globalak
var abiadura = 75;
var tamaina = 20;

class objetua {
	constructor(){
		this.tamaina = tamaina;
	}
	kolpe(obj){
		//Math.abs balio absolutua izateko
		var difx = Math.abs(this.x - obj.x);
		var dify = Math.abs(this.y - obj.y);
		//Funtzio honen bidez, sugea bere gorputzaren aurka jo den ala ez ikusi daiteke
		if(difx >= 0 && difx < tamaina && dify >= 0 && dify < tamaina){
			return true;
		} else {
			return false;
		}
	}
}

//Extends-ek esan nahi du Objetua funtzioaren azpiklase bat dela, beraz, horko aldagaiak heredatuko ditu 
class Sugea extends objetua {
	constructor(x,y){
		super();
		this.x = x;
		this.y = y;
		this.hurrengoa = null;
	}
	marraztu(ctx){
		if(this.hurrengoa != null){
			this.hurrengoa.marraztu(ctx);
		}
		ctx.fillStyle = "#005F00";
		ctx.fillRect(this.x, this.y, this.tamaina, this.tamaina);
	}
	setxy(x,y){
		if(this.hurrengoa != null){
			this.hurrengoa.setxy(this.x, this.y);
		}
		this.x = x;
		this.y = y;
	}
	sartu(){
		if(this.hurrengoa == null){
			this.hurrengoa = new Sugea(this.x, this.y);
		} else {
			this.hurrengoa.sartu();
		}
	}
	verHurrengoa(){
		return this.hurrengoa;
	}
}

class Janaria extends objetua {
	constructor(){
		super();
		this.x = this.sortu();
		this.y = this.sortu();
	}
	//janaria sortzeko
	sortu(){
		var num = (Math.floor(Math.random() * 59))*10;
		return num;
	}
	//janaria leku desberdinetan jartzeko
	jarri(){
		this.x = this.sortu();
		this.y = this.sortu();
	}
	//janaria marrazteko
	marraztu(ctx){
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.x, this.y, this.tamaina, this.tamaina);
	}
}
//Jokuko objetuak
var burua = new Sugea(20,20);
var janaria = new Janaria();
var ardatzx = true;
var ardatzy = true;
var xdir = 0;
var ydir = 0;

//Mugimendua eragingo duen funtzioa
function mugimendua(){
	//Aldagai honeen bidez funtzioari mugimenduaren direkzioa emateko balio dute
	var nx = burua.x+xdir;
	var ny = burua.y+ydir;
	burua.setxy(nx,ny);
}
//Teklen agindua jasotzeko
function kontrol(event){
	var cod = event.keyCode;
	//Ezin izateko atzera joan
	if(ardatzx){
		//gorantz eta beherantz mugitzeko, teklatuko teklei emanda
		if(cod == 38){
			ydir = -tamaina;
			xdir = 0;
			ardatzx = false;
			ardatzy = true;
		}
		if(cod == 40){
			ydir = tamaina;
			xdir = 0;
			ardatzx = false;
			ardatzy = true;
		}
	}
	if(ardatzy){
		//ezkerrerantz eta eskumarantz mugitzeko, teklatuko teklei emanda
		if(cod == 37){
			ydir = 0;
			xdir = -tamaina;
			ardatzy = false;
			ardatzx = true;
		}
		if(cod == 39){
			ydir = 0;
			xdir = tamaina;
			ardatzy = false;
			ardatzy = true;
		}
	}
}

//Jokoaren amaiera 
function jokoarenAmaiera(){
	xdir = 0;
	ydir = 0;
	ardatzx = true;
	ardatxy = true;
	burua = new Sugea(20,20);
	janaria = new Janaria();
	alert("Hil egin zara!");
}
//Hormaren aurka jotzen bada jokoaren amaiera izatea
function choquehorma(){
	if(burua.x < 0 || burua.x > 590 || burua.y < 0 || burua.y > 590){
		jokoarenAmaiera();
	}
}
//Bere buruaren aurka jo ezkero jokoaren amaiera izatea
function choquegorputza(){
	var temp = null;
	try{
		temp = burua.verHurrengoa().verHurrengoa();
	}catch(err){
		temp = null;
	}
	while(temp != null){
		if(burua.kolpe(temp)){
			//jokoa amaitu egiten da
			jokoarenAmaiera();
		} else {
			temp = temp.verHurrengoa();
		}
	}
}

//Marrazkia egiteko funtzioa
function marraztu(){
	//Canvas-era sarbidea
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	//Karratua garbitzeko
	ctx.clearRect(0,0, canvas.width, canvas.height);
	//hemen doa marrazkia
	burua.marraztu(ctx);
	janaria.marraztu(ctx);
}
function nagusia(){
	choquegorputza();
	choquehorma();
	marraztu();
	mugimendua();
	if(burua.kolpe(janaria)){
		janaria.jarri();
		burua.sartu();
	}
}
//Funtzioari "abiadura" aldagaiaren arabera  x aldiz deituko dio
setInterval("nagusia()", abiadura);
	