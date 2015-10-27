#pragma strict

class ActorPhysicsInfo
{
	// The speed when walking 
	var m_walkSpeed : float = 3.0;
	// The speed when running
	var m_runSpeed : float = 10.0;

	// JumpSpeed
	var m_walkJumpSpeed : float = 10;
	var m_runJumpSpeed : float = 20;
	
	var m_walkJumpSpeedAdjust : float = 10;
	var m_runJumpSpeedAdjust : float = 20;
}