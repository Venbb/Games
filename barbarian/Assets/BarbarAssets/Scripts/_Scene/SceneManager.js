// Scene Manager is the main manager of every thing in a level
// You can get every thing from scene manager
#pragma strict

enum EAxis
{
	AxisX = 0,
	AxisY,
	AxisZ
}

class ActorPrefab
{
	var prefab : GameObject;
	var name : String;
	var spawnPoint : GameObject;
}

var m_mainCamera : Camera = null;
var m_fixedAxis = EAxis.AxisZ;

var m_actorPrefabs : ActorPrefab[];

private static var m_instance : SceneManager = null;

private var m_actors : ControllableActor[];

private var m_enemyArray : Array = null;
private var m_activeEnemyArray : Array = null;
private var m_pause : boolean = false;

private var i : int = 0;

function Awake()
{
	if (m_instance == null)
	{
		m_instance = this;
	}
	else 
	{
		Debug.LogError("SceneManager is a singleton, should not be created more than once.");
	}
	
	m_enemyArray = new Array();
	m_activeEnemyArray = new Array();	
	
	m_pause = false;
	
	Load();	
	
	StopGame(false);
}

function Start()
{
	(GetMainCamera().GetComponent(CameraScrolling) as CameraScrolling).SetTarget( m_actors[GameManager.Singleton().GetMainActorId()].gameObject.transform, true);
	
	//InputManager.GetInstance().Register(m_actors[GameManager.Singleton().GetMainActorId()].gameObject);
}

function GetActorPrefabByName(name : String) : ActorPrefab
{
	for (var i = 0; i < m_actorPrefabs.length; ++i)
	{
		if (m_actorPrefabs[i].name == name)
		{
			return m_actorPrefabs[i];
		}
	}
}

function IsPlatform_Phone() : boolean
{
	return IsPlatform_IPhone() || IsPlatform_Android();
}

function IsPlatform_IPhone() : boolean
{
	return Application.platform == RuntimePlatform.IPhonePlayer;
}

function IsPlatform_Android() : boolean
{
	return Application.platform == RuntimePlatform.Android;
}

function GetScreenWidth() : float
{
	var result : float = 0;
	
	switch (Application.platform)
	{
	case RuntimePlatform.IPhonePlayer: 
		result  = Screen.width;
		break;
	case RuntimePlatform.Android: 
		result  = Screen.width;
		break;
	default : 
		result  = Screen.width;
		break;
	}
	
	return result;
}
function GetScreenHeight() : float
{
	var result : float = 0;
	
	switch (Application.platform)
	{
	case RuntimePlatform.IPhonePlayer: 
		result = Screen.height;
		break;
	case RuntimePlatform.Android: 
		result = Screen.height;
		break;
	default : 
		result = Screen.height;
		break;
	}
	
	return result;
}

function OnDestroy()
{
	m_instance = null;
}

static function Singleton() : SceneManager
{
	//if (m_instance == null)
	//{
		//Debug.LogError("SceneManager should not be null");
	//}
	
	return m_instance;
}

function SetFixedAxis(axis : EAxis)
{
	m_fixedAxis = axis;
}

function GetFixedAxis() : EAxis
{
	return m_fixedAxis;
}

function GetMainCamera() : Camera
{
	Assert.Singleton().AssertNullObject(m_mainCamera);
	return m_mainCamera;
}

function SetMainCamera(camera : Camera)
{
	Assert.Singleton().AssertNullObject(camera);
	m_mainCamera = camera;
}

function GetMainActor() : ControllableActor
{
	//Debug.Log("m_mainActor : " + m_mainActor);
	Assert.Singleton().AssertNullObject(m_actors[GameManager.Singleton().GetMainActorId()]);
	return m_actors[GameManager.Singleton().GetMainActorId()];
}

//function SetMainActor(actor : ControllableActor)
//{
//	Assert.Singleton().AssertNullObject(actor);
//	m_mainActor = actor;
//}

function GetEnemy() : Array
{
	return m_enemyArray;
}

function GetActiveEnemy() : Array
{
	return m_activeEnemyArray;
}

function RegisterEnemy(enemy : GameObject)
{
	Assert.Singleton().AssertNullObject(enemy);
	// Check dupilicate
	// if (0) { return; }
	
	m_enemyArray.Push(enemy);
}


