// Adjusts the speed at which the walk animation is played back
var walkAnimationSpeedModifier = 2.5;
// Adjusts the speed at which the run animation is played back
var runAnimationSpeedModifier = 1.5;
// Adjusts the speed at which the jump animation is played back
var jumpAnimationSpeedModifier = 2.0;
// Adjusts the speed at which the hang time animation is played back
var jumpLandAnimationSpeedModifier = 3.0;

// Adjusts after how long the falling animation will be 
var hangTimeUntilFallingAnimation = 0.05;

private var jumping = false;

var jumpingLayer = 1;
function Start () {
	animation.Stop();

	// By default loop all animations
	animation.wrapMode = WrapMode.Loop;

	// Jump animation are in a higher layer:
	// Thus when a jump animation is playing it will automatically override all other animations until it is faded out.
	// This simplifies the animation script because we can just keep playing the walk / run / idle cycle without having to spcial case jumping animations.
	var jumpingLayer = 1;
	/*var jump = animation["jump"];
	jump.layer = jumpingLayer;
	jump.speed *= jumpAnimationSpeedModifier;
	jump.wrapMode = WrapMode.Once;
	
	var jumpFall = animation["jumpFall"];
	jumpFall.layer = jumpingLayer;
	jumpFall.wrapMode = WrapMode.ClampForever;

	var jumpLand = animation["jumpLand"];
	jumpLand.layer = jumpingLayer;
	jumpLand.speed *= jumpLandAnimationSpeedModifier;
	jumpLand.wrapMode = WrapMode.Once;

	var run = animation["run"];
	run.speed *= runAnimationSpeedModifier;
	
	var walk = animation["walk"];
	walk.speed *= walkAnimationSpeedModifier; */
}

function Update () {
	var controller : PlatformerController = GetComponent(PlatformerController);


			animation.CrossFade ("walk", 0.5);


}

function DidJump () {
	animation.Play ("jump");
	animation.PlayQueued ("jumpFall");
}

function DidLand () {
	animation.Stop ("jumpFall");
	animation.Play ("jumpLand");
	animation.Blend ("jumpLand", 0);
}
