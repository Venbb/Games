using UnityEngine;
using System;
using System.Runtime.InteropServices;
using System.Collections;
using LitJson; // http://litjson.sourceforge.net/


public sealed class MobclickAgent:MonoBehaviour {
#if UNITY_IPHONE
	void updateCallBack(String jsonHash)
	{
		//Debug.Log ("Hello", gameObject);
		Debug.Log("Implement Callback "+jsonHash);
	}
#endif
	void Start () {
#if UNITY_IPHONE
//ReportPolicy		
//REALTIME = 0,       //send log when log created
//BATCH = 1,          //send log when app launch
//SENDDAILY = 4,      //send log every day's first launch
//SENDWIFIONLY = 5    //send log when wifi connected
		
		MobclickAgent.StartWithAppKeyAndReportPolicyAndChannelId("4f3122f152701529bb000042",0,"Develop");
		MobclickAgent.SetLogEnabled(true);
		MobclickAgent.SetCrashReportEnabled(true);
		MobclickAgent.CheckUpdate();
		MobclickAgent.UpdateOnlineConfig();
		MobclickAgent.Event("GameState");
#elif UNITY_ANDROID
//ReportPolicy
//	REALTIME = 0;			//send log when log created
//	BATCH_AT_LAUNCH = 1;	//send log when app launch	
//  DAILY = 4;				//send log when app daily
//  WIFIONLY = 5;			//send log when wifi connected
		
		MobclickAgent.onResume();
		MobclickAgent.setReportPolicy(0);	
		MobclickAgent.onError();
		MobclickAgent.setLogEnabled(true);

// Android: call MobclickAgent.onPause(); when Application exit.
		
		
#endif
	}
	public void Dispose()
	{
#if UNITY_ANDROID
		cls_MobclickAgent.Dispose();
#endif
	}
#if	UNITY_ANDROID
	
	private static AndroidJavaClass cls_MobclickAgent;
	private static readonly object lockHelper = new object();

	private static AndroidJavaClass Instanse()
	{
		if(cls_MobclickAgent == null){
			lock(lockHelper)
			{
				if(cls_MobclickAgent == null)
				{
					cls_MobclickAgent = new AndroidJavaClass("com.mobclick.android.MobclickAgent");
				}
			}
		}
		
		return cls_MobclickAgent;
	}
	
