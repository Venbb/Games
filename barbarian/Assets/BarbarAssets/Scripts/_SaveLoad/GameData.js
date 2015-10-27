#pragma strict

import System.Collections.Generic;

enum EGameDifficulty
{
	Normal = 0,
	Hard,
	NightMare,
	
	Count,
	ForceTo32Bytes = 0x7FFFFFFF
}

class GameData
{
	
var m_actorName : String = "Kato";

var m_level : String = "level1";
var m_difficulty : int = EGameDifficulty.Normal;

//var m_actorType : int = 0;
//var m_actorHp : int = 0;
//var m_actorAttack : int = 0;
//var m_actorDefence : int = 0;
//var m_actorStamina : int = 0;
//var m_actorStunPoint : int = 0;

var m_actorHealthPot : int = 0;
var m_actorMoney : int = 0;

var m_propertyCount : int = 0;
var m_propertyLevel : List.<int> = null;

var m_activeSkillCount : int = 0;
var m_activeSkill : List.<int> = null;

private var i : int = 0;

function GameData()
{
	m_actorName = "Kato";
	m_propertyLevel = new List.<int>();
	m_activeSkill = new List.<int>();
}

function GameData(actorName : String)
{
	m_actorName = actorName;
}

function SetActor(actorName : String)
{
	m_actorName = actorName;
}

function Save()
{
	//PreviewLabs.PlayerPrefs.SetString("m_lastActorName", m_actorName);
	
	PreviewLabs.PlayerPrefs.SetString(m_actorName + "m_level", m_level);
	//Debug.Log("m_difficulty" + m_difficulty);
	PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_difficulty", m_difficulty);
	
	//PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_actorType", m_actorType);
	//PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_actorHp", m_actorHp);
	//PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_actorAttack", m_actorAttack);
	//PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_actorDefence", m_actorDefence);
	//PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_actorStamina", m_actorStamina);
	//PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_actorStunPoint", m_actorStunPoint);
	PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_actorHealthPot", m_actorHealthPot);
	PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_actorMoney", m_actorMoney);
	
	PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_propertyCount", m_propertyCount);
	
	for (i = 0; i < m_propertyCount; ++i)
	{
		PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_property" + i.ToString() + "_Level", m_propertyLevel[i]);
		
		//Debug.Log("Save Index : " + i + " " + m_actorName + "m_property" + i.ToString() + "_Level" + " " + m_propertyLevel[i]);
	}
	
	PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_activeSkillCount", m_activeSkillCount);

	for (i = 0; i < m_activeSkillCount; ++i)
	{
		PreviewLabs.PlayerPrefs.SetInt(m_actorName + "m_activeSkill" + i.ToString(), m_activeSkill[i]);
	}
	
	PreviewLabs.PlayerPrefs.Flush();
}

function Load()
{
	m_level = PreviewLabs.PlayerPrefs.GetString(m_actorName + "m_level");
	m_difficulty = PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_difficulty");
	//Debug.Log("m_difficulty" + m_difficulty);
	//m_actorType = PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_actorType");
	//m_actorHp = PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_actorHp");
	//m_actorAttack = PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_actorAttack");
	//m_actorDefence = PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_actorDefence");
	//m_actorStamina = PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_actorStamina");
	//m_actorStunPoint = PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_actorStunPoint");
	m_actorHealthPot = PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_actorHealthPot");
	m_actorMoney = PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_actorMoney");
	
	m_propertyCount = PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_propertyCount");
	m_propertyLevel.Clear();
	
	for (var i = 0; i < m_propertyCount; ++i)
	{
		m_propertyLevel.Add(PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_property" + i.ToString() + "_Level"));
		
		//Debug.Log("Load Index : " + i + " " + m_actorName + "m_property" + i.ToString() + "_Level" + " " + m_propertyLevel[i]);
	}
	
	m_activeSkillCount = PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_activeSkillCount");
	m_activeSkill.Clear();

	for (i = 0; i < m_activeSkillCount; ++i)
	{
		m_activeSkill.Add(PreviewLabs.PlayerPrefs.GetInt(m_actorName + "m_activeSkill" + i.ToString()));
	}
}

}