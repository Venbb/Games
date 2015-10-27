#pragma strict

class BuffInfo
{
	var buffType : EBuffType;
	var isSelfOnly : boolean = false;
	
	var durations : float[];
	
	var attackAdditiveRate : float[];
	var hpAdditiveRate : float[];
	var scaleRate : float[];
	
	@System.NonSerialized
	var currentLevel : int = 0;
	
	function GetDuration() : float
	{
		return currentLevel >= 0 ? durations[currentLevel] : durations[0];
	}
	
	function GetAttackAdditiveRate() : float
	{
		return currentLevel >= 0 ? attackAdditiveRate[currentLevel] : attackAdditiveRate[0];
	}
	
	function GetHpAdditiveRate() : float
	{
		return currentLevel >= 0 ? hpAdditiveRate[currentLevel] : hpAdditiveRate[0];
	}
	
	function GetScaleRate() : float
	{
		return currentLevel >= 0 ? scaleRate[currentLevel] : scaleRate[0];
	}
};