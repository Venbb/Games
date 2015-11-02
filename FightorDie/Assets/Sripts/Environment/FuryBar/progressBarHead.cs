using UnityEngine;
using System.Collections;

public class progressBarHead : MonoBehaviour {
    public Sprite[] sprites;
    private SpriteRenderer m_renderer;
     //Use this for initialization
	void Start () {
        m_renderer = this.gameObject.GetComponent<SpriteRenderer>();
	}
	
	// Update is called once per frame
	void Update () {
	    
	}

    public void changeSprite(int index)
    {
        m_renderer.sprite = sprites[index];
    }

    public void resetHead() {
        m_renderer.sprite = sprites[0];
    }

}
