using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFollow : MonoBehaviour {
    public float dis = 5.0f;
    public float rotateY = 50.0f;
    public float rotateX = 0;
    public float playerheight = 2.0f;
    public float desiredDistance = 1.0f;
    public float mouseScroll = 0.5f;
    public float mouseXSpeed = 0.02f;
    public float mouseYSpeed = 0.5f;
    private float mouseYMax = 89.5f;
    public float IntialRotation = 0.0f;
    public ETCJoystick joystick;
    private Vector3 m_CamForward;
    private void Update()
    {

        if (Input.GetMouseButton(0))
        {
            rotateX += Input.GetAxis("Mouse X") * mouseXSpeed;
        }
        if (Input.GetMouseButton(1))
        {
            rotateY += Input.GetAxis("Mouse Y") * mouseYSpeed;

            if (rotateY > mouseYMax)
                rotateY = mouseYMax;

            if (rotateY < 0)
                rotateY = 0;
        }
        desiredDistance = desiredDistance - Input.GetAxis("Mouse ScrollWheel") * mouseScroll;
        if (Camera.main != null)
        {
            float d = -dis - rotateY * 0.1f;

            Vector3 rot = new Vector3(Mathf.Sin(rotateX) * d, Mathf.Tan(rotateY / 180.0f * Mathf.PI) * rotateY * 0.1f, Mathf.Cos(rotateX) * d);

            Camera.main.transform.localPosition = transform.localPosition + Vector3.up * playerheight + rot * desiredDistance;
            Camera.main.transform.LookAt(transform.localPosition + Vector3.up * playerheight);
        }
    }
}
