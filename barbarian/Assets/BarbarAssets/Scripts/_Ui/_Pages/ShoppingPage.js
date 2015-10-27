#pragma strict

class ShopItemSmallIcoTexture
{
	var smallIcoType : EPropertyAdditionalType;
	var texture : Texture;
}

class ShopItemSmallIcoInfo
{		
	var textInfo : HudInfo;
	
	var icoStartPosition : Vector2;
	var icoGap : Vector2;
	
	var texStartPos : Vector2;
	var texGap : Vector2;
}

class ShopItemInfo
{
	var itemType : EPropertyType;
	var skillType : ESkillType = ESkillType.Invalid;
	
	var ico : Texture;
};

class LockedItemInfo extends ShopItemInfo
{
	var levelTextInfo : HudInfo;
	
	var upgradeButton : HudInfo;
}

class NormalItemInfo
{
	var background : Texture;
	
	var icoPos : Vector2;

	var smallIcoInfo : ShopItemSmallIcoInfo;
	
	var namePos : Vector2;
	
	var levelTitleInfo : HudInfo;
	
	var levelTextInfo : HudInfo;
	
	//var levelTextPos : Vector2;
	//var levelTextScale : Vector2;
	
	var upgradeButton : HudInfo;
	
	//var moneyCastText : String;
	var moneyCastTextInfo : HudInfo;
	
	//------------------
	  //-----the Blood bottle quantity
	 var healthPotInfo : HudInfo;
	 var currentPotInfo : HudInfo;
};


class BuyHudInfo
{
	//var maskBackground : Texture;
	
	var position : Vector2;
	
	var background : Texture;
	
	var icoPos : Vector2;
	var namePos : Vector2;
	
	var level1TitlePos : Vector2;
	var level1TextPos : Vector2;
	
	var level2TitlePos : Vector2;
	var level2TextPos : Vector2;
	
	var introductionPos : Vector2;
	
	var smallIcoInfo1 : ShopItemSmallIcoInfo;
	var smallIcoInfo2 : ShopItemSmallIcoInfo;
	
    var backButtonPos : Vector2;
    var upgradeButton : HudInfo;
    var upgradeButtonMoneyNotEnough : HudInfo;
	
	//var moneyCastText : String;
	var moneyCastTextInfo : HudInfo;
}

class ShoppingPage extends Page
{
	var m_scrollRect : Rect;
	var m_scrollPos : Vector2 = Vector2.zero;
	var m_scrollGap : float;
	
	var m_shopListBackgourndPosition : Vector2;
	var m_shopListBackground : Texture;
	
	var m_shopTitlePosition : Vector2;
	var m_shopTitle : Texture;
	
	var m_normalItemInfo : NormalItemInfo;
	
	var m_katoUpgradeButtonInfo : HudInfo;
	private var m_katoUpgradeToggleFlag : boolean = true;
	var m_katoUpgradeListInfo : ShopItemInfo[];
	
	//var m_featsBackground : Texture;
	var m_featsButtonInfo : HudInfo;
	private var m_featsToggleFlag : boolean = false;
	var m_featsUpgradeListInfo : ShopItemInfo[];
	
	//var m_skillBackground : Texture;
	var m_skillButtonInfo : HudInfo;
	private var m_skillToggleFlag : boolean = false;
	var m_skillUpgradeListInfo : ShopItemInfo[];
	
	//--------------------------------
	  //---------Button for goods-------------
	var m_itemButtonInfo : HudInfo;
	private var m_itemToggleFlag : boolean = false;
	var m_itemUpgradeListInfo : ShopItemInfo[];
	//-------------------
	  //---------scroll position-------
	var scrollposition : Vector2 = Vector2.zero;
	var scorll_Bigen : Rect ;//= new Rect(0,0,100,100);
	var scorll_End : Rect ;//= new Rect(0,0,200,600);
	
	var m_backButtonInfo : HudInfo;
	var m_continueButtonInfo : HudInfo;
	var m_nextPage : String;
	
	var m_buyItemHud : BuyHudInfo;
	
	var m_lockedItem : LockedItemInfo;
	
	var m_smallIcoList : ShopItemSmallIcoTexture[];
	
	// Score
	var m_scoreBarInfo : HudInfo;
	private var m_scoreStr : String;
	private var m_scoreNum : int;

	private var m_tempFlag : boolean = false;
	private var i : int = 0;
	private var j : int = 0;
	
	private var m_buyItemHudEnabled : boolean = false;
	private var m_currentItem : ShopItemInfo = null;
	private var m_currentPropertyData : ControllableActorPropertyData = null;
	
	private var m_mainActor : ControllableActor = null;

	private var tempInfo : ShopItemInfo[] = null;
	
	//Joystick
	var currentColumn : int = 0;
	var currentLeftRow : int = 0;
	var currentRightRow : int = 0;
	var m_currentMenuCursor : Texture;
	
