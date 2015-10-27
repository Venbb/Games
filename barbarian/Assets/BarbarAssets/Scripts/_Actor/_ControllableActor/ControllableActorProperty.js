#pragma strict

enum EPropertyType
{
	Hp = 0,
	Attack,
	Defence,
	Stun,
	Stamina,
	Skill, // Use detail skill type to identity
	
	Count,
	ForceTo32Bytes = 0x7FFFFFFF
};

enum EPropertyAdditionalType
{
	Hp = 0,
	Attack,
	Defence,
	Stamina,
	CoolDownTime,
	DurationTime,
	Stun,
	
	Count,
	ForceTo32Bytes = 0x7FFFFFFF
}

class ControllableActorPropertyLevel
{
	var moneyNeed : int;
	//var 
	var additionals : ControllableActorPropertyAdditional[];
}

class ControllableActorPropertyAdditional
{
	var additionalType : EPropertyAdditionalType;
	var value : String;
}

class ControllableActorPropertyData
{
	var propertyType : EPropertyType;
	var skillType : ESkillType;	
	
	var chooseable : boolean = false;
	
	var currentLevel : int = 9;
	
	var nameInfo : HudInfo;
	
	var introductionInfo : HudInfo;
	
	//var locked : boolean = false;
	
	var levelList : ControllableActorPropertyLevel[];
	
	function IsLocked() : boolean
	{
		return currentLevel < 0;
	}
}
