Shader "Mobile/Diffuse Detail Alphatest" {
	Properties {
		_Color ("Main Color", Color) = (1,1,1,1)
		_MainTex ("Base (RGB)", 2D) = "white" {}
		_Detail ("Detail (RGB)", 2D) = "gray" {}
		_Cutoff ("Alpha cutoff", Range(0,1)) = 0.5	
	}
	SubShader {
		
		Pass{
			Name "BASE"	
			Alphatest Greater [_Cutoff]
			
			Material{
				Diffuse [_Color]
			}
			
			Lighting On
			Fog { Mode Off }
			SetTexture [_MainTex] { combine texture * primary Double, texture * primary}
			SetTexture [_Detail] { combine previous * texture Double, previous}
		}

	} 
	FallBack "VertexLit", 2
}
