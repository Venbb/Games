﻿using UnityEngine;
using System.Collections;
[ExecuteInEditMode] 
public class TestRenderImage : MonoBehaviour
{
    public Shader curShader;
    public float grayScaleAmount = 1.0f;
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
	void Start () {
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
	void Update () {
        grayScaleAmount = Mathf.Clamp(grayScaleAmount, 0.0f, 1.0f);  
	}

    void OnRenderImage(RenderTexture sourceTexture, RenderTexture destTexture)
    {
        if (curShader != null)
        {
            material.SetFloat("_LuminosityAmount", grayScaleAmount);

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
