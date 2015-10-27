#pragma strict

class Skill
{
	var type : ESkillType = ESkillType.Melee;

	var probability : float = 1.0;
	
	var alwaysCanAttack : boolean = false;
	
	var beginAnimationType : EAnimationType = EAnimationType.Invalid;
	
	var animationType : EAnimationType = EAnimationType.Idle;
	
	var endAnimationType : EAnimationType = EAnimationType.Invalid;

	var stun : int = 20;
	var stamina : int = 30;
	
	var attackRange : float = 1;
	var levelCount : int = 0;
	
	var durationAsAnimation : boolean = true;
	var duration : float = 0; 
	
	//----------------------------------------------------------------
	var coolDowntime : float = 0;
	
	var durations : float[];
	var attackAdditiveRate : float[];
	var coolDowntimeReductionRate : float[];
	
	var invincible : boolean = false;
	
	var effectiveObj : GameObject;
	
	var effect : GameObject;
	
	// Self Impulse
	var selfImpulse : Vector3 = Vector3.zero;
	
	// For attack other
	var impulse : Vector3 = Vector3(0, 0, 0);
	
	var multiTimeHurt : boolean = false;
	
	var hurtDeltaTime : float = 0.3;
	//----------------------------------------------------------------
	
	//----------------------------------------------------------------
	// For summon attack
	var useSummon : boolean = false;
	
	var summonType : EGamePool;
	
	var summonCount : int = 1;
	
	var summonedActorDirectionSameAsMaster : boolean = true;
	
	var summonedActorInitPositionOffset : Vector3 = Vector3.zero;
	
	var summonedActorRandomOffset : Vector3 = Vector3.zero;
	
	var summonedActorInitImpulse : Vector3 = Vector3.zero;
	//----------------------------------------------------------------
	
	// Audio
	var attackSucceedAudio : int = -1;
	
	// Buff
	var buffs : BuffInfo[];
	
	@System.NonSerialized
	var currentLevel : int = -1; // Need to save / load
	
	function GetAttackAdditiveRate() : float
	{
		return currentLevel >= 0 ? attackAdditiveRate[currentLevel] : 0;
	}
	
	function GetCoolDowntimeReductionRate() : float
	{
		return currentLevel >= 0 ? attackAdditiveRate[currentLevel] : 0;
	}
	
	function GetCoolDownTime() : float
	{
		//Debug.Log(" current level : " + currentLevel);
		return currentLevel >= 0 ? coolDowntime * ( 1 - coolDowntimeReductionRate[currentLevel]): coolDowntime;
	}
	
	function GetBuffs() : BuffInfo[]
	{
		for (var i = 0; i < buffs.length; ++i)
		{
			buffs[i].currentLevel = currentLevel;
		}
		
		return buffs;
	}
	
	function GetDuration() : float
	{
		if (durations.length == 0 || currentLevel < 0)
		{
			return duration;
		}
		else
		{
			return durations[currentLevel];
		}
	}
};

enum ESkillType
{
	Invalid = 0,
	Melee,
	HeavyAttack,
	ShoulderAttack,
	JumpAttack,
	BattleCry,
	BattleFury,
	BladeRush,
	WhrilWind,
	EarthQuake,
	Jump,
	
	Count,
	ForceTo32Bytes = 0x7FFFFFFF
};