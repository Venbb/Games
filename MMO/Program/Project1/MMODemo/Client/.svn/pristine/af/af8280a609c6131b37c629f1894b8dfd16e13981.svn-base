using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Debuger;
public class LogDemo : MonoBehaviour {
    private const int MaxNum = 31;
    /// <summary>
    /// 日志
    /// </summary>
    private string EXAMPLE_LOG_TAG = "log_tag";
    private string EXAMPLE_LOG_TAG_MAIN = "log_tag_main";
    // Use this for initialization
    void Start () {
        Debuger.EnableLog = true;
        this.Log("This is an example");
        this.Log("This is an int {0}", 1);
        this.LogError(EXAMPLE_LOG_TAG, "This is an tag");
        this.LogError(EXAMPLE_LOG_TAG, "This is an tag{0}", MaxNum);
        this.LogError(EXAMPLE_LOG_TAG_MAIN, "This is an tag{0}", MaxNum);

    }
	
	// Update is called once per frame
	void Update () {
		
	}
}
