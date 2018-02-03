using UnityEngine;
using System.Collections;

public class RunMap : MonoBehaviour
{
    private Rigidbody m_Rigidbody;
    private Animator m_Animator;
    private Vector3 m_Move, m_CamForward;
    public float mouseXSpeed = 0.02f;
    public float mouseYSpeed = 0.5f;
    public float walkSpeed = 0.2f;
    public float dis = 5.0f;
    public float playerheight = 2.0f;
    public float rotateY = 50.0f;
    public float rotateX = 0;
    public float desiredDistance = 1.0f;
    public float mouseScroll = 0.5f;
    private float mouseYMax = 89.5f;
    // Use this for initialization
    void Start()
    {
        walkSpeed = 0.2f;
        dis = 5.0f;
        playerheight = 2.0f;
        rotateY = 50.0f;
        m_Animator = GetComponent<Animator>();
        m_Rigidbody = GetComponent<Rigidbody>();
        m_Rigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationY | RigidbodyConstraints.FreezeRotationZ |
                                  RigidbodyConstraints.FreezePositionX | RigidbodyConstraints.FreezePositionZ;
    }
   
    private void FixedUpdate()
    {
        // read inputs
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        m_Move = v * Vector3.forward + h * Vector3.right;
        if (m_Move.magnitude > 1f)
            m_Move.Normalize();

        m_Move = transform.InverseTransformDirection(m_Move);

        // calculate move direction to pass to character
        if (Camera.main != null)
        {
            // calculate camera relative direction to move:
            m_CamForward = Vector3.Scale(Camera.main.transform.forward, new Vector3(1, 0, 1)).normalized;
            m_Move = v * m_CamForward + h * Camera.main.transform.right;

        }
        else
        {
            // we use world-relative directions in the case of no main camera
            m_Move = v * Vector3.forward + h * Vector3.right;
        }

        if (!m_Move.Equals(Vector3.zero))
        {
            transform.localRotation = Quaternion.LookRotation(m_Move);
            m_Animator.SetBool("Run", true);
        }
        else
            m_Animator.SetBool("Run", false);

        transform.localPosition += m_Move.normalized * walkSpeed;

        if (Input.GetMouseButton(0))
        {        
            rotateX += Input.GetAxis("Mouse X") * mouseXSpeed;
        }

        if(Input.GetMouseButton(1))
        {
            rotateY += Input.GetAxis("Mouse Y") * mouseYSpeed;

            if(rotateY > mouseYMax)
                rotateY = mouseYMax;

            if(rotateY < 0)
                rotateY = 0;
        }
        desiredDistance = desiredDistance - Input.GetAxis("Mouse ScrollWheel") * mouseScroll;
        if (Camera.main != null)
        {
            float d = -dis - rotateY * 0.1f;

            Vector3 rot = new Vector3(Mathf.Sin(rotateX) * d, Mathf.Tan(rotateY / 180.0f * Mathf.PI) * rotateY * 0.1f, Mathf.Cos(rotateX) * d);

            Camera.main.transform.localPosition = transform.localPosition + Vector3.up * playerheight + rot* desiredDistance;
            Camera.main.transform.LookAt(transform.localPosition + Vector3.up * playerheight);
        }
    }
}