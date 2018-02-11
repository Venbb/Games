using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Debuger;

/// <summary>
/// 角色对象
/// </summary>
[RequireComponent(typeof(CharacterController))]
public class Actor : MonoBehaviour
{
    //角色控制器
    protected CharacterController cController;
    //动画状态机
    protected Animator animator;
    //动画控制器
    protected RuntimeAnimatorController animController;
    //角色描述信息
    protected ActorDesc desc;
    public ActorDesc Desc
    {
        get { return desc; }
    }
    protected Camera _mCamera;
    /// <summary>
    /// 主角摄像机
    /// </summary>
    public Camera mCamera
    {
        get
        {
            if (_mCamera == null) _mCamera = Camera.main;
            return _mCamera;
        }
        set { _mCamera = value; }
    }
    protected virtual void Awake()
    {
        cController = GetComponent<CharacterController>();
        if (cController != null)
        {
            cController.center = Vector3.up;
        }
    }
    protected virtual void OnEnable()
    {

    }
    protected virtual void Start()
    {

    }
    public virtual Actor Create(ActorDesc desc)
    {
        this.desc = desc;
        //加载模型
        LoadModel();
        //加载动画控制器（需要在模型加载完成后加载）
        LoadAnimController();
        return this;
    }
    /// <summary>
    /// 加载模型
    /// </summary>
    protected virtual GameObject LoadModel()
    {
        if (desc == null) return null;
        Object obj = Resources.Load(desc.modelPath);
        GameObject gObj;
        if (obj != null)
        {
            gObj = Instantiate(obj) as GameObject;
        }
        else
        {
            Debuger.LogError("模型加载失败:" + desc.modelPath);
            return null;
        }
        gObj.name = "Model";
        SetParent(gObj.transform, transform);
        animator = gObj.GetComponent<Animator>();
        //模型加载完成后绑定动画控制器
        if (animController != null && animator.runtimeAnimatorController == null)
        {
            animator.runtimeAnimatorController = animController;
        }
        return gObj;
    }
    /// <summary>
    /// 设置父节点
    /// </summary>
    /// <param name="tran"></param>
    /// <param name="parent"></param>
    protected virtual void SetParent(Transform tran, Transform parent)
    {
        tran.parent = parent;
        tran.localPosition = Vector3.zero;
        tran.localRotation = Quaternion.identity;
        tran.localScale = Vector3.one;
    }
    /// <summary>
    /// 加载动画控制器
    /// </summary>
    protected virtual void LoadAnimController()
    {
        if (desc == null) return;
        LoadAnimController(desc.animControllerPath);
    }
    /// <summary>
    /// 加载动画控制器
    /// </summary>
    /// <param name="path"></param>
    public virtual void LoadAnimController(string path)
    {
        RuntimeAnimatorController arc = Resources.Load(path, typeof(RuntimeAnimatorController)) as RuntimeAnimatorController;
        if (arc != null)
        {
            animController = arc;
            //加载完成后，如果模型已经加载完成将设置当前的动画控制器
            if (animator != null)
            {
                animator.runtimeAnimatorController = arc;
            }
        }
        else
        {
            Debuger.LogError("加载动画控制器失败:" + path);
        }
    }
    protected virtual void UpdateAnimator()
    {
        //权宜之计
        if ((ETCInput.GetAxis("Horizontal") != 0 || ETCInput.GetAxis("Vertical") != 0))
        {
            animator.SetInteger(AnimatorParams.ParamSkill, -1);
            animator.SetFloat(AnimatorParams.ParamMoveSpeed, 1);
        }
        else
        {
            animator.SetFloat(AnimatorParams.ParamMoveSpeed, 0);
        }
    }
    protected virtual void Update()
    {

    }
    protected virtual void LateUpdate()
    {
        UpdateAnimator();
    }
    protected virtual void FixedUpdate()
    {

    }
    protected virtual void OnDisable()
    {

    }
    protected virtual void OnDestroy()
    {

    }
}
