
enum EGamePool
{
	Fireball_1 = 0,
	hud,
	fingerMovingParticle,
	Money,
	ShadowSword,
	HealthPot,
	MeterialPreLoader,
	Audio,
	
	Gumaobing_1,
	Gumaobing_2,
	Gumaobing_3,
	
	Gebulin_1,
	
	Piranha_1,
	
	BladeRushBall,
	
	GroundAttacker,
	
	GebulinEx_1_Invalid,
	Gebulin_Axe_1_Invalid,
	Gebulin_Spear_1_Invalid,
	
	Gebulin_2,
	Gebulin_3,
	
	Piranha_2,
	Piranha_3,
	
	Small_boss1_1,
	Small_boss1_2,
	Small_boss1_3,
	
	OrcArcher_1,
	OrcArcher_2,
	OrcArcher_3,
	
	Spider_1,
	Spider_2,
	Spider_3,
	
	OrcWizard_1,
	OrcWizard_2,
	OrcWizard_3,
	
	ZombieKnife_1,
	ZombieKnife_2,
	ZombieKnife_3,
	
	SandWorm_1,
	SandWorm_2,
	SandWorm_3,
	
	EvilBeast_1,
	EvilBeast_2,
	EvilBeast_3,
	
	Tauren_1,
	Tauren_2,
	Tauren_3,
	
	Devil_1,
	Devil_2,
	Devil_3,
	
	Boss1,
	Boss2,
	Boss3,
	Boss4,
	Boss5,
	Boss6,

	PosionBall_1,
	PosionBall_2,
	PosionBall_3,
	
	Arrow_1,
	Arrow_2,
	Arrow_3,
	
	Fireball_2,
	Fireball_3,
	
	FireBall_Boss2,
	
	Singleton_Sword_1,
	Singleton_Sword_2,
	Singleton_Sword_3,
	
	Singleton_Archer_1,
	Singleton_Archer_2,
	Singleton_Archer_3,
	
	Singleton_BigSword_1,
	Singleton_BigSword_2,
	Singleton_BigSword_3,
	
	GebulinEx_1,
	GebulinEx_2,
	GebulinEx_3,
	Gebulin_Axe_1,
	Gebulin_Axe_2,
	Gebulin_Axe_3,
	Gebulin_Spear_1,
	Gebulin_Spear_2,
	Gebulin_Spear_3,
	
	LittleOrc_Spear_1,
	LittleOrc_Spear_2,
	LittleOrc_Spear_3,
	LittleOrc_Axe_1,
	LittleOrc_Axe_2,
	LittleOrc_Axe_3,
	LittleOrc_Club_1,
	LittleOrc_Club_2,
	LittleOrc_Club_3,
	
	BigSpider_1,
	BigSpider_2,
	BigSpider_3,
	
	SmallSpider_1,
	SmallSpider_2,
	SmallSpider_3,
	
	BigHud,
	BigMoney,
	
	NumberHud,
	
	Count,
	ForceTo32Bytes = 0x7FFFFFFF
	// ***DO NOT CHANGE THE ORDER***
	// ***BUT YOU CAN CHANGE THE NAME***
};

// GamePoolElement structure
class GamePoolElement
{
	var type : EGamePool = EGamePool.Fireball_1;
	var gamePool : GamePool;
}

static var m_instance : GamePoolManager = null;

var m_pools : GamePoolElement[];

function Awake()
{
	if (m_instance == null)
	{
		m_instance = this;
	}
	else 
	{
		Debug.LogError("GamePoolManager is a singleton, should not be createdt more than once.");
	}
	
	// preload
	for (var element : GamePoolElement in m_pools)
	{
		element.gamePool.Preload();
	}
}

static function GetInstance() : GamePoolManager
{
	if (m_instance == null)
	{
		Debug.LogError("GamePoolManager should not be null");
	}
	
	return m_instance;
}

function GetPool(type : EGamePool) : GamePool
{
	for (var element : GamePoolElement in m_pools)
	{
		if (element.type == type)
		{
			return element.gamePool;
		}
	}
	
	return null;
}


function InitializeObject(type : EGamePool, spawnPoint : Vector3, eulerAngles : Vector3) : GameObject
{
	var gamePool : GamePool = GetPool(type);
	
	return (gamePool != null) ? gamePool.InitializeObject(spawnPoint, eulerAngles) : null;
}

function KillObject(type : EGamePool, obj : GameObject)
{
	var gamePool : GamePool = GetPool(type);
	
	if (gamePool != null)
	{
		gamePool.KillObject(obj);
	}
}

function OnDestroy()
{
	m_instance = null;
}
