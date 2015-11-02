using UnityEngine;
using System.Collections;

public class M_Functions : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public static int RandomInt(int n) {
        if (n > 100)
        {
            return Random.Range(0, n);
        }
        else {
            return Random.Range(0, 1000) % n;
        }
    }

}
