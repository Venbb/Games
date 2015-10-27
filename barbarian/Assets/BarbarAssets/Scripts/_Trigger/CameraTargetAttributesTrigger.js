#pragma strict

// For now, we only use this for modify the bounds of camera

private var m_cameraTargetAttributes : CameraTargetAttributes = null;
private var m_cameraTargetAttributesMofifier : CameraTargetAttributesModifier = null;

function Awake()
{
	m_cameraTargetAttributes = GetComponent(CameraTargetAttributes) as CameraTargetAttributes;
	
	if (m_cameraTargetAttributes == null)
	{
		Debug.LogError("You can't put CameraTargetAttributsTrigger into a GameObject not having CameraTargetAttributs.");
	}
}

function OnTriggerEnter(collision : Collider)
{	
    var trigger : GameObject = collision.gameObject;
	
	switch(trigger.tag)
	{
	case  "CameraTargetAttributesModifier" :
		m_cameraTargetAttributesMofifier = trigger.GetComponent(CameraTargetAttributesModifier) as CameraTargetAttributesModifier;
		if (m_cameraTargetAttributesMofifier != null)
		{
			m_cameraTargetAttributes.SetBounds( m_cameraTargetAttributesMofifier.GetBounds() );
		}
		break;
	default : 
		break;
	}
}

function OnTriggerExit(collision : Collider)
{
    var trigger : GameObject = collision.gameObject;
	
	switch(trigger.tag)
	{
	case  "CameraTargetAttributesModifier" :
		m_cameraTargetAttributesMofifier = trigger.GetComponent(CameraTargetAttributesModifier) as CameraTargetAttributesModifier;
		if (m_cameraTargetAttributesMofifier != null)
		{
			m_cameraTargetAttributes.ResetBounds();
		}
		break;
		
	default : 
		break;
	}
}
