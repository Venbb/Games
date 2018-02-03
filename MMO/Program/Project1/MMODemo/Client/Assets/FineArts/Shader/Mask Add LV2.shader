// Shader created with Shader Forge v1.38 
// Shader Forge (c) Neat Corporation / Joachim Holmer - http://www.acegikmo.com/shaderforge/
// Note: Manually altering this data may prevent you from opening it in Shader Forge
/*SF_DATA;ver:1.38;sub:START;pass:START;ps:flbk:,iptp:0,cusa:False,bamd:0,cgin:,lico:1,lgpr:1,limd:1,spmd:1,trmd:0,grmd:0,uamb:True,mssp:True,bkdf:False,hqlp:False,rprd:False,enco:False,rmgx:True,imps:True,rpth:0,vtps:0,hqsc:True,nrmq:1,nrsp:0,vomd:0,spxs:False,tesm:0,olmd:1,culm:2,bsrc:0,bdst:0,dpts:2,wrdp:False,dith:0,atcv:False,rfrpo:True,rfrpn:Refraction,coma:15,ufog:False,aust:True,igpj:True,qofs:0,qpre:3,rntp:2,fgom:False,fgoc:False,fgod:False,fgor:False,fgmd:0,fgcr:0.5,fgcg:0.5,fgcb:0.5,fgca:1,fgde:0.01,fgrn:0,fgrf:300,stcl:False,atwp:False,stva:128,stmr:255,stmw:255,stcp:6,stps:0,stfa:0,stfz:0,ofsf:0,ofsu:0,f2p0:False,fnsp:False,fnfb:False,fsmp:False;n:type:ShaderForge.SFN_Final,id:8500,x:34108,y:32717,varname:node_8500,prsc:2|emission-3845-OUT;n:type:ShaderForge.SFN_Time,id:6806,x:31713,y:32721,varname:node_6806,prsc:2;n:type:ShaderForge.SFN_Multiply,id:2594,x:32024,y:32780,varname:node_2594,prsc:2|A-6806-T,B-7270-OUT;n:type:ShaderForge.SFN_Multiply,id:7705,x:32024,y:32932,varname:node_7705,prsc:2|A-6806-T,B-9905-OUT;n:type:ShaderForge.SFN_Append,id:4847,x:32207,y:32849,varname:node_4847,prsc:2|A-2594-OUT,B-7705-OUT;n:type:ShaderForge.SFN_Add,id:8791,x:32401,y:32830,varname:node_8791,prsc:2|A-5361-UVOUT,B-4847-OUT;n:type:ShaderForge.SFN_TexCoord,id:5361,x:32191,y:32681,varname:node_5361,prsc:2,uv:0,uaff:False;n:type:ShaderForge.SFN_SwitchProperty,id:6364,x:32593,y:32686,ptovrint:False,ptlb:UV,ptin:_UV,varname:_UV,prsc:2,glob:False,taghide:False,taghdr:False,tagprd:False,tagnsco:False,tagnrm:False,on:True|A-5361-UVOUT,B-8791-OUT;n:type:ShaderForge.SFN_Tex2d,id:6519,x:32807,y:32686,ptovrint:False,ptlb:Diffuse,ptin:_Diffuse,varname:_Diffuse,prsc:2,glob:False,taghide:False,taghdr:False,tagprd:False,tagnsco:False,tagnrm:False,ntxv:0,isnm:False|UVIN-6364-OUT;n:type:ShaderForge.SFN_Tex2d,id:274,x:32807,y:32907,ptovrint:False,ptlb:Alpha,ptin:_Alpha,varname:_Alpha,prsc:2,glob:False,taghide:False,taghdr:False,tagprd:False,tagnsco:False,tagnrm:False,ntxv:0,isnm:False;n:type:ShaderForge.SFN_Multiply,id:5844,x:33084,y:32818,varname:node_5844,prsc:2|A-6519-RGB,B-274-R;n:type:ShaderForge.SFN_Multiply,id:9805,x:33363,y:32956,varname:node_9805,prsc:2|A-5844-OUT,B-3245-OUT;n:type:ShaderForge.SFN_Color,id:9646,x:33084,y:32647,ptovrint:False,ptlb:Color,ptin:_Color,varname:_Color,prsc:2,glob:False,taghide:False,taghdr:False,tagprd:False,tagnsco:False,tagnrm:False,c1:1,c2:1,c3:1,c4:1;n:type:ShaderForge.SFN_Multiply,id:7592,x:33344,y:32735,varname:node_7592,prsc:2|A-9646-RGB,B-5844-OUT,C-9041-A;n:type:ShaderForge.SFN_VertexColor,id:9041,x:33084,y:32946,varname:node_9041,prsc:2;n:type:ShaderForge.SFN_Multiply,id:6231,x:33600,y:32837,varname:node_6231,prsc:2|A-7592-OUT,B-9805-OUT,C-9041-RGB;n:type:ShaderForge.SFN_ValueProperty,id:7270,x:31713,y:32919,ptovrint:False,ptlb:X,ptin:_X,varname:_X,prsc:2,glob:False,taghide:False,taghdr:False,tagprd:False,tagnsco:False,tagnrm:False,v1:0.5;n:type:ShaderForge.SFN_ValueProperty,id:9905,x:31713,y:33019,ptovrint:False,ptlb:Y,ptin:_Y,varname:_Y,prsc:2,glob:False,taghide:False,taghdr:False,tagprd:False,tagnsco:False,tagnrm:False,v1:0;n:type:ShaderForge.SFN_ValueProperty,id:3245,x:33084,y:33141,ptovrint:False,ptlb:Glow,ptin:_Glow,varname:_Glow,prsc:2,glob:False,taghide:False,taghdr:False,tagprd:False,tagnsco:False,tagnrm:False,v1:5;n:type:ShaderForge.SFN_Multiply,id:3845,x:33840,y:32837,varname:node_3845,prsc:2|A-6231-OUT,B-2126-OUT;n:type:ShaderForge.SFN_ValueProperty,id:2126,x:33639,y:33042,ptovrint:False,ptlb:glow1,ptin:_glow1,varname:_glow1,prsc:2,glob:False,taghide:False,taghdr:False,tagprd:False,tagnsco:False,tagnrm:False,v1:3;proporder:6364-6519-274-9646-7270-9905-3245-2126;pass:END;sub:END;*/

