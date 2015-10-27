
var m_lightEnabled : boolean = false;

function Awake()
{
	if (light != null)
    {
		light.enabled = m_lightEnabled;
    }
}

function OnTriggerStay(collision : Collider)
{
    if (light != null)
    {
    	if (light.enabled == false)
    	{
    		light.enabled = true;
    	}
    }	
}

function OnTriggerExit(collision : Collider)
{
    if (light != null)
    {
    	if (light.enabled == true)
    	{
    		light.enabled = false;
    	}
    }	
}