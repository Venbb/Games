using UnityEngine;
using System.Collections;
[ExecuteInEditMode]
public class BSC_ImageEffect : MonoBehaviour
{
    public Shader curShader;
    public float brightnessAmount = 1.0f;
    public float saturationAmount = 1.0f;
    public float contrastAmount = 1.0f;
    private Material curMaterial;  
    public Material material
    {
        get
        {
            if (curMaterial == null)
            {
                curMaterial = new Material(curShader);
                curMaterial.hideFlags = HideFlags.HideAndDontSave;
            }
            return curMaterial;
        }
    }

    // Use this for initialization
    void Start()
    {
        if (SystemInfo.supportsImageEffects == false)
        {
            Debug.Log("no supportsImageEffects");
            enabled = false;
            return;
        }

        if (curShader != null && curShader.isSupported == false)
        {
            Debug.Log("no support curShader");
            enabled = false;
        }
    }

    // Update is called once per frame
    void Update()
    {
        brightnessAmount = Mathf.Clamp(brightnessAmount, 0.0f, 2.0f);
        saturationAmount = Mathf.Clamp(saturationAmount, 0.0f, 2.0f);
        contrastAmount = Mathf.Clamp(contrastAmount, 0.0f, 3.0f); 
    }

    void OnRenderImage(RenderTexture sourceTexture, RenderTexture destTexture)
    {
        if (curShader != null)
        {
            material.SetFloat("_BrightnessAmount", brightnessAmount);
            material.SetFloat("_SaturationAmount", saturationAmount);
            material.SetFloat("_ContrastAmount", contrastAmount);

            Graphics.Blit(sourceTexture, destTexture, material);
        }
        else
        {
            Graphics.Blit(sourceTexture, destTexture);
        }
    }

    void OnDisable()
    {
        if (curMaterial != null)
        {
            DestroyImmediate(curMaterial);
        }
    }
}
