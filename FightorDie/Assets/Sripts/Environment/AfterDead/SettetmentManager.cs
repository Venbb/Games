using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class SettetmentManager : MonoBehaviour {
    public GameObject PlayerScore;
    public GameObject MaxCombo;
    public GameObject Restart;
    public GameObject HomeButton;
    public GameObject WatchFiles;
    private Transform playerScoreTransform;
    private Transform maxComboTransform;
    private Transform restartTransform;
    private Transform HomeTransform;
    private Transform watchFilesTransform;
    private Vector2 playerScoreOrigPosition;
    private Vector2 maxComboOrigPosition;
    private Vector2 restartOrigPosition;
    private Vector2 homeOrigPosition;
    private Vector2 watchFilmsOrigPosition;
    private Vector2 playerScorePosition;
    private Vector2 maxComboPosition;
    private Vector2 restartPosition;
    private Vector2 buttonsPosition;
    private Vector2 watchFilmsPosition;

    public GameObject Shadows;
    private Transform ShadowsTransform;
    private Vector2 ShadowsOrigScale;
    private Vector2 shadowsScale;

    private float moveTime = 0.2f;
    private bool isMoveIn = false;
    private bool isMoveOut = false;
    private float moveTimer = 0f;

    public GameObject ScoreText;

    private float playerScoreOutDistance = 50.0f;
    private float maxComboOutDistance = 50.0f;
    private float restartOutDistance = 40.0f;
    private float homeOutDistance = 10.0f;
    private float watchFilmOutDistance = 15.0f;

    // Use this for initialization
    void Start()
    {
        //this.enabled = false;
        //this.gameObject.SetActiveRecursively(false);
        ShadowsTransform = Shadows.transform;
        ShadowsOrigScale = ShadowsTransform.localScale;
        playerScoreTransform = PlayerScore.transform;
        maxComboTransform = MaxCombo.transform;
        restartTransform = Restart.transform;
        HomeTransform = HomeButton.transform;
        watchFilesTransform = WatchFiles.transform;
        playerScoreOrigPosition = playerScoreTransform.position;
        maxComboOrigPosition = maxComboTransform.position;
        restartOrigPosition = restartTransform.position;
        homeOrigPosition = HomeTransform.position;
        watchFilmsOrigPosition = watchFilesTransform.position;

        shadowsScale = ShadowsOrigScale;
        shadowsScale.y += 4;
        ShadowsTransform.localScale = shadowsScale;

        playerScorePosition = playerScoreOrigPosition + new Vector2(-playerScoreOutDistance, -playerScoreOutDistance * Mathf.Tan(12.0f / 180 * Mathf.PI));
        maxComboPosition = maxComboOrigPosition + new Vector2(maxComboOutDistance, 0);
        restartPosition = restartOrigPosition + new Vector2(-restartOutDistance, 0);
        buttonsPosition = homeOrigPosition + new Vector2(0, -homeOutDistance);
        watchFilmsPosition = watchFilmsOrigPosition + new Vector2(0, watchFilmOutDistance);
        playerScoreTransform.position = playerScorePosition;
        maxComboTransform.position = maxComboPosition;
        restartTransform.position = restartPosition;
        HomeTransform.position = buttonsPosition;
        watchFilesTransform.position = watchFilmsPosition;
    }

    // Update is called once per frame
    void Update()
    {
        if (isMoveIn && moveTimer < moveTime) {
            moveTimer += Time.deltaTime;
            playerScorePosition -= new Vector2(-playerScoreOutDistance, -playerScoreOutDistance * Mathf.Tan(12.0f / 180 * Mathf.PI)) * Time.deltaTime / moveTime;
            maxComboPosition -= new Vector2(maxComboOutDistance, 0) * Time.deltaTime / moveTime;
            restartPosition -= new Vector2(-restartOutDistance, 0) * Time.deltaTime / moveTime;
            buttonsPosition -= new Vector2(0, -homeOutDistance) * Time.deltaTime / moveTime;
            watchFilmsPosition -= new Vector2(0, watchFilmOutDistance) * Time.deltaTime / moveTime;
            shadowsScale.y -= 4 * Time.deltaTime / moveTime;
            if(moveTimer >= moveTime){
                playerScorePosition = playerScoreOrigPosition;
                maxComboPosition = maxComboOrigPosition;
                restartPosition = restartOrigPosition;
                buttonsPosition = homeOrigPosition;
                watchFilmsPosition = watchFilmsOrigPosition;
                shadowsScale.y = 1;
                moveTimer = 0;
                isMoveIn = false;
                GameObject.Find("TouchController").GetComponent<MyTouchController>().setTouchState("settetment");
            }
            playerScoreTransform.position = playerScorePosition;
            maxComboTransform.position = maxComboPosition;
            restartTransform.position = restartPosition;
            HomeTransform.position = buttonsPosition;
            watchFilesTransform.position = watchFilmsPosition;
            ShadowsTransform.localScale = shadowsScale;
        }
        if (isMoveOut && moveTimer < moveTime)
        {
            moveTimer += Time.deltaTime;
            playerScorePosition -= new Vector2(-playerScoreOutDistance, -playerScoreOutDistance * Mathf.Tan(12.0f / 180 * Mathf.PI)) * Time.deltaTime / moveTime;
            maxComboPosition -= new Vector2(maxComboOutDistance, 0) * Time.deltaTime / moveTime;
            restartPosition -= new Vector2(-restartOutDistance, 0) * Time.deltaTime / moveTime;
            buttonsPosition += new Vector2(0, -homeOutDistance) * Time.deltaTime / moveTime;
            watchFilmsPosition += new Vector2(0, watchFilmOutDistance) * Time.deltaTime / moveTime;
            shadowsScale.y += 4 * Time.deltaTime / moveTime;
            if (moveTimer >= moveTime)
            {
                playerScorePosition = playerScoreOrigPosition + new Vector2(-playerScoreOutDistance, -playerScoreOutDistance * Mathf.Tan(12.0f / 180 * Mathf.PI));
                maxComboPosition = maxComboOrigPosition + new Vector2(maxComboOutDistance, 0);
                restartPosition = restartOrigPosition + new Vector2(-restartOutDistance, 0);
                buttonsPosition = homeOrigPosition + new Vector2(0, -homeOutDistance);
                watchFilmsPosition = watchFilmsOrigPosition + new Vector2(0, watchFilmOutDistance);
                shadowsScale.y = 5;
                moveTimer = 0;
                isMoveOut = false;
            }
            playerScoreTransform.position = playerScorePosition;
            maxComboTransform.position = maxComboPosition;
            restartTransform.position = restartPosition;
            HomeTransform.position = buttonsPosition;
            watchFilesTransform.position = watchFilmsPosition;
            ShadowsTransform.localScale = shadowsScale;
        }
        
    }

    public void setAviliable(bool TorF)
    {
        //this.enabled = TorF;
        //this.gameObject.SetActiveRecursively(TorF);
        if (TorF)
        {
            ScoreText.GetComponent<Text>().text = GameObject.Find("Kill").GetComponent<ScoreManager>().getScores() + "";
            GameObject.Find("maxComboCountText").GetComponent<Text>().text = "" + GameObject.Find("Kill").GetComponent<ScoreManager>().getMaxCombo();
            isMoveIn = true;
            //GameObject.FindGameObjectWithTag("ReviveSence").GetComponent<ReviveManager>().setAviliable(false);
        }
        else {
            isMoveOut = true;
        }
    }
}
