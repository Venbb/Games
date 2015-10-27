#pragma strict

public enum EAnimationType
{ 
	Invalid = 0,
	Idle,
	Walk,
	Run,
	Jump,
	HeavyJump,
	Hurt,
	Fall,
	FallDown,
	Attack1,
	Attack2,
	Attack3,
	HeavyAttack,
	ShoulderAttack,
	JumpAttack,
	BattleCry,
	Rage,
	BladeRush,
	WhrilWind,
	EarthQuake,
	Climb,
	Push,
	GetUp,
	JumpBegin,
	JumpLand,
	Death,
	Stun,
	Attack1_Back,
	Spawn,
	Attack2_Back,
	WhrilWind_Begin,
	WhrilWind_Back,
	
	Count,
	ForceTo32Bytes = 0x7FFFFFFF
};

// Init animation type array
static private var ms_array : Array = new Array
(
"Invalid",
"Idle",
"Walk",
"Run",
"Jump",
"HeavyJump",
"Hurt",
"Fall",
"FallDown",
"Attack1",
"Attack2",
"Attack3",
"EarthQuake",//"HeavyAttack",
"ShoulderAttack",
"JumpAttack",
"BattleCry",
"Rage",
"BladeRush",
"WhrilWind",
"HeavyAttack",//"EarthQuake",
"Climb",
"Push",
"GetUp",
"JumpBegin",
"JumpLand",
"Death",
"Stun",
"Attack1_Back",
"Spawn",
"Attack2_Back",
"WhrilWind_Begin",
"WhrilWind_Back"
);
public static var skillType : String;
static function Get(type : EAnimationType) : String
{
	//Debug.Log(" Type " + type + " animation type : " + ms_array[type]);
	skillType = ms_array[type].ToString();
	return ms_array[type] as String;
	
}
static function Close() : String
{
   return skillType;
}

