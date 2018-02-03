Shader "CC/WaterCQ"
{
	Properties
	{
		//_MainTex ("Texture", 2D) = "white" {}
		_NormalMap ("NormalMap", 2D) = "white" {}
		_WaterDepthMap ("WaterDepthMap", 2D) = "white" {}
		_Cube ("Cubemap", CUBE) = "" {}
		g_deepColor ("g_deepColor", Color) = (1,1,1,1) 
		g_shallowColor ("g_shallowColor", Color) = (0,0,0,1) 
		g_waterColorStrength ("g_waterColorStrength", Float) = 0.88 
		g_texReptX ("g_texReptX", Float) = 1 
		g_texReptY("g_texReptY", Float) = 1
		g_texSpeedX ("g_texSpeedX", Float) = 0.01 
		g_texSpeedY ("g_texSpeedY", Float) = 0
		g_fresnelBias("g_fresnelBias", Float) = 0 
		g_fresnelExp("g_fresnelExp", Float) = 0.98 
		g_reflStrength("g_reflStrength", Float) = 4.58 
		g_reflTint("g_reflTint", Color) = (1,1,1,1) 
		g_bumpScale("g_bumpScale", Float) = 1
		g_waveDirX0("g_waveDirX0", Float) = 0.1 
		g_waveDirZ0("g_waveDirZ0", Float) = 0
		g_waveAmp0("g_waveAmp0", Float) = 0.1 
		g_waveFreq0("g_waveFreq0", Float) = 9.5 
		g_wavePhase0("g_wavePhase0", Float) = -0.58 
		g_waveDirX1("g_waveDirX1", Float) = 0 
		g_waveDirZ1("g_waveDirZ1", Float) = 0 
		g_waveAmp1("g_waveAmp1", Float) = 0 
		g_waveFreq1("g_waveFreq1", Float) = 0 
		g_wavePhase1("g_wavePhase1", Float) = 0
		
	}
	SubShader
	{
		Tags { "Queue"="Transparent" "IgnoreProjector"="True" "RenderType"="Transparent" }
		Blend SrcAlpha OneMinusSrcAlpha
		LOD 100

		Pass
		{
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			// make fog work
			#pragma multi_compile_fog
			#pragma target 3.0
			#include "UnityCG.cginc"

			struct appdata
			{
				float4 vertex : POSITION;
				float3 normal : NORMAL ;
				float4 tangent : TANGENT;
				float2 uv : TEXCOORD0;
			};

			struct v2f
			{
				float2 uv : TEXCOORD0;
				half4 bumpUV0 : TEXCOORD1;
				half4 bumpUV1 : TEXCOORD2;
				half3 T2WXf1 : TEXCOORD3;
				half3 T2WXf2 : TEXCOORD4;
				half3 T2WXf3 : TEXCOORD5;
				half3 worldPos : TEXCOORD6;
				UNITY_FOG_COORDS(7)
				float4 vertex : SV_POSITION;
				
			};

			//sampler2D _MainTex;
			sampler2D _NormalMap;
			sampler2D _WaterDepthMap;
			samplerCUBE _Cube;
			float4 _MainTex_ST;
			half g_waveAmp0;
			half g_waveFreq0;
			half g_wavePhase0;
			half g_waveDirX0 = 0.4;
			half g_waveDirZ0 = 0.4;
			half g_waveDirX1 = 0.4;
			half g_waveDirZ1 = 0.4;
			half g_waveAmp1;
			half g_waveFreq1;
			half g_wavePhase1;
			half g_bumpScale = 1;
			half g_texReptX;
			half g_texReptY;
			half g_texSpeedX;
			half g_texSpeedY;
			
			half g_fresnelBias;
			half g_fresnelExp;
			half g_reflStrength;
			half g_waterColorStrength;
			half3 g_deepColor;
			half3 g_shallowColor;
			half3 g_reflTint;
			
			half3 PostionShort4NToVec3( half4 inPos ) 
			{
				return ((inPos.xyz * 3.05185e-05) * inPos.w);
			}
			
			half2 UVShort2NToVec2( half2 inUV,  half range ) 
			{
				return (inUV * range);
			}
			
			half evaluateWave( half freq, half amp, half phase, half2 dir, half2 pos, half t ) 
			{
				return (amp * sin(((dot( dir, pos) * freq) + (t * phase))));
			}
			half evaluateWaveDeriv( half freq, half amp, half phase, half2 dir, half2 pos, half t ) 
			{
				return ((freq * amp) * cos(((dot( dir, pos) * freq) + (t * phase))));
			}
			
			half xll_mod_f_f( half x, half y ) 
			{
				half d = x / y;
				half f = frac (abs(d)) * y;
				return d >= 0.0 ? f : -f;
			}
			
			half3 GetMatrixR0( float4x4 m ) 
			{
				return half3( m[0][0], m[0][1], m[0][2]);
			}

			half3 GetMatrixR1( float4x4 m ) 
			{
				return half3( m[1][0], m[1][1], m[1][2]);
			}

			half3 GetMatrixR2( float4x4 m ) 
			{
				return half3( m[2][0], m[2][1], m[2][2]);
			}

			v2f vert (appdata v)
			{
				v2f o;
				
				o.uv = TRANSFORM_TEX(v.uv, _MainTex);
				
				
				//v.vertex.xyz = PostionShort4NToVec3( v.vertex);
				half2 dir0 =half2( g_waveDirX0, g_waveDirZ0);
				half2 dir1 = half2( g_waveDirX1, g_waveDirZ1);
				half waveh = 0.0;
				half ddx = 0.0;
				half ddy = 0.0;
				waveh += evaluateWave( g_waveFreq0, g_waveAmp0, g_wavePhase0, dir0, v.vertex.xz, _Time.y);
				waveh += evaluateWave( g_waveFreq1, g_waveAmp1, g_wavePhase1, dir1, v.vertex.xz, _Time.y);
				half deriv = evaluateWaveDeriv( g_waveFreq0, g_waveAmp0, g_wavePhase0, dir0, v.vertex.xz, _Time.y);
				ddx += (deriv * dir1.x);
				ddy += (deriv * dir1.y);
				v.vertex.y += waveh;
				half3 B = half3( 10.0, ddx, 0.0);
				half3 T = half3( 0.0, ddy, 10.0);
				half3 N = half3( (-ddx), 10.0, (-ddy));
				half2 TextureScale = half2( g_texReptX, g_texReptY);
				half2 TextureSpeed = half2( g_texSpeedX, g_texSpeedY);
				half cycle = xll_mod_f_f( _Time.y, 100.0);
				o.bumpUV0.xy = v.uv.xy;//((v.uv.xy * TextureScale) + (cycle * TextureSpeed));
				o.bumpUV1.xy = (((v.uv.xy * TextureScale) * 2.0) + ((cycle * TextureSpeed) * 4.0));
				o.bumpUV1.zw = (((v.uv.xy * TextureScale) * 4.0) + ((cycle * TextureSpeed) * 8.0));
				half3 wNormal = UnityObjectToWorldNormal(v.normal);
                half3 wTangent = g_bumpScale*UnityObjectToWorldDir(v.tangent.xyz);
                // compute bitangent from cross product of normal and tangent
                half tangentSign = v.tangent.w * unity_WorldTransformParams.w;
                half3 wBitangent = g_bumpScale*cross(wNormal, wTangent) * tangentSign;
                // output the tangent space matrix
                o.T2WXf1.xyz = half3(wTangent.x, wBitangent.x, wNormal.x);
                o.T2WXf2.xyz = half3(wTangent.y, wBitangent.y, wNormal.y);
                o.T2WXf3.xyz = half3(wTangent.z, wBitangent.z, wNormal.z);
				float3 worldPos = mul(unity_ObjectToWorld, v.vertex).xyz; 
				o.worldPos = worldPos;//normalize(UnityWorldSpaceViewDir(worldPos));
				o.bumpUV0.zw = v.uv;
				o.vertex = mul(UNITY_MATRIX_VP, half4(worldPos,1));
				UNITY_TRANSFER_FOG(o,o.vertex);
				return o;
			}
			
			fixed4 frag (v2f inVert) : SV_Target
			{
				// sample the texture
				//fixed4 col = tex2D(_MainTex, inVert.uv);
				half3 t0 = UnpackNormal(tex2D( _NormalMap, inVert.bumpUV0.xy));
				half3 t1 = UnpackNormal(tex2D( _NormalMap, inVert.bumpUV1.xy));
				half3 t2 = UnpackNormal(tex2D( _NormalMap, inVert.bumpUV1.zw));
				half3 Nt = (t0.xyz + t1.xyz + t2.xyz);
				half3 Nw;
                Nw.x = dot(inVert.T2WXf1, Nt);
                Nw.y = dot(inVert.T2WXf2, Nt);
                Nw.z = dot(inVert.T2WXf3, Nt);
				half3 Nn = normalize(Nw);
				half3 Vn = normalize(UnityWorldSpaceViewDir(inVert.worldPos.xyz));//half3 Vn = normalize(inVert.worldView.xyz);
				half3 R = reflect( -Vn, Nn);
				
				half4 reflection = texCUBE( _Cube, R);
				half3 skyColor = DecodeHDR (reflection, unity_SpecCube0_HDR);
				//reflection.xyz *= (1.0 + (reflection.w ));
				half facing = (1.0 - max( dot( Vn, Nn), 0.0));
				half fres = (g_reflStrength * (g_fresnelBias + ((1.0 - g_fresnelBias) * pow( facing, g_fresnelExp))));
				
				half2 depthMap = tex2D( _WaterDepthMap, inVert.bumpUV0.zw).xy;
				half3 waterColor = (g_waterColorStrength * lerp( g_shallowColor, g_deepColor, depthMap.x));
				fixed4 col ;
				col.xyz = (waterColor + ((fres * skyColor.xyz) * g_reflTint));
				col.w = depthMap.y;
	
				// apply fog
				UNITY_APPLY_FOG(inVert.fogCoord, col);
				return col;
			}
			ENDCG
		}
	}
}
