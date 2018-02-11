// Upgrade NOTE: replaced 'mul(UNITY_MATRIX_MVP,*)' with 'UnityObjectToClipPos(*)'

Shader "CC/Dissolution Alpha Blend" {
    Properties {
        _DiffuseTexture ("Diffuse Texture", 2D) = "white" {}
        _N_mask ("N_mask", Float ) = 0.3
        _MaskTexture ("Mask Texture", 2D) = "white" {}
        _C_BYcolor ("C_BYcolor", Color) = (1,1,1,1)
        _N_BY_QD ("N_BY_QD", Float ) = 1
        _N_BY_KD ("N_BY_KD", Float ) = 0.1
    }
    SubShader {
        Tags {
            "IgnoreProjector"="True"
            "Queue"="Transparent"
            "RenderType"="Transparent"
        }
        Pass {
            Name "FORWARD"
            Tags {
                "LightMode"="ForwardBase"
            }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #define UNITY_PASS_FORWARDBASE
            #include "UnityCG.cginc"
            #pragma multi_compile_fwdbase
			#pragma fragmentoption ARB_precision_hint_fastest exclude_path:prepass nolightmap noforwardadd interpolateview
            #pragma target 3.0
            uniform sampler2D _MaskTexture; uniform fixed4 _MaskTexture_ST;
            uniform sampler2D _DiffuseTexture; uniform fixed4 _DiffuseTexture_ST;
            uniform fixed _N_mask;
            uniform fixed _N_BY_KD;
            uniform fixed4 _C_BYcolor;
            uniform fixed _N_BY_QD;
            struct VertexInput {
                fixed4 vertex : POSITION;
                fixed2 texcoord0 : TEXCOORD0;
                fixed4 vertexColor : COLOR;
            };
            struct VertexOutput {
                fixed4 pos : SV_POSITION;
                fixed2 uv0 : TEXCOORD0;
				fixed2 uv1 : TEXCOORD1;
                fixed4 vertexColor : COLOR;
            };
            VertexOutput vert (VertexInput v) {
                VertexOutput o = (VertexOutput)0;
                o.uv0 = TRANSFORM_TEX(v.texcoord0, _DiffuseTexture);
				o.uv1 = TRANSFORM_TEX(v.texcoord0, _MaskTexture);
                o.vertexColor = v.vertexColor;
                o.pos = UnityObjectToClipPos(v.vertex );
                return o;
            }
            fixed4 frag(VertexOutput i) : COLOR {
                fixed4 _DiffuseTexture_var = tex2D(_DiffuseTexture,i.uv0);
                fixed4 _MaskTexture_var = tex2D(_MaskTexture,i.uv1);
                fixed3 emissive = i.vertexColor.rgb*_DiffuseTexture_var.rgb;
                fixed alpha = (i.vertexColor.a*_N_mask)-0.001;
                fixed maskLessAlpha = step(_MaskTexture_var.r,alpha);
                fixed maskKDLessAlpha = step((_MaskTexture_var.r+_N_BY_KD),alpha);
                fixed node_1274 = maskLessAlpha-maskKDLessAlpha;
                fixed3 finalColor = emissive + ((node_1274*_C_BYcolor.rgb)*_N_BY_QD);
                fixed node_6731 = (_DiffuseTexture_var.a*(maskLessAlpha+node_1274));
                return fixed4(finalColor,node_6731);
            }
            ENDCG
        }
    }
    FallBack "Diffuse"
}
