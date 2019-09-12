import Phaser from 'phaser';

var config = {
	type: Phaser.CANVAS,
	canvas: document.getElementById('game'),
	parent: 'content',
	scale: {
		mode: Phaser.Scale.PORTRAIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: '100%',
		height: '100%'
	},
	scene: [],
	dom: {
		createContainer: true
	},
	render: {
		antiAlias: false,
		pixelArt: false,
		roundPixels: false
	},
	autoRound: false
};

const game = new Phaser.Game(config);