Shader "CC/Mask Add LV2" {
    Properties {
        [MaterialToggle] _UV ("UV", Float ) = 0
        _Diffuse ("Diffuse", 2D) = "white" {}
        _Alpha ("Alpha", 2D) = "white" {}
        _Color ("Color", Color) = (1,1,1,1)
        _X ("X", Float ) = 0.5
        _Y ("Y", Float ) = 0
        _Glow ("Glow", Float ) = 5
        _glow1 ("glow1", Float ) = 3
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
            Blend One One
            Cull Off
            ZWrite Off
            
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #define UNITY_PASS_FORWARDBASE
            #include "UnityCG.cginc"
            #pragma multi_compile_fwdbase
            #pragma only_renderers d3d9 d3d11 glcore gles gles3 metal d3d11_9x xboxone ps4 psp2 n3ds wiiu 
            #pragma target 3.0
            uniform fixed _UV;
            uniform sampler2D _Diffuse; uniform float4 _Diffuse_ST;
            uniform sampler2D _Alpha; uniform float4 _Alpha_ST;
            uniform float4 _Color;
            uniform float _X;
            uniform float _Y;
            uniform float _Glow;
            uniform float _glow1;
            struct VertexInput {
                float4 vertex : POSITION;
                float2 texcoord0 : TEXCOORD0;
                float4 vertexColor : COLOR;
            };
            struct VertexOutput {
                float4 pos : SV_POSITION;
                float2 uv0 : TEXCOORD0;
                float4 vertexColor : COLOR;
            };
            VertexOutput vert (VertexInput v) {
                VertexOutput o = (VertexOutput)0;
                o.uv0 = v.texcoord0;
                o.vertexColor = v.vertexColor;
                o.pos = UnityObjectToClipPos( v.vertex );
                return o;
            }
            float4 frag(VertexOutput i, float facing : VFACE) : COLOR {
                float isFrontFace = ( facing >= 0 ? 1 : 0 );
                float faceSign = ( facing >= 0 ? 1 : -1 );
////// Lighting:
////// Emissive:
                float4 node_6806 = _Time;
                float2 _UV_var = lerp( i.uv0, (i.uv0+float2((node_6806.g*_X),(node_6806.g*_Y))), _UV );
                float4 _Diffuse_var = tex2D(_Diffuse,TRANSFORM_TEX(_UV_var, _Diffuse));
                float4 _Alpha_var = tex2D(_Alpha,TRANSFORM_TEX(i.uv0, _Alpha));
                float3 node_5844 = (_Diffuse_var.rgb*_Alpha_var.r);
                float3 emissive = (((_Color.rgb*node_5844*i.vertexColor.a)*(node_5844*_Glow)*i.vertexColor.rgb)*_glow1);
                float3 finalColor = emissive;
                return fixed4(finalColor,1);
            }
            ENDCG
        }
        Pass {
            Name "ShadowCaster"
            Tags {
                "LightMode"="ShadowCaster"
            }
            Offset 1, 1
            Cull Off
            
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #define UNITY_PASS_SHADOWCASTER
            #include "UnityCG.cginc"
            #include "Lighting.cginc"
            #pragma fragmentoption ARB_precision_hint_fastest
            #pragma multi_compile_shadowcaster
            #pragma only_renderers d3d9 d3d11 glcore gles gles3 metal d3d11_9x xboxone ps4 psp2 n3ds wiiu 
            #pragma target 3.0
            struct VertexInput {
                float4 vertex : POSITION;
            };
            struct VertexOutput {
                V2F_SHADOW_CASTER;
            };
            VertexOutput vert (VertexInput v) {
                VertexOutput o = (VertexOutput)0;
                o.pos = UnityObjectToClipPos( v.vertex );
                TRANSFER_SHADOW_CASTER(o)
                return o;
            }
            float4 frag(VertexOutput i, float facing : VFACE) : COLOR {
                float isFrontFace = ( facing >= 0 ? 1 : 0 );
                float faceSign = ( facing >= 0 ? 1 : -1 );
                SHADOW_CASTER_FRAGMENT(i)
            }
            ENDCG
        }
    }
    FallBack "Diffuse"
    CustomEditor "ShaderForgeMaterialInspector"
}
