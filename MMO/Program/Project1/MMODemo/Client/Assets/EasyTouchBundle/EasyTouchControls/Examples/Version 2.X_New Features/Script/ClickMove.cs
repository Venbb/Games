using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClickMove : MonoBehaviour {
    public CharacterController charController;
    private bool cursorState = false; //当前是否点击了鼠标
    private Vector3 targetPos; //目标位置
    private Vector3 mousePos; //鼠标单击的位置
    private Vector3 beforePos;//角色移动前的位置
    public float speed = 10f;
    public Animation anim;
    public float dis = 0.5f;
    public UnityEngine.AI.NavMeshAgent agent;//引用角色中的组件
    public ETCJoystick joystick;
    public static bool isJump = false;
    // Use this for initialization
    void Start()
    {
        targetPos = transform.position;
        mousePos = transform.position;
    }
    // Update is called once per frame
    void Update()
    {
        beforePos = transform.position; //保存当前的位置
        if (ETCInput.GetAxis("Vertical") != 0 || ETCInput.GetAxis("Horizontal") != 0 || isJump)
        {
            mousePos = transform.position;
            cursorState = false;
            agent.enabled = false;
            return;
        }

        if (Input.GetMouseButton(0) && (charController.isGrounded || cursorState))
        {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;
            if (Physics.Raycast(ray, out hit, 100)) //100为射线的长度，限制用户瞎点击。在100以为点击无效
            {
                if (hit.collider.name == "PlayGround")
                {
                    mousePos = hit.point;
                    agent.enabled = true;
                    transform.LookAt(mousePos);
                    cursorState = true;
                    agent.destination = hit.point;
                }
            }
        }
        if (agent.enabled && agent.remainingDistance == 0)
        {
            anim.CrossFade("soldierIdleRelaxed");
            cursorState = false;
        }
        else if(agent.enabled && agent.remainingDistance != 0)
        {
            anim.CrossFade("soldierRun");
        }

    }
}
