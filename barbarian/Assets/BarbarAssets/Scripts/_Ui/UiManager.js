// 2011.08 yun.li

#pragma strict

class UiManager
{
	
	var m_startPageObj : GameObject = null;

	private var m_oriScreenSize : Vector2 = Vector2(1024, 768);
	private var m_screenSizeFactor : Vector2 = Vector2(0, 0);
	
	private var m_pageArray : Array = null;
	private var m_startPage : Page = null;
	private var m_currentPage : Page = null;

	static private var m_instance : UiManager = null;

	static function Singleton() : UiManager
	{
		if (m_instance == null)
		{
			m_instance = new UiManager();
			
			//Debug.Log(" 2 . screen scale " + Screen.width + " " + Screen.height);
		}
	
		return m_instance;
	}

	private function UiManager()
	{	
		m_pageArray = new Array();
		
		// I don't kown why, but i think this can fix the bug ( height > width ) ,and not make anything wrong.
		
		var screenWidth : float = Screen.width;
		var screenHeight : float = Screen.height;
		
		//Debug.Log(" 1 . screen scale " + Screen.width + " " + Screen.height);
		
		if (screenWidth < screenHeight)
		{
			screenWidth = Screen.height;
			screenHeight = Screen.width;
		}
		
		m_screenSizeFactor = Vector2(screenWidth / m_oriScreenSize.x, screenHeight / m_oriScreenSize.y);
		
		//Debug.Log ("Screen.width and Screen.height : " + Screen.width + " ---- " + Screen.height );
		//Debug.Log ("pos.y * m_screenSizeFactor.y : " + (pos.y * m_screenSizeFactor.y) );
	}

	function Update () 
	{

	}
	
	function GetOriScreenSize() : Vector2
	{
		return m_oriScreenSize;
	}
	
	function GetScreenSizeFactor() : Vector2
	{
		return Vector2(Screen.width / m_oriScreenSize.x, Screen.height / m_oriScreenSize.y);
	}

	function ConvertToDeviceScreenPosition(pos : Vector2) : Vector2
	{
		//Debug.Log ("pos.y and m_screenSizeFactor.y : " + pos.y + " ---- " + m_screenSizeFactor.y );
		//Debug.Log ("pos.y * m_screenSizeFactor.y : " + (pos.y * m_screenSizeFactor.y) );
		return Vector2(pos.x * (Screen.width / m_oriScreenSize.x), pos.y * (Screen.height / m_oriScreenSize.y));
	}
	
	function SwitchPage(fromPage : Page, toPageName : String) : boolean
	{
		for (var i : int = 0; i < m_pageArray.Count; ++i)
		{
			if ( (m_pageArray[i] as Page).GetName() == toPageName)
			{
				(m_pageArray[i] as Page).SetPrePage(fromPage);
			
				(m_pageArray[i] as Page).SetEnabled(true);
			
				m_currentPage = m_pageArray[i] as Page;
			
				return true;
			}
		}
	
		return false;
	}			
	
	function SwitchPageWithOutSetPre(fromPage : Page, toPage : Page) : boolean
	{
		for (var i : int = 0; i < m_pageArray.Count; ++i)
		{
			if ( (m_pageArray[i] as Page) == toPage)
			{			
				(m_pageArray[i] as Page).SetEnabled(true);
			
				m_currentPage = m_pageArray[i] as Page;
			
				return true;
			}
		}
	
		return false;

	}
	
	function SwitchPage(fromPage : Page, toPage : Page) : boolean
	{
		for (var i : int = 0; i < m_pageArray.Count; ++i)
		{
			if ( (m_pageArray[i] as Page) == toPage)
			{
				(m_pageArray[i] as Page).SetPrePage(fromPage);
			
				(m_pageArray[i] as Page).SetEnabled(true);
			
				m_currentPage = m_pageArray[i] as Page;
			
				return true;
			}
		}
	
		return false;
	}			

	function RegisterPage(page : Page)
	{
		Assert.Singleton().AssertNullObject(page);
	
		if (Debug.isDebugBuild)
		{
			for (var i : int = 0; i < m_pageArray.Count; ++i)
			{
				if (m_pageArray[i] == page || (m_pageArray[i] as Page).GetName() == page.GetName())
				{
					Debug.LogError("Duplicate page.");
					
					return ;
				}
			}
		}
	
		m_pageArray.Push(page);
	}

	function UnregisterPage(page : Page)
	{	
		for (var i : int = 0; i < m_pageArray.Count; ++i)
		{
			if (m_pageArray[i] == page)
			{
				m_pageArray.RemoveAt(i);
				return ;
			}
		}
	}
	
	function DeletePage(pageName : String)
	{
		for (var i : int = 0; i < m_pageArray.Count; ++i)
		{
			if ( (m_pageArray[i] as Page).GetName() == pageName)
			{
				(m_pageArray[i] as Page).Delete();
				return ;
			}
		}

	}
	
	function DisableAllPage()
	{
		for (var i : int = 0; i < m_pageArray.Count; ++i)
		{
			(m_pageArray[i] as Page).SetEnabled(false);
		}
	}
	
	function GetCurrentPage() : Page
	{
		return m_currentPage;
	}
}