	public static void onResume()
	{
		using(AndroidJavaClass cls_UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer")) 
		{
			using(AndroidJavaObject obj_Activity = cls_UnityPlayer.GetStatic<AndroidJavaObject>("currentActivity")) 
			{
				Instanse().CallStatic("onResume", obj_Activity);
			}
		}
	}
	
	public static void onPause()
	{
		using(AndroidJavaClass cls_UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer")) 
		{
			using(AndroidJavaObject obj_Activity = cls_UnityPlayer.GetStatic<AndroidJavaObject>("currentActivity")) 
			{
				Instanse().CallStatic("onPause", obj_Activity);
			}
		}
	}
	
	public static void onEvent(string tag)
	{
		using(AndroidJavaClass cls_UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer")) 
		{
			using(AndroidJavaObject obj_Activity = cls_UnityPlayer.GetStatic<AndroidJavaObject>("currentActivity")) 
			{
				Instanse().CallStatic("onEvent", obj_Activity,tag);
			}
		}
	}
	
	public static void onEvent(string tag, string label)
	{
		using(AndroidJavaClass cls_UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer")) 
		{
			using(AndroidJavaObject obj_Activity = cls_UnityPlayer.GetStatic<AndroidJavaObject>("currentActivity")) 
			{
				Instanse().CallStatic("onEvent", obj_Activity,tag,label);
			}
		}
	}
	
	public static void onEvent(string tag, string label, int acc)
	{
		using(AndroidJavaClass cls_UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer")) 
		{
			using(AndroidJavaObject obj_Activity = cls_UnityPlayer.GetStatic<AndroidJavaObject>("currentActivity")) 
			{
				Instanse().CallStatic("onEvent", obj_Activity,tag,label,acc);
			}
		}
	}
	
	
	public static void setContinueSessionMillis(long milliseconds)
	{
		Instanse().CallStatic("setSessionContinueMillis", milliseconds);
	}
	
	
	public static void onError()
	{
		using(AndroidJavaClass cls_UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer")) 
		{
			using(AndroidJavaObject obj_Activity = cls_UnityPlayer.GetStatic<AndroidJavaObject>("currentActivity")) 
			{
				Instanse().CallStatic("onError", obj_Activity);
			}
		}	
	}
	
	public static void setReportPolicy(int policy)
	{
		using(AndroidJavaClass cls_UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer")) 
		{
			using(AndroidJavaObject obj_Activity = cls_UnityPlayer.GetStatic<AndroidJavaObject>("currentActivity")) 
			{
				Instanse().CallStatic("setDefaultReportPolicy",obj_Activity,(int)policy);
			}
		}
	}
	
	public static void setLogEnabled(bool enabled)
	{
		Instanse().CallStatic("setDebugMode", enabled);
	}
	
	
	public static void setEnableLocation(bool reportLocation)
	{
		Instanse().CallStatic("setAutoLocation", reportLocation);
	}
	
#endif

#if UNITY_IPHONE
	//get Umeng Analytics SDK's Version
	public static String GetAgentVersion(){
		return _GetAgentVersion();
	}
	
	//set Umeng Analytics SDK Log switch
	public static void SetLogEnabled(bool value){
		_SetLogEnabled(value);
	}
	
	//set Umeng Analytics SDK Crash log switch
	public static void SetCrashReportEnabled(bool value){
		_SetCrashReportEnabled(value);
	}
	
	//start Umeng Analytics SDK session with your appkey,ReportPolicy,ChanneId
	public static void StartWithAppKeyAndReportPolicyAndChannelId(String appkey,int policy,String channelId){
		_StartWithAppKeyAndReportPolicyAndChannelId(appkey,policy,channelId);
	}
	
	//record a event log with a eventId
	public static void Event(String eventId){
		_Event(eventId);
	}
	
	//record a event log with a eventId
	public static void EventWithLabel(String eventId, String label){
		_EventWithLabel(eventId,label);
	}
	
	//record a event log with a eventId and times
	public static void EventWithAccumulation(String eventId, int accumulation){
		_EventWithAccumulation(eventId,accumulation);
	}
	
	//record a event log with a eventId, a label and times
	public static void EventWithLabelAndAccumulation(String eventId, String label,int accumulation){
		_EventWithLabelAndAccumulation(eventId,label,accumulation);
	}
	
	//record a Feedback from user
	//hash's keyName:
	//"UMengFeedbackGender"			value should be:	1 => male 2=> female
	//"UMengFeedbackAge"			value should be:	1 => <18 age (exclude 18)
	//													2 => 18 > 24 age 
	//													3 => 25 > 30 age
	//													4 => 31 > 35 age
	//													5 => 36 > 40 age
	//													6 => 41 > 50 age
	//													7 => 51 > 59 age
	//													8 => 60 age
	//"UMengFeedbackContent"		value should be String. you can combine all infomations to a string as value
	//We don't support GUI for unity feedback, you can make your GUI and use this data interface.
	public static void FeedbackWithDictionary(Hashtable hash){
		String str =  JsonMapper.ToJson(hash);
		_FeedbackWithDictionary(str);
	}
	
	//Check your app's update info. you should set new version's info on umeng's web portal
	public static void CheckUpdate(){
		_CheckUpdate();
	}
	
	//If your app You can change the default alert view's title and button's title
	public static void CheckUpdateAndCancelButtonTitleAndOtherButtonTitles(String title, String cancelBtnTitle,String otherBtnTitle){
		_CheckUpdateAndCancelButtonTitleAndOtherButtonTitles(title,cancelBtnTitle,otherBtnTitle);
	}
	
	//update your online configuration's info 
	public static void UpdateOnlineConfig(){
		_UpdateOnlineConfig();
	}
	
	//After update your online configuration's info, get any key's value
	public static String GetConfigParamsForKey(String key){
		return	_GetConfigParamsForKey(key);
	}
	
	//After update your online configuration's info, get all key and value
	public static JsonData GetConfigParams(){
		String jsonStr = _GetConfigParams();
		if(jsonStr!=null){
			return JsonMapper.ToObject(jsonStr);
		}
		return null;
	}
	
	//
	public static void LogPageViewAndSeconds(String pageName,int seconds){
		_LogPageViewAndSeconds(pageName,seconds);
	}
	
	public static void BeginLogPageView(String pageName){
		_BeginLogPageView(pageName);
	}
	
	public static void EndLogPageView(String pageName){
		_EndLogPageView(pageName);
	}
	
	//check if user's device JailBroken
	public static bool IsJailBroken(){
		return _IsJailBroken();
	}
	
	//Check if your App pirated
	public static bool IsPirated(){
		return _IsPirated();
	}
	
	[DllImport ("__Internal")]
	public static extern String _GetAgentVersion();
		
	[DllImport ("__Internal")]
	public static extern void _SetLogEnabled(bool value);
		
	[DllImport ("__Internal")]
	public static extern void _SetCrashReportEnabled(bool value);
	
	[DllImport ("__Internal")]
	public static extern void _StartWithAppKeyAndReportPolicyAndChannelId(String appkey,int policy,String channelId);
		
	[DllImport ("__Internal")]
	public static extern void _Event(String eventId);
		
	[DllImport ("__Internal")]
	public static extern void _EventWithLabel(String eventId, String label);
		
	[DllImport ("__Internal")]
	public static extern void _EventWithAccumulation(String eventId,int accumulation);
	
	[DllImport ("__Internal")]
	public static extern void _EventWithLabelAndAccumulation(String eventId, String label,int accumulation);
	
	[DllImport ("__Internal")]
	public static extern void _FeedbackWithDictionary(String jsonString);
	
	[DllImport ("__Internal")]
	public static extern void _CheckUpdate();
		
	[DllImport ("__Internal")]
	public static extern void _CheckUpdateAndCancelButtonTitleAndOtherButtonTitles(String title, String cancelBtnTitle,String otherBtnTitle);
	
	[DllImport ("__Internal")]
	public static extern void _UpdateOnlineConfig();
		
	[DllImport ("__Internal")]
	public static extern String _GetConfigParamsForKey(String key);
	
	[DllImport ("__Internal")]
	public static extern String _GetConfigParams();
	
	[DllImport ("__Internal")]
	public static extern void _LogPageViewAndSeconds(String pageName,int seconds);
		
	[DllImport ("__Internal")]
	public static extern void _BeginLogPageView(String pageName);
		
	[DllImport ("__Internal")]
	public static extern void _EndLogPageView(String pageName);
	
	[DllImport ("__Internal")]
	public static extern bool _IsJailBroken();
	
	[DllImport ("__Internal")]
	public static extern bool _IsPirated();	
#endif	

}

