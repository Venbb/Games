#pragma strict

var m_autorotateToPortrait : boolean = true;
var m_autorotateToPortraitUpsideDown : boolean = true;
var m_autorotateToLandscapeLeft : boolean = true;
var m_autorotateToLandscapeRight : boolean = true;

static private var m_instance : IosScreenSetting = null;

function Awake()
{		
	if (m_instance == null)
	{
		m_instance = this;
		DontDestroyOnLoad(this.gameObject);
	}		
	else
	{
		Destroy(this.gameObject);
		return ;
	}
	
	Screen.autorotateToPortrait = m_autorotateToPortrait;
	Screen.autorotateToPortraitUpsideDown = m_autorotateToPortraitUpsideDown;
	Screen.autorotateToLandscapeLeft = m_autorotateToLandscapeLeft;
	Screen.autorotateToLandscapeRight = m_autorotateToLandscapeRight;

	/*if (Application.platform == RuntimePlatform.IPhonePlayer)
	{
    	iPhoneKeyboard.autorotateToPortrait = m_autorotateToPortrait;
		iPhoneKeyboard.autorotateToPortraitUpsideDown = m_autorotateToPortraitUpsideDown;
		iPhoneKeyboard.autorotateToLandscapeLeft = m_autorotateToLandscapeLeft;
		iPhoneKeyboard.autorotateToLandscapeRight = m_autorotateToLandscapeRight;
	}*/
}

function Update () 
{
	if(m_autorotateToPortrait && Input.deviceOrientation == DeviceOrientation.Portrait)
    {
        Screen.orientation = ScreenOrientation.Portrait;
    }
    else if(m_autorotateToPortraitUpsideDown && Input.deviceOrientation == DeviceOrientation.PortraitUpsideDown)
    {
        Screen.orientation = ScreenOrientation.PortraitUpsideDown;
    }
    else if(m_autorotateToLandscapeLeft && Input.deviceOrientation == DeviceOrientation.LandscapeLeft)
    {
        Screen.orientation = ScreenOrientation.LandscapeLeft;
    }
    else if(m_autorotateToLandscapeRight && Input.deviceOrientation == DeviceOrientation.LandscapeRight)
    {
        Screen.orientation = ScreenOrientation.LandscapeRight;
    }
}