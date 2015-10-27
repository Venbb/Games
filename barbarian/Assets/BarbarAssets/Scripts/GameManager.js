// 2011.08, yun.li

#pragma strict

class GameManager
{

private var m_maxPlayerCount : int = 4;
private var m_playerCount : int = 0;
private var m_gameData : GameData[];
private var m_actorName : String[];
private var m_actorController : int[];

private var m_gameDifficulty : int = -1;

private var m_isFirstTimeRunGame : boolean = true;
private var m_oriTimeScale : float = 0;

//---------------


static private var m_instance : GameManager = null;

static function Singleton() : GameManager
{
	if (m_instance == null)
	{
		m_instance = new GameManager();
	}
	
	return m_instance;
}

//---------------------



private function GameManager()
{	
	// Check is first time run game
	//CheckFirstRunGame();
	m_gameData = new GameData[m_maxPlayerCount];
	m_actorName = new String[m_maxPlayerCount];
	m_actorController = new int[m_maxPlayerCount];
	m_oriTimeScale = Time.timeScale;
	
	for (var i = 0; i < m_maxPlayerCount; ++i)
	{
		m_gameData[i] = new GameData();
		m_actorName[i] = "";
		m_actorController[i] = 0;
	}
}

function Reset()
{
	m_isFirstTimeRunGame = true;
	ControllableActor.m_firsteTimeForGame = true;
	PreviewLabs.PlayerPrefs.SetBool("m_isFirstTimeRunGame", true);
	PreviewLabs.PlayerPrefs.Flush();
}

function Update()
{
}

function GetOriTimeScale() : float
{
	return m_oriTimeScale;
}

function CheckFirstRunGame()
{
	if ( PreviewLabs.PlayerPrefs.HasKey("m_isFirstTimeRunGame") && !PreviewLabs.PlayerPrefs.GetBool("m_isFirstTimeRunGame"))
	{
		//Debug.Log(" m_isFirstTimeRunGame " + m_isFirstTimeRunGame);
		m_isFirstTimeRunGame = false;
	}
	else
	{
		//Debug.Log(" m_isFirstTimeRunGame " + m_isFirstTimeRunGame);
		m_isFirstTimeRunGame = true;
	}
}

function Load() : boolean
{
	// Get name from type
	for (var i = 0; i < m_playerCount; ++i)
	{
		//Debug.Log(i);
		//Debug.Log(m_actorName[i]);
		//Debug.Log(m_gameData[i]);
		
		m_gameData[i].SetActor(m_actorName[i]);
		m_gameData[i].Load();
	}
	
	return true;
}

function Save() : boolean
{
	//Debug.Log(" Save ");
	//Debug.Log(m_playerCount);
	
	// Hack, to do
	PreviewLabs.PlayerPrefs.SetString("m_lastPlayedActor", GetGameData(GetMainActorId()).m_actorName);
	
	for (var i = 0; i < m_playerCount; ++i)
	{
		//Debug.Log(i + " Save ");
		m_gameData[i].Save();
	}
	
	if (IsFirstTimeRunGame())
	{	
		PreviewLabs.PlayerPrefs.SetBool("m_isFirstTimeRunGame", false);
		PreviewLabs.PlayerPrefs.Flush();
	}
	
	return true;
}

function GetGameData(playerId : int ) : GameData
{
	return m_gameData[playerId];
}

function NewGame()
{
}

function ContinueGame()
{
}

function GetPlayerCount() : int
{
	return m_playerCount;
}

function SetPlayerCount(count : int)
{
	//Debug.Log("count : " + count);
	m_playerCount = count;
}

function SetActor(actorName : String, playerId : int)
{
	m_actorName[playerId] = actorName;
}

function SetActor(actorName : String, playerId : int, controllerId : int)
{
	// For multiplayer game
	// Not today
	m_actorName[playerId] = actorName;
	m_actorController[playerId] = controllerId;
}

function GetActorNameByPlayerId(playerId : int) : String
{
	return m_actorName[playerId];
}

function GetMainActorId() : int
{
	return 0;
}

function GetDifficulty() : EGameDifficulty
{
	if (m_gameDifficulty == -1)
	{
		m_gameDifficulty =  m_gameData[GetMainActorId()].m_difficulty;
	}
	
	m_gameDifficulty = Mathf.Min(m_gameDifficulty, EGameDifficulty.Count - 1);
	
	return m_gameDifficulty;
}

function SetDifficulty(difficulty : EGameDifficulty)
{
	//Debug.Log("m_gameDifficulty" + difficulty);
	m_gameDifficulty = Mathf.Min(difficulty, EGameDifficulty.Count - 1);
	m_gameData[GetMainActorId()].m_difficulty = m_gameDifficulty;
}

function IsFirstTimeRunGame() : boolean
{
	if (m_isFirstTimeRunGame)
	{
		CheckFirstRunGame();
	}
	
	return m_isFirstTimeRunGame;
}
}