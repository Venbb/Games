using ClientBase.Singleton;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using ClientBase.Debuger;
public class UGUIUtils: Singleton<UGUIUtils>
{
    public Dictionary<string, Sprite> icons = new Dictionary<string, Sprite>();
    public Sprite LoadSimpleImageFromResource(string pathName, bool isDirectLoad = true)
    {
        if (icons.ContainsKey(pathName))
        {
            return icons[pathName];
        }

        Sprite sprite = null;
        if (pathName.StartsWith("HeadIcon") || pathName.StartsWith("Icon"))
            isDirectLoad = false;
        if (isDirectLoad)
        {
            sprite = Resources.Load<Sprite>(pathName);
            icons[pathName] = sprite;
        }
        else
        {
            GameObject obj = Resources.Load<GameObject>(pathName);
            if (null != obj)
            {
                SpriteRenderer spriteRenderer = obj.GetComponent<SpriteRenderer>();
                if (spriteRenderer != null)
                {
                    sprite = spriteRenderer.sprite;
                    icons[pathName] = sprite;
                }
            }
        }
        if (sprite == null)
        {
            this.LogError(string.Format("**** error path: {0} !!!!!!!****", pathName));
        }
        return sprite;
    }
}

