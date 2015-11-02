using UnityEngine;
using System.Collections;

public class Items : MonoBehaviour {
    private float origPositionY = -13.3f; 
	// Use this for initialization
	void Start () {
        float positionY = origPositionY/(1920f/1080f)*(1.0f * Screen.height / Screen.width);
        this.transform.position = new Vector2(0,positionY);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
