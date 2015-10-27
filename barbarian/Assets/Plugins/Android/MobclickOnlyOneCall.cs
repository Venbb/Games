using UnityEngine;
using System.Collections;

public class MobclickOnlyOneCall : MonoBehaviour {
	public string SendName;
	static public bool OnceCall=true;
	// Use this for initialization
	void Start () {
		
	if(OnceCall)
		{
			
			//MobclickAgent.onEvent(SendName);
			
			OnceCall=false;
		}
	}
	
	
}