	//joystick scroll
	var rowInScrollScreen : int = 0;
	private var maxRowOneScreen : int = 3;
	
	var joystickShowBuyHud : boolean;
	var joystickUseMoney : boolean;
	
	function GetActor() : ControllableActor
	{
		if (m_mainActor == null)
		{
			m_mainActor = SceneManager.Singleton().GetMainActor();
		}
		
		return m_mainActor;
	}
	
	function OnDisable()
	{
		if (SceneManager.Singleton())
		{
			SceneManager.Singleton().StopGame(false);
		}
	}

	function Awake()
	{
		m_katoUpgradeButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_katoUpgradeButtonInfo.position);
		m_featsButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_featsButtonInfo.position);
		m_skillButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_skillButtonInfo.position);
		
		//------------------------
		m_itemButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_itemButtonInfo.position);
		
		m_backButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_backButtonInfo.position);
		m_continueButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_continueButtonInfo.position);
		
		m_scoreBarInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_scoreBarInfo.position);
		
		m_buyItemHud.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.position);
		m_buyItemHud.icoPos = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.icoPos);
		m_buyItemHud.namePos = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.namePos);
		m_buyItemHud.level1TitlePos = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.level1TitlePos);
		m_buyItemHud.level1TextPos = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.level1TextPos);
		m_buyItemHud.level2TitlePos = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.level2TitlePos);
		m_buyItemHud.level2TextPos = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.level2TextPos);
		
		m_buyItemHud.introductionPos = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.introductionPos);
		m_buyItemHud.backButtonPos = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.backButtonPos);
		m_buyItemHud.upgradeButton.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.upgradeButton.position);
		m_buyItemHud.upgradeButtonMoneyNotEnough.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.upgradeButtonMoneyNotEnough.position);
		m_buyItemHud.moneyCastTextInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.moneyCastTextInfo.position);
		
		m_buyItemHud.smallIcoInfo1.icoStartPosition = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.smallIcoInfo1.icoStartPosition);
		m_buyItemHud.smallIcoInfo1.texStartPos = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.smallIcoInfo1.texStartPos);
		m_buyItemHud.smallIcoInfo2.icoStartPosition = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.smallIcoInfo2.icoStartPosition);
		m_buyItemHud.smallIcoInfo2.texStartPos = UiManager.Singleton().ConvertToDeviceScreenPosition(m_buyItemHud.smallIcoInfo2.texStartPos);
	}

	function Start()
	{
		SceneManager.Singleton().StopGame(true);
		scorll_Bigen=new Rect(m_featsButtonInfo.position.x,
		                      m_featsButtonInfo.position.y-(m_customSkin.customStyles[m_katoUpgradeButtonInfo.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y),
		                      m_customSkin.customStyles[m_katoUpgradeButtonInfo.customStyleIndex].normal.background.width * UiManager.Singleton().GetScreenSizeFactor().x*1.101f,
			                  m_customSkin.customStyles[m_katoUpgradeButtonInfo.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y*3);
	   scorll_End=new Rect(0,
	                       0+((m_customSkin.customStyles[m_katoUpgradeButtonInfo.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y)/1.92f),
	                       m_customSkin.customStyles[m_katoUpgradeButtonInfo.customStyleIndex].normal.background.width * UiManager.Singleton().GetScreenSizeFactor().x,
			               m_customSkin.customStyles[m_katoUpgradeButtonInfo.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y*4);
	
	}
	
	private var  scrollVelocity : float = 0;
	private var timeTouchPhaseEnded : float = 0;
	private var previousDelta : float = 0;
	private var inertiaDuration : float = 0.5;
	
	function Update()
	{
		//joystick
		var map = InputKeyCodeMapHelper.mapKeys;
		if (m_buyItemHudEnabled)
		{
			if (Input.GetKeyUp(map["X"].ToString())) {
				m_buyItemHudEnabled = false;
				AudioManager.Singleton().PlayButtonAudio();
			}
			
			if (Input.GetKeyDown(map["B"].ToString())) {
				joystickUseMoney = true;
			} else if (Input.GetKeyUp(map["B"].ToString())) {
				joystickUseMoney = false;
			}
			previousDelta = 0.0f;
			scrollVelocity = 0.0f;
			return;
		}
		
		if (Input.GetKeyUp(map["left"].ToString())) {
			currentColumn = 0;
			currentRightRow = 0;
		} else if (Input.GetKeyUp(map["right"].ToString())) {
			currentColumn = 1;
		} else if (Input.GetKeyUp(map["up"].ToString())) {
			if (0 == currentColumn) {
				currentLeftRow--;
				if (currentLeftRow <= 0) {
					currentLeftRow = 0;
					scrollposition = Vector2.zero;
				}
				UpdateJoyStickToUI();
				AudioManager.Singleton().PlayButtonAudio();
			} else {
				currentRightRow--;
				if (currentRightRow < 0) {
					currentRightRow = 0;
				}
				
				if (tempInfo.Length > maxRowOneScreen) {
					rowInScrollScreen--;
					if (rowInScrollScreen < 0) {
						rowInScrollScreen = 0;
					}
					
					if (0 == rowInScrollScreen) {
						m_scrollPos.y = (m_normalItemInfo.background.height + m_scrollGap) * currentRightRow;
					}
				}
			}
		} else if (Input.GetKeyUp(map["down"].ToString())) {
			if (0 == currentColumn) {
				currentLeftRow++;
				if (currentLeftRow >= 3) {
					currentLeftRow = 3;
					scrollposition.y = 115.0625;
				}
				UpdateJoyStickToUI();
				AudioManager.Singleton().PlayButtonAudio();
			} else {
				currentRightRow++;
				if (currentRightRow >= tempInfo.Length - 1) {
					currentRightRow = tempInfo.Length - 1;
				}
				
				if (tempInfo.Length > maxRowOneScreen) {
					rowInScrollScreen++;
					if (rowInScrollScreen >  maxRowOneScreen - 1) {
						rowInScrollScreen = maxRowOneScreen - 1;
					}
					
					if (maxRowOneScreen - 1 == rowInScrollScreen) {
						m_scrollPos.y = (m_normalItemInfo.background.height + m_scrollGap) * (currentRightRow - maxRowOneScreen + 1) ;
					}
				} 
			}
		} else if (Input.GetKeyUp(map["LeftFlipper"].ToString())) {
			NextAction();
		} else if (Input.GetKeyUp(map["X"].ToString())) {
			BackAction();
		} 
		
		if (1 == currentColumn) {
			if (Input.GetKeyDown(map["B"].ToString())) {
				joystickShowBuyHud = true;
			} else if (Input.GetKeyUp(map["B"].ToString())) {
				joystickShowBuyHud = false;
			}
		}
		
		//touch
		if (Input.touchCount != 1)
		{
			if ( scrollVelocity != 0.0f )
			{
				// slow down over time
				var t : float = (Time.time - timeTouchPhaseEnded) / inertiaDuration;
				var frameVelocity : float = Mathf.Lerp(scrollVelocity, 0, t);
				m_scrollPos.y += frameVelocity * Time.deltaTime;
				
				// after N seconds, we've stopped
				if (t >= inertiaDuration) 
				{
					scrollVelocity = 0.0f;
				}
			}
			return;
		}
		
		var touch : Touch = Input.touches[0];
		
		if (!IsInShopListWindow(touch.position))
		{
			previousDelta = 0.0f;
			scrollVelocity = 0.0f;
			return;
		}
		
		if (touch.phase == TouchPhase.Began)
		{
			previousDelta = 0.0f;
			scrollVelocity = 0.0f;
		}
		else if (touch.phase == TouchPhase.Canceled)
		{
			previousDelta = 0f;
		}
		else if (touch.phase == TouchPhase.Moved)
		{
			// dragging
			previousDelta = touch.deltaPosition.y;
			m_scrollPos.y += touch.deltaPosition.y;
		}
		else if (touch.phase == TouchPhase.Ended)
		{
			// impart momentum, using last delta as the starting velocity
			// ignore delta < 10; precision issues can cause ultra-high velocity
			if (Mathf.Abs(touch.deltaPosition.y) >= 10)
			{
				scrollVelocity = Mathf.Round(touch.deltaPosition.y / touch.deltaTime);
			}
			
			timeTouchPhaseEnded = Time.time;
		}
		
		
	}
	
	function UpdateJoyStickToUI() {
		DeactiveAllToggle();
		switch(currentLeftRow) {
			case 0:
				m_katoUpgradeToggleFlag = true;
			break;
			case 1:
				m_featsToggleFlag = true;
			break;
			case 2:
				m_skillToggleFlag = true;
			break;
			case 3:
				m_itemToggleFlag = true;
			break;
			default:
				m_katoUpgradeToggleFlag = true;
			break;
		}
	}
	
	function OnGUI()
	{
	    
		if (GetActor() == null)
		{
			return ;
		}
		
		if (m_buyItemHudEnabled)
		{
			GUI.enabled = false;
		}
		
		OnBackground();
		
		OnShopListBackground();
		
		//-----------------
		OnListButton();
		
		/*OnKatoUpgradeButton();    
		OnFeatsButton();
		OnSkillButton();
		OnItemButton();*/
		
		OnBackButton();
		OnContinueButton();
		
		OnShopList();
		
		OnScoreBar();
		
		if (m_buyItemHudEnabled)
		{
			GUI.enabled = true;
			
			GUI.Window (1, Rect (m_buyItemHud.position.x, m_buyItemHud.position.y, Screen.width, Screen.height), BuyItemWindow, "");
			GUI.BringWindowToFront(1);
			GUI.FocusWindow(1);
			//OnBuyItem(m_currentItem, m_currentPropertyData);
		}
	}
	
	
	function BuyItemWindow()
	{
		OnBuyItem(m_currentItem, m_currentPropertyData);
	}

	function OnBuyItem(item : ShopItemInfo, propertyData : ControllableActorPropertyData)
	{
		// Background
		//GUI.DrawTexture( Rect(0, 0,  Screen.width, Screen.height),  m_buyItemHud.maskBackground, ScaleMode.StretchToFill, true);
		
		//----------------------------------------------------------------------------------------------
		// Group begin
		GUI.BeginGroup ( Rect (0, 0, Screen.width, Screen.height) );

		// Background
		GUI.DrawTexture( Rect(0, 0,  m_buyItemHud.background.width * UiManager.Singleton().GetScreenSizeFactor().x,  m_buyItemHud.background.height * UiManager.Singleton().GetScreenSizeFactor().y),  m_buyItemHud.background, ScaleMode.StretchToFill, true);
		// Item big ico
		GUI.Label( Rect( m_buyItemHud.icoPos.x,  m_buyItemHud.icoPos.y, item.ico.width, item.ico.height), item.ico );
		
		if (!propertyData.IsLocked())
		{
			PageText( m_normalItemInfo.levelTitleInfo,  m_buyItemHud.level1TitlePos);
			PageText( m_normalItemInfo.levelTextInfo, (propertyData.currentLevel + 1).ToString(), m_buyItemHud.level1TextPos);
			var additionals : ControllableActorPropertyAdditional[] = propertyData.levelList[propertyData.currentLevel].additionals;
			OnShowItemSmallIcoText(m_buyItemHud.smallIcoInfo1, additionals);
		}
		else
		{
			propertyData.currentLevel = -1;
		}
		
		// Show item name
		PageText( propertyData.nameInfo,  m_buyItemHud.namePos);
		
		PageText( m_normalItemInfo.levelTitleInfo,  m_buyItemHud.level2TitlePos);

		PageText( m_normalItemInfo.levelTextInfo, (propertyData.currentLevel + 2).ToString(), m_buyItemHud.level2TextPos);
		
		// small ico
	    additionals = propertyData.levelList[propertyData.currentLevel + 1].additionals;
		OnShowItemSmallIco(m_buyItemHud.smallIcoInfo2, additionals);
		GUI.color = Color.green;
		OnShowItemSmallIcoText(m_buyItemHud.smallIcoInfo2, additionals);
		GUI.color = Color.white;
		
		if ( PageButton(m_backButtonInfo, m_buyItemHud.backButtonPos) )
		{
			m_buyItemHudEnabled = false;
		}
		
		// description
		PageText( propertyData.introductionInfo,  m_buyItemHud.introductionPos);
		
		if ( GetActor().GetMoney() >= propertyData.levelList[propertyData.currentLevel + 1].moneyNeed)
		{
			// UpgradeButton
			if ( PageButton(m_buyItemHud.upgradeButton,
			Rect(m_buyItemHud.upgradeButton.position.x, 
					         m_buyItemHud.upgradeButton.position.y, 
					         m_customSkin.customStyles[m_buyItemHud.upgradeButton.customStyleIndex].normal.background.width * UiManager.Singleton().GetScreenSizeFactor().x,
					         m_customSkin.customStyles[m_buyItemHud.upgradeButton.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y ) ) || joystickUseMoney)
			{
				joystickUseMoney = false;
				m_buyItemHudEnabled = false;
				GetActor().OnIncreaseMoney(-propertyData.levelList[propertyData.currentLevel + 1].moneyNeed);
				propertyData.currentLevel++;
			}
		}
		// Not have enough money
		else
		{
			GUI.Label( Rect(m_buyItemHud.upgradeButtonMoneyNotEnough.position.x, 
					         m_buyItemHud.upgradeButtonMoneyNotEnough.position.y, 
					         m_customSkin.customStyles[m_buyItemHud.upgradeButtonMoneyNotEnough.customStyleIndex].normal.background.width * UiManager.Singleton().GetScreenSizeFactor().x,
					         m_customSkin.customStyles[m_buyItemHud.upgradeButtonMoneyNotEnough.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y ),
					         
					 m_buyItemHud.upgradeButtonMoneyNotEnough.text[GameOptionsManager.Singleton().GetLanguage()] ,
					 GetGUIStyle(m_buyItemHud.upgradeButtonMoneyNotEnough, m_customSkin) );
		}
		
		if (propertyData.currentLevel < propertyData.levelList.length - 1)
		{
			// Show money value
			PageText(m_buyItemHud.moneyCastTextInfo, propertyData.levelList[propertyData.currentLevel + 1].moneyNeed.ToString());
		}
		
		GUI.EndGroup();
	}
	
	function GenerateScoreString()
	{
		m_scoreNum = GetActor().GetMoney();
		var j : int = 100000000;
		m_scoreStr = "";
		for (var i : int = 1; i <= 9 ; ++i)
		{
			m_scoreStr += (m_scoreNum / j).ToString();
			m_scoreNum = m_scoreNum % j;
			j /= 10; 
		
			if (i % 3 == 0)
			{
				m_scoreStr += " ";
			}
		}
	}

	function OnScoreBar()
	{
		GenerateScoreString();

		GUI.Label(GetRect (m_scoreBarInfo, m_customSkin), m_scoreStr, m_customSkin.customStyles[m_scoreBarInfo.customStyleIndex]);
	}

	function OnShopListBackground()
	{
		if (m_buyItemHudEnabled)
		{
			GUI.color.a = 0.5;
		}
		
		GUI.DrawTexture(Rect(m_shopListBackgourndPosition.x * UiManager.Singleton().GetScreenSizeFactor().x, 
						   m_shopListBackgourndPosition.y * UiManager.Singleton().GetScreenSizeFactor().y,
						   m_shopListBackground.width * UiManager.Singleton().GetScreenSizeFactor().x,
						   m_shopListBackground.height * UiManager.Singleton().GetScreenSizeFactor().y),
					    m_shopListBackground, 
					    ScaleMode.StretchToFill, 
					    true);
					    
		GUI.DrawTexture(Rect(m_shopTitlePosition.x * UiManager.Singleton().GetScreenSizeFactor().x, 
						   m_shopTitlePosition.y * UiManager.Singleton().GetScreenSizeFactor().y,
						   m_shopTitle.width * UiManager.Singleton().GetScreenSizeFactor().x,
						   m_shopTitle.height * UiManager.Singleton().GetScreenSizeFactor().y),
					    m_shopTitle, 
					    ScaleMode.StretchToFill, 
					    true);
		GUI.color.a = 1;			    
					    
	}
	
	function ShopListWindow()
	{
		OnUpgradeList(tempInfo);
	}
	
	function OnShopList()
	{	
		GUI.skin = m_customSkin;
		
		tempInfo = null;
		
		if (m_katoUpgradeToggleFlag)
		{
			tempInfo = m_katoUpgradeListInfo;
		}
		else if (m_featsToggleFlag)
		{
			tempInfo = m_featsUpgradeListInfo;
		}
		else if (m_skillToggleFlag)
		{
			tempInfo = m_skillUpgradeListInfo;
		}
		else if(m_itemToggleFlag)
		{
		   tempInfo = m_itemUpgradeListInfo;
		}
		
		if (tempInfo != null)
		{
			GUI.Window (0, 
				Rect (m_scrollRect.x /** UiManager.Singleton().GetScreenSizeFactor().x*/, 
			 	 	m_scrollRect.y * UiManager.Singleton().GetScreenSizeFactor().y, 
			  		m_scrollRect.width * UiManager.Singleton().GetScreenSizeFactor().x, 
			  		m_scrollRect.height * UiManager.Singleton().GetScreenSizeFactor().y), 
			  	ShopListWindow, 
			  	"");
			GUI.FocusWindow(0);
		}
	}
	
	function IsInShopListWindow(pos : Vector2) : boolean
	{
		return (pos.x >= m_scrollRect.x)
		&& (pos.x <= (m_scrollRect.x + m_scrollRect.width - m_customSkin.verticalScrollbar.fixedWidth) )
		&& (pos.y >= m_scrollRect.y * UiManager.Singleton().GetScreenSizeFactor().y)
		&& (pos.y <= m_scrollRect.y * UiManager.Singleton().GetScreenSizeFactor().y + m_scrollRect.height * UiManager.Singleton().GetScreenSizeFactor().y 
		    - m_customSkin.horizontalScrollbar.fixedHeight);
	}
	
	function OnUpgradeList(list : ShopItemInfo[])
	{	
		GUI.skin = m_customSkin;
		
		// Nothing in list
		if (list.length <= 0)
		{
			return;
		}
		
		// Begin the scroll view that we began above.
		Debug.Log(m_scrollRect.width * UiManager.Singleton().GetScreenSizeFactor().x);
		m_scrollPos = GUI.BeginScrollView(
		Rect (0 /*m_scrollRect.x* UiManager.Singleton().GetScreenSizeFactor().x*/, 
			  0 /*m_scrollRect.y * UiManager.Singleton().GetScreenSizeFactor().y*/, 
			  m_scrollRect.width * UiManager.Singleton().GetScreenSizeFactor().x, 
			  m_scrollRect.height * UiManager.Singleton().GetScreenSizeFactor().y), 
		m_scrollPos, 
		Rect (0, 
			  0, 
			  m_normalItemInfo.background.width, 
			  (m_normalItemInfo.background.height * list.length) + (m_scrollGap * (list.length - 1)) )
			 							 );

		var temp : float = 0;
		temp = (m_scrollRect.width * UiManager.Singleton().GetScreenSizeFactor().x - m_normalItemInfo.background.width) / 2.0;

		// Display each shop item
		if(tempInfo != m_itemUpgradeListInfo)
		{
    	  for (i = 0; i < list.length; ++i)
    	  {
    		OnShopItem(list[i], Vector2(temp, (m_normalItemInfo.background.height + m_scrollGap ) * i), i);
    	  }
    	}
    	else
    	{
    	   for (i = 0; i < list.length; ++i)
    	  {
    		OnShop_Item(list[i], Vector2(temp, (m_normalItemInfo.background.height + m_scrollGap ) * i), i);
    	  }
    	}
    	OnRightColumnCursor();
    	// End the scroll view that we began above.
    	GUI.EndScrollView ();
	}
	
	function OnRightColumnCursor() {
		if (1 == currentColumn) {
			var temp : float = 0;
			temp = (m_scrollRect.width * UiManager.Singleton().GetScreenSizeFactor().x - m_normalItemInfo.background.width) / 2.0;
			var pos = Vector2(temp, (m_normalItemInfo.background.height + m_scrollGap ) * currentRightRow);
			GUI.DrawTexture(Rect(pos.x + 100, pos.y + 50, m_currentMenuCursor.width, m_currentMenuCursor.height), m_currentMenuCursor, ScaleMode.ScaleAndCrop, true);
		}
	}

	function GetIcoByType(type : EPropertyAdditionalType) : Texture
	{
		for (var i = 0; i < m_smallIcoList.length; ++i)
		{
			if (m_smallIcoList[i].smallIcoType == type)
			{
				return m_smallIcoList[i].texture;
			}
		}
		
		Debug.LogError("No such small ico for upgrade group.");
		return null;
	}
	
	function OnLockedItem(oriItem : ShopItemInfo, propertyData : ControllableActorPropertyData, pos : Vector2, index : int)
	{
		//----------------------------------------------------------------------------------------------
		// Group begin
		GUI.BeginGroup ( new Rect (pos.x, pos.y, m_normalItemInfo.background.width, m_normalItemInfo.background.height) );

		// Background
		GUI.Label( Rect(0, 0, m_normalItemInfo.background.width, m_normalItemInfo.background.height), m_normalItemInfo.background );
		// Item big ico
		GUI.Label( Rect(m_normalItemInfo.icoPos.x, m_normalItemInfo.icoPos.y, m_lockedItem.ico.width, m_lockedItem.ico.height), m_lockedItem.ico );
		
		// Show item name
		PageText( propertyData.nameInfo,  m_normalItemInfo.namePos);
		
		PageText( m_lockedItem.levelTextInfo );
		
		var nextLevel : int = 0;
			
		// UpgradeButton
		if ( PageButton(m_lockedItem.upgradeButton)  || (joystickShowBuyHud && index == currentRightRow))
		{
			joystickShowBuyHud = false;
			m_buyItemHudEnabled = true;
			m_currentItem = oriItem;
			m_currentPropertyData = propertyData;
		}			
		
		//GUI.font = m_normalItemInfo.moneyCastTextFont;
		// Show money value
		
		PageText(m_normalItemInfo.moneyCastTextInfo, propertyData.levelList[nextLevel].moneyNeed.ToString());
		
		GUI.EndGroup();
		// Group end
		//---------------------------------------------------------------------------------------------
	}
	
	//-----------------------
	  //----item menu-----------
	function OnShop_Item(item : ShopItemInfo, pos : Vector2, index : int)
	{
	   var healpot_Count : int =GetActor().GetHealthPot_ForItem() ;
	   //----------------------------------------------------------------------------------------------
		// Group begin
		GUI.BeginGroup ( new Rect (pos.x, pos.y, m_normalItemInfo.background.width, m_normalItemInfo.background.height) );

		// Background
		GUI.Label( Rect(0, 0, m_normalItemInfo.background.width, m_normalItemInfo.background.height), m_normalItemInfo.background );
		// Item big ico
		
		GUI.Label( Rect(m_normalItemInfo.icoPos.x, m_normalItemInfo.icoPos.y+18.0f, (item.ico.width),(item.ico.height)), item.ico );
		
		
		// Show item name
		//PageText( 800,  m_normalItemInfo.namePos);
		
		PageText( m_normalItemInfo.healthPotInfo );
		PageText(m_normalItemInfo.currentPotInfo, (healpot_Count).ToString());
		if ( PageButton(m_normalItemInfo.upgradeButton) || (joystickShowBuyHud && index == currentRightRow))
	    {
	    	joystickShowBuyHud = false;
	      if ( GetActor().GetMoney() >= 800)
	      {
	         GetActor().Add_HealthPot();
	         GetActor().OnIncreaseMoney(-800);
	      }
	      // Not have enough money
			
		}
		
		PageText(m_normalItemInfo.moneyCastTextInfo, (800).ToString());
		
		GUI.EndGroup();
	   
	}

	function OnShopItem(item : ShopItemInfo, pos : Vector2, index : int)
	{
		//GUI.color = Color.red;
		var nextLevel : int = 0;
		
		var propertyData : ControllableActorPropertyData = GetActor().GetPropertyData(item.itemType, item.skillType);
		
		if (propertyData.IsLocked())
		{
			OnLockedItem(item, propertyData, pos, index);
			return;
		}
		//----------------------------------------------------------------------------------------------
		// Group begin
		GUI.BeginGroup ( new Rect (pos.x, pos.y, m_normalItemInfo.background.width, m_normalItemInfo.background.height) );

		// Background
		GUI.Label( Rect(0, 0, m_normalItemInfo.background.width, m_normalItemInfo.background.height), m_normalItemInfo.background );
		// Item big ico
		GUI.Label( Rect(m_normalItemInfo.icoPos.x, m_normalItemInfo.icoPos.y, item.ico.width, item.ico.height), item.ico );
		
		// Show item name
		PageText( propertyData.nameInfo,  m_normalItemInfo.namePos);
		
		PageText( m_normalItemInfo.levelTitleInfo );
		
		// Max
		if (propertyData.currentLevel == propertyData.levelList.length - 1)
		{
			PageText( m_normalItemInfo.levelTextInfo );
		}
		else
		{
			PageText( m_normalItemInfo.levelTextInfo, (propertyData.currentLevel + 1).ToString() );
		}

		var additionals : ControllableActorPropertyAdditional[] = propertyData.levelList[propertyData.currentLevel].additionals;
		OnShowItemSmallIco(m_normalItemInfo.smallIcoInfo, additionals);
		OnShowItemSmallIcoText(m_normalItemInfo.smallIcoInfo, additionals);	
				
		// Not reach the max
		if (propertyData.currentLevel < propertyData.levelList.length - 1)
		{	
			nextLevel = propertyData.currentLevel + 1;

			// UpgradeButton
			if ( PageButton(m_normalItemInfo.upgradeButton) || (joystickShowBuyHud && index == currentRightRow))
			{
				joystickShowBuyHud = false;
				m_buyItemHudEnabled = true;
				m_currentItem = item;
				m_currentPropertyData = propertyData;
			}			
		
			// Show money value
			PageText(m_normalItemInfo.moneyCastTextInfo, propertyData.levelList[nextLevel].moneyNeed.ToString());			
		}

		GUI.EndGroup();
		// Group end
		//---------------------------------------------------------------------------------------------
	}
	
	function OnShowItemSmallIco(smallIcoInfo : ShopItemSmallIcoInfo, additionals : ControllableActorPropertyAdditional[])
	{
		var tempTexture : Texture = null;
			
		// Show Small icos
		for (var j : int = 0; j < additionals.length; ++j)
		{	
			tempTexture = GetIcoByType(additionals[j].additionalType);
			GUI.Label(Rect(smallIcoInfo.icoStartPosition.x + j * smallIcoInfo.icoGap.x, 
						   smallIcoInfo.icoStartPosition.y + j * smallIcoInfo.icoGap.y, 
						   tempTexture.width, 
						   tempTexture.height), 
					  tempTexture);
		}
	}
	
	function OnShowItemSmallIcoText(smallIcoInfo : ShopItemSmallIcoInfo, additionals : ControllableActorPropertyAdditional[])
	{
		// Show Small icos
		for (var j : int = 0; j < additionals.length; ++j)
		{	
			PageText(smallIcoInfo.textInfo, 	
					additionals[j].value, 
					Vector2(smallIcoInfo.texStartPos.x + j * smallIcoInfo.texGap.x, 
						   smallIcoInfo.texStartPos.y + j * smallIcoInfo.texGap.y)
					);					  
		}
	}
	
	function DeactiveAllToggle()
	{
		// Then reset the scroll position
		m_scrollPos = Vector2.zero;
		
		m_katoUpgradeToggleFlag = false;
		m_featsToggleFlag = false;
		m_skillToggleFlag = false;
		m_itemToggleFlag = false;
	}
	
	//-----------------------------
	function OnListButton()
	{
	   
	   GUI.skin = m_customSkin;
	   scrollposition = GUI.BeginScrollView(
	   scorll_Bigen,//Rect(0,0,100,100),
	   scrollposition,
	   scorll_End//Rect(0,0,200,600)
	   );
	   OnKatoUpgradeButton();
	   OnFeatsButton();
	   OnSkillButton();
	   OnItemButton();
	   OnLeftColumnCursor();
	   GUI.EndScrollView();
	   
	}
	
	
	function OnLeftColumnCursor()
	{
		var pos : Vector2;
		if (0 == currentColumn) {
			switch(currentLeftRow) {
			case 0:
			pos = m_katoUpgradeButtonInfo.position;
			break;
			case 1:
			pos = m_featsButtonInfo.position;
			break;
			case 2:
			pos = m_skillButtonInfo.position;
			break;
			case 3:
			pos = m_itemButtonInfo.position;
			break;
			default:
			break;
			}
			
			GUI.DrawTexture(Rect(pos.x + 100, pos.y + 50, m_currentMenuCursor.width, m_currentMenuCursor.height), m_currentMenuCursor, ScaleMode.ScaleAndCrop, true);
		}
	}
	
	function OnKatoUpgradeButton()
	{	
		m_tempFlag = PageToggle(m_katoUpgradeButtonInfo,
								Rect(m_katoUpgradeButtonInfo.position.x,
								     m_katoUpgradeButtonInfo.position.y,
			m_customSkin.customStyles[m_katoUpgradeButtonInfo.customStyleIndex].normal.background.width * UiManager.Singleton().GetScreenSizeFactor().x,
			m_customSkin.customStyles[m_katoUpgradeButtonInfo.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y), 
							 m_katoUpgradeToggleFlag);
		
		if ( m_tempFlag && !m_katoUpgradeToggleFlag)
		{
			currentLeftRow = 0;
			DeactiveAllToggle();
			m_katoUpgradeToggleFlag = true;
		}
	}
	
	function OnFeatsButton()
	{	
		m_tempFlag = PageToggle(m_featsButtonInfo, 
								Rect(m_featsButtonInfo.position.x,
								     m_featsButtonInfo.position.y,
			m_customSkin.customStyles[m_featsButtonInfo.customStyleIndex].normal.background.width * UiManager.Singleton().GetScreenSizeFactor().x,
			m_customSkin.customStyles[m_featsButtonInfo.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y ), 
								m_featsToggleFlag);
		
		if ( m_tempFlag && !m_featsToggleFlag)
		{
			currentLeftRow = 1;
			DeactiveAllToggle();
			m_featsToggleFlag = true;
		}
	}
	
	function OnSkillButton()
	{		
		m_tempFlag = PageToggle(m_skillButtonInfo,
								Rect(m_skillButtonInfo.position.x,
								     m_skillButtonInfo.position.y,
				m_customSkin.customStyles[m_skillButtonInfo.customStyleIndex].normal.background.width * UiManager.Singleton().GetScreenSizeFactor().x,
				m_customSkin.customStyles[m_skillButtonInfo.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y							), 

				 			   m_skillToggleFlag);
		
		if ( m_tempFlag && !m_skillToggleFlag)
		{
			currentLeftRow = 2;
			DeactiveAllToggle();
			m_skillToggleFlag = true;
		}
	}
	
	function OnItemButton()
	{
	    m_tempFlag = PageToggle(m_itemButtonInfo,
								Rect(m_itemButtonInfo.position.x,
								     m_itemButtonInfo.position.y,
				m_customSkin.customStyles[m_itemButtonInfo.customStyleIndex].normal.background.width * UiManager.Singleton().GetScreenSizeFactor().x,
				m_customSkin.customStyles[m_itemButtonInfo.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y							), 

				 			   m_itemToggleFlag);
		
		if ( m_tempFlag && !m_itemToggleFlag)
		{
			currentLeftRow = 3;
			DeactiveAllToggle();
			m_itemToggleFlag = true;
		}
	}
	function OnBackButton()
	{		
		if ( PageButton(m_backButtonInfo) )
		{
			BackAction();
		}
	}
	
	function BackAction() {
		//SwitchPageToPrePage();
		SetEnabled(false);
		SceneManager.Singleton().Save(GameManager.Singleton().GetGameData(GameManager.Singleton().GetMainActorId()).m_level);
		SwitchLevelTrigger.SwitchLevel("Upgrade", "", true, 0, false);
	}
	
	function OnContinueButton()
	{		
		if ( PageButton(m_continueButtonInfo) )
		{
			NextAction();
		}
	}
	
	function NextAction() {
		//SwitchPageTo(m_nextPage);
		SetEnabled(false);
		SceneManager.Singleton().Save(GameManager.Singleton().GetGameData(GameManager.Singleton().GetMainActorId()).m_level);
		SwitchLevelTrigger.SwitchLevel("UpgradeChooseSkill", "", true, 0, false);
	}
}