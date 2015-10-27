// 2011.08 yun.li
// GameOptionsManager

#pragma strict

enum ELanguage
{
	English = 0,
	Japanese,
	Chinese,
	
	Count,
	ForceTo32Bytes = 0x7FFFFFFF
}

class GameOptionsManager
{
	var m_language : int = ELanguage.English;
	var m_enableSliceBlade : boolean = true;
	var m_enableBgm : boolean = true;
	var m_enableSound : boolean = true;

	static private var m_instance : GameOptionsManager = null;
	static private var ms_language : int = ELanguage.English;
	
	static function Singleton() : GameOptionsManager
	{
		if (m_instance == null)
		{
			m_instance = new GameOptionsManager();
			
			/*
			if (PlayerPrefs.HasKey("language"))
			{
				var tempLanguage : String = PlayerPrefs.GetString("language");

				//Debug.Log(PlayerPrefs.GetString("language"));
				
				switch (tempLanguage)
				{
					case "ja" :
				 		ms_language = ELanguage.Japanese;
				 		break;
				 	
					case "en" :
						ms_language = ELanguage.English;
				 		break;
				 	
					case "zh" :
						// to do
						ms_language = ELanguage.English;
				 		break;
				 	
					default :
				    	ms_language = ELanguage.English;
				    	break;
				}
			}
			*/
			

			switch (Application.systemLanguage)
			{
				case SystemLanguage.Japanese :
				 	ms_language = ELanguage.Japanese;
				 	break;
				 	
				case SystemLanguage.English :
					ms_language = ELanguage.English;
				 	break;
				 	
				case SystemLanguage.Chinese :
					// to do
					ms_language = ELanguage.Chinese;
				 	break;
				 	
				default :
				    ms_language = ELanguage.English;
				    break;
			}
		}
	
		return m_instance;
	}

	private function GameOptionsManager()
	{
		Load();
	}

	function EnableSliceBlade(flag : boolean)
	{
		m_enableSliceBlade = flag;
	}
	
	function SetLanguage(language : ELanguage)
	{
		m_language = language;
	}
	
	function GetLanguage() : ELanguage
	{
		return ms_language;
	}

	function IsSliceBladeEnabled() : boolean
	{
		return m_enableSliceBlade;
	}

	function EnableBgm(flag : boolean)
	{
		m_enableBgm = flag;
	}

	function EnableSound(flag : boolean)
	{
		m_enableSound = flag;
	}

	function IsBgmEnabled() : boolean
	{
		return m_enableBgm;
	}

	function IsSoundEnabled() : boolean
	{
		return m_enableSound;
	}	

	function IsUseGamePad() : boolean
	{
		// Hake change,
		// To make it support game pad
		return m_enableSliceBlade;
	}
	
	function Load()
	{
		if ( PreviewLabs.PlayerPrefs.HasKey("language") )
		{
			m_language = PreviewLabs.PlayerPrefs.GetInt("language");

		}
		
		if ( PreviewLabs.PlayerPrefs.HasKey("m_enableSliceBlade") )
		{
			m_enableSliceBlade = PreviewLabs.PlayerPrefs.GetBool("m_enableSliceBlade");
			m_enableBgm = PreviewLabs.PlayerPrefs.GetBool("m_enableBgm");
			m_enableSound = PreviewLabs.PlayerPrefs.GetBool("m_enableSound");
		}
	}

	function Save()
	{
		PreviewLabs.PlayerPrefs.SetInt("language", m_language);
		PreviewLabs.PlayerPrefs.SetBool("m_enableSliceBlade", m_enableSliceBlade);
		PreviewLabs.PlayerPrefs.SetBool("m_enableBgm", m_enableBgm);
		PreviewLabs.PlayerPrefs.SetBool("m_enableSound", m_enableSound);
		PreviewLabs.PlayerPrefs.Flush();
	}
	
	function Reset()
	{
		//Don't reset any
		//m_language = ELanguage.English;
		//m_enableSliceBlade = true;
		//m_enableBgm = true;
		//m_enableSound = true;
	}
}