using UnityEngine;
using System.Collections;

public class mopay : MonoBehaviour
{
	public AndroidJavaClass javaClass = null;
	public AndroidJavaObject ObjectClass = null;
	public bool result = false;
	public int resultId = 0;
	public int id = 0;
	public string abc = "dddddddddddddddddddddddd" ;
	// Use this for initialization
	void Start () 
	{
		javaClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
		ObjectClass = javaClass.GetStatic<AndroidJavaObject>("currentActivity");
		//ObjectClass.Call("ceshi",id);
		Debug.Log(javaClass.ToString());
		//javaClass.Call("startPayment");
	}
	
	void OnGUI()
	{
   		if(GUI.Button(new Rect(Screen.width/1000,Screen.height/5,Screen.width/3,Screen.height/3),"mopay"))
   		{
			//javaClass.CallStatic("Bigin");
			//javaClass.Call("startPayment");
			//ObjectClass.CallStatic("Bigin");
			result = true;	
			ObjectClass.Call("startPayment");
			
			 //abc = "bbbbbbbbbbbbbbbbbb";
				
   		}
		
		GUI.Label(new Rect(Screen.width/1000,Screen.height/1.5f,Screen.width/1.5f,Screen.height/3),resultId.ToString());
	}
	void Update()
	{
		if(result)
		{
			 resultId = ObjectClass.Call<int>("returnResult");
			 //id ++;
		}
		if(resultId != 0 )
		{
			
			if(resultId == 1)
			{
				  abc = "aaaaaaaaaaaaaaaaaaa";
				  
			}
			else if(resultId == 2)
			{
				  abc = "bbbbbbbbb";
			}
			else
			{
				abc = "cccccccccccccccccccc";
			}
			result = false;
		}
	}
}
