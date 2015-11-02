using UnityEngine;
using System.Collections;

public class KeyLight : MonoBehaviour {
    public Sprite[] m_keySprites;
    private SpriteRenderer m_renderer;
    private float lightTime = 0.2f;
    private bool isLight = false;
	// Use this for initialization
	void Start () {
        m_renderer = this.GetComponent<SpriteRenderer>();
	}
	
	// Update is called once per frame
	void Update () {

        if (isLight) {
            m_renderer.sprite = m_keySprites[1];
            lightTime -= Time.deltaTime;
            if (lightTime < 0) {
                isLight = false;
                m_renderer.sprite = m_keySprites[0];
            }
        }

	}

    public void lightKey() {
        isLight = true;
        lightTime = 0.2f;
    }


}
