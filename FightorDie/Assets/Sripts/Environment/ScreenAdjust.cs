using UnityEngine;
using System.Collections;

public class ScreenAdjust : MonoBehaviour {
    public AudioSource bgAudio;
    public  Vector2 nativeResolution = new Vector2(1080 , 1920);
    public float origSize = 6.4f;
    public float f_UpdateInterval = 0.5F;
    private float f_LastInterval;
    private int i_Frames = 0;
    private float f_Fps;

    void Awake()
    {
        var camera = GetComponent<Camera>();
        
        if (camera.orthographic)
        {
            float h2w = nativeResolution.y / nativeResolution.x;
            float realH2W = 1.0f * Screen.height / Screen.width;
            camera.orthographicSize = origSize/(h2w/realH2W);
        }
    }


	// Use this for initialization
	void Start () {
        f_LastInterval = Time.realtimeSinceStartup;
        i_Frames = 0;
	}
	
	// Update is called once per frame
	void Update () {
        ++i_Frames;

        if (Time.realtimeSinceStartup > f_LastInterval + f_UpdateInterval)
        {
            f_Fps = i_Frames / (Time.realtimeSinceStartup - f_LastInterval);

            i_Frames = 0;

            f_LastInterval = Time.realtimeSinceStartup;
        }
	}

    void OnGUI()
    {
        // 改变字符的大小
        GUI.skin.label.fontSize = 16;
        GUI.skin.label.normal.textColor = Color.white;
        GUI.skin.label.alignment = TextAnchor.UpperRight;
        // 输出文字
        GUI.Label(new Rect(0, 0, Screen.width, Screen.height), "fps = " + f_Fps.ToString("f2"));
    }
}