function UnregisterEnemy(enemy : GameObject)
{
	if (enemy == null)
	{
		return ;
	}
	
	var i : int = 0;
	
	// Remove form enemy array
	for (i = 0; i < m_enemyArray.length; ++i)
	{
		if (m_enemyArray[i] == enemy)
		{
			m_enemyArray.RemoveAt(i);
			break;
		}
	}
	
	// Remove form active enemy array
	for (i = 0; i < m_activeEnemyArray.length; ++i)
	{
		if (m_activeEnemyArray[i] == enemy)
		{
			m_activeEnemyArray.RemoveAt(i);
			break;
		}
	}
}

function StopGame(pause : boolean)
{
	m_pause = pause;
	Time.timeScale = m_pause ? 0 : GameManager.Singleton().GetOriTimeScale();
}

function IsGamePaused()
{
	return m_pause && !IsGameOver();
}

function IsGameOver()
{
	return GetMainActor().IsDead();
}

function RestartGame()
{
}

function Update()
{
	m_activeEnemyArray.Clear();
	
	for (var i : int = 0; i < m_enemyArray.length; ++i)
	{
		if ((m_enemyArray[i] as Actor).enabled)
		{
			m_activeEnemyArray.Push(m_enemyArray[i]);
		}
	}
}

function Save(nextLevel : String)
{
	var gameManager : GameManager = GameManager.Singleton();
	
	var gameData : GameData = gameManager.GetGameData(gameManager.GetMainActorId());
	
	gameData.m_level = nextLevel;
	
	for (i = 0; i < gameManager.GetPlayerCount(); ++i)
	{
		m_actors[i].Save(gameManager.GetGameData(i));
	}
	
	GameManager.Singleton().Save();
}

function Load()
{
	var gameManager : GameManager = GameManager.Singleton();

	if ( !gameManager.IsFirstTimeRunGame() )
	{
		gameManager.Load();
	}
	
	var actorPrefab : ActorPrefab = null;
	var clone : Object = null;
	m_actors = new ControllableActor[gameManager.GetPlayerCount()];
		
	for (i = 0; i < gameManager.GetPlayerCount(); ++i)
	{
		actorPrefab = GetActorPrefabByName(gameManager.GetActorNameByPlayerId(i));
		clone = Instantiate(actorPrefab.prefab, actorPrefab.spawnPoint.transform.position, Quaternion.identity);
		m_actors[i] = (clone as GameObject).GetComponent(ControllableActor) as ControllableActor;
		m_actors[i].SetSpawnPoint(actorPrefab.spawnPoint);
	}
	
	// For develop only
	if (gameManager.GetPlayerCount() == 0)
	{
		GameManager.Singleton().SetPlayerCount(1);
		GameManager.Singleton().SetActor("Kato", 0);
		GameManager.Singleton().Load();
		GameManager.Singleton().CheckFirstRunGame();
		
		m_actors = new ControllableActor[gameManager.GetPlayerCount()];
		
		for (i = 0; i < gameManager.GetPlayerCount(); ++i)
		{
			actorPrefab = GetActorPrefabByName(gameManager.GetActorNameByPlayerId(i));
			clone = Instantiate(actorPrefab.prefab, actorPrefab.spawnPoint.transform.position, Quaternion.identity);
			m_actors[i] = (clone as GameObject).GetComponent(ControllableActor) as ControllableActor;
			m_actors[i].SetSpawnPoint(actorPrefab.spawnPoint);
		}
	}
	
	// Load data to game
	LoadGameData();
}

private function LoadGameData()
{
	var gameManager : GameManager = GameManager.Singleton();
	
	if ( !gameManager.IsFirstTimeRunGame() )
	{
		for (i = 0; i < gameManager.GetPlayerCount(); ++i)
		{
			m_actors[i].Load(gameManager.GetGameData(i));
		}
	}
}


function LoadDataToActor()
{
	var gameManager : GameManager = GameManager.Singleton();
	
	if ( gameManager.IsFirstTimeRunGame() )
	{
		return ;
	}
	
	gameManager.Load();
	
	LoadGameData();
}

function OnApplicationPause(pause : boolean)
{
    //print ("paused! : " + pause);
    if (!IsGamePaused() && pause == true && !IsGameOver())
    {
    	StopGame(pause);
    	
    }
}
