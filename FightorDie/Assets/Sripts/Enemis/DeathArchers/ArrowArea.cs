using UnityEngine;
using System.Collections;

public class ArrowArea : MonoBehaviour {
    private float liveTime = 0.2f;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        liveTime -= Time.deltaTime;
        if (liveTime < 0)
        {
            Destroy(this.gameObject);
        }
	}
}
