#pragma strict

enum ECamp
{
	Savage = 0,
	Orc
}

class ActorInfo
{	
	var hp : int = 100; // Hp
	var attack : int = 50; // Attack value
	var defence : int = 20; // Defence value
	var camp : ECamp = ECamp.Orc; // Camp
	var stun : int = 50; // Stun
	
	static var MAX_DEFENCE : float = 600;
	
	var scale : Vector2 = Vector2(1, 2);
	
	var stunable : boolean = true;
	
	function GetStamina() : int
	{
		return 0;
	}
}

class ControllableActorInfo extends ActorInfo
{
	var stamina : int = 100; // Stamina value
	var money : int = 0; // Money
	var healthPot : int = 0; // Health Pot
	
	var hpList : int[];
	var attackList : int[];
	var defenceList : int[];
	var stunList : int[];
	var staminaList : int[];
	
	private var m_currentHpLevel : int = 0;
	private var m_currentAttackLevel : int = 0;
	private var m_currentDefenceLevel : int = 0;
	private var m_currentStunLevel : int = 0;
	private var m_currentStaminaLevel : int = 0;
	
	function GetStamina() : int
	{
		return stamina;
	}
	
	
	function SetHpLevel(level : int)
	{
		m_currentHpLevel = level;
		hp = OnSetLevel(level, hpList);
	}
	
	function SetAttackLevel(level : int)
	{
		m_currentAttackLevel = level;
		attack = OnSetLevel(level, attackList);
	}
	
	function SetDefenceLevel(level : int)
	{
		m_currentDefenceLevel = level;
		defence = OnSetLevel(level, defenceList);
	}
	
	function SetStunLevel(level : int)
	{
		m_currentStunLevel = level;
		stun = OnSetLevel(level, stunList);
	}
	
	function SetStaminaLevel(level : int)
	{
		m_currentStaminaLevel = level;
		stamina = OnSetLevel(level, staminaList);
	}
	
	function OnSetLevel(level : int, propertyList : int[]) : int
	{
		return propertyList[level];
	}
}

class Loot
{
	var itemType : EGamePool;
	var eachPoint : int = 1;
	var dropProbability : float = 1;
	var dropCount : int[];
}

class EnemyInfo extends ActorInfo
{
	var lootList : Loot[];
	
	var modeFactor : float[];
}

