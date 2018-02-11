using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Singleton;

public class TransparentHandler : XMonoSingleton<TransparentHandler>
{
    /// <summary>
    /// 是否开启
    /// </summary>
    public bool alphaCheck = true;
    public LayerMask layerMask;
    public float extendDistance = 2f;
    public Transform mCamera;
    public Transform curTarget;
    /// <summary>
    /// 透明遮挡暂存
    /// </summary>
    List<Material> alphaCheckCaches = new List<Material>();
    /// <summary>
    /// 透明遮挡
    /// </summary>
    List<Material> alphaCheckObjs = new List<Material>();

    Dictionary<Material, RenderingMode> renderTypeCaches = new Dictionary<Material, RenderingMode>();

    void FixedUpdate()
    {
        TransparentCheck();
    }
    void TransparentCheck()
    {
        if (!alphaCheck || mCamera == null || curTarget == null) return;
        //注意：从模型里面发出射线是不会触发碰撞的！！！！
        //起始点定位摄像机
        Vector3 origin = mCamera.position;//target.position;
        //投射方向
        Vector3 dir = curTarget.position - origin;
        ////解决射线与碰撞器完全相交的问题
        origin -= dir.normalized * extendDistance;
        //Debug.DrawRay(origin, dir, Color.red);

        //暂存当前透明模型
        for (int i = 0; i < alphaCheckObjs.Count; i++)
        {
            alphaCheckCaches.Add(alphaCheckObjs[i]);
        }
        alphaCheckObjs.Clear();
        Renderer render;
        RaycastHit[] hits;
        //从模型想摄像机发射射线,default层才接受射线
        hits = Physics.RaycastAll(origin, dir.normalized, Mathf.Infinity, layerMask.value);
        for (int i = 0; i < hits.Length; i++)
        {
            //Debug.Log("hit name:" + hits[i].collider.name);
            render = hits[i].transform.GetComponent<Renderer>();
            if (render != null)
                alphaCheckObjs.AddRange(render.materials);
        }
        Material material;
        //透明起来
        for (int i = 0; i < alphaCheckObjs.Count; i++)
        {
            material = alphaCheckObjs[i];
            RenderingMode rm = GetRenderingMode(material.GetTag("RenderType", false));
            if (!rm.Equals(RenderingMode.None))
            {
                //shader必须要支持有_Color来控制贴图的透明通道
                if (material.HasProperty("_Color"))
                {
                    //从暂存移除当前
                    if (alphaCheckCaches.Contains(material))
                    {
                        alphaCheckCaches.Remove(material);
                    }
                    renderTypeCaches[material] = rm;
                    SetMaterialRenderingMode(material, RenderingMode.Transparent);

                    Color color = material.color;
                    color.a = 0f;
                    material.SetColor("_Color", color);
                    //material.color = color;
                }
            }
        }
        for (int i = 0; i < alphaCheckCaches.Count; i++)
        {
            material = alphaCheckCaches[i];
            if (renderTypeCaches.ContainsKey(material))
            {
                SetMaterialRenderingMode(material, renderTypeCaches[material]);
            }
            //不透明
            Color color = material.color;
            color.a = 1f;
            material.color = color;
        }
        alphaCheckCaches.Clear();
        renderTypeCaches.Clear();
    }
    public RenderingMode GetRenderingMode(string tag)
    {
        switch (tag)
        {
            case "Opaque":
                return RenderingMode.Opaque;
            case "Cutout":
                return RenderingMode.Cutout;
            case "Fade":
                return RenderingMode.Fade;
            case "Transparent":
                return RenderingMode.Transparent;
            case "TransparentCutout":
                return RenderingMode.TransparentCutout;
            default:
                return RenderingMode.None;
        }
    }
    public enum RenderingMode
    {
        None,
        Opaque,//不透明 适用于所有的不透明的物体 如：石头
        Cutout,//镂空 透明度不是0%就是100%，不存在半透明的区域。 如：破布
        Fade,//隐现 与Transparent的区别为高光反射会随着透明度而消失。 如：物体隐去
        Transparent,//透明 适用于像彩色玻璃一样的半透明物体，高光反射不会随透明而消失。 如：玻璃
        TransparentCutout//透明镂空
    }
    public void SetMaterialRenderingMode(Material material, RenderingMode renderingMode)
    {
        switch (renderingMode)
        {
            case RenderingMode.Opaque:
                material.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.One);
                material.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.Zero);
                material.SetInt("_ZWrite", 1);
                material.DisableKeyword("_ALPHATEST_ON");
                material.DisableKeyword("_ALPHABLEND_ON");
                material.DisableKeyword("_ALPHAPREMULTIPLY_ON");
                material.renderQueue = -1;
                break;
            case RenderingMode.Cutout:
                material.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.One);
                material.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.Zero);
                material.SetInt("_ZWrite", 1);
                material.EnableKeyword("_ALPHATEST_ON");
                material.DisableKeyword("_ALPHABLEND_ON");
                material.DisableKeyword("_ALPHAPREMULTIPLY_ON");
                material.renderQueue = 2450;
                break;
            case RenderingMode.Fade:
                material.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.SrcAlpha);
                material.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                material.SetInt("_ZWrite", 0);
                material.DisableKeyword("_ALPHATEST_ON");
                material.EnableKeyword("_ALPHABLEND_ON");
                material.DisableKeyword("_ALPHAPREMULTIPLY_ON");
                material.renderQueue = 3000;
                break;
            case RenderingMode.Transparent:
                material.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.One);
                material.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                material.SetInt("_ZWrite", 1);//这个设置成0是关闭1是开启，关闭后不会将模型深度写到深度缓冲，会导致模型渲染深度出现问题
                material.DisableKeyword("_ALPHATEST_ON");
                material.DisableKeyword("_ALPHABLEND_ON");
                material.EnableKeyword("_ALPHAPREMULTIPLY_ON");
                material.renderQueue = 3000;
                break;
            case RenderingMode.TransparentCutout:
                material.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.One);
                material.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                material.SetInt("_ZWrite", 1);//这个设置成0是关闭1是开启，关闭后不会将模型深度写到深度缓冲，会导致模型渲染深度出现问题
                material.DisableKeyword("_ALPHATEST_ON");
                material.DisableKeyword("_ALPHABLEND_ON");
                material.EnableKeyword("_ALPHAPREMULTIPLY_ON");
                material.renderQueue = 3000;
                break;
        }
    }
}
