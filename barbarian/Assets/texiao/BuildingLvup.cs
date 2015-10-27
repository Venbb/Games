using UnityEngine;
using System.Collections;

public class BuildingLvup : MonoBehaviour 
{

	// Use this for initialization
	void Start () {
        Invoke("DestroyGameObject", 10f);
	}
	
    void DestroyGameObject()
    {
        Destroy(gameObject);
    }
}
