using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using AssetBundles;

public delegate void AssetsReadyCallBack(AssetBundleLoadAssetOperation request, XAssets assets);
public class XAssets
{
    public eAssetType assetType;
    public string assetBundleName;
    public string assetName;
    public bool isAdditive;//这个是加载场景

    public XAssets(eAssetType type, string abname, string assetname, bool isadditive = false)
    {
        this.assetType = type;
        this.assetBundleName = abname;
        this.assetName = assetname;
        this.isAdditive = isadditive;
    }
}
