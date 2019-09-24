import Phaser from 'phaser';

import BootScene from '../src/Js/Scene/boot/boot_scene_controller';
import LoadingScene from '../src/Js/scene/loading/loading_scene_controller';
import TitleScene from '../src/Js/Scene/title/title_scene_controller';
import GameplayScene from '../src/Js/Scene/gameplay/gameplay_scene_controller';

let actualWidth = window.innerWidth < 480 ? window.innerWidth * window.devicePixelRatio : window.innerWidth;
let actualHeight = window.innerWidth < 480 ? window.innerHeight * window.devicePixelRatio : window.innerHeight;
let actualZoom = window.innerWidth < 480 ? 1 / window.devicePixelRatio : 1;
let isLandscape = window.innerWidth > window.innerHeight;
if(isLandscape){
  actualWidth = actualHeight * (3/4);
}

var config = {
	type: Phaser.CANVAS,
	canvas: document.getElementById('game'),
	parent: 'content',
	scale: {
		mode: Phaser.Scale.NONE,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: actualWidth,
		height: actualHeight,
		zoom: actualZoom
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
