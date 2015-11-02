using UnityEngine;
using System.Collections;

public class ShakeScreen : MonoBehaviour {

	private int shakeState = 0;
	private int maxState = 5;
    private int maxState2 = 20;
	private int shakeMod;
	private Transform m_transform;
	private int frameRate = 30;
	private float timer = 0;
    private float translateDistance = 0;
    private float distanceUnit = -0.1f;

    private Vector3 offsetPosition = new Vector3(0, 0.8f, 0);

	// Use this for initialization
	void Start () {
        //change to shake camera
		m_transform =this.transform;
	}
	
	// Update is called once per frame
	void Update () {
		if(timer<=0 && shakeState>0 ){
			shakeState--;
			switch (shakeMod) {
			case 1: 
				float rotateAngelZ = 0;
                switch (shakeState)
                {
                    case 1: rotateAngelZ = -1;
                        break;
                    case 2: rotateAngelZ = 1;
                        break;
                    case 3: rotateAngelZ = 1;
                        break;
                    case 4:
                        m_transform.rotation = Quaternion.Euler(0, 0, 0);
                        m_transform.localScale = new Vector3(1, 1, 1);
                        rotateAngelZ = -1;
                        break;
                    default: break;

                }
                m_transform.Rotate(new Vector3(0, 0, rotateAngelZ * 0.7f));
                m_transform.localScale += new Vector3((maxState / 2 - shakeState) * 0.001f, (maxState / 2 - shakeState) * 0.001f, 0);
                break;
            case 2:
                switch (shakeState)
                {
                    case 1: translateDistance = 0f;
                        break;
                    case 2: translateDistance = -1.5f*distanceUnit;
                        break;
                    case 3: translateDistance = 4.5f*distanceUnit;
                        break;
                    case 4:
                        m_transform.position = new Vector3(0, 0,-10)+offsetPosition;
                        m_transform.localScale = new Vector3(1, 1, 1);
                        translateDistance = -3*distanceUnit;
                        break;
                    default: break;

                }
                m_transform.Translate(new Vector2(translateDistance, 0));
                m_transform.localScale += new Vector3((maxState / 2 - shakeState) * 0.001f, (maxState / 2 - shakeState) * 0.001f, 0);
                break;
            case 3:
                switch (shakeState)
                {
                    case 1: translateDistance = 0f;
                        break;
                    case 2: translateDistance = 1.5f*distanceUnit;
                        break;
                    case 3: translateDistance = -4.5f*distanceUnit;
                        break;
                    case 4:
                        m_transform.position = new Vector3(0, 0, -10)+offsetPosition;
                        m_transform.localScale = new Vector3(1, 1, 1);
                        translateDistance = 3*distanceUnit;
                        break;
                    default: break;

                }
                m_transform.Translate(new Vector2(translateDistance, 0));
                m_transform.localScale += new Vector3((maxState / 2 - shakeState) * 0.001f, (maxState / 2 - shakeState) * 0.001f, 0);
                break;
            case 4:
                switch (shakeState)
                {
                    case 1: translateDistance = -0f;
                        break;
                    case 2: translateDistance = 1.5f*distanceUnit;
                        break;
                    case 3: translateDistance = -4.5f*distanceUnit;
                        break;
                    case 4:
                        m_transform.position = new Vector3(0, 0, -10)+offsetPosition;
                        m_transform.localScale = new Vector3(1, 1, 1);
                        translateDistance = 3*distanceUnit;
                        break;
                    default: break;

                }
                m_transform.Translate(new Vector2(0,translateDistance));
                m_transform.localScale += new Vector3((maxState / 2 - shakeState) * 0.001f, (maxState / 2 - shakeState) * 0.001f, 0);
                break;
            case 5:
                switch (shakeState)
                {
                    case 1: translateDistance = 0f;
                        break;
                    case 2: translateDistance = -1.5f*distanceUnit;
                        break;
                    case 3: translateDistance = 4.5f*distanceUnit;
                        break;
                    case 4:
                        m_transform.position = new Vector3(0, 0,-10)+offsetPosition;
                        m_transform.localScale = new Vector3(1, 1, 1);
                        translateDistance = -3*distanceUnit;
                        break;
                    default: break;

                }
                m_transform.Translate(new Vector2(0,translateDistance));
                m_transform.localScale += new Vector3((maxState / 2 - shakeState) * 0.001f, (maxState / 2 - shakeState) * 0.001f, 0);
                break;

            case 12:
                    if (shakeState == maxState2)
                    {
                        translateDistance = 0f;
                    }
                    else if (shakeState == (maxState2 - 1)) {
                        translateDistance = -1f * distanceUnit;
                    }
                    else                        
                        translateDistance = 1f * shakeState / (maxState2 - 2) * distanceUnit;
                
                m_transform.localPosition =new Vector3(translateDistance, 0,-10)+offsetPosition;
                break;
            case 13:
                    if (shakeState == maxState2)
                    {
                        translateDistance = 0f;
                    }
                    else if (shakeState == (maxState2 - 1))
                    {
                        translateDistance = 1f * distanceUnit;
                    }
                    else
                        translateDistance = -1f * shakeState / (maxState2 - 2) * distanceUnit;
                    m_transform.localPosition = new Vector3(translateDistance, 0,-10)+offsetPosition;
                break;
            case 14:
                    if (shakeState == maxState2)
                    {
                        translateDistance = 0f;
                    }
                    else if (shakeState == (maxState2 - 1))
                    {
                        translateDistance = 1f * distanceUnit;
                    }
                    else
                        translateDistance = -1f * shakeState / (maxState2 - 2) * distanceUnit;

                    m_transform.localPosition = new Vector3(0, translateDistance, -10)+offsetPosition;
                break;
            case 15:

                    if (shakeState == maxState2)
                    {
                        translateDistance = 0f;
                    }
                    else if (shakeState == (maxState2 - 1))
                    {
                        translateDistance = -1f * distanceUnit;
                    }
                    else
                        translateDistance = 1f * shakeState / (maxState2 - 2) * distanceUnit;

                    m_transform.localPosition = new Vector3(0, translateDistance, -10)+offsetPosition;
                break;

            case 21:
                float distanceX = 0f;
                float distanceY = 0f;
                switch (shakeState)
                {
                    case 19:
                        distanceX = 2f*distanceUnit;
                        distanceY = -12f * distanceUnit;
                        break;
                    case 18:
                        break;
                    case 17:
                        distanceX = -2f*distanceUnit;
                        distanceY = 5f * distanceUnit;
                        break;
                    case 16:
                        distanceX = -2f * distanceUnit;
                        break;
                    case 15:
                        distanceX = -2f * distanceUnit;
                        distanceY = -6f * distanceUnit;
                        break;
                    case 14:
                        break;
                    case 13:
                        distanceY = 3f * distanceUnit;
                        break;
                    case 12:
                        break;
                    case 11:
                        distanceY = -3f * distanceUnit;
                        break;
                    case 10:
                        shakeState = 0;
                        break;
                    default: break;

                }
                m_transform.localPosition = new Vector3(0.4f * distanceX, 0.4f * distanceY, -10)+offsetPosition;
                break;

			default: break;
			}
		}
		timer += Time.deltaTime;
		if (timer > 1f / frameRate) {
			timer = 0;
		}
	}

	void OnGUI()
	{
	}

    public void shakeScreen(int mod ) {
        shakeMod = mod;
        shakeState = maxState;
        if (mod > 10) {
            shakeState = maxState2;
        }
        timer = 0;
    }


}
