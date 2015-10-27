#pragma strict

class DamageInfo
{
	var id : int = 0;
	var attacker : GameObject = null;
	var alwaysCanAttack : boolean = false;
	var hurtValue : int = 3;
	var stunValue : int = 0;
	var impulse : Vector3 = Vector3(0, 0, 0);
	
	var buffs : BuffInfo[];
}
