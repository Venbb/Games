/*
 *  ActionBase.js
 *
 *  Created by li yun on 7/6/11.
 *  Copyright 2011 Enveesoft. All rights reserved.
 *
 */
 
#pragma strict

class ActionBase
{
	protected var m_isFinishedSuccess : boolean = false;
	
	function ActionBase()
	{
		
	}
	
	function Enter()
	{
		Debug.LogError("No implement in ActionBase");
	}
	
	function Update() : boolean
	{
		Debug.LogError("No implement in ActionBase");
		return true;
	}
	
	function Exit()
	{
		Debug.LogError("No implement in ActionBase");
	}
	
	function IsFinishedSuccess() : boolean
	{
		return m_isFinishedSuccess;
	}
}
