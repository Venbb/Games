using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// 控制场景模型的透明度
/// 1.需要一个Collider来作为触发器isTrigger = true
/// 2.需要支持改变透明度的Shader,即Tags{ "RenderType" = "Transparent" } 如Standard将其Readering Model 设置为Transparent
/// 3.改变Materail的color的alpha值
/// </summary>
[RequireComponent(typeof(Collider))]
public class TransparentTrigger : MonoBehaviour
{
    [SerializeField]
    Collider mCollider;
    [SerializeField]
    Material[] materials;
    private void Awake()
    {
        if (mCollider == null)
            mCollider = GetComponent<Collider>();
        mCollider.isTrigger = true;
        if (materials != null && materials.Length == 0)
        {
            materials = GetComponent<Renderer>().materials;
        }

    }
    #region 碰撞器
    void OnCollisionEnter(Collision collider)
    {
        //Debug.Log("OnCollisionEnter");
    }
    void OnCollisionStay(Collision collider)
    {
        //Debug.Log("OnCollisionStay");
    }
    void OnCollisionExit(Collision collider)
    {
        //Debug.Log("OnCollisionExit");
    }
    #endregion
    #region 触发器
    void OnTriggerEnter(Collider collider)
    {
        for (int i = 0; i < materials.Length; i++)
        {
            //shader的RenderType需要是支持透明的Transparent类型或者Fade类型
            if (materials[i].GetTag("RenderType", false).Equals("Transparent"))
            {
                Color color = materials[i].color;
                color.a = 0.3f;
                materials[i].color = color;
            }
        }
    }
    void OnTriggerStay(Collider collider)
    {
        //Debug.Log("OnTriggerStay");
    }
    void OnTriggerExit(Collider collider)
    {
        for (int i = 0; i < materials.Length; i++)
        {
            if (materials[i].GetTag("RenderType", false).Equals("Transparent"))
            {
                Color color = materials[i].color;
                color.a = 1f;
                materials[i].color = color;
            }
        }
    }
    #endregion
}
