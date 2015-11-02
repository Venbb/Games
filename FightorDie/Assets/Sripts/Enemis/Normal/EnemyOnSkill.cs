using UnityEngine;
using System.Collections;

public class EnemyOnSkill : MonoBehaviour {

    public Transform skill_animation;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void onSkill() {
        Instantiate(skill_animation, this.transform.position, this.transform.rotation);
    }
}
