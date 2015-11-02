using UnityEngine;
using System.Collections;

public class ArrowCollider : MonoBehaviour
{
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag.CompareTo("Block") == 0)
        {
            Destroy(this.gameObject);
            this.transform.parent.gameObject.GetComponent<ArcherManager>().beenBlock();
        }
        else if (other.tag.CompareTo("Player") == 0)
        {
            //Debug.Log("hero was killed by arrow!");
        }
    }
}
