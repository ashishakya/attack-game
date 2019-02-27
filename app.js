new Vue({
	el:'#app',
	data:{
		playerHealth: 100,
		monsterHealth: 100,	
		gameIsRunning: false,
		turns: []
	},
	methods:{
		startGame(){
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.turns= [];
		},
		attack(){
			var damage = this.calculateDamage(3, 10)
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer:true,
				text:'Player hits monster for ' + damage
			});

			if(this.checkWin()){
				return;
			}

			this.monsterAttack();
		},
		specialAttack(){
			var damage = this.calculateDamage(10, 20)
			this.monsterHealth -= damage;

			this.turns.unshift({
				isPlayer:true,
				text:'Player hits monster hard for ' + damage
			});
			if(this.checkWin()){
				return;
			}

			this.monsterAttack();

		},
		heal(){
			this.playerHealth += 10;
			this.turns.unshift({
				isPlayer:true,
				text:'Player healed for 10'
			});		
			this.monsterAttack();
		},
		giveUp(){
			this.gameIsRunning = false;
			this.turns.unshift({
				isPlayer:true,
				text:'Player has given up.'
			});	
		},
		calculateDamage(min, max){
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkWin(){
			if(this.monsterHealth <=0 ){
				if(confirm("You won. New game?")){
					this.startGame();
				}else{
					this.gameIsRunning =false;
				}
				return true;
			} else if(this.playerHealth <=0){
				if(confirm("You lost. New game?")){
					this.startGame();
				}else{
					this.gameIsRunning =false;
				}
				return true;
			}
			return false;
		},
		monsterAttack(){
			var damage = this.calculateDamage(5, 12);
			this.playerHealth -= damage;
		
			this.checkWin();

			this.turns.unshift({
				isPlayer:false,
				text:'monsters hits player for ' + damage
			});
		}
	}
});
