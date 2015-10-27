//#pragma strict

var m_animationInfoList : AnimationInfo[];
var m_animateOnlyIfVisible : boolean = true;
//var m_defaultWrapMode : WrapMode = WrapMode.Loop;

function Start()
{
//	var actor : Actor = GetComponent(Actor) as Actor;
//	if (actor.GetAnimation() != null)
//	{
//		//actor.GetAnimation().wrapMode = m_defaultWrapMode;
//		actor.GetAnimation().animateOnlyIfVisible = m_animateOnlyIfVisible;
//	
//		// Init animations
//		for (var i : int = 0; i < m_animationInfoList.Length; ++i)
//		{
//			// No assert, for there'll be a error if it's null as the beginning.
//			var ani : AnimationState = actor.GetAnimation()[ AnimationType.Get(m_animationInfoList[i].type) ];
//			if (ani != null)
//			{
//				ani.speed *= m_animationInfoList[i].speedModifier;
//				ani.layer = m_animationInfoList[i].layer;
//				//ani.wrapMode = m_animationInfoList[i].wrapMode;
//				ani.blendMode = m_animationInfoList[i].blendMode;
//			}
//			else
//			{
//				Debug.Log("No animation " + m_animationInfoList[i].type + " in " + this.gameObject);
//			}
//		}
//	}
}

@script RequireComponent(Actor);