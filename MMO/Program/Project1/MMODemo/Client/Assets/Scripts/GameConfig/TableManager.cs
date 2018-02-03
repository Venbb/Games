using System.Collections.Generic;
using UnityEngine;
using AssetBundles;
using ClientBase.Localization;
using ClientBase.TableFile;
public class TableManager
{
    private bool mLoadLanguageOver = false;
    private int mCount;

    public bool LoadLanguageOver
    {
        get
        {
            return mLoadLanguageOver;
        }
    }
    public int Count
    {
        get {
            return mCount;
        }
    }
    private string[] mTables = {
       "dnaconverter",
       "selectrole",
       "bonestree"
    };
    public TableManager()
    {
        mCount = mTables.Length+1;
    }
    /// <summary>
    /// 加载游戏语言表
    /// </summary>
    public void LoadLanguage()
    {
        string assetBundleName = "settings";
        string url = "language";
        XAssets assets = new XAssets(eAssetType.AT_table, assetBundleName, url);
        LoadAssets.Instance.LoadAssetsAsync(assets, ResourceReadyCallback);
    }
    public void StartLoad()
    {
        string assetBundleName = "settings";
        foreach (string url in mTables)
        {
            XAssets assets = new XAssets(eAssetType.AT_table, assetBundleName, url);
            LoadAssets.Instance.LoadAssetsAsync(assets, ResourceReadyCallback);
        }
    }
    void ResourceReadyCallback(AssetBundleLoadAssetOperation request, XAssets assets)
    {
        string txt = request.GetAsset<TextAsset>().text;
        txt = txt.Replace("\"", string.Empty);
        TableFile file = new TableFile(assets.assetName);
        List<string[]> lines = file.AnalyzeString(txt);
        LoadTableData(assets.assetName, lines);
    }
    void LoadTableData(string name, List<string[]> lines)
    {
        switch (name)
        {
            case "language":
                XLanguage.Instance.LoadTable(lines);
                mLoadLanguageOver = true;
                break;
            case "dnaconverter":
                XDNAConfig.Instance.LoadTable(lines);
                break;
            case "selectrole":
                SelectRoleConfig.Instance.LoadTable(lines);
                break;
            case "bonestree":
                XBonesTreeConfig.Instance.LoadTable(lines);
                break;
        }
        mCount--;
    }
}
