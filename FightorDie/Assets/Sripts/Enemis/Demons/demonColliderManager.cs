using UnityEngine;
using System.Collections;

public class demonColliderManager : MonoBehaviour {
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag.CompareTo("Player") == 0) {
            this.transform.parent.gameObject.GetComponent<DemonsMove>().beVictory();
        }
    }
}
