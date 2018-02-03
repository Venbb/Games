using UnityEngine;
using System.Collections;
using ClientBase.Debuger;
using ClientBase.Singleton;
using AssetBundles;
public class LoadAssets : XMonoSingleton<LoadAssets>
{
    // Use this for initialization
    IEnumerator Start()
    {
        yield return StartCoroutine(Initialize());
    }

    // Initialize the downloading url and AssetBundleManifest object.
    protected IEnumerator Initialize()
    {
        // Don't destroy this gameObject as we depend on it to run the loading script.
        DontDestroyOnLoad(gameObject);

        // With this code, when in-editor or using a development builds: Always use the AssetBundle Server
        // (This is very dependent on the production workflow of the project. 
        // 	Another approach would be to make this configurable in the standalone player.)
#if DEVELOPMENT_BUILD || UNITY_EDITOR
		AssetBundleManager.SetDevelopmentAssetBundleServer ();
#else
        // Use the following code if AssetBundles are embedded in the project for example via StreamingAssets folder etc:
        AssetBundleManager.SetSourceAssetBundleURL(Application.dataPath + "/");
        // Or customize the URL based on your deployment or configuration
        //AssetBundleManager.SetSourceAssetBundleURL("http://www.MyWebsite/MyAssetBundles");
#endif

        // Initialize AssetBundleManifest which loads the AssetBundleManifest object.
        var request = AssetBundleManager.Initialize();
        if (request != null)
            yield return StartCoroutine(request);
    }
    public void LoadAssetsAsync(XAssets assets, AssetsReadyCallBack callBack)
    {
        StartCoroutine(InstantiateGameObjectAsync(assets, callBack));
    }
    protected IEnumerator InstantiateGameObjectAsync(XAssets assets, AssetsReadyCallBack callBack)
    {
        // This is simply to get the elapsed time for this phase of AssetLoading.
        float startTime = Time.realtimeSinceStartup;

        switch (assets.assetType)
        {
            case eAssetType.AT_gameobject:
                {
                    // Load asset from assetBundle.
                    AssetBundleLoadAssetOperation request = AssetBundleManager.LoadAssetAsync(assets.assetBundleName, assets.assetName, typeof(GameObject));
                    if (request == null)
                        yield break;
                    yield return StartCoroutine(request);
                    if (callBack != null)
                    {
                        callBack(request,assets);
                    }
                }
                break;
            case eAssetType.AT_map:
                {
                    // Load level from assetBundle.
                    AssetBundleLoadOperation request = AssetBundleManager.LoadLevelAsync(assets.assetBundleName, assets.assetName, assets.isAdditive);
                    if (request == null)
                        yield break;
                    yield return StartCoroutine(request);
                }
                break;
            case eAssetType.AT_table:
                {
                    // Load asset from assetBundle.
                    AssetBundleLoadAssetOperation request = AssetBundleManager.LoadAssetAsync(assets.assetBundleName, assets.assetName, typeof(GameObject));
                    if (request == null)
                        yield break;
                    yield return StartCoroutine(request);
                    if (callBack != null)
                    {
                        callBack(request, assets);
                    }
                }
                break;
            case eAssetType.AT_audio:
                {
                    // Load asset from assetBundle.
                    AssetBundleLoadAssetOperation request = AssetBundleManager.LoadAssetAsync(assets.assetBundleName, assets.assetName, typeof(GameObject));
                    if (request == null)
                        yield break;
                    yield return StartCoroutine(request);
                    if (callBack != null)
                    {
                        callBack(request, assets);
                    }
                }
                break;
        }
        // Calculate and display the elapsed time.
        float elapsedTime = Time.realtimeSinceStartup - startTime;
        this.Log(assets.assetBundleName + " loaded successfully in " + elapsedTime + " seconds");
    }
}
