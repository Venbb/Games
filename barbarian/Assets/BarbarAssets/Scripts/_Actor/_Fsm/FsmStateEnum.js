#pragma strict

enum EFsmState
{
	Idle = 0,
	Walk,
	Run,
	Jump,
	Fall,
	Attack,
	Climb,
	Push,
	SpecialAttack,
	Hurt,
	Death,
	Patrol,
	MoveToTarget,
	FallDown,
	FallLand,
	GetUp,
	Stun,
	Prepare,
	MoveAway,
	Spawn,
	OtherControlled,
	Ceiling,
	
	Count,
	ForceTo32Bytes = 0x7FFFFFFF
};