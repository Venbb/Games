/*
 *  ActorAction.js
 *
 *  Created by li yun on 7/6/11.
 *  Copyright 2011 Enveesoft. All rights reserved.
 *
 */
 
#pragma strict

class ActorAction extends ActionBase
{
	protected var m_owner : Actor = null;
			
	function ActorAction(owner : Actor)
	{
		m_owner = owner;
	}
}