using UnityEngine;
using System.Collections;

public class ScoreCounter : MonoBehaviour {
    public Sprite[] sprites;
    private bool startCount = false; 
    private int nowNumber;
    private bool isNumberChange = false;
    private int changeRate = 10;
    private float timer = 0;
    private SpriteRenderer spriteRenderer;

	// Use this for initialization
	void Start () {
        spriteRenderer = GetComponent<Renderer>() as SpriteRenderer;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnGUI() {

        if (!startCount) {
            return;
        }

        if (isNumberChange) { 
            
        }
        timer += Time.deltaTime;
        if (timer > 1 / changeRate) {
            spriteRenderer.sprite = sprites[nowNumber];
        }
        
    }

    public void Draw(int number) {
        startCount = true;
        if (nowNumber != number) {
            nowNumber = number;
            isNumberChange = true;
        }
    }
}
