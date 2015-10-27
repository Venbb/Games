//#pragma strict
//public class mopayInfo
//{
//    var AppliacationID : String;
//	var countryID : String;
//	var ButtonID : String;
//	var ServiceName : String;
//	var prodouctName : String;
//}
//public class GetMopayInfo
//{
//    var myid : String;
//    var mount : int;
//}
//public class MopayURlInfo
//{
//    var ButtonID : String;
//    var CountryID : String;
//    var Myid : String;
//    var Productname : String;
//    var Servicename : String;
//}
//public class mopay1
//{
//   var mopayWWW : WWW;
//   var mopayUrl : String;
//   var mopayText : String;
//   var mopayStatues : String;
//   var mopayGuid : String;
//   var mopayMyid : String;
//   var mopaySuccese : boolean;
//   
//}
//public class formopay extends Page
//{
//var m_money : GetMopayInfo[];
//var javaClass : AndroidJavaClass = null;
//var ObjectClass : AndroidJavaObject = null;
//var resultId : int = 0;
//var m_result : boolean = false;
//var m_mopayInfomation : mopayInfo[];
//var m_ButtonsID : int = 0;
////---------------
////---URL for mopay Web---
//var m_mopayRecall : mopay1[];
//var m_mopayUrl : String;
//var m_mopayUrlParameter : MopayURlInfo[];
//var m_mopayWWW : WWW;
//var m_mopayText : String ;
//var m_RecallUrl : String[];
//var m_MaxTime : int = 0;
//var m_OutTime : boolean = false;
//var m_BeginSerch : boolean = false;
//var m_label : String = "abc";
//var m_RecallStyle : GUIStyle;
//var m_RecallRect : Rect;
//private static var m_instance : formopay = null;
//static var m_JsonText : String = null;
//
//var Rlabel : Rect;
//
//var m_RecallLabel : label;
//var m_RecallTime : int = 0;
//var m_RecalInfo : String = "There is no transaction request";
//
//var m_ControlRead : boolean  =true;
//function Awake()
//{
////ControllableActor.Singleton().OnIncreaseMoney(196000);
////SceneManager.Singleton().Save(GameManager.Singleton().GetGameData(GameManager.Singleton().GetMainActorId()).m_level);
//   if(m_instance == null)
//   {
//      m_instance = this;
//   }
//}
//static function Singleton() : formopay
//{
//    return m_instance;
//}
//function Start () 
//{
////    javaClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
////	ObjectClass = javaClass.GetStatic.<AndroidJavaObject>("currentActivity");
//	m_mopayRecall[m_ButtonsID].mopayText = null;
//	
//}
//
//function ReadJso(UrlWWW : WWW, Url : String, UrlText : String) 
//{
//    if(Url != null)
//    {
//       UrlWWW = new WWW(Url); 
//	   yield UrlWWW;
//	   UrlText = UrlWWW.text.ToString();
//	   Debug.Log("1"+UrlText);
//       m_JsonText = UrlWWW.text.ToString();
//       Debug.Log("2"+m_JsonText);
//       Debug.Log(GetInstanceID());
//	  // Debug.Log(UrlText);
//    }
//    
//    //var jd : LitJson.JsonData;
//}
//function GetJsonMyid(IdStr : String, myid : int)
//{
//   var jd : LitJson.JsonData;
//   var StartId : int = 10000;
//   jd = LitJson.JsonMapper.ToObject(IdStr);
//   if(jd == null)
//   {
//      myid = StartId;
//   }
//   if(jd.IsArray)
//   {
//      myid = parseInt(jd[jd.Count - 1]["myid"].ToString())+1;
//   }
//   return myid;
//}
//function change(str : String) : String
//{
//    var str1 :char ;
//    var str2:String;
//    for(var index : int = 0;index < str.length;index++)
//    {
//    
//	if( str[index]==" ")
//	{
//	    str2+="";
//	   continue;
//	}
//     str2+=str[index];
//    }
//    str = str2;
//    return str;
//}
//
//
//function JsonToStr(str : String, JsonStatus : String, JsonGuid : String, JsonMydi : String) : boolean
//{
//    var jd : LitJson.JsonData;
//    
//    jd = LitJson.JsonMapper.ToObject(str);
//    Debug.Log(jd);
//    if(jd)
//    {
//          if(jd["myid"].ToString() == JsonMydi )
//          {
//              JsonStatus = jd["status"].ToString();
//              //JsonGuid = jd["guid"].ToString();
//              if(JsonStatus.ToString() == "faild")
//              {
//                    m_RecallLabel.m_label_show = true;
//                    m_RecalInfo = "The transaction is failed";
//                    return false;
//                   
//       
//              }
//		      else if(JsonStatus.ToString() == "SUCCESS")
//		      {
//			       Debug.Log("the translate is succese");  ;  
//			       m_RecallLabel.m_label_show = true;
//			       m_RecalInfo = "The transaction is successful";
//			       m_RecallLabel.m_label_show = true;
//			       return true;
//		      }
//		      else
//		      {
//		           return false;
//		           // ShoppingPage.Singleton().closeMopay();
//		      }
//         }
//         else
//         {
//              Debug.Log("false");
//              ShoppingPage.Singleton().closeMopay();
//              
//         }      
//      // }
//    }
//    else
//    {
//       Debug.Log("Not Succese");
//       return false;
//    }
//   
// 
//}
//
//function AddGold(mount : int)
//{
//    ControllableActor.Singleton().OnIncreaseMoney(mount);
//}
//function MopaySDK()
//{
////---------FOR MOPAY SDK-----------
//    /* if(ShoppingPage.Singleton().showMopay())
//     {
//        m_ButtonsID = ShoppingPage.Singleton().ReturnButtonID();
//        ObjectClass.Call("startPayment");
//        m_result = true;
//        ShoppingPage.Singleton().closeMopay();
//        Debug.Log("mopay");
//        ShoppingPage.Singleton().ResetButtonID();
//     }
//     if(m_result) 
//     {
//         resultId = ObjectClass.Call.<int>("returnResult",
//                                            m_mopayInfomation[m_ButtonsID-1].AppliacationID,
//                                            m_mopayInfomation[m_ButtonsID-1].countryID,
//                                            m_mopayInfomation[m_ButtonsID-1].ButtonID,
//                                            m_mopayInfomation[m_ButtonsID-1].ServiceName,
//                                            m_mopayInfomation[m_ButtonsID-1].prodouctName);
//     }  
//     if(resultId != 0 )
//		{
//			if(m_ButtonsID == 1)
//			{
//				if(resultId == 1)
//				{
//				//	  abc = "aaaaaaaaaaaaaaaaaaa";
//				ControllableActor.Singleton().OnIncreaseMoney(10000);
//					  
//				}
//				else if(resultId == 2)
//				{
//				//	  abc = "bbbbbbbbb";
//				//ControllableActor.Singleton().OnIncreaseMoney(10000);
//				}
//				else
//				{
//				//	abc = "cccccccccccccccccccc";
//				}
//			}
//			m_result = false;
//			resultId = 0;
//			m_ButtonsID = 0;
//		}*/
//}
//function FixedUpdate ()
//{
//   Time.timeScale=1;
//   //change("asd as  d");
//   if(ShoppingPage.Singleton().showMopay())
//   {
//       
//	   m_MaxTime ++ ;
//	   //Debug.Log(m_MaxTime);
//	   if(m_MaxTime > 100)
//	     {
//	        m_BeginSerch = true;
//	     }
//	   if(m_MaxTime > 30000)
//	   {
//	     
//	     m_OutTime = true;
//	     m_MaxTime = 0;
//	   }
//   }
//   if(m_RecallLabel.m_label_show)
//   {
//       m_RecallTime++;
//       if(m_RecallTime > 500)
//       {
//          m_RecallLabel.m_label_show = false;
//          m_RecallTime = 0;
//       }
//       
//   }
//}
//function Update () 
//{
//  //---------FOR MOPAY SDK-----------
//   //MopaySDK();
//   //Debug.Log(System.DateTime.Now);
//		 if(ShoppingPage.Singleton().showMopay())
//	     {
//	       if(m_BeginSerch && m_ControlRead)
//	       {
//		        m_ButtonsID = ShoppingPage.Singleton().ReturnButtonID() -1 ;
//		        m_mopayRecall[m_ButtonsID].mopayMyid = (ShoppingPage.Singleton().ReturnShoppingID()).ToString();
////		        Debug.Log(m_mopayRecall[m_ButtonsID].mopayMyid);
//		        m_mopayRecall[m_ButtonsID].mopayUrl = "http://www.enveesoft.com/barbarian/mopay/barbarjson.asp?"
//		                                              +"myid="+m_mopayRecall[m_ButtonsID].mopayMyid
//		                                              +"&amount="+m_money[m_ButtonsID].mount;
//		        StartCoroutine(ReadJso(m_mopayRecall[m_ButtonsID].mopayWWW,
//		                               m_mopayRecall[m_ButtonsID].mopayUrl,
//		                               m_mopayRecall[m_ButtonsID].mopayText));
//		        m_ControlRead = false;
//		        
//		    } 
//		   
//		    if(m_JsonText != null)
//		    {
//		        m_mopayRecall[m_ButtonsID].mopayText = m_JsonText;  
//		        Debug.Log(m_JsonText);                                        
//		        if(m_mopayRecall[m_ButtonsID].mopayText != null && m_mopayRecall[m_ButtonsID].mopayText!= "000000")
//		        {
//		          //  Debug.Log(m_mopayRecall[m_ButtonsID].mopayText);
//			        if(JsonToStr(m_mopayRecall[m_ButtonsID].mopayText,
//			                  m_mopayRecall[m_ButtonsID].mopayStatues,
//			                  m_mopayRecall[m_ButtonsID].mopayGuid,
//			                  m_mopayRecall[m_ButtonsID].mopayMyid))
//			        {
//			           m_mopayRecall[m_ButtonsID].mopaySuccese = true;
//			        }   
//		        }
//		     }
//		        
//		       // ShoppingPage.Singleton().closeMopay();
//		      //  ShoppingPage.Singleton().closeMopay();
//		       // m_BeginSerch = false;
//		           
//	     }
//	     if( m_mopayRecall[m_ButtonsID].mopaySuccese == true )
//		 {
//		    m_label = "ccc";
//			if(m_ButtonsID == 0)
//			{
//				ControllableActor.Singleton().OnIncreaseMoney(10000);
//				ShoppingPage.Singleton().closeMopay();
//				m_mopayRecall[m_ButtonsID].mopayMyid = null;
//				
//				//---
//				m_mopayRecall[m_ButtonsID].mopaySuccese = false;
//			}
//			else if(m_ButtonsID == 1)
//			{
//			    ControllableActor.Singleton().OnIncreaseMoney(30000);
//			    ShoppingPage.Singleton().closeMopay();
//			    m_mopayRecall[m_ButtonsID].mopaySuccese = false;
//			    m_mopayRecall[m_ButtonsID].mopayMyid = null;
//			}
//			else if(m_ButtonsID == 2)
//			{
//			ControllableActor.Singleton().OnIncreaseMoney(65000);
//			    ShoppingPage.Singleton().closeMopay();
//			    m_mopayRecall[m_ButtonsID].mopaySuccese = false;
//			    m_mopayRecall[m_ButtonsID].mopayMyid = null;
//			}
//			else if(m_ButtonsID == 3)
//			{
//			ControllableActor.Singleton().OnIncreaseMoney(145000);
//			    ShoppingPage.Singleton().closeMopay();
//			    m_mopayRecall[m_ButtonsID].mopaySuccese = false;
//			    m_mopayRecall[m_ButtonsID].mopayMyid = null;
//			    //-----control the ads-------
//			}
//			else if(m_ButtonsID == 4)
//			{
//			ControllableActor.Singleton().OnIncreaseMoney(196000);
//			    ShoppingPage.Singleton().closeMopay();
//			    m_mopayRecall[m_ButtonsID].mopaySuccese = false;
//			    m_mopayRecall[m_ButtonsID].mopayMyid = null;
//			    //-----control the ads-------
//			}
//			else if(m_ButtonsID == 5)
//			{
//			ControllableActor.Singleton().OnIncreaseMoney(680000);
//			    ShoppingPage.Singleton().closeMopay();
//			    m_mopayRecall[m_ButtonsID].mopaySuccese = false;
//			    m_mopayRecall[m_ButtonsID].mopayMyid = null;
//			    //-----control the ads-------
//			}
//			else if(m_ButtonsID == 6)
//			{
//			ControllableActor.Singleton().OnIncreaseMoney(1);
//			    ShoppingPage.Singleton().closeMopay();
//			    m_mopayRecall[m_ButtonsID].mopaySuccese = false;
//			    m_mopayRecall[m_ButtonsID].mopayMyid = null;
//			    //-----control the ads-------
//			}
//			else if(m_ButtonsID == 7)
//			{
//			ControllableActor.Singleton().OnIncreaseMoney(1);
//			    ShoppingPage.Singleton().closeMopay();
//			    m_mopayRecall[m_ButtonsID].mopaySuccese = false;
//			    m_mopayRecall[m_ButtonsID].mopayMyid = null;
//			    //-----control the ads-------
//			}
//			m_ButtonsID = 0;
//			m_MaxTime = 0;
//			m_BeginSerch = false;
//			m_ControlRead = true;
//			 m_JsonText = null;
//			m_mopayRecall[m_ButtonsID].mopaySuccese = false;
//			SceneManager.Singleton().Save(GameManager.Singleton().GetGameData(GameManager.Singleton().GetMainActorId()).m_level);
//		 }
//		 else if(m_OutTime == true /*----out of the time-----*/)
//		 {
//		     ShoppingPage.Singleton().closeMopay();
//		     Debug.Log("can't find any shopping for this id");
//		 }
//		 }
//	   
//  
//
//}
//function OnGUI()
//{
//  GUI.depth = -1;
//  //Debug.Log(Time.deltaTime);
//  /*GUI.Button(Rect(Screen.width/Rlabel.x,
//                 Screen.height/Rlabel.y,
//                 Screen.width/Rlabel.width,
//                 Screen.height/Rlabel.height),m_mopayRecall[m_ButtonsID].mopayMyid);
//  GUI.Button(Rect(Screen.width/Rlabel.x,
//                 Screen.height/(Rlabel.y/500),
//                 Screen.width/Rlabel.width,
//                 Screen.height/Rlabel.height),test);*/
//  if(m_RecallLabel.m_label_show)
//  {
//	  GUI.Label(Rect(Screen.width/m_RecallLabel.m_label_PositionX,
//	                 Screen.height/m_RecallLabel.m_label_PositionY,
//	                 Screen.width/m_RecallLabel.m_label_BoundsX,
//	                 Screen.height/m_RecallLabel.m_label_BoundsY),
//	                 m_RecalInfo,
//	                 m_RecallStyle);
//   }                 
//}