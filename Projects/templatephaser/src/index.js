import Phaser from 'phaser';

import BootScene from '../src/Js/Scene/boot/boot_scene_controller';
import LoadingScene from '../src/Js/scene/loading/loading_scene_controller';
import TitleScene from '../src/Js/Scene/title/title_scene_controller';
import GameplayScene from '../src/Js/Scene/gameplay/gameplay_scene_controller';

var config = {
	type: Phaser.CANVAS,
	canvas: document.getElementById('game'),
	parent: 'content',
	scale: {
		mode: Phaser.Scale.PORTRAIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: window.innerWidth,
		height: window.innerHeight
	},
	scene: [
		BootScene,
		LoadingScene, 
		TitleScene,
		GameplayScene
	],
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
