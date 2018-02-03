using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Singleton;
public class MonoSingleDemo : XMonoSingleton<MonoSingleDemo>
{

	// Use this for initialization
	void Start () {
        Debug.Log("This is an example");
    }
	
	// Update is called once per frame
	void Update () {
		
	}
}
