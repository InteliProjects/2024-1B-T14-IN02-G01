let game;
let mainScene;
let barProgress = 0; // Variável global, pode ser acessada pelo HTML e pelo Phaser

function unlockItems() {
    if (unlocks.food && mainScene.food.active && !mainScene.food.visible && !mainScene.food.instanced){
        mainScene.food.setVisible(unlocks.food);
        mainScene.foodSh.setVisible(unlocks.food);
        mainScene.food.instanced = true;
        const explosion = mainScene.add.sprite(300, 95, 'explosion').setScale(1);
        explosion.play('explode');
        console.log('Desbloqueado: Comida');
    }
    if (unlocks.sleep && mainScene.bed.active && !mainScene.bed.visible && !mainScene.bed.instanced){
        mainScene.bed.setVisible(unlocks.sleep);
        mainScene.bedSh.setVisible(unlocks.sleep);
        mainScene.bed.instanced = true;
        const explosion = mainScene.add.sprite(500, 95, 'explosion').setScale(1);
        explosion.play('explode');
        console.log('Desbloqueado: Cama')
    }
}

function mascotAwaken(formElements, totalQuestions) {
        console.log('Cachorro acionado!')
        // Configuração do Phaser
        const config = {
            type: Phaser.AUTO,
            width: 600,
            height: 200,
            parent: 'game-container',
            "transparent": true,
            scale: {
                parent: 'game-container',
                mode: Phaser.Scale.FIT,
                width: 600,
                height: 200
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        game = new Phaser.Game(config);
        let mascot;
        let formProgress = 0;
        let animState = 'idle';
        let animations = ['nod', 'huh', 'happy'];
        let timer;
        let itchTimer;
        let drag = false;
        let prevDrag = 0;

        function preload() {
            this.load.spritesheet('dog', '/mascot/dog.png', { frameWidth: 300, frameHeight: 300 });
            this.load.image('barback', '/mascot/barback.png');
            this.load.image('barfront', '/mascot/barfront.png');
            this.load.image('barshine', '/mascot/barshine.png');
            this.load.image('food', '/mascot/food.png');
            this.load.image('bed', '/mascot/bed.png');
            this.load.spritesheet('hand', '/mascot/hand.png', {frameWidth: 84, frameHeight: 81});
            this.load.spritesheet('explosion', '/mascot/explosion.png', {frameWidth: 125, frameHeight: 125});
        }

        function create() {
            mainScene = this;

            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                drag = true;
                timer = null;
                itchTimer = null;
                animState = 'excited';
                prevDrag = gameObject.x;
                let deltaX = dragX - prevDrag;
                gameObject.rotation += (deltaX * 0.01 - gameObject.rotation) * 0.5;
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
            this.input.on('dragend', function (pointer, gameObject, dragX, dragY, dropped) {
                drag = false;
                gameObject.rotation = 0;
                animState = 'huh';
                    switch (gameObject.name) {
                        case 'food':
                            if (gameObject.x < 200) {
                                animState = 'eat';
                                gameObject.setVisible(false)
                                setTimeout(() => {
                                    gameObject.setVisible(true)
                                }, 800)
                            }
                        gameObject.setPosition(300, 100)
                        break;
                        case 'bed':
                            if (gameObject.x < 200) {
                                animState = 'sleeping';
                                gameObject.setVisible(false)
                                setTimeout(() => {
                                    gameObject.setVisible(true)
                                }, 800)
                            }
                        gameObject.setPosition(500, 100)
                        break;
                    };
            });
            
            this.barBack = this.add.sprite(400, game.config.height-30, "barback");
            this.barFront = this.add.sprite(this.barBack.x, this.barBack.y, "barfront");
            this.barShine = this.add.sprite(this.barBack.x, this.barBack.y - 8, "barshine");
            this.barShine.alpha = 0;
            this.barMask = this.add.sprite(this.barBack.x - 350, this.barBack.y, "barfront");
            this.barMask.visible = false;
            this.barFront.mask = new Phaser.Display.Masks.BitmapMask(this, this.barMask);
            
            this.anims.create({
                key: 'idle',
                frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 1 }),
                frameRate: 4,
                repeat: -1});

            this.anims.create({
                key: 'nod',
                frames: this.anims.generateFrameNumbers('dog', { start: 2, end: 3 }),
                frameRate: 4,
                repeat: -1});

            this.anims.create({
                key: 'huh',
                frames: this.anims.generateFrameNumbers('dog', { start: 4, end: 5 }),
                frameRate: 4,
                repeat: -1});

            this.anims.create({
                key: 'scratch',
                frames: this.anims.generateFrameNumbers('dog', { start: 6, end: 7 }),
                frameRate: 8,
                repeat: -1});

            this.anims.create({
                key: 'happy',
                frames: this.anims.generateFrameNumbers('dog', { frames: [8, 9, 10, 9] }),
                frameRate: 4,
                repeat: -1});

            this.anims.create({
                key: 'excited',
                frames: this.anims.generateFrameNumbers('dog', { start: 11, end: 12 }),
                frameRate: 4,
                repeat: -1});

            this.anims.create({
                key: 'eat',
                frames: this.anims.generateFrameNumbers('dog', { start: 13, end: 14 }),
                frameRate: 4,
                repeat: -1});

            this.anims.create({
                key: 'sleeping',
                frames: this.anims.generateFrameNumbers('dog', { frames: [15, 16, 17, 17, 16, 15] }),
                frameRate: 3,
                repeat: -1});

            this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 8 }),
                frameRate: 10,
                repeat: 0,
                hideOnComplete: true
            });

            mascot = this.add.sprite(120, game.config.height-115, 'dog').setScale(0.8);
            mascot.anims.play('idle', true);
            calculateProgress();

            this.foodSh = this.add.image(300, 100, "food").setVisible(false).setTintFill(0xbdbfbe);;
            this.bedSh = this.add.image(500, 100, "bed").setVisible(false).setScale(0.6).setTintFill(0xbdbfbe);
            this.food = this.add.image(300, 100, "food").setInteractive({draggable: true}).setVisible(false);
            this.bed = this.add.image(500, 100, "bed").setInteractive({draggable: true}).setVisible(false).setScale(0.6);
            this.food.name = 'food';
            this.bed.name = 'bed';
            this.hand = this.add.image(0, 0, "hand").setScale(0.6).setVisible(true);
            this.input.setDefaultCursor('url(/mascot/nullcursor.png), pointer');

            this.input.on('gameout', () => {this.hand.setVisible(false)}, this);
            this.input.on('gameover', () => {this.hand.setVisible(true)}, this);
            this.input.on('pointerdown', () => {this.hand.setFrame(1);});
            this.input.on('pointerup', () => {this.hand.setFrame(0);});

            unlockItems();

        }

        function update() {
            this.barMask.x = this.barBack.x + barProgress*350 - 350;
            mascot.anims.play(animState, true);
            this.hand.setPosition(this.input.x, this.input.y);

            if (Phaser.Math.Between(1, 1000) === 1) {
                if (itchTimer) clearTimeout(itchTimer); // Remove timer que já exista
                    if (animState != 'eat' && animState != 'excited' && animState != 'sleeping') {
                        animState = 'scratch';
                itchTimer = setTimeout(() => {
                    if (animState != 'eat' && animState != 'excited' && animState != 'sleeping') {
                        animState = 'idle'; // Animação retorna a idle após o timeout
                        }
                        itchTimer = null;
                    }, 2000);
                };
            }
        }

        function calculateProgress() {
            let filledQuestions = 0;
            formElements.forEach(formId => {
                filledQuestions += Array.from(document.querySelectorAll(`#${formId} input, #${formId} select`))
                    .filter(input => input.type === 'radio' ? input.checked : input.value.trim() !== '').length;
            });
            formProgress = filledQuestions / totalQuestions;
        }
    
        // Adiciona event listeners para todos os elementos de formulário
        formElements.forEach(formId => {
            document.getElementById(formId).addEventListener('input', (event) => {
                calculateProgress();
                if (animState == 'idle') {
                    animState = animations[Phaser.Math.Between(0, animations.length - 1)]; // Escolhe aleatoriamente uma das animações
                }
                if (timer) clearTimeout(timer); // Remove timer que já exista
                timer = setTimeout(() => {
                    animState = 'idle'; // Animação retorna a idle após o timeout
                    timer = null;
                }, 2000);
            });
        });
    };
