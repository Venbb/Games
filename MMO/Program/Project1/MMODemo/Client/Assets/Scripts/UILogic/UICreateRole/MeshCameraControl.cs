using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
public class MeshCameraControl : MonoBehaviour, IDragHandler, IPointerClickHandler 
{
    private Camera meshCamera;
    private bool mLayuan = false;
    public GameObject mCameraState;
    public Text text;

    public float dis = 5.0f;
    public float rotateY = 0.0f;
    public float rotateX = 0;
    public float mouseXSpeed = 0.01f;
    public float playerheight = 1.58f;
    public float desiredDistance = 0.15f;
    public float moveSpeed = 4.0f;
    private void Start()
    {
        meshCamera = GameObject.FindGameObjectWithTag("_TagMeshCamera").GetComponent<Camera>();
    }
    void Update()
    {
        //if (Input.GetMouseButton(0))
        //{
        //    rotateX += Input.GetAxis("Mouse X") * mouseXSpeed;
        //}
        if (meshCamera != null)
        {
            float d = -dis - rotateY * 0.1f;

            Vector3 rot = new Vector3(Mathf.Sin(rotateX) * d, Mathf.Tan(rotateY / 180.0f * Mathf.PI) * rotateY * 0.1f, Mathf.Cos(rotateX) * d);
            if (rotateX != 0)
            {
                meshCamera.transform.localPosition = transform.localPosition + Vector3.up * playerheight + rot * desiredDistance;
            }
            else
            {
                meshCamera.transform.localPosition = Vector3.MoveTowards(meshCamera.transform.localPosition, transform.localPosition + Vector3.up * playerheight + rot * desiredDistance, Time.deltaTime * moveSpeed);
            }
           
            meshCamera.transform.LookAt(transform.localPosition + Vector3.up * playerheight);
        }
    }
    public void ChangeCameraPos()
    {
        mLayuan = !mLayuan;
        if (mLayuan)
        {
            text.text = "拉近";
            desiredDistance = 0.46f;
            rotateX = 0;
            mCameraState.SetActive(false);
        }
        else
        {
            text.text = "拉远";
            desiredDistance = 0.15f;
            rotateX = 0;
            mCameraState.SetActive(true);
            
        }
    }

    public void OnDrag(PointerEventData eventData)
    {
        rotateX += eventData.delta.x * mouseXSpeed;
    }

    public void OnPointerClick(PointerEventData eventData)
    {
        
    }
}
