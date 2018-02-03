using UnityEngine;
using System.Collections;

public class SM_DelayHideOrDisplay : MonoBehaviour {
	public GameObject obj;
	public float delayDisplayTime = 1.0f;
	public float delayHideTime = 1.0f;
	void OnEnable(){
		obj.SetActive (false);
		StartCoroutine (DelayHideOrDisplay());
	}
	IEnumerator DelayHideOrDisplay()
	{
		if (delayDisplayTime < delayHideTime) {
			yield return new WaitForSeconds (delayDisplayTime);
			obj.SetActive (true);
			yield return new WaitForSeconds (delayHideTime);
			obj.SetActive (false);
		} else {
			yield return new WaitForSeconds (delayDisplayTime);
			obj.SetActive (true);
		}
	}
}
