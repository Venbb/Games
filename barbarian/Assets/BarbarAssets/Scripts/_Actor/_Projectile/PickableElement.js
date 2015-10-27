#pragma strict

enum EPickableElementType
{
	None = 0,
	Money,
	HealthPot,
	Ring,
	
	Count,
	ForceTo32Bytes = 0x7FFFFFFF
}

class PickableElement extends Actor
{
	var m_offset : Vector3;
	//var m_actorInfo : ActorInfo;
	var m_type : EPickableElementType = EPickableElementType.None;
	private var m_point : int = 1;
	
	var m_minScale : float = 1;
	var m_maxScale : float = 1;
	var m_pointRangeForScaleMin : float = 1;
	var m_pointRangeForScaleMax : float = 1;
	
	var m_useNumberHud : boolean = false;
	var m_numberHudType : EGamePool = EGamePool.NumberHud;
	
	function GetActorInfo() : ActorInfo
	{
		return null;
	}
	
	function Awake()
	{
		super.Awake();
	}
	
	function Start()
	{
	}
	
	function SetPointAndScale(val : int)
	{
		m_point = val;
		var temp : float = Mathf.Max(m_pointRangeForScaleMin, m_point);
		temp = Mathf.Min(m_point, m_pointRangeForScaleMax);
		
		if (m_pointRangeForScaleMin == m_pointRangeForScaleMax)
		{
			temp = 1;
		}
		else
		{
			temp = m_minScale + Mathf.Lerp(0, m_maxScale - m_minScale, (temp - m_pointRangeForScaleMin) / (m_pointRangeForScaleMax - m_pointRangeForScaleMin) );
		}
		
		this.transform.localScale = Vector3(temp, temp, temp);
	}
	
	function OnEnable()
	{
		transform.position += m_offset;
	}
	
	function OnTriggerEnter(collision : Collider)
	{
		if (collision.gameObject == this.gameObject)
		{
			return ;
		}
		
		var obj : GameObject = collision.gameObject;
		
		var actorProxy : ActorProxy = obj.GetComponent(ActorProxy) as ActorProxy;
		
		if (actorProxy == null)
		{
			//Debug.Log("earn money");
			return ;
		}
		
		var actor : ControllableActor = actorProxy.GetActorObject().GetComponent(ControllableActor) as ControllableActor;
		
		if (actor != null)
		{
			actor.IncreaseElement(m_type, m_point);
		}
		
		if (m_audioClipList.length > 0)
		{
			var audioPool : GamePool = GamePoolManager.GetInstance().GetPool(EGamePool.Audio);
			var audioObj : GameObject = audioPool.InitializeObject(this.transform.position);
			var audio : Audio = audioObj.GetComponent(Audio) as Audio;
				
			if (audio != null)
			{
				audio.SetLifeControllCallback(audioPool.KillObject);
				audio.SetClip(m_audioClipList[0]);
				audio.Play();
			}
		}
		
		
		// Display Number Hud
		if (m_useNumberHud)
		{
			var hudPool : GamePool = GamePoolManager.GetInstance().GetPool(m_numberHudType);
			var hudObj : GameObject = hudPool.InitializeObject(this.transform.position);
			var hud : FadeInLabel = hudObj.GetComponent(FadeInLabel) as FadeInLabel;
				
			if (hud != null)
			{
				hud.SetLifeControllCallback(hudPool.KillObject);
				hud.SetInitPosition(this.transform.position);
				hud.SetText("+" + m_point.ToString());
			}
		}
		
		//Debug.Log(m_lifeControllCallback);
		if (m_lifeControllCallback != null)
		{
			m_lifeControllCallback(this.gameObject);
		}
		else
		{
			Destroy(this.gameObject);
		}
	}
}