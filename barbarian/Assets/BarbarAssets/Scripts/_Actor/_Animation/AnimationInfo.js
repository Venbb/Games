
#pragma strict

class AnimationInfo
{
	var type : EAnimationType = EAnimationType.Idle;
	var speedModifier : float = 1;
	var layer : int = 0;
	//var wrapMode : WrapMode = WrapMode.Once;
	var blendMode : AnimationBlendMode = AnimationBlendMode.Blend;
}
