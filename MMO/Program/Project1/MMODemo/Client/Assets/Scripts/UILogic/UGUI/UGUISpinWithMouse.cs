using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
public class UGUISpinWithMouse : MonoBehaviour, IDragHandler, IPointerClickHandler
{
    public GameObject mTarget;
    public void OnDrag(PointerEventData eventData)
    {
        if (mTarget == null)
            return;
        mTarget.transform.Rotate(new Vector3(0, -eventData.delta.x, 0));
    }

    public void OnPointerClick(PointerEventData eventData)
    {
        throw new System.NotImplementedException();
    }
}
