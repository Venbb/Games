using UnityEngine;
using System.Collections;

public class FuryBarController : MonoBehaviour {
    public Sprite[] sprites;
    private SpriteRenderer spriteRenderer;

	// Use this for initialization
	void Start () {
        spriteRenderer = GetComponent<Renderer>() as SpriteRenderer;
	}
	
	// Update is called once per frame
	void Update () {
        spriteRenderer.sprite = sprites[1];
        this.transform.position = new Vector2(0,0);
        spriteRenderer.sprite = sprites[4];
	}
}
